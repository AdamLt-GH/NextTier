import React, { useState, useRef, useEffect } from 'react';
import './ReflectionForm.css';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const sendToChatGPT = async (userMessage) => {
    try {
      const response = await axios.post('http://localhost:5000/api/chatgpt', {
        message: userMessage,
      });

      setChatHistory((prev) => [
        ...prev,
        { sender: 'You', text: userMessage },
        { sender: 'NextTier AI', text: response.data.reply },
      ]);
    } catch (err) {
      console.error('Error from AI:', err.response?.data || err.message || err);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await sendToChatGPT(input);
    setInput('');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 py-8 bg-[#fdfaf3] text-center text-[#333]">
      <p className="max-w-2xl text-lg leading-relaxed mb-8">
        Let NextTier AI help you reflect on your achievements and grow your career.
        <br />
        Share what you feel comfortable with, i.e. your goals, wins, or challenges.
        <br />
        Mention <strong>"mock interview"</strong> any time to start one.
        <br />
        Please allow a few seconds between sending a request and receiving a response.
      </p>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 mb-4 overflow-y-auto max-h-[400px] border border-gray-300">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className="mb-3 text-left">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <textarea
        className="reflection-textarea"
        placeholder="Type your reflection or question here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={!input.trim()}
        className={`px-5 py-1 rounded-md text-white text-sm font-semibold ${
          input.trim()
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        ➤ Send
      </button>
    </div>
  );
};


export default Home;

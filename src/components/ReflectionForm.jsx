import React, { useState } from 'react';

const Home = () => {
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      // put api call here if u wanna pay for it orrr use proxy api - research this
      console.log("Sending to AI:", input);
    } catch (err) {
      console.error("Error submitting to AI:", err);
    }
  };

  return (
    <div className="w-[761px] h-[881px] relative bg-gradient-to-b from-gray-300 to-gray-200 overflow-hidden p-4">
      <div className="absolute left-[281px] top-[97px] text-black text-5xl font-bold font-['Inter']">
        NextTier
      </div>
      <div className="absolute left-[185px] top-[161px] text-black text-base font-normal font-['Inter'] tracking-wide">
        Let NextTier AI help you curate the perfect raise request.
      </div>
      <div className="absolute left-[118px] top-[189px] text-black text-base font-normal font-['Inter'] tracking-wide">
        When it’s ready, finish off with a mock meeting to solidify your confidence.
      </div>

      <div className="absolute left-[82px] top-[257px] w-[614px] h-[556px] bg-fuchsia-50/50 rounded-[47px]" />

      <div className="absolute left-[117px] top-[273px] text-black/50 text-base font-['Inter']">
        <p className="font-bold">Tell us about yourself and your work.</p>
        <p>Please include:</p>
        <ul className="list-disc list-inside">
          <li>Your current position title and company</li>
          <li>Your years of experience in this role or field</li>
          <li>Any responsibilities you handle outside your formal job description</li>
          <li>Why you believe you deserve a raise</li>
          <li className="ml-4">(e.g., recent wins, growth, recognition, performance metrics)</li>
        </ul>
        <br />
        <p>(Optional):</p>
        <ul className="list-disc list-inside">
          <li>Any positive feedback you’ve received (from clients, managers, colleagues)</li>
          <li>Any challenges you’ve overcome or initiatives you led</li>
          <li>What your future goals are in this role</li>
        </ul>
      </div>

      <textarea
        className="absolute left-[117px] top-[535px] w-[554px] h-52 bg-white p-3 rounded-md text-sm resize-none"
        placeholder="Type your response here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="absolute left-[604px] top-[764px] w-16 h-6 bg-fuchsia-800 rounded-[10px] text-white text-sm"
        onClick={handleSubmit}
      >
        ➤
      </button>
    </div>
  );
};

export default Home;

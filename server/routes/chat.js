const express = require('express');
const router = express.Router();
require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chatgpt', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  //fake sim - no one wants to pay for keys
  if (process.env.USE_MOCK === 'true') {
    console.log("Mock mode active. Returning fake response.");
    return res.json({ reply: "Mocked response: api keys are too expensive imo" });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

module.exports = router;

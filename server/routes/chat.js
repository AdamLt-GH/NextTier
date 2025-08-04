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

  if (process.env.USE_MOCK === 'true') {
    console.log("Mock mode active. Returning fake response.");
    return res.json({ reply: "Mocked response: api keys are too expensive imo" });
  }

  console.log("Using Assistant ID:", process.env.OPENAI_ASSISTANT_ID); // this or thread err 
  try {
    const thread = await openai.beta.threads.create();
    console.log("Created thread with ID:", thread.id);
    
    if (!thread || !thread.id) {
      throw new Error('Failed to create thread or thread ID is missing');
    }
    
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    });
    console.log("Added message to thread");
    
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
    });
    console.log("Created run with ID:", run.id);
    
    if (!run || !run.id) {
      throw new Error('Failed to create run or run ID is missing');
    }

    let completedRun;
    while (true) {
      console.log("Checking run status...");
      console.log("Thread ID:", thread.id, "Run ID:", run.id);
      
      //who knew openai sdk version had formatting issues
      const runs = await openai.beta.threads.runs.list(thread.id);
      const currentRun = runs.data.find(r => r.id === run.id);
      
      if (!currentRun) {
        throw new Error('Run not found in list');
      }
      
      completedRun = currentRun;
      console.log("Run status:", completedRun.status);
      
      if (completedRun.status === 'completed') break;
      if (completedRun.status === 'failed') throw new Error('Run failed');
      
      await new Promise((r) => setTimeout(r, 500));
    }
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data.find(msg => msg.role === 'assistant');

    res.json({ reply: lastMessage?.content[0]?.text?.value || "No reply received." });

  } catch (err) {
    console.error("Assistant API error:", err.message);
    res.status(500).json({ error: "Failed to get response from Assistant" });
  }
});

module.exports = router;

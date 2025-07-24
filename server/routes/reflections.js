const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// POST /api/reflections
router.post('/', async (req, res) => {
  try {
    const newEntry = new Response(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

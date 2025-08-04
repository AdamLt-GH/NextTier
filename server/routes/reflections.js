const express = require('express');
const router = express.Router();
const Response = require('../models/Response');



router.post('/', async (req, res) => {
  try {
    const newEntry = new Response(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


/* after test pilot:: 
add paid tier to view accs and logs: req.user.plan....
*/


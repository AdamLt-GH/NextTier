const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  project: String,
  impact: String,
  effectiveness: Number,
  salary: String,
  market: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Response', responseSchema);

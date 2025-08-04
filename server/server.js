
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const chatRouter = require('./routes/chat');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', chatRouter);




const reflectionsRouter = require('./routes/reflections');
app.use('/api/reflections', reflectionsRouter);

const PORT = process.env.PORT || 5000; //port # being used??

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB error:', err));


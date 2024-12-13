import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectToMongoDB from './server/database/connectToMongoDB.js';
import Userclass from './server/models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectToMongoDB(process.env.MONGODB_ATLAS_URI);

// Serve static files
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// POST route to handle form submission
app.post('/submit-form', async (req, res) => {
  const { username, fullname, email } = req.body;

  try {
    const newUser = new Userclass({ username, fullname, email });
    await newUser.save();
    res.status(201).send('User data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving user data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

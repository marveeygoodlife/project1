const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const port = 3300;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// CORS Middleware (Global)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/studentBD');
const db = mongoose.connection;

db.on('error', () => { console.log('Connection failed'); });
db.once('open', () => { console.log('Connection to database successful'); });

// User Schema and Model
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// POST route for adding a user
app.post('/post', async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    // Simple validation
    if (!firstname || !lastname || !email) {
      return res.status(400).send('Missing required fields');
    }

    const user = new User({ firstname, lastname, email });

    // Save user to database
    const savedUser = await user.save();
    console.log('Record inserted successfully', savedUser);

    // Send a success response
    return res.status(200).json({ message: 'User saved successfully', user: savedUser });
    
  } catch (error) {
    console.error("Error in /post route:", error);
    return res.status(500).send('Internal Server Error');
  }
});

// GET route to serve the form
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
      console.error('Port 3300 is already in use. Please use a different port.');
      process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Gracefully shutting down...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    server.close(() => {
      console.log('Server shut down gracefully');
      process.exit(0);
    });
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // Exit gracefully
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit gracefully
});

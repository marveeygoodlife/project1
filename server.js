const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3001;


console.log("Port:", process.env.PORT);
console.log("Mongo URI:", process.env.MONGO_URI);

const app = express();

//serve static files
app.use(express.static(__dirname));

const db = mongoose.connection 

//mongodb connection
mongoose.set('debug', true);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


//serve login form
app.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, 'form.html'));
});

// start server

/* app.listen(port, (err) => {
    console.log(`server started on port ${port}`);
}); */

//parse form dtta

// Enable parsing of URL-encoded data (important for form submissions)
app.use(express.urlencoded({ extended: true }));

// Define the login route to handle POST requests
app.post('/login', (req, res) => {
  console.log('Login request received:', req.body); // Log the request body

  //  Process the login (e.g., authenticate the user)
  const username = req.body.username;
  const email = req.body.email;

  if (username === 'user' && email === 'email') { // Replace with actual authentication logic
    res.send('Login successful!');  // Send a success response
  } else {
    res.status(401).send('Login failed'); // Send an unauthorized response
  }
});



app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start the server:', err);
        process.exit(1); // Exit the process with a failure code
    }
    console.log(`Server started on port ${port}`);
});

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

app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start the server:', err);
        process.exit(1); // Exit the process with a failure code
    }
    console.log(`Server started on port ${port}`);
});

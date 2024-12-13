const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const port = 3300;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
mongoose.connect('mongodb://127.0.0.1:27017/studentBD');   

const db = mongoose.connection;

db.on('error',()=>{console.log('connection failed')});

db.once('open',()=>{console.log('connection  to database successful')});
const User = mongoose.model('User', userSchema);

app.post('/post', async (req, res) => {   

  try {
    
  const {firstname, lastname, email} =req.body;

 /*  const data = {
    'firstname':firstname,
    'lastname':lastname,
    'email':email
  } */
  // Simple validation
  if (!firstname || !lastname || !email) {
    return res.status(400).send('Missing required fields');
  }

  const user = new User({ firstname, lastname, email });

    // Your code to process the POST request
    // ... access req.body ...
    // Example:  const data = req.body.someField;

    // ... your logic that might throw errors
/* 
    db.collection('user').insertOne(data, (err,collection) => {  
      if(err){
        throw err;
      }
      console.log('Record inserted successfully');
    });
  return res.redirect('successful.html');
    
} catch (error) {
    console.error("Error in /post route:", error); // Log the error for debugging
    res.status(500).send('Internal Server Error'); // Send a 500 response
} */const savedUser = await user.save();
console.log('Record inserted successfully', savedUser);

      return res.redirect('successful.html');
    
  } catch (error) {
    console.error("Error in /post route:", error);
    return res.status(500).send('Internal Server Error');
  }
});
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String
});


//get route to serve the form

app.get('/', (req, res) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
//return res.redirect('index.html');

return res.sendFile(path.join(__dirname, 'index.html'));



});






//handle server errors
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
      console.error('Port 3300 is already in use. Please use a different port.');
      process.exit(1);
  }
});


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















































/* const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;

const app = express();

app.use(express.json())
//mongodb connectio
//serve static files
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))
mongoose.connect( `mongodb://127.0.0.1:27017/studentBD`);
const db = mongoose.connection;

db.once('open', ()=>{
  console.log('Mongodb is connected successfully');
})
    
//user schema
const userschema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  email:String
})

const userData = mongoose.model('data', userschema)

//serve login form
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/post', async (req, res)=>{
const newuser = new userData({
  firstname,
  lastname,
  email
})
await newuser.save()
console.log(newuser)
res.send('FORM SUBMITTED SUCCESSFULLY')
})
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
  });
 */
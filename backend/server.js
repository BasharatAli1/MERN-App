const express = require('express'); // import the express module
//const bodyParser = require('body-parser');

// CORS is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin (Web content's origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it), access to selected resources from a different origin.
const cors = require('cors');   // Cross-Origin Resource Sharing - CORS is a node.js package for providing a Connect/Express middleware
const mongoose = require('mongoose');

require('dotenv').config(); // if it configure, we get environment-variables in .env file

// create express server

//Calls the express function "express()" and puts new Express application inside the app variable (to start a new Express application).
// First we invoke the require() function (in start), specifying the name of the module as a string ('express'), and calling the returned object to create an Express application. We can then access the properties and functions of the application object.
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());    // cors middleware
app.use(express.json());    // allow to parse JSON (as server send and receive JSON)

const uri = process.env.ATLAS_URI;  // got from mongodb atlas dashboard
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB conection established Succesfully!");})

// add the routes to the middleware chain

// import router
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
 
// App.js
// add the route to the middleware stack
// app.use, use the files require
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter); // now if any one go to root url and put "/users", it will load every thing in usersRouter


// starts server, listening at port
//app.listen(port, () => { console.log('Server is running on port: ${port}');});
app.listen(port, () => { console.log('Server is running on port:' + port);});



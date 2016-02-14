// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Load the module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express(db);

// Configure the Passport middleware
var passport = passport();

// Use the Express application instance to listen 3000 port
app.listen(3000);

// Log server status to the console
console.log("Server running at http://localhost:3000/");

module.exports = app;

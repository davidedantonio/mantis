// Invoke 'strict' JavaScript mode
'use strict';

// Load module dependencies
var passport = require('passport'),
    mongoose = require('mongoose');

// Define passport configuration method
module.exports = function() {
  // Load the User model
  var User = mongoose.model('User');

  // Use Passport's serializeUser method to serialize the User id
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // Use Passport's deserializeUser method to load User document
  passport.deserializeUser(function (id, done) {
    User.findOne({
      _id: id,
    }, '-password', function(err, user){
      done(err, user);
    });
  });

  // Load Passport's strategies configuration files
  require('./strategies/local.js')();
};

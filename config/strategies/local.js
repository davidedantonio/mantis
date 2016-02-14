// Invoke 'strict' JavaScript mode
'use strinct';

// Load module dependencies
var passport = require('passport'),
    LocalStategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

// Create the local strategy configuration method
module.exports = function() {
  // Use the Passport's Local Strategy
  passport.use(new LocalStategy(
    {usernameField: 'email', passwordField: 'password'}, function(email, password, done) {
    // If a user is not found, continue to the next middleware with an error message
    if (!email) {
      return done(null, false, {
        message: 'Invalid E-mail'
      });
    }

    // Use the 'User' model 'findOne' method to find user with the current username
    User.findOne({
      email: email
    }, function(err, user) {
        // If an error occurs continue to the next middleware
        if (err)
          return done(err);

        // If a user is not found, continue to the next middleware with an error message
        if (!user) {
          return done(null, false, {
            message: 'Unknow user'
          });
        }

        // If the password is incorrect, continue to the next middleware with and error message
        if (!user.authenticate(password)){
          return done(null, false, {
            message: 'Invalid password'
          });
        }

        // Otherwise continue to the next middleware with the user ObjectId
        return done(null, user);
    });
  }));
};

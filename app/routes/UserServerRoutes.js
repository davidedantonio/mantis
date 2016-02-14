// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/UserServerController'),
    passport = require('passport');

// Define the routes module method
module.exports = function(app){
  // Set up the 'signup' routes
  app.route('/signup')
    .get(users.renderSignup)
    .post(users.signUp);

  // Set up the 'signin' route
  app.route('/signin')
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/dashboards',
      failureRedirect: '/signin'
    }));

  app.get('/signout', users.signOut);
};

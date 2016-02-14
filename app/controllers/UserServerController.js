// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var User = require('mongoose').model('User'),
	passport = require('passport');

// Create a new error handling controller method
var getErrorMessage = function(err) {
  // Define the error message variable
  var message = '';

  // If an internal error Mongo DB error occurs get the error message
	  if (err.code){
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Email already exist';
        break;
      // If a general error occurs set the message error
      default:
        message = 'Something went wrong';
    }
  }else{
    // Grab the first error message from a list of possible errors
    for (var errName in err.errors)
      if (err.errors[errName].message)
        message = err.errors[errName].message;
  }

  // Return message error
  return message;
};

// Create a new controller method that render the signin page
exports.renderSignin = function(req, res, next) {
	// If user is not connected render the signin page, otherwise redirect the user to the main application page
  if (!req.user) {
    // User the response object to render the signin page
    res.render('signin', {
      // Set the page title variable
      title : 'Mantis Signin',
      // Set the flash message variable
      messages : req.flash('error') || req.flash('info')
    });
  }else{
    return res.redirect('/dashboards');
  }
};

// Create new User
exports.signUp = function(req, res, next) {
  // If user is not conected, create and login a new User, otherwise redirect to the main application page
  if (!req.user){
		// Create a new User instance
    var user = new User(req.body);
    var message = null;

    // Set user provider property
    user.provider = 'local';

    // Try saving new User Document
    user.save(function(err) {
			if (err){
				// If an error occurs, use flash message to report error
	      var message = getErrorMessage(err);

	      // Set the error message
	      req.flash('error', message);

	      // Redirect user to the signUp page
	      return res.redirect('/signup')
			}

			// If the user is created successfully use the passport method to login
	    req.login(user, function(err){
	      if (err) return next(err);

	      // Redirect user to the main application page
	      return res.redirect('/signin');
	    });
    });
  } else {
		return res.redirect('/signup');
	}
};

// Create a new controller method that render signup page
exports.renderSignup = function (req, res, next) {
  // If user not connected render the signup page, otherwise redirect to the main application page
  if (!req.user){
    // Use the response object to render signup page
    res.render('signup', {
      // Set the page title variable
      title: 'Mantis Signup',

      // Set the error message
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/dashboards');
  }
};

// Create a new controller method for signin out
exports.signOut = function(req, res, next) {
  // Use the passport method to logout
  req.logout();

  // Redirect the user back to the main application page
  res.redirect('/signin');
};

// Create a new controller middleware that authorize authenticate operations
exports.requireLogin = function (req, res, next) {
  // If a user is not authenticated send the appropriate error message
  if (!req.isAuthenticated()){
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  // Call the next middleware ^_^
  next();
};

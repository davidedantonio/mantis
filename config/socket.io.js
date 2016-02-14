// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    agendaJob = require('./agenda');

// Define the Socket.io configuration method
module.exports = function(server, io, mongoStore, app) {
	// Intercept Socket.io's handshake request
  io.use(function(socket, next) {
  	// Use the 'cookie-parser' module to parse the request cookies
    cookieParser(config.sessionSecret)(socket.request, {}, function(err) {
    	// Get the session id from the request cookies
      var sessionId = socket.request.signedCookies['connect.sid'];

      // Use the mongoStorage instance to get the Express session information
      mongoStore.get(sessionId, function(err, session) {
      	// Set the Socket.io session information
        socket.request.session = session;

        // Use Passport to populate the user details
        passport.initialize()(socket.request, {}, function() {
        	passport.session()(socket.request, {}, function() {
        		if (socket.request.user) {
        			next(null, true);
        		} else {
        			next(new Error('User is not authenticated'), false);
        		}
        	});
        });
      });
    });
  });

  var jobs = agendaJob(io);
  require('../app/routes/DashboardServerRoutes')(app, io, jobs);
  
  // Add an event listener to the 'connection' event
  io.on('connection', function(socket) {
    // Join to the dashboard Room
    socket.join('dashboard_room');

    // Load the widgets server routes
    require('../app/routes/WidgetServerRoutes')(app, io, socket, jobs);
  });
};

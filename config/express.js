// Invoke 'strict' JavaScript mode
'use strict';

var config = require('./config'),
    http = require('http'),
    socketio = require('socket.io'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    passport = require('passport');

module.exports = function(db) {
  // Create a new Express application instance
  var app = express();

  // Create a new HTTP Server
  var server = http.createServer(app);

  // Create a Socket.io server
  var io = socketio.listen(server);

  // Use the 'NODE_ENV' variable to activate morgan logger or compress middleware
  if (process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV == 'production'){
    app.use(compress());
  }

  // Use the Body Parser and Method Override middleware functions
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Configure MongoDB session storage
  var mongoStore = new MongoStore({
    db: db.connection.db
  });

  // Configure Session middleware
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: mongoStore
  }));

  // Set the application view engine and 'views' folder
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  // Configure static file serving
	app.use(express.static('./public'));

  // Configure the flash messages middleware
  app.use(flash());

  // Configure passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  require('../app/routes/UserServerRoutes.js')(app);

  // Load the Socket.io configuration
  require('./socket.io')(server, io, mongoStore, app);

  // Return the server instance
  return server;
};

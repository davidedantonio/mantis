//Invoke 'strict' JavaScript mode
'use strict';

//Load module dependencies
var config = require('./config'),
  mongoose = require('mongoose');

module.exports = function(){
  // Use Mongoose to connect to MongoDB
  var db = mongoose.connect(config.db);

  // Load Application models
  require('../app/models/User');
  require('../app/models/Dashboard');
  require('../app/models/Widget');

  // return the Mongoose connection instance
  return db;
};

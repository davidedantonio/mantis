//Invoke 'strict' JavaScript mode
'use strict';

//Load correct configuration file
module.exports = require('./env/' + process.env.NODE_ENV + '.js');

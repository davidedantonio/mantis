/**
* Dashboard.js
*
* @description :: Dashboard for Mantis
*/

var mongoose = require('mongoose');

var DashboardSchema = new mongoose.Schema({
  name: {
		type: String
	},
	description: {
		type: String
	},
	icon: {
		type: String
	},
	columns: {
		type: Number
	},
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  widgets: [{
			type: mongoose.Schema.Types.ObjectId,
      ref: 'Widget'
		}
	]
});

mongoose.model('Dashboard', DashboardSchema);

/**
* Widget.js
*
* @description :: Dashboard for Mantis
*/

var mongoose = require('mongoose');
var WidgetSchema = new mongoose.Schema({
  name: {
    type: String
  },
	description: {
		type: String
	},
	url: {
		type: String
	},
	frequency: {
		type: Number
	},
  width: {
		type: Number
	},
  height: {
		type: Number
	},
  rows: {
		type: Number
	},
  columns: {
		type: Number
	},
  widget_data: {
    type: String
  },
	dashboard: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard'
	}
});

mongoose.model('Widget', WidgetSchema);

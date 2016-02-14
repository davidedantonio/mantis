/**
* User.js
*
* @description :: User for Mantis Dashboard
*/

var mongoose = require('mongoose'),
	crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		// Set a unique 'email' index
		unique: true,
		// Validate 'email' value existance
		required: 'Email is required',
		// Trim the 'email' field
		trim: true
	},
	password: {
		type: String,
		// Validate 'password' value existance
		required: 'Password is required',
	},
	name: {
		type: String,
		// Validate 'name' value existance
		required: 'Name is required',
	},
	surname: {
		type: String,
		// Validate 'surname' value existance
		required: 'Surname is required',
	},
	dashboards: [{
			type: mongoose.Schema.Types.ObjectId,
      ref: 'Dashboard'
		}
	],
	provider: {
		type: String,
		required: 'Provider is required'
	},
	salt: {
		type: String
	},
	providerId: String,
	providerData: {},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);

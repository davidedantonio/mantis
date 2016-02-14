// Invoke 'strict' JavaScript mode
'use strict';

module.exports = {
  db: 'mongodb://localhost:27017/mantis-development',
  sessionSecret: 'm4mmt',
  jobs: {
    jobsDirectory: 'api/jobs',
    db: {
      address    : 'localhost:27017/mantis-development',
      collection : 'jobs'
    },
    name: 'JobsProcess'
  },
  facebook: {
    clientID: 'Facebook application ID',
    clientSecret: 'Facebook application Secret',
    callbackURL: 'URL'
  },
  twitter: {
    clientID: 'Twitter application ID',
    clientSecret: 'Twitter application Secret',
    callbackURL: 'URL'
  },
  google: {
    clientID: 'Google application ID',
    clientSecret: 'Google application Secret',
    callbackURL: 'URL'
  }
};

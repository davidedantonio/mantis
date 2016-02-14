// Invoke 'strict' JavaScript mode
'use strict';

module.exports = {
  db: 'mongodb://localhost:27017/mantis-production',
  sessionSecret: 'developmentSessionSecret',
  jobs: {
    jobsDirectory: 'api/jobs',
    db: {
      address    : 'localhost:27017/mantis-production',
      collection : 'jobs'
    },
    name: 'JobsProcess',
    processEvery: '10 seconds',
    maxConcurrency: 20,
    defaultConcurrency: 5,
    defaultLockLifetime: 10000
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

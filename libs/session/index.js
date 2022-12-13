const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session');
const { connectPath } = require('../mongo');
const { isDev, sessionSecret, sessionExpireTime } = require('../../config/env');

const MongoStore = MongoDBStore(expressSession);

const store = new MongoStore({
  collection: 'express-sessions',
  uri: connectPath,
  expires: sessionExpireTime,
});

module.exports = expressSession({
  name: 'face2face_sessionId',
  secret: sessionSecret,
  store,
  saveUninitialized: false,
  resave: false,
  proxy: true,
  cookie: {
    sameSite: false,
    secure: !isDev,
    maxAge: sessionExpireTime,
    httpOnly: false,
  },
});

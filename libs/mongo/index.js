// mongo settings
const { connect } = require('mongoose');
const { mongodb } = require('../../config');

// models
const user = require('./user');
const address = require('./address.');
const chat = require('./chat');
const message = require('./message');
const order = require('./order');
const production = require('./production');
const rate = require('./rate');

const { host, port, db } = mongodb;
const connectPath = `mongodb://${host}:${port}/${db}`;

async function initMongoDB() {
  // connect to the mongoose.
  return connect(connectPath);
}

module.exports = {
  connectPath,
  initMongoDB,
  ...user,
  ...address,
  ...chat,
  ...message,
  ...order,
  ...production,
  ...rate,
};

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

async function initMongoDB() {
  const { host, port, db } = mongodb;
  const connectPath = `mongodb://${host}:${port}/${db}`;
  console.log(connectPath);
  // connect to the mongoose.
  return connect(connectPath);
}

module.exports = {
  initMongoDB,
  ...user,
  ...address,
  ...chat,
  ...message,
  ...order,
  ...production,
  ...rate,
};

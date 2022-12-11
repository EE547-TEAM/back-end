const { connect } = require('mongoose');
const { mongodb } = require('../../config');

async function initMongoDB() {
  const { host, port, db } = mongodb;
  const connectPath = `mongodb://${host}:${port}/${db}`;
  console.log(connectPath);
  // connect to the mongoose.
  return connect(connectPath);
}

module.exports = {
  initMongoDB,
};

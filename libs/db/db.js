const { connect } = require('mongoose');
const path = require('path');
const fs = require('fs');
const { buildSchema } = require('graphql');
const { mongodb } = require('../../config');

async function initMongoDB() {
  const { host, port, db } = mongodb;
  const connectPath = `mongodb://${host}:${port}/${db}`;
  console.log(connectPath);
  // connect to the mongoose.
  return connect(connectPath);
}

async function getGraphqlSchemaFromFile(filePath) {
  let p = filePath;
  if (!path.isAbsolute(filePath)) {
    p = path.join(__dirname, filePath);
  }
  return new Promise((res, rej) => {
    fs.readFile(p, (err, data) => {
      if (err) rej(err);
      else res(buildSchema(data.toString()));
    });
  });
}

module.exports = {
  initMongoDB,
  getGraphqlSchemaFromFile,
};

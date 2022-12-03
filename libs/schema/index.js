const path = require('path');
const fs = require('fs');
const { buildSchema } = require('graphql');
const mongoSchema = require('./schema');

async function getGraphqlSchemaFromFile(filePath) {
  let p = filePath;
  if (!path.isAbsolute(filePath)) {
    p = path.join(__dirname, filePath);
  }
  return new Promise((res, rej) => {
    fs.readFile(p, (err, data) => {
      if (err) rej(err);
      else { res(buildSchema(data.toString())); }
    });
  });
}

module.exports = {
  getGraphqlSchemaFromFile,
  ...mongoSchema,
};

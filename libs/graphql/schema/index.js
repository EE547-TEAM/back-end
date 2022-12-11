const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

const getGrqphqlSchema = async () => new Promise((res, rej) => {
  const p = path.join(__dirname, './schema.graphql');
  fs.readFile(p, (err, data) => {
    if (err) rej(err);
    else res(buildSchema(data.toString()));
  });
});

module.exports = getGrqphqlSchema;

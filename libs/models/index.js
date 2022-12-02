const { model } = require('mongoose');
const schema = require('./schema');

function modelFacotry(schemas) {
  const exportedObject = {};
  Object.keys(schemas).forEach((key) => {
    exportedObject[key] = model(`${key}`, schemas[key]);
  });
  return exportedObject;
}

module.exports = modelFacotry(schema);

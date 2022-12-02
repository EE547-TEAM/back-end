/**
 * Define Rate API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { Rate: rateSchema } = require('../../schema');

// to create rate document for mongoDB, or other operations we need.
const Rate = model('Rate', rateSchema);

/**
 *
 * @param {*} param0
 * @returns
 */
async function findProductbyRate({ email }) {
  return Rate.find({ email });
}

module.exports = {
  findProductbyRate,
};

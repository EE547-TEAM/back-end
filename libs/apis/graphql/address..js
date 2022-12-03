/**
 * Define Address API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { Address: addressSchema } = require('../../schema');

// to create address document for mongoDB, or other operations we need.
const Address = model('Address', addressSchema);

/**
 *
 * @param {*} param0
 * @returns
 */
async function findProductbyAddress({ email }) {
  return Address.find({ email });
}

module.exports = {
  findProductbyAddress,
};

/**
 * Define Address API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { Document } = require('mongoose');
const { Address } = require('./model');

/**
 *
 * @param {*} param0
 * @returns address
 * userId: Object(userId)
 */
async function getAddressbyId({ _id }) {
  const addresses = await Address.findOne({ _id }).exec();
  return addresses;
}

/**
 *
 * @param {userId} param0
 * @returns save address in userId
 */
async function addressCreate({ content, userId, def }) {
  const address = new Address({
    content,
    userId,
    is_default: def,
  });
  const savedDoc = address.save();
  return savedDoc;
}

module.exports = {
  getAddressbyId,
  addressCreate,
};

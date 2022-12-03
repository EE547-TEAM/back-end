/**
 * Define Address API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { ObjectId } = require('mongodb');
const { Address: addressSchema } = require('../../schema');

// to create address document for mongoDB, or other operations we need.
const Address = model('Address', addressSchema);

/**
 *
 * @param {*} param0
 * @returns address
 * userId: Object(userId)
 */
async function getAddressbyId({ userId }) {
<<<<<<< HEAD
  const addresses = await Address.find({ userId }).exec();
=======
  const addresses = await Address.find({ userId: Object(userId) }).exec();
>>>>>>> 1497886c813cdeca8b0c9829e58b4077ed0c457e
  return (addresses.map((address) => address.content));
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

/**
 * Define Message API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { Message: messageSchema } = require('../../schema');

// to create message document for mongoDB, or other operations we need.
const Message = model('Message', messageSchema);

/**
 *
 * @param {*} param0
 * @returns
 */
async function findProductbyMessage({ email }) {
  return Message.find({ email });
}

module.exports = {
  findProductbyMessage,
};

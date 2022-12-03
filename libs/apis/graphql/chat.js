/**
 * Define Chat API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { Chat: chatSchema } = require('../../schema');

// to create chat document for mongoDB, or other operations we need.
const Chat = model('Chat', chatSchema);

/**
 *
 * @param {*} param0
 * @returns
 */
async function findProductbyChat({ email }) {
  return Chat.find({ email });
}

module.exports = {
  findProductbyChat,
};

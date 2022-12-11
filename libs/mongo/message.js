/**
 * Define Message API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { Document } = require('mongoose');
const { Message } = require('./model');

/**
 *
 * @param {{
 *  chatId: Schema.Types.ObjectId, senderId: Schema.Types.ObjectId,
 *  content: String, status: String
 * }} params
 * @returns { promise<*> }
 */
async function messageCreate({
  chatId, senderId, content, status,
}) {
  const message = new Message({
    chatId, senderId, content, status,
  });
  const messageDoc = await message.save();
  return messageDoc;
}

/**
 *
 * @param {chatId: Schema.Types.ObjectId} param
 * @returns { [Document] }
 */
async function matchMessageByChat({ chatId }) {
  return Message.find({ chatId }).exec();
}

/**
 * @description: according to the timestamp, get the last message from the chatBox
 * @param { chatId: Schema.Types.ObjectId } params
 * @returns { Document }
 */
async function matchLastMessageByChat({ chatId }) {
  const messages = await Message.find({ chatId }).exec();
  return messages[messages.length - 1];
}

/**
 * @description: update the status of a message
 * @param { messageId:  Schema.Types.ObjectId } param
 * @return { promise<*> }
 */
async function messageUpdate({ messageId }) {
  const filter = { _id: messageId };
  const update = { status: 'read' };
  await Message.findOneAndUpdate(filter, update);
}

/**
 * description: upgrade the status of a message
 */

module.exports = {
  messageCreate,
  matchMessageByChat,
  matchLastMessageByChat,
  messageUpdate,
};

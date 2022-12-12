/**
 * Define Chat API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document, Schema } = require('mongoose');
const { Chat } = require('./model');

async function chatCreate({ participantId }) {
  const chat = new Chat({
    participant: participantId,
  });
  const savedDoc = chat.save();
  return savedDoc;
}

/**
 *
 * @param {*} param0
 * @returns
 */
async function getChatsbyUserId({ userId }) {
  const chats = await Chat.where('participant').elemMatch({ $eq: userId }).exec();
  return (chats);
}

module.exports = {
  chatCreate,
  getChatsbyUserId,
};

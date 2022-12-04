/**
 * Define Chat API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document, Schema } = require('mongoose');
const { Chat: chatSchema } = require('../../schema');

// to create chat document for mongoDB, or other operations we need.
const Chat = model('Chat', chatSchema);

async function chatCreate({ participantId }) {
  const chat = new Chat({
    participant: participantId,
  });
  const savedDoc = chat.save();
  return savedDoc;
}

/**
 *
 * @param {userId} param0 get all chat participant matches id
 * @returns chat
 */
async function getChatsbyUserId({ userId }) {
  const chats = await Chat.where('participant').elemMatch({ $eq: userId }).exec();
  console.log(chats);
  return (chats);
}

async function getChatbyUser({ email }) {
  // Todo: use getUserbyEmail then call getChatsbyUseId
  return Chat.find({ email });
}

module.exports = {
  chatCreate,
  getChatsbyUserId,
  getChatbyUser,
};

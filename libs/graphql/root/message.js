/**
 * Implement message graphql API
 */
const { isValidObjectId } = require('mongoose');
const { WRONG_ID_FORMAT } = require('../errors');
const {
  matchMessageByChat, matchLastMessageByChat, messageCreate, messageUpdate,
} = require('../../mongo/message');

function messageByChat({ cid }) {
  if (!isValidObjectId(cid)) {
    throw WRONG_ID_FORMAT;
  }
  return matchMessageByChat({ chatId: cid });
}

function lastMessageByChat({ cid }) {
  if (!isValidObjectId(cid)) {
    throw WRONG_ID_FORMAT;
  }
  return matchLastMessageByChat({ chatId: cid });
}

function createMessage({ inputMessage }) {
  const { chatId, senderId, content } = inputMessage;
  if (!isValidObjectId(chatId) || !isValidObjectId(senderId)) {
    throw WRONG_ID_FORMAT;
  }
  return messageCreate({
    chatId, senderId, content, status: 'unread',
  });
}

async function updateMessage({ mid }) {
  if (!isValidObjectId(mid)) {
    throw WRONG_ID_FORMAT;
  }
  return messageUpdate({ messageId: mid });
}

module.exports = {
  messageByChat,
  lastMessageByChat,
  messageCreate: createMessage,
  messageUpdate: updateMessage,
};

/**
 * Implement user graphql API
 */
// const { isValidEmail, isValidPassword } = require('../../../utils/validation');
const { isValidObjectID, isValidSting } = require('../../../utils/validation');
const { getChatsbyUserId, createChat } = require('../../mongo/chat');
const { WRONG_ID_FORMAT, WRONG_CHAT_FORMAT } = require('../errors');

/**
 *
 * @param {*} param0
 * @returns
 */
function chatByUser({ uid }) {
  // params validation
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  // logics
  return getChatsbyUserId({ userId: uid });
}

function chatCreate({ String, ID, Boolean }) {
  // params validation
  if (!isValidSting(String)) {
    throw WRONG_CHAT_FORMAT;
  }
  if (!isValidObjectID(ID)) {
    throw WRONG_ID_FORMAT;
  }
  return createChat({ content: String, userId: ID, def: Boolean });
}

module.exports = {
  chatByUser,
  chatCreate,
};

/**
 * Implement user graphql API
 */
// const { isValidEmail, isValidPassword } = require('../../../utils/validation');
const { isValidObjectID } = require('../../../utils/validation');
const { getChatsbyUserId, createChat } = require('../../mongo/chat');
const { WRONG_ID_FORMAT } = require('../errors');

/**
 *
 * @param {*} param0
 * @returns
 */
function chatsByUser({ uid }) {
  // params validation

  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }

  // logics
  return getChatsbyUserId({ userId: uid });
}

function chatCreate({ pids }) {
  // params validationc
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < pids.length; i++) {
    console.log(pids[i]);

    if (!isValidObjectID(pids[i])) {
      throw WRONG_ID_FORMAT;
    }
  }
  return createChat({ userId: pids });
}

module.exports = {
  chatsByUser,
  chatCreate,
};

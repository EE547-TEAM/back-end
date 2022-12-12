/**
 * Implement user graphql API
 */
// const { isValidEmail, isValidPassword } = require('../../../utils/validation');
const { isValidObjectID } = require('../../../utils/validation');
const { matchUserById } = require('../../mongo/user');
const { WRONG_ID_FORMAT } = require('../errors');

/**
 *
 * @param {*} param0
 * @returns
 */
function userById({ uid }) {
  // params validation
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  // logics
  return matchUserById({ userId: uid });
}

module.exports = {
  userById,
};

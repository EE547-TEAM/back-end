/**
 * Implement user graphql API
 */
// const { isValidEmail, isValidPassword } = require('../../../utils/validation');
const { isValidObjectID, isValidPassword } = require('../../../utils/validation');
// const { matchUserById } = require('../../mongo/user');
const { EMAIL_FORMAT, PASSWORD_FORMAT } = require('../errors');

/**
 *
 * @param {*} param0
 * @returns
 */
function login({ email, password }) {
  // params validation
  if (!isValidObjectID(email)) throw EMAIL_FORMAT;
  if (!isValidPassword(password)) throw PASSWORD_FORMAT;
  // logics

//   return matchUserById({ userId: uid });
}

module.exports = {
  login,
};

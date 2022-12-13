const { isObjectIdOrHexString } = require('mongoose');

/**
 * is valid email
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return reg.test(email);
}

/**
 *
 * @param {string} password
 * @returns {boolean}
 */
function isValidPassword(password) {
  return password !== '';
}

/**
 *
 * @param {string} id
 * @returns {boolean}
 */
function isValidObjectID(id) {
  return isObjectIdOrHexString(id);
}

/**
 *
 * @param {string} id
 * @returns {boolean}
 */
function isValidSting(string) {
  return string !== '';
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidObjectID,
  isValidSting,
};

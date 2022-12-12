const { isObjectIdOrHexString } = require('mongoose');

/**
 * is valid email
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return email !== '';
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

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidObjectID,
};

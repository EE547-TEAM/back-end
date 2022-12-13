/**
 * Implement user graphql API
 */
const { isValidEmail } = require('../../../utils/validation');
const { isValidObjectID } = require('../../../utils/validation');
const { matchUserById, isUserExisted, userProfileUpdate } = require('../../mongo/user');
const { userRateUpdate } = require('../../mongo/user');
const { WRONG_ID_FORMAT, EMAIL_FORMAT } = require('../errors');

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

/**
 *
 * @param { email: String } param0
 * @returns
 */
function userExisted({ email }) {
  if (!isValidEmail(email)) {
    throw EMAIL_FORMAT;
  }
  return isUserExisted({ email });
}

function userprofileUp({ uid, data }) {
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  return userProfileUpdate({ id: uid, data });
}

function rateUpdate({ uid, type }) {
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  userRateUpdate({ userId: uid, type });
  return userById({ uid });
}

module.exports = {
  userById,
  isUserExisted: userExisted,
  userProfileUpdate: userprofileUp,
  userRateUpdate: rateUpdate,
};

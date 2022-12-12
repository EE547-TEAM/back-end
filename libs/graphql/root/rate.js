/**
 * Implement user graphql API
 */
const { rateCreate } = require('../../mongo/rate');
const { isValidObjectID } = require('../../../utils/validation');
const { SCORE_FORMAT, WRONG_ID_FORMAT } = require('../errors');
const { getRatesbyUser } = require('../../mongo/rate');
/**
 *
 * @param {*} param0
 * @returns
 */
function rateCre({ inputRate }) {
  const {
    orderId, comment, fromUserId, toUserId, rateType,
  } = inputRate;
  let { score } = inputRate;
  score = Number.parseFloat(score);
  if (Number.isNaN(score)) {
    throw SCORE_FORMAT;
  }
  if (!isValidObjectID(fromUserId) || !isValidObjectID(toUserId)) {
    throw WRONG_ID_FORMAT;
  }
  return rateCreate({
    score, orderId, comment, fromUserId, toUserId, rateType,
  });
}

function rateByUser({ uid, type }) {
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  return getRatesbyUser({ userId: uid, type });
}

module.exports = {
  rateCreate: rateCre,
  rateByUser,
};

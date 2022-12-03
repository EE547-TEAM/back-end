/**
 * Define API handler implement here, general workflow:
 *  - register api
 *  - receive parameters,
 *  - parse them (if need),
 *  - call API you defined before.
 *  - handle error and return expected result.
 *
 * visit https://expressjs.com/en/starter/basic-routing.html for details.
 */
const express = require('express');
const { isObjectIdOrHexString } = require('mongoose');
const { RATE, GET_RATE_BY_USER } = require('../../../../config/API_PATH');
const { rateCreate, getRatesbyUser } = require('../../../../libs/apis/graphql');

const router = express.Router();

<<<<<<< HEAD
/**
 *
 * @param {string} type
 * @returns {boolean}
 */
function isValidRateType(type) {
  return (type === 'buyer' || type === 'seller');
}

router.post(RATE, async (req, res) => {
  let { score } = req.body;
  score = Number.parseFloat(score);
  const {
    comment, fromUserId, toUserId, type,
  } = req.body;
  if (
    Number.isNaN(score)
    || comment === undefined
    || !isObjectIdOrHexString(fromUserId)
    || !isObjectIdOrHexString(toUserId)
    || !isValidRateType(type)
  ) {
    res.sendStatus(400);
    return;
  }
  // todo: check user (both fromUserId and toUserId) is existed, return 403
  const newRate = await rateCreate({
    score, comment, fromUserId, toUserId, type,
=======
router.post(RATE, (req, res) => {
  let { score } = req.body;
  const {
    comment, fromUserId, toUserId, rateType,
  } = req.body;
  score = Number.parseFloat(score);
  if (Number.isNaN(score) || comment === undefined || !fromUserId || !isObjectIdOrHexString(fromUserId) || !toUserId || !isObjectIdOrHexString(toUserId) || (rateType !== 'buyer' && rateType !== 'seller')) {
    res.send(400);
  }
  // todo: check user (both fromUserId and toUserId) is existed, return 403

  const {
    score, comment, fromUserId, toUserId, rateType,
  } = req.body;

  const {
    score, comment, fromUserId, toUserId, rateType,
  } = req.body;

  rateCreate({
    score, comment, fromUserId, toUserId, rateType,
>>>>>>> 1497886 (address undefined filter)
  });
  res.send(200, JSON.stringify(newRate));
});

router.get(GET_RATE_BY_USER, async (req, res) => {
  const { toUserId, type } = req.query;
  if (!isObjectIdOrHexString(toUserId) || !isValidRateType(type)) {
    res.sendStatus(400);
    return;
  }
  res.send(200, JSON.stringify({
    res: await getRatesbyUser({ userId: toUserId, type }),
  }));
});

module.exports = router;

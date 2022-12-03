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
const { RATE } = require('../../../../config/API_PATH');
const { rateCreate } = require('../../../../libs/apis/graphql');

const router = express.Router();

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
    comment, fromUserId, toUserId, rateType,
  } = req.body;
  score = Number.parseFloat(score);
  if (Number.isNaN(score) || comment === undefined || !fromUserId || !isObjectIdOrHexString(fromUserId) || !toUserId || !isObjectIdOrHexString(toUserId) || (rateType !== 'buyer' && rateType !== 'seller')) {
    res.send(400);
  }
  // todo: check user (both fromUserId and toUserId) is existed, return 403
  rateCreate({
    score, comment, fromUserId, toUserId, rateType,
  });
  res.send(200);
});

module.exports = router;

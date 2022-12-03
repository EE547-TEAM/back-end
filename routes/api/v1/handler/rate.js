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
const { RATE } = require('../../../../config/API_PATH');
const { rateCreate } = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(RATE, (req, res) => {
  const {
    score, comment, fromUserId, toUserId, rateType,
  } = req.body;
  rateCreate({
    score, comment, fromUserId, toUserId, rateType,
  });
  res.send(200);
});

module.exports = router;

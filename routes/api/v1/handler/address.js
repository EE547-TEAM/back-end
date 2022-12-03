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
const { ADDRESS } = require('../../../../config/API_PATH');
const { addressCreate } = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(ADDRESS, (req, res) => {
  const {
    content, userId, def,
  } = req.body;
  addressCreate({
    content, userId, def,
  });
  res.send(200);
});

module.exports = router;

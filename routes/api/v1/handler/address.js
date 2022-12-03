<<<<<<< HEAD
=======
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
const { ADDRESS } = require('../../../../config/API_PATH');
const { addressCreate, getAddressbyId } = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(ADDRESS, (req, res) => {
  const {
    content, userId, def,
  } = req.body;
  if (content === '' || content === undefined || userId === '' || !isObjectIdOrHexString(userId) || userId === undefined || def === undefined) {
    res.send(400);
  }
  addressCreate({
    content, userId, def,
  });
  res.send(200);
});

router.get(ADDRESS, (req, res) => {
  const {
    _Id,
  } = req.body;
  if (_Id === '' || !isObjectIdOrHexString(_Id) || _Id === undefined) {
    res.send(400);
  }
  getAddressbyId({
    _Id,
  });
  res.send(200);
});

module.exports = router;
>>>>>>> 6c03994 (address function v1)

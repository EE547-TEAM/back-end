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
// const { isObjectIdOrHexString } = require('mongoose');
const { CHAT } = require('../../../../config/API_PATH');
const { chatCreate, getChatsbyUserId } = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(CHAT, (req, res) => {
  const {
    participantId,

  } = req.body;
  if (typeof participantId !== 'string') {
    res.sendStatus(400);
  }
  const ids = [...new Set(participantId.split(','))];
  if (ids.length < 2 || !ids.every((id) => isObjectIdOrHexString(id))) {
    res.sendStatus(400);
  }
  chatCreate({
    participantId: ids,
  });
  res.send(200);
});

router.get(CHAT, (req, res) => {
  const {
    participantId,
  } = req.body;
  if (participantId === '' || !isObjectIdOrHexString(participantId) || participantId === undefined) {
    res.sendStatus(400);
  }
  getChatsbyUserId({ userId: participantId });
  res.send(200);
});

module.exports = router;

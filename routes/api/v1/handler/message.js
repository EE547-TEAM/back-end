const express = require('express');
const { MESSAGE, MESSAGE_LAST, MESSAGE_STATUS } = require('../../../../config/API_PATH');
const {
  messageCreate, matchMessageByChat, matchLastMessageByChat, messageUpdate,
} = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(MESSAGE, (req, res) => {
  const {
    chatId, senderId, content, status,
  } = req.body;
  messageCreate({
    chatId, senderId, content, status,
  });
  res.send(200);
});

router.get(MESSAGE, async (req, res) => {
  const { chatId } = req.query;
  const messages = await matchMessageByChat({ chatId });
  res.send(messages);
});

router.get(MESSAGE_LAST, async (req, res) => {
  const { chatId } = req.query;
  const message = await matchLastMessageByChat({ chatId });
  res.send(message);
});

router.post(MESSAGE_STATUS, (req, res) => {
  const { messageId } = req.body;
  messageUpdate({ messageId });
  res.send(200);
});

module.exports = router;

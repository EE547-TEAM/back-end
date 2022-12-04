const express = require('express');
const {
  USER, USER_ID, USER_EMAIL, USER_PROFILE,
} = require('../../../../config/API_PATH');
const {
  userCreate, matchUserById, matchUserByEmail, userProfileUpdate,
} = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(USER, (req, res) => {
  const { name, email, password } = req.body;
  userCreate({ name, email, password });
  res.send(200);
});

router.get(USER_ID, async (req, res) => {
  const { userId } = req.params;
  const user = await matchUserById({ userId });
  res.send(user);
});

router.get(USER_EMAIL, async (req, res) => {
  const { email, password } = req.params;
  const user = await matchUserByEmail({ email, password });
  res.send(user);
});

router.post(USER_PROFILE, (req, res) => {
  const { userId } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  const params = {};
  params.userId = userId;
  if (name !== undefined) params.name = name;
  if (email !== undefined) params.email = email;
  if (password !== undefined) params.email = password;
  userProfileUpdate({ params });
  res.send(200);
});

module.exports = router;

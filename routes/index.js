/**
 * Route settings, match the app.use('/path')
 *
 * current: /
 */

const express = require('express');

const router = express.Router();

/**
 * verify is there is valid login user.
 */
router.get('/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) res.sendStatus(500);
    else res.sendStatus(200);
  });
});

router.get('/verify', (req, res) => {
  const user = req.session.loginUser;
  if (user == null) res.sendStatus(403);
  res.send(user);
});

router.get('/', (req, res) => {
  if (req.session.times === undefined) {
    req.session.times = 0;
  }
  res.send(`hello world! a: ${req.session.times}`);
  req.session.times += 1;
  // save session
  req.session.save((err) => {
    if (err) console.error(err);
  });
});

/**
 * register router as //ping -> /ping
 */
router.get('/ping', (req, res) => {
  res.sendStatus(204);
});

module.exports = router;

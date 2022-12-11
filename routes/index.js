/**
 * Route settings, match the app.use('/path')
 *
 * current: /
 */

const express = require('express');

const router = express.Router();

/**
 * register router as //ping -> /ping
 */
router.get('/ping', (req, res) => {
  res.sendStatus(204);
});

module.exports = router;

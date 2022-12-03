const express = require('express');
const { TEST } = require('../../../config/API_PATH');

const router = express.Router();

/* GET test listing. */
router.get(TEST, (req, res) => {
  res.send('call when call /v1/test');
});

module.exports = router;

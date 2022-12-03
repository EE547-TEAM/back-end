/**
 * all of route in this file have the same base url '/';
 */
const express = require('express');
const { ping } = require('../libs/apis/normal');

const router = express.Router();

/**
 * register router as //ping -> /ping
 */
router.get('/ping', ping);

module.exports = router;

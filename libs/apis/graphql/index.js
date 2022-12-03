const user = require('./user');
const address = require('./address.');
const chat = require('./chat');
const message = require('./message');
const order = require('./order');
const production = require('./production');
const rate = require('./rate');

module.exports = {
  ...user,
  ...address,
  ...chat,
  ...message,
  ...order,
  ...production,
  ...rate,
};

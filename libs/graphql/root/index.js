const userRoot = require('./user');
const addressRoot = require('./address');
const chatRoot = require('./chat');

// continue import your roots
const authorityRoot = require('./authority');
const productionRoot = require('./production');
const rateRoot = require('./rate');
const orderRoot = require('./order');
const messageRoot = require('./message');

module.exports = {
  hello: () => 'Hello world yes!',
  ...userRoot,
  ...addressRoot,
  ...chatRoot,
  // add your roots here.
  ...authorityRoot,
  ...productionRoot,
  ...rateRoot,
  ...orderRoot,
  ...messageRoot,
};

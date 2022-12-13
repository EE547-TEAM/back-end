const userRoot = require('./user');
// continue import your roots
const authorityRoot = require('./authority');
const productionRoot = require('./production');
const rateRoot = require('./rate');
const orderRoot = require('./order');

module.exports = {
  hello: () => 'Hello world yes!',
  ...userRoot,
  // add your roots here.
  ...authorityRoot,
  ...productionRoot,
  ...rateRoot,
  ...orderRoot,
};

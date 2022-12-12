const userRoot = require('./user');
// continue import your roots
const authorityRoot = require('./authority');
const productionRoot = require('./production');

module.exports = {
  hello: () => 'Hello world yes!',
  ...userRoot,
  // add your roots here.
  ...authorityRoot,
  ...productionRoot,
};

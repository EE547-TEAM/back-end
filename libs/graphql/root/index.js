const userRoot = require('./user');
// continue import your roots
const authorityRoot = require('./authority');

module.exports = {
  hello: () => 'Hello world yes!',
  ...userRoot,
  // add your roots here.
  ...authorityRoot,
};

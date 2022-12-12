const userRoot = require('./user');
// continue import your roots

module.exports = {
  hello: () => 'Hello world yes!',
  ...userRoot,
  // add your roots here.
};

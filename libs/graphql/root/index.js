const userRoot = require('./user');
const addressRoot = require('./address');

// continue import your roots

module.exports = {
  hello: () => 'Hello world yes!',
  ...userRoot,
  ...addressRoot,
  // add your roots here.
};

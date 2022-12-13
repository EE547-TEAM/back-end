const userRoot = require('./user');
const addressRoot = require('./address');
const chatRoot = require('./chat');

// continue import your roots

module.exports = {
  hello: () => 'Hello world yes!',
  ...userRoot,
  ...addressRoot,
  ...chatRoot,
  // add your roots here.
};

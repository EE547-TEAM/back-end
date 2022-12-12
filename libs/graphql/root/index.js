const userRoot = require('./user');
// continue import your roots
<<<<<<< HEAD
const productionRoot = require('./production');
=======
const authorityRoot = require('./authority');
>>>>>>> dev

module.exports = {
  hello: () => 'Hello world yes!',
  ...userRoot,
  // add your roots here.
<<<<<<< HEAD
  ...productionRoot,
=======
  ...authorityRoot,
>>>>>>> dev
};

const { matchUserById, matchUserByEmail } = require('../../mongo/user');

module.exports = {
  // hello: () => 'Hello world yes!',
  userById: ({ uid }) => matchUserById({ userId: uid }),
  userByEmail: ({ email, password }) => matchUserByEmail({ email, password }),
};

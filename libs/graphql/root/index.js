const { matchUserById, matchUserByEmail } = require('../../mongo/user');

const { getRatesbyUser } = require('../../mongo/rate');
const { matchProductById, matchProductByUser } = require('../../mongo/production');

module.exports = {
  // hello: () => 'Hello world yes!',
  userById: ({ uid }) => matchUserById({ userId: uid }),
  userByEmail: ({ email, password }) => matchUserByEmail({ email, password }),
  //  untest
  rateByUser: ({ uid, type }) => getRatesbyUser({ userId: uid, type }),
  // untest
  productionById: ({ pid }) => matchProductById({ productionID: pid }),
  productionByUser: ({ uid }) => matchProductByUser({ userId: uid }),
};

/**
 * Define User API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { User } = require('./model');
const { getRatesbyUser } = require('./rate');

/**
 *
 * @param { name: String, password: String, email: String } param0
 * @returns {Promise<*>}
 */
async function userCreate({ name, password, email }) {
  const user = new User({
    name,
    password,
    email,
    buyerRate: 0,
    sellerRate: 0,
  });
  const saveDoc = await user.save();
  return saveDoc;
}

/**
 *
 * @param {userId: Shema.Types.ObjectId} param0
 * @returns {Document}
 */
async function matchUserById({ userId }) {
  const user = await User.findOne({ _id: userId }).exec();
  return user;
}

/**
 * @description: according to email and password to find user
 * @param {email: String, password: String} param
 * @returns {Document}
 */
async function matchUserByEmail({ email, password }) {
  const user = await User.findOne({ email, password });
  return user;
}

/**
 *
 * @param {params: an boject includes parameters} param0
 * @return: {null}
 */
async function userProfileUpdate({ id, data }) {
  // const param = params;
  const filter = { _id: id };
  // delete param.userId;
  User.findOneAndUpdate(filter, data).exec();
}

/**
 * update user's rate
 * @param {{ userId: string, type: 'buyer' | 'seller', score: number }} param0
 * @returns { Document }
 */
async function userRateUpdate({ userId, type }) {
  const score = getRatesbyUser({ userId });
  return User.updateOne({ rateToId: userId, Type: type }, { $set: { score } }).exec();
}

module.exports = {
  userCreate,
  matchUserById,
  matchUserByEmail,
  userProfileUpdate,
  userRateUpdate,
};

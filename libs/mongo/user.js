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
 * @param { ClientSession | null | undefined } session
 * @returns {Promise<*>}
 */
async function userCreate({ name, email }, session) {
  const user = new User({
    name,
    email,
    buyerRate: 0,
    sellerRate: 0,
  });
  const saveDoc = await user.save({ session });
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
 * @description: according to email find user
 * @param {{email: String}} param
 * @returns {Document}
 */
async function matchUserByEmail({ email }) {
  const user = await User.findOne({ email });
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

async function isUserExisted({ email }) {
  const user = await User.findOne({ email }).exec();
  console.log('isUserExisted', user, user != null);
  return user != null;
}

module.exports = {
  userCreate,
  matchUserById,
  matchUserByEmail,
  userProfileUpdate,
  userRateUpdate,
  isUserExisted,
};

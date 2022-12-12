/**
 * Define Message API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { Schema } = require('mongoose');
const { Authority } = require('./model');

/**
 *
 * @param {{ userId: Schema.Types.ObjectId, password: string }} param0
 * @returns
 */
async function isUserIdAndPasswordMatched({ userId, password }) {
  const records = await Authority.find({ userId, password }).exec();
  return records.length !== 0;
}

/**
 *
 * @param {{ userId: Schema.Types.ObjectId, password: string }} param0
 */
async function updatePassword({ userId, password }) {
  const filter = { _id: userId };
  const update = { password };
  return Authority.findOneAndUpdate(filter, update).exec();
}

async function createPassword({ userId, password }) {
  const authority = new Authority({
    userId,
    password,
  });
  return authority.save();
}

module.exports = {
  isUserIdAndPasswordMatched,
  updatePassword,
  createPassword,
};

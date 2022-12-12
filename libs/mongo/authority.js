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
 * @param {{ userId: string, password: string }} param0
 * @returns
 */
async function isUserIdAndPasswordMatched({ userId, password }) {
  const records = await Authority.find({ userId, password }).exec();
  return records.length !== 0;
}

/**
 *
 * @param {{ userId: string, password: string }} param0
 */
async function updatePassword({ userId, password }, session) {
  const filter = { userId };
  const update = { $set: { password } };
  return Authority.updateOne(filter, update).session(session).exec();
}

async function createAuthority({ userId, password }, session) {
  const authority = new Authority({
    userId,
    password,
  });
  return authority.save({ session });
}

module.exports = {
  isUserIdAndPasswordMatched,
  updatePassword,
  createAuthority,
};

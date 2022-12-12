/**
 * Define User API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { User: userSchema } = require('../../schema');

// to create user document for mongoDB, or other operations we need.
const User = model('User', userSchema);

/**
 *
 * @param {*} param0
 * @returns
 */
async function findProductbyUser({ email }) {
  return User.find({ email });
}

module.exports = {
  findProductbyUser,
};

/**
 * Define User API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
const { model } = require('mongoose');
const { User: userSchema } = require('../../schema');

// to create user document for mongoDB, or other operations we need.
const User = model('Test', userSchema);

/**
 *
 * @param {*} param0
 * @returns
 */
async function matchUserAndPassword({ email, pw }) {
  return User.findOne({ email, password: pw });
}

module.exports = {
  matchUserAndPassword,
};

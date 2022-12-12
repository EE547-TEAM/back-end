/**
 * Implement user graphql API
 */
// const { isValidEmail, isValidPassword } = require('../../../utils/validation');
const { isValidPassword, isValidEmail, isValidObjectID } = require('../../../utils/validation');
const { isUserIdAndPasswordMatched, createAuthority, updatePassword } = require('../../mongo/authority');
const {
  isUserExisted, matchUserByEmail, userCreate,
} = require('../../mongo/user');
// const { matchUserById } = require('../../mongo/user');
const {
  EMAIL_FORMAT, PASSWORD_FORMAT, USER_NOT_FOUND, WRONG_ID_FORMAT, USER_EXISTED,
} = require('../errors');

/**
 *
 * @param {*} param0
 * @returns
 */
async function authority({ email, password }) {
  // params validation
  if (!isValidEmail(email)) throw EMAIL_FORMAT;
  if (!isValidPassword(password)) throw PASSWORD_FORMAT;
  if (!isUserExisted({ email })) throw USER_NOT_FOUND;
  // logics
  const user = await matchUserByEmail({ email });
  const isMatch = await isUserIdAndPasswordMatched({ userId: user.id, password });
  return isMatch ? user : null;
}

async function logout({ uid }) {
  if (!isValidObjectID(uid)) throw WRONG_ID_FORMAT;
  // todo: remove the redis data
  return true;
}

/**
 *
 * @param {*} param0
 */
async function register({ inputUser }) {
  const { name, email, password } = inputUser;
  if (!isValidEmail(email)) throw EMAIL_FORMAT;
  if (!isValidPassword(password)) throw PASSWORD_FORMAT;
  if (await isUserExisted({ email })) throw USER_EXISTED;
  // TODO: Transactions
  let user = null;
  try {
    user = await userCreate({ name, email });
    await createAuthority({ userId: user.id, password });
    // session.commitTransaction();
  } catch (error) {
    // Transaction rollback, we just hope no bug now.
    console.error('register', error);
    // session.abortTransaction();
  }
  return user;
}

async function resetPassword({ email, password, newPassword }) {
  if (!isValidEmail(email)) throw EMAIL_FORMAT;
  if (!isValidPassword(password)) throw PASSWORD_FORMAT;
  if (!(await isUserExisted({ email }))) throw USER_NOT_FOUND;

  const { id } = await matchUserByEmail({ email });

  if (!(await isUserIdAndPasswordMatched({ userId: id, password }))) { return false; }

  await updatePassword({ userId: id, password: newPassword });
  return true;
}

// async function forgetPassword(params) {

// }

module.exports = {
  authority,
  logout,
  register,
  resetPassword,
};

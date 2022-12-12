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

const LOGIN_USER = 'loginUser';

/**
 *
 * @param {import('express-session').Session} session
 */
function getLoginUserFrom(session) {
  return session[LOGIN_USER];
}

/**
 *
 * @param {import('express-session').Session} session
 * @param {Object} user
 */
async function saveLoginUserTo(session, user) {
  return new Promise((res, rej) => {
    // eslint-disable-next-line no-param-reassign
    session[LOGIN_USER] = user;
    session.save((err) => {
      if (err) rej(err);
      else res();
    });
  });
}

/**
 *
 * @param {*} param0
 * @returns
 */
async function authority({ email, password }, request) {
  //
  const loginUser = getLoginUserFrom(request.session);
  if (loginUser !== undefined) return loginUser;
  // params validation
  if (!isValidEmail(email)) throw EMAIL_FORMAT;
  if (!isValidPassword(password)) throw PASSWORD_FORMAT;
  if (!isUserExisted({ email })) throw USER_NOT_FOUND;
  // logics
  const user = await matchUserByEmail({ email });
  const isMatch = await isUserIdAndPasswordMatched({ userId: user.id, password });
  if (isMatch) {
    // save to session
    await saveLoginUserTo(request.session, user);
    return user;
  }
  return null;
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

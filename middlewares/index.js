const { NOT_LOGIN } = require('../libs/graphql/errors');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function requireLogin(req, res) {
  if (req.session.loginUser === undefined) {
    throw NOT_LOGIN;
  }
}

module.exports = {
  requireLogin,
};

const { GraphQLError } = require('graphql');

const ERROR_CODE = {
  // not found
  NOT_FOUND: {
    USER: 4041,
  },
  // bad request
  BAD_PARAMS: {
    ID_FORMAT: 4001,
    EMAIL_FORMAT: 4002,
    PASSWORD_FORMAT: 4003,
    PRICE_FORMAT: 4004,
    QUANTITY_FORMAT: 4005,
  },
  UNAUTHORIZED: {
    NOT_LOGIN: 4031,
    ROLE_NOT_MATCH: 4032,
    INVALID_VISIT: 4033,
  },
  // add your code here. try to follow the http error standards.
  EMPTY: {
    EMPTY_NAME: 4051,
  },
};

/**
 * setup new error
 * @param {number} code
 * @param {string} message
 * @returns {GraphQLError}
 */
function setNewError(code, message) {
  return new GraphQLError(message, {
    extensions: { code },
  });
}

// add your error here by passing error code and message.
// we need error message and code for frontend!
const WRONG_ID_FORMAT = setNewError(ERROR_CODE.BAD_PARAMS.ID_FORMAT, 'WRONG_ID_FORMAT');
const EMAIL_FORMAT = setNewError(ERROR_CODE.BAD_PARAMS.EMAIL_FORMAT, 'EMAIL_FORMAT');
const PASSWORD_FORMAT = setNewError(ERROR_CODE.BAD_PARAMS.PASSWORD_FORMAT, 'PASSWORD_FORMAT');
const PRICE_FORMAT = setNewError(ERROR_CODE.BAD_PARAMS.PRICE_FORMAT, 'PRICE_FORMAT');
const QUANTITY_FORMAT = setNewError(ERROR_CODE.BAD_PARAMS.QUANTITY_FORMAT, 'QUANTITY_FORMAT');
const NOT_LOGIN = setNewError(ERROR_CODE.UNAUTHORIZED.NOT_LOGIN, 'NOT_LOGIN');
const INVALID_VISIT = setNewError(ERROR_CODE.UNAUTHORIZED.INVALID_VISIT, 'INVALID_VISIT');
const ROLE_NOT_MATCH = setNewError(ERROR_CODE.UNAUTHORIZED.ROLE_NOT_MATCH, 'ROLE_NOT_MATCH');
const NOT_FOUND = setNewError(ERROR_CODE.NOT_FOUND.USER, 'USER NOT FOUND');
const EMPTY_NAME = setNewError(ERROR_CODE.EMPTY.EMPTY_NAME, 'EMPTY NAME');

module.exports = {
  WRONG_ID_FORMAT,
  EMAIL_FORMAT,
  INVALID_VISIT,
  ROLE_NOT_MATCH,
  PASSWORD_FORMAT,
  PRICE_FORMAT,
  QUANTITY_FORMAT,
  NOT_LOGIN,
  NOT_FOUND,
  EMPTY_NAME,
};
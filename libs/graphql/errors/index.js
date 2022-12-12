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
    USER_EXISTED: 4004,
    PRICE_FORMAT: 4005,
    QUANTITY_FORMAT: 4006,
    NAME_FORMAT: 4007,
    SCORE_FORMAT: 4008,
  },
  UNAUTHORIZED: {
    NOT_LOGIN: 4031,
    ROLE_NOT_MATCH: 4032,
    INVALID_VISIT: 4033,
  },
  // add your code here. try to follow the http error standards.
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
const NAME_FORMAT = setNewError(ERROR_CODE.BAD_PARAMS.NAME_FORMAT, 'NAME FORMAT');
const SCORE_FORMAT = setNewError(ERROR_CODE.BAD_PARAMS.SCORE_FORMAT, 'SCORE FORMAT');
const NOT_LOGIN = setNewError(ERROR_CODE.UNAUTHORIZED.NOT_LOGIN, 'NOT_LOGIN');
const INVALID_VISIT = setNewError(ERROR_CODE.UNAUTHORIZED.INVALID_VISIT, 'INVALID_VISIT');
const ROLE_NOT_MATCH = setNewError(ERROR_CODE.UNAUTHORIZED.ROLE_NOT_MATCH, 'ROLE_NOT_MATCH');
const USER_NOT_FOUND = setNewError(ERROR_CODE.NOT_FOUND.USER, 'USER NOT FOUND');
const USER_EXISTED = setNewError(ERROR_CODE.BAD_PARAMS.USER_EXISTED, 'USER_EXISTED');

module.exports = {
  WRONG_ID_FORMAT,
  EMAIL_FORMAT,
  INVALID_VISIT,
  ROLE_NOT_MATCH,
  PASSWORD_FORMAT,
  PRICE_FORMAT,
  QUANTITY_FORMAT,
  NOT_LOGIN,
  USER_NOT_FOUND,
  USER_EXISTED,
  NAME_FORMAT,
  SCORE_FORMAT,
};

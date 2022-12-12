const { GraphQLError } = require('graphql');

const ERROR_CODE = {
  // bad request
  BAD_PARAMS: {
    ID_FORMAT: 4001,
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
const WRONG_ID_FORMAT = setNewError(ERROR_CODE.BAD_PARAMS.ID_FORMAT, 'id format not correct');

module.exports = {
  WRONG_ID_FORMAT,
};

/**
 * Implement user graphql API
 */
// const { isValidEmail, isValidPassword } = require('../../../utils/validation');
const { isValidObjectID, isValidSting } = require('../../../utils/validation');
const { getAddressbyId, createAddress } = require('../../mongo/address.');
const { WRONG_ID_FORMAT, WRONG_ADDRESS_FORMAT } = require('../errors');

/**
 *
 * @param {*} param0
 * @returns
 */
function addressById({ aid }) {
  // params validation
  if (!isValidObjectID(aid)) {
    throw WRONG_ID_FORMAT;
  }
  // logics
  return getAddressbyId({ _id: aid });
}

function addressCreate({ inputAddress }) {
  // params validation
  const {
    content,
    userId,
    def,
  } = inputAddress;
  if (!isValidObjectID(userId)) {
    throw WRONG_ID_FORMAT;
  }
  if (!isValidSting(content)) {
    throw WRONG_ADDRESS_FORMAT;
  }
  return createAddress({ content, userId, def });
}

module.exports = {
  addressById,
  addressCreate,
};

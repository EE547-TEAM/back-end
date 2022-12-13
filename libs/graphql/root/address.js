/**
 * Implement user graphql API
 */
// const { isValidEmail, isValidPassword } = require('../../../utils/validation');
const { isValidObjectID, isValidSting } = require('../../../utils/validation');
const { getAddressbyId, addressCreate } = require('../../mongo/address.');
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

function createAddress({ inputAddress }) {
  // params validation
  const {
    content,
    userId,
    def,
  } = inputAddress;
  if (!isValidSting(userId)) {
    throw WRONG_ID_FORMAT;
  }
  if (!isValidObjectID(content)) {
    throw WRONG_ADDRESS_FORMAT;
  }
  return addressCreate({ content, userId, def });
}

module.exports = {
  addressById,
  createAddress,
};

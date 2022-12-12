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

function createAddress({ String, ID, Boolean }) {
  // params validation
  if (!isValidSting(String)) {
    throw WRONG_ID_FORMAT;
  }
  if (!isValidObjectID(ID)) {
    throw WRONG_ADDRESS_FORMAT;
  }
  return addressCreate({ content: String, userId: ID, def: Boolean });
}

module.exports = {
  addressById,
  createAddress,
};

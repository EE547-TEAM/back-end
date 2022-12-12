/**
 * Implement production graphql API
 */
const { isValidObjectID } = require('../../../utils/validation');
const { matchProductById } = require('../../mongo/production');
const { WRONG_ID_FORMAT } = require('../errors');

// function productionCreate({ InputProduction }) {
//   const { userId, price, quantity, description, publishTime, addressId } = InputProduction;
//     if (!isValidObjectID(userId) || !isValidObjectID(addressId)) {
//       throw WRONG_ID_FORMAT;
//     }
// }

/**
 *
 * @param { pid: Schema.Types.ObjectId } param0
 * @returns
 */
function productionById({ pid }) {
  // params validation
  if (!isValidObjectID(pid)) {
    throw WRONG_ID_FORMAT;
  }
  // logics
  return matchProductById({ productionID: pid });
}

module.exports = {
  productionById,
};

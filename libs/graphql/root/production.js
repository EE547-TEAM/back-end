/**
 * Implement production graphql API
 */
const { isValidObjectID } = require('../../../utils/validation');
const { matchProductById } = require('../../mongo/production');
const {
  WRONG_ID_FORMAT, EMPTY_NAME, PRICE_FORMAT, QUANTITY_FORMAT,
} = require('../errors');

function productionCreate({ InputProduction }) {
  const {
    userId, name, condition, description, addressId,
  } = InputProduction;
  let { price, quantity } = InputProduction;
  if (!isValidObjectID(userId) || !isValidObjectID(addressId)) {
    throw WRONG_ID_FORMAT;
  }
  price = Number.parseFloat(price);
  quantity = Number(quantity);

  if (name === undefined) {
    throw EMPTY_NAME;
  }

  if (Number.isNaN(price)) {
    throw PRICE_FORMAT;
  }

  if (Number.isNaN(quantity)) {
    throw QUANTITY_FORMAT;
  }

  return productionCreate({
    userId,
    price,
    name,
    condition,
    quantity,
    description,
    addressId,
  });
}

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
  productionCreate,
  productionById,
};

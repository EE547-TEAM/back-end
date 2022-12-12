/**
 * Implement production graphql API
 */
const { isValidObjectID } = require('../../../utils/validation');
const {
  matchProductById, productCreate, matchProductByUser, matchProductByName,
  productUpdate, productDelete,
} = require('../../mongo/production');
const {
  WRONG_ID_FORMAT, EMPTY_NAME, PRICE_FORMAT, QUANTITY_FORMAT,
} = require('../errors');

/**
 *
 * @param { inputproduction} param0
 * @returns
 */
function productionCreate({ inputProduction }) {
  const {
    userId, name, condition, description, addressId,
  } = inputProduction;
  let { price, quantity } = inputProduction;
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
  return productCreate({
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

/**
 *
 * @param { uid: Schema.Types.ObjectId } param0
 * @returns
 */
function productionByUser({ uid }) {
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  return matchProductByUser({ userId: uid });
}

function productionByName({ name }) {
  if (name === undefined) {
    throw EMPTY_NAME;
  }
  return matchProductByName({ name });
}

function productionUpdate({ pid, data }) {
  return productUpdate({ id: pid, data });
}

function productionDelete({ pid }) {
  return productDelete({ productionID: pid });
}

module.exports = {
  productionCreate,
  productionById,
  productionByUser,
  productionByName,
  productionUpdate,
  productionDelete,
};

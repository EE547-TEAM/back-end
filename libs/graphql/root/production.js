/**
 * Implement production graphql API
 */
const { isValidObjectID } = require('../../../utils/validation');
const { getAddressbyId } = require('../../mongo/address.');
const {
  matchProductById, productCreate, matchProductByUser, matchProductByName,
  productUpdate, productDelete,
} = require('../../mongo/production');
const { matchUserById } = require('../../mongo/user');
const {
  WRONG_ID_FORMAT, PRICE_FORMAT, QUANTITY_FORMAT, NAME_FORMAT, ACTIVATE_STATUS_FORMAT,
} = require('../errors');

async function getAggregatedProductObject(prodDoc) {
  const [addrDoc, userDoc] = await Promise.all([
    getAddressbyId({ _id: prodDoc.addressId }),
    matchUserById({ userId: prodDoc.userId }),
  ]);
  const prod = prodDoc.toObject();
  prod.address = addrDoc && addrDoc.toObject();
  prod.user = userDoc && userDoc.toObject();
  return prod;
}

/**
 *
 * @param { inputproduction} param0
 * @returns
 */
async function productionCreate({ inputProduction }) {
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
    throw NAME_FORMAT;
  }

  if (Number.isNaN(price)) {
    throw PRICE_FORMAT;
  }

  if (Number.isNaN(quantity) || quantity === 0) {
    throw QUANTITY_FORMAT;
  }
  const prodDoc = await productCreate({
    userId,
    price,
    name,
    condition,
    quantity,
    description,
    addressId,
    isActivate: true,
  });
  return getAggregatedProductObject(prodDoc);
}

/**
 *
 * @param { pid: Schema.Types.ObjectId } param0
 * @returns
 */
async function productionById({ pid }) {
  // params validation
  if (!isValidObjectID(pid)) {
    throw WRONG_ID_FORMAT;
  }
  // logics
  const prodDoc = await matchProductById({ productionID: pid });
  return getAggregatedProductObject(prodDoc);
}

/**
 *
 * @param { uid: Schema.Types.ObjectId } param0
 * @returns
 */
async function productionByUser({ uid, activate }) {
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  if (activate === undefined) {
    throw ACTIVATE_STATUS_FORMAT;
  }
  const prodDocs = await matchProductByUser({ userId: uid, isActivate: activate });
  return Promise.all(prodDocs.map((prodDoc) => getAggregatedProductObject(prodDoc)));
}

async function productionByName({ name, activate }) {
  if (name === undefined || name === '') {
    throw NAME_FORMAT;
  }
  if (activate === undefined) {
    throw ACTIVATE_STATUS_FORMAT;
  }
  const prodDoc = await matchProductByName({ name, isActivate: activate });
  return getAggregatedProductObject(prodDoc);
}

async function productionUpdate({ pid, data }) {
  if (!isValidObjectID(pid)) {
    throw WRONG_ID_FORMAT;
  }
  const prod = await productUpdate({ id: pid, data });
  return getAggregatedProductObject(prod);
}

async function productionDelete({ pid }) {
  if (!isValidObjectID(pid)) {
    throw WRONG_ID_FORMAT;
  }
  const prod = await productDelete({ productionID: pid });
  return getAggregatedProductObject(prod);
}

async function productionViewTimeincrement({ pid }) {
  if (!isValidObjectID(pid)) {
    throw WRONG_ID_FORMAT;
  }
  const product = await productionById({ pid });
  let { viewTime } = product;
  viewTime += 1;
  const data = { viewTime };
  const prod = await productUpdate({ id: pid, data });
  return getAggregatedProductObject(prod);
}

module.exports = {
  productionCreate,
  productionById,
  productionByUser,
  productionByName,
  productionUpdate,
  productionDelete,
  productionViewTimeincrement,
};

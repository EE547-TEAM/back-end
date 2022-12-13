/**
 * Implement order graphql API
 */
const { isValidObjectID } = require('../../../utils/validation');
const {
  matchOrderById, matchOrderBySeller, matchcOrderByBuyer, orderCreate, updateOrder,
} = require('../../mongo/order');
const { matchProductById, productUpdate } = require('../../mongo/production');
const { WRONG_ID_FORMAT, QUANTITY_FORMAT, STATUS_FORMAT } = require('../errors');

/**
 *
 * @param { oid: Schema.Types.ObjectId } param0
 * @returns
 */
function orderById({ oid }) {
  // params validation
  if (!isValidObjectID(oid)) {
    throw WRONG_ID_FORMAT;
  }
  // logics
  return matchOrderById({ orderId: oid });
}

function orderBySeller({ uid, status }) {
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  return matchOrderBySeller({ userId: uid, status });
}

function orderByBuyer({ uid, status }) {
  if (!isValidObjectID(uid)) {
    throw WRONG_ID_FORMAT;
  }
  return matchcOrderByBuyer({ userId: uid, status });
}

/**
 * @description: quantity has to be > 0 and < product.quantity(Stock)
 * @param {*} param0
 * @returns
 */
async function createOrder({ inputOrder }) {
  const {
    productionID,
    buyerID,
    addressToId,
  } = inputOrder;
  let { quantity } = inputOrder;
  quantity = Number(quantity);

  if (Number.isNaN(quantity) || quantity === 0) {
    throw QUANTITY_FORMAT;
  }

  if (!isValidObjectID(productionID)
  || !isValidObjectID(buyerID)
  || !isValidObjectID(addressToId)) {
    throw WRONG_ID_FORMAT;
  }
  const product = await matchProductById({ productionID });

  if (quantity > product.quantity) {
    throw QUANTITY_FORMAT;
  }
  const sellerID = product.userId;
  const addressFromId = product.addressId;
  return orderCreate({
    productionID, quantity, buyerID, sellerID, addressFromId, addressToId,
  });
}

async function orderCreatedToTrading({ oid }) {
  if (!isValidObjectID(oid)) {
    throw WRONG_ID_FORMAT;
  }
  const order = await orderById({ oid });
  const { status } = order;
  if (status !== 'created') {
    throw STATUS_FORMAT;
  }
  const modifiedTime = new Date();
  return updateOrder({ orderId: oid, status: 'trading', modifiedTime });
}

async function orderTradingToConfirm({ oid }) {
  if (!isValidObjectID(oid)) {
    throw WRONG_ID_FORMAT;
  }
  // get order
  const order = await orderById({ oid });
  const { status, productionID } = order;
  let { quantity } = order;
  // check status
  if (status !== 'trading') {
    throw STATUS_FORMAT;
  }
  const product = await matchProductById({ productionID });
  // check isActivate
  if (product.isActivate === false) {
    throw STATUS_FORMAT;
  }
  // check quantity
  if (quantity > product.quantity) {
    throw QUANTITY_FORMAT;
  }
  const modifiedTime = new Date();
  quantity = product.quantity - quantity;
  const data = { quantity };
  if (quantity === 0) {
    data.isActivate = false;
  }
  // 1.update production info
  productUpdate({ id: productionID, data });
  // 2.update order info
  return updateOrder({ orderId: oid, status: 'confirm', modifiedTime });
}

async function orderTradingToReject({ oid }) {
  if (!isValidObjectID(oid)) {
    throw WRONG_ID_FORMAT;
  }
  const order = await orderById({ oid });
  const { status } = order;
  if (status !== 'trading') {
    throw STATUS_FORMAT;
  }
  const modifiedTime = new Date();
  return updateOrder({ orderId: oid, status: 'reject', modifiedTime });
}

module.exports = {
  orderById,
  orderBySeller,
  orderByBuyer,
  orderCreate: createOrder,
  //   orderUpdate,
  orderCreatedToTrading,
  orderTradingToConfirm,
  orderTradingToReject,
};

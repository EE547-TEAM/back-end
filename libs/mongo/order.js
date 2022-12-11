/**
 * Define Order API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */

const { Order } = require('./model');

/**
 *
 * @param {productionId: Schema.Types.ObjectId, quantity: Number,
 *          buyerID: Schema.Types.ObjectId, sellerID: Schema.Types.ObjectId, status: String,
 *          addressFromId: Schema.Types.ObjectId, addressToId: Schema.Types.ObjectId} param
 * @returns {}
 */
async function orderCreate({
  productionID, quantity, buyerID, sellerID, addressFromId, addressToId,
}) {
  const order = new Order({
    productionID,
    quantity,
    buyerID,
    sellerID,
    status: 'created',
    tradingTimestamp: null,
    rejectTimestamp: null,
    confirmTimestamp: null,
    // addressId
    addressFromId,
    addressToId,
  });
  const orderdoc = await order.save();
  return orderdoc;
}

/**
 * @param {{_id:  Schema.Types.ObjectId}} params
 * @returns {Document}
 */
async function matchOrderById({ orderId }) {
  const order = await Order.findOne({ _id: orderId }).exec();
  return order;
}

/**
 *
 * @param {userId: Schema.Types.ObjectId, status: String} params
 * @returns {Documents}
 */
async function matchOrderBySeller({ userId, status }) {
  return Order.find({ sellerID: userId, status });
}

/**
 *
 * @param {userId: Schema.Types.ObjectId, status: String} params
 * @returns {Documents}
 */
async function matchcOrderByBuyer({ userId, status }) {
  return Order.find({ buyerID: userId, status });
}

/**
 *
 * @param {orderId: Schema.Types.ObjectId, status: String, modifiedTime: Date} params
 * when there is status change, update the status and corresponding timestamp
 */
async function updateOrder({ orderId, status, modifiedTime }) {
  const filter = { _id: orderId };
  switch (status) {
    case 'trading': {
      const update1 = { status: 'trading', tradingTimestamp: modifiedTime };
      await Order.findOneAndUpdate(filter, update1);
      // order.tradingTimestamp = modifiedTime;
      break;
    }
    case 'reject': {
      const update2 = { status: 'reject', rejectTimestamp: modifiedTime };
      await Order.findOneAndUpdate(filter, update2);
      break;
    }
    case 'confirm': {
      const update3 = { status: 'confirm', confirmTimestamp: modifiedTime };
      await Order.findOneAndUpdate(filter, update3);
      break;
    }
    default:
      break;
  }
}

module.exports = {
  orderCreate,
  matchOrderById,
  matchOrderBySeller,
  matchcOrderByBuyer,
  updateOrder,
};

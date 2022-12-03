/**
 * Define Order API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { Order: orderSchema } = require('../../schema');

// to create user document for mongoDB, or other operations we need.
const Order = model('Order', orderSchema);

/**
 * 
 * @param {productionId: Schema.Types.ObjectId, quantity: Number, 
 *          buyerID: Schema.Types.ObjectId, sellerID: Schema.Types.ObjectId, status: String,
 *          addressFromId: Schema.Types.ObjectId, addressToId: Schema.Types.ObjectId} param
 * @returns {}
 */
async function orderCreate({productionID, quantity, buyerID, sellerID, addressFromId, addressToId}) {
  const order = new Order({ productionID,
                              quantity,
                              buyerID,
                              sellerID,
                              status: 'created',
                              // tradingTimestamp: new Date(),
                              // rejectTimestamp: new Date(),
                              // confirmTimestamp: new Date(),
                              // addressId
                              addressFromId,
                              addressToId });
  const orderdoc = await order.save();
  return orderdoc;
}


/**
 * @param {{email: string, pw: string}} params
 * @returns {Document}
 */
async function matchOrderById({ orderId }) {
  return Order.findOne({ orderId });
}

/**
 * 
 * @param {sellerID: Schema.Types.ObjectId, status: String} param
 * @returns {Documents}
 */
async function matchOrderBySeller({ sellerID, status }) {
  return Order.find({ sellerID, status });
}

/**
 * 
 * @param {buyerID: Schema.Types.ObjectId, status: String} param0 
 * @returns {Documents}
 */
async function matchcOrderByBuyer({ buyerId, status}) {
  return Order.find({ buyerId, status });
}

async function updateOrder({ orderId, status, modifiedTime}) {
  const order = Order.findOne({ orderId });
  order.status = status;
  switch(status){
    case 'trading':
      order.tradingTimestamp = modifiedTime;
      break;
    case 'reject':
      order.rejectTimestamp = modifiedTime;
      break;
    case 'confirm':
      order.confirmTimestamp = modifiedTime;
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
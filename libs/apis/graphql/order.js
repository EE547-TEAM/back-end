/**
 * Define Order API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { ConditionFilterSensitiveLog } = require('@aws-sdk/client-dynamodb');
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
  console.log(productionID);
  const order = new Order({   productionID: productionID,
                              quantity,
                              buyerID,
                              sellerID,
                              status: 'created',
                              tradingTimestamp: null,
                              rejectTimestamp: null,
                              confirmTimestamp: null,
                              // addressId
                              addressFromId,
                              addressToId });
  const orderdoc = await order.save();
  return orderdoc;
}


/**
 * @param {{_id:  Schema.Types.ObjectId}} params
 * @returns {Document}
 */
async function matchOrderById({ orderId }) {
  console.log(orderId);
  const order =  await Order.findOne({ _id: orderId }).exec();
  return order;
}

/**
 * 
 * @param {userId: Schema.Types.ObjectId, status: String} params
 * @returns {Documents}
 */
async function matchOrderBySeller({ userId, status }) {
  return Order.find({ userId, status });
}

/**
 * 
 * @param {userId: Schema.Types.ObjectId, status: String} params
 * @returns {Documents}
 */
async function matchcOrderByBuyer({ userId, status }) {
  return Order.find({ userId, status });
}

/**
 * 
 * @param {orderId: Schema.Types.ObjectId, status: String, modifiedTime: Date} params
 */
async function updateOrder({ orderId, status, modifiedTime}) {

  const filter = { _id: orderId };
  switch(status){
    case "trading":
      console.log("success trading");
      const update1 = {status: "trading", tradingTimestamp: modifiedTime};
      await Order.findOneAndUpdate(filter, update1);
      // order.tradingTimestamp = modifiedTime;
      break;
    case "reject":
      const update2 = {status: "reject", rejectTimestamp: modifiedTime};
      await Order.findOneAndUpdate(filter, update2);
      break;
    case "confirm":
      const update3 = {status: "confirm", confirmTimestamp: modifiedTime};
      await Order.findOneAndUpdate(filter, update3);
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
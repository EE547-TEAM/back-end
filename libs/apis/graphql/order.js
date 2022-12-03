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
 * @param {{email: string, pw: string}} params
 * @returns {Document}
 */
async function matchOrder({ name }) {
  return Order.findOne({ name });
}

module.exports = {
  matchOrder,
};

/**
 * Define Product API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document } = require('mongoose');
const { Production: productSchema } = require('../../schema');

// to create user document for mongoDB, or other operations we need.
const Product = model('Product', productSchema);

/**
 * @param {{email: string, pw: string}} params
 * @returns {Document}
 */
async function matchProduct({ name }) {
  return Product.findOne({ name });
}

module.exports = {
  matchProduct,
};

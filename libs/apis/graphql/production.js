/**
 * Define Product API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */

const { model } = require('mongoose');
const { Production: productSchema } = require('../../schema');

// to create user document for mongoDB, or other operations we need.
const Product = model('Product', productSchema);

/**
 *
 * @param {userId: Schema.Types.ObjectId, price: Number, name: String, condition: String
 * , quantity: Number, description: Srtring, publishTime: Date
 * , addressId: Schema.Types.ObjectId } param0
 * @returns { Promise<*> }
 */
async function productCreate({
  userId, price, name, condition, quantity, description, publishTime, addressId,
}) {
  const product = new Product({
    userId, price, name, condition, quantity, description, publishTime, addressId, viewTime: 0,
  });
  const productdoc = await product.save();
  return productdoc;
}

/**
 * @description: we might want to get production from a order
 * , now we will use productionId to get the corresponding product
 * @param {{ Id: Schema.Types.ObjectId }} param
 * @returns { Document }
 */
async function matchProductById({ productionID }) {
  return Product.findOne({ _id: productionID }).exec();
}

/**
 * @description: according to userId, get all selling products
 * @param { userId: Schema.Type.ObjectId } param0
 * @returns { Document }
 */
async function matchProductByUser({ userId }) {
  return Product.find({ userId }).exec();
}

/**
 *
 * @param { name: String } param
 * @returns { Document }
 */
async function matchProductByName({ name }) {
  return Product.find({ name }).exec();
}

/**
 *
 * @param { params: an object of parameters
 * , for example: { productionID: 123455, name: T-shirt } } param
 * @return { Promise<*> }
 */
async function productUpdate({ params }) {
  const param = params;
  const filter = { _id: param.productionID };
  delete param.productionID;
  return Product.findOneAndUpdate(filter, param).exec();
}

/**
 *
 * @param {productionID: Schema.Types.ObjectId} param
 * @return { Promise<*> }
 */
async function productDelete({ productionID }) {
  return Product.findByIdAndDelete({ _id: productionID }).exec();
}

module.exports = {
  productCreate,
  matchProductById,
  matchProductByUser,
  matchProductByName,
  productUpdate,
  productDelete,
};

/**
 * Define Production API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */

const { Production } = require('./model');

/**
 *
 * @param {userId: Schema.Types.ObjectId, price: Number, name: String, condition: String
 * , quantity: Number, description: Srtring, publishTime: Date
 * , addressId: Schema.Types.ObjectId } param0
 * @returns { Promise<*> }
 */
async function productCreate({
  userId, price, name, condition, quantity, description, addressId,
}) {
  const product = new Production({
    userId, price, name, condition, quantity, description, addressId, viewTime: 0,
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
  console.log('yes?', productionID);
  // const product = await Production.findOne({ _id: productionID }).exec();
  // const product = await Production.find().exec();
  // console.log(product);
  return Production.find({ price: 80 }).exec();
}

/**
 * @description: according to userId, get all selling products
 * @param { userId: Schema.Type.ObjectId } param0
 * @returns { Document }
 */
async function matchProductByUser({ userId }) {
  return Production.find({ userId }).exec();
}

/**
 *
 * @param { name: String } param
 * @returns { Document }
 */
async function matchProductByName({ name }) {
  return Production.find({ name }).exec();
}

/**
 *
 * @param { params: an object of parameters
 * , for example: { productionID: 123455, name: T-shirt } } param
 * @return { Promise<*> }
 */
async function productUpdate({ id, data }) {
  // const param = params;
  const filter = { _id: id };
  // delete param.productionID;
  return Production.findOneAndUpdate(filter, data).exec();
}

/**
 *
 * @param {productionID: Schema.Types.ObjectId} param
 * @return { Promise<*> }
 */
async function productDelete({ productionID }) {
  return Production.findByIdAndDelete({ _id: productionID }).exec();
}

module.exports = {
  productCreate,
  matchProductById,
  matchProductByUser,
  matchProductByName,
  productUpdate,
  productDelete,
};

/**
 * Define Product API implement here
 * see any details about model, check the example under /examples/mongoose.js
 * or visit
 * https://mongoosejs.com/docs/models.html
 */
// eslint-disable-next-line no-unused-vars
const { model, Document, Schema } = require('mongoose');
const { Production: productSchema } = require('../../schema');

// to create user document for mongoDB, or other operations we need.
const Product = model('Product', productSchema);



async function productCreate({  userId, price, name, condition, quantity, 
                                description, publishTime, addressId }){

  const product = new Product ({ userId, price, name, condition, quantity, 
                                description, publishTime, addressId, viewTime: 0 });
  const productdoc = await product.save();
  return productdoc;
      
  }

/**
 * @description: we might want to get production from a order, now we
 * will use productionId to get the corresponding product
 * @param {{ Id: Schema.Types.ObjectId }} param
 * @returns { Document }
 */
async function matchProductById({ productionID }) {
  console.log("match product");
  return Product.findOne({ _id: productionID });
  
}

/**
 * @description: according to userId, get all selling products
 * @param { userId: Schema.Type.ObjectId } param0 
 * @returns { Document }
 */
async function matchProductByUser({ userId }){
  return Product.find({ userId });
}

/**
 * 
 * @param { name: String } param 
 * @returns { Document }
 */
async function matchProductByName({ name }){
  return Product.find({ name });
}

/**
 * 
 * @param { params: an object of parameters, for example: { productionID: 123455, name: T-shirt } } param
 * @return {null}
 */
async function updateProduct({ params }){
  console.log("match function");
  const filter = { _id: params["productionID"]};
  delete params.productionID;
  console.log(filter);
  // params.delete(productionID);
  await Product.findOneAndUpdate(filter, params);
  console.log(params);
}

/**
 * 
 * @param {productionID: Schema.Types.ObjectId} param
 * @return {nulll}
 */
async function deleteProduct({ productionID }){
  await Product.findByIdAndDelete({ _id: productionID });
}

module.exports = {
  productCreate,
  matchProductById,
  matchProductByUser,
  matchProductByName,
  updateProduct,
  deleteProduct,
};

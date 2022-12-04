const express = require('express');
const {
  PRODUCTION, PRO_USER, PRO_PID, PRO_NAME, PRO_UPDATE,
} = require('../../../../config/API_PATH');
const {
  productCreate, matchProductById, matchProductByUser,
  matchProductByName, productUpdate, productDelete,
} = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(PRODUCTION, (req, res) => {
  const {
    userId, price, name, condition, quantity, description, addressId,
  } = req.body;
  const publishTime = new Date();
  productCreate({
    userId, price, name, condition, quantity, description, publishTime, addressId,
  });
  res.send(200);
});

router.get(PRO_PID, async (req, res) => {
  const { productionID } = req.params;
  const product = await matchProductById({ productionID });
  res.send(product);
});

router.get(PRO_USER, async (req, res) => {
  const { userId } = req.params;
  const order = await matchProductByUser({ userId });
  res.send(order);
});

router.get(PRO_NAME, async (req, res) => {
  const { name } = req.params;
  const order = await matchProductByName({ name });
  res.send(order);
});

router.post(PRO_UPDATE, async (req, res) => {
  const { productionID } = req.body;
  const { price } = req.body;
  const { name } = req.body;
  const { condition } = req.body;
  const { quantity } = req.body;
  const { description } = req.body;
  const { addressId } = req.body;
  const { viewTime } = req.body;
  const params = {};
  params.productionID = productionID;
  if (price != null) params.price = price;
  if (name != null) params.name = name;
  if (condition != null) params.condition = condition;
  if (quantity != null) params.quantity = quantity;
  if (description != null) params.description = description;
  if (addressId != null) params.addressId = addressId;
  if (viewTime != null) params.viewTime = viewTime;
  productUpdate({ params });
  res.send(200);
});

router.delete(PRODUCTION, (req, res) => {
  const { productionID } = req.body;
  productDelete({ productionID });
  res.send(200);
});

module.exports = router;

const express = require('express');
const {
  ORDER, ORDER_ID, ORDER_USER, ORDER_STATUS,
} = require('../../../../config/API_PATH');
const {
  orderCreate, matchOrderById, matchOrderBySeller, matchcOrderByBuyer, updateOrder,
} = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(ORDER, (req, res) => {
  const {
    productionID, quantity, buyerID,
    sellerID, addressFromId, addressToId,
  } = req.body;
  orderCreate({
    productionID, quantity, buyerID, sellerID, addressFromId, addressToId,
  });
  res.send(200);
});

router.get(ORDER_ID, async (req, res) => {
  const { orderId } = req.params;
  const order = await matchOrderById({ orderId });
  res.send(order);
});

router.get(ORDER_USER, async (req, res) => {
  const { userId } = req.params;
  const { status } = req.params;
  const { isSeller } = req.params;
  if (isSeller === 'true') {
    const order = await matchOrderBySeller({ userId, status });
    res.send(order);
  } else {
    const order = await matchcOrderByBuyer({ userId, status });
    res.send(order);
  }
});

router.post(ORDER_STATUS, async (req, res) => {
  const { orderId, status } = req.body;
  const modifiedTime = new Date();
  updateOrder({ orderId, status, modifiedTime });
  res.send(200);
});

module.exports = router;

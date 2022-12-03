const express = require('express');
const { ORDER } = require('../../../../config/API_PATH');
const { orderCreate, matchOrderById, matchOrderBySeller, matchcOrderByBuyer, updateOrder } = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(ORDER, (req, res) => {
    const { productionId, quantity, buyerID, sellerID, addressFromId, addressToId } = req.body;
    orderCreate({ productionId, quantity, buyerID, sellerID, addressFromId, addressToId });
    res.send(200);
})

router.get(ORDER, (req, res) => {
    // const orderId = req.params;
    console.log(req);
    // console.log(req.params);
    // const order = matchOrderById({ orderId });
    res.sendStatus(200);
})



module.exports = router
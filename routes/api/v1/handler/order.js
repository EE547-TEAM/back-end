const e = require('express');
const express = require('express');
const { concatAST } = require('graphql');
const { ORDER, ORDER_ID, ORDER_USER } = require('../../../../config/API_PATH');
const { orderCreate, matchOrderById, matchOrderBySeller, matchcOrderByBuyer, updateOrder } = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(ORDER, (req, res) => {
    console.log(req.body);
    const { productionID, quantity, buyerID, sellerID, addressFromId, addressToId } = req.body;
    orderCreate({ productionID, quantity, buyerID, sellerID, addressFromId, addressToId });
    res.send(200);
})


router.get(ORDER_ID, async (req, res) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    const order = await matchOrderById({ orderId });
    res.send(order);
})

router.get(ORDER_USER, async (req, res) => {
    const userId = req.params.userId;
    const status = req.params.status;
    const isSeller = req.params.isSeller;
    console.log("seller is:", isSeller);
    if(isSeller == "true"){
        console.log("seller");
        const order = await matchOrderBySeller({ userId, status });
        res.send(order);
    }else{
        console.log("buyer");
        const order = await matchcOrderByBuyer({ userId, status });
        res.send(order);
    }
})

router.put(ORDER, async (req, res) => {
    const { orderId, status } = req.body;
    const modifiedTime = new Date();
    updateOrder({ orderId, status, modifiedTime });
    res.send(200);
})

module.exports = router
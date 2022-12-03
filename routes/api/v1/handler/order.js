const e = require('express');
const express = require('express');
const { concatAST } = require('graphql');
const { ORDER } = require('../../../../config/API_PATH');
const { orderCreate, matchOrderById, matchOrderBySeller, matchcOrderByBuyer, updateOrder } = require('../../../../libs/apis/graphql');

const router = express.Router();

router.post(ORDER, (req, res) => {
    console.log(req.body);
    const { productionID, quantity, buyerID, sellerID, addressFromId, addressToId } = req.body;
    orderCreate({ productionID, quantity, buyerID, sellerID, addressFromId, addressToId });
    res.send(200);
})


router.get('/order/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    const order = await matchOrderById({ orderId });
    res.send(order);
})

router.get('/order/:userId/:status/:isSeller', async (req, res) => {
    const userId = req.params.userId;
    const status = req.params.status;
    const isSeller = req.params.isSeller;
    // console.log(userId, status, isSeller);

    if(isSeller){
        const order = await matchOrderBySeller({ userId, status });
        res.send(order);
    }else{
        const order = await matchcOrderByBuyer({ userId, status });
        res.send(order);
    }
})

router.put(ORDER, async (req, res) => {
    const { orderId, status } = req.body;
    const modifiedTime = new Date();
    console.log(".....")
    console.log(orderId);
    console.log(status);
    console.log("......");
    updateOrder({ orderId, status, modifiedTime });
    res.send(200);
})

module.exports = router
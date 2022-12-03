const e = require('express');
const express = require('express');
const { concatAST } = require('graphql');
const { PRODUCTION, PRO_USER, PRO_PID, PRO_NAME, PRO_UPDATE } = require('../../../../config/API_PATH');
const { productCreate, matchProductById, matchProductByUser, matchProductByName, updateProduct, deleteProduct } = require('../../../../libs/apis/graphql');
const { route } = require('./order');

const router = express.Router();

router.post(PRODUCTION, (req, res) => {
    console.log(req.body);
    const { userId, price, name, condition, quantity, 
            description, addressId } = req.body;

    const publishTime = new Date();
    productCreate({ userId, price, name, condition, quantity, 
        description, publishTime, addressId });
    res.send(200);
})

router.get(PRO_PID, async (req, res) => {
    const productionID = req.params.productionID;
    console.log(productionID);
    const product = await matchProductById({ productionID });
    res.send(product);
})

router.get(PRO_USER, async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const order = await matchProductByUser({ userId });
    res.send(order);
})

router.get(PRO_NAME, async (req, res) => {
    const name = req.params.name;
    console.log(name);
    const order = await matchProductByName({ name });
    res.send(order);
})

router.put(PRO_UPDATE, async (req, res) => {
    const productionID = req.body.productionID;
    const price = req.body.price;
    const name = req.body.price;
    const condition = req.body.condition;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const addressId = req.body.addressId;
    const viewTime = req.body.viewTime;

    console.log(productionID);
    const params = {};
    params["productionID"] = productionID;
    if(price != null) params["price"] = price;
    if(name != null) params["price"] = price;
    if(condition != null) params["condition"] = condition;
    if(quantity != null) params["quantity"] = quantity;
    if(description != null) params["description"] = description;
    if(addressId != null) params["addressId"] = addressId;
    if(viewTime != null) params["viewTime"] = viewTime;

    updateProduct({ params });
    res.send(200);
})

router.delete(PRODUCTION, (req, res) => {
    const productionID = req.body.productionID;
    deleteProduct({ productionID });
    res.send(200);
})

// router.get('/order/:userId/:status/:isSeller', async (req, res) => {
//     const userId = req.params.userId;
//     const status = req.params.status;
//     const isSeller = req.params.isSeller;
//     console.log("seller is:", isSeller);
//     if(isSeller == "true"){
//         console.log("seller");
//         const order = await matchOrderBySeller({ userId, status });
//         res.send(order);
//     }else{
//         console.log("buyer");
//         const order = await matchcOrderByBuyer({ userId, status });
//         res.send(order);
//     }
// })

// router.put(ORDER, async (req, res) => {
//     const { orderId, status } = req.body;
//     const modifiedTime = new Date();
//     updateOrder({ orderId, status, modifiedTime });
//     res.send(200);
// })

module.exports = router
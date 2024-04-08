const express = require("express");
const path = require("path");
const router = express.Router();
const adminController = require('../controller/products');
router.get("/",adminController.getShopProducts);

router.get('/cart',adminController.getCartProducts);

router.get('/products',adminController.getProducts);

router.get('/product/:id', adminController.getProductDetails);

module.exports = router;

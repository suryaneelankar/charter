const express = require('express');
const path = require('path');
const adminController = require('../controller/products');
const router = express.Router();

router.get('/add-product', adminController.getAddedProduct);

router.post('/add-product',adminController.addAdminProducts);

router.delete('/delete-product/:id',adminController.deleteProduct);

router.put('/update-product/:id',adminController.updateProduct);

router.get('/:page',adminController.getProductsWithOffset);


 module.exports.router = router;
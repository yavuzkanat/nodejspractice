const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop');


// index page 
router.get("/", shopController.getHome);

// products
router.get('/products', shopController.getProducts);

// product/product-id
router.get('/products/:productID', shopController.getTheProduct);

// details
router.get('/details', shopController.getProductsDetails);

router.get('/categories/:categoryID',shopController.getProductByCategory);

//cart
router.get('/cart', shopController.getCart);

//orders 
router.get('/orders', shopController.getOrders);

module.exports = router;
const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop');


// index page 
router.get("/", shopController.getHome);

// products
router.get('/products', shopController.getAllProducts);



// details
router.get('/details/:detailID', shopController.getProductsDetails);

router.get('/categories/:categoryID',shopController.getProductByCategory);

//cart
router.get('/cart', shopController.getCart);

//orders 
router.get('/orders', shopController.getOrders);

module.exports = router;
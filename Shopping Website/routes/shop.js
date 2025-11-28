const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop');




// index page 
router.get("/", shopController.getHome);



// products
router.get('/products', shopController.getAllProducts);


// details
router.get('/details/:detailID', shopController.getProductsDetails);

router.get('/categories/:categoryID', shopController.getProductByCategory);

router.get('/cart', shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/delete-order',shopController.postDeleteOrder);






module.exports = router;
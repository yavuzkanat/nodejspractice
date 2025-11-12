

const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
// const bodyParser = require('body-parser');
// // body-parser
// router.use(bodyParser.urlencoded({extended:false}));

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productID",adminController.getEditProduct)

router.post("/edit-product/:productID", adminController.postEditProduct);

router.get("/products", adminController.getProducts);

router.post("/delete-product", adminController.postdeleteProduct);

module.exports = router;

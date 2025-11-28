

const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
const { checkTheSession } = require('../middlewares/session');
  

router.get("/add-product", checkTheSession, adminController.getAddProduct);

router.post("/add-product", checkTheSession ,adminController.postAddProduct);

router.get("/edit-product/:productID",checkTheSession,adminController.getEditProduct)

router.post("/edit-product/:productID",checkTheSession, adminController.postEditProduct);

router.get("/products", checkTheSession ,adminController.getProducts);

router.get('/category',checkTheSession,adminController.getCategory);

router.get('/add-category',checkTheSession,adminController.getAddCategory);

router.post('/add-category',checkTheSession,adminController.postAddCategory); 

router.post('/delete-category',checkTheSession,adminController.postDeleteCategory); 

router.post("/delete-product", checkTheSession,adminController.postdeleteProduct);

router.get('/upload-file',checkTheSession,adminController.getUploadFile);

router.post('/upload-file',checkTheSession,adminController.postUploadFile);

module.exports = router;

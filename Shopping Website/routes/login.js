const loginController = require('../controller/login')
const express = require('express');
const router = express.Router();




//login
router.get('/login', loginController.getLogin);

router.post('/login', loginController.postLogin);

//logout 
router.get('/logout', loginController.logoutPost);

//register
router.get('/register', loginController.getRegister);

router.post('/register', loginController.postRegister);







module.exports = router;
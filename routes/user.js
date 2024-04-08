const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { route } = require('./shop');
const { check } = require('express-validator');


router.post('/user',userController.addUser);
// router.get('/UserDetails',userController.getUser);

// router.get('/getUserById/:id',userController.getUserById);

// router.put('/updateUser/:id',userController.updateUser);

// router.delete('/deleteUser/:id',userController.deleteUserById);

router.post('/user/login',userController.validateAndLoginUser);

router.get('/user/reset-password',userController.resetPassword);

router.post('/user/reset-password/:token',userController.resetNewPassword);

module.exports = router;
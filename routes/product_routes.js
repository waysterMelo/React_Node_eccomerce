const express = require('express');
const router = express.Router();


const {requireSign, isAdmin, isAuth } = require('../controllers/auth');
const { create, productId, read, remove } = require('../controllers/product_controller');
const {userById} = require('../controllers/user_controller');

router.post('/product/create/:userId', requireSign, isAdmin, isAuth, create);
router.get('/product/:productId', read);
router.delete('/product/:productId/:userId', requireSign, isAuth, isAdmin, remove);

router.param("userId", userById);
router.param("productId", productId);



module.exports = router;
const express = require("express");
const router = express.Router();

const { create } = require("../controllers/category_controller");
const {isAuth, requireSign, isAdmin} = require("../controllers/auth");
const {userById} = require('../controllers/user_controller');


router.post('/category/create/:userId', requireSign, isAuth, isAdmin, create);
router.param("userId", userById);

module.exports = router;
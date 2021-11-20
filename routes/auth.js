const express = require('express');
const router = express.Router();
const { signUp, signIn, signout, requireSign } = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

router.post('/signup',  userSignupValidator, signUp);
router.post('/signin', signIn);
router.get('/signout', signout);


module.exports = router;
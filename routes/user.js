const express = require('express');
const router = express.Router();
const {handleUserSignUp, handleUserLogIn, handleUserLogout} = require('../controllers/user')

router.post('/', handleUserSignUp);
router.post('/login', handleUserLogIn);
router.get('/logout', handleUserLogout);


module.exports = router;
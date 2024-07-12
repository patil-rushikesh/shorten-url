const express = require('express');
const router = express.Router();
const { handleGetUrlinViews, handleGetUrlForAdmin } = require('../controllers/url')
const { handleRenderSignUpPage, handleRenderLogInPage } = require('../controllers/user')
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');


router.get("/admin/url", restrictTo(["ADMIN"]), handleGetUrlForAdmin)


router.get("/", restrictTo(["NORMAL","ADMIN"]) ,handleGetUrlinViews)
router.get("/signup", handleRenderSignUpPage)
router.get("/login", handleRenderLogInPage)

module.exports = router;
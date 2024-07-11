const express = require('express');
const router = express.Router();
const { handleGetUrlinViews } = require('../controllers/url')
const URL = require('../models/url')


router.get("/", handleGetUrlinViews)

module.exports = router;
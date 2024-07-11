const express = require('express');
const {handleGenerateShortURL, handleGetAnalytics, handleRedirection} = require("../controllers/url");
const router = express.Router();

router.post('/',handleGenerateShortURL)
router.get('/analytics/:shortId', handleGetAnalytics)
router.get('/:shortId', handleRedirection)

module.exports = router
const express = require('express');
const urlShortenerController = require('../controllers/url-shortener-controller');

const router = express.Router();

router.get('/:urlPath', urlShortenerController.getUrlRedirect);

module.exports = router;
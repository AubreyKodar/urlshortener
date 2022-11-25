const express = require('express');
const urlShortenerController = require('../controllers/url-shortener-controller');

const router = express.Router();

router.get('/list', urlShortenerController.getAllAvailableUrl);
router.post('/encode', urlShortenerController.encodeUrl);
router.post('/decode', urlShortenerController.decodeUrl);
router.get('/statistic/:urlPath', urlShortenerController.gerStatistics);

module.exports = router;
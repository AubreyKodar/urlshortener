const validUrl = require('valid-url');
const UrlModel = require('../models/url-model');
const UrlEncoder = require('../util/url-encoder');

/**
 * List all available Urls
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAllAvailableUrl = async (req, res) => {
    const shortenedUrls = await UrlModel.find();
    res.status().send(200, shortenedUrls);
}

/**
 * Generate short URL
 * @param req
 * @param res
 * @returns {*}
 */
exports.encodeUrl = (req, res) => {
    const url = req.body.url;

    if (!validUrl.isUri(url)) {
        return res.status(400).json({ error: 'The provided url is invalid' });
    }

    const shortUrl = UrlEncoder.generateShortUrl();

    const urlModel = new UrlModel({
        path: shortUrl.path,
        longUrl: url,
        shortUrl: shortUrl.url,
    });

    urlModel.save()
      .catch(error => {
          return res.status(500).json({ error: error })
      });

    res.json({ url: shortUrl.url });
}

exports.decodeUrl = (req, res) => {
    res.status().send(200);
}

exports.gerStatistics = (req, res) => {
    const urlPath = req.params.urlPath;
    res.status().send(200, urlPath);
}

/**
 * @param req
 * @param res
 */
exports.getUrlRedirect = (req, res) => {
    res.status().send(200, 'redirecting');
}
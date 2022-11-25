const validUrl = require('valid-url');
const UrlModel = require('../models/url-model');
const UrlEncoder = require('../util/url-encoder');
const UrlExtractor = require('../util/url-path-extractor');

/**
 * List all available Urls
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAllAvailableUrl = async (req, res) => {
    const shortenedUrls = await UrlModel.find();
    res.json(200, shortenedUrls);
}

/**
 * Encode long URL to short URL
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

/**
 * Decode short URL to long URL
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.decodeUrl = async (req, res) => {
    const url = req.body.url;

    if (!validUrl.isUri(url)) {
        return res.status(400).json({ error: 'The provided url is invalid' });
    }

    const path = UrlExtractor.urlPathExtractor(url);

    const urlModel = await UrlModel.find({ path: path });

    if (Array.isArray(urlModel) && urlModel.length === 0) {
        return res.status(400).json({ error: 'The provided short URL does not match our records' });
    }
    
    res.json({ url: urlModel[0].longUrl });
}

/**
 * Get URL statistics
 * @param req
 * @param res
 */
exports.gerStatistics = async (req, res) => {
    const urlPath = req.params.urlPath;

    if (UrlEncoder.URL_PATH_LENGTH !== urlPath.length) {
        return res.status(400).json({ error: 'The provided path is invalid' });
    }

    const urlModel = await UrlModel.find({ path: urlPath });

    if (Array.isArray(urlModel) && urlModel.length === 0) {
        return res.status(400).json({ error: 'The provided short URL does not match our records' });
    }

    res.json({
        url: urlModel[0].shortUrl,
        clicks: urlModel[0].clicks,
        createdAt: urlModel[0].createdAt,
        lastUsed: urlModel[0].lastUsed
    });
}

/**
 * @param req
 * @param res
 */
exports.getUrlRedirect = async (req, res) => {
    const urlPath = req.params.urlPath;

    if (UrlEncoder.URL_PATH_LENGTH !== urlPath.length) {
        return res.status(400).json({ error: 'The provided path is invalid' });
    }

    const urlModel = (await UrlModel.find({ path: urlPath }))[0];

    if (!urlModel) {
        return res.status(400).json({ error: 'The provided short URL does not match our records' });
    }

    urlModel.clicks = Number.parseInt(urlModel.clicks) + 1;
    urlModel.lastUsed = (new Date()).getTime();
    urlModel.save();

    res.redirect(urlModel.longUrl);
}
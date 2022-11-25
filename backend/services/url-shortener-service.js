const validUrl = require('valid-url');
const UrlModel = require('../models/url-model');
const UrlEncoder = require("../util/url-encoder");
const UrlExtractor = require("../util/url-path-extractor");

/**
 * Return all models
 * @returns {Promise<Array<Object>>}
 */
const getAllUrls = () => {
    return UrlModel.find();
}

/**
 *
 * @param url
 * @returns {string}
 */
const addUrlModel = (url) => {
    if (!validUrl.isUri(url)) {
        throw { code: 400, message: 'The provided url is invalid' };
    }

    const shortUrl = UrlEncoder.generateShortUrl();

    const urlModel = new UrlModel({
        path: shortUrl.path,
        longUrl: url,
        shortUrl: shortUrl.url,
    });

    urlModel.save().catch(error => {
        throw { code: 500, message: error.message};
    });

    return shortUrl.url;
}

/**
 * @param path
 * @returns {Promise<Object>}
 */
const getUrlModel = async (path) => {
    const urlModel = (await UrlModel.find({ path: path }))[0];

    if (!urlModel) {
        throw { code: 400, message: 'The provided short URL does not match our records'};
    }

    return urlModel;
}

/**
 * Return long url
 * @param url
 * @returns {string}
 */
const getLongUrl = async (url) => {
    if (!validUrl.isUri(url)) {
        throw { code: 400, message: 'The provided url is invalid'};
    }

    const path = UrlExtractor.urlPathExtractor(url);

    const urlModel = await getUrlModel(path);
    return urlModel.longUrl;
}

/**
 *
 * @param urlPath
 * @returns Object
 */
const getStatistics = async (urlPath) => {
    const urlModel = await getUrlModel(urlPath);

    return {
        url: urlModel.shortUrl,
        clicks: urlModel.clicks,
        createdAt: urlModel.createdAt,
        lastUsed: urlModel.lastUsed
    };
}

/**
 * Update
 * @param urlPath
 * @returns {string}
 */
const updateStatisticsAndReturnLongUrl = async (urlPath) => {
    const urlModel = await getUrlModel(urlPath);

    urlModel.clicks = Number.parseInt(urlModel.clicks) + 1;
    urlModel.lastUsed = (new Date()).getTime();
    urlModel.save();

    return urlModel.longUrl;
}

module.exports = {
    getAllUrls,
    addUrlModel,
    getLongUrl,
    getStatistics,
    updateStatisticsAndReturnLongUrl
};
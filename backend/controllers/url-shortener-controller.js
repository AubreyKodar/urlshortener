const returnErrorResponse = require('../util/error-message');
const {
    getAllUrls,
    addUrlModel,
    getLongUrl,
    getStatistics,
    updateStatisticsAndReturnLongUrl
} = require('../services/url-shortener-service')

/**
 * List all available Urls
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAllAvailableUrl = async (req, res) => {
    res.json(await getAllUrls());
}

/**
 * Encode Long url into short URL
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.encodeUrl = (req, res) => {
    const url = req.body.url;

    try {
        const shortUrl = addUrlModel(url);
        res.json({ url: shortUrl });
    } catch (e) {
        returnErrorResponse(res, e);
    }
}

/**
 * Decode short URL to long URL
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.decodeUrl = async (req, res) => {
    const url = req.body.url;

    try {
        const longUrl = await getLongUrl(url)
        res.json({ url: longUrl });
    } catch (e) {
        returnErrorResponse(res, e);
    }
}

/**
 * Get URL statistics
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.gerStatistics = async (req, res) => {
    const urlPath = req.params.urlPath;

    try {
        const statistics = await getStatistics(urlPath);
        res.json(statistics);
    } catch (e) {
        return returnErrorResponse(res, e);
    }
}

/**
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getUrlRedirect = async (req, res) => {
    const urlPath = req.params.urlPath;

    try {
        const longUrl = await updateStatisticsAndReturnLongUrl(urlPath);
        res.redirect(longUrl);
    } catch (e) {
        return returnErrorResponse(res, e);
    }
}
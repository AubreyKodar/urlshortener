const Shortened = require('../models/shortened');

exports.getAllAvailableUrl = (req, res) => {
    res.status().send(200);
}

exports.encodeUrl = (req, res) => {
    res.status().send(200);
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
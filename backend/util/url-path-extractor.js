/**
 *
 * @param url
 */
module.exports.urlPathExtractor = (url) => {
    return url.split("/").pop();
}
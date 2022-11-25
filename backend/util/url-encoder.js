const { nanoid } = require('nanoid');
const URL_PATH_LENGTH = 6;

/**
 * Generate Short URL
 * @returns {`${*}/${string}`}
 */
module.exports.generateShortUrl = () => {
    return  `${ process.env.API_URL }/${ nanoid(URL_PATH_LENGTH) }`;
}
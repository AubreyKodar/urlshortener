const { nanoid } = require('nanoid');
const URL_PATH_LENGTH = 6;

/**
 * Generate Short URL
 * @returns {{path: string, url: string}}
 */
module.exports.generateShortUrl = () => {
    const path = nanoid(URL_PATH_LENGTH);

    return  {
        path: path,
        url: `${ process.env.API_URL }:${ process.env.API_PORT }/${ path }`
    };
}

module.exports.URL_PATH_LENGTH = URL_PATH_LENGTH;
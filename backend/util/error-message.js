/**
 * @param res
 * @param error
 * @returns {*}
 */
const returnErrorResponse = (res, error) => {
    return res.status(error.code ? error.code : 500)
        .json({ message: error.message ? error.message : 'Internal server error' });
}

module.exports = returnErrorResponse;
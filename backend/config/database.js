module.exports = {
    url: () => `mongodb://${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`,
    user: process.env.DB_USERNAME,
    pwd: process.env.DB_PASSWORD
}
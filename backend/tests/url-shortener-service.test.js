const mockingoose = require('mockingoose');
const urlModel = require('../models/url-model');
const {
    getAllUrls,
    getLongUrl,
    updateStatisticsAndReturnLongUrl,
    getStatistics
} = require('../services/url-shortener-service');

jest.mock("nanoid", () => {
    return { nanoid: () => "_BB7dZ" };
});

beforeAll(() => {
    process.env = Object.assign(process.env, { API_URL: 'http://localhost', API_PORT: '3000' });
});

test('getAllUrls should return all urls', async () => {
    const mockUrls = [
        {
            "_id": "6380a81e67a7ab8c33efc699",
            "path": "IDTr_u",
            "longUrl": "https://expressjs.com/en/resources/middleware/cors.html",
            "shortUrl": "http://localhost:8080/IDTr_u",
            "clicks": 2,
            "createdAt": "2022-11-25T11:32:12.778Z",
            "lastUsed": "2022-11-25T11:34:12.032Z",
        },
        {
            "_id": "6380b063225bf8f041fcee8c",
            "path": "4NsNDm",
            "longUrl": "https://mongoosejs.com/docs/api.html#schematype_SchemaType-default",
            "shortUrl": "http://localhost:8080/4NsNDm",
            "clicks": 0,
            "createdAt": "2022-11-25T12:07:40.308Z",
            "lastUsed": null,
        },
        {
            "_id": "6380b75a431075723b4d4cd1",
            "path": "_BB7dZ",
            "longUrl": "https://mongoosejs.com/docs/api.html#schematype_SchemaType-default",
            "shortUrl": "http://localhost:8080/_BB7dZ",
            "clicks": 0,
            "createdAt": "2022-11-25T12:38:39.859Z",
            "lastUsed": null,
        }
    ];

    mockingoose(urlModel).toReturn(mockUrls, 'find');

    const allUrls = await getAllUrls();

    expect(mockUrls[0]._id.toString()).toBe(allUrls[0]._id.toString());
    expect(mockUrls[1]._id.toString()).toBe(allUrls[1]._id.toString());
    expect(mockUrls[2]._id.toString()).toBe(allUrls[2]._id.toString());
});

test('getLongUrl should return longUrl', async () => {
    const mockUrls = [
        {
            "_id": "6380a81e67a7ab8c33efc699",
            "path": "IDTr_u",
            "longUrl": "https://expressjs.com/en/resources/middleware/cors.html",
            "shortUrl": "http://localhost:8080/IDTr_u",
            "clicks": 2,
            "createdAt": "2022-11-25T11:32:12.778Z",
            "lastUsed": "2022-11-25T11:34:12.032Z",
        },
    ];

    mockingoose(urlModel).toReturn(mockUrls, 'findOne');

    const longUrl = await getLongUrl('http://localhost:8080/IDTr_u');
    expect(longUrl).toBe('https://expressjs.com/en/resources/middleware/cors.html');
});

test('getStatistics  should return url statistics', async () => {
    const mockUrls = [
        {
            "_id": "6380a81e67a7ab8c33efc699",
            "path": "IDTr_u",
            "longUrl": "https://expressjs.com/en/resources/middleware/cors.html",
            "shortUrl": "http://localhost:8080/IDTr_u",
            "clicks": 2,
            "createdAt": "2022-11-25T11:32:12.778Z",
            "lastUsed": "2022-11-25T11:34:12.032Z",
        },
    ];

    mockingoose(urlModel).toReturn(mockUrls, 'findOne');

    const stats = await getStatistics('IDTr_u');
    expect(stats.url).toBe('http://localhost:8080/IDTr_u');
    expect(stats.clicks).toBe(2);
});

test('updateStatisticsAndReturnLongUrl should update stats and return long url', async () => {
    const mockUrls = [
        {
            "_id": "6380a81e67a7ab8c33efc699",
            "path": "IDTr_u",
            "longUrl": "https://expressjs.com/en/resources/middleware/cors.html",
            "shortUrl": "http://localhost:8080/IDTr_u",
            "clicks": 2,
            "createdAt": "2022-11-25T11:32:12.778Z",
            "lastUsed": "2022-11-25T11:34:12.032Z",
        },
    ];

    mockingoose(urlModel).toReturn(mockUrls, 'findOne');

    const longUrl = await updateStatisticsAndReturnLongUrl('IDTr_u');

    expect(longUrl).toBe('https://expressjs.com/en/resources/middleware/cors.html');
});



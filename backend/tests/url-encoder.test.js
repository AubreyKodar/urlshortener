const { generateShortUrl } = require('../util/url-encoder')

jest.mock("nanoid", () => {
    return { nanoid: () => "_BB7dZ" };
});

beforeAll(() => {
    process.env = Object.assign(process.env, { API_URL: 'http://localhost', API_PORT: '3000' });
});

test('generateShortUrl should return the an object with url and path', () => {
    const shortUrl = generateShortUrl();

    expect(shortUrl.path).toBe('_BB7dZ');
    expect(shortUrl.url).toBe('http://localhost:3000/_BB7dZ');
});
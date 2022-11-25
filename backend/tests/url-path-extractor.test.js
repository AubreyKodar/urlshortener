const { urlPathExtractor } = require('../util/url-path-extractor');

test('urlPathExtractor should return the path', () => {
    const url = 'http://localhost:8080/_BB7dZ';
    expect(urlPathExtractor(url)).toBe('_BB7dZ');
})
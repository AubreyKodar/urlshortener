export default axios => ({
  createShortUrl: longUrl => axios.$post('/api/encode', { url: longUrl }),
  getLongUrl: shortUrl => axios.$post('/api/decode', { url: shortUrl }),
  getShortUrlList: () => axios.$get('/api/list'),
  getStatistics: path => axios.$get(`/api/statistic/${ path }`),
});

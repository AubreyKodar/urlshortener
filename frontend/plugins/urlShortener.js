export default axios => ({
  createShortUrl: longUrl => axios.$post('/api/encode', { url: longUrl }),
  getUrlList: () => axios.$get('/api/list'),
  getStatistics: path => axios.$get(`/api/statistic/${ path }`),
});

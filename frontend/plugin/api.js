import urlApi from './urlShortener';

export default (ctx, inject) => {
  const request = ctx.$axios;

  request.defaults.headers.common.Accept = 'application/json';
  request.defaults.headers.common['Content-Type'] = 'application/json';

  const api = {
    shortUrl: urlApi(request),
  };

  inject('api', api);
};

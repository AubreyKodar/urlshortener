import moment from "moment";

export const state = () => ({
  isReady: true,
  error: null,
  urls: [],
});

export const mutations = {
  SET_IS_READY(state, isReady) {
    state.isReady = isReady;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_URLS(state, urls) {
    state.urls = urls;
  }
};

export const actions = {
  async fetchUrls({ commit }) {
    commit('SET_IS_READY', false);
    commit('SET_ERROR', null);

    try {
      const urls = await this.$api.shortUrl.getUrlList();

      commit('SET_URLS', urls.map(url => {
        return {
          ...url,
          lastAccess: url.lastUsed ? moment(url.lastUsed).fromNow() : 'never',
        };
      }));
    } catch (e) {
      commit('SET_ERROR', e.message);
    }finally {
      commit('SET_IS_READY', true);
    }
  }
};

export const getters = {
  getIsReady(state) {
    return !state.isReady;
  },
  getUrls(state) {
    return state.urls;
  },
  getError(state) {
    return state.error;
  }
};

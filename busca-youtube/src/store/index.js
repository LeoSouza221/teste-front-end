import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    params: {
      part: 'id,snippet',
      q: '',
      maxResults: '20',
      key: process.env.VUE_APP_API_KEY,
    },
  },

  mutations: {
    ADICIONAR_PAGINA(state, pageToken) {
      state.params = Object.assign(state.params, { pageToken });
    },

    REMOVER_PAGINA(state) {
      delete state.params.pageToken;
    },

    ADICIONAR_TEXTO(state, texto) {
      state.params = Object.assign(state.params, { q: texto });
    },
  },

  actions: {
    adicionarPagina: ({ commit }, pageToken) => new Promise((resolve) => {
      commit('ADICIONAR_PAGINA', pageToken);

      resolve();
    }),

    removerPagina: ({ commit }) => new Promise((resolve) => {
      commit('REMOVER_PAGINA');

      resolve();
    }),

    adicionarTexto: ({ commit }, texto) => new Promise((resolve) => {
      commit('ADICIONAR_TEXTO', texto);

      resolve();
    }),
  },

  getters: {},
});

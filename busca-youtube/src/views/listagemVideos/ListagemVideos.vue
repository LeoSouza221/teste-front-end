<template lang="pug">
  .listagem-videos
    Alerta(
      :abrirAlerta.sync="abrirAlerta"
      :textoMensagem="textoMensagem"
    )
    ListagemVideosBuscar(
      :videos="videos"
      :params="params"
      @buscar-videos="buscarVideos"
    )
    ListagemVideosApresentar(
      :videos="videos"
      :params="params"
      @buscar-videos="buscarVideos"
      :loadingContent="loadingContent"
    )
</template>

<script>
import { mapState } from 'vuex';
import axios from '@/utils/axios';
import Alerta from '@/components/Alerta.vue';
import ListagemVideosApresentar from './ListagemVideosApresentar.vue';
import ListagemVideosBuscar from './ListagemVideosBuscar.vue';

export default {
  name: 'ListagemVideos',

  components: {
    Alerta,
    ListagemVideosApresentar,
    ListagemVideosBuscar,
  },

  data: () => ({
    abrirAlerta: false,
    loadingContent: false,
    textoMensagem: '',
    // params: {
    //   part: 'id,snippet',
    //   q: '',
    //   maxResults: '20',
    //   key: process.env.VUE_APP_API_KEY,
    // },
    videos: [],
  }),

  computed: mapState([
    'params',
  ]),

  methods: {
    buscarVideos(params) {
      this.loadingContent = true;

      axios.get('/search', { params })
        .then(({ data: { items, nextPageToken } }) => {
          const pageToken = nextPageToken;

          this.loadingContent = false;
          this.videos.push(...items);

          this.adicionarParametro(pageToken);
        })
        .catch(({ response: { data } }) => {
          const { message } = data.error;

          this.loadingContent = false;
          this.abrirAlerta = true;
          this.textoMensagem = message;
        });
    },

    adicionarParametro(pageToken) {
      this.$store.dispatch('adicionarPagina', pageToken);
    },
  },
};
</script>

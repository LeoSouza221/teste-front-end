<template lang="pug">
  div
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
import axios from '@/utils/axios';
import ListagemVideosApresentar from './ListagemVideosApresentar.vue';
import ListagemVideosBuscar from './ListagemVideosBuscar.vue';

export default {
  name: 'ListagemVideos',

  components: {
    ListagemVideosApresentar,
    ListagemVideosBuscar,
  },

  data: () => ({
    loadingContent: false,
    params: {
      part: 'id,snippet',
      q: '',
      maxResults: '20',
      key: process.env.VUE_APP_API_KEY,
    },
    videos: [],
  }),

  methods: {
    buscarVideos(params) {
      this.loadingContent = true;

      axios.get('/search', { params })
        .then(({ data: { items, nextPageToken } }) => {
          const pageToken = nextPageToken;

          this.loadingContent = false;
          this.videos.push(...items);
          this.params = Object.assign(this.params, { pageToken });
        });
    },
  },
};
</script>

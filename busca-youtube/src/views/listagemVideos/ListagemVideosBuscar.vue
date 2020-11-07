<template lang="pug">
  .section(:class="classesTela")
    v-form(ref="buscar" v-model="validaBusca")
      v-container
        v-row(
          justify="center"
        )
          v-col(cols="9" sm="6" md="6")
            v-text-field(
              outlined
              rounded
              clearable
              color="secondary"
              placeholder="Pesquisar"
              v-model="params.q"
            )
          v-col(cols="3" sm="2")
            v-btn(
              fab
              color="secondary"
              rounded
              @click="novaBusca"
            )
              v-icon(dark) mdi-magnify
</template>

<script>
import http from '@/utils/http';

export default {
  name: 'ListagemVideosBuscar',

  props: {
    videos: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    validaBusca: false,
    descricaoBusca: '',
    classesTela: 'buscar-container',
    params: {
      part: 'id, snippet',
      q: '',
      key: 'AIzaSyDQx-C00Z49nc6_g0PPyerxJaE5WnVbmzs',
      maxResults: '20',
    },
  }),
  // AIzaSyAel3s1odiQkoUxC8X2LKIUpLjuqMCsTGI
  methods: {
    novaBusca() {
      this.videos.length = 0;
      this.classesTela = `${this.classesTela} animacao-subir`;

      this.buscarVideos(this.params);
    },

    buscarVideos(params) {
      // https://www.googleapis.com/youtube/v3/search?part=id,snippet&q={termo_de_busca}&key={API_KEY}
      http.get('/search', { params })
        .then(({ data: { items } }) => {
          console.log(items);
          this.videos.push(...items);
        });
    },
  },
};
</script>

<style scoped>
  .buscar-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    transition: all .5s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .animacao-subir {
    animation: subindo 2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  }

  @keyframes subindo {
    100% {
      position: absolute;
      transform: none;
      top: 0;
    }
  }
</style>

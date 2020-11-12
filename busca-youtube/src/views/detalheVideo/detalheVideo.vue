<template lang="pug">
  .detalhe-video
    v-container
      v-btn(
        fab
        rounded
        color="secondary"
        @click="voltarTelaInicial"
      )
        v-icon(dark) mdi-arrow-left
      v-row(justify="center")
        v-col(cols="12" sm="12" md="10" lg="8")
          iframe(
            width="100%"
            height="400px"
            max-height="500px"
            :src="urlVideo"
            frameborder="0"
            allow=`
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture
            `
            allowfullscreen
          )
        v-col(cols="12" sm="12" md="10" lg="8")
          v-card.elevation-0(color="transparent")
            v-row(
              justify="center"
              align="center"
            )
              v-col(cols="12")
                v-toolbar(
                  flat
                  height="50"
                  color="transparent"
                  class="borda-toolbar"
                )
                  v-icon.mr-3(color="white") mdi-video
                  v-toolbar-title {{ video.snippet.title }}
              v-col(cols="6" sm="8" class="align-text")
                v-icon.px-1 mdi-eye
                h4.subtitle-2 {{ video.statistics.viewCount }}
              v-col(col="3" sm="2" class="align-text")
                v-icon.px-1 mdi-thumb-down-outline
                h4.text-left.subtitle-2 {{ video.statistics.dislikeCount }}
              v-col(col="3" sm="2" class="align-text")
                v-icon.px-1 mdi-thumb-up-outline
                h4.text-left.subtitle-2 {{ video.statistics.likeCount }}
              v-col(cols="12")
                v-divider
              v-col(cols="12")
                h5 Descrição:
                p.text-format.body-2.text-justify(
                  v-for="(texto, index) in ajustarDescricao"
                ) {{ texto }}
</template>

<script>
import axios from '@/utils/axios';

export default {
  name: 'DetalheVideo',

  data: () => ({
    video: {},
    params: {
      id: '',
      part: 'snippet,statistics',
      key: process.env.VUE_APP_API_KEY,
    },
  }),

  created() {
    const { id } = this.$route.params;

    this.params.id = id;

    this.buscarDetalheVideos(this.params);
  },

  computed: {
    urlVideo() {
      const { id } = this.params;

      return `https://www.youtube.com/embed/${id}`;
    },
    ajustarDescricao() {
      const { snippet: { description } } = this.video;
      console.log(description);
      return description.split('-');
    },
  },

  methods: {
    buscarDetalheVideos(params) {
      axios.get('/videos', { params })
        .then(({ data: { items } }) => {
          [this.video] = items;
        })
        .catch(() => {
        });
    },

    voltarTelaInicial() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
  .borda-toolbar {
    border-bottom: 2px solid #fff !important;
  }

  .align-text {
    display: flex;
  }
</style>

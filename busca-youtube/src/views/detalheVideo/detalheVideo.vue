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
          .container-iframe
            iframe(
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
                div.borda-toolbar(class="align-text")
                  v-icon.px-1(color="white") mdi-video
                  h6(
                    class="text-caption text-sm-h6"
                  ) {{ video.snippet.title }}
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
                v-btn(
                  absolute
                  bottom
                  right
                  color="accent"
                  fab
                  rounded
                  @click="aberto = !aberto"
                )
                  v-icon {{ aberto ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
                .description-box(:style="{ height: descricaoBoxAltura }")
                  h5 Descrição:
                  p.text-format.body-2.text-justify(
                    v-for="(texto, index) in ajustarDescricao"
                  ) {{ texto }}
                v-divider
</template>

<script>
import axios from '@/utils/axios';

export default {
  name: 'DetalheVideo',

  data: () => ({
    aberto: true,
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
      return description.split(' - ');
    },

    descricaoBoxAltura() {
      return this.aberto ? '200px' : '100%';
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

  .container-iframe {
    min-height: 400px;
    max-height: 700px;
    height: 100%;
  }

  .align-text {
    display: flex;
  }

  iframe {
    width: 100%;
    height: 100%;
  }

  .description-box {
    overflow: hidden;
    position: relative;
    transition: all .5s ease-in;
  }
</style>

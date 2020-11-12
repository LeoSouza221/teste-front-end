<template lang="pug">
  .apresentar-videos(
    id="scroll-target"
  )
    v-slide-x-transition
      v-data-iterator(
        :items="videos"
        :items-per-page.sync="videos.length"
        item-key="id.videoId"
        search
        hide-default-footer
        v-scroll:#scroll-target="onScroll"
        no-data-text=""
      )
        template(v-slot:default="props")
          v-container
            v-row(justify="center")
              v-col(
                v-for="(item, index) in props.items"
                :key="index"
                cols="10"
                sm="6"
                md="4"
                lg="3"
                xl="2"
              )
                v-card(
                  color="accent"
                  hover
                  height="420"
                  style="overflow: hidden"
                  @click="detalharVideo(item.id)"
                )
                  v-card-text
                    v-row(justify="center" align="stretch")
                      v-col(cols="12")
                        v-img(
                          :src="item.snippet.thumbnails.high.url"
                          max-height="180"
                          contain
                        )
                      v-col(col="12")
                        h4.py-2.subtitle-2.white--text {{ item.snippet.title | cortarTexto }}
                        p.text-format.body-2.text-justify {{ item.snippet.description }}
    v-card(
      color="accent"
      v-if="videos.length > 0"
    )
      v-progress-linear(
        color="primary"
        height="10"
        striped
        :indeterminate="loadingContent"
      )
</template>

<script>
export default {
  name: 'ListagemVideosApresentar',

  props: {
    loadingContent: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      required: true,
    },
    videos: {
      type: Array,
      required: true,
    },
  },

  filters: {
    cortarTexto(string) {
      if (string.length > 30) {
        return `${string.slice(0, 30)}...`;
      }

      return string;
    },
  },

  methods: {
    onScroll(e) {
      const { scrollTop, offsetHeight, scrollHeight } = e.target;
      const percentualScrollado = ((scrollTop + offsetHeight) * 100) / scrollHeight;

      if (percentualScrollado === 100) {
        this.$emit('buscar-videos', this.params);
      }
    },

    detalharVideo(video) {
      const { videoId } = video;

      this.$router.push({ name: 'DetalheVideo', params: { id: videoId } });
    },
  },
};
</script>

<style scoped>
  .apresentar-videos {
    margin-top: 100px;
    height: calc(100vh - 100px);
    overflow-y: auto;
  }

  .text-format {
    text-align: justify;
  }
</style>

<template lang="pug">
  v-main(
    :style="{backgroundColor: $vuetify.theme.themes.dark.primary}"
  )
    v-container
      BuscarVideos
</template>

<script>
import BuscarVideos from './BuscarVideos.vue';

export default {
  name: 'Home',

  components: {
    BuscarVideos,
  },

  created() {
    console.log(this.$vuetify);
  },
};
</script>

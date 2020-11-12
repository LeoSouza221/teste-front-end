<template lang="pug">
  v-main
    ListagemVideos
</template>

<script>
import ListagemVideos from './listagemVideos/ListagemVideos.vue';

export default {
  name: 'Home',

  components: {
    ListagemVideos,
  },
};
</script>

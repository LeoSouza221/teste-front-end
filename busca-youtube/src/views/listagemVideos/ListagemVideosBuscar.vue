<template lang="pug">
  .section(
    :class="classesTela"
    :style="{backgroundColor: $vuetify.theme.themes.dark.primary}"
  )
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
              v-model="textoBusca"
            )
          v-col(cols="3" sm="2")
            v-btn(
              fab
              color="secondary"
              rounded
              @click="definirParametros"
            )
              v-icon(dark) mdi-magnify
</template>

<script>
export default {
  name: 'ListagemVideosBusca',

  props: {
    params: {
      type: Object,
      required: true,
    },
    videos: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    validaBusca: false,
    textoBusca: '',
    descricaoBusca: '',
    classesTela: 'buscar-container',
  }),

  methods: {
    definirParametros() {
      const adicionarTexto = this.$store.dispatch('adicionarTexto', this.textoBusca);
      const removerPagina = this.$store.dispatch('removerPagina');

      Promise.all([adicionarTexto, removerPagina])
        .then(() => {
          this.limparCamposEBuscar();
        });
    },

    limparCamposEBuscar() {
      this.videos.length = 0;
      this.classesTela = `${this.classesTela} animacao-subir`;

      delete this.params.pageToken;

      this.$emit('buscar-videos', this.params);
    },
  },
};
</script>

<style scoped>
  .buscar-container {
    position: fixed;
    width: 100%;
    height: 100px;
    top: 50%;
    transform: translateY(-50%);
    transition: all .5s cubic-bezier(0.19, 1, 0.22, 1);
    z-index: 1;
  }

  .animacao-subir {
    animation: subindo 2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  }

  @keyframes subindo {
    100% {
      position: fixed !important;
      transform: none;
      top: 0;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
  }
</style>

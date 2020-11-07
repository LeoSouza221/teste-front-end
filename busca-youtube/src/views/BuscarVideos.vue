<template lang="pug">
  .busca-container
    v-form(ref="buscar" v-model="validaBusca")
      v-row(
        justify="center"
      )
        v-col(cols="10" sm="6" md="6")
          v-text-field(
            outlined
            rounded
            clearable
            color="secondary"
            placeholder="Pesquisar"
          )
            template(v-slot:append-outer)
              v-btn(
                fab
                color="secondary"
                rounded
              )
                v-icon(dark) mdi-magnify
</template>

<script>
export default {
  name: 'BuscarVideos',

  data: () => ({
    validaBusca: false,
  }),
};
</script>

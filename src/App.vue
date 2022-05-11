<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/LogoMariano.png"
          width="200"
        />
      </div>
      <v-btn
        class="ml-5"
        to="/pruebas"
        text
      >
      borrar
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn
        to="/#inscripcion"
        text
      >
        <span class="mr-2">Inscribirme</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

      <v-btn class="ml-2" fab small color="black" to="/login">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style scoped>
#app{
  background-color: #EFEBE9;
}
</style>

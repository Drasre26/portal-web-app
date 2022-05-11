<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        
        <v-img
          alt="Logo Mariano Galvez"
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

      <v-btn icon large  color="white" href="https://www.facebook.com/Drasly.RE" target="_blank">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon large  color="white" href="https://api.whatsapp.com/send?phone=50257133087" target="_blank">
        <v-icon>mdi-whatsapp</v-icon>
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

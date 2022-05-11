<template>
  <div v-if="evento">
    <v-row class="mx-3">
      <v-col cols="8">
        <h1>{{evento.titulo}}</h1>
        <h3>{{evento.subtitulo}}</h3>

        <v-row>
          <v-col>
            <v-alert color="cyan" border="left" elevation="2" colored-border>
              <h2>El evento <strong>iniciará</strong> en:</h2>
              <flip-countdown :deadline="evento.fecha"></flip-countdown>
            
            </v-alert>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-img
          :src="`${urlApi}/imagenes/${evento.portada}`"
          aspect-ratio="1.7"
          class="rounded-lg"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import FlipCountdown from "vue2-flip-countdown";

//src="https://picsum.photos/510/300?random"
export default {
  props: ['evento'],
  components: { FlipCountdown },
  computed:{
      urlApi(){
            return this.$store.getters.getUrlApi
        },
  }
};
</script>
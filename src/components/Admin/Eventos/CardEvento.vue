<template>
  <div v-if="datoevento">
        <v-card class="ma-2" max-width="100%" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">OVERLINE</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ datoevento.titulo }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ datoevento.subtitulo }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="red"
            >
            <v-img
            :src="`${urlApi}/imagenes/${datoevento.portada}`"
            width="80px"
            ></v-img>
               
            </v-list-item-avatar>
            
          </v-list-item>

          <v-card-actions>
              
            <v-btn outlined rounded text @click="$emit('eliminarEvento', datoevento)">
                <v-icon>mdi-trash-can</v-icon>
            </v-btn>

            <v-btn outlined rounded text @click="$router.push('/admin/eventos/crear/'+datoevento.idevento)">
                <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>

            <v-btn outlined rounded text @click="$router.push('/eventos/mostrar/'+datoevento.idevento)">
                <v-icon>mdi-eye-plus</v-icon>
            </v-btn>

            <v-btn outlined rounded text @click="participantesEvento(datoevento)">
                <v-icon>mdi-account-group</v-icon>
            </v-btn>

            <v-btn outlined rounded text @click="setEvento(datoevento)">
                <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
  </div>
</template>
<script>
export default {
  props: ["datoevento"],
  computed: {
    urlApi() {
      return this.$store.getters.getUrlApi;
    }
  },
  methods:{
      setEvento(item){
          this.$store.dispatch("setEvento",item)
          this.$router.push('/admin/evento/opciones')
      },
      participantesEvento(item){
          this.$store.dispatch("setEvento",item)
          this.$router.push('/admin/participantes')
      }
  }
};
</script>
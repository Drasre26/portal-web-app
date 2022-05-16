<template>
  <v-card
    class="mx-auto mt-5"
    max-width="80%"
    outlined
    v-if="eventousuario"
  >
    <v-list-item three-line>
      <v-list-item-content>
          <v-alert type="success" v-if="eventousuario.estado=='Confirmado'">
            Gafete VALIDO.
            </v-alert>
          <v-alert type="error" v-else>
            Gafete INVALIDO.
            </v-alert>  

        <p class="text-h5">
            <br/>
          Gafete de participación otorgado a 
          <strong>{{eventousuario.nombre}}</strong>  
         para su participacion en el evento <strong>{{eventousuario.titulo}} </strong>
         a realizarse el <strong>{{eventousuario.fecha}}</strong>
        </p>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

  </v-card>
</template>
<script>
import axios from 'axios';

  export default {
      data() {
          return {
              eventousuario:false
          }
      },
      computed:{
        urlApi() {
        return this.$store.getters.getUrlApi;
        },
      },
      created(){
          this.main()
      },
      methods:{
          async main() {
              const idsuscripcion = this.$route.params.idsuscripcion
            try {
                const { data } = await axios.get(`${this.urlApi}/suscripciones/validargafete/${idsuscripcion}`
                );
                this.eventousuario = data[0];
            } catch (error) {
                this.eventousuario = false
                console.log(error);
            }
        },
      }
  }
</script>
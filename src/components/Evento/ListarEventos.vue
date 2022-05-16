<template>
  <div v-if="eventos">
    <v-sheet class="ma-5 pa-5">
      <v-row>
        <v-col cols="6" v-for="evento of eventos" :key="evento.idevento">
          <v-card class="ma-2" max-width="100%" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">OVERLINE</div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ evento.titulo }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ evento.subtitulo }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80" color="red">
                <v-img
                  :src="`${urlApi}/imagenes/${evento.portada}`"
                  width="80px"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
            

              <v-btn
                outlined
                rounded
                text
                @click="$router.push('/eventos/mostrar/' + evento.idevento)"
              >
                Mostrar <v-icon>mdi-eye-plus</v-icon>
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
     data: () => ({
      title:'Eventos',
      eventos: [],
    }),

    computed: {
      urlApi(){
           return this.$store.getters.getUrlApi
        },
    },

    async created () {
      await this.initialize()
    },

    methods: {
      async initialize () {
       try {
         const {data} =  await axios.get(`${this.urlApi}/eventos`)
           this.eventos=data
       } catch (error) {
           console.log(error)
       }      
      },

      deleteItem (datoevento) {
        console.log('Si llego el emit==>',datoevento)
        Swal.fire({
          title: 'Esta Seguro?',
          text: "El registro será eliminado!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'Cancelar!'
        }).then((result) => {
          if (result.isConfirmed) {
            //Procedimiento para eliminarlo
            datoevento.estado='Eliminado'
            this.eliminarEvento(datoevento)
          }
        })
        
      },
      async eliminarEvento(datoevento) {
        try {
          await axios.put(`${this.urlApi}/eventos/${datoevento.idevento}`,datoevento)
          await this.initialize()
          Swal.fire('Registro Eliminado','El registro ha sido eliminado','success')
        } catch (error) {
          console.log(error)
          Swal.fire('!Opss Ocurrió un Error','El registro no pudo ser eliminado','error')
        }
      }
    },

    
}
</script>


<style>
  /* This is for documentation purposes and will not be needed in your application */
 .v-btn--example {
    bottom: 0;
    margin: 0 0 16px 16px;
    float: right;
  }
</style>
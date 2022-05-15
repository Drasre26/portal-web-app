<template>
  <v-row>
    <MenuAdministrador/>
    <v-col> 
      <v-sheet class="ma-3 pa-3">
        <v-row>
          <v-col cols="6" v-for="item in eventos" :key="item.idevento">
            <CardEvento :datoevento="item" @eliminarEvento="deleteItem"></CardEvento>
          </v-col>
        </v-row>
        <v-btn
        color="green"
        fab
        large
        dark
        class="v-btn--example"
        @click="$router.push('/admin/eventos/crear/')"
      >
       <v-icon>mdi-plus</v-icon>
      </v-btn>
      </v-sheet>
    </v-col>
  </v-row>
  
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import MenuAdministrador from '../../Admin/menu/MenuAdministrador.vue'
import CardEvento from './CardEvento.vue'

export default {
  components:{
        MenuAdministrador,CardEvento
    },
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
           console.log(this.eventos)
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
<template>
    <v-row>
        <MenuAdministrador/>
        <v-col>

        
  <v-sheet class="ma-2">
      <v-row class="ml-2 indigo--text">
          <v-col>
              <h2>Participantes Evento</h2>
          </v-col>
          <v-col>
              <v-btn class="ma-2" color="indigo" dark >Imprimir Diplomas</v-btn>
              <v-btn class="ma-2" color="indigo" dark @click="impresionMasiva"><v-icon>mdi-printer</v-icon> Imprimir Gafetes</v-btn>
          </v-col>
      </v-row>
  
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
            <th>
               <v-checkbox v-model="seleccionarparticipantes" @change="seleccionarTodos"> </v-checkbox> 
            </th>
          <th class="text-left">
            Participante
          </th>
          <th class="text-left">
            Telefono
          </th>
          <th class="text-left">
            Correo
          </th>
          <th class="text-left">
            Estado
          </th>
          <th class="text-center">
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in participantes"
          :key="item.idsuscripcion"
        >
          <td>
              <v-checkbox v-model="item.seleccionado"> </v-checkbox>
          </td>
          <td>{{ item.nombre }} {{ item.apellido }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.estado }}</td>
          <td>
              <v-btn color="indigo" class="ma-1" outlined @click="eliminar(item)"> 
                  <v-icon>mdi-trash-can</v-icon>
                  Eliminar suscripcion
              </v-btn>              
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import MenuAdministrador from '../menu/MenuAdministrador.vue'
export default {
    components:{
        MenuAdministrador
    },
  data: () => ({
    seleccionarparticipantes:false,
    participantes:[],
    participantesSeleccionados:[]
    }),
    created(){
      this.main()
    },
    computed:{
        urlApi(){
           return this.$store.getters.getUrlApi
        },
    },
    methods:{
      async main(){      
        try {
            const {data} = await axios.get(`${this.urlApi}/eventos/participantes/1`)
            console.log(data)
            this.participantes = data
        } catch (error) {
            console.log(error)
        }
      },
      async eliminar(item){
          try {
              await axios.delete(`${this.urlApi}/suscripciones/${item.idsuscripcion}`)
              this.main()
              this.notificationSwal('success','Registro Eliminado','')
          } catch (error) {
              console.log(error)
              this.notificationSwal('error','Error al Eliminar el registro','')

          }
      },
      seleccionarTodos(){
          // Con un bucle recorremos todos los participantes del evento 
          for (var i = 0; i < this.participantes.length; i++) {
              //Aca los marcamos como seleccionado = true
              this.participantes[i].seleccionado = this.seleccionarparticipantes
          }
          
      },
      async impresionMasiva(){
          //inicializamos un arreglo vacio para meter los participantes seleccionados
          const  participantesSeleccionados = [];

          

          //Filtramos los participantes seleccionados para imprimir su gafete  
          this.participantes.forEach(elemento => {
              if(elemento.seleccionado){
                  //Insertamos en el arreglo los participantes seleccionados
                   participantesSeleccionados.push(elemento)
              }
          });
           /* ---------------------- IMPRESION DE DIPLOMAS ----------------------  */

        try{ 
              //Enviamos por el metodo post los participantes seleccionados para imprimir su gafete  
              await axios.post(`http://localhost/pdf/plantilla.php`,participantesSeleccionados)

              //Una vez generado el pdf con todos los gafetes lo abrimos
              window.open('http://localhost/pdf/diplomas/diplomas.pdf',"blank")
          } catch (error) {
              console.log(error)
          }  
          
      },

      //Notificacion Swal
      notificationSwal(icon,title,text){
            Swal.fire({
            icon: icon,
            title: title,
            text: text,
            })
        }
    }
}
</script>
<template>
  <div class="mt-5">
    <v-card
        class="mx-auto"
        max-width="550"
        outlined
        v-for="item in eventos" 
        :key="item.idevento"
        
    >
        <v-list-item three-line>
        <v-list-item-content>
            <div class="text-overline mb-4">
            {{item.estado}}
            </div>
            <v-list-item-title class="text-h5 mb-1">
            {{item.titulo}}
            </v-list-item-title>
            <v-list-item-subtitle>
            {{item.descripcion}}
            </v-list-item-subtitle>
             <v-chip-group column>
                <v-chip class="ma-2" color="blue" dark>
                    <v-icon>mdi-calendar-month-outline</v-icon>
                    {{item.fecha | formatoFecha}}
                </v-chip>

                <v-chip class="ma-2" color="blue" dark>
                    <v-icon>mdi-timer-outline</v-icon>
                    {{item.fecha | formatoHora}}
                </v-chip>
            </v-chip-group>
        </v-list-item-content>

        <v-list-item-avatar
            tile
            size="80"
            color="grey"
        ></v-list-item-avatar>
        </v-list-item>


        <v-card-actions>
        <v-btn
            outlined
            rounded
            color="red"
            @click="actualizarUsuario(item)"
        >
           <v-icon>mdi-delete</v-icon>
           Eliminar
        </v-btn>
        <v-btn
            outlined
            rounded
            color="teal"
        >
        <v-icon>mdi-square-edit-outline</v-icon>
            Editar
        </v-btn>
        <v-btn outlined rounded color="green" @click="mostrarevento(item.idevento)">
            <v-icon>mdi-eye-plus</v-icon>
            Mostrar
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import * as dayjs from 'dayjs'
export default {
  data: () => ({
    eventos:[],
    usuario:{
      idusuario: 1,
      idevento: 1,
      fecha:dayjs().format(),
      estado: "Inscrito",
    },
    default:{
      idusuario: 1,
      idevento: 1,
      estado: "Inscrito",
    },

    }),
    created(){
      this.main()
    },
    computed:{
        urlApi(){
           return this.$store.getters.getUrlApi
        },
        getUsuario(){
          return this.$store.getters.usuarioAuth.usuario
        }
    },
    methods:{
      async main(){
        const {usuario} = this.$store.getters.usuarioAuth
        //console.log(usuario)
        if(usuario){
          this.idusuario = usuario.idusuario
        }
        try {
            const {data} = await axios.get(`${this.urlApi}/eventos`)
            
            this.eventos = data
        } catch (error) {
            console.log(error)
        }
      },
      mostrarevento(idevento){
        this.$router.push('/mostrar/vento/'+idevento)
      },
      async actualizarUsuario(item){
          console.log(item)
        // try {
        //  const {data} =  await axios.put(`${this.urlApi}/eventos/${this.usuario.idusuario}`,this.usuario)
        //   this.notificationSwal('success','Usuario Actualizado','El usuario se actualizo correctamente')
        //   this.usuario = Object.assign({}, data)
        // } catch (error) {
        //   this.notificationSwal('error','Error en su registro','Intentelo mas tarde')
        //   console.log(error)
        // }
      },
      //Notificacion Swal
      notificationSwal(icon,title,text){
            Swal.fire({
            icon: icon,
            title: title,
            text: text,
            })
        }
    },
    filters:{
        formatoFecha: function (value) {
            if (!value) return ''
            return value = dayjs(value).format('DD-MM-YYYY')
        },
        formatoHora: function (value) {
            
            if (!value) return ''
            return value = dayjs(value).format('hh:mm A')
        }
    }
}
</script>
<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="550"
        outlined
        v-for="item in suscripciones" 
        :key="item.idsuscripcion"
        
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
            Cancelar Inscripcion
        </v-btn>
        <v-btn
            outlined
            rounded
            color="teal"
        >
        <v-icon>mdi-notebook-outline</v-icon>
            Gafete
        </v-btn>

        <v-btn
            outlined
            rounded
            color="teal"
        >
        <v-icon>mdi-file-document</v-icon>
            Diploma
        </v-btn>
        <v-btn outlined rounded color="green">
            <v-icon>mdi-eye-plus</v-icon>
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    suscripciones:[],
    usuario:{
      idusuario: 1,
      idevento: 1,
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
            const {data} = await axios.get(`${this.urlApi}/suscripciones/usuario/3`)
            console.log(data)
            this.suscripciones = data
        } catch (error) {
            console.log(error)
        }
      },
      async actualizarUsuario(item){
          console.log(item)
        // try {
        //  const {data} =  await axios.put(`${this.urlApi}/suscripciones/${this.usuario.idusuario}`,this.usuario)
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
    }
}
</script>
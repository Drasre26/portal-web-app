<template>
  <v-card class="mx-auto" max-width="650" outlined>
  
    <v-container fluid>
      <h2>{{tituloformulario}}</h2>
      <hr />
      <br />
      <v-row>
        <v-col cols="4">
          <v-subheader>Nombre:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field solo v-model="usuario.nombre" label="Nombre"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Apellido:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field solo
          v-model="usuario.apellido"
            label="Apellido"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Email:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field solo
           v-model="usuario.email"
            label="Email"
            placeholder="adali@micorreo.com"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Teléfono:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field solo
          v-model="usuario.telefono"
            label="Telefono"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-subheader>Usuario:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field solo
          v-model="usuario.usuario"
            label="Usuario"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-subheader>Contraseña:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field solo
          v-model="usuario.password"
            type="password"
            label="Contraseña"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <pre>{{getUsuario}}</pre>
        <v-col>
          <v-spacer></v-spacer>
          <v-btn color="orange" v-if="getUsuario" dark @click="actualizarUsuario">Editar Perfil</v-btn>
          <v-btn color="red" v-else dark @click="crearUsuario">Inscribrirme</v-btn>
          
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    tituloformulario:'Inscripcion',
    usuario:{
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      usuario: "",
      password: "",
    },
    default:{
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      usuario: "",
      password: "",
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
      main(){
        const {usuario} = this.$store.getters.usuarioAuth
        //console.log(usuario)
        if(usuario){
          this.tituloformulario = 'Editar Perfil'
          this.usuario = usuario
        }
      },
      async guardar(){
        const {usuario} = this.$store.getters.usuarioAuth
        if(usuario){
          this.actualizarUsuario()
        }else{
          this.crearUsuario()
        }
      },
      async crearUsuario(){
        try {
          await axios.post(`${this.urlApi}/usuarios`,this.usuario)
          this.notificationSwal('success','Ha sido registrado exitosamente','Revise su correo electronico para activar inscripcion')
          this.usuario = Object.assign({}, this.default)
        } catch (error) {
          this.notificationSwal('error','Error en su registro','Intentelo mas tarde')
          console.log(error)
        }
      },
      async actualizarUsuario(){
        try {
         const {data} =  await axios.put(`${this.urlApi}/usuarios/${this.usuario.idusuario}`,this.usuario)
          this.notificationSwal('success','Usuario Actualizado','El usuario se actualizo correctamente')
          this.usuario = Object.assign({}, data)
        } catch (error) {
          this.notificationSwal('error','Error en su registro','Intentelo mas tarde')
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
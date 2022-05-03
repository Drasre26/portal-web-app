<template>
  <div>
    <h2>Inscripción</h2>
    <hr />
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-subheader>Nombre:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field v-model="usuario.nombre" label="Nombre"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Apellido:</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
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
          <v-text-field
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
          <v-text-field
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
          <v-text-field
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
          <v-text-field
          v-model="usuario.password"
            type="password"
            label="Contraseña"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="crearUsuario">Inscribrirme</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data: () => ({
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
    computed:{
        urlApi(){
           return this.$store.getters.getUrlApi
        }
    },
    methods:{
      async crearUsuario(){
        try {
          console.log(this.usuario)
          await axios.post(`${this.urlApi}/usuarios`,this.usuario)
          this.notificationSwal('success','Ha sido registrado exitosamente','Revise su correo electronico para activar inscripcion')
          this.usuario = Object.assign({}, this.default)
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
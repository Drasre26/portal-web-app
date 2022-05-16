<template>
  <v-card class="ma-1 pa-3"  elevation="2" max-width="100%" rounded="false">
  
    <v-container fluid>
      <h2>{{tituloformulario}}</h2>
      
      <div v-if="procesando">
        <br>
        <h2>Realizado operación</h2>
            <v-progress-linear
              indeterminate
              color="cyan"
            ></v-progress-linear>
        <br>
      </div>
      <hr />
      <br />
     
      <div id="formulario" v-if="!procesando">

      
      <v-row v-if="getUsuario">
        <v-col cols="12">
         <v-file-input
            type="file"
            v-model="imagen"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            label="Cambiar Imagen Perfil"
            @change="subirImagen()"
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <v-img alt="usuario" class="avatar"
          :src="`${urlApi}/imagenes/${usuario.foto}`"
          >
          </v-img>
        </v-col>
      </v-row>

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
        
        <v-col>
          <v-spacer></v-spacer>
          <v-btn color="orange" v-if="getUsuario" dark @click="actualizarUsuario">Editar Perfil</v-btn>
          <v-btn color="red" v-else dark @click="crearUsuario">Inscribrirme</v-btn>
          
        </v-col>
        
      </v-row>
      </div>
    </v-container>
  </v-card>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import MensajeEmail from '@/utils/emailPersonalizado.js'
export default {
  data: () => ({
    procesando:false,
    imagen:[],
    tituloformulario:'Inscripcion',
    usuario:{
      nombre: "",
      apellido: "",
      foto:"default.png",
      telefono: "",
      email: "",
      usuario: "",
      password: "",
    },
    default:{
      nombre: "",
      apellido: "",
      foto:"default.png",
      telefono: "",
      email: "",
      usuario: "",
      password: "",
    },
    mensajeSMS:{
      body: "Mensaje",
      from: "+19853284441",
      to: "+502"
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
        },
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
      async actualizarUsuario(){
        try {
         const {data} =  await axios.put(`${this.urlApi}/usuarios/${this.usuario.idusuario}`,this.usuario)
          this.$store.dispatch("updateUsusario",data)
          this.usuario = Object.assign({}, data)
          this.main()
          this.notificaciones()
          Swal.fire('Usuario Actualizado','El usuario se actualizo correctamente','success')
        } catch (error) {
          Swal.fire('Error al actualizar','','error')
          console.log(error)
        }
      },
      async subirImagen() {

        const formData = new FormData();
        formData.append("file", this.imagen);
      
        try {
          const {data} = await axios.post(`${this.urlApi}/imagenes/upload`, formData);
          this.usuario.foto = data.filename
        } catch (error) {
            this.imagen = ""
            console.log(error)
            Swal.fire('Error al subir imagen','','error')
        }
      
      },
      async notificaciones(){
        this.mensajeSMS.body = "Su perfil ha sido actualizado"
        this.mensajeSMS.to = this.mensajeSMS.to+this.usuario.telefono

            const contenido={
                titulo:'Su perfil ha sido actualizado',
                texto:'La información de su perfil se ha actualizado exitosamente.'
            }

            try {
               //Enviamos mensaje al telefono del usuario 
               
               await axios.post(`${this.urlApi}/usuarios/mensaje`,this.mensajeSMS)

                //Enviamos Correo al usuario 
                const mensajeEmail =  MensajeEmail(this.usuario,contenido)
                await axios.post(`${this.urlApi}/usuarios/enviarcorreo`,mensajeEmail)
              
            } catch (error) {
                console.log(error)
            }
      }
    }
}
</script>
<style scoped>
.avatar {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 300px;
  border-radius: 10px;
}
</style>
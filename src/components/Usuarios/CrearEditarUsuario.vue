<template>
  <v-card class="ma-1 pa-3"  elevation="2" max-width="100%" rounded="false">
  
    <v-container fluid>
      <h2>{{tituloformulario}}</h2>
      <hr />
      <br />
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
    </v-container>
  </v-card>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data: () => ({
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
      body: "FELICIDADES ESTA INSCRITO AL CONGRESO TECNOLOGICO UMG 2022",
      from: "+19853284441",
      to: "+502"
    },
    mensajeEmail:{
      from: '"Inscripción Realizada 👻" <draslyrafael@cunsurori.edu.gt>', // sender address
      to: "pedroumg2015@gmail.com", // list of receivers
      subject: "Inscripcion Congreso Tecnologico ✔", // Subject line
      text: "FELICIDADES ESTA INSCRITO AL CONGRESO TECNOLOGICO UMG 2022", // plain text body
      html: `
      <h3>Tiene 5 dias para realizar el pago de su inscripcion
      Puede realizar los pagos a la cuenta
      BANRURAL: Cuenta Monetaria No. 5689756 a nombre de CONGRESOS UMG
      </h3>
      `, // html body
    }
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
        getEvento() {
          return this.$store.getters.getEvento;
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

          //Creamos el usuario
          const {data} = await axios.post(`${this.urlApi}/usuarios`,this.usuario)
          //Suscribimos el usuario al Evento
          await this.suscripcionUsuario(data)

          //Enviamos mensaje al telefono del usuario 
          this.mensajeSMS.to = this.mensajeSMS.to+this.usuario.telefono
          await axios.post(`${this.urlApi}/usuarios/mensaje`,this.mensajeSMS)


          //Mostramos notificacion de operacion exitosa
          this.notificationSwal('success','Ha sido registrado exitosamente','Revise su correo electronico para activar inscripcion')
          //---------this.usuario = Object.assign({}, this.default)
        } catch (error) {
          this.notificationSwal('error','Error en su registro','Intentelo mas tarde')
          console.log(error)
        }
      },
      async suscripcionUsuario(item){
        
        const id = parseInt(item.idusuario)
        const suscripcion = { idusuario:id , idevento: this.getEvento.idevento }

        this.mensajeEmail.to = item.email
        try {
          console.log(this.mensajeEmail)
         
         const {data} = await axios.post(`${this.urlApi}/suscripciones`,suscripcion)
         await axios.post(`${this.urlApi}/usuarios/enviarcorreo`,this.mensajeEmail)
        console.log(data)
        } catch (error) {
          console.log(error)
        }
      },
      async actualizarUsuario(){
        try {
         const {data} =  await axios.put(`${this.urlApi}/usuarios/${this.usuario.idusuario}`,this.usuario)
          this.$store.dispatch("updateUsusario",data)
          this.main()
          this.notificationSwal('success','Usuario Actualizado','El usuario se actualizo correctamente')
          this.usuario = Object.assign({}, data)
        } catch (error) {
          this.notificationSwal('error','Error en su registro','Intentelo mas tarde')
          console.log(error)
        }
      },
      async subirImagen() {

        const formData = new FormData();
        formData.append("file", this.imagen);
      
        try {
          console.log('Entro aqui !')
          const {data} = await axios.post(`${this.urlApi}/imagenes/upload`, formData);
          
          //this.imagen = URL.createObjectURL(this.boleta)
          this.usuario.foto = data.filename
          //this.imagen = data.filename

         //await this.actualizarUsuario()
        } catch (error) {
            this.imagen = ""
            console.log(error)
            this.alertError()
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
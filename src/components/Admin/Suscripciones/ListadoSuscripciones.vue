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
            {{ item.estado }}
          </div>
          <v-list-item-title class="text-h5 mb-1">
            {{ item.titulo }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.descripcion }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded color="red" @click="actualizarUsuario(item)">
          Cancelar Inscripcion
        </v-btn>
        <v-btn outlined rounded color="teal" v-if="item.estado=='Confirmado'">
          <v-icon>mdi-notebook-outline</v-icon>
          Gafete
        </v-btn>

        <v-btn outlined rounded color="teal" v-if="item.estado=='Confirmado'">
          <v-icon>mdi-file-document</v-icon>
          Diploma
        </v-btn>
        <v-btn outlined rounded color="green">
          <v-icon>mdi-eye-plus</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-subtitle class="pb-0">
        Tiene un periodo de 5 dias despues de su inscripción para subir su
        Boleta de pago
      </v-card-subtitle>

      <v-img class="white--text align-end" height="100px" :src="urlApi+'/imagenes/'+item.boleta">
        <v-card-title>Subir Boleta</v-card-title>
      </v-img>

      <v-file-input
        v-model="boleta"
        label="Subir Boleta"
        accept="image/png, image/jpeg, image/bmp"
        chips
        filled
        prepend-icon="mdi-camera"
        @change="subirImagen(item)"
      ></v-file-input>

      

      <v-card-actions>
        <v-btn color="orange" text> Subir Boleta </v-btn>
      </v-card-actions>
      
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    boleta:'',
    imagen:'',
    suscripciones: [],
    idusuario: 0,
    suscripcion: {
      idusuario: 1,
      idevento: 1,
      estado: "Inscrito",
    },
    default: {
      idusuario: 1,
      idevento: 1,
      estado: "Inscrito",
    },
    mensajeEmail:{
      from: '"Registro Boleta" <draslyrafael@cunsurori.edu.gt>', // sender address
      to: "pedroumg2015@gmail.com", // list of receivers
      subject: "Registro Boleta para Inscripcion Congreso Tecnologico ✔", // Subject line
      text: "SU BOLETA HA SIDO REGISTRADA ", // plain text body
      html: `
      <h3>
      Su Boleta de pago ha sido registrada exitosamente ya puede imprimir su gafete y una vez terminao 
      el evento podrá imprimir su diploma
      </h3>
      `, // html body
    },
    mensajeSMS:{
      body: "SU BOLETA HA SIDO REGISTRADA",
      from: "+19853284441",
      to: "+502"
    },
  }),
  created() {
    this.main();
  },
  computed: {
    urlApi() {
      return this.$store.getters.getUrlApi;
    },
    getUsuario() {
      return this.$store.getters.usuarioAuth.usuario;
    },
  },
  methods: {
    async main() {
      const { usuario } = this.$store.getters.usuarioAuth;
      //console.log(usuario)
      if (usuario) {
        this.idusuario = usuario.idusuario;
      }
      try {
        const { data } = await axios.get( `${this.urlApi}/suscripciones/usuario/${this.idusuario}`);
        this.suscripciones = data;

      } catch (error) {
        console.log(error);
      }
    },
    async subirImagen(item) {
      
    
      const formData = new FormData();
      formData.append("file", this.boleta);

      const res = await axios.post(`${this.urlApi}/imagenes/upload`, formData);
      res.status == 201
        ? (this.imagen = URL.createObjectURL(this.boleta))
        : (this.imagen = "");
      item.boleta = res.data.filename;
      item.estado = 'Confirmado';

      await axios.put(`${this.urlApi}/suscripciones/${item.idsuscripcion}`, item);
      await this.notificaciones()
      await this.main()
    },
    async notificaciones(){
          const { usuario } = this.$store.getters.usuarioAuth;
          //Enviamos mensaje al telefono del usuario 
          this.mensajeSMS.to = this.mensajeSMS.to+usuario.telefono
          await axios.post(`${this.urlApi}/usuarios/mensaje`,this.mensajeSMS)

          this.mensajeEmail.to = usuario.email
          await axios.post(`${this.urlApi}/usuarios/enviarcorreo`,this.mensajeEmail)
    },
    //Notificacion Swal
    notificationSwal(icon, title, text) {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
      });
    },
  },
};
</script>
<template>
  <div v-if="evento">
    <v-row class="mx-3">
      <v-col cols="8">
        <h1>{{evento.titulo}}</h1>
        <h3>{{evento.subtitulo}}</h3>

        <v-row>
          <v-col>
            <v-alert color="cyan" border="left" elevation="2" colored-border>
              <h2>El evento <strong>iniciará</strong> en:</h2>
              <flip-countdown :deadline="evento.fecha"></flip-countdown>

            </v-alert>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-img
          :src="`${urlApi}/imagenes/${evento.portada}`"
          aspect-ratio="1.7"
          class="rounded-lg"
        ></v-img>
        <v-btn color="red" x-large dark class="ma-4" v-if="getUsuario && !suscrito" @click="sucripcionEvento">Suscribirme al EVENTO</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import FlipCountdown from "vue2-flip-countdown";
import MensajeEmail from '@/utils/emailSuscripcion.js'
import Swal from 'sweetalert2'
import axios from 'axios';

export default {
  props: ['evento'],
  components: { FlipCountdown },
  data() {
    return {
      suscrito:false,
    }
  },
  computed:{
      urlApi(){
            return this.$store.getters.getUrlApi
        },
      getUsuario(){
          return this.$store.getters.usuarioAuth.usuario
        },  
  },
  created(){
    this.main()
  },
  methods:{
    async main() {
     // console.log(usuario)
      if (this.getUsuario) {
        try {
         const {data} = await axios.get( `${this.urlApi}/suscripciones/usuario/${this.getUsuario.idusuario}`);
          this.suscrito = data.find(ev=>ev.idevento==this.evento.idevento) 
        } catch (error) {
           this.suscrito=false;
          console.log(error);
        }
      }
      
    },
    async sucripcionEvento(){
     const suscripcion = {
        idevento:this.evento.idevento,
        idusuario: parseInt(this.getUsuario.idusuario)
      }

      try {
        await axios.post(`${this.urlApi}/suscripciones`,suscripcion)
        this.suscrito=true
        this.notificacionUsuario()
      } catch (error) {
        this.suscrito=false;
        console.log(error)
        Swal.fire('Error al Suscribirse al evento','','error')
      }
    },
    async notificacionUsuario(){
      const mensajeEmail =  MensajeEmail(this.getUsuario,this.evento)
      const mensajeSMS={
        body: `Se ha suscrito al evento ${this.evento.titulo}`,
        from: "+19853284441",
        to: `+502${this.getUsuario.telefono}`
      }
      try {
        await axios.post(`${this.urlApi}/usuarios/mensaje`,mensajeSMS)
        await axios.post(`${this.urlApi}/usuarios/enviarcorreo`,mensajeEmail)
        Swal.fire('Suscripción Realizada','','success')
      } catch (error) {
        console.log(error)
        Swal.fire('Error al Suscribirse al evento','','error')
      }
    }
  }
};
</script>
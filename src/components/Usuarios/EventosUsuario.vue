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
            {{ item.subtitulo }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar size="100">
          <img :src="urlApi+'/imagenes/'+item.portada" >
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded color="red" @click="actualizarUsuario(item)" v-if="item.estado!=='Confirmado'">
          Cancelar Inscripcion
        </v-btn>
        <v-btn outlined rounded color="teal" v-if="item.estado=='Confirmado'" @click="impresionGafete(item)">
          <v-icon>mdi-notebook-outline</v-icon>
          Gafete
        </v-btn>

        <v-btn outlined rounded color="teal" v-if="validarEvento(item)" @click="impresionDiploma(item)">
          <v-icon>mdi-file-document</v-icon>
          Diploma
        </v-btn>
        <v-btn outlined rounded color="green" @click="$router.push('/eventos/mostrar/'+item.idevento)">
          <v-icon>mdi-eye-plus</v-icon>
        </v-btn>
      </v-card-actions>
      <hr>
      <v-card-subtitle class="pb-0"  v-if="item.estado !=='Confirmado'">
        Tiene un periodo de 5 dias despues de su inscripción para subir su
        Boleta de pago, el numero de boleta inicia con BN-
      </v-card-subtitle>

      <v-img  width="100%" :src="urlApi+'/imagenes/'+item.boleta" contain aspect-ratio="2" v-if="item.estado =='Confirmado'" class="mb-3">
      </v-img>

      <v-btn color="red"  class="ma-3" dark 
      @click="eliminarBoleta(item)"
      v-if="item.estado =='Confirmado'"
      >
      <v-icon>mdi-trash-can</v-icon> Eliminar Boleta
      </v-btn>
      <v-text-field 
      v-if="item.estado !=='Confirmado'"
       v-model="numeroboleta" 
       label="Ingrese Número de Boleta" 
       placeholder="BN-1234568"
       class="mx-6 mt-3"
       outlined
       @change="validarBoleta"
       >
       </v-text-field>
      <v-file-input
        v-if="item.estado !=='Confirmado' && boletavalida"
        class="mx-6"
        type="file"
        outlined
        v-model="boleta"
        label="Subir Boleta"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        placeholder="Subir boleta de Pago"
        @change="subirImagen(item)"
      ></v-file-input>

      
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from 'dayjs';

export default {
  data: () => ({
    numeroboleta:'',
    boletavalida:false,
    boleta:[],
    imagen:[],
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
    async validarBoleta(){

        try {
          await axios.get(`${this.urlApi}/suscripciones/validarboleta/${this.numeroboleta}`)
          this.boletavalida = false
          Swal.fire('Boleta Inválida','La boleta es invalida o ya fue registrada','error')
        } catch (error) {
          this.boletavalida = true;
          console.log(error)
        }
    },
    async eliminarBoleta(item){
      item.boleta = 'default.png'
      item.estado = 'Inscrito'
      try {
        await axios.put(`${this.urlApi}/suscripciones/${item.idsuscripcion}`, item);
        Swal.fire('La boleta fue eliminada','','success')
        await this.main()
      } catch (error) {
        console.log(error)
        Swal.fire('Error al Eliminar Boleta','','error')
      }
    },
    validarEvento(item){
      
      const fechaevento = dayjs(item.fecha).format('YYYY-MM-DD')
      const fechaactual = dayjs().format('YYYY-MM-DD')
                      //¿La fecha del evento es posterior a la fecha de hoy ?
      const esPosterior = dayjs(fechaevento).isAfter(fechaactual)
  

      if(item.estado === 'Confirmado' && !esPosterior){
        return true
      }else{
        return false
      }
    },
    async impresionGafete(item) {
      const { usuario } = this.$store.getters.usuarioAuth;
      usuario.evento = item.titulo
      usuario.fechaevento =dayjs(item.fecha).format('DD-MM-YYYY')
      /* ---------------------- IMPRESION DE GAFETES ----------------------  */
      try {
        //Enviamos por el metodo post los participantes seleccionados para imprimir su gafete
        console.log(usuario)
        await axios.post(  `http://localhost/pdf/gafete.php`, [usuario]);

        //Una vez generado el pdf con todos los gafetes lo abrimos
        window.open("http://localhost/pdf/archivos/gafete.pdf", "blank");
      } catch (error) {
        console.log(error);
      }
    },
    async impresionDiploma(item) {
      /* ---------------------- IMPRESION DE GAFETES ----------------------  */
      try {
        //Enviamos por el metodo post los participantes seleccionados para imprimir su gafete
        await axios.post(  `http://localhost/pdf/diploma.php`,item);

        //Una vez generado el pdf con todos los gafetes lo abrimos
        window.open("http://localhost/pdf/archivos/diplomas.pdf", "blank");
      } catch (error) {
        console.log(error);
      }
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
<template>
  <v-row>
    <MenuAdministrador />
    <v-col cols="12">
      <v-sheet class="ma-2 pa-3">
        <v-data-table
          v-model="seleccionados"
          :headers="encabezados"
          :items="participantes"
          :search="buscar"
          item-key="idsuscripcion"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Participantes Evento</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="buscar"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn class="ma-2" color="indigo" dark @click="impresionDiplomas"
                ><v-icon>mdi-printer</v-icon>Diplomas</v-btn
              >
              <v-btn class="ma-2" color="indigo" dark @click="impresionGafetes"
                ><v-icon>mdi-printer</v-icon>Gafetes</v-btn
              >
            </v-toolbar>
          </template>
          <template v-slot:[`item.opciones`]="{ item }">
            <v-icon color="green" class="mr-2" @click="verBoleta(item)">
              mdi-account-cash
            </v-icon>
            <v-icon color="red" @click="eliminar(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-sheet>
    </v-col>
    <v-col cols="12">
      <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card>
        <v-card-title class="text-h5 primary white--text">
          Boleta de Pago
        </v-card-title>

        <v-card-text class="pa-5">
         <v-text-field 
          v-model="suscripcion.numeroboleta" 
          label="Número de Boleta" 
          placeholder="BN-1234568"
          outlined
          >
          </v-text-field>

          <v-img  width="100%" :src="urlApi+'/imagenes/'+suscripcion.boleta" contain aspect-ratio="2">
          </v-img>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark >
            Boleta Invalida
          </v-btn>
          <v-btn color="gray"  @click="dialog = false">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import MenuAdministrador from "../../menu/MenuAdministrador.vue";
export default {
  components: {
    MenuAdministrador,
  },
  data: () => ({
    dialog:false,
    buscar: "",
    seleccionados: [],
    participantes: [],
    encabezados: [
      { text: "Nombre", value: "nombre" },
      { text: "Apellidos", value: "apellido" },
      { text: "Telefono", value: "telefono" },
      { text: "Email", value: "email" },
      { text: "Estado", value: "estado" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    suscripcion:{
      idsuscripcion:1,
      numeroboleta:'',
      boleta:'',
      estado:''
    }
  }),
  created() {
    this.main();
  },
  computed: {
    urlApi() {
      return this.$store.getters.getUrlApi;
    },
    getEvento() {
      return this.$store.getters.getEvento;
    },
  },
  methods: {
    async main() {
      try {
        const { data } = await axios.get(
          `${this.urlApi}/eventos/participantes/${this.getEvento.idevento}`
        );
        this.participantes = data;
      } catch (error) {
        console.log(error);
      }
    },
    verBoleta(item){
      this.dialog = true;
      this.suscripcion.idsuscripcion = item.idsuscripcion
      this.suscripcion.boleta = item.boleta
      this.suscripcion.estado = item.estado 
      this.suscripcion.numeroboleta = item.numeroboleta 
      console.log( this.suscripcion)
    },
    async eliminar(item) {
      try {
        await axios.delete(
          `${this.urlApi}/suscripciones/${item.idsuscripcion}`
        );
        this.main();
        this.notificationSwal("success", "Registro Eliminado", "");
      } catch (error) {
        console.log(error);
        this.notificationSwal("error", "Error al Eliminar el registro", "");
      }
    },
    async impresionGafetes() {
      /* ---------------------- IMPRESION DE GAFETES ----------------------  */
      try {
        //Enviamos por el metodo post los participantes seleccionados para imprimir su gafete
        await axios.post(`https://eventosumg.microsystems.com.gt/pdf/gafete.php`, this.seleccionados);

        //Una vez generado el pdf con todos los gafetes lo abrimos
        window.open("https://eventosumg.microsystems.com.gt/pdf/archivos/gafete.pdf", "blank");
      } catch (error) {
        console.log(error);
      }
    },
    async impresionDiplomas() {
      /* ---------------------- IMPRESION DE GAFETES ----------------------  */
      try {
        //Enviamos por el metodo post los participantes seleccionados para imprimir su gafete
        await axios.post(
          `https://eventosumg.microsystems.com.gt/pdf/diploma.php`,
          this.seleccionados
        );

        //Una vez generado el pdf con todos los gafetes lo abrimos
        window.open("https://eventosumg.microsystems.com.gt/pdf/archivos/diplomas.pdf", "blank");
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
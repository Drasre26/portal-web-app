<template>
  <v-row>
    <MenuAdministrador />
    <v-col>
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
              <v-btn class="ma-2" color="indigo" dark @click="impresionDiplomas"><v-icon>mdi-printer</v-icon>Diplomas</v-btn>
              <v-btn class="ma-2" color="indigo" dark @click="impresionGafetes"><v-icon>mdi-printer</v-icon>Gafetes</v-btn>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-sheet>
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
    buscar:'',
    seleccionados: [],
    participantes: [],
    encabezados: [
      { text: "Nombre", value: "nombre" },
      { text: "Apellidos", value: "apellido" },
      { text: "Telefono", value: "telefono" },
      { text: "Email", value: "email" },
      { text: "Estado", value: "estado" },
    ],
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
        const { data } = await axios.get( `${this.urlApi}/eventos/participantes/${this.getEvento.idevento}`);
        this.participantes = data;
      } catch (error) {
        console.log(error);
      }
    },
    async eliminar(item) {
      try {
        await axios.delete( `${this.urlApi}/suscripciones/${item.idsuscripcion}`);
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
        await axios.post(  `http://localhost/pdf/gafete.php`, this.seleccionados);

        //Una vez generado el pdf con todos los gafetes lo abrimos
        window.open("http://localhost/pdf/archivos/gafete.pdf", "blank");
      } catch (error) {
        console.log(error);
      }
    },
    async impresionDiplomas() {
      /* ---------------------- IMPRESION DE GAFETES ----------------------  */
      try {
        //Enviamos por el metodo post los participantes seleccionados para imprimir su gafete
        await axios.post(  `http://localhost/pdf/diploma.php`, this.seleccionados);

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
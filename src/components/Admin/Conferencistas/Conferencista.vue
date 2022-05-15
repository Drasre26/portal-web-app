<template>
  <v-row>
    <MenuAdministrador />
   
    <v-col>
      <v-sheet class="ma-2 pa-2" fluid>
          <v-row>
              <v-col>
                  <h2>Conferencistas</h2>
              </v-col>
              <v-col class="text-right">
                  <v-btn color="indigo" to="/admin/conferencistas/nuevo" dark>Nuevo</v-btn>
              </v-col>
          </v-row>
    
        <v-divider class="mb-2 mt-2"></v-divider>
      <v-row>
        <v-col cols="3" v-for="item in conferencistas" :key="item.idexpositor">
<v-card class="mx-auto" max-width="100%" >
          <v-img
          class="white--text align-end"
          :src="`${urlApi}/imagenes/${item.fotografia}`"
          height="200px"
        ></v-img>
          <v-card-title>{{item.nombre}}</v-card-title>
          <v-card-text class="text--primary">
            <div v-html="item.minibiografia"></div>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn outlined rounded text @click="mostrar(item.idexpositor)">
              <v-icon>mdi-eye-plus</v-icon>
            </v-btn>
            <v-btn outlined rounded text @click="navegar(item.idexpositor)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
            <v-btn outlined rounded text @click="eliminar(item)"> 
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-col>
      </v-row>

        <h2 v-if="conferencistas.length<1">No hay registros </h2>

      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'
import MenuAdministrador from "../menu/MenuAdministrador.vue";
export default {
  components: {
    MenuAdministrador
  },
  data: () => ({
    dialog:false,
    conferencistas: [],
  }),
  created() {
    this.main();
  },
  computed: {
    urlApi() {
      return this.$store.getters.getUrlApi;
    },
  },
  methods: {
    async main() {
        try {
            const { data } = await axios.get(`${this.urlApi}/expositores`);
            this.conferencistas=data
        } catch (error) {
            this.conferencistas=[]
            console.log(error);
        }
    },
    navegar(idexpositor){
        this.$router.push('/admin/conferencistas/nuevo/'+idexpositor)
    },
    mostrar(idexpositor){
        this.$router.push('/admin/conferencistas/mostrar/'+idexpositor)
    },
    async eliminar(item){
      try {
          item.estado = 'Eliminado'
          await axios.put(`${this.urlApi}/expositores/${item.idexpositor}`,item)
          await this.main();
          Swal.fire('Registro Eliminado','El registro fue eliminado','success')
      } catch (error) {
        console.log(error)
        Swal.fire('!Opss Ocurrió un Error','Por favor intentelo mas tarde','error')
      }
    }
 },
    
};
</script>
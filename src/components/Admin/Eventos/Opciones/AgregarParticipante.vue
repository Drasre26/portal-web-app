<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark class="text-h5"
        >Expositores de este evento
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="8">
            <v-autocomplete
              v-model="expositorevento.idexpositor"
              :items="expositores"
              item-value="idexpositor"
              item-text="nombre"
              hide-selected
              dense
              filled
              clearable
              label="Seleccione Expositor"
            >
              <template v-slot:item="data">
                <template v-if="!data.item">
                  <v-list-item-content
                    >No hay registros para mostrar</v-list-item-content
                  >
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="`${urlApi}/imagenes/${data.item.fotografia}`" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.nombre"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.minibiografia"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-btn block color="indigo" large dark @click="agregarExpositor">Agregar a evento</v-btn>
          </v-col>
        </v-row>
        <!-- SI NO HAY DATOS -->
        <div v-if="expositoresdelevento.length < 1">
          <div class="text-h2 text-center">¡Sin expositores!</div>
          <div class="subtitle-1 text-center">
            Aún no hay expositores para este evento
          </div>
        </div>
        <v-alert color="indigo" outlined elevation="2" class="ma-2" v-else v-for="item of expositoresdelevento" :key="item.idexpositor">
          <v-row align="center">
            <v-col cols="1">
              <v-list-item-avatar width="70" height="70">
                <img :src="`${urlApi}/imagenes/${item.fotografia}`" />
              </v-list-item-avatar>
            </v-col>
            <v-col class="grow">
              <h3>{{item.nombre}}</h3>
              {{item.minibiografia}}
            </v-col>
            <v-col class="shrink">
              <v-btn text color="red" @click="eliminarExpositor(item)" rounded>X</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  data: () => ({
    expositores: [],
    expositoresdelevento:[],
    expositorevento: {
      idexpositor: 0,
      idevento: 0,
    },
  }),
  async created() {
    await  this.expositoresEvento()
    await this.main();
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
        const { data } = await axios.get(`${this.urlApi}/expositores`);
        this.expositores = data;
      } catch (error) {
        console.log(error);
      }
    },
    async expositoresEvento(){
        try {
            const {data} = await axios.get(`${this.urlApi}/expositoreseventos/${this.getEvento.idevento}`);
            this.expositoresdelevento = data
        } catch (error) {
            console.log(error)
        }
    },
    async agregarExpositor(){
        this.expositorevento.idevento = parseInt(this.getEvento.idevento) 
        this.expositorevento.idexpositor = parseInt(this.expositorevento.idexpositor) 
        console.log(this.expositorevento)
        try {
            await axios.post(`${this.urlApi}/expositoreseventos`,this.expositorevento);
            this.expositoresEvento()
            Swal.fire('El expositor fue Agregado al evento','','success')
        } catch (error) {
            console.log(error)
        }
    },
    async eliminarExpositor(item){
        try{
          await axios.delete(`${this.urlApi}/expositoreseventos/${item.idexpositorevento}`)
          this.expositoresEvento()
          Swal.fire('Se Eliminó el expositor de este evento','El registro fue eliminado','success')
        }catch(error){
          console.log(error)
          Swal.fire('Error al Eliminar','El registro no pudo ser eliminado','error')
        }
    }
  },
};
</script>
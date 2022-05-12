<template>
  <v-row>
    <MenuAdministrador></MenuAdministrador>
    <v-col>
      <v-sheet class="ma-2 pa-3">
        <v-row v-if="expositor">
          <v-col cols="3">
            <v-card>
              <v-img
                :src="`${urlApi}/imagenes/${expositor.fotografia}`"
                height="300"
              ></v-img>
              <v-card-title class="text-h6 brown--text"> {{expositor.nombre}} </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="9"> 
              <h2 class="brown--text">Biografia</h2>
              <div v-html="expositor.biografia"></div>  
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
import MenuAdministrador from "../menu/MenuAdministrador.vue";
export default {
  components: {
    MenuAdministrador,
  },
  data: () => ({
        expositor:{
            nombre: "",
            fotografia: "",
            minibiografia:"",
            biografia: "",
        }
   }),
  created(){
        this.main()
    },
  computed: {
    urlApi(){
        return this.$store.getters.getUrlApi
    },
  },
  methods:{
    async main () {
          const idexpositor = this.$route.params.id
          
          if(idexpositor){
            try {
              const {data} = await axios.get(`${this.urlApi}/expositores/${idexpositor}`)
              this.expositor = data;
              
            } catch (error) {
              console.log(error)
            }
             
          }
          
      }, 
  }
};
</script>
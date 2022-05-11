<template>
    <div>
        <div class="header">
      <!--Content before waves-->
        <br /><br /><br />
        <!--Just the logo.. Don't mind this-->
        <Banner :evento="evento" ></Banner>
      

      <!--Waves Container-->
      <div>
        <svg class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      <!--Waves end-->
    </div>
    <!--Header ends-->

    <v-row class="ma-1">
        <v-col>
            <v-sheet class="pa-3" elevation="2">
                <h2>Formulario</h2>
                <v-divider></v-divider>
            </v-sheet>
        </v-col>
        <v-col>
             <v-sheet class="pa-3" elevation="2">
                <h2>Descripcion Evento</h2>
                <v-divider></v-divider>
                <div v-html="evento.descripcion">

                </div>
             </v-sheet>
        </v-col>
    </v-row>
    </div>
    
</template>
<script>
import axios from 'axios'
import Banner from './BannerEvento.vue'
import * as dayjs from 'dayjs'

export default {
    components:{
        Banner
    },
    data: () => ({
        evento:null,
    }),
    created() {
        this.main()
    },
    computed:{
        urlApi(){
            return this.$store.getters.getUrlApi
        },
    },
    methods:{
        async main(){
            try {
                const {data} = await axios.get(`${this.urlApi}/eventos`)
                data[0].fecha = dayjs(data[0].fecha).format('YYYY-MM-DD')
                console.log(data[0])
                this.evento = data[0]
            } catch (error) {
                //eventos:null
                console.log(error)
            }
        }
    }
}
</script>
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
                <Inscripcion></Inscripcion>  
          
        </v-col>
        <v-col v-if="evento">
             <v-sheet class="pa-3" elevation="2">
                <h2>Descripcion Evento</h2>
                <v-divider></v-divider>
                <div v-html="evento.descripcion">
                </div>
                <v-card v-html="evento.googlemaps">

                </v-card>
             </v-sheet>
        </v-col>
    </v-row>
    </div>
    
</template>
<script>
import axios from 'axios'
import Banner from '../../Evento/BannerEvento.vue'
import Inscripcion from '../../Inscripcion/Formulario.vue'
import * as dayjs from 'dayjs'

export default {
    components:{
        Banner,Inscripcion
    },
    data: () => ({
        evento:null,
    }),
    async created() {
      const idevento = this.$route.params.idevento
      if(idevento){
         await this.getEventoPorId(idevento)
      }else{
        await this.main()
      }
        
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
                //console.log(data[0])
                this.evento = data[0]
            } catch (error) {
                //eventos:null
                console.log(error)
            }
        },
        async getEventoPorId(idevento){
          
          try {
            const {data} =  await axios.get(`${this.urlApi}/eventos/${idevento}`)
            data.fecha = dayjs(data.fecha).format('YYYY-MM-DD')
              this.evento=data
          } catch (error) {
              console.log(error)
          }   
        },
    }
}
</script>
<style>
h1 {
  font-family: "Lato", sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 48px;
}
p {
  font-family: "Lato", sans-serif;
  letter-spacing: 1px;
  font-size: 14px;
  color: #333333;
}

.header {
  position: relative;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgba(84, 58, 183, 1) 0%,
    rgba(0, 172, 193, 1) 100%
  );
  color: white;
}
.logo {
  width: 50px;
  fill: white;
  padding-right: 15px;
  display: inline-block;
  vertical-align: middle;
}

.inner-header {
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex {
  /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
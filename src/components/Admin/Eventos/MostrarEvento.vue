<template>
    <v-sheet class="mx-6 pa-6">
        <h1>{{evento.titulo}}</h1>
        <h3>{{evento.subtitulo}}</h3>
        <hr>
        <p>{{evento.descripcion}}</p>
        <hr>
        <h5>MAPS</h5>
        <hr>

    </v-sheet>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import * as dayjs from 'dayjs'
export default {
    props:{
      idevento:{
        type: String,
        default: null,
      }
    },
  data: () => ({
    evento:[],
    usuario:{
      idusuario: 1,
     // idevento: 1,
      fecha:dayjs().format(),
      estado: "Inscrito",
    },
    default:{
      idusuario: 1,
     // idevento: 1,
      estado: "Inscrito",
    },

    }),
    created(){
      this.main()
    },
    computed:{
        urlApi(){
           return this.$store.getters.getUrlApi
        },
        getUsuario(){
          return this.$store.getters.usuarioAuth.usuario
        }
    },
    methods:{
      async main(){
        const idevento = this.$route.params.idevento
        
        try {
            const {data} = await axios.get(`${this.urlApi}/eventos/${idevento}`)
            console.log(data)
            this.evento = data
        } catch (error) {
            console.log(error)
        }
      },
      async actualizarUsuario(item){
          console.log(item)
        // try {
        //  const {data} =  await axios.put(`${this.urlApi}/eventos/${this.usuario.idusuario}`,this.usuario)
        //   this.notificationSwal('success','Usuario Actualizado','El usuario se actualizo correctamente')
        //   this.usuario = Object.assign({}, data)
        // } catch (error) {
        //   this.notificationSwal('error','Error en su registro','Intentelo mas tarde')
        //   console.log(error)
        // }
      },
      //Notificacion Swal
      notificationSwal(icon,title,text){
            Swal.fire({
            icon: icon,
            title: title,
            text: text,
            })
        }
    },
    filters:{
        formatoFecha: function (value) {
            if (!value) return ''
            return value = dayjs(value).format('DD-MM-YYYY')
        },
        formatoHora: function (value) {
            
            if (!value) return ''
            return value = dayjs(value).format('hh:mm A')
        }
    }
}
</script>
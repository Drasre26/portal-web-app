<template>
    <div>
        <MenuAdministrador></MenuAdministrador>
    
    <v-sheet  class="ma-4 pa-4">
        <v-text-field
                v-model="expositor.nombre"
                label="Nombre *"
                outlined
        ></v-text-field>

        <v-text-field
                v-model="expositor.minibiografia"
                label="Acerca del Expositor *"
                placeholder="Dinos algo acerca de este expositor :) , logros experiencia, etc..."
                outlined
        ></v-text-field>

        <!-- Input para fotografia -->
            <v-file-input
              v-model="imagen"
              label="Subir Fotografia"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              outlined
              @change="subirImagen()"
            ></v-file-input>

        <h3>Biografia:</h3>
        <ckeditor :editor="editor" v-model="expositor.biografia" :config="editorConfig"></ckeditor>
        <v-btn v-if="expositor.idexpositor" @click="editar(expositor)">Editar</v-btn>
        <v-btn v-else @click="crearNuevo()">Crear Nuevo</v-btn>
    </v-sheet>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import MenuAdministrador from "../menu/MenuAdministrador.vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    components:{
        MenuAdministrador
    },
    data: () => ({
        imagen:[],
        editor: ClassicEditor,
        editorConfig: {
            toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable',  '|', 'undo', 'redo' ],
        },
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
          const idexpositor = this.$route.params.idexpositor
          console.log(idexpositor)
          if(idexpositor){
            try {
              const {data} = await axios.get(`${this.urlApi}/expositores/${idexpositor}`)
              this.expositor = data;
              
            } catch (error) {
              console.log(error)
            }
             
          }
          
      }, 
        async crearNuevo (){
            
            try {
                await axios.post(`${this.urlApi}/expositores`,this.expositor)
                Swal.fire('Registro Creado','La creación del registro fue exitosa','success')
            } catch (error) {
                console.log(error)
                Swal.fire('!Opss Ocurrió un Error','Por favor intentelo mas tarde','error')
            }
        },
        async editar (item){
            try {
                
                await axios.put(`${this.urlApi}/expositores/${item.idexpositor}`,this.expositor)
                this.$router.go(-1)
                 Swal.fire('Actualización realizada','Se realizó la actualización del registro','success')
            } catch (error) {
                console.log(error)
                Swal.fire('!Opss Ocurrió un Error','Por favor intentelo mas tarde','error')
            }
        },
        async subirImagen() {

        const formData = new FormData();
        formData.append("file", this.imagen);
      
        try {
          const {data} = await axios.post(`${this.urlApi}/imagenes/upload`, formData);
          this.expositor.fotografia = data.filename
            Swal.fire('Fotografia Cargada')
        } catch (error) {
            this.imagen = []
            console.log(error)
            Swal.fire('Error al Cargar Fotografia','','error')
        }
      
      },
    }
}
</script>
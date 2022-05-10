<template>
  <v-row>
    <MenuAdministrador/>
    <v-col>
        <v-sheet class="ma-3 pa-3">
            <h2 class="blue--text">{{titulo}}</h2>
            <hr class="blue--text">
            <br>
            <v-text-field
                v-model="evento.titulo"
                label="Titulo del Evento *"
                placeholder="Educacion virtual "
                outlined
            ></v-text-field>
            <v-text-field
                v-model="evento.subtitulo"
                label="Subtitulo *"
                placeholder="La importancia de la eduacion virtual para los estudiantes"
                outlined
            ></v-text-field>
            <v-row>
              <v-col cols="4">
            <!-- Input para la fecha -->
              <v-dialog  ref="dialog" v-model="modal"
                  :return-value.sync="evento.fecha"
                  persistent  width="290px">
                  <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="evento.fecha"
                      label="Fecha Evento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                  </template>
                  <v-date-picker v-model="evento.fecha" locale="es" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false" >
                      Cancelar
                  </v-btn>
                  <v-btn  text color="primary" @click="$refs.dialog.save(evento.fecha)">
                      OK
                  </v-btn>
                  </v-date-picker>
              </v-dialog>
              </v-col>
              <!-- Input Limite de Participantes-->

              <v-col>
                <v-text-field
                v-model="evento.limiteparticipantes"
                label="Limite de participantes *"
                placeholder=" 250 "
                outlined
            ></v-text-field>
              </v-col>
              <v-col></v-col>
              <v-col></v-col>
            </v-row>
            
            <!-- Input para portada -->
            <v-file-input
              v-model="imagen"
              label="Subir Portada"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Subir Portada"
              prepend-icon="mdi-camera"
              outlined
              @change="subirImagen()"
            ></v-file-input>


        <ckeditor :editor="editor" v-model="evento.descripcion" :config="editorConfig"></ckeditor>
        <br>
        <v-btn color="teal" @click="postItem" v-if="evento.idevento" dark>Editar</v-btn>
        <v-btn color="teal" @click="postItem"  v-else dark>Crear</v-btn>
        </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import MenuAdministrador from '../../Admin/menu/MenuAdministrador.vue'
import * as dayjs from 'dayjs'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components:{
        MenuAdministrador
    },
     data: () => ({
      crearevento:false,
      modal:false,   
      imagen:'',   
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable',  '|', 'undo', 'redo' ],
      },
      editedItem: {
        nombre: '',
        descripcion: '',
        condicion: 1,
      },
      evento: {
        titulo: '',
        subtitulo: '',
        portada: '',
        descripcion: '<p>Content of the editor.</p>',
        limiteparticipantes:5,
        fecha:dayjs().format('YYYY-MM-DD'),

      },
      defaultItem: {
        titulo: '',
        subtitulo: '',
        portada: '',
        descripcion: 1,
        limiteparticipantes:5,
        fecha:dayjs().format(),

      },
    }),

    computed: {
      urlApi(){
           return this.$store.getters.getUrlApi
        },
      titulo(){
          return this.$route.params.idevento?'Editar Evento':'Crear Evento'
      }  
    },

    async created () {
      await this.initialize()
    },

    methods: {
      async initialize () {
          const idevento = this.$route.params.idevento
          
          if(idevento){

              try {
                const {data} = await axios.get(`${this.urlApi}/eventos/${idevento}`)
                this.evento = data;
              } catch (error) {
                console.log(error)
              }
            }
          
      }, 

      async subirImagen() {

        const formData = new FormData();
        formData.append("file", this.imagen);
      
        try {
          const {data} = await axios.post(`${this.urlApi}/imagenes/upload`, formData);
          
          //this.imagen = URL.createObjectURL(this.boleta)
          this.evento.portada = data.filename
          this.alertDone()
        } catch (error) {
            this.imagen = ""
            console.log(error)
            this.alertError()
        }
      
      
    },
      async postItem(){
        this.evento.limiteparticipantes = parseInt(this.evento.limiteparticipantes);
        try {
          const {data} = await axios.post(`${this.urlApi}/eventos/`,this.evento)
          this.evento = data;
            this.alertDone()
            this.initialize()          
        } catch (error) {
            console.log(error)
            this.alertError()
        }
      },
      async putItem(){  
        this.evento.limiteparticipantes = parseInt(this.evento.limiteparticipantes); 
        try {
           const {data} = await axios.put(`${this.urlApi}/eventos/${this.evento.idevento}`,this.evento)
           this.evento = data;
            this.alertDone()
            this.initialize()
        } catch (error) {
          console.log(error)
          this.alertError()
        }
        
      },

      //Notificaciones Swal
      alertDone(){
        Swal.fire({
          icon: 'success',
          title: 'Realizado',
          showConfirmButton: false,
          timer: 1500
        })
      },
      alertError(){
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error, no pudo realizarse la solicitud',
        })
      }
    },

    
}
</script>
<style>
  .ck-editor__editable {
    min-height: 300px;
   }
</style>
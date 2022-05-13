<template>
  <v-row>
    <MenuAdministrador></MenuAdministrador>
    <v-col>
      <v-sheet class="ma-2 pa-3">
          <v-row>
              <v-col cols="8">
                <h2 class="blue--text">OPCIONES EVENTO</h2>
              </v-col>
              <v-col class="text-right" cols="4">
                  <v-btn color="red" rounded icon @click="$router.go(-1)">
                        <v-icon>mdi-close-box</v-icon>
                  </v-btn>
              </v-col>
          </v-row>

          <v-row>
              <v-col>
                  <AgregarParticipante></AgregarParticipante>
              </v-col>
          </v-row>  
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
//import axios from 'axios'
import MenuAdministrador from "../../menu/MenuAdministrador.vue";
import AgregarParticipante from "./AgregarParticipante.vue";
export default {
    components:{
        MenuAdministrador,AgregarParticipante
    }
}
</script>
<template>
  <div id="inscripcion">
    <br />
    <v-sheet color="white" rounded="lg" class="mx-2 px-3">
      <v-row>
        <v-col cols="6">
          <Formulario/>
        </v-col>
        <v-divider
          class="mx-4"
          vertical
        ></v-divider>
        <v-col cols="5">
            <Biografia/>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script>

import Biografia from './Inscripcion/Biografia.vue'
import Formulario from './Inscripcion/Formulario.vue'

  export default {
    name: 'Home',

    components: {
      Biografia,Formulario
    },
}

</script>
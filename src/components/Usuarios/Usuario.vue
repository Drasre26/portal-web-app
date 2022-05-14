<template>
    <div>
        <v-row dense class="mt-6">
            <v-col cols="6">            
                    <CrearEditarUsuario></CrearEditarUsuario>
                
            </v-col>
            <v-col cols="6" class="mt-6">
                <EventosUsuario></EventosUsuario>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import CrearEditarUsuario from './CrearEditarUsuario.vue'
import EventosUsuario from './EventosUsuario.vue'

export default {
    components:{
        CrearEditarUsuario,EventosUsuario
    }
}
</script>
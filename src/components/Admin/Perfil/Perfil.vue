<template>
    <div>
        <v-row dense class="mt-6">
            <v-col cols="6">
                
                    <Formulario></Formulario>
                

                
            </v-col>
            <v-col cols="6" class="mt-6">
                <ListadoSuscripciones></ListadoSuscripciones>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Formulario from '@/components/Inscripcion/Formulario.vue'
import ListadoSuscripciones from '@/components/Admin/Suscripciones/ListadoSuscripciones.vue'

export default {
    components:{
        Formulario,ListadoSuscripciones
    }
}
</script>
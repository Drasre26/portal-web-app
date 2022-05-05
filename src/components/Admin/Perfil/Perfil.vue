<template>
    <div>
        <v-row dense class="mx-6">
            <v-col cols="6">
                <v-card class="mx-auto my-12 pa-1">
                    <Formulario></Formulario>
                </v-card>

                
            </v-col>
            <v-col cols="6">
                <v-card class="mx-auto my-12 pa-1" max-width="200">
                    <v-img height="200"
                    src="https://cdn-icons-png.flaticon.com/512/3314/3314883.png"
                    >
                    </v-img>
                    <v-btn class="my-2" color="deep-purple lighten-2" block dark>
                        Mis Eventos
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Formulario from '@/components/Inscripcion/Formulario.vue'

export default {
    components:{
        Formulario
    }
}
</script>
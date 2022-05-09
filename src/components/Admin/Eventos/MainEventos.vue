<template>
    <v-sheet>
        <v-row>
            <v-col>
                <ListarEventos></ListarEventos>
            </v-col>
        </v-row>
    </v-sheet>
</template>
<script>
import ListarEventos from './ListarEventos.vue'
export default {
    
    components:{
        ListarEventos
    }
}
</script>
<template>
    <div>
        
            <v-row class="mx-3">
                <v-col cols="8">
                    <h1>Congreso Tecnologico</h1>
                    <h3>Universidad Mariano Galvez</h3>

                        <v-row>
                            <v-col>
                                <v-alert                
                                color="cyan"
                                border="left"
                                elevation="2"
                                colored-border
                                >
                                <h2>El evento  <strong>iniciará</strong> en:</h2> 
                                <flip-countdown deadline="2022-05-01 00:00:00"></flip-countdown>
                                </v-alert>
                            </v-col>
                        </v-row>
                </v-col>
                <v-col cols="4">
                    <v-img
                    src="https://picsum.photos/510/300?random"
                    aspect-ratio="1.7"
                    class="rounded-lg"
                    ></v-img>
                </v-col>
            </v-row>
        
    </div>
</template>
<script>
import FlipCountdown from 'vue2-flip-countdown'

export default {
     components: { FlipCountdown }
}
</script>
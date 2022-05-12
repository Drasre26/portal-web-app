<template>
<div>
        <v-navigation-drawer
      :value="getNavigation"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
    
          <v-list>
            <!-- avatar -->
            <v-card
              class="mx-auto"
              max-width="434"
              tile
            >
              <v-img
                height="100%"
                 src="https://picsum.photos/510/300?random?blur=5"
              >
                <v-row align="end" class="fill-height">
                  
                  <v-col class="py-0">
                    <v-list-item color="rgba(0, 0, 0, .4)" dark>
                      <v-list-item-content>
                        <v-list-item-title class="title">{{getUsuario.usuario.nombre +' '+getUsuario.usuario.apellido}}</v-list-item-title>
                        <v-list-item-subtitle>{{getUsuario.usuario.usuario}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col class="text-center">
                      <v-btn depressed color="primary" @click="logOut"><v-icon>mdi-account-arrow-left</v-icon>Cerrar sesión</v-btn>
                  </v-col>
                  
                </v-row>
                
              </v-img>
            </v-card>
          </v-list>

          <v-divider></v-divider>

        
   <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-list>
      <v-list-item-group
        mandatory
        dense
        color="indigo"
      >
        <v-list-item to="/admin/participantes">
          <v-list-item-icon>
            <v-icon >mdi-menu-right</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Participantes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/admin/eventos">
          <v-list-item-icon>
            <v-icon >mdi-menu-right</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Eventos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item to="/admin/conferencistas">
          <v-list-item-icon>
            <v-icon >mdi-menu-right</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Conferencistas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-card>

        </v-navigation-drawer>

</div>    
</template>



<script>

export default {
  name:'Navigation',
  data() {
    return {
    }
  },
  computed:{
    getNavigation(){
      return this.$store.getters.getNavigation
    },
    getUsuario(){
      
      return this.$store.getters.usuarioAuth
    },
    getUrlApi(){
      return this.$store.getters.getUrlApi
    }
  },
  methods:{  
       logOut(){
         this.$store.dispatch('updateAuth',false)

         this.$router.push('/login')
       },
       
    }
    
}
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
}

.app-sidebar__overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
  }
</style>
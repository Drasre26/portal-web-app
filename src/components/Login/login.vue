<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 indigo--text text--accent-3">
                        Ingresar
                      </h1>
                      <v-form>
                        <v-text-field
                        v-model="user.usuario"
                          label="Correo electronico"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          color="#feb641"
                        />

                        <v-text-field
                         v-model="user.password"
                          id="password"
                          label="Contraseña"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          color="#feb641"
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3 mb-3">
                      <v-btn rounded color="#feb641" @click="autenticacion" dark>Entrar</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="indigo darken-1">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">Inicio de Sesion!</h1>
                      <h5 class="text-center">
                        Ingrese sus datos personales y mantengase informado con las mejores noticias
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="indigo darken-1">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">¡Ya Tienes Cuenta!</h1>
                      <h5 class="text-center">
                        Para mantenerse conectado con nosotros, inicie sesión con su información personal
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step--"
                        >Iniciar Sesion</v-btn
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center display-2 indigo--text text--accent-3"
                      >
                        Crear Cuenta
                      </h1>
                    
                      <h4 class="text-center mt-4">
                        Ensure your email for registration
                      </h4>
                      <v-form>
                        <v-text-field
                          label="Nombre Completo"
                          name="Name"
                          prepend-icon="mdi-account-box"
                          type="text"
                          color="#feb641"
                        />
                        <v-text-field
                          v-model="user.usuario"
                          label="Correo electronico"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          color="#feb641"
                        />

                        <v-text-field
                          v-model="user.password"
                          id="password"
                          label="Contraseña"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          color="#feb641"
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-n5 mb-5">
                      <v-btn rounded color="#feb641" dark>REGISTRARME</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name:'LoginUser',
      
    data: () => ({
    //Login
    step:1,
    spinner:false, 
    user:{
        usuario:'',
        password:'',
    }
    }),
    computed:{
        urlApi(){
           return this.$store.getters.getUrlApi
        }
    },
    methods:{
      autenticacion(){

          this.spinner=true
      
         axios.post(`${this.urlApi}/auth/login`,this.user).then(res=>{
           const rolusuario = res.data.usuario.rol
                this.spinner=false
                this.$store.dispatch("postAutenticacion",res.data)
                if(rolusuario==="Participante"){
                  this.$router.push('/admin/usuario')
                }else{
                  this.$router.push('/admin/eventos')
                }
             
           

          }).catch(error=> {
              this.spinner=false
               this.notificationSwal('error','Error al Ingresar','Verifique que el usuario y contraseña sean correctos')
               console.log(error)
            })

        },
        notificationSwal(icon,title,text){
            Swal.fire({
            icon: icon,
            title: title,
            text: text,
            })
        }
    }
}
</script>

<style>
.login {
  background: red;
  height: 92vh;
}
</style>

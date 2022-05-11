import Vue from 'vue'
import vuex from '../store/index'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login/login.vue'
import Perfil from '../components/Admin/Perfil/Perfil.vue'
//import Administrador from '../components/Admin/Eventos/MainEventos.vue'
import Participantes from '../components/Admin/Eventos/ParticipantesEvento.vue'
import CrudEventos from '../components/Admin/Eventos/Eventos.vue'
import CrearEvento from '../components/Admin/Eventos/CrearEvento.vue'

import Pruebas from '../components/Evento/Evento.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{protegido:false}
  },
  {
    path: '/pruebas',
    name: 'Pruebas',
    component: Pruebas,
    meta:{protegido:false}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{protegido:false}
  },
  {
    path: '/admin/perfil',
    name: 'Perfil',
    component: Perfil,
    meta:{protegido:true}
  },
  {
    path: '/admin/participantes',
    name: 'Participantes',
    component: Participantes,
    meta:{protegido:true}
  },
  {
    path: '/admin/eventos',
    name: 'Eventos',
    component: CrudEventos,
    meta:{protegido:true}
  },
  {
    path: '/admin/eventos/crear/:idevento?',
    name: 'CrearEvento',
    
    component: CrearEvento,
    meta:{protegido:true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//Validamos que el usuario este Autenticado
router.beforeEach((to, from, next) => {
  const usuarioAutenticado = vuex.getters.getAutenticado;
  const {usuario} = vuex.getters.usuarioAuth;
  
  if (to.name == 'Login' && usuarioAutenticado){ 
    
    if(usuario.rol==="Participante"){
      next({ name: 'Perfil' })
    }else{
      next({ name: 'Administrador' })
    }
  
  }
  else next()
})

//Validamos que el las rutas protegidas no sean accesibles sino esta Autenticado
router.beforeEach((to, from, next) => {
  const usuarioAutenticado = vuex.getters.getAutenticado;
  const rutaProtegida = to.matched.some((record) => record.meta.protegido)
  if(!rutaProtegida){next()}
  if(rutaProtegida && usuarioAutenticado){next()}
  //if (to.name == 'AdminInicio' && !usuarioAutenticado){ next({ name: 'AdminInicio' })}
  //if (to.name == 'Login' && usuarioAutenticado){ next({ name: 'AdminInicio' })}
  if(rutaProtegida && !usuarioAutenticado){ next({ name: 'Login' }) }
 // else next()
})

export default router

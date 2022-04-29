import Vue from 'vue'
import vuex from '../store/index'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{protegido:false}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{protegido:false}
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
  console.log('to.name ==>',to.name )
  if (to.name == 'Login' && usuarioAutenticado) next({ name: 'AdminInicio' })
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

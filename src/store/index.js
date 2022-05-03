import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '../components/Login/auth.vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlapi:'http://[::1]:1990/api/v1',
    currentuser:{IdUsuario:true}
  },
  mutations: {
  },
  actions: {
  },
  getters:{
    urlApi(state){
      return state.urlapi;
    },
    getUrlApi(state){
      return state.urlapi;
    },
    getCurrentUser(state){
      return state.currentuser
    },
    
  },
  modules: {
    Auth
  }
})

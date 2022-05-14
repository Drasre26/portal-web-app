
export default {
    state:{
        usuario:false,
        accessToken:'',
        autenticado:false
    },
    mutations:{
        setAutenticacion(state,data){
            state.autenticado=true;
            state.usuario = data.usuario
            state.accessToken = data.accessToken
        },
        updateAuth(state,estado){
            state.autenticado = estado
            state.usuario = false
        },
        updateUsusario(state,data){
            state.usuario = data
        }
    },
    actions:{
        postAutenticacion({commit},usuario){
            commit('setAutenticacion',usuario)
        },
        updateAuth({commit},estado){
            commit('updateAuth',estado)
        },
        updateUsusario({commit},data){
            commit('updateUsusario',data)
        }
    },
    getters:{
        usuarioAuth(state){
            return {usuario:state.usuario,autenticado:state.autenticado}
        },
        usuarioPermisos(state){
            return state.usuariopermisos
        },
        getAutenticado(state){
            return state.autenticado;
        }
    }
}
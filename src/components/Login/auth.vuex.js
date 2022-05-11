
export default {
    state:{
        usuario:false,
        usuariopermisos:[],
        accessToken:'',
        autenticado:false
    },
    mutations:{
        setAutenticacion(state,data){
            state.autenticado=true;
            state.usuario = data.usuario
            state.usuariopermisos = data.usuario.usuariopermiso
            state.accessToken = data.accessToken
        },
        updateAuth(state,estado){
            state.autenticado = estado
            state.usuario = false
        }
    },
    actions:{
        postAutenticacion({commit},usuario){
            commit('setAutenticacion',usuario)
        },
        updateAuth({commit},estado){
            commit('updateAuth',estado)
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
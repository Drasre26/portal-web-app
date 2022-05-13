export default {
    state:{
        evento:0
    },
    mutations:{
        setEvento(state,data){
            state.evento=data
        }
    },
    actions:{
        setEvento({commit},data){
            commit('setEvento',data)
        }
    },
    getters:{
        getEvento(state){
            return state.evento;
        }
    }
}
export default {
    state:{
        idevento:0
    },
    mutations:{
        setIdevento({state},idevento){
            state.idevento=idevento
        }
    },
    actions:{
        setIdevento({commit},idevento){
            commit('setIdevento',idevento)
        }
    },
    getters:{
        getIdEvento({state}){
            return state.idevento;
        }
    }
}
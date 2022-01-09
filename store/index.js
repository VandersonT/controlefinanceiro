export const state = () => ({
    userName: '',
    endereco: [
        cidade => '',
        numero => 0,
        referencia => ''
    ]
})

export const getters = {
    userName(state){
        return state.userName
    }
}

export const mutations = {
    changeUserName(state, payload){
        state.userName = payload;
    },
    changeCity(state, payload){
        state.endereco['cidade'] = payload;
    }
}

export const actions = {
    changeUserName({commit}, payload){
        commit('changeUserName', payload)
    },
    changeCity({commit}, payload){
        commit('changeCity', payload)
    }
}
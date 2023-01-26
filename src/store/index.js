import {createStore} from "vuex";

const actions = {
    actionX(ctx, {data}) {
        ctx.commit('mutateX', {data})
    },

}
const mutations = {
    mutateX(state, {data}) {
        state.x = data
    },
}

const state = {
    x: {},
}

const getters = {
    x(state) {
        return state.x
    },
}
const modules = {}


const store = createStore({
    actions, mutations, state, getters, modules
})
export default store;
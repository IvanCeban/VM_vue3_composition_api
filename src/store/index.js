import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    addTask({commit}, payload) {
      commit('addTask', payload)
    }
  },
  getters: {
    tasks(state) {
      return state.tasks
    }
  },
  modules: {
  }
})

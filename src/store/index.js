import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload)
    },
    setTaskStatus(state, {id, status}) {
      const currentTask = state.tasks.find(el => el.id === id)
      currentTask.status = status
    }
  },
  actions: {
    addTask({commit}, payload) {
      commit('addTask', payload)
    },
    setTaskStatus({commit}, payload) {
      commit('setTaskStatus', payload)
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

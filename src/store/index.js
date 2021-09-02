import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [
      {
        title: 'test 1',
        description: 'test desc 1',
        deadline: 'date 1'
      }
    ]
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

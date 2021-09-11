import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload)
    },
    setTaskStatus(state, {dbTaskId, status}) {
      const currentTask = state.tasks.find(el => el.dbTaskId === dbTaskId)
      currentTask.status = status
    },
    setTasks(state, payload) {
      state.tasks = payload
    },
    removeAllTasks(state) {
      state.tasks = []
    },
    removeCurrentTask(state, payload) {
      const currentTaskIndex = state.tasks.findIndex(el => el.dbTaskId === payload)
      state.tasks.splice(currentTaskIndex, 1)
    },
    sortTasks(state, payload) {
      state.tasks = state.tasks.sort((a, b) => {
        if (a[payload] < b[payload]) {
          return -1;
        }
        if (a[payload] > b[payload]) {
          return 1;
        }
        return 0;
      })
    }
  },
  actions: {
    async addTask({commit, dispatch}, payload) {
      const response = await fetch(`https://vm-vue3-compositionapi-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      const dbTaskId = data.name
      await fetch(`https://vm-vue3-compositionapi-default-rtdb.europe-west1.firebasedatabase.app/tasks/${dbTaskId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({dbTaskId: dbTaskId})
      })
      dispatch('getTasks')
    },

    async setTaskStatus({commit, dispatch}, payload) {
      await fetch(`https://vm-vue3-compositionapi-default-rtdb.europe-west1.firebasedatabase.app/tasks/${payload.dbTaskId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({status: payload.status})
      })
      commit('setTaskStatus', payload)
    },

    async getTasks({commit}) {
      const response = await fetch('https://vm-vue3-compositionapi-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
      const data = await response.json()

      const res = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key]
        }
      })

      commit('setTasks', res)
    },

    async removeAllTasks({commit}) {
      await fetch(`https://vm-vue3-compositionapi-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      commit('removeAllTasks')
    },

    async removeCurrentTask({commit}, payload) {
      await fetch(`https://vm-vue3-compositionapi-default-rtdb.europe-west1.firebasedatabase.app/tasks/${payload}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      commit('removeCurrentTask', payload)
    },

    sortTasks({commit}, payload) {
      commit('sortTasks', payload)
    }
  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    activeTasksAmount(state) {
      return state.tasks.filter(task => task.status === 'active').length
    }
  },
})

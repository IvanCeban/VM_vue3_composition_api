<template>
  <h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>
  <div v-if="tasks.length">
    <h3 class="text-white">Всего активных задач: {{activeTasksAmount}}</h3>
    <AppActions/>
    <template v-for="task in tasks">
      <AppTasksItem :task="task"/>
    </template>
  </div>
</template>

<script>
import AppTasksItem from '../components/AppTasksItem'
import AppActions from '../components/AppActions'
import {useStore} from 'vuex'
import {computed, ref} from 'vue'

export default {
  name: "Tasks",
  setup () {
    const store = useStore()
    store.dispatch('getTasks')
    const tasks = computed(() => store.getters.tasks)
    const activeTasksAmount = computed(() => store.getters.activeTasksAmount)

    return {
      tasks,
      activeTasksAmount,
    }
  },
  components: {
    AppTasksItem,
    AppActions
  }
}
</script>

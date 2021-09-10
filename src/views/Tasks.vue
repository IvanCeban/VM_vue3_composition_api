<template>
  <h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>
  <div v-if="tasks.length">
    <div class="title-wrapper">
      <h3 class="text-white">Всего активных задач: {{activeTasksAmount}}</h3>
      <button class="btn danger" @click="$store.dispatch('removeAllTasks')">Удалить все задачи</button>
    </div>

    <div class="card" v-for="task in tasks">
      <h2 class="card-title">
        {{task.title}}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{getDeadline(task.deadline)}}
          </small>
        </strong>
      </p>
      <div class="buttons-container">
        <router-link :to="'/task/' + task.id">
          <button class="btn primary">Посмотреть</button>
        </router-link>
        <button class="btn danger remove" @click="$store.dispatch('removeCurrentTask', task.dbTaskId)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: "Tasks",
  setup () {
    const store = useStore()
    store.dispatch('getTasks')

    const tasks = computed(() => store.getters.tasks)
    const activeTasksAmount = computed(() => store.getters.activeTasksAmount)

    function getDeadline(date) {
      const deadline = new Date(date)
      return deadline.toLocaleDateString()
    }

    return {
      tasks,
      activeTasksAmount,
      getDeadline
    }
  },
  components: {AppStatus}
}
</script>


<style scoped>
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .title-wrapper h3,
  .title-wrapper .btn,
  .buttons-container .btn {
    margin: 0;
  }
  .buttons-container {
    display: flex;
    justify-content: space-between;
  }
</style>

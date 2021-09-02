<template>
  <h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>
  <div v-if="tasks.length">
    <h3 class="text-white">Всего активных задач: {{tasks.length}}</h3>
    <div class="card" v-for="task in tasks">
      <h2 class="card-title">
        {{task.title}}
        <AppStatus :type="'done'" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date().toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary">Посмотреть</button>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'
export default {
  name: "Tasks",
  setup () {
    const store = useStore()
    const tasks = store.getters.tasks

    console.log(tasks.value)
    return {
      tasks
    }
  },
  components: {AppStatus}
}
</script>

<template>
  <div class="card" v-if="currentTask">
    <h2>{{currentTask.title}}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="currentTask.status" /></p>
    <p><strong>Дэдлайн</strong>: {{currentTask.deadline}}</p>
    <p><strong>Описание</strong>: {{currentTask.description}}</p>
    <div>
      <button class="btn" @click="setStatus('in_progress')">Взять в работу</button>
      <button class="btn primary" @click="setStatus('done')">Завершить</button>
      <button class="btn danger" @click="setStatus('canceled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{taskId}}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'

export default {
  components: {AppStatus},
  props: ['taskId'],
  setup (props) {
    const store = useStore()
    const tasks = store.getters.tasks
    const currentTask = tasks.find(el => el.id === props.taskId)

    function setStatus(status) {
      store.dispatch('setTaskStatus', {
        id: props.taskId,
        status: status
      })
    }
    return {
      currentTask,
      setStatus
    }
  }
}
</script>

<style scoped>

</style>

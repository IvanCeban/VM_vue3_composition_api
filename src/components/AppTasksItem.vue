<template>
  <div class="card">
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
    <div class="actions">
      <router-link :to="'/task/' + task.id">
        <button class="btn primary">Посмотреть</button>
      </router-link>
      <button class="btn danger remove" @click="$store.dispatch('removeCurrentTask', task.dbTaskId)">Удалить</button>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
export default {
  name: 'AppTasksItem',
  props: ['task'],
  setup() {
    function getDeadline(date) {
      const deadline = new Date(date)
      return deadline.toLocaleDateString()
    }

    return {
      getDeadline
    }
  },
  components: {
    AppStatus
  }
}
</script>

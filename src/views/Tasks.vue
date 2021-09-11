<template>
  <h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>
  <div v-if="tasks.length">
    <h3 class="text-white">Всего активных задач: {{activeTasksAmount}}</h3>
    <div class="actions">
      <div class="form-control">
        <label for="city">Сортировка по: </label>
        <select id="city" v-model="sortBy" @change="onChange($event)">
          <option value="creationDate">Дате создания</option>
          <option value="deadline">Дэдлайну</option>
          <option value="status">Статусу</option>
        </select>
      </div>
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
      <div class="actions">
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
import {computed, ref} from 'vue'

export default {
  name: "Tasks",
  setup () {
    const store = useStore()
    store.dispatch('getTasks')
    const sortBy = ref('creationDate')
    const tasks = computed(() => store.getters.tasks)
    const activeTasksAmount = computed(() => store.getters.activeTasksAmount)

    function getDeadline(date) {
      const deadline = new Date(date)
      return deadline.toLocaleDateString()
    }

    function onChange(event) {
      store.dispatch('sortTasks', event.target.value)
    }

    return {
      tasks,
      activeTasksAmount,
      getDeadline,
      onChange,
      sortBy
    }
  },
  components: {AppStatus}
}
</script>


<style scoped>
  .actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .actions .btn {
    margin: 0;
  }
  .actions .form-control {
    display: flex;
    align-items: center;
    margin: 0;
  }
  .actions .form-control label{
    white-space: nowrap;
    margin-right: 1rem;
    color: white;
  }
</style>

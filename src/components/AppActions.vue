<template>
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
</template>

<script>
import {ref} from "vue"
import {useStore} from "vuex"
export default {
  name: 'AppTasksItem',
  setup() {
    const store = useStore()
    const sortBy = ref('creationDate')

    function onChange(event) {
      store.dispatch('sortTasks', event.target.value)
    }

    return {
      sortBy,
      onChange
    }
  }
}
</script>

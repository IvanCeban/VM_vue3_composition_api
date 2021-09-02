<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="deadline">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" @click.prevent="createTask">Создать</button>
  </form>
</template>


<script>
  import {ref, reactive} from 'vue'
  import {useStore} from 'vuex'
  export default {
    name: 'New',
    setup () {
      const store = useStore()
      const title = ref('')
      const description = ref('')
      const deadline = ref('')

      function createTask() {
        store.dispatch('addTask', {
          title: title.value,
          deadline: deadline.value,
          description: description.value
        })
      }

      return {
        title,
        description,
        deadline,
        createTask
      }
    }
  }
</script>

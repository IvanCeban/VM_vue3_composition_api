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

    <button class="btn primary" @click.prevent="createTask" :disabled="!validated">Создать</button>
  </form>
</template>


<script>
  import {ref, watch} from 'vue'
  import {useStore} from 'vuex'
  export default {
    name: 'New',
    setup () {
      const store = useStore()
      const title = ref('')
      const description = ref('')
      const deadline = ref('')
      const validated = ref(undefined)

      function createTask() {
        store.dispatch('addTask', {
          id: title.value.slice(4) + '_' + Math.floor(1000 + Math.random() * 9000),
          title: title.value,
          deadline: deadline.value,
          description: description.value
        })

        title.value = ''
        deadline.value = ''
        description.value = ''
      }

      watch([title, deadline, description], (newValues, oldValues) => {
        validated.value = newValues[0]&&newValues[1]&&newValues[2]
      })

      return {
        title,
        description,
        deadline,
        validated,
        createTask
      }
    }
  }
</script>

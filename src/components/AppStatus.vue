<template>
  <span :class="['badge', statusClass]">{{statusTitle}}</span>
</template>

<script>
import {watch, ref} from 'vue'
  export default {
    name: 'AppStatus',
    props: ['type'],
    setup(props) {
      const statuses = {
        done: {
          title: 'Выполнено',
          class: 'primary'
        },
        pending: {
          title: 'Выполняется',
          class: 'warning'
        },
        canceled: {
          title: 'Отменено',
          class: 'danger'
        },
        active: {
          title: 'Активен',
          class: 'info'
        }
      }
      const statusClass = ref(statuses[props.type].class)
      const statusTitle = ref(statuses[props.type].title)

      watch(props, val => {
        statusClass.value = statuses[val.type].class
        statusTitle.value = statuses[val.type].title
      })

      return {
        statusClass,
        statusTitle
      }
    }
  }
</script>

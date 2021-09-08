<template>
  <span :class="['badge', status.style]">{{status.title}}</span>
</template>

<script>
import {computed} from 'vue'
  export default {
    name: 'AppStatus',
    props: ['type'],
    setup(props) {
      const status = computed(() => {
        switch(props.type) {
          case 'done':
            return {title: 'Выполнено', style: 'primary'}
          case 'in_progress':
            return {title: 'Выполняется', style: 'warning'}
          case 'canceled':
            return {title: 'Отменено', style: 'danger'}
          default:
            return {title: 'Активен', style: 'info'}
        }
      })

      return {
        status
      }
    }
  }
</script>

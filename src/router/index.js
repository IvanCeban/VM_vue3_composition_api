import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import Task from '../views/Task.vue'
import New from '../views/New.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Tasks,
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/task/:taskId?',
    name: 'task',
    component: Task,
    props: true
  },
  { path: '/:notFound(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import New from '../views/New.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Tasks
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/task',
    name: 'Task',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Task.vue')
    }
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

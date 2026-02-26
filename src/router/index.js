import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Parameter from '../views/Parameter.vue'
import Setting from '../views/Setting.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/parameter', name: 'parameter', component: Parameter },
  { path: '/setting', name: 'setting', component: Setting }
]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

const router = createRouter({
  history: createWebHistory('/vue-pik2-report/'),
  routes
})

export default router
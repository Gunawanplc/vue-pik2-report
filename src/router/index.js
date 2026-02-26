import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Parameter from '../views/Parameter.vue'
import Setting from '../views/Setting.vue'
import PumpHouseReport from '../views/PumpHouseReport.vue'
import WaterGateReport from '../views/WaterGateReport.vue'

const routes = [
  { path: '/', name: 'pumphousereport', component: PumpHouseReport },
  { path: '/watergatereport', name: 'watergatereport', component: WaterGateReport },
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
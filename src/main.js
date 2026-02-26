import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// ================= AXIOS =================
axios.defaults.baseURL = 'http://127.0.0.1:8001/api'
axios.defaults.timeout = 10000


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'


// ================= HIGHCHARTS =================
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting'
import Accessibility from 'highcharts/modules/accessibility'
import SeriesLabel from 'highcharts/modules/series-label'


// ================= TABULATOR =================
// import 'tabulator-tables/dist/css/tabulator_modern.min.css'
import 'tabulator-tables/dist/css/tabulator_midnight.min.css'



// ================= FONTAWESOME =================
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp)

// ================= ECHARTS =================
import VChart from 'vue-echarts'
import './services/echarts'

// ================= APP =================
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VChart', VChart)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$http = axios

app.use(router)
app.use(HighchartsVue)

app.mount('#app')
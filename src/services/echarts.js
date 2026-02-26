// services/echarts.js
import { use } from 'echarts/core'

import { CanvasRenderer } from 'echarts/renderers'
import { CustomChart } from 'echarts/charts'
import { BarChart, ScatterChart } from 'echarts/charts'   // ⬅️ SCATTER WAJIB
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  CustomChart,
  BarChart,
  ScatterChart,          // ⬅️ TANPA INI = ARROW HILANG
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])



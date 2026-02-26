<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'

import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, ScatterChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  ScatterChart,
  GridComponent,
  LegendComponent,
  TooltipComponent
])

const option = ref({
  tooltip: {},
  legend: {
    bottom: 0
  },
  grid: {
    left: 40,
    right: 20,
    top: 40,
    bottom: 60
  },
  xAxis: {
    type: 'category',
    data: [
      'Grup 1','Grup 2','Grup 3','Grup 4','Grup 5',
      'Grup 6','Grup 7','Grup 8','Grup 9','Grup 10'
    ]
  },
  yAxis: {
    type: 'value'
  },

  series: [
    // ASK Bottom (belakang)
    {
      name: 'ASK Bottom',
      type: 'bar',
      data: [500,3000,150,500,3000,150,500,3000,150,500],
      barWidth: 60,
      barGap: '-100%',     // ⬅️ OVERLAP
      itemStyle: {
        color: '#00AEEF'
      },
      z: 1
    },

    // ASK Top (depan)
    {
      name: 'ASK Top',
      type: 'bar',
      data: [200,300,1000,200,300,1000,200,300,1000,200],
      barWidth: 60,
      barGap: '-100%',     // ⬅️ OVERLAP
      itemStyle: {
        color: '#C0FF33',
        borderColor: '#000',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'top'
      },
      z: 2
    },

    // BUY (tengah)
    {
      name: 'BUY',
      type: 'bar',
      data: Array(10).fill(2500),
      barWidth: 30,
      barGap: '30%',
      itemStyle: {
        color: '#32B553'
      },
      label: {
        show: true,
        position: 'top'
      },
      z: 3
    },

    // SELL (kanan)
    {
      name: 'SELL',
      type: 'bar',
      data: Array(10).fill(1750),
      barWidth: 30,
      barGap: '30%',
      itemStyle: {
        color: '#EE1C25'
      },
      label: {
        show: true,
        position: 'top'
      },
      z: 3
    },

    // (OPSIONAL) ASK Setting – ARROW (ECharts NATIVE)
    {
      name: 'ASK Setting',
      type: 'scatter',
      data: Array(10).fill(1000),
      symbol: 'path://M0 10 L10 0 L20 10 L15 10 L15 20 L5 20 L5 10 Z',
      symbolSize: 26,
      itemStyle: {
        color: '#00AEEF',
        borderColor: '#000',
        borderWidth: 1
      },
      z: 10
    }
  ]
})
</script>

<template>
  <div class="chart-wrapper">
    <VChart :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 450px;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}
</style>
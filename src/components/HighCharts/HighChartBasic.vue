<script setup>
import { ref } from 'vue'

const chartOptions = ref({
//     exporting: {
//     enabled: false // Ini defaultnya true, tapi pastikan tidak ada yang menimpa
//   },
  chart: {
    type: 'line'
  },
  title: {
    text: 'Grafik Penjualan Bulanan'
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei']
  },
  series: [{
    name: 'Produk A',
    data: [10, 25, 15, 30, 20]
  }]
})
</script>

<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>
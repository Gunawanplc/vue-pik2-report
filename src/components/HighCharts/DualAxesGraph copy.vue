<script setup>
import { ref } from 'vue';

const chartOptions = ref({
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Analisis Cuaca: Suhu vs Curah Hujan'
  },
  xAxis: [{
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    crosshair: true
  }],
  
  // DEFINISI 2 SUMBU Y
  yAxis: [
    { // Sumbu Y Pertama (Index 0)
      labels: {
        format: '{value}°C',
        style: { color: '#ff4d4d' }
      },
      title: {
        text: 'Suhu',
        style: { color: '#ff4d4d' }
      }
    }, 
    { // Sumbu Y Kedua (Index 1)
      title: {
        text: 'Curah Hujan',
        style: { color: '#4d94ff' }
      },
      labels: {
        format: '{value} mm',
        style: { color: '#4d94ff' }
      },
      opposite: true // Letakkan di sisi kanan
    }
  ],

  tooltip: {
    shared: true // Menampilkan kedua data dalam satu box saat hover
  },

  series: [
    {
      name: 'Curah Hujan',
      type: 'spline',
      yAxis: 1, // Menghubungkan ke sumbu Y kedua (kanan)
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0],
      tooltip: { valueSuffix: ' mm' },
      color: '#4d94ff'
    },
    {
      name: 'Suhu',
      type: 'spline', // Garis melengkung
      yAxis: 0, // Menghubungkan ke sumbu Y pertama (kiri)
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5],
      tooltip: { valueSuffix: '°C' },
      color: '#ff4d4d'
    }
  ]
});
</script>

<template>
  <div class="chart-wrapper">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<style scoped>
.chart-wrapper {
  max-width: 900px;
  margin: 20px auto;
}
</style>
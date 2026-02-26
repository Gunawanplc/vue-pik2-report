<script setup>
import { ref } from 'vue';


const chartOptions = ref({
  chart: {
    type: 'line', // Gunakan 'scatter' untuk grafik XY murni
    zoomType: 'xy'   // Memungkinkan user melakukan zoom pada kedua sumbu
  },
  title: {
    text: 'Analisis Hubungan X dan Y'
  },
  subtitle: {
    text: 'Contoh Scatter Plot di Vue 3'
  },
  xAxis: {
    title: {
      enabled: true,
      text: 'Nilai X (Contoh: Tinggi Badan)'
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true
  },
  yAxis: {
    title: {
      text: 'Nilai Y (Contoh: Berat Badan)'
    }
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 100,
    y: 70,
    floating: true,
    backgroundColor: '#FFFFFF',
    borderWidth: 1
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: 'X: {point.x}, Y: {point.y}'
      }
    }
  },
  series: [{
    name: 'Kelompok A',
    color: 'rgba(223, 83, 83, .5)',
    data: [
      [161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
      [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2]
    ]
  }, {
    name: 'Kelompok B',
    color: 'rgba(119, 152, 191, .5)',
    data: [
      [174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
      [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6]
    ]
  }]
});
</script>

<template>
  <div class="chart-container">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<style scoped>
.chart-container {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}
</style>
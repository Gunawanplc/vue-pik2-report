<script setup>
import { ref } from 'vue';


const chartOptions = {
  chart: {
    backgroundColor: '#C0E8E8',
    borderWidth: 1,
    borderColor: '#000',
    type: 'spline',
    height:'600 px'
  },
  title: {
    text: 'Pump Test Curve',
    style: { fontWeight: 'bold' }
  },




  xAxis: {
    title: { 
      text: 'Flowrate (BFPD)',
      style: { color: 'green', fontWeight: 'bold' }
    },
    labels: { style: { color: 'green' } },
    gridLineWidth: 1,
    gridLineColor: '#444',
    // --- MINOR SCALE X ---
    minorTickInterval: 25, // Garis kecil setiap 10 unit
    // minorGridLineWidth: 0.5,
    minorGridLineColor: '#A8D1D1',
    tickInterval: 100,
    gridLineColor: '#444',
    min: 0,
    max: 550,
    // --- AREA KUNING (PLOT BANDS) ---
    // plotBands: [{
    //   from: 200, // Mulai dari Flowrate 200
    //   to: 500,   // Sampai Flowrate 500
    //   color: 'rgba(255, 255, 0, 0.3)', // Kuning transparan
    //   label: {
    //     text: 'Optimal Range',
    //     style: { color: '#666' }
    //   }
    // }]
  },


  yAxis: [
    { // 0: Head (Kiri)
      title: { text: 'Ft', style: { color: 'blue', fontWeight: 'bold' } },
      labels: { style: { color: 'blue' } },
      min: 0, max: 25,
      gridLineColor: '#444',
      // --- MINOR SCALE Y ---
      minorTickInterval: 2.5,
      // minorGridLineColor: '#888'
      title: { text: 'Ft', style: { color: 'blue' } },
      min: 0, max: 25
    },
    { // 1: HP (Kanan Dalam)
      title: { text: 'HP', style: { color: 'red', fontWeight: 'bold' } },
      labels: { format: '{value:.2f}', style: { color: 'red' } },
      opposite: true,
      min: 0, max: 0.20,
      gridLineWidth: 0,
      minorTickInterval: 0.01
    },
    { // 2: Eff (Kanan Luar)
      title: { text: 'Eff (%)', style: { color: 'black', fontWeight: 'bold' } },
      labels: { style: { color: 'black' } },
      opposite: true,
      min: 0, max: 100,
      gridLineWidth: 0,
      minorTickInterval: 2
    }
  ],

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false // Menghilangkan garis penghubung label
      }
    }
  },

  series: [
    {
      name: 'Head Highlight',
      type: 'line',
      data: [[200, 20.5], [300, 19], [400, 16], [500, 12]],
      yAxis: 0,
      color: 'rgba(255, 255, 0, 0.5)', // Kuning stabilo
      lineWidth: 10, // Dibuat sangat tebal seperti highlight
      enableMouseTracking: false, // Agar tidak mengganggu tooltip
      marker: { enabled: false },
      states: { hover: { enabled: false } },

    },
    {
      name: 'Head',
      data: [[0, 21.5], [100, 21.5], [200, 20.5], [300, 19], [400, 16], [500, 12], [550, 9]],
      yAxis: 0,
      color: 'blue',
      label: {
        enabled: true,
        style: { color: 'blue', fontWeight: 'bold' }
      },
      zIndex: 5 // Di atas highlight
    },

    // {
    //   name: 'Head',
    //   data: [[0, 21.5], [100, 21.5], [200, 20.5], [300, 19], [400, 16], [500, 12], [550, 9]],
    //   yAxis: 0,
    //   color: 'blue',
    //   zIndex: 2 // Agar garis berada di atas plotBand kuning
    // },
    {
      name: 'Motor Load',
      data: [[0, 0.06], [100, 0.075], [200, 0.085], [300, 0.095], [400, 0.105], [500, 0.105], [550, 0.10]],
      yAxis: 1,
      color: 'red'
    },
    {
      name: 'Pump Eff',
      data: [[0, 0], [100, 25], [200, 38], [300, 44], [400, 46], [500, 42], [550, 36]],
      yAxis: 2,
      color: 'black',
      label: {
        enabled: true,
        style: { color: 'black', fontWeight: 'bold' }
      }
    }
  ],
  tooltip: {
    shared: true,
    crosshairs: true
  }
};

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
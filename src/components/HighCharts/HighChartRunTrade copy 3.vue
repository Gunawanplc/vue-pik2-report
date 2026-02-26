<script setup>
import { ref } from 'vue';

// Import ikon langsung dari library FontAwesome yang sudah diinstall
// import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const chartOptions = ref({

  chart: {
        type: 'column'
    },
    title: {
        text: 'ASK Overlap (Bukan Stack), BUY & SELL Terpisah'
    },
    xAxis: {
        categories: ['Grup 1', 'Grup 2', 'Grup 3','Grup 4', 'Grup 5','Grup 6', 'Grup 7', 'Grup 8','Grup 9', 'Grup 10']
    },
    plotOptions: {
        column: {
            grouping: false, // Memungkinkan overlap antar bar
            borderWidth: 2,
            borderColor: '#000',
            dataLabels: { enabled: true }
        },
        scatter: {
          marker: {
            enabled: true,
            radius: 1   // ⬅️ MATIKAN circle default
          }
        }
    },
    series: [
        {
            name: 'ASK Bottom',
            data: [500, 3000, 150,500, 3000,500, 3000, 150,500, 3000],
            color: '#00AEEF',
            pointPadding: 0.3,
            pointPlacement: -0.3, // Posisi sama dengan ASK Top agar overlap
            pointWidth: 50,
            zIndex: 0           // Di belakang ASK Top
        },
        {
            name: 'ASK Top',
            data: [200, 300, 1000,200, 300,200, 300, 1000,200, 300],
            color: '#C0FF33',
            pointPadding: 0.3, // Membuat bar ASK berada di posisi kiri
            pointPlacement: -0.3, 
            pointWidth: 30,     // Lebar bar ASK
            zIndex: 1           // Di depan ASK Bottom
        },
        {
            name: 'BUY',
            data: [2500, 2500, 2500,2500, 2500,500, 2500, 2500,2500, 2500],
            color: '#32B553',
            pointPadding: 0.3,
            pointPlacement: 0,    // Posisi bar tengah
            pointWidth: 30,
            zIndex: 2
        },
        {
            name: 'SELL',
            data: [1750, 1750, 1750,1750, 1750,500, 2500, 2500,2500, 2500],
            color: '#EE1C25',
            pointPadding: 0.3,
            pointPlacement: 0.2,  // Posisi bar kanan
            pointWidth: 30,
            zIndex: 2
        }
    ]
});

  
</script>

<template>
  <div class="chart-container">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<style scoped>
.chart-container {
  max-width: 1900px;
  width: 1650px;
  margin: 0 auto;
  border: 1px solid #ddd;
  padding: 2rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
  border-radius: 8px;
}
</style>
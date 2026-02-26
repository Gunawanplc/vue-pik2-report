<template>
  <div class="dashboard">
    <!-- <header style="color :white;padding:4px;background-color: black;font-size: 36px;font-weight: bold;"> -->
      <!-- <span>Water Gate1 System</span> -->
      <!-- <div class="status-chip">System Online</div> -->
    <!-- </header> -->

    <div>
      <font-awesome-icon icon="fa-solid fa-arrow-up" />

      <font-awesome-icon 
        icon="fa-solid fa-arrow-up" 
        size="2xl" 
        style="color: #00AEEF" 
      />
    </div>

    <main class="grid-layout">
      <!-- <section class="visual" style="background-color: transparent;">
        <HighChartBasic/>
      </section> -->
      <!-- <section class="visual" style="background-color: transparent;">
        <HighChartXYGraph/>
      </section> -->
      <!-- <section class="visual" style="background-color: transparent;">
        <EChartsRunTread/>
      </section> -->

      <section class="visual" style="background-color: transparent;">
        <HighChartRunTrade/>
      </section>
    </main>
    </div>
  </template>

  <script setup>
  import { reactive, onMounted } from 'vue';
  import HighChartBasic from '../components/HighCharts/HighChartBasic.vue';
  import HighChartXYGraph from '../components/HighCharts/HighChartXYGraph.vue';
  import DualAxesGraph from '../components/HighCharts/DualAxesGraph.vue';
  import HighChartRunTrade from '../components/HighCharts/HighChartRunTrade.vue';
  import EChartsRunTread from '../components/ECharts/EChartsRunTread.vue';




  
  // Simulasi data real-time
  onMounted(() => {

  });
</script>

<style scoped>
/* .page {
  padding: 16px;
} */
:root { font-family: Inter, sans-serif; background: #0f172a; color: white; }
.dashboard { padding: 0.5rem; }
.grid-layout { display: grid; grid-template-columns: 1fr; gap: 1.5rem; max-width: 80%;max-height: 90%;padding-bottom: 2rem;}
/* .grid-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; } */
.card { background: #d3d3d3; border-radius: 20px; padding: 1.5rem; border: 1px solid #334155; }
/* .card { background: #1e293b; border-radius: 12px; padding: 1.5rem; border: 1px solid #334155; } */
.metric-item { margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; }
h1 { margin-top: 0; font-size: 1.5rem; }


/* 1. Pastikan body & dashboard tidak punya sisa ruang */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Mencegah double scroll */
}

</style>

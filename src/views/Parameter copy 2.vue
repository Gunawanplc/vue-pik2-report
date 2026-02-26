<template>
  <div class="dashboard">
    <header style="color :white;padding:4px;background-color: black;font-size: 36px;font-weight: bold;">
      <span>Water Gate1 System</span>
      <!-- <div class="status-chip">System Online</div> -->
    </header>

    <main class="grid-layout">
      <section class="visual" style="background-color: transparent;">
        <IndustrialMap :machineA="data.machineA" :storageLevel="data.tankLevel" />
      </section>
    </main>
    </div>
  </template>

  <script setup>
  import { reactive, onMounted } from 'vue';
  import IndustrialMap from '../components/IndustrialMap.vue';

  const data = reactive({
    machineA: { temp: 45, active: true },
    tankLevel: 100
  });

  // Simulasi data real-time
  onMounted(() => {
    setInterval(() => {
      data.machineA.temp = Math.floor(Math.random() * (90 - 40) + 40);
      data.tankLevel = (data.tankLevel + 5) % 150;
    }, 3000);
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

/* 2. Buat dashboard memenuhi layar */
.dashboard {
  display: flex;
  flex-direction: column;
  height: 88.5vh; /* Tinggi penuh layar */
  overflow: hidden; /* Scrollbar hanya muncul jika konten meluap */
  /* padding: 1.5rem; */
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
}

/* 3. Main/Grid mengambil sisa ruang setelah Header */
.grid-layout {
  flex: 1; 
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  /* background-color: aqua; */
  /* min-height: 0;  */
  /* Penting agar grid tidak meluap */
}

/* 4. Card Visual dibuat menjadi Flex Container */
/* .visual { */
  /* display: flex; */
  /* padding: 10px; */
  /* flex-direction: column; */
  /* height: 100%; Isi penuh grid cell */
  /* min-height: 0;  */
  /* background-color: bisque; */
/* } */

/* 5. SVG Wrapper/Container */
.svg-container {
  flex: 1;       /* Ambil semua sisa ruang di dalam kartu */
  width: 100%;
  min-height: 0; /* Cegah elemen anak memaksa container membesar */
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

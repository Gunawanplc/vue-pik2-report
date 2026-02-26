<template>
  <div class="svg-container" style="background-color: white;border-radius: 20px;">
    <svg 
        viewBox="0 0 350 400" 
        xmlns="http://www.w3.org/2000/svg" 
    >

    <IconMotor :isRunning="system.motorOn" />

    <!-- <IconTank :x="100" :y="50" :level="80" :scale="1" /> -->
     
    <!-- <IconTank :level="system.waterLevel" /> -->

    <IconTank :x="400" :y="100" :level="30" :scale="1.5" />

    <IconTank :x="800" :y="50" :level="system.tankLevel" :scale="0.8" />

    <!-- <IconValve :isOpen="system.valveOpen" @click="system.valveOpen = !system.valveOpen" /> -->

    <!-- <IconValve :isOpen="system.valveOpen" @click="system.valveOpen = !system.valveOpen" /> -->
    <!-- <rect x="0" y="0" width="350" height="385" rx="10" fill="white" /> -->
      <!-- <rect x="10" y="10" width="780" height="380" rx="10" fill="#1e293b" /> -->
      <!-- <rect x="10" y="10" width="980" height="380" rx="10" fill="#1e293b" /> -->
      
      <!-- <g @click="$emit('select', 'Machine A')" class="cursor-pointer">
        <rect x="50" y="50" width="120" height="80" :fill="statusColor(machineA)" rx="5" />
        <text x="60" y="95" fill="white" font-weight="bold">MACHINE A</text>
        <text x="60" y="115" fill="white" font-size="10">{{ machineA.temp }}°C</text>
      </g> -->

      <!-- <line x1="170" y1="90" x2="300" y2="90" 
            stroke="#94a3b8" stroke-width="8" stroke-dasharray="10,5"
            :class="{ 'animate-flow': machineA.active }" />

      <rect x="300" y="40" width="100" height="150" fill="#334155" />
      <rect x="300" :y="190 - storageLevel" width="100" :height="storageLevel" fill="#3b82f6" /> -->
    </svg>
  </div>

  <div class="grid-layout">
    <div class="card">
      <h3>System Status</h3>
      <div style="display: flex; gap: 0px; align-items: center;">
        <IconValve :isOpen="system.valveOpen" @click="system.valveOpen = !system.valveOpen" />
        
        <IconTank :level="system.waterLevel" />
        
        <IconMotor :isRunning="system.motorOn" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import IconValve from '../components/icons/IconValve.vue';
import IconTank from '../components/icons/IconTank.vue';
import IconMotor from '../components/icons/IconMotor.vue';

defineProps(['machineA', 'storageLevel']);

const statusColor = (m) => {
  if (m.temp > 80) return '#ef4444'; // Overheat
  return m.active ? '#22c55e' : '#64748b';
};

const system = reactive({
  valveOpen: true,
  waterLevel: 65,
  motorOn: true
});

</script>

<style scoped>
.cursor-pointer { cursor: pointer; transition: 0.3s; }
.cursor-pointer:hover { opacity: 0.8; }

.animate-flow {
  animation: flow 2s linear infinite;
}

@keyframes flow {
  from { stroke-dashoffset: 20; }
  to { stroke-dashoffset: 0; }
}

/* svg {
  display: block; 
  max-width: 100%;
  max-height: 100%;
} */

/* .visual {
  width: 100%;
} */
.svg-container {
  padding: 0;
  width: 100%;
  height: 60%; /* Atau tentukan tinggi spesifik jika tidak menggunakan flex */
}

</style>
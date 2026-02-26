<template>
  <div class="control-container">
    <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" class="main-svg">
      <g transform="translate(700, 200)">
        <path d="M0 50 L125 0 L250 50 L250 200 L0 200 Z" fill="#334155" stroke="#94a3b8" stroke-width="3"/>
        <text x="125" y="230" fill="white" text-anchor="middle" font-weight="bold">RUMAH POMPA</text>
        
        <foreignObject x="40" y="80" width="60" height="60">
          <Zap :class="{ 'pump-active': isPumpRunning }" color="#fbbf24" :size="48" />
        </foreignObject>
        <foreignObject x="150" y="80" width="60" height="60">
          <Zap :class="{ 'pump-active': isPumpRunning }" color="#fbbf24" :size="48" />
        </foreignObject>
      </g>

      <rect x="50" y="150" width="300" height="250" fill="#1e293b" stroke="#475569" stroke-width="4" />
      <rect x="55" :y="400 - waterLevel" width="290" :height="waterLevel" fill="#3b82f6" opacity="0.8" style="transition: all 1s ease" />
      
      <rect x="400" y="150" width="250" height="250" fill="#1e293b" stroke="#475569" stroke-width="4" />
      <rect x="405" :y="400 - (waterLevel * 0.4)" width="240" :height="waterLevel * 0.4" fill="#60a5fa" opacity="0.6" />

      <g :transform="`translate(340, ${250 - gatePosition})`">
        <rect x="0" y="0" width="70" height="150" fill="#64748b" stroke="#cbd5e1" />
        <foreignObject x="10" y="10" width="50" height="50">
          <Settings :class="{ 'spinning': isActuating }" color="white" :size="30" />
        </foreignObject>
        <text x="35" y="100" fill="white" font-size="12" text-anchor="middle">GATE</text>
      </g>

      <path d="M650 350 L700 350" stroke="#94a3b8" stroke-width="15" fill="none" />
    </svg>

    <div class="panel">
      <div class="control-group">
        <label>Water Level: {{ waterLevel }}%</label>
        <input type="range" v-model="waterLevel" min="10" max="240">
      </div>
      <div class="control-group">
        <label>Gate Opening: {{ gatePosition }}px</label>
        <input type="range" v-model="gatePosition" min="0" max="100" @input="startActuator">
      </div>
      <button @click="isPumpRunning = !isPumpRunning" :class="{ active: isPumpRunning }">
        {{ isPumpRunning ? 'Stop Pumps' : 'Start Pumps' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Zap, Settings } from 'lucide-vue-next';

const waterLevel = ref(150);
const gatePosition = ref(20);
const isPumpRunning = ref(false);
const isActuating = ref(false);

const startActuator = () => {
  isActuating.value = true;
  setTimeout(() => isActuating.value = false, 1000);
};
</script>

<style scoped>
.control-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #0f172a;
  padding: 20px;
}

.main-svg {
  flex: 1;
  width: 100%;
}

.panel {
  display: flex;
  gap: 2rem;
  padding: 20px;
  background: #1e293b;
  border-radius: 10px;
  margin-top: 10px;
}

.pump-active {
  animation: pulse 0.5s infinite alternate;
  filter: drop-shadow(0 0 8px #fbbf24);
}

.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  from { opacity: 0.5; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1.1); }
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: #475569;
  color: white;
}

button.active {
  background: #ef4444;
}
</style>
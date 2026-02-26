<template>
  <div class="mobile-container">
    <div class="system-header">
      <h2>Water Gate System</h2>
      <div class="status-bar">MQTT CONNECTED v1.3</div>
    </div>

    <div class="svg-wrapper">
      <svg viewBox="0 0 400 550" xmlns="http://www.w3.org/2000/svg" class="main-svg">
        <path d="M10 140 L200 20 L390 140 L390 540 L10 540 Z" fill="none" stroke="#ffffff" stroke-width="2"/>

        <g transform="translate(30, 80)">
          <text x="0" y="25" fill="white" font-size="12">set point</text>
          <line x1="0" y1="40" x2="60" y2="40" stroke="#3b82f6" stroke-width="4" />
          <circle cx="20" cy="40" r="6" fill="#3b82f6" stroke="white" />
          
          <g transform="translate(100, 0)">
            <text x="0" y="5" fill="white" font-size="10">Control Valve</text>
            <rect x="0" y="10" width="60" height="30" rx="5" fill="white" />
            <text x="30" y="30" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="16">{{ gateOpening }}%</text>
          </g>

          <g transform="translate(200, -20)">
            <rect width="130" height="60" fill="white" rx="3" />
            <rect x="10" y="10" width="40" height="40" rx="5" fill="#fbbf24" />
            <path d="M22 22 L32 30 L22 38 Z" fill="black" />
            <text x="60" y="35" fill="black" font-size="12" font-weight="bold">Auto Mode</text>
          </g>
        </g>

        <g transform="translate(30, 160)">
          <rect width="160" height="200" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <rect x="2" :y="198 - (danauLevel/1.5)" width="156" :height="danauLevel/1.5" fill="#2563eb" />
          <text x="80" y="100" text-anchor="middle" fill="white" font-size="14">Lvl Danau</text>
          <rect x="30" y="115" width="100" height="35" rx="15" fill="black" />
          <text x="80" y="138" text-anchor="middle" fill="#fbbf24" font-weight="bold">{{ danauLevel }} cm</text>

          <g transform="translate(180, 0)">
            <rect width="160" height="200" fill="#1e293b" stroke="#475569" stroke-width="2" />
            <rect x="2" :y="198 - (sungaiLevel/1.5)" width="156" :height="sungaiLevel/1.5" fill="#0ea5e9" />
            <text x="80" y="100" text-anchor="middle" fill="white" font-size="14">Lvl Sungai</text>
            <rect x="30" y="115" width="100" height="35" rx="15" fill="black" />
            <text x="80" y="138" text-anchor="middle" fill="#fbbf24" font-weight="bold">{{ sungaiLevel }} cm</text>
          </g>
        </g>

        <g transform="translate(30, 380)">
          <text x="20" y="0" fill="white" font-size="12">volt</text>
          <circle cx="35" cy="35" r="30" fill="white" />
          <path d="M35 35 L20 20" stroke="black" stroke-width="2" />

          <text x="120" y="0" fill="white" font-size="12">ampere</text>
          <circle cx="140" cy="35" r="30" fill="white" />
          <path d="M140 35 L160 20" stroke="black" stroke-width="2" />

          <g transform="translate(200, 0)">
            <text x="80" y="0" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">Power Consumption</text>
            <rect x="0" y="10" width="160" height="45" fill="black" stroke="#92400e" stroke-width="2" />
            <text x="80" y="40" text-anchor="middle" fill="#facc15" font-size="16" font-family="monospace">1000000 KWH</text>
          </g>
        </g>

        <g transform="translate(30, 480)">
          <template v-for="(p, i) in 4" :key="i">
            <g :transform="`translate(${i * 50}, 0)`">
              <path d="M5 20 L25 20 L25 5 L15 5 Z" fill="white" />
              <circle cx="15" cy="15" r="5" stroke="black" />
              <text x="15" y="35" text-anchor="middle" fill="white" font-size="8">Pump {{ i+1 }}</text>
            </g>
          </template>

          <g transform="translate(250, -10)">
            <rect width="50" height="45" rx="3" fill="#334155" stroke="white" />
            <text x="25" y="30" text-anchor="middle" fill="#fbbf24">⚡</text>
            <rect x="60" width="50" height="45" rx="3" fill="#334155" stroke="white" />
            <text x="85" y="30" text-anchor="middle" fill="#fbbf24">⚡</text>
          </g>
        </g>
      </svg>
    </div>

    <div class="footer-controls">
      <div class="ctrl">
        <label>DANAU LEVEL</label>
        <input type="range" v-model="danauLevel" min="0" max="250">
      </div>
      <div class="ctrl">
        <label>VALVE OPENING</label>
        <input type="range" v-model="gateOpening" min="0" max="100">
      </div>
      <button class="btn-start">SYSTEM START</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const danauLevel = ref(220);
const sungaiLevel = ref(110);
const gateOpening = ref(100);
</script>

<style scoped>
.mobile-container {
  background: #0d1117;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.system-header {
  padding: 10px;
  text-align: center;
  background: #000;
}

.status-bar {
  color: #22c55e;
  font-size: 12px;
  font-family: monospace;
}

.svg-wrapper {
  flex: 1;
  padding: 10px;
  display: flex;
  align-items: flex-start; /* Tetap di atas */
  justify-content: center;
}

.main-svg {
  width: 100%;
  max-width: 450px; /* Batas lebar mobile */
  height: auto;
}

.footer-controls {
  background: #161b22;
  padding: 20px;
  border-top: 1px solid #30363d;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

.ctrl { display: flex; flex-direction: column; width: 45%; }
.ctrl label { font-size: 10px; color: #58a6ff; margin-bottom: 5px; }

.btn-start {
  width: 100%;
  background: #238636;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
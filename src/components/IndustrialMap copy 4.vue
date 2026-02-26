<template>
  <div class="mobile-container">
    <div class="svg-wrapper">
      <svg viewBox="0 0 400 650" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
      <path d="M25 0 L50 14.4 L50 29 L25 43.4 L0 29 L0 14.4 Z" fill="none" stroke="#1e293b" stroke-width="1" />
    </pattern>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <rect width="400" height="650" fill="#020617" />
  <rect width="400" height="650" fill="url(#hexagons)" opacity="0.4" />

  <g filter="url(#glow)">
    <path d="M20 120 L200 10 L380 120 L380 620 L20 620 Z" fill="#0f172a" stroke="#60a5fa" stroke-width="2" opacity="0.9" />
  </g>

  <g transform="translate(45, 135)">
    <text y="0" fill="#94a3b8" font-family="sans-serif" font-size="10" font-weight="bold">SET POINT</text>
    <rect y="8" width="80" height="6" rx="3" fill="#1e293b" />
    <rect y="8" width="45" height="6" rx="3" fill="#3b82f6" />
    <circle cx="45" cy="11" r="7" fill="white" />

    <g transform="translate(105, -15)">
      <text x="30" y="15" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="10" font-weight="bold">VALVE</text>
      <path d="M10 25 L25 18 L25 32 Z M50 25 L35 18 L35 32 Z" fill="#3b82f6" />
      <rect x="25" y="22" width="10" height="6" fill="#3b82f6" />
      <rect x="65" y="18" width="45" height="28" rx="4" fill="black" />
      <text x="87.5" y="38" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="16" font-weight="bold">70%</text>
    </g>

    <g transform="translate(240, -15)">
      <rect width="90" height="50" rx="8" fill="#1e293b" stroke="#334155" />
      <rect x="10" y="10" width="30" height="30" rx="5" fill="#fbbf24" />
      <path d="M20 18 L28 25 L20 32 Z" fill="black" />
      <text x="45" y="30" fill="white" font-family="sans-serif" font-size="11" font-weight="bold">AUTO</text>
    </g>
  </g>

  <g transform="translate(40, 210)">
    <rect width="155" height="150" fill="#0f172a" rx="4" stroke="#1e293b" />
    <rect x="2" y="50" width="151" height="98" fill="#2563eb" rx="2" fill-opacity="0.8" />
    <text x="77" y="30" text-anchor="middle" fill="white" font-family="sans-serif" font-size="12">Lvl Danau</text>
    <rect x="27" y="45" width="100" height="30" rx="15" fill="black" stroke="#3b82f6" stroke-width="1.5" />
    <text x="77" y="66" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="16" font-weight="bold">220 cm</text>

    <g transform="translate(165, 0)">
      <rect width="155" height="150" fill="#0f172a" rx="4" stroke="#1e293b" />
      <rect x="2" y="90" width="151" height="58" fill="#0ea5e9" rx="2" fill-opacity="0.7" />
      <text x="77" y="30" text-anchor="middle" fill="white" font-family="sans-serif" font-size="12">Lvl Sungai</text>
      <rect x="27" y="45" width="100" height="30" rx="15" fill="black" stroke="#0ea5e9" stroke-width="1.5" />
      <text x="77" y="66" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="16" font-weight="bold">110 cm</text>
    </g>
  </g>

  <g transform="translate(45, 390)">
    <path d="M0 40 A35 35 0 0 1 70 40" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
    <path d="M0 40 A35 35 0 0 1 45 10" fill="none" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
    <text x="35" y="35" text-anchor="middle" fill="white" font-family="monospace" font-size="14" font-weight="bold">220V</text>
    <text x="35" y="55" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="9">VOLT</text>

    <g transform="translate(85, 0)">
      <path d="M0 40 A35 35 0 0 1 70 40" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      <path d="M0 40 A35 35 0 0 1 55 15" fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round"/>
      <text x="35" y="35" text-anchor="middle" fill="white" font-family="monospace" font-size="14" font-weight="bold">15A</text>
      <text x="35" y="55" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="9">AMPERE</text>
    </g>

    <g transform="translate(170, -10)">
      <text x="80" y="10" text-anchor="middle" fill="#ef4444" font-family="sans-serif" font-size="10" font-weight="bold">POWER CONSUMPTION</text>
      <rect y="20" width="160" height="45" rx="5" fill="black" stroke="#92400e" />
      <text x="80" y="48" text-anchor="middle" fill="#facc15" font-family="monospace" font-size="16" font-weight="bold">1000000 KWH</text>
    </g>
  </g>

  <g transform="translate(45, 520)">
    <g transform="translate(0, 0)">
      <path d="M0 25 L30 25 L30 10 L15 10 Z" fill="#475569" stroke="white" stroke-width="1" />
      <circle cx="15" cy="18" r="5" fill="#1e293b" stroke="white" />
      <text x="15" y="42" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="8">PUMP 1</text>
    </g>
    <g transform="translate(45, 0)">
      <path d="M0 25 L30 25 L30 10 L15 10 Z" fill="#475569" stroke="white" stroke-width="1" />
      <circle cx="15" cy="18" r="5" fill="#1e293b" stroke="white" />
      <text x="15" y="42" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="8">PUMP 2</text>
    </g>
    <g transform="translate(90, 0)">
      <path d="M0 25 L30 25 L30 10 L15 10 Z" fill="#475569" stroke="white" stroke-width="1" />
      <circle cx="15" cy="18" r="5" fill="#1e293b" stroke="white" />
      <text x="15" y="42" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="8">PUMP 3</text>
    </g>
    <g transform="translate(135, 0)">
      <path d="M0 25 L30 25 L30 10 L15 10 Z" fill="#475569" stroke="white" stroke-width="1" />
      <circle cx="15" cy="18" r="5" fill="#1e293b" stroke="white" />
      <text x="15" y="42" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="8">PUMP 4</text>
    </g>

    <g transform="translate(200, -10)">
      <rect width="60" height="50" rx="5" fill="#334155" stroke="#475569" />
      <text x="30" y="35" text-anchor="middle" font-size="20">⚡</text>
      <rect x="70" width="60" height="50" rx="5" fill="#334155" stroke="#475569" />
      <text x="100" y="35" text-anchor="middle" font-size="20">⚡</text>
    </g>
  </g>
</svg>
    </div>

    <div class="footer-panel">
      <div class="slider-group">
        <label>DANAU LEVEL</label>
        <input type="range" v-model="danauLevel" min="20" max="250">
      </div>
      <button class="start-btn">SYSTEM START</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const danauLevel = ref(220);
const sungaiLevel = ref(110);
const valveOpening = ref(70);
</script>

<style scoped>
.mobile-container {
  background: #020617;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
}

.svg-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
}

.main-svg {
  width: 100%;
  max-width: 420px;
  height: auto;
}

.footer-panel {
  background: #0f172a;
  padding: 20px;
  border-top: 2px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider-group label {
  display: block;
  color: #60a5fa;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
}

.start-btn {
  background: #059669;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 13px;
}

input[type="range"] {
  width: 150px;
  accent-color: #3b82f6;
}
</style>
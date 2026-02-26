<template>
  <div class="mobile-container">
    <div class="svg-wrapper">
      <svg viewBox="20 0 380 480" xmlns="http://www.w3.org/2000/svg" width="350px" height="480px" preserveAspectRatio="none">

  <defs>
    <!-- HEXAGON PATTERN (SHORT ROOF) -->
    <pattern
      id="hexagons"
      width="50"
      height="30"
      patternUnits="userSpaceOnUse"
      patternTransform="scale(0.5)"
    >
      <path
        d="
          M25 0
          L50 10
          L50 20
          L25 30
          L0 20
          L0 10
          Z
        "
        fill="none"
        stroke="#1e293b"
        stroke-width="1"
      />
    </pattern>

    <!-- SOFT GLOW -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

    <!-- BASE BACKGROUND -->
  <rect
    x="0"
    y="0"
    width="400"
    height="650"
    fill="#020617"
  />
  <!-- HEXAGON OVERLAY -->
  <rect
    x="0"
    y="0"
    width="400"
    height="650"
    fill="url(#hexagons)"
    opacity="0.35"
    filter="url(#glow)"
  />

  <g filter="url(#glow)">
    <path d="M20 80 L200 10 L380 80 L380 470 L20 470 Z" fill="#0f172a" stroke="#60a5fa" stroke-width="2" opacity="0.9" />
  </g>

  <g transform="translate(160, 40)">
      
      <rect width="80" height="30" rx="8" fill="#1e293b" stroke="#334155" />
      <rect x="10" y="5" width="20" height="20" rx="5" fill="#fbbf24" />
      <path d="M15 8 L23 15 L15 22 Z" fill="black" />
      <text x="35" y="20" fill="white" font-family="sans-serif" font-size="11" font-weight="bold">AUTO</text>
    
  </g>

  <g transform="translate(45,100)">
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

  

  <g transform="translate(30, 190)">

    <!-- <rect x="77" y="10" width="100" height="30" rx="15" fill="black" stroke="#0ea5e9" stroke-width="1.5" />
    <text x="77" y="10" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="16" font-weight="bold">Gate Valve</text> -->

    <rect width="170" height="180" fill="#2563eb" rx="4" stroke="#1e293b" />
    <rect x="2" y="0" width="165" height="170" fill="#0f172a" rx="2" fill-opacity="0.8" />
    <text x="77" y="60" text-anchor="middle" fill="white" font-family="sans-serif" font-size="12">Lvl Danau</text>
    <rect x="27" y="80" width="100" height="30" rx="15" fill="black" stroke="#3b82f6" stroke-width="1.5" />
    <text x="77" y="100" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="16" font-weight="bold">220 cm</text>

    <!-- <rect x="27" y="10" width="100" height="30" rx="15" fill="black" stroke="#3b82f6" stroke-width="1.5" /> -->
    <text x="170" y="-10" text-anchor="middle" fill="white" font-family="monospace" font-size="12" font-weight="bold">Control Valve</text>

    

    <g transform="translate(173, 0)">
      <rect width="170" height="180" fill="#0ea5e9" rx="4" stroke="#1e293b" />
      <rect x="2" y="0" width="165" height="170" fill="#0f172a" rx="2" fill-opacity="0.7" />
      <text x="95" y="60" text-anchor="middle" fill="white" font-family="sans-serif" font-size="12">Lvl Sungai</text>
      <rect x="45" y="80" width="100" height="30" rx="15" fill="black" stroke="#0ea5e9" stroke-width="1.5" />
      <text x="100" y="100" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="16" font-weight="bold">110 cm</text>
    </g>

    <!-- BUTTERFLY VALVE (VERTICAL PIPE) -->
    <g id="butterfly-valve-vertical" transform="translate(170,90)">

      <!-- Pipe Top -->
      <rect x="-12" y="-90" width="24" height="90" rx="4" fill="#334155" stroke="#ffffff" stroke-width="1.5"/>

      <!-- Pipe Bottom -->
      <rect x="-12" y="20" width="24" height="70" rx="4" fill="#334155" stroke="#ffffff" stroke-width="1.5"/>

      <!-- Valve Body -->
      <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>

      <!-- Butterfly Disc -->
      <rect
        x="-24"
        y="-3"
        width="48"
        height="6"
        rx="3"
        fill="#ef4444"
        transform="rotate(0)"
        transform-origin="center"
        style="transition: transform 0.4s ease, fill 0.4s ease"
      />

      <!-- Shaft -->
      <circle cx="0" cy="0" r="4" fill="#94a3b8"/>

      <!-- Percentage -->
      <text
        x="0"
        y="48"
        text-anchor="middle"
        fill="#facc15"
        font-size="12"
        font-weight="bold"
      >
        70%
      </text>

    </g>
  </g>

  <g transform="translate(40, 385)">
    <text y="8" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="bold">SET POINT</text>
    <rect y="20" width="100" height="6" rx="3" fill="#1e293b" />
    <rect y="20" width="50" height="6" rx="3" fill="#3b82f6" />
    <circle cx="50" cy="24" r="7" fill="white" />

    <!-- <rect x="85" y="0" width="45" height="20" rx="4" fill="yellow" />
      <text x="107.5" y="15" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="16" font-weight="bold">70%</text> -->

      <rect x="80" y="-5" width="50" height="18" rx="5" fill="black" stroke="#0ea5e9" stroke-width="1.5" />
      <text x="105" y="9" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="14" font-weight="bold">70%</text>

  </g>

  

  <g transform="translate(40, 420)">
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

    <g transform="translate(200, -9)">
      <rect width="35" height="35" rx="5" fill="#334155" stroke="#475569" />
      <text x="18" y="25" text-anchor="middle" font-size="20">⚡</text>
      <text x="20" y="50" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="8">Gen 01</text>
      <rect x="45" width="35" height="35" rx="5" fill="#334155" stroke="#475569" />
      <text x="64" y="25" text-anchor="middle" font-size="20">⚡</text>
      <text x="64" y="50" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="8">Gen 02</text>
      <rect x="90" width="35" height="35" rx="5" fill="#334155" stroke="#475569" />
      <text x="108" y="25" text-anchor="middle" font-size="20">⚡</text>
      <text x="108" y="50" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="8">Gen 03</text>
    </g>
  </g>
</svg>
    </div>

    <!-- <div class="footer-panel">
      <div class="slider-group">
        <label>DANAU LEVEL</label>
        <input type="range" v-model="danauLevel" min="20" max="250">
      </div>
      <button class="start-btn">SYSTEM START</button>
    </div> -->
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
  /* background: #020617; */
  background: #000000;
  min-height: 53vh;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
}

.svg-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
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
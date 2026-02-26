<template>
  <svg viewBox="0 0 120 100" width="80" height="70">
    <rect x="30" y="20" width="60" height="50" rx="5" fill="#334155" />
    <line x1="40" y1="20" x2="40" y2="70" stroke="#1e293b" stroke-width="2" />
    <line x1="55" y1="20" x2="55" y2="70" stroke="#1e293b" stroke-width="2" />
    <line x1="70" y1="20" x2="70" y2="70" stroke="#1e293b" stroke-width="2" />
    <rect x="90" y="40" width="20" height="10" fill="#94a3b8" />
    <g transform="translate(20, 45)" :class="{ 'rotating': isRunning }">
      <circle cx="0" cy="0" r="15" fill="#475569" />
      <rect x="-12" y="-2" width="24" height="4" fill="#cbd5e1" />
      <rect x="-2" y="-12" width="4" height="24" fill="#cbd5e1" />
    </g>
  </svg>
</template>

<script setup>
defineProps({ isRunning: Boolean });
</script>

<style scoped>
.rotating {
  animation: spin 1s linear infinite;
  transform-origin: 0 0; /* Pusat putaran di translate(20, 45) */
}
@keyframes spin {
  from { transform: translate(20, 45) rotate(0deg); }
  to { transform: translate(20, 45) rotate(360deg); }
}
</style>
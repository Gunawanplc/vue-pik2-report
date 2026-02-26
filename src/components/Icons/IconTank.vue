<template>
  <g :transform="`translate(${x}, ${y}) scale(${scale})`" class="tank-component">
    <rect x="0" y="0" width="60" height="100" rx="5" fill="none" stroke="#94a3b8" stroke-width="3" />
    
    <rect 
      x="3" 
      :y="100 - level" 
      width="54" 
      :height="level" 
      fill="#3b82f6" 
      style="transition: all 0.5s ease" 
    />

    <line x1="65" y1="0" x2="70" y2="0" stroke="#94a3b8" />
    <line x1="65" y1="50" x2="70" y2="50" stroke="#94a3b8" />
    <line x1="65" y1="100" x2="70" y2="100" stroke="#94a3b8" />
  </g>
</template>

<script setup>
defineProps({
  level: { type: Number, default: 50 },
  x: { type: Number, default: 0 },      // Posisi Horizontal
  y: { type: Number, default: 0 },      // Posisi Vertikal
  scale: { type: Number, default: 1 }   // Ukuran (1 = 100%)
});
</script>

<!-- <template>
  <svg viewBox="0 0 100 120" width="60" height="80">
    <rect x="20" y="10" width="60" height="100" rx="5" fill="none" stroke="#94a3b8" stroke-width="3" />
    <rect 
      x="23" 
      :y="110 - level" 
      width="54" 
      :height="level" 
      fill="#3b82f6" 
      style="transition: all 0.5s ease" 
    />
    <line x1="80" y1="10" x2="85" y2="10" stroke="#94a3b8" />
    <line x1="80" y1="60" x2="85" y2="60" stroke="#94a3b8" />
    <line x1="80" y1="110" x2="85" y2="110" stroke="#94a3b8" />
  </svg>
</template>

<script setup>
defineProps({ level: Number }); // 0 to 100
</script> -->
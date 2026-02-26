<template>
  <svg viewBox="0 0 100 100" width="50" height="50">
    <rect x="10" y="40" width="80" height="20" fill="#475569" />
    <path d="M35 30 L65 30 L50 50 Z" :fill="isOpen ? '#22c55e' : '#ef4444'" />
    <path d="M35 70 L65 70 L50 50 Z" :fill="isOpen ? '#22c55e' : '#ef4444'" />
    <circle cx="50" cy="50" r="15" fill="none" stroke="#94a3b8" stroke-width="4" />
  </svg>
</template>

<script setup>
defineProps({ isOpen: Boolean });
</script>
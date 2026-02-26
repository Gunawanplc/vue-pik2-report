<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useMqtt } from './services/mqtt'

const {
  connect,
  forceReconnect,
  disconnect,
  isConnected,
  lastMessage,
  logs
} = useMqtt()

const handleVisibility = () => {
  if (document.visibilityState === 'visible') {
    forceReconnect()
  }
}

onMounted(() => {
  connect()
  document.addEventListener('visibilitychange', handleVisibility)
  window.addEventListener('online', forceReconnect)
  window.addEventListener('offline', disconnect)
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
  window.removeEventListener('online', forceReconnect)
  window.removeEventListener('offline', disconnect)
})
</script>

<template>
  <div class="app">

    <!-- CONTENT -->
    <router-view />

    <!-- MQTT STATUS BAR (OPTIONAL) -->
    <div class="mqtt-status">
      <span
        :class="isConnected ? 'online' : 'offline'">
        {{ isConnected ? 'MQTT CONNECTED v1.3' : 'MQTT DISCONNECTED v1.3' }}
      </span>
    </div>

    <!-- 🔥 MQTT LOG PANEL -->
    <!-- <div class="mqtt-log">
      <div v-for="(log, i) in logs" :key="i">
        {{ log }}
      </div>
    </div> -->

    <!-- BOTTOM NAVIGATION -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/parameter" class="nav-item">Parameter</router-link>
      <router-link to="/setting" class="nav-item">Setting</router-link>
    </nav>

  </div>
</template>

<style>
.app {
  min-height: 83vh;
  padding-bottom: calc(96px + env(safe-area-inset-bottom));
}

/* MQTT STATUS */
.mqtt-status {
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  height: 40px;
  background: #f5f5f5;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
}

.online {
  color: green;
  font-weight: bold;
}

.offline {
  color: red;
  font-weight: bold;
}

/* BOTTOM NAV */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  background: #ffffff;
  border-top: 1px solid #ddd;
}

.nav-item {
  flex: 1;
  text-align: center;
  line-height: 56px;
  text-decoration: none;
  color: #666;
}

.router-link-active {
  color: #1976d2;
  font-weight: bold;
}

.mqtt-log {
  position: fixed;
  bottom: 96px;
  left: 0;
  right: 0;
  max-height: 160px;
  overflow-y: auto;
  background: #000;
  color: #0f0;
  font-size: 11px;
  padding: 6px;
  font-family: monospace;
}
</style>

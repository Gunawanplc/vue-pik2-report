<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
// import { useMqtt } from './services/mqtt'

// const {
//   connect,
//   forceReconnect,
//   disconnect,
//   isConnected,
//   lastMessage,
//   logs
// } = useMqtt()

// const handleVisibility = () => {
//   if (document.visibilityState === 'visible') {
//     forceReconnect()
//   }
// }

onMounted(() => {
  // connect()
  // document.addEventListener('visibilitychange', handleVisibility)
  // window.addEventListener('online', forceReconnect)
  // window.addEventListener('offline', disconnect)
})

onBeforeUnmount(() => {
  // document.removeEventListener('visibilitychange', handleVisibility)
  // window.removeEventListener('online', forceReconnect)
  // window.removeEventListener('offline', disconnect)
})
</script>

<template>
  <div class="app">

    <!-- CONTENT -->
    <router-view />
    
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


</style>

<script setup>
import { useMqtt } from '../services/mqtt'

const { lastMessage, isConnected } = useMqtt()

// Di dalam method atau setup Vue Anda
const handleExit = () => {
    if (window.Android && window.Android.exitApp) {
        window.Android.exitApp();
    } else {
        console.warn("Fungsi Android.exitApp tidak ditemukan (Mungkin sedang di Browser)");
        // Tambahkan fallback jika dibuka di chrome biasa
        if(confirm("Keluar dari halaman ini?")) {
            window.close();
        }
    }
};

</script>

<template>
  <div class="page">
    <h2>Home</h2>

    <p>Status:
      <b :style="{ color: isConnected ? 'green' : 'red' }">
        {{ isConnected ? 'CONNECTED' : 'DISCONNECTED' }}
      </b>
    </p>

    <div v-if="lastMessage">
      <p><b>Topic:</b> {{ lastMessage.topic }}</p>
      <p><b>Data:</b> {{ lastMessage.data }}</p>
    </div>

    <button @click="handleExit" class="btn-exit">
      EXIT APP
    </button>
  </div>
</template>

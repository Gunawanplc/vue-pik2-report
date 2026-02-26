import { ref, onMounted, onUnmounted } from "vue";

export function useWebSocket(url) {
  const data = ref(null);
  const socket = ref(null);
  const isConnected = ref(false);
  const reconnectInterval = 2000; // 2 detik
  let reconnectTimer = null;

  const connect = () => {
    console.log("🔄 Connecting to WebSocket:", url);
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log("✅ WebSocket Connected");
      isConnected.value = true;

      // stop reconnect timer kalau berhasil connect
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    socket.value.onmessage = (event) => {
      try {
        data.value = JSON.parse(event.data);
      } catch {
        data.value = event.data;
      }
    };

    socket.value.onclose = () => {
      console.log("❌ WebSocket Closed");
      isConnected.value = false;

      // Retry reconnect
      reconnectTimer = setTimeout(() => {
        console.warn("⏳ Reconnecting WebSocket...");
        connect();
      }, reconnectInterval);
    };

    socket.value.onerror = (err) => {
      console.error("⚠️ WebSocket Error:", err);
      // force close → akan trigger onclose → reconnect
      socket.value.close();
    };
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.onclose = null; // stop auto reconnect ketika leave halaman
      socket.value.close();
    }
    if (reconnectTimer) clearTimeout(reconnectTimer);
  });

  const sendMessage = (msg) => {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(msg));
    }
  };

  return { data, sendMessage, isConnected };
}
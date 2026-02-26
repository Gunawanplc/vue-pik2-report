import { ref } from "vue";

const sockets = new Map(); // <-- per URL hanya 1 socket instance

const WS_BASE_URL = "ws://192.168.100.64:1880";
// const WS_BASE_URL = "ws://127.0.0.1:1880";

export function useWebSocket(path) {
  const url = `${WS_BASE_URL}${path}`;

  if (sockets.has(url)) {
    return sockets.get(url); // kalau sudah ada websocket → pakai yg sama
  }

  const data = ref(null);
  const isConnected = ref(false);
  const socket = ref(null);
  let reconnectTimer = null;
  const reconnectDelay = 2000;

  const connect = () => {
    console.log("🔌 Connecting:", url);

    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log("✅ Connected:", url);
      isConnected.value = true;

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
      console.log("❌ Disconnected:", url);
      isConnected.value = false;

      reconnectTimer = setTimeout(() => {
        console.log("♻️ Reconnecting:", url);
        connect();
      }, reconnectDelay);
    };

    socket.value.onerror = () => {
      console.log("⚠️ Error → force reconnect");
      socket.value.close();
    };
  };

  // mulai koneksi
  connect();

  const sendMessage = (msg) => {
    if (socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(msg));
    }
  };

  const api = { data, isConnected, sendMessage };
  sockets.set(url, api);

  return api;
}

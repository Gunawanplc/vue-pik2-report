import mqtt from 'mqtt'
import { ref } from 'vue'

let client = null
let heartbeatTimer = null
let lastOpenTime
let lastCloseTime
const isConnected = ref(false)
const lastMessage = ref(null)

const logs = ref([])   // 👈 LOG STORE

function addLog(msg) {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${msg}`)

  // batasi jumlah log
  if (logs.value.length > 50) {
    logs.value.pop()
  }
}

export function useMqtt() {

  function connect() {
    if (client && client.connected) return

    const clientId = 'dashboard_user_' + Math.random().toString(16).substring(2, 10);

    client = mqtt.connect('wss://gfa7b90f.ala.asia-southeast1.emqxsl.com:8084/mqtt', {
      clientId: clientId,
      username: 'Gunaone',
      password: 'Gunaone123*',
      keepalive: 30,
      reconnectPeriod: 3000,
      connectTimeout: 4000,
      clean: true,
      // untuk mobile
      // keepalive: 20,
      // reconnectPeriod: 0,
      // keepalive: 0,          // 🔥 PENTING
      // reconnectPeriod: 0,    // ❌ jangan reconnect
      // connectTimeout: 4000
      // clean: true,
    })

    // wss://gfa7b90f.ala.asia-southeast1.emqxsl.com:8084/mqtt

    // wss://broker.hivemq.com:8884/mqtt
    // wss://mqtt.eclipseprojects.io:443/mqtt
    // wss://broker.emqx.io:8084/mqtt
    // wss://test.mosquitto.org:8081/mqtt
    // wss://ecb3e42f2534425cad2b77476a1d9435.s1.eu.hivemq.cloud:8884/mqtt

    // client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
    //   // keepalive: 20,
    //   // reconnectPeriod: 0,
    //   keepalive: 10,          // lebih agresif
    //   reconnectPeriod: 5000,  // lebih lambat
    //   clean: true,
    // })

    

    client.on('connect', () => {
      lastOpenTime = new Date()
      isConnected.value = true
      // client.subscribe('demo/vue/mqtt')
      client.subscribe('location/updates')
      addLog('MQTT CONNECTED at ' + lastOpenTime.toLocaleDateString("Fr-CA") +" "+lastOpenTime.toLocaleTimeString("Fr-fr"))
      // startHeartbeat()        // 🔑 TAMBAH
    })

    client.on('message', (topic, payload) => {
      try {
        lastMessage.value = {
          topic,
          data: JSON.parse(payload.toString()),
          time: new Date().toLocaleTimeString()
        }
      } catch {
        lastMessage.value = {
          topic,
          data: payload.toString(),
          time: new Date().toLocaleTimeString()
        }
      }
    })


    client.on('close', () => {
      lastCloseTime = new Date()
      isConnected.value = false
      addLog('MQTT CLOSED at ' + lastCloseTime.toLocaleDateString("Fr-CA") +" "+ lastCloseTime.toLocaleTimeString("Fr-fr"))
      // stopHeartbeat()         // 🔑 TAMBAH
    })

    client.on('error', () => {
      // isConnected.value = false
      addLog('MQTT ERROR')
      // startHeartbeat()        // 🔑 TAMBAH
    })
  }

  function forceReconnect() {
    if (isConnected.value) return 
    if (!navigator.onLine) {
      addLog('Reconnect skipped (offline)')
      return
    }

     addLog('Force reconnect...')

    if (Date.now() - lastCloseTime < 3000) {
      addLog('Reconnect delayed (broker cooldown)')
      return
    }

    if (client) {
      client.end(true)
      client = null
    }

    setTimeout(connect, 4000)
  }

  function disconnect() {
    if (client) {
      client.end(true)
      client = null
      isConnected.value = false
    }
  }

  

  function startHeartbeat() {
    stopHeartbeat()

    heartbeatTimer = setInterval(() => {
      if (!client || !client.connected) {
        forceReconnect()
        return
      }
      // client.publish('ping/mobile', '1')
      // publish ringan
    }, 15000)
  }

  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  return {
    connect,
    forceReconnect,
    disconnect,
    isConnected,
    lastMessage,
    logs          // 👈 expose logs
  }
}




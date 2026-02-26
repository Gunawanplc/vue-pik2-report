<script setup>
import { useMqtt } from '../services/mqtt'

const { lastMessage, isConnected } = useMqtt()

// import { useWebSocket } from "../components/WebSocket/GlobalWebSocket.js";
// const { data, isConnected, sendMessage } = useWebSocket("/ws/mainPIkReport");

import { ref, reactive, toRef, toRefs, onMounted,onBeforeUnmount, onUnmounted, onUpdated, computed, watch,nextTick  } from "vue";

import PikDailyReportTabulator from '../components/Parameter/PikDailyReportTabulator.vue';


const charts = ref([]); 

watch(isConnected, (newStatus) => {
  console.log("WebSocket status:", newStatus);
});


// =============================
// STATE
// =============================
const rows = ref([]);
const beginDate = ref("");
const endDate = ref("");
const station = ref("");
const pump = ref("");

const tableRef = ref(null); // untuk akses child method

// Watch data dari WebSocket
  watch(
    lastMessage,
    (wsPayload) => {
      if (!wsPayload) return;

      console.log("WS PAYLOAD:", wsPayload);

      // // Jika data berupa array langsung
      // if (Array.isArray(wsPayload)) {
      //   rows.value = [...wsPayload]; // replace full data
      // }

      // // Jika backend kirim dalam format { data: [...] }
      // else if (wsPayload.data && Array.isArray(wsPayload.data)) {
      //   rows.value = [...wsPayload.data];
      // }
    },
    { immediate: true }
  );


  // =============================
// FILTER BUTTON
// =============================
// function getData() {
//   const payload = {
//     action: "getPumpReport",
//     begin: beginDate.value,
//     end: endDate.value,
//     station: station.value
//   };

//   publish(payload);
// }

function getData() {
  const payload = {
    action: "getPumpReport",
    begin: beginDate.value,
    end: endDate.value,
    station: station.value,
    pump: pump.value // Tambahkan pump jika diperlukan oleh backend
  };

  // Di MQTT, kita 'publish' ke topik tertentu.
  // Pastikan service mqtt Anda punya fungsi publish(topic, message)
  // Contoh jika topiknya adalah 'request/report':
  if (isConnected.value) {
    publish("request/report", JSON.stringify(payload));
  } else {
    alert("MQTT not connected!");
  }
}

// =============================
// EXPORT
// =============================
function exportCSV() {
  tableRef.value?.downloadCSV();
}

function exportPDF() {
  tableRef.value?.downloadPDF();
}

  onMounted(() => {

  });

  onBeforeUnmount(() => {
    
  });

</script>

  <template>
    <div class="page container-fluid">

      <div class="d-flex align-bottom">
        <h4 class="mb-3">Water Gate Report - </h4> &nbsp
        <span><h6 class="mb-3 pt-2">Status : <b :style="{ color: isConnected ? 'green' : 'red' }">
          {{ isConnected ? "CONNECTED" : "DISCONNECTED" }}
         </b></h6></span>
      </div>
      <!-- FILTER CARD -->
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <div class="row g-2 align-items-end">

            <!-- Begin Date -->
            <div class="col-md-2">
              <label class="form-label fw-bold">Begin Date</label>
              <input type="datetime-local"
                    v-model="beginDate"
                    class="form-control form-control-sm"/>
            </div>

            <!-- End Date -->
            <div class="col-md-2">
              <label class="form-label fw-bold">End Date</label>
              <input type="datetime-local"
                    v-model="endDate"
                    class="form-control form-control-sm"/>
            </div>




            <!-- Buttons -->
            <div class="col-md-4">
              <button class="btn btn-primary btn-sm me-2"
                      @click="getData">
                Get Data
              </button>

              <button class="btn btn-success btn-sm me-2"
                      @click="exportCSV">
                Export CSV
              </button>

              <button class="btn btn-danger btn-sm"
                      @click="exportPDF">
                Export PDF
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- STATUS -->
      <p>
        Status:
        <b :style="{ color: isConnected ? 'green' : 'red' }">
          {{ isConnected ? "CONNECTED" : "DISCONNECTED" }}
        </b>
      </p>

      <!-- TABLE -->
      <PikDailyReportTabulator
        ref="tableRef"
        :rows="rows"
      />

    </div>
  </template>


  <style>

  /* Semua input dalam modal */
  .form-control {
    font-size: 12px;             /* kecilin font */
    font-family: "Segoe UI", Arial, sans-serif;
    border-radius: 0;            /* sudut kotak rata, biar nyatu sama label */
    box-shadow: none;            /* hilangkan shadow default */
  }

  /* Saat focus */
  .form-control:focus {
    border-color: #007bff;       /* warna border pas focus */
    box-shadow: 0 0 0 0.1rem rgba(0,123,255,.25);
  }

  .input-group-text
  {
    font-size: 12px;
    font-weight: bold;
    font-family: "Segoe UI", Arial, sans-serif;
    min-width: 120px; /* biar semua label seragam */
    width: 100%;
  }

  /* Samakan tinggi dengan .form-control-sm (32px) */
  :deep(.vue-select) {
    min-height: 32px;
    height: 32px;
    font-size: 12px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  /* bagian dalam wrapper */
  :deep(.vue-select .vs__dropdown-toggle) {
    /* min-height: 32px;
    height: 32px;
    padding: 0 6px; */
    min-height: calc(1.5em + .5rem + 2px); /* tinggi form-control-sm */
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  /* Biar border merah ngepas */
  .custom-vselect.is-invalid .vs__dropdown-toggle {
    border: 1px solid #dc3545; /* warna merah bootstrap */
  }

  /* text input/placeholder */
  :deep(.vue-select .vs__selected),
  :deep(.vue-select .vs__search) {
    line-height: 32px;
    font-size: 12px;
    padding: 0;
    margin: 0;
  }

  /* caret dan clear button */
  :deep(.vue-select .vs__actions) {
    height: 32px;
    display: flex;
    align-items: center;
  }

  .custom-vselect .vs__search::placeholder {
    font-size: 12px;
    color: #bbb;
  }

  .custom-inpselect::placeholder {
    font-size: 12px;   /* font placeholder lebih kecil */
    color: #bbb;       /* warna placeholder */
    font-style: italic; /* bisa ditambah style lain */
  }
  .popup-card {
    position: absolute;
    background: white;
    z-index: 2000;
    border-radius: 0.25rem;
  }


  </style>

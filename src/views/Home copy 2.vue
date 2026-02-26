<script setup>
// import { useMqtt } from '../services/mqtt'

import { useWebSocket } from "../components/WebSocket/GlobalWebSocket.js";
import { ref, reactive, toRef, toRefs, onMounted,onBeforeUnmount, onUnmounted, onUpdated, computed, watch,nextTick  } from "vue";

import HighChartSBRunTrade from '../components/Home/HighChartSBRunTrade.vue';

const { data, isConnected, sendMessage } = useWebSocket("/ws/mainService");

const charts = ref([]); 

watch(isConnected, (newStatus) => {
  console.log("WebSocket status:", newStatus);
});

const categories = ref([]);

const series = ref([]);


  watch(
  data,
  (wsPayload) => {
      if (!wsPayload) return;
      // console.log(wsPayload)
      // Gunakan spread operator atau map untuk memastikan array 'charts' mendapatkan referensi baru
      charts.value = [...mapWsToGroupCharts(wsPayload)];
      // console.log(charts.value)
    },
    { deep: true, immediate: true } // Tambahkan immediate: true
  );

  function mapWsToGroupCharts(wsData) {
    if (!wsData) return [];

    return Object.keys(wsData)
      .filter(k => k.startsWith("Chart"))
      .map(key => {
        const arr = wsData[key];
        if (!arr || arr.length < 2) return null;

        const oldData = arr[0];
        const newData = arr[1];

        let newlot = newData.offer.volume || []
        let oldlot = oldData.offer.volume || []

        if (Number(newData.offer.volume) != newData.offer.volume)
        {oldlot  = Number(oldData.offer.volume) || 0}
        
        let newOrderbook = newData.offerlist
        let oldOrderbook = oldData.offerlist

        let deltaOrderbook = newOrderbook.map((item, index) => {
          let old = oldOrderbook[index] || { price: 0, volume: 0, que_num: 0 }
          let price,volume,que_num

          if(item.price != old.price){price = item.price - old.price} else {price = 0}
          if(item.volume != old.volume){volume = item.volume - old.volume} else {volume = 0}
          if(item.que_num != old.que_num){que_num = item.que_num - old.que_num} else {que_num = 0}

          return {
            price: price,
            volume: volume,
            que_num: que_num
          }
        })

        let kategory = newData.change + " --> "+ newData.lastprice + `<br><div style="font-size:8px;font-weight:normal;color:black;">@:`+ newData.time+"</div>";
        let elapsed = Math.floor((new Date(newData.time) - new Date(newData.starttime))/60000)
        let hours = Math.floor(elapsed / 60)
        let minutes = elapsed % 60
        let ET = `${hours}:${minutes.toString().padStart(2, '0')}`
        let DeltaFNet = (newData.fnet - oldData.fnet).toString()
        let FNet = newData.fnet
        let speed = 0;

        let newBuy  = Number(newData?.RunTread?.datafilter[0]?.buy_lot)  || 0;
        let oldBuy = Number(newData?.RunTread?.datafilter1[0]?.buy_lot) || 0;
        // if (Number(oldData?.RunTread?.datafilter[0]?.buy_lot) != newBuy)
        // {oldBuy  = Number(oldData?.RunTread?.datafilter[0]?.buy_lot) || 0}
        

        let newSell = Number(newData?.RunTread?.datafilter[0]?.sell_lot)  || 0;
        let oldSell = Number(newData?.RunTread?.datafilter1[0]?.sell_lot) || 0;
        // if (Number(oldData?.RunTread?.datafilter[0]?.buy_lot) != newSell)
        // {oldSell = Number(oldData?.RunTread?.datafilter[0]?.sell_lot) || 0}

        let deltaBuy  = newBuy  - oldBuy;
        let deltaSell = newSell - oldSell;

        // let buyTrend  = deltaBuy >= 0 ? '▲' : '▼';
        // let sellTrend = deltaSell >= 0 ? '▲' : '▼';

        let rtbuy  = `${oldBuy} // ${newBuy}`;
        let rtsell = `${oldSell} // ${newSell}`;

        // let rtbuy = parseInt(newData?.RunTread?.datafilter[0]?.buy_lot||0) +"||"+ parseInt(oldData?.RunTread?.datafilter1[0]?.buy_lot||0) +"||" + parseInt(newData?.RunTread?.datafilter[0]?.buy_lot||0) - parseInt(oldData?.RunTread?.datafilter1[0]?.buy_lot||0)
        // let rtsell = parseInt(newData?.RunTread?.datafilter[0]?.sell_lot||0) +"||"+ parseInt(oldData?.RunTread?.datafilter1[0]?.sell_lot||0) +"||" + parseInt(newData?.RunTread?.datafilter[0]?.sell_lot||0) - parseInt(oldData?.RunTread?.datafilter1[0]?.sell_lot||0)

        if (elapsed > 0){
          speed = parseInt((newData.startlot - newData.offer.volume)/elapsed)
          // speed = newData.offer.volume
        }



        return {
          title: newData.icon,
          symbol: newData.symbol,
          categories: [kategory], // 1 kategori saja
          series: [

            // 🔵 ASK Bottom (overlap kiri)
            {
              name: "ASK Bottom",
              data: [newData.startlot],
              color: "#000000",
              pointPlacement: -0.5,
              pointWidth: 10,
              zIndex: 0,
              dataLabels: {
                enabled: false,
                
                align: 'low',   // low | middle | high
                
                y: -100,           // (-) naik, (+) turun
                x: -20,
                style: {
                  fontWeight: 'bold',
                  fontSize: '11px'
                }
              }
            },

            // 🔵 ASK Bottom (overlap kiri)
            {
              name: "ASK Bottom",
              data: [oldData.offer.volume],
              color: "#0068FA",
              pointPlacement: -0.3,
              pointWidth: 30,
              zIndex: 1
            },

            // 🟢 ASK Top (OVERLAP dengan ASK Bottom)
            {
              name: "ASK Top",
              data: [newData.offer.volume],
              color: "#00AEEF",
              pointPlacement: -0.3, // ⬅️ SAMA
              pointWidth: 15,
              zIndex: 2
            },

            // 🟩 BUY (tengah-kanan)
            {
              name: "BUY",
              data: [newData?.RunTread?.dataRT?.buy_lot],
              color: "#32B553",
              pointPlacement: 0.06,
              pointWidth: 20,
              zIndex: 3
            },
            // 🟩 BUY (tengah-kanan)
            {
              name: "RT_BUY",
              data: [newData?.RunTread?.datafilter[0]?.buy_lot],
              color: "#99FF00",
              pointPlacement: 0.06,
              pointWidth: 10,
              zIndex: 4
            },

            // 🟥 SELL (kanan)
            {
              name: "SELL",
              data: [newData?.RunTread?.dataRT?.sell_lot],
              color: "#EE1C25",
              pointPlacement: 0.35,
              pointWidth: 20,
              zIndex: 1
            },
            // 🟥 SELL (kanan)
            {
              name: "RT_SELL",
              data: [newData?.RunTread?.datafilter[0]?.sell_lot],
              color: "#FF0000",
              pointPlacement: 0.35,
              pointWidth: 10,
              zIndex: 2
            }
          ],
          info: {
            rtbuy: rtbuy || '',
            rtsell: rtsell || '',
            deltaBuy: deltaBuy || '',
            deltaSell: deltaSell || '',
            newOrderbook : newOrderbook || [],
            oldOrderbook : oldOrderbook || [],
            deltaOrderbook : deltaOrderbook || [],
            time: newData.time || new Date(),
            prize: newData.lastprice || 10,
            change: newData.change || 10,
            startlot: newData.startlot || 0,
            starttime: newData.starttime || '',
            startprice: newData.startprice || 0,
            support: newData.support || 10,
            fNet: FNet || '',
            deltafNet: DeltaFNet || '',
            elapsed: ET || '0',
            speed:speed||'0'
          },

        };

      })
      .filter(Boolean);
  }



  onMounted(() => {
   
  });

  onBeforeUnmount(() => {
    
  });

</script>

<template>
  <div class="page">
    <h2>Home</h2>

    <p>Status:
      <b :style="{ color: isConnected ? 'green' : 'red' }">
        {{ isConnected ? 'CONNECTED' : 'DISCONNECTED' }}
      </b>
    </p>

    <div class="chart-grid">
      <HighChartSBRunTrade
        v-for="chart in charts"
        :key="chart.symbol"
        :categories="chart.categories"
        :series="chart.series"
        :title="chart.symbol "
        :info="chart.info"
      />
    </div>

  </div>
</template>



<style>

.chart-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
}

/* @media (max-width: 1600px) {
  .chart-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 1200px) {
  .chart-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .chart-grid {
    grid-template-columns: repeat(2, 1fr);
  }
} */
</style>

<script setup>

import { computed,watch, ref } from "vue";

  const props = defineProps({
    categories: Array,
    series: Array,
    title: String,
    info: {
      type: Object,
      default: () => ({ rtsell: '',deltaSell: '',rtbuy: '',deltaBuy: ''
                      ,newOrderbook: [],oldOrderbook: [],deltaOrderbook: ''
                      ,time: 0,prize: 0, change: 0
                      ,startprice: 0,startlot: 0,starttime: '', support: 0, fNet: 0,deltafNet: 0, elapsed: '0',speed: 0 })
    }
  });



  const chartOptions = computed(() => ({
    chart: { 
      type: "column",
      height: "250px", // Mengatur tinggi tetap agar grid terlihat rapi
      spacingBottom: 5,
    }, 

    exporting: {
        enabled: true
      },

    
    title: { 
      // Menggunakan template string untuk menggabungkan logo dan teks
      text: `
        <div style="display: flex; align-items: center; justify-content: left; gap: 5px;margin-top:0px">
          <img src="https://assets.stockbit.com/logos/companies/${props.title}.png" 
              style="width: 20px; height: 20px; border-radius: 50%;" 
              onerror="this.style.display='none'"/> 
              <span><b>${props.title}</b></span>
              
        </div>
        <br>
        <div style="margin-top:-18px;font-size:9px;color:blue">
          <span>Start : ${props.info.starttime}</span><br>
          <span>Prize : ${props.info.startprice} &nbsp &nbsp Lot : ${props.info.startlot}</span>
        </div>
      `,
      useHTML: true, // ⬅️ WAJIB agar tag img berfungsi
      style: { 
        fontSize: '14px', 
        fontWeight: 'bold' 
      }
    },

    legend: {
      enabled: false
    },

    xAxis: {
      categories: props.categories,
      labels: {
        useHTML: true,
        formatter() {
          // contoh value: "7200/50\n2026-01-01 18:09:00"
          const text = String(this.value);
          const text01 = (String(this.value).split("-->")[0]);
          // ambil angka setelah slash
          // const match = text01.match(/\/(-?\d+)/);
          const diff = text01 ? Number(text01) : 0;
          // text = diff;
          const isUp = diff >= 0;
          const arrow = isUp ? '▲' : '▼';
          const color = isUp ? '#16a34a' : '#dc2626'; // green / red

          return `
            <span style="color:${color}; font-weight:bold">
              ${arrow} </span> <span style="color:Black; font-weight:bold"> ${text} </span>
            `;
        },
        y: 15
      }

    },

    yAxis: {
      title: {
        text: '',
        align: 'middle',   // low | middle | high
        rotation: 0,     // 0 = horizontal, -90 default
        x: 0,            // geser kiri/kanan
        y: -10           // geser atas/bawah
      }
    },

    credits: {
      enabled: false   // ⬅️ watermark hilang
    },

    plotOptions: {

      column: {
          grouping: false,   // ⬅️ PENTING
          borderWidth: 1,
          dataLabels: {
          enabled: true,
              style: {
                  fontSize: '10px',
                  textOutline: 'none'
              }
          }
      }
    },

    series: props.series
  }));

  const lastDeltaVolume = ref([])
  const lastDeltaPrice = ref([])
  const lastOldPrice = ref([])

  watch(
    () => props.info.deltaOrderbook,
    (newVal) => {
      if (!newVal) return
      console.log(newVal)
      newVal.forEach((item, i) => {
        const v = (item.volume || 0) / 100
        if (v !== 0) lastDeltaVolume.value[i] = v

        const vprice = (item.price || 0)
        if (vprice !== 0) 
        {lastDeltaPrice.value[i] = vprice;
          // lastOldPrice.value[i] = props.info.oldOrderbook[i].price
        }
        else{
          // lastOldPrice.value[i] = props.info.oldOrderbook[i].price - lastDeltaPrice.value[i]
        }
        
        // console.log(item.price)
      })
    },
    {immediate: true }
  )

 

</script>

<template>
    <div class="chart-container" style="padding:0px; background-color: transparent;max-width: 180px;">
      <highcharts :options="chartOptions" :updateArgs="[true, true]" />
      
      <div class="info-card" style="margin-top: 0px;">
        <div class="info-row"><span>Δ Price:</span> 
          <b v-if="lastDeltaPrice[0]>0" style="color:greenyellow; font-weight:bold"> ▲ <b style="color:Black; font-weight:bold">{{ lastDeltaPrice[0] }}</b></b>
          <b v-else-if="lastDeltaPrice[0]<0" style="color:red; font-weight:bold"> ▼ <b style="color:Black; font-weight:bold">{{lastDeltaPrice[0]}}</b></b>

          <!-- <b v-else-if="lastDeltaPrice[0]==0" style="color:black; font-weight:bold"> ▼ <b style="color:Black; font-weight:bold">{{lastDeltaPrice[0]}}</b></b> -->

          <b v-if="info.deltaOrderbook[0].price==0" style="color:black; font-weight:bold">{{info.oldOrderbook[0].price - lastDeltaPrice[0]}}</b>
          <!-- <b v-else-if="info.oldOrderbook[0].price<0" style="color:black; font-weight:bold">{{info.oldOrderbook[0].price}}</b> -->
          <!-- <b v-else style="color:black; font-weight:bold">{{info.oldOrderbook[0].price}}</b>lastOldPrice -->

          <!-- <b style="color:black; font-weight:bold">{{lastOldPrice[0]}}</b> -->

          
          // <b>{{info.newOrderbook[0].price }}</b></div>
        <div class="info-row"><span>Δ Buy:</span> <b style="min-width:70px">{{ info.rtbuy }}</b><span :style="{ color: info.deltaBuy < 0 ? 'red' : 'green' }">{{info.deltaBuy}}</span></div>
        <div class="info-row"><span>Δ Sell:</span> <span style="min-width:70px">{{ info.rtsell }}</span><span :style="{ color: info.deltaSell < 0 ? 'red' : 'green' }">{{info.deltaSell}}</span></div>
        <!-- <div class="info-row"><span>Support:</span> <b>{{ info.support }}</b></div> -->
        <!-- <div class="info-row"><span :style="{ color: info.fNet < 0 ? 'red' : 'black' }">Δ fNet:</span> <b>{{ info.deltafNet }}</b></div> -->
        <div class="info-row"><span>ET:</span> <b>{{ info.elapsed }}</b></div>
        <div class="info-row"><span>Lot Avg:</span> <b>{{ info.speed }} Lot / Min</b></div>
        <hr style="padding: 1px ;margin-top: 0px;margin-bottom: 3px">
        <div class="info-row"><span>Buy Order in Δ Lot:</span></div>

        <div><span>1</span> <b>{{ info.newOrderbook[0].price }} @{{ info.newOrderbook[0].volume/100 }}</b>
          <b v-if="(info.deltaOrderbook[0].volume/100)>0" style="color:greenyellow; font-weight:bold"> ▲ </b> 
          <b v-else-if="(info.deltaOrderbook[0].volume/100)<0" style="color:red; font-weight:bold"> ▼ </b>
          <b v-else="(info.deltaOrderbook[0].volume/100)==0" style="color:black; font-weight:bold"> # </b>

          <b v-if="(lastDeltaVolume[0])>0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[0] }}</b>
          <b v-if="(lastDeltaVolume[0])<0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[0] }}</b></div>

        <div><span>2</span> <b>{{ info.newOrderbook[1].price }} @{{ info.newOrderbook[1].volume/100 }}</b>
          <b v-if="(info.deltaOrderbook[1].volume/100)>0" style="color:greenyellow; font-weight:bold"> ▲ </b> 
          <b v-else-if="(info.deltaOrderbook[1].volume/100)<0" style="color:red; font-weight:bold"> ▼ </b>
          <b v-else="(info.deltaOrderbook[1].volume/100)==0" style="color:black; font-weight:bold"> # </b>

          <b v-if="(lastDeltaVolume[1])>0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[1] }}</b>
          <b v-if="(lastDeltaVolume[1])<0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[1] }}</b></div>

        <div><span>3</span> <b>{{ info.newOrderbook[2].price }} @{{ info.newOrderbook[2].volume/100 }}</b>
          <b v-if="(info.deltaOrderbook[2].volume/100)>0" style="color:greenyellow; font-weight:bold"> ▲ </b> 
          <b v-else-if="(info.deltaOrderbook[2].volume/100)<0" style="color:red; font-weight:bold"> ▼ </b>
          <b v-else="(info.deltaOrderbook[2].volume/100)==0" style="color:black; font-weight:bold"> # </b>

          <b v-if="(lastDeltaVolume[2])>0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[2] }}</b>
          <b v-if="(lastDeltaVolume[2])<0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[2] }}</b></div>

        <div><span>4</span> <b>{{ info.newOrderbook[3].price }} @{{ info.newOrderbook[3].volume/100 }}</b>
          <b v-if="(info.deltaOrderbook[3].volume/100)>0" style="color:greenyellow; font-weight:bold"> ▲ </b> 
          <b v-else-if="(info.deltaOrderbook[3].volume/100)<0" style="color:red; font-weight:bold"> ▼ </b>
          <b v-else="(info.deltaOrderbook[3].volume/100)==0" style="color:black; font-weight:bold"> # </b>

          <b v-if="(lastDeltaVolume[3])>0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[3] }}</b>
          <b v-if="(lastDeltaVolume[3])<0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[3] }}</b></div>

        <div><span>5</span> <b>{{ info.newOrderbook[4].price }} @{{ info.newOrderbook[4].volume/100 }}</b>
          <b v-if="(info.deltaOrderbook[4].volume/100)>0" style="color:greenyellow; font-weight:bold"> ▲ </b> 
          <b v-else-if="(info.deltaOrderbook[4].volume/100)<0" style="color:red; font-weight:bold"> ▼ </b>
          <b v-else="(info.deltaOrderbook[4].volume/100)==0" style="color:black; font-weight:bold"> # </b>

          <b v-if="(lastDeltaVolume[4])>0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[4] }}</b>
          <b v-if="(lastDeltaVolume[4])<0" style="color:Black; font-weight:bold">{{ lastDeltaVolume[4] }}</b></div>

      </div>
    </div>
  </template>

<style scoped>
.chart-container {
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
}

.info-card {
  margin-top: 10px;
  padding: 8px;
  border: 2px solid #000;
  border-radius: 15px;
  font-family: sans-serif;
  font-size: 11px;
  line-height: 1.4;
}

.info-row {
  display: flex;
  justify-content: flex-start;
  gap: 5px;
}

.info-row span {
  font-weight: bold;
  min-width: 45px;
}
</style>
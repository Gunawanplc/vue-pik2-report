<script setup>

import { computed,watch, ref } from "vue";

  const props = defineProps({
    categories: Array,
    series: Array,
    title: String,
    info: {
      type: Object,
      default: () => ({ old_time: '',old_change: '',old_price: '',new_time: '',new_change: '',new_price: ''
                       })
    }
  });



  const chartOptions = computed(() => ({
    chart: { 
      type: "column",
      height: "200px", // Mengatur tinggi tetap agar grid terlihat rapi
      spacingBottom: 5,
    }, 

    exporting: {
        enabled: true
      },

    
    title: { 
      // Menggunakan template string untuk menggabungkan logo dan teks
      // <br>
      //   <div style="margin-top:-18px;font-size:9px;color:blue">
      //     <span>Start : ${props.info.starttime}</span><br>
      //     <span>Prize : ${props.info.startprice} &nbsp &nbsp Lot : ${props.info.startlot}</span>
      //   </div>
      text: `
        <div style="display: flex; align-items: center; justify-content: left; gap: 5px;margin-top:0px">
          <img src="https://assets.stockbit.com/logos/companies/${props.title}.png" 
              style="width: 20px; height: 20px; border-radius: 50%;" 
              onerror="this.style.display='none'"/> 
              <span><b>${props.title}</b></span>
              
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
            <span font-weight:bold">
              range: </span> <span style="color:Black; font-weight:bold"> ${text} </span>
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

  // watch(
  //   () => props.info.deltaOrderbook,
  //   (newVal) => {
  //     if (!newVal) return

  //     newVal.forEach((item, i) => {
  //       const v = (item.volume || 0) / 100
  //       if (v !== 0) lastDeltaVolume.value[i] = v

  //       const vprice = (item.price || 0)
  //       if (vprice !== 0) 
  //       {lastDeltaPrice.value[i] = vprice;
  //         // lastOldPrice.value[i] = props.info.oldOrderbook[i].price
  //       }
  //       else{
  //         // lastOldPrice.value[i] = props.info.oldOrderbook[i].price - lastDeltaPrice.value[i]
  //       }
        
  //       // console.log(item.price)
  //     })
  //   },
  //   {immediate: true }
  // )

 

</script>

<template>
    <div class="chart-container" style="padding:0px; background-color: transparent;max-width: 180px;">
      <highcharts :options="chartOptions" :updateArgs="[true, true]" />
      
      <div class="info-card" style="margin-top: 0px;">
        <div class="info-row"><span>time:</span> <b style="min-width:70px">{{ info.new_time }}</b></div>
        <div class="info-row"><span>new Price:</span> 
          <b v-if="info.new_change>0" style="color:greenyellow; font-weight:bold"> ▲ <b style="color:Black; font-weight:bold">{{ info.new_change }}</b></b>
          <b v-else-if="info.new_change<0" style="color:red; font-weight:bold"> ▼ <b style="color:Black; font-weight:bold">{{info.new_change}}</b></b>
          <b>{{info.new_price }}</b>
        </div>
        <div class="info-row"><span>old Price:</span> 
          <b v-if="info.old_change>0" style="color:greenyellow; font-weight:bold"> ▲ <b style="color:Black; font-weight:bold">{{ info.old_change }}</b></b>
          <b v-else-if="info.old_change<0" style="color:red; font-weight:bold"> ▼ <b style="color:Black; font-weight:bold">{{info.old_change}}</b></b>
          <b>{{info.old_price }}</b>
          
        </div>
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
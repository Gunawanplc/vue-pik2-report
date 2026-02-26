

<template>
    <v-chart class="chart" :option="option" autoresize />
  </template>
  
  <script setup>
  import { ref } from 'vue'
  

  const option = {
    title: {
        text: 'ASK Overlap (Bukan Stack), BUY & SELL Terpisah',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
    },
    legend: {
        bottom: 0,
        data: ['ASK Top', 'ASK Bottom', 'BUY', 'SELL']
    },
    grid: {
        left: '5%',
        right: '5%',
        top: 60,
        bottom: 80,
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: [
        'Grup 1','Grup 2','Grup 3','Grup 4','Grup 5'
        ]
    },
    yAxis: {
        type: 'value'
    },

    
    series: [
    {
    name: 'ASK Bottom',
    type: 'bar',
    stack: 'ASK',          // ⬅️ hanya overlap dengan ASK Top
    data: [500, 3000, 1000, 500, 3000],
    barWidth: 28,
    itemStyle: 
        {
        color: '#7cb5ec',
        borderColor: '#2f2f2f',
        borderWidth: 2
        },
    label: { show: true, position: 'top' }
    },

    {
        name: 'ASK Top',
        type: 'custom',
        z: 20,

        renderItem(params, api) {
            const categoryIndex = api.value(0)
            const yValue = api.value(1)

            const base = api.coord([categoryIndex, yValue])

            const BAR_WIDTH = 22
            const BAR_INDEX = 0     // ASK Bottom
            const TOTAL_BAR = 3

            const x =
            base[0] -
            ((TOTAL_BAR - 1) / 2 - BAR_INDEX) * BAR_WIDTH

            return {
            type: 'path',
            shape: {
                pathData: 'M0 12 L10 0 L20 12 Z',
                x: x - 10,
                y: base[1] - 16,
                width: 20,
                height: 12
            },
            // style: {
            //     fill: '#b6ff1a'
            // }
            style: 
                {
                fill: '#90ed7d',
                borderColor: '#2f2f2f',
                borderWidth: 2
                },
            }
        },

        data: [
            [0, 500],
            [1, 3000],
            [2, 1000],
            [3, 500],
            [4, 3000]
        ]
    },

    {
    name: 'BUY',
    type: 'bar',
    data: [2500,2500,2500,2500,2500],
    barWidth: 28,

    itemStyle: 
        {
        color: '#2ecc71',
        borderColor: '#2f2f2f',
        borderWidth: 2
        },
    },

    {
    name: 'SELL',
    type: 'bar',
    data: [1750,1750,1750,1750,1750],
    barWidth: 28,
    // itemStyle: { color: '#e74c3c' },
    itemStyle: 
        {
        color: '#f45b5b',
        borderColor: '#2f2f2f',
        borderWidth: 2
        },
    label: { show: true, position: 'top' }
    }

]

    }

  </script>
  
  <style>
  .chart {
    height: 450px;
  }
  </style>
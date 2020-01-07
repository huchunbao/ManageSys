<template>
  <div
    :id="id"
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    chartData: {
      type: Number,
      default: 80
    }
  },
  data() {
    return {
      chart: null,
      colorlist: [
        '#eaeaf4',
        '#ff999a',
        '#a0bbff'
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const that = this
      that.chart = echarts.init(document.getElementById(this.id))
      const chartData = that.chartData
      that.chart.setOption({
        tooltip: {
          formatter: '{a} : {c}%'
        },
        series: [
          {
            name: '酒店入住率',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            axisLine: {
              lineStyle: {
                color: [[0.2, that.colorlist[0]], [0.8, that.colorlist[1]], [1, that.colorlist[2]]]
              }
            },
            data: [{ value: chartData, name: '本月入住率' }]
          }
        ]
      })
    }
  }
}
</script>

<template>
  <div :id="getdata.id" :style="{height:getdata.height,width:getdata.width}"></div>
</template>

<script>
import echarts from 'echarts'
// import resize from './mixins/resize'
export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    getdata: {
      type: Object,
      default: () => {
        return {
          id: 'echar',
          height: '100%',
          width: '100%',
          legend: [],
          datalist: [],
          color: []
        }
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    getdata: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          this.pieCharts(val)
        })
      }
      // deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById(this.getdata.id))
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    pieCharts(data) {
      var that = this
      var datalist = data.datalist
      var legend = data.legend
      // var datalist = [
      //   { value: 335, name: '监控' },
      //   { value: 310, name: '服务器' },
      //   { value: 274, name: '广播' },
      //   { value: 235, name: 'LED' },
      //   { value: 400, name: '报警' }
      // ]
      // var legend = ['监控', '服务器', '广播', 'LED', '报警']
      var color = ['#587CF1', '#3AE3BC', '#FAD972', '#F88582', '#9299F3']
      var option = {
        title: {
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          icon: 'rect',
          bottom: 0,
          data: legend,
          textStyle: { // 图例文字的样式
            color: '#fff'
          }
        },
        color: color,
        series: [
          {
            name: '设备类型',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: datalist.sort(function(a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#fff'
                },
                // smooth: 0.2, // 弯曲程度
                length: 10,
                length2: 20
              }
            }
          }
        ]
      }
      that.chart.setOption(option)
      window.addEventListener('resize', function() {
        that.chart.resize()
      })
    }
  }
}
</script>

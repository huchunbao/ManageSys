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
          datas: [],
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
          this.chartpie(val)
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
    chartpie(val) {
      var that = this
      var datas = val.datas
      // [
      //         { value: 335, name: '月满西楼南' },
      //         { value: 310, name: '月满西楼北' },
      //         { value: 274, name: '湿地公园南' },
      //         { value: 235, name: '陶然田社北' },
      //         { value: 400, name: '智慧跑道' }
      //       ]
      var legend = val.legend // ['月满西楼南', '月满西楼北', '湿地公园南', '陶然田社北', '智慧跑道']
      var color = val.color // ['#587CF1', '#3AE3BC', '#FAD972', '#F88582', '#9299F3'],
      var option = {
        color: color,
        legend: {
          orient: 'vertical',
          icon: 'rect',
          right: 0,
          data: legend,
          textStyle: {
            fontSize: 10, // 字体大小
            color: '#fff' // 字体颜色
          }
        },
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
        series: [
          {
            name: '设备类型',
            type: 'pie',
            radius: '65%',
            center: ['30%', '50%'],
            data: datas.sort(function(a, b) { return a.value - b.value }),
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
                length2: 10
              }
            },
            itemStyle: {
              // normal: {
              //   color: function(params) {
              //     console.log(params)
              //     var colorlist = ['#587CF1', '#3AE3BC', '#FAD972', '#F88582', '#9299F3']
              //     return colorlist[params.dataIndex]
              //   },
              //   shadowBlur: 10,
              //   shadowColor: 'rgba(0, 0, 0, 0.5)'
              // }
            }
            // animationType: 'scale',
            // animationEasing: 'elasticOut',
            // animationDelay: function(idx) {
            //   return Math.random() * 200
            // }
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

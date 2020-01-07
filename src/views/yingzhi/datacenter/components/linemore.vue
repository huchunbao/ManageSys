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
          data_color: [],
          lengend: [],
          datax: [],
          series: []
        }
      }
    }
  },
  data() {
    return {
      chart: null,
      colorlist: ['#89A2FF', '#A2BCFF', '#FF9F9C', '#FFDC79'] // 扇形区域以及列表颜色
    }
  },
  watch: {
    getdata: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          this.moreline(val)
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
    moreline(data) {
      var that = this
      var data_color = data.data_color // ['#89A2FF', '#A2BCFF', '#FF9F9C', '#FFDC79'] // 扇形区域以及列表颜色
      var legend = data.legend // ['OTA', '官微', '旅行社', '预订部']
      var datax = data.datax // ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      var series = data.series
      var name = '人数(万)'
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter:
            function(params) {
              var result = ''
              result = params[0].name + '月各区域客流' + '</br>'
              params.forEach(function(item) {
                result += item.marker + '' + item.seriesName + ' : ' + item.value + '</br>'
              })
              return result
            }
        },
        legend: {
          icon: 'rect',
          left: '20%',
          top: 0,
          data: legend,
          textStyle: {
            fontSize: 10, // 字体大小
            color: '#fff' // 字体颜色
          }
        },
        color: data_color,
        grid: {
          x: 60,
          y: 30,
          x2: 10,
          y2: 25,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          // name: '日期(日)',
          nameTextStyle: {
            color: '#fff'
          },
          splitLine: {
            show: false
          },
          // data: datax,
          axisTick: { // 是否显示刻度
            alignWithLabel: true,
            show: false
          },
          axisLine: { // 轴线style
            lineStyle: {
              color: '#0E85C7'
            }
          },
          axisLabel: { // 0E85C7
            formatter: '{value}',
            textStyle: {
              color: '#fff'
            }
          },
          data: datax
        },
        yAxis: {
          name: name,
          type: 'value',
          nameTextStyle: {
            color: '#fff'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: { // 轴线style
            lineStyle: {
              color: '#0E85C7'
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: series
      }
      that.chart.setOption(option)
      window.addEventListener('resize', function() {
        that.chart.resize()
      })
    }
  }
}
</script>

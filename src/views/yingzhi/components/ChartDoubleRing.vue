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
          series1: [],
          series2: [],
          legend: [],
          height: '100%',
          width: '100%'
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
      // immediate: true,
      handler(val) {
        this.$nextTick(() => {
          this.EchartsRing(val)
        })
      },
      deep: true
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
    EchartsRing(data) {
      var series1 = data.series1
      var series2 = data.series2
      var legend1 = data.legend1
      var legend2 = data.legend2
      var that = this
      var option = {
        /* eslint-disable */
        tooltip: {
        trigger: 'item',
        formatter:
          function(params) {
            var result = ''
            result += params.seriesName + '</br>' + params.marker + '' + params.data.name + ' : ' + params.data.value + '(' + params.percent + '%' + ')' + '</br>'
            return result
          }
        },
        legend: [
          {
            x: 'center',
            icon: 'rect',
            bottom: 20 ,
            data: legend1,
            textStyle: { // 图例文字的样式
                color: '#fff'
            }
          },
          {
            icon: 'rect',
            x: 'center',
            bottom: 0,
            data: legend2,
            textStyle: { // 图例文字的样式
              color: '#fff'
            }
          }
        ],
        color: ['#03E8FD', '#E1FEAF', '#E1FEAF', '#FB7702', '#F8CC34', '#B0F51B'],
        series: [{
          name: '总进水量占比',
          type: 'pie',
          radius: ['20%', '50%'],
          center: ['25%', '45%'],
          avoidLabelOverlap: false,
          hoverAnimation: true,
          labelLine: { // 设置延长线的长度
            normal: {
              show: true,
              length: 5,// 设置延长线的长度// length2: 10,//设置第二段延长线的长度
              length2: 10
            }
          },
          label: {
            normal: {
              show: true,
              formatter:
                function(params) {
                  var result = '' // result =params.seriesName+''+"</br>"
                  result += params.percent + '%'
                  // result += params.data.value + '(' + params.percent + '%' + ')'
                  return result
                }
            },
            emphasis: {
              show: true,
              textStyle: {
                // fontSize: '16',
                // fontWeight: 'bold'
              }
            }
          },
          data: series1
        },
        {
          name: '总出水量占比',
          type: 'pie',
          radius: ['20%', '50%'],
          center: ['75%', '45%'],
          avoidLabelOverlap: false,
          hoverAnimation: true,
          labelLine: { // 设置延长线的长度
            normal: {
              show: true,
              length: 5,// 设置延长线的长度// length2: 10,//设置第二段延长线的长度
              length2: 10
            }
          },
          label: {
            normal: {
              show: true,
              formatter:
                function(params) {
                  var result = '' // result =params.seriesName+''+"</br>"
                  // result += params.data.value + '(' + params.percent + '%' + ')'
                  result += params.percent + '%'
                  return result
                }
            },
            emphasis: {
              show: true,
              textStyle: {
                // fontSize: '16',
                // fontWeight: 'bold'
              }
            }
          },
          data: series2
        }]
      }
      that.chart.setOption(option)
      window.addEventListener('resize', function() {
        that.chart.resize()
      })
    }
  }
}
</script>

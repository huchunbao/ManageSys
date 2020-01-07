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
          series: [],
          legend: [],
          height: '',
          width: ''
        }
      }
    }
  },
  data() {
    return {
      chart: null,
      colorlist: this.$store.state.settings.chartColors // 扇形区域以及列表颜色
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
      // console.log(data)
      var series = [
        { 'name': '在线', 'value': 333 },
        { 'name': '离线', 'value': 32 },
        { 'name': '未知', 'value': 444 }
      ]
      var legend = ['在线', '离线', '未知']
      var that = this
      // console.log(series)
      // console.log(legend)
      // console.log(id)
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
        legend: {
          orient: 'horizontal',
          icon: 'rect',
          bottom: 0,
          data: legend,
          textStyle: { // 图例文字的样式
            color: '#fff'
          }
        },
        color: this.$store.state.settings.chartColors,
        series: [{
          name: '消费来源',
          type: 'pie',
          radius: ['38%', '68%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          hoverAnimation: true,
          labelLine: { // 设置延长线的长度
            normal: {
              show: true,
              length: 15 // 设置延长线的长度// length2: 10,//设置第二段延长线的长度
            }
          },
          label: {
            normal: {
              show: true,
              formatter:
                function(params) {
                  var result = '' // result =params.seriesName+''+"</br>"
                  result += params.data.value + '(' + params.percent + '%' + ')'
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
          data: series
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

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
    var that = this
    window.removeEventListener('resize', that.resizeHandler)
  },
  methods: {
    EchartsRing(data) {
      // console.log(data)
      var series = data.series
      var legend = data.legend
      var that = this
      var option = {
        /* eslint-disable */
        title: {
          show:series.length < 1 && legend.length < 1,
          textStyle: {
            color: '#909399',
            fontWeight: 'normal',
            fontSize: 14
          },
          text: '暂无数据',
          left: 'center',
          top: 'center'
        },
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
          orient: 'vertical',
          icon: 'circle',
          x: '80%',
          y: 'center',
          data: legend
        },
        color: this.$store.state.settings.chartColors,
        series: [{
          name: '消费来源',
          type: 'pie',
          center: ['40%', '55%'],
          radius: ['30%', '50%'],
          //minAngle: 5, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
          avoidLabelOverlap: true, // 是否启用防止标签重叠策略
          hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效
          labelLine: { // 设置延长线的长度
            normal: {
              show: true,
              // length: 15 // 设置延长线的长度// length2: 10,//设置第二段延长线的长度
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
              // textStyle: {
              //   // fontSize: '16',
              //   // fontWeight: 'bold'
              // }
            }
          },
          data: series
        }]
      }
      that.chart.setOption(option)
      window.addEventListener('resize', that.resizeHandler)
    },
    resizeHandler() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
</script>

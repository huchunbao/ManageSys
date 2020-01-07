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
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    chartType: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object,
      default() {
        return {}
      }
    },
    tipTitle: {
      type: String,
      default: '占比'
    }
  },
  data() {
    return {
      chart: null,
      colorlist: this.$store.state.settings.chartColors
    }
  },
  watch: {
    chartData: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          this.initChart(val)
        })
      },
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById(this.id))
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(chartData) {
      const that = this
      // var labelText1 = '{c}个 ({d}%)'
      var labelText1 = '{c}个 '
      let formatter = '{a} <br/>{b}: {c} ({d}%)'
      if (that.chartType === 'parking') {
        formatter = function(params) {
          return that.tipTitle + '</div><div class="circle" >' + params.marker + params.name + ' : ' + params.value + '个(' + params.percent + '%)</div>'
        }
      }
      that.chart.setOption({
        title: {
          text: chartData.title,
          subtext: chartData.subText,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: formatter
        },
        grid: {
          bottom: 20
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          y: 'center',
          data: chartData.lData,
          selected: chartData.lselected
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            radius: '45%',
            center: ['45%', '50%'],
            data: chartData.sData,
            label: {
              show: true,
              formatter: labelText1
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  return that.colorlist[params.dataIndex % that.colorlist.length]
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

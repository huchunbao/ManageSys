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
      type: Object,
      default() {
        return {}
      }
    },
    tipTitle: {
      type: String,
      default: ''
    },
    showLegend: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const now = new Date()
    return {
      chart: null,
      colorlist: this.$store.state.settings.chartColors,
      yearData: [(now.getFullYear() - 2) + '年', (now.getFullYear() - 1) + '年', now.getFullYear() + '年']
    }
  },
  watch: {
    chartData: {
      immediate: true,
      handler(val) {
        if (!val) return
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
    initChart(option) {
      const that = this
      var xData = (function() {
        var data = []
        var datalen = option.ldata.length
        for (let i = 0, j = 0; i < datalen; i++) {
          if (j >= that.colorlist.length) {
            j = 0
          }
          // console.log(option.ldata[i])
          data.push({
            name: option.ldata[i],
            type: 'bar',
            stack: '总量',
            barMaxWidth: 40,
            itemStyle: {
              normal: {
                color: that.colorlist[j]
              }
            },
            label: {
              show: false,
              position: 'insideRight'
            },
            data: option.sdata[i]
          })
          j++
        }

        return data
      }())

      that.chart.setOption({
        title: {
          show: xData.length <= 0,
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
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            var relVal = params[0].name + that.tipTitle.replace('历年', '')
            for (var i = 0; i < params.length; i++) {
              relVal += '<div class="circle" >' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '元</div>'
            }
            return relVal
          }
        },
        legend: {
          show: that.showLegend,
          data: option.ldata
        },
        grid: {
          left: '15%',
          bottom: 20
        },
        xAxis: {
          name: '日期(年)',
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          data: that.yearData
        },
        yAxis: {
          type: 'value',
          name: '营业额(元)',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisLabel: { formatter: '{value}元' }
        },
        series: xData
      })
    }
  }
}
</script>

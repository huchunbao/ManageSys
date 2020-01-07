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
    stack: {
      type: Boolean,
      default: true
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
      default: ''
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
    initChart(chartData) {
      if (this.chart) {
        this.chart.clear()
      }
      const that = this
      let unit = '元'
      let yName = '营业额(元)'
      let xName = '日期(月)'
      var xItem = []
      var now = new Date()
      const month = now.getMonth() + 1
      if (that.chartType === 'scale') {
        unit = '%'
        yName = '百分比(%)'
        xName = '日期(日)'
        let days = 31
        if (month === 2) {
          days = now.getFullYear() % 4 === 0 ? 29 : 28
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
          days = 30
        }
        for (var j = 1; j <= days; j++) {
          xItem.push(j + '日')
        }
      } else {
        for (var i = 1; i <= month; i++) {
          xItem.push(i + '月')
        }

        if (that.chartType === 'jftj') {
          unit = '分'
          yName = '积分(分)'
        } else if (that.chartType === 'parking') {
          unit = '辆'
          yName = '数量(辆)'
        }
      }
      const xData = (function() {
        const data = []
        var datalen = chartData.ldata.length
        for (let i = 0, j = 0; i < datalen; i++) {
          if (j >= that.colorlist.length) {
            j = 0
          }
          // console.log(chartData.ldata[i])
          if (!that.stack) {
            data.push({
              name: chartData.ldata[i],
              type: 'line',
              stack: '总量',
              itemStyle: {
                normal: {
                  color: that.colorlist[j]
                }
              },
              data: chartData.sdata[i]
            })
          } else {
            data.push({
              name: chartData.ldata[i],
              type: 'line',
              itemStyle: {
                normal: {
                  color: that.colorlist[j]
                }
              },
              data: chartData.sdata[i]
            })
          }
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
          formatter: function(params) {
            var relVal = params[0].name + that.tipTitle.replace('今年每月', '')
            for (var i = 0; i < params.length; i++) {
              relVal += '<div class="circle" >' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + unit + '</div>'
            }
            return relVal
          }
        },
        grid: {
          left: '15%',
          right: '10%',
          bottom: 20
        },
        legend: {
          top: 10,
          data: chartData.ldata
        },
        xAxis: {
          name: xName,
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          boundaryGap: false,
          data: xItem
        },
        yAxis: {
          type: 'value',
          name: yName,
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisLabel: { formatter: '{value}' + unit }
        },
        series: xData
      })
    }
  }
}
</script>

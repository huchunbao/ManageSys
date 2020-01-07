<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
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
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    chartType: {
      type: String,
      default: 'xs'
    },
    barWidth: {
      type: String,
      default: 'big'
    },
    tipTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      chartData: [],
      colorlist: this.$store.state.settings.chartColors
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
    initChart() {
      if (this.chart) {
        this.chart.clear()
      }
      var that = this
      const chartData = that.chartData
      let yName = '数值'
      let xName = ''
      let unit = ''
      let tooltip = {}
      let barW = 45
      if (that.chartType === 'jftj') {
        unit = '分'
        yName = '积分(分)'
        xName = '日期(年)'
        tooltip = {
          formatter: function(params) {
            var relVal = params.name + that.tipTitle + '<br /><div class="circle" >' + params.marker + params.seriesName + ' : ' + params.value[1] + '分</div>'
            return relVal
          }
        }
      } else if (that.chartType === 'parking') {
        unit = '元'
        yName = '营业额(元)'
        xName = '日期(月)'
        tooltip = {
          formatter: function(params) {
            var relVal = params.name + that.tipTitle + '<br /><div class="circle" >' + params.marker + params.seriesName + ' : ' + params.value[2] + '元</div>'
            return relVal
          }
        }
      } else if (that.chartType === 'parkingCar') {
        unit = '辆'
        yName = '车辆数量(辆)'
        xName = '省(市)'
        tooltip = {
          formatter: function(params) {
            var relVal = params.seriesName + '<br /><div class="circle" >' + params.marker + params.name + ' : ' + params.value[1] + '辆</div>'
            return relVal
          }
        }
      } else {
        tooltip = {
          formatter: function(params) {
            let toolUnit = ''
            switch (params.name) {
              case '行驶时长':
              case '超速时长':
              case '停车时长':
                toolUnit = '(小时)'
                break
              case '行驶里程':
              case '超速里程':
              case '总里程':
                toolUnit = '(公里)'
                break
              case '油耗/耗电量':
              case '百公里油耗/能耗':
                toolUnit = '(XL/KWH)/100KM'
                break
              case '最大速度':
              case '平均速度':
              case '最小速度':
                toolUnit = '(km/h)'
                break
              case '超速次数':
              case '停车次数':
              case '加油/充电次数':
              case '漏油/亏电次数':
              case '超时停车次数':
                toolUnit = '(次)'
                break
              case '趟数':
                toolUnit = '(趟)'
                break
              case '加油/充电量':
              case '总油耗/能耗':
                toolUnit = '(L/KWH)'
                break
              case '漏油/亏电量':
                toolUnit = '(L/mAH)'
                break
              default:
                break
            }
            var relVal = '车船牌号：' + params.seriesName + '<br /><div class="circle" >' + params.marker + params.name + ' : ' + params.value[params.seriesIndex + 1] + toolUnit + '</div>'
            return relVal
          }
        }
      }
      const xData = (function() {
        const data = []
        if (chartData[0].length <= 1) {
          return []
        }
        var datalen = chartData[0].length - 1
        var barCount = datalen * chartData.length
        if (that.barWidth !== 'big') {
          if (barCount > 10) {
            barW = 18
          } else {
            barW = 22
          }
        } else {
          if (barCount > 10) {
            barW = 22
          } else {
            barW = 40
          }
        }
        for (let i = 0, j = 0; i < datalen; i++) {
          if (j >= that.colorlist.length) {
            j = 0
          }
          data.push({
            type: 'bar',
            barMaxWidth: barW,
            itemStyle: {
              normal: {
                color: that.colorlist[j]
              }
            },
            label: {
              show: false
            }
          })
          j++
        }

        return data
      }())
      this.chart.setOption({
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
        legend: {},
        tooltip: tooltip,
        grid: {
          left: '10%',
          right: '10%',
          borderWidth: 0,
          top: 50,
          bottom: 20,
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: chartData
        },
        xAxis: [{
          name: xName,
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0
          }
        }],
        yAxis: [{
          name: yName,
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            formatter: '{value}' + unit
          },
          splitArea: {
            show: false
          }
        }],
        series: xData
      }, true)

      this.chart.resize()
    }
  }
}
</script>

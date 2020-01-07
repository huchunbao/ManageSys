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
      default: '210px'
    },
    nesting: {
      type: Boolean,
      default: false
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
      let tooltip = {}
      const tipTitle = that.tipTitle.replace('今年', '')
      let labelText1 = '{b}: {c}元 ({d}%)'
      let labelText2 = '{b}: {c}元 ({d}%)'
      let label2Show = true
      if (that.chartType === '会员卡') {
        label2Show = false
        tooltip = {
          trigger: 'item',
          formatter: function(params) {
            var relVal = ''
            if (params.seriesIndex === 1) {
              relVal += '会员卡消费<div class="circle" >' + params.marker + params.name + ' : ' + params.value + '元(' + params.percent + '%)</div>'
            } else {
              relVal += '会员卡个数<div class="circle" >' + params.marker + params.name + ' : ' + params.value + '个(' + params.percent + '%)</div>'
            }
            return relVal
          }
        }
        labelText1 = '个数: {c}个 ({d}%)'
        labelText2 = '消费: {c}元 ({d}%)'
      } else if (that.chartType === '一卡通') {
        tooltip = {
          trigger: 'item',
          formatter: function(params) {
            return '<div style="text-align: left;">' + tipTitle + '</div><div class="circle" >' + params.marker + params.name + ' : ' + params.value + '个(' + params.percent + '%)</div>'
          }
        }
        labelText1 = '{c}个 ({d}%)'
      } else if (that.chartType === '资产统计') {
        tooltip = {
          trigger: 'item',
          formatter: function(params) {
            var relVal = '资产投入金额占比<div class="circle" >' + params.marker + params.name + ' : ' + params.value + '元(' + params.percent + '%)</div>'
            return relVal
          }
        }
        labelText1 = function(params) {
          return params.value + ' (' + params.percent + '%)'
        }
        labelText1 = '{c}元 ({d}%)'
      } else {
        tooltip = {
          trigger: 'item',
          formatter: function(params) {
            return tipTitle + '<div class="circle" >' + params.marker + params.name + ' : ' + params.value + '元(' + params.percent + '%)</div>'
          }
        }
        labelText1 = '{c}元 ({d}%)'
        labelText2 = '{c}元 ({d}%)'
      }
      const legend = {
        orient: 'vertical',
        right: 0,
        y: 'center',
        data: chartData.ldata
      }
      if (that.nesting) {
        that.chart.setOption({
          tooltip: tooltip,
          legend: legend,
          grid: {
            bottom: 20
          },
          series: [
            {
              name: '占比',
              type: 'pie',
              center: ['35%', '55%'],
              radius: ['50%', '70%'],
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: function(params) {
                    return that.colorlist[params.dataIndex % that.colorlist.length]
                  }
                }
              },
              label: {
                normal: {
                  show: true,
                  formatter: labelText1
                },
                emphasis: {
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '16',
                      fontWeight: 'bold'
                    },
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: chartData.sdata1
            },
            {
              name: '占比',
              type: 'pie',
              center: ['40%', '55%'],
              radius: ['0', '45%'],
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: function(params) {
                    return that.colorlist[params.dataIndex % that.colorlist.length]
                  }
                }
              },
              label: {
                normal: {
                  show: label2Show,
                  formatter: labelText2
                },
                emphasis: {
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '16',
                      fontWeight: 'bold'
                    },
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: label2Show
                }
              },
              data: chartData.sdata2
            }
          ]
        })
      } else {
        that.chart.setOption({
          title: {
            show: chartData.sdata.length <= 0,
            textStyle: {
              color: '#909399',
              fontWeight: 'normal',
              fontSize: 14
            },
            text: '暂无数据',
            left: 'center',
            top: 'center'
          },
          tooltip: tooltip,
          legend: legend,
          grid: {
            bottom: 20
          },
          series: [
            {
              name: '占比',
              type: 'pie',
              center: ['45%', '50%'],
              radius: ['40%', '60%'],
              itemStyle: {
                normal: {
                  color: function(params) {
                    return that.colorlist[params.dataIndex % that.colorlist.length]
                  }
                }
              },
              label: {
                normal: {
                  show: true,
                  formatter: labelText1
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                  },
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: chartData.sdata
            }
          ]
        })
      }
    }
  }
}
</script>

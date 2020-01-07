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
          datay1: [],
          datay2: [],
          datax: []
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
      // immediate: true,
      handler(val) {
        this.$nextTick(() => {
          // this.LineClomn(val)
          this.LineClomn(val)
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
    LineClomn() {
      var that = this
      var legend = ['离线', '在线']
      var datax = ['视频监控', '网络', '水质监控', '大屏', '服务器']
      var datay2 = [23.2, 25.6, 76.7, 135.6, 33]
      var datay1 = [26.4, 70.7, 175.6, 28.2, 55]
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'cross' // 默认为直线，可选为：'line' | 'shadow' | cross
          }
        },
        legend: {
          top: 20,
          textStyle: {
            // fontSize: 18,// 字体大小
            color: '#16C7FB' // 字体颜色
          },
          data: legend
        },
        color: ['#F94B2F', '#02F9AB'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisTick: { // 刻度
            show: false
          },
          splitLine: { // 网格线
            show: false
          },
          axisLine: { // 轴线style
            lineStyle: {
              color: '#16C7FB'
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#fff'
            }
          }
        },
        xAxis: {
          type: 'category',
          nameTextStyle: { // 轴名称样式
            color: '#16C7FB'
          },
          axisLine: { // 轴线style
            lineStyle: {
              color: '#16C7FB'
            }
          },
          axisTick: { // 刻度
            show: false
          },
          axisLabel: {
            show: true,
            formatter: function(params) {
              var newParamsName = '' // 最终拼接成的字符串
              var paramsNameNumber = params.length // 实际标签的个数
              var provideNumber = 1 // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
              /**
              * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
              */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = '' // 表示每一次截取的字符串
                  var start = p * provideNumber // 开始截取的位置
                  var end = start + provideNumber // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p === rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr // 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params
              }
              // 将最终的字符串返回
              return newParamsName
            },
            textStyle: {
              color: '#fff'
            }
          },
          // axisLabel: {
          //   interval: 0,
          //   rotate: 40
          // },
          data: datax
        },
        series: [
          {
            name: '离线',
            barWidth: 20, // 柱图宽度
            type: 'bar',
            stack: '总量',
            data: datay1
          },
          {
            name: '在线',
            type: 'bar',
            barWidth: 20, // 柱图宽度
            stack: '总量',
            data: datay2
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

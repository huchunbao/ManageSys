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
          id: 'echar', // *
          height: '100%', // *
          width: '100%', // *
          grid: '', // 非必传
          legend: [], // *
          series_data: [], // *
          datax: [], // *
          color: [], // *
          row_nums: 2, // x轴每行几个字
          x_name: '',
          y_name: '分布',
          y_fomatter: '', // y轴返回参数格式
          stickx: '', // 刻度线是否有
          sticky: '',
          xyline_color: '#16C7FB', // xy轴颜色
          font_color: '#fff', // xy轴字体颜色
          legend_color: '#16C7FB', // legend字体颜色
          stack: '1' // 若series 下stack  为空或者null---多柱状图  若相同且不为null---多柱状图
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
          this.clomnthree(val)
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
    clomnthree(data) {
      var that = this
      var legend = data.legend
      var datax = data.datax
      var color = data.color
      var stack = data.stack
      if (stack === '' || stack === undefined) {
        stack = null
      }
      // series 数组处理
      var series_data = data.series_data
      var series = []
      for (var i = 0; i < series_data.length; i++) {
        series.push({ 'name': legend[i], 'type': 'bar', 'stack': stack, 'data': series_data[i] })
      }
      // 以下为非必传参数
      var row_nums = data.row_nums
      if (row_nums === '' || row_nums === undefined) {
        row_nums = 2
      }
      var x_name = data.x_name
      if (x_name === '' || x_name === undefined) {
        x_name = ''
      }
      var y_name = data.y_name
      if (y_name === '' || y_name === undefined) {
        y_name = ''
      }
      var xyline_color = data.xyline_color // xy轴颜色
      if (xyline_color === '' || x_name === undefined) {
        xyline_color = '#080808'
      }
      var font_color = data.font_color // xy轴字体颜色
      if (font_color === '' || font_color === undefined) {
        font_color = '080808'
      }
      var legend_color = data.legend_color // legend字体颜色
      if (legend_color === '' || legend_color === undefined) {
        legend_color = '080808'
      }
      var stickx = data.stickx // x轴刻度线
      if (stickx === '' || stickx === undefined) {
        stickx = false
      }
      var sticky = data.sticky // y轴刻度线
      if (sticky === '' || sticky === undefined) {
        sticky = false
      }
      var y_fomatter = data.y_fomatter
      if (y_fomatter === '' || y_fomatter === undefined) {
        y_fomatter = '{value}'
      }
      var grid = data.grid
      if (grid === '' || grid === undefined) {
        grid = {
          x: 30,
          y: 40,
          x2: 0,
          y2: 30,
          containLabel: false
        }
      }
      var option = {
        grid: grid,
        tooltip: { // 鼠标移动触发事件
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow' | cross
          }
        },
        legend: {
          orient: 'horizontal', // 'vertical'
          x: 'center', // 'center' | 'left' | {number},
          y: 'top', // 'center' | 'bottom' | {number}
          top: 8,
          textStyle: {
            // fontSize: 12, // 字体大小
            color: legend_color // 字体颜色
          },
          data: legend
        },
        color: color,
        xAxis: [
          {
            type: 'category',
            name: x_name,
            triggerEvent: false,
            data: datax,
            axisTick: { // 刻度
              show: stickx
            },
            axisLabel: {
              show: true,
              formatter: function(params) {
                var newParamsName = '' // 最终拼接成的字符串
                var paramsNameNumber = params.length // 实际标签的个数
                var provideNumber = row_nums // 每行能显示的字的个数
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
            axisLine: { // 轴线style
              lineStyle: {
                color: xyline_color
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: y_name,
            axisTick: { // 刻度
              show: sticky
            },
            splitLine: { // 网格线
              show: false
            },
            axisLabel: {
              formatter: y_fomatter,
              textStyle: {
                color: font_color
              }
            },
            axisLine: { // 轴线style
              lineStyle: {
                color: xyline_color
              }
            }
          }
        ],
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

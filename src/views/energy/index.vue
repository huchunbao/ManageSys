<template>
  <div class="traffic">
    <div class="left1 top1">
      <div class="lefttop_header">能耗数据分析</div>
      <div class="ny">
        <div class="first">
          <p style="padding-left:6px;">今年电量消耗</p>
          <p style="padding-left:6px;">{{ yearData.electricity }}度</p>
        </div>
        <div class="first">
          <p style="padding-left:6px;">今年水量消耗</p>
          <p style="padding-left:6px;">{{ yearData.water }}吨</p>
        </div>
        <div class="first">
          <p style="padding-left:6px;">今年燃气量消耗</p>
          <p style="padding-left:6px;">{{ yearData.gas }}立方</p>
        </div>
      </div>
      <div class="nya">
        <div class="sec">
          <p style="padding-left:6px;">今年电费金额</p>
          <p style="padding-left:6px;">{{ yearData.electricityMoney }}元</p>
        </div>
        <div class="sec">
          <p style="padding-left:6px;">今年水费金额</p>
          <p style="padding-left:6px;">{{ yearData.waterMoney }}元</p>
        </div>
        <div class="sec">
          <p style="padding-left:6px;">今年燃气费金额</p>
          <p style="padding-left:6px;">{{ yearData.gasMoney }}元</p>
        </div>
      </div>
    </div>
    <div id="echarts2" class="right top1"></div>
    <div class="left1 bottom" style="position: relative;">
      <div id="echarts3" style="width:100%;height:calc(100% - 10px); margin-top:10px;"></div>
    </div>
    <div id="echarts4" class="right bottom"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getList } from '@/api/car'
export default {
  name: 'Traffic',
  data() {
    return {
      yearData: {
        electricity: 0,
        electricityMoney: 0,
        water: 0,
        waterMoney: 0,
        gas: 0,
        gasMoney: 0
      },
      seldata: '2',
      echarts2: null,
      echarts3: null,
      echarts4: null,
      option2: {
        color: ['#86a0ff', '#c2d8ff'],
        title: {
          text: '今年每月水能源消耗统计',
          left: '10',
          top: '0',
          textStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 13
          }
        },
        legend: {
          data: [{ name: '立方', icon: 'circle' }, { name: '金额', icon: 'circle' }]
        },
        grid: {
          left: '20',
          right: '70',
          bottom: '50'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(param) {
            var dan = param.seriesName === '金额' ? '元' : '吨'
            var data = '水能源消耗统计<br>' + param.name + ':' + param.data + '' + dan
            return data
          }
        },
        dataset: {
        },
        xAxis: {
          data: [],
          type: 'category',
          name: '日期(月)'
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value} ' },
          splitLine: {
            show: true
          }
        },
        series: [
          {
            type: 'bar',
            name: '立方',
            data: [
              300,
              260,
              450,
              500,
              230,
              320,
              340,
              400,
              240
            ]
          },
          {
            type: 'bar',
            name: '金额',
            data: [
              1800,
              1560,
              2700,
              3000,
              1380,
              1920,
              2040,
              2400,
              1440
            ]
          }
        ]
      },
      option3: {
        color: ['#315dfc', '#a0bbff'],
        title: {
          text: '今年每月电能消耗统计',
          left: '10',
          top: '0',
          textStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 13
          }
        },
        grid: {
          left: '20',
          right: '70',
          bottom: '50'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(param) {
            var dan = param.seriesName === '金额' ? '元' : '度'
            var data = '电能消耗统计<br>' + param.name + ':' + param.data + '' + dan
            return data
          }
        },
        calculable: true,
        legend: {
          data: [{ name: '度数' }, { name: '金额', icon: 'circle' }]
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            // axisLabel: { formatter: '{value} 月' },
            name: '日期(月)'
          }
        ],
        yAxis: [
          {
            type: 'value'
          },
          {
            show: false,
            type: 'value',
            name: '金额'
          }
        ],
        series: [
          {
            name: '度数',
            type: 'line',
            yAxisIndex: 1,
            data: [
              100,
              210,
              330,
              450,
              363,
              410,
              203,
              234,
              230
            ]
          },
          {
            barWidth: '43%',
            name: '金额',
            type: 'bar',
            data: [
              120,
              252,
              396,
              540,
              435.6,
              492,
              243.6,
              280.8,
              276
            ]
          }
        ]
      },
      option4: {
        title: {
          text: '今年每月燃气能源消耗统计',
          left: '10',
          top: '0',
          textStyle: {
            color: 'black',
            fontWeight: 'normal',
            fontSize: 13
          }
        },
        color: ['#86a0ff', '#c2d8ff'],
        legend: {
          data: [{ name: '立方', icon: 'circle' }, { name: '金额', icon: 'circle' }]
        },
        grid: {
          left: '20',
          right: '70',
          bottom: '50'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(param) {
            var dan = param.seriesName === '金额' ? '元' : 'm3'
            var data = '燃气能源消耗统计<br>' + param.name + ':' + param.data + '' + dan
            return data
          }
        },
        xAxis: {
          data: [],
          type: 'category',
          name: '日期(月)'
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value} ' },
          splitLine: {
            show: true
          }
        },
        series: [
          {
            type: 'bar',
            name: '立方',
            data: [
              300,
              260,
              450,
              640,
              500,
              430,
              320,
              280,
              240
            ]
          },
          {
            type: 'bar',
            name: '金额',
            data: [
              780,
              676,
              1170,
              1664,
              1300,
              1118,
              832,
              728,
              624
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.getAllData()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    getDataList(url) {
      return new Promise((resolve, reject) => {
        getList(url, null).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllData() {
      var that = this
      this.getDataList('/sourceeat/loadSourceData').then(data => {
        var now = new Date()
        var month = now.getMonth() + 1
        var xAxis = new Array(month).fill(0)
        that.option2.series[0].data = new Array(month).fill(0)
        that.option2.series[1].data = new Array(month).fill(0)
        that.option3.series[0].data = new Array(month).fill(0)
        that.option3.series[1].data = new Array(month).fill(0)
        that.option4.series[0].data = new Array(month).fill(0)
        that.option4.series[1].data = new Array(month).fill(0)
        for (let index = 0; index < month; index++) {
          xAxis[index] = (index + 1) + '月'
        }
        that.option2.xAxis.data = xAxis
        that.option3.xAxis[0].data = xAxis
        that.option4.xAxis.data = xAxis
        if (data && data.data) {
          data.data.forEach(item => {
            if (parseInt(item.dateName) > month && item.dateYear === 1) return
            if (parseInt(item.disType) === 0) {
              switch (parseInt(item.typeNum)) {
                case 0:
                  if (item.dateYear === 0) {
                    that.yearData.electricity = item.sourceValue
                  } else {
                    that.option2.series[0].data[parseInt(item.dateName) - 1] = item.sourceValue
                  }
                  break
                case 1:
                  if (item.dateYear === 0) {
                    that.yearData.water = item.sourceValue
                  } else {
                    that.option3.series[0].data[parseInt(item.dateName) - 1] = item.sourceValue
                  }
                  break
                case 2:
                  if (item.dateYear === 0) {
                    that.yearData.gas = item.sourceValue
                  } else {
                    that.option4.series[0].data[parseInt(item.dateName) - 1] = item.sourceValue
                  }
                  break
                default:
                  break
              }
            } else {
              switch (parseInt(item.typeNum)) {
                case 0:
                  if (item.dateYear === 0) {
                    that.yearData.electricityMoney = item.sourceValue
                  } else {
                    that.option2.series[1].data[parseInt(item.dateName) - 1] = item.sourceValue
                  }
                  break
                case 1:
                  if (item.dateYear === 0) {
                    that.yearData.waterMoney = item.sourceValue
                  } else {
                    that.option3.series[1].data[parseInt(item.dateName) - 1] = item.sourceValue
                  }
                  break
                case 2:
                  if (item.dateYear === 0) {
                    that.yearData.gasMoney = item.sourceValue
                  } else {
                    that.option4.series[1].data[parseInt(item.dateName) - 1] = item.sourceValue
                  }
                  break
                default:
                  break
              }
            }
          })
        }
        that.option2.grid.left = this.getYWidth(Math.max.apply(null, that.option2.series[0].data), Math.max.apply(null, that.option2.series[0].data))
        that.option3.grid.left = this.getYWidth(Math.max.apply(null, that.option3.series[0].data), Math.max.apply(null, that.option3.series[0].data))
        that.option4.grid.left = this.getYWidth(Math.max.apply(null, that.option4.series[0].data), Math.max.apply(null, that.option4.series[0].data))
        that.echaers4fund()
        that.echaers3fund()
        that.echaers2fund()
        window.addEventListener('resize', this.resizeHandler) // 图表自适应
      })
    },
    echaers2fund() {
      this.echarts2 = echarts.init(document.getElementById('echarts2'))
      this.echarts2.setOption(this.option2)
    },
    echaers3fund() {
      this.echarts3 = echarts.init(document.getElementById('echarts3'))
      this.echarts3.setOption(this.option3)
    },
    echaers4fund() {
      this.echarts4 = echarts.init(document.getElementById('echarts4'))
      this.echarts4.setOption(this.option4)
    },
    resizeHandler() {
      if (this.echarts2) {
        this.echarts2.resize()
      }
      if (this.echarts3) {
        this.echarts3.resize()
      }
      if (this.echarts4) {
        this.echarts4.resize()
      }
    },
    getYWidth(data1, data2) { // 根据数值长度计算显示宽度
      return ((data1 > data2 ? data1.toString().length : data2.toString().length) * 12).toString()
    }
  }
}
</script>
<style scoped>
.traffic {
  background: #f0f3ff;
  width: 100%;
  padding: 15px;
  height: calc(100vh - 80px);
  box-sizing: border-box;
}
.left1 {
  float: left;
}
.top1 {
  width: calc(50% - 7.5px);
  height: calc(50% - 7.5px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 4px;
}
.bottom {
  width: calc(50% - 7.5px);
  height: calc(50% - 7.5px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 4px;
  margin-top: 15px;
}
.right {
  float: right;
  padding-top: 10px;
  margin-left: 15px;
}
.lefttop_header {
  height: 1rem;
  width: 100%;
  font-size: 0.8rem;
  text-indent: 10px;
  padding-top: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
}
.visiting {
  float: left;
  width: 50%;
  height: 100%;
  padding-top: 2rem;
  margin-left: 8%;
}
.instrument {
  float: left;
  width: 100%;
  height: 100%;
}
.ny {
  display: flex;
}
.first {
  width: 180px;
  height: 80px;
  font-size: 0.8rem;
  box-shadow: 0rem 0rem 1rem 0rem rgba(204, 204, 204, 0.2);
  border-radius: 0.5rem;
  padding-left: 2rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    94deg,
    rgba(174, 197, 255, 1) 0%,
    rgba(139, 171, 253, 1) 100%
  );
  margin-top: 45px;
  margin-left: 30px;
}
.nya {
  display: flex;
}
.sec {
  width: 180px;
  height: 80px;
  font-size: 0.8rem;
  box-shadow: 0rem 0rem 1rem 0rem rgba(204, 204, 204, 0.2);
  border-radius: 0.5rem;
  padding-left: 2rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    90deg,
    rgba(162, 166, 255, 1) 0%,
    rgba(139, 147, 254, 1) 100%
  );
  margin-top: 44px;
  margin-left: 30px;
}
</style>


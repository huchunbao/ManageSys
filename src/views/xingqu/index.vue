<template>
  <div class="traffic">
    <div class="left1 top1">
      <el-tabs v-model="activeName" type="margin-left:10px;" @tab-click="handleClick">
        <el-tab-pane label="今年热门商品排行榜" name="first">
          <div v-if="activeName === 'first'" id="echarts1" class="instrument"></div>
        </el-tab-pane>
        <el-tab-pane label="今年低销商品排行榜" name="second">
          <div v-if="activeName === 'second'" id="echarts6" class="instrument"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="echarts2" class="right top1"></div>
    <div class="left1 bottom" style="position: relative;">
      <div id="echarts3" class="instrument"></div>
    </div>
    <div class="right bottom">
      <p class="tour">游客画像</p>
      <div id="echarts4" style="width:49%; height:88%; float:left; margin-top:-3%;"></div>
      <div id="echarts5" style="width:49%; height:88%; margin-left:2%; float:left;margin-top:-3%;"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getListByGet } from '@/api/car'
export default {
  data() {
    return {
      seldata: '2',
      activeName: 'first',
      echarts1: null,
      echarts2: null,
      echarts3: null,
      echarts4: null,
      echarts5: null,
      echarts6: null,
      option1: {
        color: ['#86a0ff', '#c2d8ff'],
        title: {
          text: '今年热门商品排行榜',
          left: '10',
          top: '10',
          textStyle: { fontSize: '16px', color: 'black' }
        },
        grid: {
          left: '10%',
          bottom: 50
        },
        tooltip: {
          formatter: '热销商品排行榜<br>{b}:{c}万元',
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        dataset: {
        },
        xAxis: {
          data: [],
          type: 'category',
          name: '商品',
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: 'value',
          // axisLabel: { formatter: '{value} 万元' },
          splitLine: {
            show: true
          },
          name: '金额（万元）'
        },
        series: [
          {
            barWidth: '58%',
            type: 'bar',
            name: '万元',
            data: []
          }
        ]
      },
      option6: {
        color: ['#86a0ff', '#c2d8ff'],
        title: {
          text: '今年低销商品排行榜',
          left: '10',
          top: '10',
          textStyle: { fontSize: '16px', color: 'black' }
        },
        grid: {
          left: '10%',
          bottom: 60
        },
        tooltip: {
          formatter: '低消商品排行榜<br>{b}:{c}万元',
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        dataset: {
        },
        xAxis: {
          data: [],
          type: 'category',
          name: '商品',
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: 'value',
          // axisLabel: { formatter: '{value}万元' },
          splitLine: {
            show: true
          },
          name: '金额（万元）'
        },
        series: [
          {
            barWidth: '58%',
            type: 'bar',
            name: '万元',
            data: []
          }
        ]
      },
      option2: {
        color: ['#86a0ff', '#c2d8ff'],
        title: {
          text: '今年热门店铺排行',
          left: '10',
          top: '10',
          textStyle: { fontSize: '16px', color: 'black' }
        },
        grid: {
          left: '10%',
          bottom: 70
        },
        tooltip: {
          formatter: '热门店铺排行<br>{b}:{c}万元',
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        dataset: {
        },
        xAxis: {
          data: [],
          type: 'category',
          name: '店铺',
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: 'value',
          // axisLabel: { formatter: '{value} 万元' },
          splitLine: {
            show: true
          },
          name: '金额（万元）'
        },
        series: [
          {
            barWidth: '58%',
            type: 'bar',
            data: []
          }
        ]
      },
      option3: {
        color: ['#86a0ff', '#c2d8ff'],
        title: {
          text: '今年热门景点排行',
          left: '10',
          top: '10',
          textStyle: { fontSize: '16px', color: 'black' }
        },
        grid: {
          left: '10%',
          bottom: 50
        },
        // legend: {
        //   data: ['人']
        // },
        tooltip: {
          formatter: '热门景点排行<br>{b}:{c}人',
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        dataset: {
        },
        xAxis: {
          data: [],
          type: 'category',
          name: '景点',
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: 'value',
          // axisLabel: { formatter: '{value} 人' },
          splitLine: {
            show: true
          },
          name: '人数（人）'
        },
        series: [
          {
            barWidth: '35%',
            type: 'bar',
            name: '人',
            data: []
          }
        ]
      },
      option4: {
        color: [
          '#8aa3ff',
          '#96bbf2',
          '#c2d8ff',
          '#e4e6ff',
          '#ff999a',
          '#ffdd65',
          '#fdff70'
        ],
        // title: {
        //   text: '游客画像',
        //   left: '10',
        //   top: '-5',
        //   textStyle: { fontSize: '16px', color: 'black' }
        // },
        // legend: {
        //   orient: 'vertical',
        //   y: 'center',
        //   right: '0%',
        //   data: []
        // },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '0%',
          data: [
            { name: '中年', icon: 'circle' }, { name: '少年', icon: 'circle' },
            { name: '青少年', icon: 'circle' }, { name: '中老年', icon: 'circle' },
            { name: '青年', icon: 'circle' }, { name: '壮年', icon: 'circle' }
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'center',
                  max: 1548
                }
              }
            }
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['40%', '60%'],
            itemStyle: {
              normal: {
              }
            },
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            data: []
          }
        ]
      },
      option5: {
        color: ['#8aa3ff', '#96bbf2'],
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '20%',
          data: [{ name: '男', icon: 'circle' }, { name: '女', icon: 'circle' }]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'center',
                  max: 1000
                }
              }
            }
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['40%', '60%'],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
  },
  mounted() {
    this.getAllData()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    getList(url) {
      return new Promise((resolve, reject) => {
        getListByGet(url, null).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllData() {
      var that = this
      that.getList('/taste/loadATasteData').then(data => {
        data.data.forEach(item => {
          switch (parseInt(item.typeId)) {
            case 1:
              that.option1.xAxis.data.push(item.tasteName)
              that.option1.series[0].data.push(item.tasteValue)
              break
            case 2:
              that.option6.xAxis.data.push(item.tasteName)
              that.option6.series[0].data.push(item.tasteValue)
              break
            case 3:
              that.option2.xAxis.data.push(item.tasteName)
              that.option2.series[0].data.push(item.tasteValue)
              break
            case 4:
              that.option3.xAxis.data.push(item.tasteName)
              that.option3.series[0].data.push(item.tasteValue)
              break
            case 5:
              that.option4.legend.data.push(item.tasteName)
              that.option4.series[0].data.push({ value: item.tasteValue, name: item.tasteName })
              break
            case 6:
              that.option5.legend.data.push(item.tasteName)
              that.option5.series[0].data.push({ value: item.tasteValue, name: item.tasteName })
              break
            default:
              break
          }
        })
        that.echaers4fund()
        that.echaers3fund()
        that.echaers2fund()
        that.echaers1fund()
        that.echaers5fund()
        window.addEventListener('resize', this.resizeHandler)
      })
    },
    resizeHandler() {
      if (this.echarts1) {
        this.echarts1.resize()
      }
      if (this.echarts2) {
        this.echarts2.resize()
      }
      if (this.echarts3) {
        this.echarts3.resize()
      }
      if (this.echarts4) {
        this.echarts4.resize()
      }
      if (this.echarts5) {
        this.echarts5.resize()
      }
      if (this.echarts6) {
        this.echarts6.resize()
      }
    },
    echaers1fund() {
      this.echarts1 = echarts.init(document.getElementById('echarts1'))
      this.echarts1.setOption(this.option1)
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
    echaers5fund() {
      this.echarts5 = echarts.init(document.getElementById('echarts5'))
      this.echarts5.setOption(this.option5)
    },
    handleClick(tab, event) {
      this.$nextTick(() => {
        if (parseInt(tab.index) === 0) {
          if (this.echarts6) {
            this.echarts6.dispose()
            this.echarts6 = null
          }
          if (!this.echarts1) {
            this.echarts1 = echarts.init(document.getElementById('echarts1'))
          }
          this.echarts1.setOption(this.option1)
        } else {
          if (this.echarts1) {
            this.echarts1.dispose()
            this.echarts1 = null
          }
          if (!this.echarts6) {
            this.echarts6 = echarts.init(document.getElementById('echarts6'))
          }
          this.echarts6.setOption(this.option6)
        }
      })
    }
  }
}
</script>
<style>
.traffic .el-tabs{
  width: 100%;
  height: 100%;
}
.traffic .el-tabs .el-tabs__content{
  height: calc(100% - 55px);
}
.traffic .el-tabs .el-tabs__content .el-tab-pane{
  height: 100%;
}
.traffic .el-tabs__item {
  font-size: 13px;
  font-weight: 600px;
}
.traffic .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 15px;
}
</style>
<style scoped>
.shopa {
  width: 19px;
  height: 100px;
  background: rgba(139, 147, 254, 1);
}
.shopb {
  width: 19px;
  height: 150px;
  background: rgba(139, 147, 254, 1);
}
.shopc {
  width: 19px;
  height: 130px;
  background: rgba(139, 147, 254, 1);
}
ul {
  display: flex;
  list-style: none;
}
li {
  padding: 0px 17px;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: bold;
}
li:hover {
  color: rgba(63, 106, 255, 1);
  text-decoration-line: underline;
}
.traffic {
  background: #f0f3ff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
}
/* 4大块 */
.left1 {
  float: left;
}
.top1 {
  border-radius: 4px;
  width: calc(50% - 7.5px);
  height: calc(50% - 7.5px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  padding: 15px 15px;
}
.bottom {
  border-radius: 4px;
  width: calc(50% - 7.5px);
  height: calc(50% - 7.5px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  margin-top: 15px;
  padding: 15px 15px;
}
.right {
  float: right;
  margin-left: 15px;
  padding: 15px 15px;
}
/* 数据分析 */
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
  padding: 15px 15px;
}
.instrument {
  float: left;
  width: 100%;
  height: 100%;
}

/* 下拉框 */
.sel {
  width: 3.3rem;
  height: 1rem;
  font-size: 0.8rem;
  text-indent: 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  /* appearance: none; */
  background: url("../../assets/shu/xia.png") no-repeat scroll right 5px center
    transparent;
  background-color: rgba(63, 106, 255, 0.12);
  border: 0px solid rgba(63, 106, 255, 1);
  border-radius: 0rem;
  position: absolute;
  float: left;
  left: 8rem;
  top: 0.75rem;
  padding-right: 10px;
  z-index: 10;
}
.ny {
  display: flex;
}
.first {
  width: 10.8rem;
  height: 4rem;
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
  margin-top: 28px;
  margin-left: 20px;
}
.nya {
  display: flex;
}
.sec {
  width: 10.8rem;
  height: 4rem;
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
  margin-top: 34px;
  margin-left: 20px;
}
#echarts1{
  margin-top:-5px;
}
.tour{
  font-size: 12px;
  margin: 15px 15px;
}
</style>


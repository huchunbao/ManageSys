<template>
  <div class="passenger">
    <!-- 地图 -->
    <!-- <div id="map2" class="map2"></div> -->
    <el-amap
      class="map2"
      :vid="'amap-vue'"
      :zoom="zoom"
      :center="center"
      :amap-manager="amapManager"
    >
      <el-amap-marker
        v-for="(data,i) in markers"
        :key="i"
        vid="data"
        :position="data.position"
        :label="data.wen"
        :icon="require('../../assets/images/didian.png')"
        :content="markerstyle()"
      ></el-amap-marker>
    </el-amap>
    <!-- 人数 -->
    <div class="pos">
      <div class="turnover">
        <div class="turnover_img">
          <img
            src="../../assets/images/icon_ru.png"
            alt=""
          >
        </div>
        <div class="turnover_text">
          <span>{{ enter }}</span>人
          <br>当前进入客流量
        </div>
      </div>
      <div class="turnover">
        <div class="turnover_img">
          <img
            src="../../assets/images/icon_chu.png"
            alt=""
          >
        </div>
        <div class="turnover_text">
          <span>{{ out }}</span>人
          <br>当前离开客流量
        </div>
      </div>
      <div class="turnover">
        <div class="turnover_img">
          <img
            src="../../assets/images/icon_zongshu.png"
            alt=""
          >
        </div>
        <div class="turnover_text">
          <span>{{ enter-out }}</span>人
          <br>当前客流保有量
        </div>
      </div>
    </div>
    <!-- 热力图 -->
    <!-- <div id="container" class="mifen"></div> -->
    <el-amap
      class="mifen"
      :vid="'amap-vue1'"
      :zoom="zoom1"
      :center="center1"
      :map-style="mapStyle1"
      :events="events"
      :amap-manager="amapManager2"
    >
    </el-amap>
    <!-- 游客比例 -->
    <div
      id="echarts1"
      class="zhanbi"
    ></div>
    <div class="echtab">
      <el-tabs
        v-model="activeName"
        type="margin-left:10px;"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="国庆节客流统计"
          name="qing"
        >
          <div
            id="echarts2"
            class="footfall"
          ></div>
        </el-tab-pane>
        <el-tab-pane
          label="去年客流趋势"
          name="qu"
        >
          <div
            id="echarts3"
            class="footfall"
            style="width:32vw;"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { get } from '@/api/axios'
import { AMapManager } from 'vue-amap'

var amapManager = new AMapManager()
var amapManager2 = new AMapManager()
export default {
  name: 'PassenGer',
  data() {
    const colorlist = this.$store.state.settings.chartColors
    return {
      zoom: 16,
      center: [116.336496, 39.942178],
      mapStyle: 'amap://styles/whitesmoke',
      zoom1: 14,
      img: require('../../assets/images/didian.png'),
      markers: [],
      center1: [116.336496, 39.942178],
      mapStyle1: 'amap://styles/fresh',
      events: {},
      amapManager,
      amapManager2,
      // 进入景区的人
      enter: 0,
      // 出景区的人
      out: 0,
      // 客流情况趋势图切换1代表客流情况2代表趋势图
      activeName: 'qing',
      supportData: [],
      echarts1: null,
      echarts2: null,
      echarts3: null,
      option1: {
        title: {
          text: '实时景点客流占比',
          x: 'left',
          textStyle: { fontSize: '14px', color: 'rgba(29,33,51,1)' }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}</br>{b}:{c}人({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '10%',
          show: false,
          data: []
        },
        series: [
          {
            name: '客流量',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['38%', '50%'],
            data: [],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function(params) {
                  return colorlist[params.dataIndex % colorlist.length]
                }
              }
            }
          }
        ]
      },
      option2: {
        grid: {
          left: '15%',
          right: '20%',
          top: '18%',
          bottom: '20%'
        },
        tooltip: {
          type: 'axios',
          axisPointer: {
            type: 'cross'
          },
          formatter: '国庆节客流量统计<br>{b}:{c}人'
        },
        xAxis: {
          type: 'category',
          data: ['10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          name: '日期（月/日）'
        },
        yAxis: {
          type: 'value',
          name: '金额（元）'
          // axisLabel: { formatter: '{value} 人' }
        },
        series: [
          {
            data: new Array(7).fill(0),
            type: 'bar',
            color: '#A2BCFF',
            barWidth: '15'
          }
        ]
      },
      option3: {
        grid: {
          left: '15%',
          right: '18%',
          top: '18%',
          bottom: '20%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          // axisPointer: {
          //   type: 'cross'
          // },
          // backgroundColor: 'rgba(245, 245, 245, 0.8)',
          // borderWidth: 1,
          // borderColor: '#ccc',
          // padding: 10,
          // textStyle: {
          //   color: '#000'
          // },
          // position: function(pos, params, el, elRect, size) {
          //   var obj = { top: 10 }
          //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
          //   return obj
          // },
          formatter: '去年客流趋势<br>{b}月:{c}人'
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          name: '日期（月）'
        },
        yAxis: {
          type: 'value',
          name: '人数（人）'
          // axisLabel: { formatter: '{value} 人' }
        },
        series: [
          {
            data: new Array(12).fill(0),
            type: 'line',
            color: '#3F6AFF'
          }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    init() {
      get('/customerFlow/findCustomerFlowIndex', {}).then(data => {
        // 获取数据
        if (data.status === 0) {
          data.data.forEach(item => {
            switch (item.dateYear) {
              case 0:
                this.enter = item.enteringNumber
                this.out = item.leaveNumber
                break
              case 1: // 地图点位
                this.markers.push({
                  position: [item.lng, item.lat],
                  wen: {
                    content: '<span style="color:#A0B5FF; font-size:3vh;">' + item.baseHold + '</span>人<br>' + item.address
                  }
                })
                this.supportData.push({
                  lng: item.lng,
                  lat: item.lat,
                  count: item.baseHold
                })
                this.option1.series[0].data.push({
                  value: item.baseHold,
                  name: item.address
                })
                this.option1.legend.data.push(item.address)
                break
              case 2: // 去年
                this.option3.series[0].data[parseInt(item.dateName) - 1] = item.baseHold
                break
              case 12: // 国庆节
                this.option2.series[0].data[parseInt(item.dateName) - 1] = item.baseHold
                break
              default:
                break
            }
          })
          this.drawLine()
          this.supportcanvas()
          this.echaers2fund()
          this.echaers3fund()
          window.addEventListener('resize', this.resizeHandler)
        }
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
    },
    markerstyle() {
      var divstyle = ''
      divstyle += '<img :src="' + this.img + '">'
      divstyle
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    drawLine() {
      this.echarts1 = echarts.init(document.getElementById('echarts1'))
      this.echarts1.setOption(this.option1)
      window.addEventListener('resize', () => {
        this.echarts1.resize()
      })
    },
    // 热力图
    supportcanvas() {
      var that = this
      const map = amapManager2.getMap()
      if (map) {
        var heatmap
        map.plugin(['AMap.Heatmap'], function() {
          heatmap = new AMap.Heatmap(map, {
            radius: 25,
            opacity: [0, 0.8],
            gradient: {
              0.5: 'blue',
              0.65: 'rgb(117,211,248)',
              0.7: 'rgb(0, 255, 0)',
              0.9: '#ffea00',
              1.0: 'red'
            }
          })
          heatmap.setDataSet({
            data: that.supportData,
            max: 1600
          })
        })
      } else {
        this.events = {
          init(o) {
            console.log(o)
            var heatmap
            o.plugin(['AMap.Heatmap'], function() {
              heatmap = new AMap.Heatmap(o, {
                radius: 25,
                opacity: [0, 0.8],
                gradient: {
                  0.5: 'blue',
                  0.65: 'rgb(117,211,248)',
                  0.7: 'rgb(0, 255, 0)',
                  0.9: '#ffea00',
                  1.0: 'red'
                }
              })
              heatmap.setDataSet({
                data: that.supportData,
                max: 1600
              })
            })
          }
        }
      }
    },
    echaers2fund() {
      this.echarts2 = echarts.init(document.getElementById('echarts2'))
      this.echarts2.setOption(this.option2)
      window.addEventListener('resize', () => {
        this.echarts2.resize()
      })
    },
    echaers3fund() {
      this.echarts3 = echarts.init(document.getElementById('echarts3'))
      this.echarts3.setOption(this.option3)
      window.addEventListener('resize', () => {
        this.echarts3.resize()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.passenger {
  background: #f0f3ff;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
  padding: 15px;
  position: relative;
}
/* 地图 */
.map2 {
  width: 65%;
  height: 100%;
  border-radius: 0rem;
  float: left;
  margin-right: 15px;
}
/* 人数 */
.pos {
  position: absolute;
  width: 15%;
  bottom: 4vh;
  z-index: 10;
  left: 2vw;
}
.turnover {
  width: 100%;
  height: 10vh;
  background: rgba(47, 49, 83, 1);
  opacity: 0.55;
  overflow: hidden;
  border-radius: 12px;
  color: #fff;
  font-size: 2vh;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin-top: 5px;
}
.turnover_img {
  float: left;
  width: 30%;
  height: 100%;
}
.turnover_img > img {
  position: relative;
  left: 50%;
  top: 50%;
  margin-top: -2.5vh;
  margin-left: -2.5vh;
  width: 5vh;
  height: 5vh;
}
.turnover_text {
  height: 100%;
  line-height: 4.5vh;
}
.turnover_text span {
  font-size: 3vh;
  color: #a0b5ff;
  margin-right: 3%;
}
/* 热力图 */
.mifen {
  float: left;
  width: calc(35% - 15px);
  height: 30%;
  border-radius: 0rem;
}
.zhanbi {
  float: left;
  width: calc(35% - 15px);
  height: 30%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 0rem;
  margin-top: 15px;
}
.echtab {
  text-align: center;
  float: left;
  width: calc(35% - 15px);
  height: calc(40% - 30px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  margin-top: 15px;
  border-radius: 0rem;
}
.footfall {
  width: 100%;
  height: 23vh;
}
.el-tabs__content {
  width: 100%;
  height: 100%;
}
/deep/ .amap-marker-label {
  background: #2f3153;
  color: #fff;
  width: 10vw;
  height: 8vh;
  font-size: 2vh;
  line-height: 3vh;
  text-align: center;
  margin-top: -5vh;
  margin-left: -1.5vw;
}
/deep/ .amap-icon img {
  -webkit-animation: gogogo 2s infinite linear;
}
@-webkit-keyframes gogogo {
  0% {
    transform: scale(0.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
/* /deep/ .amap-marker-content{
  width: 2vh;
  height: 2vh;
} */
</style>


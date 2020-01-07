<template>
  <div class="traffic">
    <div class="header"></div>
    <div class="left1 top1">
      <div class="lefttop_header">停车场数据统计</div>
      <div class="visiting">
        <div class="visiting_div1">
          总停车场数量
          <br><span>{{ zt }}</span>个
        </div>
        <div class="visiting_div2">
          总车位数量
          <br><span>{{ zc }}</span>个
        </div>
        <div class="visiting_div3">
          总空车位数量
          <br><span>{{ kc }}</span>个
        </div>
        <div class="visiting_div4">
          总已占用数量
          <br><span>{{ zzc }}</span>个
        </div>
      </div>
      <div id="echarts1" class="instrument"></div>
    </div>
    <div id="echarts2" class="right top1"></div>
    <div class="left1 bottom" style="position: relative;">
      <!-- <select v-model="seldata" name class="sel">
        <option value="1">1月</option>
        <option value="2">2月</option>
        <option value="3">3月</option>
      </select> -->
      <div id="echarts3" style="width:100%;height:100%;"></div>
    </div>
    <div id="echarts4" class="right bottom"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { get } from '@/api/axios'
export default {
  name: 'Traffic',
  data() {
    return {
      seldata: '2',
      zt: 0,
      zc: 0,
      kc: 0,
      zzc: 0,
      option1: {
        title: {
          text: '车位占用率',
          left: 'center',
          bottom: '20%',
          textStyle: {
            fontSize: '10'
          }
        },
        textStyle: {
          fontSize: '8'
        },
        tooltip: {
          formatter: '{a} <br/>{c}%'
        },
        series: [
          {
            radius: '65%',
            name: '车位占用率',
            type: 'gauge',
            axisLine: {
              lineStyle: {
                color: [[0.3, '#E9EAF3'], [0.7, '#A2BCFF'], [1, '#FF9F9C']],
                width: '20'
              }
            },
            axisLabel: {
              distance: '-9'
            },
            pointer: {
              length: '60%',
              width: '5%'
            },
            detail: {
              formatter: '{value}%',
              fontSize: '10'
            },
            data: [{ value: 62 }],
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ]
      },
      option2: {
        title: {
          text: '本月车辆来源排行',
          left: '10',
          top: '10',
          textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '20%',
          bottom: '10%'
        },
        tooltip: {
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
          type: 'axios',
          axisPointer: {
            type: 'cross'
          },
          formatter: '车辆来源排行<br>{b}:{c}辆'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          name: '地区'
        },
        yAxis: {
          type: 'value',
          name: '数量（辆）'
        },
        series: [
          {
            data: [],
            type: 'bar',
            color: '#A2BCFF',
            barMaxWidth: '35'
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true, // 开启显示
            //       position: 'top', // 在上方显示
            //       textStyle: {
            //         // 数值样式
            //         color: '#A2BCFF',
            //         fontSize: 10
            //       }
            //     }
            //   }
            // }
          }
        ]
      },
      option3: {
        title: {
          text: '上月车流量统计',
          left: '10',
          top: '10',
          textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: '车流量统计<br>{b}日:{c}辆'
        },
        legend: {
          data: ['停车场1', '停车场2', '停车场3'],
          top: '30',
          right: '30'
        },
        grid: {
          left: '3%',
          right: '12%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          name: '日期（日）',
          data: []
        },
        yAxis: {
          type: 'value',
          name: '数量（辆）'
        },
        series: [
          {
            name: '停车场',
            type: 'bar',
            stack: '总量',
            data: [],
            barMaxWidth: '15',
            color: '#a2bcff'
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true, // 开启显示
            //       position: 'top', // 在上方显示
            //       textStyle: {
            //         // 数值样式
            //         color: '#a2bcff',
            //         fontSize: 10
            //       }
            //     }
            //   }
            // }
          }
        ]
      },
      option4: {
        title: {
          text: '上月车位使用率',
          left: '10',
          top: '10',
          textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        },
        grid: {
          left: '10%',
          right: '12%',
          top: '20%',
          bottom: '10%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
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
          formatter: '车位使用率<br>{b}日:{c}%'
        },
        xAxis: {
          type: 'category',
          name: '日期（日）',
          data: [],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '使用率（%）'
        },
        series: [
          {
            data: [],
            type: 'line',
            itemStyle: { color: '#89a2ff' }
          }
        ]
      }
    }
  },
  watch: {
    seldata() {
      // console.log(this.seldata)
    }
  },
  mounted() {
    this.shu()
  },
  methods: {
    shu() {
      const that = this
      get('/parkinfo/getTrafficInfo', { cpid: this.$store.state.user.companyId }).then(res => {
        that.zt = res.data.parkmessagemap.parkcount
        that.zc = res.data.parkmessagemap.Place
        that.kc = res.data.parkmessagemap.feeePlace
        that.zzc = res.data.parkmessagemap.usedPlace
        that.option3.series[0].data = res.data.monthcountarray
        that.option4.series[0].data = []
        that.option3.xAxis.data = []
        this.option1.series[0].data[0].value = ((res.data.parkmessagemap.usedPlace / res.data.parkmessagemap.Place) * 100).toFixed(2)
        for (var i = 0; i < res.data.monthcountarray.length; i++) {
          that.option3.xAxis.data.push('' + (i + 1))
        }
        that.option2.series[0].data = []
        for (var x = 0; x < res.data.parkareamap.length; x++) {
          that.option2.xAxis.data.push(res.data.parkareamap[x].areaname)
          that.option2.series[0].data.push(res.data.parkareamap[x].count)
        }
        for (var y = 0; y < res.data.monthperarray.length; y++) {
          that.option4.xAxis.data.push('' + (y + 1))
          if (res.data.monthperarray[y] === null) {
            that.option4.series[0].data.push(0)
          } else {
            that.option4.series[0].data.push((res.data.monthperarray[y] * 1).toFixed(2))
          }
        }
        this.echaers2fund()
        this.echaers4fund()
        this.echaers3fund()
        this.echaers1fund()
      })
    },
    echaers1fund() {
      const echarts1 = echarts.init(document.getElementById('echarts1'))
      echarts1.setOption(this.option1, 111)
      window.addEventListener('resize', () => {
        echarts1.resize()
      })
    },
    echaers2fund() {
      const echarts2 = echarts.init(document.getElementById('echarts2'))
      echarts2.setOption(this.option2)
      window.addEventListener('resize', () => {
        echarts2.resize()
      })
    },
    echaers3fund() {
      const echarts3 = echarts.init(document.getElementById('echarts3'))
      echarts3.setOption(this.option3)
      window.addEventListener('resize', () => {
        echarts3.resize()
      })
    },
    echaers4fund() {
      const echarts4 = echarts.init(document.getElementById('echarts4'))
      echarts4.setOption(this.option4)
      window.addEventListener('resize', () => {
        echarts4.resize()
      })
    }
  }
}
</script>
<style scoped>
.traffic {
  background: #f0f3ff;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
}
/* 头部 */
.header {
  width: 100%;
  height: 3%;
  background: #ffffff;
}
/* 4大块 */
.left1 {
  float: left;
  margin-left: 1%;
}
.top1 {
  width: 48.5%;
  height: 45%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 0rem;
  margin-top: 1%;
}
.bottom {
  width: 48.5%;
  height: 46%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 0rem;
  margin-top: 1%;
}
.right {
  float: right;
  margin-right: 1%;
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
}
.instrument {
  float: left;
  width: 40%;
  height: 100%;
}
/* 下拉框 */
.sel {
  width: 60px;
  height: 30px;
  font-size: 0.8rem;
  text-indent: 10px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url("../../assets/shu/xia.png") no-repeat scroll right 5px center
    transparent;
  background-color: rgba(63, 106, 255, 0.12);
  border: 0px solid rgba(63, 106, 255, 1);
  border-radius: 0rem;
  position: absolute;
  float: left;
  left: 30%;
  top: 20px;
  padding-right: 10px;
  z-index: 10;
}
/* 四个车位显示 */
.visiting div {
  width: 48%;
  height: 30%;
  font-size: 0.8rem;
  box-shadow: 0rem 0rem 1rem 0rem rgba(204, 204, 204, 0.2);
  border-radius: 0.5rem;
  padding-left: 2rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 300%;
  margin-top: 5%;
}
.visiting_div1 {
  float: left;
  background: linear-gradient(
    94deg,
    rgba(174, 197, 255, 1) 0%,
    rgba(139, 171, 253, 1) 100%
  );
}
.visiting_div2 {
  float: right;
  background: linear-gradient(
    94deg,
    rgba(174, 197, 255, 1) 0%,
    rgba(139, 171, 253, 1) 100%
  );
}
.visiting_div3 {
  float: left;
  background: linear-gradient(
    90deg,
    rgba(162, 166, 255, 1) 0%,
    rgba(139, 147, 254, 1) 100%
  );
}
.visiting_div4 {
  float: right;
  background: linear-gradient(
    90deg,
    rgba(162, 166, 255, 1) 0%,
    rgba(139, 147, 254, 1) 100%
  );
}
.visiting div span {
  font-size: 3vh;
}
</style>


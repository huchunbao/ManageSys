<template>
  <div class="traffic">
    <div class="header"></div>
    <div class="left1 top1">
      <div class="gaoj">告警源占比</div>
      <div
        id="snowTurnover"
        style="width: 98%;height:98%; "
      ></div>
    </div>
    <div class="left1 bottom" style="position: relative;">
      <div class="gaoj">告警类型占比</div>
      <div
        id="snowTurnoveraa"
        style="width:98%;height:98%; "
      ></div>
    </div>
  </div>
</template>
<script>
import { get } from '../../api/axios.js'
import echarts from 'echarts'
export default {
  data() {
    return {}
  },
  watch: {},
  mounted() {
    get('/alarmInfo/selectCountAlarmType', {
      cpid: this.$store.state.user.companyId
    }).then(response => {
      console.log(111)
      this.snowTurnoveraa(response)
    })
    get('/alarmInfo/selectCountAlarmSource', {
      cpid: this.$store.state.user.companyId
    }).then(response => {
      console.log(122)
      this.snowTurnover(response)
    })
  },
  methods: {
    snowTurnover(dta) {
      var snowTurnover = echarts.init(
        document.getElementById('snowTurnover')
      )
      snowTurnover.resize()
      window.addEventListener('resize', () => {
        snowTurnover.resize()
      })
      var aaa = {
        color: [
          '#8aa3ff',
          '#96bbf2',
          '#c2d8ff',
          '#e4e6ff',
          '#ff999a',
          '#ffdd65',
          '#d4c0ff'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '告警源占比<br/>{b}:{c}次({d}%)'
        },
        legend: {
          top: 20,
          left: 'center',
          data: (function() {
            var data = []
            for (var i = 0; i < dta.length; i++) {
              data.push(dta[i].source_name)
            }
            return data
          })()
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
            left: ['80%', '80'],
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            itemStyle: {
              normal: {
              }
            },
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            data: (function() {
              var data = []
              for (var i = 0; i < dta.length; i++) {
                data.push({
                  value: dta[i]['数量'],
                  name: dta[i].source_name
                })
              }
              console.log(data)
              return data
            })()
          }
        ]
      }
      console.log(aaa)
      snowTurnover.setOption(aaa)
    },
    snowTurnoveraa(dta) {
      var snowTurnoveraa = echarts.init(
        document.getElementById('snowTurnoveraa')
      )
      snowTurnoveraa.resize()
      window.addEventListener('resize', () => {
        snowTurnoveraa.resize()
      })
      var aaa = {
        color: [
          '#8aa3ff',
          '#96bbf2',
          '#c2d8ff',
          '#e4e6ff',
          '#ff999a',
          '#ffdd65',
          '#d4c0ff'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '告警类型占比<br/>{b}:{c}次({d}%)'
        },
        legend: {
          top: 20,
          left: 'center',
          data: (function() {
            var data = []
            for (var i = 0; i < dta.length; i++) {
              data.push(dta[i].alarm_type_name)
            }
            return data
          })()
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
            left: ['80%', '80'],
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            itemStyle: {
              normal: {
              }
            },
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            data: (function() {
              var data = []
              for (var i = 0; i < dta.length; i++) {
                data.push({
                  value: dta[i]['数量'],
                  name: dta[i].alarm_type_name
                })
              }
              console.log(data)
              return data
            })()
          }
        ]
      }
      console.log(aaa)
      snowTurnoveraa.setOption(aaa)
    }
  }
}
</script>
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

.traffic {
  background: #f0f3ff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
}
.left1 {
  float: left;
  margin-left: 1rem;
}
.top1 {
  width: 49.3%;
  height: 35rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 0rem;
  margin-top: 0%;
  margin-left:0.1%;
}
.bottom {
  width: 49.3%;
  height: 35rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 0rem;
  margin-top: 0%;
  margin-left:1%;
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
.gaoj {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
  padding: 10px 15px;
}
.zba {
  width: 650px;
  height: 250px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  margin-left: 15px;
}
</style>


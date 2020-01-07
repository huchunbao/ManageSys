<template>
  <div class="traffic">
    <div class="header"></div>
    <div class="left1 top1">
      <div class="lefttop_header">设备状态统计</div>
      <div id="echarts1" class="instrument"></div>
    </div>
    <div class="right top1" style="height:99.9%; width:50%; margin-right:2px;">
      <div class="lefttop_header">流量详情</div>
      <div class="visiting">
        <div class="visiting_div1">
          使用wifi总用户数
          <br>{{ data2.ren }}人
        </div>
        <div class="visiting_div2">
          总流量
          <br>{{ data2.liu }}GB
        </div>
      </div>
      <div class="visiting2">
        <div>{{ data2.topliu }}B<br>上行流量</div>
      </div>
      <div class="visiting2">
        <div>{{ data2.downliu }}B<br>下行流量</div>
      </div>
      <div class="lefttop_header" style="border-left:3px solid #3F6AFF;">TOP3 SSID用户数/流量</div>
      <div v-for="(item,i) in data" :key="i" class="liu">
        <div class="liu_top">
          <div><img src="../../assets/images/icon_wifi.png" alt="" srcset=""></div>
          <div>{{ item.name }}</div>
          <div>
            <div v-for=" dataa in 32 " :key="dataa" :class="dataa<item.num?'you':'jin'"></div>
          </div>
        </div>
        <div class="liu_bottom">
          {{ item.num }}人/{{ item.wifiSum }}
        </div>
      </div>
    </div>
    <div class="left1 bottom" style="position: relative;">
      <div class="lefttop_header">设备类型占比</div>
      <div id="echarts3" style="width:100%;height:100%;"></div>
    </div>
  </div>
</template>
<script>
import { get } from '../../api/axios.js'
import echarts from 'echarts'
export default {
  name: 'Traffic',
  data() {
    return {
      data2: {
        ren: 0,
        liu: 0,
        topliu: '0M',
        downliu: '0M'
      },
      seldata: '2',
      data: [
        {
          shu: 15,
          gb: 12,
          name: 'TP_LINK_334F'
        },
        {
          shu: 8,
          gb: 4,
          name: 'TP_LINK_324F'
        },
        {
          shu: 10,
          gb: 6,
          name: 'TP_LINK_314F'
        }
      ],
      option1: {
        // title: {
        //   text: '设备状态统计',
        //   x: 'left',
        //   textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c}台({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '15%',
          data: ['在线率', '故障率']
        },
        series: [
          {
            name: '设备状态统计',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['35%', '50%'],
            data: [
              { value: 4, name: '在线率', itemStyle: { color: '#89A2FF' }},
              { value: 1, name: '故障率', itemStyle: { color: '#FF9F9c ' }}
            ],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      option3: {
        // title: {
        //   text: '设备类型占比',
        //   x: 'left',
        //   textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a}</br>{b}:{c}台({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '15%',
          data: ['监控', '网络', '广播', '报警', 'LED', '巡更']
        },
        series: [
          {
            name: '设备类型占比',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['35%', '50%'],
            data: [
              { value: 3, name: '监控', itemStyle: { color: '#89A2FF' }},
              { value: 1, name: '网络', itemStyle: { color: '#A2BCFF' }},
              { value: 0, name: '广播', itemStyle: { color: '#C5D6FF' }},
              { value: 1, name: '报警', itemStyle: { color: '#ff9f9c' }},
              { value: 1, name: 'LED', itemStyle: { color: '#E4E5FF' }},
              { value: 0, name: '巡更', itemStyle: { color: '#FFDC79' }}
            ],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      yan: ['#89A2FF', '#A2BCFF', '#C5D6FF', '#ff9f9c', '#E4E5FF', '#FFDC79']
    }
  },
  watch: {
    seldata() {
      // console.log(this.seldata)
    }
  },
  mounted() {
    var that = this
    get('/camara/selectCountOnline', {
      cpid: this.$store.state.user.companyId
    }).then(res => {
      that.option1.series[0].data[0].value = res[0]['在线']
      that.option1.series[0].data[1].value = res[0]['故障']
      console.log(res)
      this.echaers1fund()
    })
    get('/camara/selectCountEquType', {
      cpid: this.$store.state.user.companyId
    }).then(res => {
      console.log(res)
      this.option3.series[0].data = []
      that.option3.legend.data = []
      for (var i = 0; i < res.length; i++) {
        that.option3.legend.data.push(res[i].equipment_type)
        that.option3.series[0].data.push(
          {
            value: res[i]['count(*)'],
            name: res[i].equipment_type
          }
        )
        console.log(that.option3.series[0].data, res)
      }
      this.echaers3fund()
    })
    get('/camara/getWifi', {
      pageNumber: 0,
      pageSize: 3
    }).then(res => {
      that.data = res
      that.data2.topliu = res[0].upload
      that.data2.downliu = res[0].download
      console.log(res, 12212)
    })
    get('camara/getWifiSum').then(res => {
      that.data2.ren = res['人数']
      that.data2.liu = res['总流量']
    })
  },
  methods: {
    login() {
    },
    echaers1fund() {
      this.login()
      const echarts1 = echarts.init(document.getElementById('echarts1'))
      echarts1.setOption(this.option1)
      window.addEventListener('resize', () => {
        echarts1.resize()
      })
    },
    echaers3fund() {
      const echarts3 = echarts.init(document.getElementById('echarts3'))
      echarts3.setOption(this.option3)
      window.addEventListener('resize', () => {
        echarts3.resize()
      })
    }
  }
}
</script>
<style scoped>
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
  margin-left: 1%;
}
.top1 {
  width:49%;
  height:48.9%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 0rem;
  margin-top: 0%;
  margin-left:-0.5px;
}
.bottom {
  width:49%;
  height:48.9%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  border-radius: 0rem;
  margin-top: 1%;
  margin-left:-0.5px;
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
  margin-top: 5px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
  line-height: 1rem;
  overflow: hidden;
}
.visiting {
  float: left;
  width: 28%;
  height: 50%;
  padding-top: 2rem;
  margin-left: 8%;
}
.visiting2 {
  float: left;
  width: 10rem;
  height: 10rem;
  margin-top: 3rem;
  border-radius: 100%;
  border: 10px solid #89A2FF;
  border-right: 10px solid #fff;
  transform:rotate(-45deg);
  margin-left: 20px;
}
.visiting2>div{
  transform:rotate(45deg);
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 400%;
}
.instrument {
  float: left;
  width: 100%;
  height: 100%;
}
/* 四个车位显示 */
.visiting div {
  width: 10rem;
  height: 5rem;
  font-size: 0.8rem;
  box-shadow: 0rem 0rem 1rem 0rem rgba(204, 204, 204, 0.2);
  border-radius: 0.5rem;
  padding-left: 2rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 250%;
  margin-top: 0.5rem;
}
.visiting_div1 {
  background: linear-gradient(
    94deg,
    rgba(174, 197, 255, 1) 0%,
    rgba(139, 171, 253, 1) 100%
  );
}
.visiting_div2 {
  background: linear-gradient(
    94deg,
    rgba(174, 197, 255, 1) 0%,
    rgba(139, 171, 253, 1) 100%
  );
}
.liu{
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
  padding-left: 10%;
}
.liu_top{
  width: 100%;
  overflow: hidden;
}
.liu_top>div{
  float: left;
  line-height: 30px;
  font-size: 15px;
  margin-right: 10px;
  height: 25px;
}
.liu_top div img{
  width: 30px;
  height: 30px;
}
.jin{
  width: 8px;
  height: 15px;
  background:rgba(228,229,255,1);
  opacity:0.5;
  border-radius:3px;
  margin-top: 7px;
  margin-left: 1px;
  float: left;
}
.you{
  width: 8px;
  height: 15px;
  background:rgba(162,188,255,1);
  border-radius:3px;
  margin-top: 7px;
  margin-left: 1px;
  float: left;
}
.liu_bottom{
  float: right;
  width: 76%;
}
</style>

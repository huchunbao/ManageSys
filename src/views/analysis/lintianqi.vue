<template>
  <div class="traffic">
    <div class="div1">
      <div style="height:5vh;margin-left:10%;margin-top:4vh;line-height:5vh;font-size:4vh;">
        {{ tdata.wendu }}℃
      </div>
      <div style="height:4vh;margin-left:10%;line-height:4vh;font-size:1.8vh;">
        {{ tdata.city }}市&nbsp;{{ tdata3.type }}&nbsp;{{ tdata3.fx }}
      </div>
      <div style="height:4vh;margin-left:10%;line-height:4vh;font-size:3vh;">
        {{ shi }}
      </div>
      <div style="height:4vh;margin-left:10%;line-height:4vh;font-size:1.8vh;">
        {{ ri }}
      </div>
      <div class="div1_bottom">
        <div>
          <p class="div1_p1">今天</p>
          <p class="div1_p2">{{ tdata2[0].high }}/{{ tdata2[0].low }}</p>
          <p class="div1_p3">{{ tdata2[0].type }}</p>
        </div>
        <div>
          <p class="div1_p1">明天</p>
          <p class="div1_p2">{{ tdata2[1].high }}/{{ tdata2[1].low }}</p>
          <p class="div1_p3">{{ tdata2[1].type }}</p>
        </div>
        <div>
          <p class="div1_p1">后天</p>
          <p class="div1_p2">{{ tdata2[2].high }}/{{ tdata2[2].low }}</p>
          <p class="div1_p3">{{ tdata2[2].type }}</p>
        </div>
      </div>
    </div>
    <div class="div2">
      <div class="div_header">今天空气质量指数（AQI)</div>
      <div class="div2_zhi">
        <div class="zhi_left">
          >500<br>300<br>200<br>150<br>100<br>50<br>0
        </div>
        <div class="zhi_center">
          <div class="zhi_center_cai" :style="{height: airData.aqi + '%'}"></div>
        </div>
        <div class="zhi_right">
          严重<br>重度<br>中度<br>轻度<br>良<br>优
        </div>
      </div>
      <div class="div2_right">
        <div class="right_list1 right_list">
          SO2 <span>{{ airData.so }}</span>
        </div>
        <div class="right_list2 right_list">
          CO <span>{{ airData.co }}</span>
        </div>
        <div class="right_list1 right_list">
          NO2 <span>{{ airData.no }}</span>
        </div>
        <div class="right_list2 right_list">
          O3 <span>{{ airData.o }}</span>
        </div>
        <div class="right_list1 right_list">
          PM10 <span>{{ airData.pm10 }}</span>
        </div>
        <div class="right_list2 right_list">
          PM2.5 <span>{{ airData.pm25 }}</span>
        </div>
        <div class="right_wenti">
          <div class="wenti_header">温馨提示</div>
          {{ tdata.ganmao }}
        </div>
      </div>
    </div>
    <div
      class="div3"
    >
      <div class="div_header">PM2.5小时浓度变化</div>
      <div id="elem"></div>
    </div>
    <div class="div4">
      <div class="div_header">温/湿度检测</div>
      <div class="div_header div4_header">
        温度<span style="color:#ff9cc5;">偏高</span>点/<span style="color:#46d2e3;">偏低</span>点: <span style="color:#ff9cc5;">{{ temperatureH }}</span>个/<span style="color:#46d2e3;">{{ temperatureL }}</span>个&nbsp;&nbsp;&nbsp;
        湿度<span style="color:#fcb4b2;">偏高</span>点/<span style="color:#A0D9De;">偏低</span>点: <span style="color:#fcb4b2;">{{ humidityH }}</span>个/<span style="color:#a0d9de;">{{ humidityL }}</span>个</div>
      <div class="div4_gun">
        <div
          v-for="(data,i) in tce"
          :key="i"
          class="div4_list"
        >
          <div class="div4_list_header">
            <img
              src="../../assets/images/icon_jiance.png"
              alt=""
            >
            {{ data.name }} <span>{{ data.name2 }}</span>
          </div>
          <div class="div4_list_body">
            温度
            <div class="div4_jin">
              <div :style="'width:'+data.wen+'%;'" :class="data.wen<18?'div4_wendi':data.wen>35?'div4_wengao':'' "></div>
            </div> {{ data.wen }}℃
          </div>
          <div class="div4_list_body">
            湿度
            <div class="div4_jin">
              <div :style="'width:'+data.shi+'%;'" :class="data.shi<40?'div4_shidi':data.shi>65?'div4_shigao':'div4_shi' "></div>
            </div>
            {{ data.shi }}%HR
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { get } from '@/api/axios'
import axios from 'axios'
import echarts from 'echarts'
import { getList } from '@/api/car'

export default {
  name: 'Traffic',
  data() {
    return {
      tdata: [],
      tdata2: [
        {
          high: '',
          type: ''
        },
        {
          high: '',
          type: ''
        },
        {
          high: '',
          type: ''
        }
      ],
      tdata3: [],
      shi: '',
      ri: '',
      airData: {
        aqi: 60,
        so: 0,
        co: 0,
        no: 0,
        o: 0,
        pm10: 0,
        pm25: 0
      },
      temperatureH: 0,
      temperatureL: 0,
      humidityH: 0,
      humidityL: 0,
      echarts1: null,
      option1: {
        // title: {
        //   text: 'PM2.5小时浓度变化',
        //   x: 'left',
        //   textStyle: { fontSize: '10', color: 'rgba(29,33,51,1)' }
        // },
        grid: {
          left: '1%',
          right: '1%',
          top: '5%',
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
          formatter: 'PM2.5小时浓度变化<br>{b}:{c}μg/m3'
        },
        xAxis: {
          type: 'category',
          data: [
            '0:00',
            '2:00',
            '4:00',
            '6:00',
            '8:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00'
          ],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function(value, index) {
              var date = new Date(value)
              return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: [
              14,
              12,
              12,
              17,
              14,
              12,
              10,
              14,
              12,
              13,
              10,
              12
            ],
            type: 'line',
            color: '#3F6AFF',
            smooth: 'smoothMonotone',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#6578FF' // 0% 处的颜色
                  },
                  {
                    offset: 0.9,
                    color: '#fff' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      },
      tce: []
    }
  },
  watch: {},
  mounted() {
    var that = this
    axios
      // .get('https://www.apiopen.top/weatherApi?city=北京', {})
      .get('http://wthrcdn.etouch.cn/weather_mini?city=北京', {})
      .then(function(res) {
        console.log(1, res.data.data)
        that.tdata = res.data.data
        that.tdata2 = []
        for (let i = 0; i < that.tdata.forecast.length; i++) {
          that.tdata2.push({
            high: that.tdata.forecast[i].high.substring(3, 10),
            low: that.tdata.forecast[i].low.substring(3, 10),
            type: that.tdata.forecast[i].type
          })
        }
        that.tdata3 = res.data.data.yesterday
      })
    setInterval(() => {
      that.formatDate()
    }, 1000)
    that.ech()
    that.getDataList()
  },
  methods: {
    ech() {
      this.echarts1 = echarts.init(document.getElementById('elem'))
    },
    formatDate() {
      var a = ['日', '一', '二', '三', '四', '五', '六']
      var date = new Date()
      var y = date.getFullYear()
      var MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      var s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      var r = date.getDate()
      r = r < 10 ? '0' + r : r
      this.shi = h + ':' + m + ':' + s
      this.ri = y + '年 ' + MM + '月 ' + r + '日' + '星期' + a[date.getDay()]
    },
    getList(url, query) {
      return new Promise((resolve, reject) => {
        getList(url, query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDataList() {
      var that = this
      that.getList('/environmentdata/loadAEnvironment', null).then(data => {
        that.temperatureH = 0
        that.temperatureL = 0
        that.humidityH = 0
        that.humidityL = 0
        that.tce = []
        data.data.list.forEach(item => {
          if (item.whole === 1) {
            if (item.weath < 18) {
              that.temperatureL += 1
            } else if (item.weath > 35) {
              that.temperatureH += 1
            }

            if (item.humidity < 40) {
              that.humidityL += 1
            } else if (item.humidity > 65) {
              that.humidityH += 1
            }
            console.log(that.temperatureL, that.temperatureH, that.humidityL, that.humidityH)
            that.tce.push({ name: item.spaceName, name2: item.detectionName, wen: item.weath, shi: item.humidity })
          } else {
            if (item.aqi <= 200) {
              that.airData.aqi = item.aqi * 0.3
            } else if (item.aqi > 200 && item.aqi <= 300) {
              that.airData.aqi = 60 + ((item.aqi - 200) * 0.15)
            } else if (item.aqi > 300 && item.aqi <= 500) {
              that.airData.aqi = 75 + ((item.aqi - 300) * 0.075)
            } else {
              that.airData.aqi = 100
            }
            that.airData.so = item.so2
            that.airData.co = item.co
            that.airData.no = item.no2
            that.airData.o = item.o3
            that.airData.pm10 = item.pm10
            that.airData.pm25 = item.pm25
          }
        })

        var now = new Date()
        var thisDate = now.toLocaleString('chinese', { hour12: false })
        that.option1.xAxis.data = []
        that.option1.series[0].data = []
        data.data.pm25list.forEach(item => {
          var lDate = new Date(item.date).toLocaleString('chinese', { hour12: false })
          if (lDate > thisDate) {
            return
          } else {
            that.option1.xAxis.data.push(item.date)
            that.option1.series[0].data.push(item.pm25)
          }
        })
        that.echarts1.setOption(that.option1)
        window.addEventListener('resize', () => {
          that.echarts1.resize()
        })
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
  padding: 1%;
  overflow: hidden;
}
.div1 {
  width: 20%;
  height: 45%;
  background: url('../../assets/images/tianqi_di.png') no-repeat;
  background-size: 100% 100%;
  border-radius: 1vh;
  margin-right: 1%;
  float: left;
  color: #ffffff;
  overflow: hidden;
  position: relative;
}
.div1_bottom {
  width: 100%;
  height: 30%;
  background: rgba(47, 49, 83, 0.18);
  margin-top: 15%;
}
.div1_bottom div {
  float: left;
  width: 33%;
  height: 100%;
}
.div1_p1 {
  height: 3vh;
  width: 100%;
  margin: 0;
  font-size: 2vh;
  line-height: 3vh;
  text-align: center;
  margin-top: 5%;
}
.div1_p2 {
  height: 3vh;
  width: 100%;
  margin: 0;
  font-size: 2vh;
  line-height: 3vh;
  text-align: center;
}
.div1_p3 {
  height: 3vh;
  width: 100%;
  margin: 0;
  font-size: 1.5vh;
  line-height: 3vh;
  text-align: center;
}
.div_header {
  width: 100%;
  height: 10%;
  font-size: 1.5vh;
  font-weight: 800;
}
.div2 {
  width: 35%;
  height: 45%;
  background: #ffffff;
  border-radius: 1vh;
  margin-right: 1%;
  float: left;
  padding: 1%;
}
.div2_zhi {
  width: 30%;
  height: 90%;
  float: left;
}
.zhi_left {
  float: left;
  width: 35%;
  height: 100%;
  text-align: right;
  line-height: 320%;
  font-size: 1.5vh;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(165, 168, 181, 1);
  margin-right: 10%;
}
.zhi_center {
  float: left;
  width: 10%;
  height: 100%;
  text-align: right;
  background: rgba(165, 168, 181, 0.15);
  border-radius: 1vh;
  overflow: hidden;
  position: relative;
}
.zhi_center_cai {
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(137, 162, 255, 1) 0%,
    rgba(210, 193, 255, 1) 51%,
    rgba(255, 156, 196, 1) 100%
  );
  position: absolute;
  bottom: 0;
}
.zhi_right {
  float: left;
  width: 35%;
  height: 100%;
  text-align: left;
  line-height: 320%;
  font-size: 1.5vh;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(165, 168, 181, 1);
  margin-left: 10%;
}
.div2_right {
  float: right;
  width: 60%;
  height: 90%;
  padding-right: 5%;
}
.right_list {
  width: 40%;
  height: 3vh;
  border: 1px solid rgba(63, 106, 255, 1);
  text-align: center;
  background: rgba(63, 106, 255, 0.12);
  margin-bottom: 5%;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(63, 106, 255, 1);
  font-size: 1.5vh;
  line-height: 3vh;
  border-radius: 3vh;
}
.right_list span {
  margin-left: 10%;
  font-weight: 800;
}
.right_list1 {
  float: left;
}
.right_list2 {
  float: right;
}
.right_wenti {
  width: 100%;
  height: 50%;
  background: rgba(241, 244, 255, 0.7);
  float: left;
  margin-top: 1%;
  padding: 5%;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(29, 33, 51, 1);
  font-size: 1.5vh;
}
.wenti_header {
  font-size: 1.5vh;
  font-family: PingFang SC;
  font-weight: 800;
  color: rgba(29, 33, 51, 1);
  padding-left: 5%;
  border-left: 5px solid #3f6aff;
  margin-bottom: 1vh;
}
.div3 {
  width: 43%;
  height: 45%;
  background: #ffffff;
  border-radius: 1vh;
  float: left;
  padding: 1%;
}
#elem {
  width: 100%;
  height: 90%;
}
.div4 {
  width: 100%;
  height: 53%;
  margin-top: 1%;
  border-radius: 1%;
  background: #ffffff;
  float: left;
  padding: 1%;
}
.div4_gun {
  width: 100%;
  overflow: auto;
  height: 80%;
  padding-top: 10px;
}
.div4_gun::-webkit-scrollbar{
  display: none;
}
.div4_header {
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(29, 33, 51, 1);
  font-size: 1vh;
}
.div4_header span{
  /* color: #3F6AFF; */
  font-size: 1.5vh;
  font-weight: 600;
}
.div4_list {
  margin-left: 1%;
  margin-right: 1%;
  width: 23%;
  height: 45%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 0.5);
  overflow: hidden;
  float: left;
  margin-bottom: 1%;
}
.div4_list_header {
  width: 100%;
  height: 6vh;
  line-height: 6vh;
  font-size: 2vh;
  font-family: PingFang SC;
  font-weight: 800;
  color: rgba(29, 33, 51, 1);
  border-bottom: 1px solid #cccccc;
}
.div4_list_header img {
  height: 100%;
  float: left;
}
.div4_list_header span {
  font-size: 1.5vh;
  margin-left: 5%;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(29, 33, 51, 1);
}
.div4_list_body {
  width: 80%;
  margin: auto;
  font-size: 1.6vh;
  height: 1.4vh;
  line-height: 2vh;
  margin-top: 5%;
}
.div4_jin {
  width: 65%;
  height: 100%;
  display: inline-block;
  background: rgba(165, 168, 181, 0.15);
  border-radius: 2vh;
  font-size: 1vh;
  margin-left: 2%;
  margin-right: 2%;
  overflow: hidden;
}
.div4_jin div {
  width: 60%;
  height: 100%;
  background: rgba(137, 162, 255, 1);
}
.div4_jin .div4_wengao{
  background:#ff9cc5;
}
.div4_jin .div4_wendi{
  background:#46d2e3;
}
.div4_jin .div4_shigao{
  background:#fcb4b2;
}
.div4_jin .div4_shidi{
  background:#A0D9De;
}
.div4_jin .div4_shi{
  background:#c5d6ff;
}
</style>


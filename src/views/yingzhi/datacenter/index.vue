<template><!--大数据中心-->
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">大数据中心</div>
    </div>
    <div class="bg_img"></div>
    <div class="echarts_box">
      <div class="left">
        <div class="left_top">
          <fourcorners :showimg="false"></fourcorners>
          <div class="left_top_left">
            <div class="title">设备运行状态</div>
            <echar-clomn-thtee :getdata="doublestack"></echar-clomn-thtee>
          </div>
          <div class="left_top_right">
            <div class="title">设备分布统计</div>
            <echar-clomn-thtee :getdata="clomnthree"></echar-clomn-thtee>
          </div>
        </div>
        <div class="left_center">
          <div class="title">今日水检测</div>
          <table class="tab_table" border="1px solid #fff" cellspacing="0" cellpadding="0">
            <tr>
              <th>水质监测点</th>
              <th>COD(mg/L)</th>
              <th>TN(mg/L)</th>
              <th>HN3-N(mg/L)</th>
              <th>TP(mg/L)</th>
              <th>进水量(吨)</th>
              <th>出水量(吨)</th>
            </tr>
            <tr v-for="(item, i) in table_list" :key="i">
              <td>{{ item.marker }}</td>
              <td>{{ item.CTO.into }}</td>
              <td>{{ item.TN.into }}</td>
              <td>{{ item.HN3.into }}</td>
              <td>{{ item.TP.into }}</td>
              <td>{{ item.into }}</td>
              <td>{{ item.out }}</td>
            </tr>
          </table>
        </div>
        <div class="left_bottom">
          <div class="title">上月水质监测考核</div>
          <table class="tab_table before_month" border="1px solid #fff" cellspacing="0" cellpadding="0">
            <tr>
              <th>水质监测点</th>
              <th>COD(mg/L)进出水</th>
              <th>TN(mg/L)进出水</th>
              <th>HN3-N(mg/L)进出水</th>
              <th>TP(mg/L)进出水</th>
              <th>综合评级</th>
            </tr>
            <tr v-for="(item, i) in table_list" :key="i">
              <td>{{ item.marker }}</td>
              <td>{{ item.CTO.into }}&nbsp;{{ item.CTO.out }}</td>
              <td>{{ item.TN.into }}&nbsp;{{ item.TN.out }}</td>
              <td>{{ item.HN3.into }}&nbsp;{{ item.HN3.out }}</td>
              <td>{{ item.TP.into }}&nbsp;{{ item.TP.out }}</td>
              <td>{{ item.level }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="center center_echarts">
        <div class="title">洱海廊道服务设施分布图</div>
        <div class="map_box">
          <ul>
            <li class="defaults" :class="active == '驿站' ? 'defaults_2' : 'defaults_1'" @click="clickLi('驿站')">
              <img src="@/assets/yingzhi/post.png" alt="">
              <span>驿站</span>
              <div>信息:1个</div>
            </li>
            <li class="defaults" :class="active == '视频监控' ? 'defaults_2' : 'defaults_1'" @click="clickLi('视频监控')">
              <img src="@/assets/yingzhi/videolook.png" alt="">
              <span>视频监控</span>
              <div>信息:2个</div>
            </li>
            <li class="defaults" :class="active == '人员定位' ? 'defaults_2' : 'defaults_1'" @click="clickLi('人员定位')">
              <img src="@/assets/yingzhi/positioning.png" alt="">
              <span>人员定位</span>
              <div>信息:3个</div>
            </li>
            <li class="defaults" :class="active == '智能跑道' ? 'defaults_2' : 'defaults_1'" @click="clickLi('智能跑道')">
              <img src="@/assets/yingzhi/runway.png" alt="">
              <span>智能跑道</span>
              <div>信息:1个</div>
            </li>
            <li class="defaults" :class="active == '水质监测' ? 'defaults_2' : 'defaults_1'" @click="clickLi('水质监测')">
              <img src="@/assets/yingzhi/waterlook.png" alt="">
              <span>水质监测</span>
              <div>信息:5个</div>
            </li>
          </ul>
          <div id="container" class="map"></div>
          <!-- <el-amap
            class="map"
            :vid="'amap-vue'"
            :zoom="zoom"
            :center="center"
            :events="events"
            :amap-manager="amapManager"
          >
            <el-amap-marker
              v-for="(marker,index) in markers"
              :key="index"
              :position="marker.position"
              :events="marker.events"
              :icon="marker.icon"
            ></el-amap-marker>
          </el-amap> -->
        </div>
      </div>
      <div class="right">
        <div class="right_top">
          <div class="weather">
            <fourcorners :showimg="false"></fourcorners>
            <div class="temperature_times">
              <div class="temperature">
                <span class="temp_number">26°</span>
                <img :src="weather" alt="">
                <span class="weather_stadus">晴</span>
              </div>
              <div class="now_times">
                <ul>
                  <li>洱海</li>
                  <li>2019-11-22</li>
                  <li>星期五</li>
                </ul>
                <span>14:38</span>
              </div>
              <ul class="list_weather">
                <li><img :src="wind" alt="">北风&nbsp;三级</li>
                <li><img :src="airpressure" alt="">气压105hpa</li>
                <li><img :src="temperature" alt="">温度13%</li>
                <li><img :src="outline" alt="">紫外线很强</li>
              </ul>
            </div>
          </div>
          <div class="real_time">
            <div class="title">实时客流</div>
            <div class="people_flow">
              <fourcorners :showimg="false"></fourcorners>
              <ul>
                <li>才村湿地公园 <span class="numberof">4353</span></li>
                <li>月满西楼北段 <span class="numberof">3472</span></li>
                <li>月满西楼南段 <span class="numberof">2456</span></li>
                <li>智慧跑道 <span class="numberof">6734</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right_center">
          <div class="title">客流占比</div>
          <pie :getdata="pie"></pie>
        </div>
        <div class="right_bottom">
          <div class="title">区域客流统计</div>
          <line-more :getdata="moreline"></line-more>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import daoy from '../daoyou.vue'
import fourcorners from '../components/fourcorners'
import EcharClomnThtee from '../components/EcharClomnThtee'
import pie from './components/pie'
import LineMore from './components/linemore'
import VueAMap from 'vue-amap'
var amapManager = new VueAMap.AMapManager()
export default {
  name: 'About',
  components: {
    daoy,
    fourcorners,
    EcharClomnThtee,
    pie,
    LineMore
  },
  data() {
    return {
      map: null,
      polyline: null,
      active: '驿站',
      zoom: 11, // 初始化地图层级
      center: [100.194439, 25.90931], // 初始化地图中心点
      // mapStyle1: 'amap://styles/whitesmoke',
      amapManager,
      events: {},
      markers: [],
      marker: [],
      line: [],
      doublestack: {
        id: 'doublestack',
        height: 'calc(100% - 26px)',
        width: '100%',
        grid: {
          x: 60,
          y: 40,
          x2: 0,
          y2: 30,
          containLabel: false
        },
        legend: [],
        series_data: [],
        datax: [],
        color: ['#F94B2F', '#02F9AB'],
        xyline_color: '#fff', // xy轴颜色
        font_color: '#fff', // xy轴字体颜色
        legend_color: '#16C7FB', // legend字体颜色
        y_fomatter: '{value}%',
        stack: '1' // 若series 下stack  为空或者null---多柱状图  若相同且不为null---多柱状图
      },
      clomnthree: {
        id: 'clomnthree', // *
        height: 'calc(100% - 26px)', // *
        width: '100%', // *
        grid: {
          x: 60,
          y: 40,
          x2: 0,
          y2: 30,
          containLabel: false
        },
        legend: [], // *
        series_data: [], // *
        datax: [], // *
        color: ['#02D9F9', '#CAF94C', '#C24CF9', '#F9854C'], // *
        xyline_color: '#fff', // xy轴颜色
        font_color: '#fff', // xy轴字体颜色
        legend_color: '#16C7FB', // legend字体颜色
        y_fomatter: '{value}%'
      },
      pie: {
        id: 'chartspie',
        datas: [],
        height: 'calc(100% - 28px)',
        width: '100%',
        legend: [],
        color: []
      },
      moreline: {
        id: 'moreline',
        height: 'calc(100% - 26px)',
        width: '100%',
        legend: [],
        data_color: [],
        datax: [],
        series: []
      },
      table_list: [
        {
          marker: '月满酒楼南',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125,
          level: 'IV'
        },
        {
          marker: '月满酒楼北',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125,
          level: 'IV'
        },
        {
          marker: '湿地公园北',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          level: 'IV',
          out: 125
        },
        {
          marker: '湿地公园南',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125,
          level: 'IV'
        },
        {
          marker: '陶然田社北',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125,
          level: 'IV'
        },
        {
          marker: '陶然田社南',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125,
          level: 'IV'
        }
      ],
      weather: require('@/assets/yingzhi/weather.png'),
      wind: require('@/assets/yingzhi/wind.png'),
      airpressure: require('@/assets/yingzhi/airpressure.png'),
      temperature: require('@/assets/yingzhi/temperature.png'),
      outline: require('@/assets/yingzhi/outline.png'),
      post: require('@/assets/yingzhi/post.png'), // 驿站
      videolook: require('@/assets/yingzhi/videolook.png'), // 视频监控
      positioning: require('@/assets/yingzhi/positioning.png'), // 人员定位
      runway: require('@/assets/yingzhi/runway.png'), // 智能跑道
      waterlook: require('@/assets/yingzhi/waterlook.png') // 水质监测
    }
  },
  computed: {},
  watch: {
  },
  mounted() {
    // 堆叠图
    this.doublestack.legend = ['离线', '在线']
    this.doublestack.datax = ['视频监控', '网络', '水质监控', '大屏', '服务器']
    var data1 = [79.2, 25.6, 76.7, 8.6, 33]
    var data2 = [26.4, 70.7, 15.6, 28.2, 55]
    this.doublestack.series_data = [data1, data2]
    // 三柱状图
    this.clomnthree.legend = ['灵眸', '摄像头', '大屏', '水质监测']
    this.clomnthree.datax = ['智慧跑道', '月满酒楼南', '月满酒楼北', '才村湿地公园']
    var data11 = [79.2, 25.6, 76.7, 8.6]
    var data22 = [26.4, 70.7, 15.6, 28.2]
    var data33 = [55, 25.6, 76.7, 88]
    var data44 = [66, 70.7, 15.6, 99]
    this.clomnthree.series_data = [data11, data22, data33, data44]
    // 饼状图
    this.pie.datas = [
      { value: 335, name: '月满西楼南' },
      { value: 310, name: '月满西楼北' },
      { value: 274, name: '湿地公园南' },
      { value: 235, name: '陶然田社北' },
      { value: 400, name: '智慧跑道' }
    ]
    this.pie.legend = ['月满西楼南', '月满西楼北', '湿地公园南', '陶然田社北', '智慧跑道']
    this.pie.color = ['#587CF1', '#3AE3BC', '#FAD972', '#F88582', '#9299F3']
    // 多折线图
    this.moreline.data_color = ['#00FF00', '#D8DD17', '#E30114', '#F8B551', '#00FFFF'] // 扇形区域以及列表颜色
    this.moreline.legend = ['月满西楼南', '月满西楼北', '湿地公园南', '陶然田社北', '智慧跑道']
    this.moreline.datax = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    this.moreline.series = [
      {
        name: '月满西楼南',
        symbol: 'none',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '月满西楼北',
        type: 'line',
        symbol: 'none',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 444, 666, 90, 230, 210]
      },
      {
        name: '湿地公园南',
        type: 'line',
        symbol: 'none',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410, 234, 132, 101, 456, 90, 230, 210]
      },
      {
        name: '陶然田社北',
        type: 'line',
        symbol: 'none',
        stack: '总量',
        data: [320, 332, 301, 334, 390, 330, 320, 120, 452, 101, 57, 90, 230, 210]
      },
      {
        name: '智慧跑道',
        type: 'line',
        symbol: 'none',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320, 66, 132, 99, 134, 90, 55, 210]
      }
    ]

    this.map = new AMap.Map('container', {
      resizeEnable: true,
      center: [100.194439, 25.90931],
      zoom: 11
    })
    this.clickLi('驿站')
  },
  methods: {
    clickLi(val) {
      this.active = val
      this.map.clearMap() // 清除地图覆盖物
      this.markers = []
      this.marker = []
      this.line = []
      this.changeMarkers(val)
    },
    changeMarkers(val) {
      const that = this
      // 驿站    post videolook positioning runway waterlook
      var marker1 = [[100.397094, 25.944405]]
      // 视频监控 videolook
      var marker2 = [[100.412715, 25.944227], [100.405162, 25.930489]]
      // 人员定位 positioning
      var marker3 = [[100.405162, 25.930489], [100.424731, 25.929253], [100.383189, 25.923078]]
      // 智能跑道marker2 --runway
      var marker4 = [[100.162261, 25.6953135], [100.181144, 25.690804], [100.123122, 25.672549]]
      // 水质监测 waterlook
      var marker5 = [[100.397094, 25.944405], [100.412715, 25.944227], [100.405162, 25.930489], [100.424731, 25.929253], [100.383189, 25.923078]]

      if (val === '驿站') {
        that.marker = marker1
        val = that.post
      } else if (val === '视频监控') {
        that.marker = marker2
        val = that.videolook
      } else if (val === '人员定位') {
        that.marker = marker3
        val = that.positioning
      } else if (val === '水质监测') {
        that.marker = marker5
        val = that.waterlook
      } else {
        that.line = marker4
      }
      for (let i = 0; i < that.marker.length; i++) {
        that.markers.push(new AMap.Marker({
          icon: val,
          position: that.marker[i]
        }))
      }
      if (this.active === '智能跑道') {
        that.polyline = new AMap.Polyline({
          path: that.line,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: '#3366FF',
          strokeOpacity: 1,
          strokeWeight: 6,
          // 折线样式还支持 'dashed'
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50
        })
        that.polyline.setMap(that.map)
        // 缩放地图到合适的视野级别
        that.map.setFitView([that.polyline])
      } else {
        that.map.add(that.markers)
        that.map.setFitView()
      }
    },
    tiao(data) {
      this.$router.push({ path: '/' + data })
    }
  }
}
</script>

<style scoped>
.about {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("../../../assets/yingzhi/bg_img.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
/* 头部标签 */
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  background-image: url("../../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
  z-index: 999;
}
.header_text {
  width: 30%;
  text-align: center;
  color: #fff;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 10px;
  float: left;
  position: absolute;
  left: 50%;
  top: 0%;
  margin-left: -15%;
}
.echarts_box{
  width: 100%;
  height: calc(100% - 8%);
  padding: 0 23px 30px 23px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* 页面结构  left--左 center--中间 right--右*/
.echarts_box .left, .echarts_box .right{
  width: calc((100% - 20px) * 0.31);
  height: 100%;
}
.echarts_box .center_echarts {
  width: calc((100% - 20px) * 0.35);
  height: 100%;
  background: rgba(20, 23, 71, 0.5);
  padding: 0 20px 20px 20px;
  border-radius: 10px;
}
.map_box{
  width: 100%;
  height: calc(100% - 26px - 15px);
  margin-top:15px;
  border-radius: 10px;
  position: relative;
}
.map_box ul {
  position: absolute;
  top:10px;
  left: 10px;
  list-style: none;
  margin: 0;
  padding:0px;
  z-index: 100;
}
.map_box ul li{
  width: 90px;
  height: 25px;
  border-radius: 0 100px 100px 0;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #fff;
  font-size: 13px;
  line-height: 25px;
  text-align: right;
  padding-right: 10px;
  z-index: 100;
  background: #1e3b88;
  cursor: pointer;
}
.defaults{
  position: relative;
}
.defaults div {
  padding-right: 20px;
}
.defaults img{
  position: absolute;
  left: 8px;
  top: 6px;
  width: 12px;
  height: 12px;
}
.defaults_2 div {
  background: rgba(00, 00, 00, 0.5);
  width: 220%;
  height: 25px;
  margin-top: -25px;
  z-index: 100;
  border-radius: 0 100px 100px 0;
  display: block;
  animation: dong1 0.5s;
  overflow: hidden;
}
@keyframes dong1 {
  0% {
    width: 0%;
    color: #000;
  }
  100% {
    width: 220%;
    color: #fff;
  }
}
.defaults_1 div {
  display: none;
}
.map_box .map{
  width: 100%;
  height: 100%;
}
/deep/.amap-logo{
  left: -200px!important;
}
/deep/.amap-copyright{
  left:-500px !important;
}
/* .left, .right{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
} */
.left .left_top, .right .right_top {
  height: calc((100% - 20px)*0.4);
  width: 100%;
}
.left .left_center, .left .left_bottom, .right .right_center, .right .right_bottom{
  width: 100%;
  height: calc((100% - 20px)*0.3);
}
.title{
  width:100%;
  height: 18px;
  font-size: 16px;
  font-family:Adobe Heiti Std;
  font-weight:normal;
  color:rgba(255,252,1,1);
  text-align: center;
  line-height: 18px;
  margin-top: 10px;
}
/* 左结构  两个柱状图*/
.left_top {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: relative;
}
.left_top .left_top_left, .left_top .left_top_right{
  width: 50%;
}
.tab_table {
  width: 100%;
  height: calc(100% - 38px);
  margin-top: 10px;
  display: table;
}
.tab_table tr{
  width: 100%;
  font-size:12px;
  height: 13px;
  font-family:Adobe Heiti Std;
  color:rgba(255,255,255,1);
}
.tab_table tr:nth-child(1){
  font-weight: 400;
}
.tab_table tr td, .tab_table tr th{
  width: calc(100% / 7);
  max-width: 48px;
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与
  overflow:hidden;一起使用。*/
}
.before_month tr td, .before_month tr th{
  width: calc(100% / 6);
  width: 60px;
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与
  overflow:hidden;一起使用。*/
}
.tab_table tr td{
  text-align: center;
}
.right_top{
  position: relative;
  color: #fff;
}
.right_top .weather{
  width: 100%;
  height: calc((100% - 10px)/2);
  padding: 10px;
  position: relative;
}
.right_top .weather .temperature_times{
  width: 100%;
  height: 35px;
  position: relative;
  display: flex;
  flex-flow: row wrap;
}
.right_top .weather .temperature_times .temperature,
.right_top .weather .temperature_times .now_times{
  width: 50%;
  height:100%;
  display: inline-block;
}
.temperature img{
  width: 35px;
  height: 28px;
}
.temperature span{
  display: inline-block;
}
.temperature .weather_stadus {
  font-size:14px;
  font-family:SourceHanSansCN;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.temp_number{
  font-size:35px;
  font-family:SourceHanSansCN;
  font-weight:bold;
  color:rgba(255,255,255,1);
}
.now_times li {
  font-size:14px;
  font-family:SourceHanSansCN;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.now_times span{
  width: 100%;
  display: inline-block;
  text-align: center;
  font-size:18px;
  font-family:SourceHanSansCN;
  font-weight:bold;
  color:rgba(255,255,255,1);
}
.right_top .weather ul{
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.list_weather {
  width: 100%;
  margin-top: 20px!important;
}
.list_weather li{
  position: relative;
  height: 15px;
  line-height: 15px;
  border-radius: 15px;
  width: calc((100% - 15px)/4);
  margin-right: 5px;
  background-color: #A0A0BF;
  font-size:8px;
  font-family:SourceHanSansCN;
  font-weight:400;
  color:rgba(255,255,255,1);
  text-align: center;
}
.list_weather li img{
  width:10px;
  height:10px;
  margin-right: 3px;
}
.right_top .real_time ul{
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.right_top .real_time{
  width: 100%;
  height: calc((100% - 10px)/2);
  margin-top: 10px;
}
.people_flow{
  position: relative;
  width: 100%;
  height: calc((100% - 38px));
  padding: 10px 30px 10px 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 10px;
}
.people_flow ul li {
  text-align: left;
  width: 45%;
  font-size:9px;
  font-family:Adobe Heiti Std;
  font-weight:normal;
  color:rgba(0,160,233,1);
}
.people_flow ul li .numberof{
  font-size:12px;
  font-family:Adobe Heiti Std;
  font-weight:normal;
  color:#FFFC01;
}
</style>

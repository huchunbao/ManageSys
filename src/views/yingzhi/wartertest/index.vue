<template><!--生态廊道水质监测-->
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">生态廊道水质监测</div>
    </div>
    <div class="bg_img"></div>
    <div class="echarts_box">
      <div class="left">
        <el-amap
          class="map map_box"
          :vid="'amap-vue'"
          :zoom="zoom"
          :center="center"
          :events="events"
          :amap-manager="amapManager"
        ></el-amap>
      </div>
      <div class="right">
        <div class="top">
          <div class="title">今日水量监测统计</div>
          <div class="chart_title">
            <span class="into">总进水量占比</span>
            <span class="out">总出水量占比</span>
          </div>
          <fourcorners :showimg="false"></fourcorners>
          <chart-double-ring :getdata="doublering"></chart-double-ring>
        </div>
        <div class="bottom">
          <fourcorners :showimg="false"></fourcorners>
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
          <ul class="times">
            <li v-for=" (val,index) in times" :key="index">
              <span class="opa"></span>
              <span class="time">{{ val }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import daoy from '../daoyou.vue'
import fourcorners from '../components/fourcorners'
import ChartDoubleRing from '../components/ChartDoubleRing'
import VueAMap from 'vue-amap'

var amapManager = new VueAMap.AMapManager()
export default {
  name: 'About',
  components: {
    daoy,
    fourcorners,
    ChartDoubleRing
  },
  data() {
    return {
      table_list: [
        {
          marker: '月满酒楼南',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125
        },
        {
          marker: '月满酒楼北',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125
        },
        {
          marker: '湿地公园北',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125
        },
        {
          marker: '湿地公园南',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125
        },
        {
          marker: '陶然田社北',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125
        },
        {
          marker: '陶然田社南',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          into: 125,
          out: 125
        }
      ],
      ul_list: [],
      src_not: require('../../../assets/yingzhi/notok.png'),
      src_ok: require('../../../assets/yingzhi/okgreen.png'),
      zoom: 11, // 初始化地图层级
      center: [100.194439, 25.90931], // 初始化地图中心点
      // mapStyle1: 'amap://styles/whitesmoke',
      amapManager,
      events: {},
      doublering: { // 双环状图数据
        id: 'doublering',
        series1: [],
        series2: [],
        legend1: [],
        legend2: [],
        width: '100%',
        height: 'calc(100% - 27px)'
      },
      times: ['00:00', '04:00', '08:00', '12:00', '16:00', '22:00']
    }
  },
  computed: {},
  watch: {
  },
  mounted() {
    this.doublering.series1 = [
      { 'name': '月满西楼南', 'value': 333 },
      { 'name': '月满西楼北', 'value': 32 },
      { 'name': '湿地公园北', 'value': 444 },
      { 'name': '湿地公园南', 'value': 32 },
      { 'name': '陶然田社北', 'value': 355 },
      { 'name': '陶然田社南', 'value': 32 }
    ]
    this.doublering.series2 = [
      { 'name': '月满西楼南', 'value': 234 },
      { 'name': '月满西楼北', 'value': 252 },
      { 'name': '湿地公园北', 'value': 55 },
      { 'name': '湿地公园南', 'value': 235 },
      { 'name': '陶然田社北', 'value': 423 },
      { 'name': '陶然田社南', 'value': 33 }
    ]
    this.doublering.legend1 = ['月满西楼南', '月满西楼北', '湿地公园北']
    this.doublering.legend2 = ['湿地公园南', '陶然田社北', '陶然田社南']
  },
  methods: {
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
  flex-direction: row;
  justify-content: space-between;
}
.echarts_box .left{
  width: calc((100% - 8.5px)*0.6);
  height: 100%;
}
/deep/.amap-logo{
  left: -200px!important;
}
/deep/.amap-copyright{
  left:-500px !important;
}
.echarts_box .right{
  width: calc((100% - 8.5px)*0.4);
  height: 100%;
}
.right .top{
  position:relative;
  width: 100%;
  height:calc((100% - 10px)*0.45);
  padding: 10px 9px 10px 9px;
}
.right .bottom{
  position:relative;
  margin-top: 10px;
  width: 100%;
  height:calc((100% - 10px)*0.55);
  padding: 10px 9px 10px 9px;
}
.right .top .title, .right .bottom .title{
  width: 100%;
  text-align: center;
  font-size:15px;
  font-family:Adobe Heiti Std;
  font-weight:normal;
  color:rgba(255,252,1,1);
}
.chart_title{
  width: 100%;
  height: 10px;
  position: relative;
}
.chart_title span{
  position: absolute;
  display: inline-block;
  font-size:9px;
  font-family:Adobe Heiti Std;
  font-weight:normal;
  color:rgba(255,255,255,1);
  line-height:19px;
}
.chart_title .into{
  left: 18%;
  top: 0;
}
.chart_title .out{
  right: 18%;
  top: 0 ;
}
.tab_table {
  width: 100%;
  height: calc(100% -17px -17px - 20px);
  margin-top: 10px;
}
.tab_table tr{
  width: 100%;
  height: 20px;
  font-size:12px;
  font-family:Adobe Heiti Std;
  color:rgba(255,255,255,1);
}
.tab_table tr:nth-child(1){
  font-weight: 400;
}
.tab_table tr td{
  text-align:center;
}
.times {
  width: 100%;
  height:20px;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  list-style: none;
  margin: 15px 0 0 0 ;
  padding: 0;
}
.times li {
  position: relative;
  width: 80px;
  height: 20px;
  border-radius:3px;
}
.times li span{
  display: inline-block;
}
.times li .time{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height:17px;
  font-size:9px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
  letter-spacing:2px;
  border-radius: 3px;
}
.times li .opa{
  position:absolute;
  top: 0;
  left:0;
  width:100%;
  height:100%;
  border-radius:3px;
  background:#5B7AB0;
  opacity: 0.4;
  z-index: -1;
}
.times li:nth-child(3) .time{
  background: #fff;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(0,0,0,1);
}
</style>

<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">设备统计</div>
    </div>
    <div class="bg_img"></div>
    <div class="echarts_box">
      <div class="top">
        <div class="top_left">
          <fourcorners></fourcorners>
          <div class="echart_top_left">
            <div class="title">监控点在线情况</div>
            <div class="topleft">
              <line-clomn :getdata="data_lineclomn"></line-clomn>
            </div>
          </div>
        </div>
        <div class="top_right">
          <fourcorners></fourcorners>
          <div class="title">设备类型占比</div>
          <div class="topright">
            <chart-pie :getdata="pie"></chart-pie>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_left">
          <fourcorners></fourcorners>
          <div class="title">设备状态统计</div>
          <div class="bottomleft">
            <echart-ring :getdata="chartring"></echart-ring>
          </div>
        </div>
        <div class="bottom_right">
          <fourcorners></fourcorners>
          <div class="title">设备同分布统计</div>
          <div class="bottomright">
            <echar-clomn-thtee :getdata="clomnthree"></echar-clomn-thtee>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import daoy from '../daoyou.vue'
import fourcorners from '../components/fourcorners'
import LineClomn from '../components/CharLineclomn'
import ChartPie from '../components/CharPie'
import EchartRing from '../components/EchartRing'
import EcharClomnThtee from '../components/EcharClomnThtee'
export default {
  name: 'About',
  components: {
    daoy,
    fourcorners,
    LineClomn,
    ChartPie,
    EchartRing,
    EcharClomnThtee
  },
  data() {
    return {
      data_lineclomn: {
        id: 'lineclomn',
        height: '100%',
        width: '100%',
        legend: [],
        datay1: [],
        datay2: [],
        datax: []
      },
      pie: {
        id: 'chartspie',
        datalist: [],
        height: '100%',
        width: '100%',
        legend: []
      },
      chartring: {
        id: 'cahrtring',
        series: [],
        legend: [],
        height: '100%',
        width: '100%'
      },
      clomnthree: {
        id: 'clomnthree',
        height: '100%',
        width: '100%',
        legend: [],
        series_data: [],
        datax: [],
        color: [],
        row_nums: 2, // x轴每行几个字
        x_name: '',
        y_name: '分布',
        xyline_color: '#16C7FB', // xy轴颜色
        font_color: '#fff', // xy轴字体颜色
        legend_color: '#16C7FB', // legend字体颜色
        stack: '' // 若series 下stack  为空或者null---多柱状图  若相同且不为null---多柱状图
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // 柱状折线图
    this.data_lineclomn.legend = ['在线数', '在线率']
    this.data_lineclomn.datay1 = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    this.data_lineclomn.datay2 = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    this.data_lineclomn.datax = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    // 饼图数据
    this.pie.datalist = [
      { value: 335, name: '监控' },
      { value: 310, name: '服务器' },
      { value: 274, name: '广播' },
      { value: 235, name: 'LED' },
      { value: 400, name: '报警' }
    ]
    this.pie.legend = ['监控', '服务器', '广播', 'LED', '报警']

    // 环状图
    this.chartring.legend = ['在线', '离线', '未知']
    this.chartring.series = [
      { 'name': '在线', 'value': 333 },
      { 'name': '离线', 'value': 32 },
      { 'name': '未知', 'value': 444 }
    ]
    // 三柱状图
    this.clomnthree.legend = ['灵眸', '摄像头', '大屏', '水质监测']
    this.clomnthree.datax = ['智能跑道', '客栈南端', '客栈北端', '湿地公园']
    var data1 = [23.2, 25.6, 76.7, 0]
    var data2 = [33, 70.7, 175.6, 28.2]
    var data3 = [66, 23, 77, 58.6]
    var data4 = [111, 66.7, 0, 77.2]
    this.clomnthree.series_data = [data1, data2, data3, data4]
    this.clomnthree.color = ['#4BF1A4', '#63EDF7', '#6367F8', '#047DFF']
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
  flex-direction: column;
  justify-content: space-between;
}
.echarts_box .top ,.echarts_box .bottom{
  width: 100%;
  height: calc((100% - 10.5px)/2);
  display:flex;
  justify-content: space-between;
}
.echarts_box .top .top_left, .echarts_box .top .top_right, .echarts_box .bottom .bottom_left,  .echarts_box .bottom .bottom_right{
  position: relative;
  width: calc((100% - 25.5px)/2);
  padding: 15px;
}
.echarts_box .top .top_left .echart_top_left{
  height: 100%;
}
.title{
  width: 100%;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size:16px;
  font-family:Adobe Heiti Std;
  font-weight: 400;
  color:rgba(255,252,1,1);
  margin-top: 12.5px;
}
.topleft, .topright, .bottomleft, .bottomright{
  width: 100%;
  height: calc(100% - 28.5px);
}
</style>

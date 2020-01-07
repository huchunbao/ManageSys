<template>
  <div class="more">
    <!-- 头部 -->
    <div class="header">
      <daoy class="daoy"></daoy>
      <div class="header_text">运营大数据中心</div>
    </div>
    <!-- 左侧 -->
    <div class="body" style="margin-left:0.5%;">
      <!-- 人流 -->
      <div class="body_li1 body_li">
        <div class="li_header">洱海人流热力图</div>
        <div class="tubiao">
          <img src="../../assets/yingzhi/tubiao.png" alt="" style="width:15%;" srcset="">
        </div>
        <div id="reli" class="li_body"></div>
      </div>
      <!-- 人群 -->
      <div class="body_li2 body_li">
        <!-- 名字 -->
        <div class="li_header">人群画像</div>
        <!-- tab -->
        <div class="li_tab" style="width:100px;">
          <div :class="renqtab==1?'z':''" @click="sex(1)">性别</div>
          <div :class="renqtab==0?'z':''" @click="sex(0)">年龄</div>
        </div>
        <!-- 内容 -->
        <div ref="renqun" class="li_body"></div>
      </div>
      <!-- 能耗 -->
      <div class="body_li2 body_li">
        <div class="li_header">设备能耗排行</div>
        <div class="li_tab" style="width:100px;">
          <div :class="shetab==1?'z':''" @click="sex1(1)">本年</div>
          <div :class="shetab==0?'z':''" @click="sex1(0)">本月</div>
        </div>
        <div ref="shebei" class="li_body"></div>
        <div ref="shebei1" class="li_body"></div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="body ditu">
      <div class="li_header">洱海廊道服务设施分布图</div>
      <div id="amapa" class="li_body" style="height:90%;margin-top:10px; border-radius: 10px;"></div>
      <div class="dian">
        <div
          :class="ce == 'jing1' ? 'hengd2' : 'hengd1'"
          class="hengd"
          @click="jing1()"
        >
          驿站
          <div>信息:5个</div>
        </div>
        <div
          :class="ce == 'jing2' ? 'hengd2' : 'hengd1'"
          class="hengd"
          @click="jing2()"
        >
          智能跑道
          <div>显示</div>
        </div>
        <div
          :class="ce == 'jing3' ? 'hengd2' : 'hengd1'"
          class="hengd"
          @click="jing3()"
        >
          垃圾桶
          <div>信息:2个</div>
        </div>
        <div
          :class="ce == 'jing4' ? 'hengd2' : 'hengd1'"
          class="hengd"
          @click="jing4()"
        >
          公厕
          <div>信息:3个</div>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="body" style="margin-right:0px;">
      <!-- 天气 -->
      <div class="body_li1 body_li">
        <div style="float:left;" class="wend">{{ wen }}℃</div>
        <div style="float:right;" class="riqi">{{ today }} <p style="margin-left:40%;">{{ shij }}</p></div>
        <div style="float:right;" class="kongqi">实时空气质量指数（AQI）<p style="margin-left:10%;">更新{{ today }}</p></div>
        <img src="../../assets/yingzhi/kongqiz.png" alt="" style="width:85%;height:85%;margin-left:7.5%;margin-top:5%;" srcset="">
      </div>
      <!-- 能耗情况 -->
      <div class="body_li2 body_li">
        <img src="../../assets/yingzhi/biaopan.png" alt="" style="width:90%;height:90%; margin-left:5%;margin-top:3  %;" srcset="">
      </div>
      <!-- 能源趋势 -->
      <div class="body_li2 body_li">
        <div class="li_header">能源消耗</div>
        <div v-if="qutab==0" class="li_jin" style="width:100px;left: 5%;">
          <div>总金额: 1.2万元</div>
          <div>总消耗: 10000kwh</div>
        </div>
        <div class="li_tab" style="width:200px;left: 45%;">
          <div :class="qutab==1?'z':''" @click="sex2(1)">能源趋势</div>
          <div :class="qutab==0?'z':''" @click="sex2(0)">电能月消耗情况</div>
        </div>
        <div ref="qushi" class="li_body"></div>
      </div>
    </div>
  </div>
</template>

<script>
import daoy from './daoyou.vue'
import echarts from 'echarts'
export default {
  name: 'More',
  components: {
    daoy
  },
  data() {
    return {
      ce: 'jing1',
      reli: '',
      erhai: null,
      marker: [],
      wen: null,
      shi: null,
      today: null,
      shij: null,
      // 路线图
      polyline: [],
      // 人群画像
      renq: null,
      renqtab: 1,
      renqdata: {
        color: ['#fd04de', '#03e8fd'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        textStyle: {
          color: '#e2027e'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          textStyle: {
            color: '#e2027e'
          }
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
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
        calculable: true,
        series: [
          {
            //   name:'访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            itemStyle: {
              emphasis: {
                label: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: [
              { value: 38.32, name: '女性' },
              { value: 61.68, name: '男性' }
            ]
          }
        ]
      },
      // 设备能耗
      sheb: null,
      shetab: 0,
      shedata: {
        color: ['#16c7fb'],
        textStyle: {
          color: '#fff'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6', '设备7'],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1589c4'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1589c4'
              }
            }
          }
        ],
        series: [
          {
            name: '能耗',
            type: 'bar',
            barWidth: '20%',
            data: [390, 334, 330, 220, 200, 150, 100]
          }
        ]
      },
      // 能源趋势
      qushi: null,
      qutab: 0,
      qushidata: {
        color: ['#3398DB', '#eacd72'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        textStyle: {
          color: '#fff'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1589c4'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#1589c4'
              }
            }
          }
        ],
        series: [
          {
            name: '金额',
            type: 'bar',
            barWidth: '20%',
            data: [10, 52, 200, 334, 390, 330, 300, 120, 340, 452, 134, 214]
          },
          {
            name: '消耗',
            type: 'bar',
            barWidth: '20%',
            data: [15, 22, 270, 234, 396, 340, 213, 423, 132, 241, 321, 120]
          }
        ]
      }
    }
  },
  mounted() {
    // this.login()
    this.shijf()
    setInterval(this.shijf(), 1000)
    this.relimap()
    this.erhaif()
    this.renq = echarts.init(this.$refs.renqun)
    this.rqhx()
    this.qushi = echarts.init(this.$refs.qushi)
    this.qus()
    this.sheb = echarts.init(this.$refs.shebei)
    this.sbnh()
    // this.$axios({
    //   url: 'http://192.168.1.17:8081/notifyDate/getTemperatureNotify',
    //   method: 'get'
    // }).then(response => {
    //   console.log(response, 1234)
    //   this.wen = (response.data.data.dwTemperature * 1) / 10
    //   this.shi = (response.data.data.dwHumidity * 1) / 10
    // })
  },
  methods: {
    // 时间
    shijf() {
      var now1 = new Date()
      // 格式化日，如果小于9，前面补0
      var day = ('0' + now1.getDate()).slice(-2)
      // 格式化月，如果小于9，前面补0
      var month = ('0' + (now1.getMonth() + 1)).slice(-2)
      // let str = "今天是星期" + l[d];
      var str = '星期' + '日一二三四五六'.charAt(new Date().getDay())
      // 拼装完整日期格式
      this.today = now1.getFullYear() + '年' + '' + month + '月' + '' + day + '日' + '' + str
      var fen = now1.getMinutes() < 10 ? '0' + now1.getMinutes() : now1.getMinutes()
      this.shij = now1.getHours() + ':' + fen
    },
    // 热力地图绘制
    relimap() {
      var the = this
      the.reli = new AMap.Map('reli', {
        resizeEnable: true,
        center: [100.169978, 25.786059],
        zoom: 9
      })
      var heatmap
      var styleName = 'amap://styles/' + 'darkblue'
      this.reli.setMapStyle(styleName)
      the.reli.plugin(['AMap.Heatmap'], function() {
        heatmap = new AMap.Heatmap(the.reli, {
          radius: 35, // 给定半径
          opacity: [0, 0.8]
        })
        heatmap.setDataSet({
          data: [
            {
              lng: 100.244161,
              lat: 25.835082,
              count: 8
            },
            {
              lng: 100.236945,
              lat: 25.831451,
              count: 5
            },
            {
              lng: 100.236973,
              lat: 25.831456,
              count: 10
            },
            {
              lng: 100.236945,
              lat: 25.831467,
              count: 80
            },
            {
              lng: 100.232345,
              lat: 25.831451,
              count: 5
            },
            {
              lng: 100.276973,
              lat: 25.831366,
              count: 10
            },
            {
              lng: 100.237845,
              lat: 25.832347,
              count: 80
            }
          ],
          max: 100
        })
      })
    },
    // 洱海地图
    erhaif() {
      var the = this
      the.erhai = new AMap.Map('amapa', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 11, // 初始化地图层级
        center: [100.266116, 25.643582] // 初始化地图中心点
      })
      this.erhai.setFitView()
      this.jing1()
    },
    rqhx() {
      this.renq.resize()
      this.renq.setOption(this.renqdata)
    },
    qus() {
      console.log()
      this.qushi.resize()
      this.qushi.setOption(this.qushidata)
    },
    sbnh() {
      this.sheb.resize()
      this.sheb.setOption(this.shedata)
    },
    // 人群画像
    sex(i) {
      this.renqdata.color = [
        '#fd04de',
        '#03e8fd',
        '#fc8622',
        '#e8fd5a',
        '#63fd9b'
      ]
      console.log(i)
      this.renqtab = i
      if (i) {
        this.renqdata.legend.data = ['男', '女']
        this.renqdata.series[0].data = [
          { value: 335, name: '男' },
          { value: 310, name: '女' }
        ]
      } else {
        this.renqdata.legend.data = [
          '0~17岁',
          '17~24岁',
          '24~35岁',
          '35~45岁',
          '45岁+'
        ]
        this.renqdata.series[0].data = [
          { value: 335, name: '0~17岁' },
          { value: 310, name: '17~24岁' },
          { value: 234, name: '24~35岁' },
          { value: 135, name: '35~45岁' },
          { value: 1548, name: '45岁+' }
        ]
      }
      console.log(this.renqdata)
      this.rqhx()
    },
    // 设备能耗
    sex1(i) {
      console.log(i)
      this.shetab = i
      if (i) {
        this.shedata.series[0].data = [990, 934, 930, 820, 800, 750, 700]
      } else {
        this.shedata.series[0].data = [390, 334, 330, 220, 200, 150, 100]
      }
      console.log(this.shedata)
      this.sbnh()
    },
    // 设备趋势
    sex2(i) {
      this.qutab = i
      if (i === 1) {
        this.qushidata.xAxis = [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ]
        this.qushidata.series = [
          {
            name: '消耗',
            type: 'bar',
            barWidth: '20%',
            data: [423, 123, 451, 135, 123, 321, 423, 123, 234, 314, 243, 214]
          },
          {
            name: '金额',
            type: 'bar',
            barWidth: '20%',
            data: []
          }
        ]
      } else {
        this.qushidata.xAxis = [
          {
            type: 'category',
            data: [
              '8月',
              '9月',
              '10月',
              '11月',
              '12月',
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月'
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ]
        this.qushidata.series = [
          {
            name: '金额',
            type: 'bar',
            barWidth: '20%',
            data: [10, 52, 200, 334, 390, 330, 300, 120, 340, 452, 134, 214]
          },
          {
            name: '消耗',
            type: 'bar',
            barWidth: '20%',
            data: [15, 22, 270, 234, 396, 340, 213, 423, 132, 241, 321, 120]
          }
        ]
      }
      this.qus()
    },
    jing1() {
      this.erhai.remove(this.marker)
      this.erhai.remove(this.polyline)
      this.erhai.setFitView()
      this.ce = 'jing1'
      this.marker = []
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/yizhan.png'),
          position: [100.397094, 25.944405]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/yizhan.png'),
          position: [100.412715, 25.944227]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/yizhan.png'),
          position: [100.405162, 25.930489]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/yizhan.png'),
          position: [100.424731, 25.929253]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/yizhan.png'),
          position: [100.383189, 25.923078]
        })
      )
      this.erhai.add(this.marker)
      this.erhai.setFitView()
    },
    jing2() {
      this.erhai.remove(this.marker)
      this.erhai.setFitView()
      this.ce = 'jing2'
      var lineArr = [
        [100.183865, 25.683261],
        [100.179058, 25.693858],
        [100.176655, 25.698344],
        [100.172535, 25.703912]
      ]
      this.polyline = new AMap.Polyline({
        path: lineArr, // 设置线覆盖物路径
        strokeColor: '#3366FF', // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 5, // 线宽
        strokeStyle: 'solid', // 线样式
        strokeDasharray: [10, 5] // 补充线样式
      })
      this.erhai.add(this.polyline)
      this.erhai.setFitView()
    },
    jing3() {
      this.erhai.remove(this.marker)
      this.erhai.remove(this.polyline)
      this.erhai.setFitView()
      this.ce = 'jing3'
      this.marker = []
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/laji.png'),
          position: [100.47726, 25.912425]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/laji.png'),
          position: [100.48507, 25.917211]
        })
      )
      this.erhai.add(this.marker)
      this.erhai.setFitView()
    },
    jing4() {
      this.erhai.remove(this.marker)
      this.erhai.remove(this.polyline)
      this.erhai.setFitView()
      this.ce = 'jing4'
      this.marker = []
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/cesuo.png'),
          position: [100.325253, 25.622627]
        })
      )
      this.marker[0].setTitle('当前可用5个')
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/cesuo.png'),
          position: [100.340188, 25.622759]
        })
      )
      this.marker[1].setTitle('当前可用2个')
      this.marker.push(
        new AMap.Marker({
          icon: require('../../assets/yingzhi/cesuo.png'),
          position: [100.347226, 25.618734]
        })
      )
      this.marker[2].setTitle('当前可用0个')
      this.erhai.add(this.marker)
      this.erhai.setFitView()
    }
  }
}
</script>

<style scoped>
.more {
  height: 100vh;
  color: #feffff;
  overflow: hidden;
  background-image: url('../../assets/yingzhi/bg_img.png');
  background-size: 100% 100%;
}
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 5px;
  background-image: url("../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
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
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
  z-index: 1000000;
}
/* 主体 */
.body {
  width: 32%;
  height: 90%;
  float: left;
  margin-right: 1.5%;
}
.ditu {
  height: 89.5%;
  background: rgba(20, 23, 71, 0.5);
  filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F141747,endcolorstr=#7F141747);
  border-radius: 10px;
}
.li_header {
  width: 100%;
  height: 30px;
  color: yellow;
  text-align: center;
  font-weight: 800;
  line-height: 30px;
  font-size: 15px;
  font-family: "宋体";
}
.li_body {
  width: 90%;
  height: 80%;
  margin-left: 5%;
  margin-top: -5px;
}
/* 主体 */
.body_li1 {
  width: 90%;
  height: 38%;
  margin-left: 5%;
  background: rgba(31, 58, 137, 0.5);
  filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F1f3a89,endcolorstr=#7F1f3a89);
  border: 1px solid #00a0e9;
}
.body_li2 {
  width: 90%;
  height: 30%;
  margin-left: 5%;
  background: rgba(31, 58, 137, 0.5);
  filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F1f3a89,endcolorstr=#7F1f3a89);
  margin-top: 1%;
  border: 1px solid #00a0e9;
}
/* tab切换 */
.li_tab {
  border-radius: 5px;
  border: 1px solid #15c9f9;
  overflow: hidden;
  z-index: 10000000000;
  position: relative;
  left: 70%;
}
.li_tab div {
  float: right;
  width: 50%;
  padding: 3px 10px;
  font-size: 10px;
  background: #223a8b;
  text-align: center;
  cursor: pointer;
}
.li_tab .z {
  background: #141848;
}
.li_jin {
  float: left;
  background: #223a8b;
  height: 0;
  z-index: 100;
  margin-top: -2%;
  margin-left: 15%;
  font-size: 5px;
}
.li_jin div {
  font-size: 10px;
}
.wend {
  position: relative;
  left: 20px;
  top: 20px;
  font-size: 30px;
  height: 0px;
  font-weight: 600;
}
.riqi {
  height: 0px;
  position: relative;
  right: 30px;
  top: 20px;
  font-weight: 500;
}
.kongqi {
  height: 0px;
  position: relative;
  right: 50%;
  top: 45%;
  font-weight: 500;
  font-size: 15px;
}
.kongqi p {
  font-size: 10px;
}

.dian {
  width: 100px;
  position: relative;
  top: -90%;
  left: 5%;
  z-index: 9999;
  cursor: pointer;
}
.hengd {
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
  z-index: 9999;
  background: #1e3b88;
}
.hengd div {
  padding-right: 20px;
}
.hengd2 div {
  background: rgba(00, 00, 00, 0.5);
  width: 220%;
  height: 25px;
  margin-top: -25px;
  z-index: 9999;
  border-radius: 0 100px 100px 0;
  display: block;
  animation: dong1 0.5s;
}
@keyframes dong1 {
  0% {
    width: 10%;
    color: #000;
  }
  100% {
    width: 220%;
    color: #fff;
  }
}
.hengd1 div {
  display: none;
}
/* 地图图表 */
.tubiao {
  height: 0;
  position: relative;
  left: 6.5%;
  z-index: 1000;
}
</style>

<template>
  <div>
    <div class="about">
      <div class="header">
        <daoy class="daoy"></daoy>

        <!-- 导航栏 -->

        <div class="header_text">运营大数据中心</div>
      </div>
      <!-- 热力图 -->
      <div id="container"></div>
      <!-- 饼状图 -->
      <div class="ku">
        <div
          style="float:right; position:absolute; bottom:-50px; left:320px; z-index:999;"
        >
          <button @click="sex">性别</button>
          <button @click="age">年龄</button>
        </div>
        <div
          class="small_title"
          style="font-size:16px;  margin-left:150px; fot-weight:600; color:#fffc00; padding-top:15px;  "
        >
          人群画像(1km示范段)
        </div>
        <div class="spring_con">
          <div
            id="turnover"
            style="width: 415px;height: 170px; margin-top:5px;"
          ></div>
        </div>
      </div>
      <!-- 柱状图 -->
      <div class="ku1">
        <div
          style="float:left; position:absolute;margin-top:20px;  left:20px; z-index:999;"
        >
          <button @click="yer">本年</button>
          <button @click="month">本月</button>
        </div>
        <div
          class="small_title"
          style="font-size:16px;  margin-left:130px; fot-weight:600; color:#fffc00; padding-top:15px;"
        >
          设备能耗排行(1km示范段)
        </div>

        <div class="spring_con">
          <div
            id="hao"
            style="width: 410px;height: 280px; margin-top:-35px; "
          ></div>
        </div>
      </div>
      <!--点标记  -->
      <div class="dian">
        <div
          class="hengd"
          :class="ce == 'jing1' ? 'hengd2' : 'hengd1'"
          @:click="jing1()"
        >
          驿站
          <div>信息:5个</div>
        </div>
        <div
          class="hengd"
          :class="ce == 'jing2' ? 'hengd2' : 'hengd1'"
          @:click="jing2()"
        >
          智能跑道
          <div>信息:3个</div>
        </div>
        <div
          class="hengd"
          :class="ce == 'jing3' ? 'hengd2' : 'hengd1'"
          @:click="jing3()"
        >
          垃圾桶
          <div>信息:2个</div>
        </div>
        <div
          class="hengd"
          :class="ce == 'jing4' ? 'hengd2' : 'hengd1'"
          @:click="jing4()"
        >
          公厕
          <div>信息:3个</div>
        </div>
      </div>
      <div id="kfk"></div>
      <div class="kongqi">
        <div style="display:flex;">
          <h1 style="font-size:25px;">洱海</h1>
          <h5 style="margin-left:210px;">实时空气质量指数(AQI)</h5>
          <br>
        </div>
        <h5 style="position:relative; left:259px;  top:-20px;">
          更新{{ data1.date }}
        </h5>
        <p style="margin-top:-50px ; margin-left:55px;">{{ data.date }}</p>
        <br>
        <div class="wenshidiv">
          <div class="wenl">
            温度：
            <div class="waijin">
              <div
                class="jin"
                :style="
                  'height:100%;background:#142581;width:' + wenshi.wen + '%;'
                "
              ></div>
            </div>
            {{ wenshi.wen }}
          </div>
          <div class="wenl">
            湿度：
            <div class="waijin">
              <div
                class="jin"
                :style="
                  'height:100%;background:#142581;width:' + wenshi.shi + '%;'
                "
              ></div>
            </div>
            {{ wenshi.shi }}
          </div>
        </div>
        <div class="yib">
          <p
            style="white-space:nowrap; font-size:16px; color:#fffc01; padding-left:90px; margin-top:10px;"
          >
            设备日均能耗情况(1km示范段)
          </p>
          <div class="spring_con">
            <div
              id="biao"
              style="width: 380px;height: 240px;  margin-left:-375px; margin-top:20px;"
            ></div>
          </div>
          <div class="spring_con">
            <div
              id="biao1"
              style="width: 380px;height: 240px;  margin-left:-160px; margin-top:20px;"
            ></div>
          </div>
          <div class="spring_con">
            <div
              id="biao2"
              style="width: 380px;height: 240px;   margin-top:190px;  position:relative; left:-600px; "
            ></div>
          </div>
          <div class="spring_con">
            <div
              id="biao3"
              style="width: 380px;height: 240px;   margin-top:190px;  position:relative; left:-760px;"
            ></div>
          </div>
        </div>

        <div class="zxt">
          <div class="spring_con">
            <p
              style="font-size:17px;  text-align:center; margin-top:15px;  color:#fffb02;"
            >
              近12个月电能月消耗情况(1km示范段)
            </p>
            <div style="float:left; position:absolute;z-index:999; left:20px;">
              <button style="width:140px;" @click="dian">电能月消耗情况</button>
              <button style="width:100px;" @click="yuan">能源趋势</button>
            </div>
            <div
              id="tu"
              style="width: 470px;height: 440px; margin-left:6px; margin-top:-20px;"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import daoy from './daoyou.vue'
export default {
  components: {
    daoy
  },
  data() {
    return {
      map: null,
      ce: 'jing1',
      marker: null,
      dh: false,
      date: '',
      data: {
        date: null
      },
      data1: {
        date: null
      },
      data2: {
        username: 'admin',
        password: '111111'
      },
      // 温湿度
      wenshi: {
        wen: 0,
        shi: 0
      },

      // 人群
      turnover: null,
      // 人群数据
      niandata: {
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
      // 能耗
      hao: null,
      // 能耗数据
      haodata: {
        color: ['#16c7fb'],

        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: '#fff'
        },
        legend: {
          data: [],
          textStyle: {
            color: '#feffff'
          }
        },
        toolbox: {
          show: true
        },

        calculable: true,
        xAxis: [
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
        yAxis: [
          {
            type: 'category',
            data: [
              '设备1',
              '设备2',
              '设备3',
              '设备4',
              '设备5',
              '设备6',
              '设备7'
            ],
            lineStyle: {
              color: '#fff'
            }
          }
        ],
        series: [
          {
            type: 'bar',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      },
      // 电能
      tu: null,
      // 电能消耗数据
      tudata: {
        color: ['#2f7ffa'],
        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: '#fff'
        },
        legend: {
          data: ['度数']
        },
        toolbox: {},
        // 电能消耗横轴
        xAxis: [
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
            ]
          },
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        // 电能消耗纵轴
        yAxis: [
          {
            type: 'value',
            axisLine: {
              // show: true,
              lineStyle: {
                color: '#1589c4'
              }
            }
          }
        ],
        // 电量消耗数值
        series: [
          {
            // name:'度数',
            type: 'bar',
            label: {},
            name: '2',
            data: [
              '1200',
              '2000',
              '1500',
              '1800',
              '2300',
              '1890',
              '2346',
              '1225',
              '2033',
              '2103',
              '1490',
              '1908'
            ],
            markPoint: {
              data: []
            },
            markLine: {
              data: []
            },
            barWidth: '10',
            radius: '70%'
          }

          // {
          //   // name:'金额',
          //   type: 'bar',
          //   name:'1',
          //   data: [
          //     '2200',
          //     '3000',
          //     '2500',
          //     '1800',
          //     '2600',
          //     '2890',
          //     '2346',
          //     '2225',
          //     '2033',
          //     '2103',
          //     '1890',
          //     '2908'
          //   ],
          //   markPoint: {
          //     data: []
          //   },
          //   markLine: {
          //     data: []
          //   },
          //   barWidth: '10',
          //   radius: '50%'
          // }
        ]
      }
    }
  },
  mounted() {
    console.log(this.$route)
    this.can = this.$route.query
    console.log(this.can)
    var now1 = new Date()
    // 格式化日，如果小于9，前面补0
    var day = ('0' + now1.getDate()).slice(-2)
    // 格式化月，如果小于9，前面补0
    var month = ('0' + (now1.getMonth() + 1)).slice(-2)
    // var str = '今天是星期' + l[d]
    var str = '星期' + '日一二三四五六'.charAt(new Date().getDay())

    // 拼装完整日期格式
    var today = now1.getFullYear() + '年' + '' + month + '月' + '' + day + '日' + '' + str
    // 完成赋值
    this.data.date = today
    console.log(this.$route)
    this.can = this.$route.query0
    console.log(this.can)
    // 登陆
    // this.login()
    this.fa()
    this.data1.date = today
    this.turnover = this.$echarts.init(document.getElementById('turnover'))
    this.turnoverf()
    this.hao = this.$echarts.init(document.getElementById('hao'))
    this.haof()
    this.biao()
    this.biao1()
    this.biao2()
    this.biao3()
    this.tu = this.$echarts.init(document.getElementById('tu'))
    this.tuf()

    var map = new AMap.Map('container', {
      resizeEnable: true,
      center: [116.418261, 39.921984],
      zoom: 11
    })

    if (!isSupportCanvas()) {
      alert(
        '热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~'
      )
    }
    // var heatmap
    map.plugin(['AMap.Heatmap'], function() {
    //   // 初始化heatmap对象
    //   heatmap = new AMap.Heatmap(map, {
    //     radius: 25, // 给定半径
    //     opacity: [0, 0.8]
    //   })

    //   // heatmap.setDataSet({
    //   //   data: [[]],
    //   //   max: 100
    //   // })
    })

    // 判断浏览区是否支持canvas
    function isSupportCanvas() {
      var elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    }
    this.map = new AMap.Map('kfk', {
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 11, // 初始化地图层级
      center: [100.266116, 25.643582] // 初始化地图中心点
    })
    this.marker = new AMap.Marker({
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      position: [100.191787, 25.906117]
    })
    this.map.add(this.marker)
    this.map.setFitView()
  },
  methods: {
    fa() {
      // var the = this
      // 温湿度
      // the.$axios({
      //     url: 'http://192.168.1.17:8081/notifyDate/getTemperatureNotify',
      //     method: 'get'
      //   })
      //   .then(response => {
      //     console.log(response, 1234)
      //     the.wenshi = {
      //       wen: (response.data.data.dwTemperature * 1) / 10,
      //       shi: (response.data.data.dwHumidity * 1) / 10
      //     }
      //   })
      // 请求报警信息
      // the.$axios({
      //   url: 'http://192.168.1.17:8081/notifyDate/getVigilanceNotify',
      //   method: 'get'
      // })
      // .then(response => {
      //   console.log(response, 12)
      //   the.baojing = response.data.data
      // })
      // var ddate = new Date()
      // var hao = ddate.getTime()
      // var kaihao = hao - 360000000

      // 3600000
      // 实时客流量
      // the.$axios({
      //   url:
      //     'http://192.168.1.17:8081/PassengerFlow/getPassengerFlow?startTime=' +
      //     kaihao +
      //     '&endTime=' +
      //     hao +
      //     '&groupId',
      //   method: 'get'
      // })
      // .then(response => {
      //   var dat = JSON.parse(response.data.data)
      //   the.potion.series[0].data = [
      //     dat.data.enteringNumber,
      //     dat.data.leaveNumber,
      //     dat.data.baseHold
      //   ]
      //   this.keliu.setOption(this.potion)
      // })
      // this.$axios({
      //   url: 'http://192.168.1.17:8081/dispatchtype/getSysDispatchType',
      //   method: 'get'
      // }).then(response => {
      //   console.log(response)
      // })
    },
    login() {
      // var qs = require('querystring')
      // var data = { username: 'admin', password: '111111' }
      // this.$axios({
      //   url: 'http://192.168.1.17:8081/user/login',
      //   method: 'post',
      //   data: qs.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   console.log(response, 123)
      // })
    },
    dhf() {
      this.dh = !this.dh
    },
    // 人像
    age() {
      this.niandata.color = [
        '#fd04de',
        '#03e8fd',
        '#fc8622',
        '#e8fd5a',
        '#63fd9b'
      ]
      this.niandata.series[0].data = [
        { value: 38.32, name: '0~17' },
        { value: 61.68, name: '17~24' },
        { value: 61.68, name: '24~35' },
        { value: 61.68, name: '35~50' },
        { value: 61.68, name: '50~70' }
      ]
      this.turnoverf()
    },
    sex() {
      this.niandata.color = ['#fd04de', '#03e8fd']
      this.niandata.series[0].data = [
        { value: 38.32, name: '女性' },
        { value: 61.68, name: '男性' }
      ]
      this.turnoverf()
    },
    turnoverf() {
      // 年龄
      this.turnover.resize()
      this.turnover.setOption(this.niandata)
    },
    // 人像结束
    // 能耗
    yer() {
      this.haodata.color = ['#04f594']
      this.haodata.series[0].data = [320, 302, 301, 334, 390, 330, 320]
      this.haof()
    },
    month() {
      this.haodata.color = ['#16c7fb']
      this.haodata.series[0].data = [120, 132, 101, 134, 90, 230, 210]
      this.haof()
    },
    haof() {
      this.hao.resize()
      this.hao.setOption(this.haodata)
    },
    biao() {
      var biao = this.$echarts.init(document.getElementById('biao'))
      biao.resize()
      window.addEventListener('resize', () => {
        biao.resize()
      })
      biao.setOption({
        color: ['#4f81bd', 'red'],
        tooltip: {
          trigger: 'axis',

          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        textStyle: {
          color: '#4f81bd'
        },

        legend: {},
        toolbox: {
          show: true
        },
        series: [
          {
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 20 }]
          }
        ]
      })
    },
    biao1() {
      var biao1 = this.$echarts.init(document.getElementById('biao1'))
      biao1.resize()
      window.addEventListener('resize', () => {
        biao1.resize()
      })
      biao1.setOption({
        color: ['#4f81bd', 'red'],

        tooltip: {
          trigger: 'axis',

          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        textStyle: {
          color: '#4f81bd'
        },

        legend: {},
        toolbox: {
          show: true
        },
        series: [
          {
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 40 }]
          }
        ]
      })
    },
    biao2() {
      var biao2 = this.$echarts.init(document.getElementById('biao2'))
      biao2.resize()
      window.addEventListener('resize', () => {
        biao2.resize()
      })
      biao2.setOption({
        color: ['#4f81bd', 'red'],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        textStyle: {
          color: '#4f81bd'
        },
        legend: {},
        toolbox: {
          show: true
        },
        series: [
          {
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 60 }]
          }
        ]
      })
    },
    //  转盘
    biao3() {
      var biao3 = this.$echarts.init(document.getElementById('biao3'))
      biao3.resize()
      window.addEventListener('resize', () => {
        biao3.resize()
      })
      biao3.setOption({
        color: ['#4f81bd', 'red'],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        textStyle: {
          color: '#4f81bd'
        },

        legend: {},
        toolbox: {
          show: true
        },
        series: [
          {
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 90 }]
          }
        ]
      })
    },
    // 电能消耗
    dian() {
      this.tudata.color = ['#2f7ffa']
      this.tudata.series[0].data = [
        '1200',
        '2000',
        '1500',
        '1800',
        '2300',
        '1890',
        '2346',
        '1225',
        '2033',
        '2103',
        '1490',
        '1908'
      ]
      this.tuf()
    },
    yuan() {
      this.tudata.color = ['#e2d936']
      this.tudata.series[0].data = [
        '2200',
        '3000',
        '2500',
        '1800',
        '2600',
        '2890',
        '2346',
        '2225',
        '2033',
        '2103',
        '1890',
        '2908'
      ]
      this.tuf()
    },
    tuf() {
      // 电量消耗
      console.log(this.tudata)
      this.tu.resize()
      this.tu.setOption(this.tudata)
    },
    jing1() {
      this.map.remove(this.marker)
      this.map.setFitView()
      this.ce = 'jing1'
      this.marker = []
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.397094, 25.944405]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.412715, 25.944227]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.405162, 25.930489]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.424731, 25.929253]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.383189, 25.923078]
        })
      )
      this.map.add(this.marker)
      this.map.setFitView()
    },
    jing2() {
      this.map.remove(this.marker)
      this.map.setFitView()
      this.ce = 'jing2'

      this.marker = []
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.162261, 25.6953135]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.181144, 25.690804]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.123122, 25.672549]
        })
      )
      this.map.add(this.marker)
      this.map.setFitView()
    },
    jing3() {
      this.map.remove(this.marker)
      this.map.setFitView()
      this.ce = 'jing3'
      this.marker = []
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.47726, 25.912425]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.48507, 25.917211]
        })
      )
      this.map.add(this.marker)
      this.map.setFitView()
    },
    jing4() {
      this.map.remove(this.marker)
      this.map.setFitView()
      this.ce = 'jing4'
      this.marker = []
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.325253, 25.622627]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.340188, 25.622759]
        })
      )
      this.marker.push(
        new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [100.347226, 25.618734]
        })
      )
      this.map.add(this.marker)
      this.map.setFitView()
    },
    tiao(i) {
      this.$router.push({
        path: i
      })
    }
  }
}
</script>

<style scoped>
html {
  background: #141848;
}
.yib {
  width: 453px;
  height: 400px;
  border: 1px solid #0f6ebe;
  display: flex;
  margin-top: 15px;
  overflow: hidden;
}

.zxt {
  border: 1px solid #0e7dc5;
  width: 453px;
  height: 450px;
  margin-top: 12px;
}

#kfk {
  width: 30%;
  height: 140vh;
  position: absolute;
  top: 10vh;
  left: 34vw;
}

.about {
  height: 170vh;
  color: #feffff;
  overflow: hidden;
  background-image: url('../../assets/yingzhi/bg_img.png');
  background-size: 100% 100%;
}
button {
  border-radius: 10px;
  background: #02a0e2;
  width: 50px;
  height: 20px;
  outline: none;
  border: 1px solid #02a0e2;
  margin-top: -20px;
  margin: 3px;
  float: right;
  color: #fff;
}
button:hover {
  background: #161848;
}
.hengd {
  cursor: pointer;
  height: 25px;
  border-radius: 0 100px 100px 0;
  margin-bottom: 10px;
  color: #fff;
  font-size: 13px;
  line-height: 25px;
  text-align: right;
  padding-right: 10px;
  width: 65px;
  background: #1e3b88;
}
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
  z-index: 1000000;
}
.ku {
  width: 440px;
  padding-left: 10px;
  height: 345px;
  margin-top: 10px;
  margin-left: 15px;
  background-image: url("../../assets/yingzhi/kuang.png");
  background-repeat: no-repeat;
  background-size: 100% 75%;
}
.ku1 {
  width: 440px;
  padding-left: 10px;
  height: 355px;
  background-image: url("../../assets/yingzhi/kuang.png");
  background-repeat: no-repeat;
  background-size: 100% 75%;
  margin-top: -80px;
  margin-left: 15px;
}
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
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
#container {
  margin: 0;
  padding: 0;
  width: 440px;
  height: 430px;
  margin-left: 15px;
  margin-top: -37px;
}
.dian {
  position: absolute;
  top: 11vh;
  z-index: 999;
  left: 34vw;
}
.dian {
  width: 100px;
  height: 80%;
  position: absolute;

  top: 10%;
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
  width: 205%;
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
    width: 180%;
    color: #fff;
  }
}
.hengd1 div {
  display: none;
}
/* 报警信息 */
.kongqi {
  width: 440px;
  height: 142vh;
  position: absolute;
  top: 10vh;
  right: 30px;
  overflow: hidden;
}
.daohang {
  width: 80px;
  height: 20%;
  background: #fff;
  margin-top: 4px;
  border-radius: 8px;
  margin-left: 10px;
  opacity: 0.4;
  color: #27c4f8;
  font-weight: 800;
  letter-spacing: 5px;
  padding-left: 10px;
}
.tuichu {
  text-align: center;
  position: absolute;
  right: 10px;
  top: 5px;
  border-radius: 8px;
  background: #14578e;
  color: #fff;
  width: 50px;
}
.sanjiao {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid #6edcf8;
  border-bottom: 10px solid transparent;
  float: right;
  margin-right: 15px;
  margin-top: 5px;
}
.dhdiv {
  width: 250px;
  background: #161e58;
  z-index: 999999;
  position: fixed;
  left: 1%;
  top: 8%;
  border-radius: 10px;
  border: 1px solid #6edcf8;
  display: none;
}
.dh1 {
  display: block;
}
.dh2 {
  display: none;
}
.dhdiv .lis {
  width: 100%;
  height: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 3px;
  font-size: 20px;
  color: #fff;
}
.sanjiao2 {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid #6edcf8;
  position: fixed;
  left: 2%;
  top: 5.3%;
}
.wendu {
  width: 450px;
  height: 200px;
  border: 1px solid #000;
}
.wenl {
  width: 100%;
  text-align: center;
  height: 15px;
  line-height: 15px;
  font-size: 15px;
  margin-top: 2%;
}
.waijin {
  width: 250px;
  height: 15px;
  line-height: 15px;
  border-radius: 7.5px;
  background: #ffffff;
  overflow: hidden;
  display: inline-block;
}
</style>

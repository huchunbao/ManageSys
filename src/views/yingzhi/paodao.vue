<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">智能跑道管理</div>
      <!-- 导航栏 -->
    </div>
    <!-- 按钮 -->
    <div style="margin-top:10px;  margin-left:13px;">
      <router-link to="/zhuce"><button>注册人员信息</button></router-link>
      <router-link to="/yd"><button>跑道运动信息</button></router-link>
      <router-link to="/jilu"><button>跑道运动记录</button></router-link>
    </div>
    <div class="backa">
      <div class="spring_con">
        <p
          style="font-size:17px;   margin-top:15px; padding-left:410px; color:#fffb02;font-family:宋体"
        >
          本月运动人数(人)
        </p>
        <p
          style="font-size:17px;   margin-top:15px; padding-left:70px; color:#fffb02;font-family:宋体"
        >
          智能跑道注册总人数:2874人
        </p>
        <div
          id="turnover"
          style="width: 1000px;height: 500px; margin-left:-42px; margin-top:-37px; float:left;"
        ></div>
      </div>
      <div
        style="font-size:17px; float: left;  margin-top:8px; width:34%; color:#fffb02; font-family:宋体 height: 20px; text-align: center;"
      >
        排行榜
      </div>
      <!-- 排行榜 -->
      <div class="da1">
        <div class="zong" style="display:flex; margin:1%;">
          <p style="color:#6fdafc;">001</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">400km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">002</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">389km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">003</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">387km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">004</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">373km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">005</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">370km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">006</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">368km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">007</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">350km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">008</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">346km</p>
        </div>

        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">009</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">343km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">010</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">330km</p>
        </div>
      </div>

      <div class="da1" style="margin-left:70px;">
        <div class="zong" style="display:flex; margin:1%;">
          <p style="color:#6fdafc;">011</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">326km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">012</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">324km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">013</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">319km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">014</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">310km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">015</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">309km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">016</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">290km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">017</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">265km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">018</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">240km</p>
        </div>

        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">019</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">220km</p>
        </div>
        <div class="zong" style="display:flex;  margin:1%; ">
          <p style="color:#6fdafc;">020</p>
          <div class="yuan"></div>
          <p style="padding-left:20px;">160km</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import daoy from './daoyou.vue'
import echarts from 'echarts'
export default {
  name: 'About',
  components: {
    // Ditu,
    daoy
  },
  data() {
    return {
      dh: false
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.turnover()
    // var qs = require('querystring')
    // this.$axios({
    //   url: 'http://192.168.1.121:8081/BodyTest/getBodyTestById?id=1',
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).then(response => {
    //   console.log(response)
    // })
  },
  methods: {
    dhf() {
      this.dh = !this.dh
    },
    tiao(i) {
      this.$router.push({
        path: i
      })
    },
    turnover() {
      var turnover = echarts.init(document.getElementById('turnover'))
      turnover.resize()
      window.addEventListener('resize', () => {
        turnover.resize()
      })
      turnover.setOption({
        color: ['#eae357'],

        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: '#6edaf7'
        },
        legend: {
          data: ['降水量']
        },
        toolbox: {},
        xAxis: [
          {
            type: 'category',
            data: [
              '1日',
              '2日',
              '3日',
              '4日',
              '5日',
              '6日',
              '7日',
              '8日',
              '9日',
              '10日',
              '11日',
              '12日',
              '13日',
              '14日',
              '15日',
              '16日',
              '17日',
              '18日',
              '19日',
              '20日',
              '21日',
              '22日',
              '23日',
              '24日',
              '25日',
              '26日',
              '27日',
              '28日',
              '29日',
              '30日'
            ]
          },
          {
            type: 'value',
            axisLine: {
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
              // show: true,
              lineStyle: {
                color: '#1589c4'
              }
            }
          }
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            data: [
              450,
              390,
              360,
              340,
              200,
              300,
              280,
              160,
              130,
              210,
              230,
              234,
              345,
              456,
              123,
              213,
              241,
              321,
              342,
              301,
              320,
              330,
              405,
              124,
              453,
              298,
              267,
              309,
              450,
              390
            ],
            markPoint: {
              data: [{ name: '年最高' }],
              lineStyle: {
                color: '#6edaf7'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.about {
  height: 100vh;
  background: #122f7e;
  overflow: hidden;
}

.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  background-image: url("../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
}
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
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
/* 导航 */
.daohang {
  width: 80px;
  height: 40%;
  background: #fff;
  margin-top: 2px;
  border-radius: 8px;
  margin-left: 10px;
  opacity: 0.4;
  color: #27c4f8;
  font-weight: 800;
  letter-spacing: 5px;
  padding-left: 10px;
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
  height: 30px;
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

button {
  border-radius: 10px;
  background: #1f3a89;
  padding: 0 10px 0 10px;
  height: 25px;
  outline: none;
  border: 1px solid #fff;
  margin: 5px;
  color: #6fdafc;
}
.backa {
  width: 97vw;
  overflow: hidden;
  border: 1px solid #0d6ca6;
  margin-left: 1vw;
  margin-top: 10px;
}

button:hover {
  background: #fff;
  color: black;
}
.da1 {
  color: #fff;
  float: left;
  margin-left: 5%;
}
.spring_con{
  width: 65%;
  float: left;
  border-right: 1px solid #0d6ca6;
}
.yuan {
  border-radius: 60%;
  width: 40px;
  height: 40px;
  background: #6874ae;
  margin-top: -5px;
  margin-left: 5px;
}
</style>

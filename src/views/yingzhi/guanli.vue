<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy">导览</daoy>
      <div class="header_text">体能检测管理</div>
      <!-- 导航栏 -->
      <!-- <div class="dhdiv" :class="dh?'dh1':'dh2'">
        <div class="sanjiao2"></div>
        <div class="lis">可视化大数据中心</div>
        <div class="lis">应急指挥调度中心</div>
        <div class="lis">后台管理系统中心</div>
        <div class="lis">电子地图</div>
       </div> -->
    </div>
    <!-- 按钮 -->

    <div class="backa" style="display:flex;">
      <div class="spring_con">
        <p
          style="font-size:17px;   margin-top:15px; padding-left:410px; color:#fffb02;font-family:宋体"
        >
          本月体能检测统计人数
        </p>
        <p
          style="font-size:17px;   margin-top:15px; padding-left:60px; color:#fffb02;font-family:宋体"
        >
          人体体能检测总人数:3203人
        </p>
        <div
          id="turnover"
          style="width: 1000px;height: 500px; margin-left:-42px; margin-top:-37px;"
        ></div>
      </div>
      <div class="xian"></div>
      <div style="display:flex;  margin-top:10px; margin-left:-60px;">
        <p style="color:white;">姓&nbsp;名:</p>
        <input
          type="placeholder"
          style="height:21px; width:120px; outline:none;border-radius:4px;
          border:1px solid #c8cccf;"
        >
      </div>
      <div style="display:flex;  margin-top:10px; margin-left:10px;">
        <p style="color:white;">手机号:</p>
        <input
          type="text"
          style="height:21px; width:120px; border-radius:4px; outline:none;border:1px solid #c8cccf;"
        >
      </div>

      <div style="display:flex;  margin-top:10px; margin-left:30px;">
        <div class="btna" @click="cha()">查询</div>
      </div>

      <!-- 排行榜 -->
      <div
        style="color:#fffc01;  margin-top:40px; position:absolute; right:350px; font-family:宋体"
      >
        体能检测结果
      </div>
      <div class="daa1">
        <p style="margin-left:22px;  margin-top:10px;">身体形态</p>

        <div class="zong" style="">
          <p>身高</p>
          <div style="height:21px; width:60px; ">{{ data.height }}</div>
        </div>
        <div class="zong" style="">
          <p>体重</p>
          <div style="height:21px; width:60px;">{{ data.weight }}</div>
        </div>
        <div class="zong" style="">
          <p>血压</p>
          <div style="height:21px; width:60px; ">{{ data.blood_pressure }}</div>
        </div>
        <div class="zong" style="">
          <p>肺活量</p>
          <div style="height:21px; width:60px;">{{ data.pulmonary }}</div>
        </div>
        <div class="zong" style="">
          <p>体前屈</p>
          <div style="height:21px; width:60px;">{{ data.sit_and_reach }}</div>
        </div>

        <div class="zong" style="">
          <p>仰卧起坐</p>
          <div style="height:21px; width:60px; ">{{ data.sit_up }}</div>
        </div>
        <div class="zong" style="">
          <p>俯卧撑</p>
          <div style="height:21px; width:60px;">{{ data.push_up }}</div>
        </div>
        <div class="zong" style="">
          <p>握力</p>
          <div style="height:21px; width:60px;">{{ data.grip }}</div>
        </div>
        <div class="zong" style="">
          <p>稳定性</p>
          <div style="height:21px; width:60px;">{{ data.stability }}</div>
        </div>
        <div class="zong" style="">
          <p>反应时</p>
          <div style="height:21px; width:60px; ">{{ data.reaction_time }}</div>
        </div>
        <div class="zong" style="">
          <p>纵跳</p>
          <div style="height:21px; width:60px;">{{ data.vertical_jump }}</div>
        </div>
      </div>
      <div
        style="color:#fffc01;  margin-top:40px; position:absolute; right:140px; font-family:宋体"
      >
        体能分析结果
      </div>
      <div class="da2">
        <p style="margin-left:38px;  margin-top:10px;">根据测试,以下为合格项</p>

        <div v-if="data1" class="zong">
          <p style="color:white;">体脂率</p>
          <div v-if="data1" class="zong2" style="background:#81fb68;">合格</div>
          <div class="zong1" style="color:#81fb68;">
            {{ data1.body_fat_rate }}
          </div>
        </div>
        <div v-if="data1" class="zong">
          <p style="color:white;">内脏脂肪</p>
          <div v-if="data1" class="zong2" style="background:#81fb68;">合格</div>
          <div class="zong1" style="color:#81fb68;">
            {{ data1.visceral_fat }}{{ data1 ? "kg" : "" }}
          </div>
        </div>
        <div v-if="data1" class="zong">
          <p style="color:white;">水分</p>
          <div v-if="data1" class="zong2" style="background:#81fb68;">合格</div>
          <div class="zong1" style="color:#81fb68; width:50px;">
            {{ data1.wet }}
          </div>
        </div>

        <p style="margin-left:38px; ">根据测试,以下为不合格项</p>

        <div v-if="data1" class="zong">
          <p style="color:white;">肥胖等级</p>
          <div v-if="data1" class="zong2" style="background:#81fb68;">较轻</div>
          <div style="color:#ff6419;" class="zong1">
            {{ data1.body_fat_rate ? "35.6%" : "" }}
          </div>
        </div>
        <div v-if="data1" class="zong">
          <p style="color:white;">蛋白质</p>
          <div v-if="data1" class="zong2">偏高</div>
          <div style="color:#ff6419;" class="zong1">
            {{ data1.protein }}{{ data1 ? "kg" : "" }}
          </div>
        </div>
        <div v-if="data1" class="zong">
          <p style="color:white;">骨骼肌</p>
          <div v-if="data1" class="zong2">偏高</div>
          <div style="color:#ff6419;" class="zong1">
            {{ data1.skeletal_muscle }}{{ data1 ? "kg" : "" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import daoy from './daoyou.vue'
import echarts from 'echarts'
export default {
  name: 'About',
  components: {
    // Ditu,
    daoy
    // cctv
  },
  data() {
    return {
      dl: false,
      data: {},
      data1: false
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.turnover()
    // var qs = require("querystring");
  },
  methods: {
    dhf() {
      this.dh = !this.dh
    },
    cha() {
      // this.$axios({
      //   url: 'http://192.168.1.17:8081/BodyTest/getBodyTestById?id=1',
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   console.log(response)
      //   this.data = response.data.data
      // })
      // this.$axios({
      //   url: 'http://192.168.1.17:8081/Body/getIngredienById?id=1',
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   console.log(response)
      //   this.data1 = response.data.data
      // })
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
        color: ['#61fe59'],

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
            name: '人数',
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
  width: 100vw;
  height: 100vh;
  background: #122f7e;
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
  width: 100px;
  height: 25px;
  outline: none;
  border: 1px solid #fff;
  margin: 5px;
  color: #6fdafc;
}
.btna {
  border-radius: 7px;
  background: #fff;
  width: 50px;
  height: 21px;
  line-height: 21px;
  outline: none;
  border: 1px solid #fff;
  margin: 5px;
  color: black;
  text-align: center;
  margin-top: 1px;
  margin-left: -10px;
  font-family: 宋体;
  cursor: pointer;
}
.backa {
  width: 96vw;
  height: 90vh;
  border: 1px solid #0d6ca6;
  margin-left: 17px;
  margin-top: 10px;
}
button:hover {
  background: #fff;
  color: black;
}
.xian {
  width: 1px;
  background-color: #0d6ca6;
  height: 510px;
  position: absolute;
  left: 900px;
}
.daa1 {
  margin-top: 65px;
  color: #fff;
  background: #415093;
  width: 195px;
  height: 420px;
  margin-left: -398px;
  border-radius: 5px;
  /* display: flex; */
}
.da2 {
  margin-top: 65px;
  color: #fff;
  background: #415093;
  width: 230px;
  height: 420px;
  margin-left: 20px;
  border-radius: 5px;
  /* display: flex; */
}
.da1 {
  margin-top: 65px;
  color: #fff;
  background: #415093;
  width: 180px;
  height: 420px;
  margin-left: -430px;
  border-radius: 5px;
  /* display: flex; */
}
.yuan {
  border-radius: 60%;
  width: 40px;
  height: 40px;
  background: #6874ae;
  margin-top: -5px;
  margin-left: 5px;
}
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
}
.zong {
  width: 80%;
  margin-left: 10%;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
}
.zong p {
  float: left;
}
.zong div {
  float: right;
  width: 60px;
  height: 20px;
  color: #81fb68;
  text-align: center;
  border-radius: 4px;
}
.zong .zong1 {
  width: 40px;
  background: none;
}
.zong .zong2 {
  height: 21px;
  width: 60px;
  border-radius: 4px;
  background: #ff6419;
  color: white;
  text-align: center;
  float: right;
}
</style>

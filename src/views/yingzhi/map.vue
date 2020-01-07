<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">电子地图</div>
      <!-- 导航栏 -->
    </div>
    <div style="margin-top:-25px; float:right; margin-right:13px;">
      <router-link to="/dianwei"><button>点位设置</button></router-link>
    </div>
    <div id="container"></div>
    <div class="dian">
      <div
        class="hengd"
        :class="ce == '监控' ? 'hengd2' : 'hengd1'"
        @click="jing1('监控')"
      >
        监控
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '单兵' ? 'hengd2' : 'hengd1'"
        @click="jing2('单兵')"
      >
        单兵
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '共享单车' ? 'hengd2' : 'hengd1'"
        @click="jing1('共享单车')"
      >
        共享单车
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '观景台' ? 'hengd2' : 'hengd1'"
        @click="jing1('观景台')"
      >
        观景台
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '景点' ? 'hengd2' : 'hengd1'"
        @click="jing1('景点')"
      >
        景点
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '出入口' ? 'hengd2' : 'hengd1'"
        @click="jing1('出入口')"
      >
        出入口
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '停车场' ? 'hengd2' : 'hengd1'"
        @click="jing1('停车场')"
      >
        停车场
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '公厕' ? 'hengd2' : 'hengd1'"
        @click="jing1('公厕')"
      >
        公厕
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '驿站' ? 'hengd2' : 'hengd1'"
        @click="jing1('驿站')"
      >
        驿站
        <div>信息：{{ marker.length }}个</div>
      </div>
      <div
        class="hengd"
        :class="ce == '垃圾桶' ? 'hengd2' : 'hengd1'"
        @click="jing1('垃圾桶')"
      >
        垃圾桶
        <div>信息：{{ marker.length }}个</div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import daoy from './daoyou.vue'
export default {
  name: 'About',
  components: {
    // Ditu,
    daoy
  },
  data() {
    return {
      dh: false,
      map: null,
      ce: '监控',
      marker: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.log()
    this.map = new AMap.Map('container', {
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 11, // 初始化地图层级
      center: [100.194439, 25.90931] // 初始化地图中心点
    })
    this.qingmark()
  },
  methods: {
    dhf() {
      this.dh = !this.dh
    },
    jing1(dat) {
      this.ce = dat
      this.qingmark()
    },
    jing2(dat) {
      this.map.remove(this.marker)
      this.map.setFitView()
      this.marker = []
      this.ce = dat
      // this.$axios({
      //   url: 'http://192.168.1.17:8081/notifyDate/getPatrolNotify',
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   this.marker.push(
      //     new AMap.Marker({
      //       icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      //       position: [
      //         response.data.data.Longitude / 360000 + 0.006216,
      //         response.data.data.Latitude / 360000 + 0.001256
      //       ]
      //     })
      //   )
      //   // this.marker[i].DeviceName
      //   this.marker[0].setTitle(response.data.data.DeviceName)
      //   this.marker[0].on('click', function() {
      //     this.$emit('fatherMethod', response.data.data.DeviceID)
      //   })
      //   this.map.add(this.marker)
      //   this.map.setFitView()
      // })
    },
    tiao(i) {
      this.$router.push({
        path: i
      })
    },
    log() {
      // var qs = require('querystring')
    },
    qingmark() {
      // var qs = require('querystring')
      // var the = this
      // var data = {
      //   pointtype: this.ce
      // }
      // this.$axios({
      //   url: 'http://192.168.1.17:8081/dispatch/getDispatchByPointtype',
      //   method: 'post',
      //   data: qs.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   // this.tiao('map')
      //   console.log(response.data.data)
      //   this.map.remove(this.marker)
      //   this.map.setFitView()
      //   this.marker = []
      //   for (var i = 0; i < response.data.data.length; i++) {
      //     this.marker.push(
      //       new AMap.Marker({
      //         icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      //         position: [
      //           response.data.data[i].latitude,
      //           response.data.data[i].longitude
      //         ]
      //       })
      //     )
      //     the.marker[i].setTitle(response.data.data[i].pointname)
      //   }
      //   this.map.add(this.marker)
      //   this.map.setFitView()
      // })
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
/* 地图 */
/* 监视 */
.cctv {
  float: right;
  width: 47%;
  height: 85%;
  margin-right: 1.5%;
  border: 3px solid #6edcfa;
  box-shadow: 0 0 10px #ffffff;
}
/* 头部标签 */
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
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
  z-index: 1000000;
}
button {
  border-radius: 5px;
  background: #1f3a89;
  height: 25px;
  padding: 0 10px 0 10px;
  outline: none;
  border: 1px solid #fff;
  color: #6fdafc;
}
.backa {
  width: 1360px;
  height: 510px;
  border: 1px solid #0d6ca6;
  margin-left: 17px;
  margin-top: 10px;
}
#container {
  width: 98%;
  height: 85%;
  margin: 13px;
  position: absolute;
  bottom: 15px;
}
.dian {
  width: 100px;
  height: 80%;
  position: absolute;
  left: 1.6%;
  top: 17%;
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
  width: 222%;
  height: 25px;
  margin-top: -25px;
  z-index: 9999;
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
    width: 180%;
    color: #fff;
  }
}
.hengd1 div {
  display: none;
}
button:hover {
  background: #151748;
  color: #fefffb;
}
</style>

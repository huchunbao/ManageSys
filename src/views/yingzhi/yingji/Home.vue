<template>
  <div id="home">
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
      <div
        class="hengd"
        :class="ce == '热力图' ? 'hengd2' : 'hengd1'"
        @click="reli('热力图')"
      >
        热力图
        <div>显示</div>
      </div>
      <div
        class="hengd"
        :class="ce == '路况' ? 'hengd2' : 'hengd1'"
        @click="lukuang('路况')"
      >
        路况
        <div>显示</div>
      </div>
    </div>
    <div id="container"></div>
    <div ref="bao" class="baoc">
      报警信息：
      <p v-for="(item, i) in bjxx" :key="i">
        报警摄像机:{{ item.object_name }}----报警时间:{{ item.start_time }}
      </p>
    </div>
  </div>
</template>

<script>
// import { setTimeout } from 'timers'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      map: null,
      ce: '监控',
      marker: [],
      bjxx: '风平浪静',
      heatmap: null,
      trafficLayer: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.log()
    this.map = new AMap.Map('container', {
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 11, // 初始化地图层级
      center: [116.397428, 39.90923] // 初始化地图中心点
    })
    this.gaojing()
    this.relichu()
    this.qingmark()
    // this.$axios(
    //     url: "http://192.168.1.121:8081/getSysDispatchType",
    //     method: "get",
    // }).then(response => {
    //   console.log(response)
    // })
  },
  methods: {
    // 点击切换坐标点
    jing1(dat) {
      this.ce = dat
      this.qingmark()
    },
    jing2(dat) {
      this.map.remove(this.marker)
      this.map.setFitView()
      // const the = this
      this.marker = []
      this.ce = dat
      // this.$axios({
      //   url: 'http://192.168.1.121:8081/notifyDate/getPatrolNotify',
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
      //     const da = response.data.data.DeviceID * 1 + 1
      //     the.$emit('fatherMethod', '00' + da)
      //     console.log(response.data.data.DeviceID)
      //   })
      //   this.map.add(this.marker)
      //   this.map.setFitView()
      // })
    },
    log() {
      // var qs = require('querystring')
      // const data = { username: 'admin', password: '111111' }
      // this.$axios({
      //   url: "http://192.168.1.121:8081/user/login",
      //   method: "post",
      //   data: qs.stringify(data),
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // }).then(response => {});
    },
    qingmark() {
      this.heatmap.hide()
      this.trafficLayer.hide()
      // const the = this
      // const qs = require('querystring')
      // const data = {
      //   pointtype: this.ce
      // }
      // this.$axios({
      //   url: 'http://192.168.1.121:8081/dispatch/getDispatchByPointtype',
      //   method: 'post',
      //   data: qs.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   // this.tiao('map')
      //   this.map.remove(this.marker)
      //   this.map.setFitView()
      //   this.marker = []
      //   for (let i = 0; i < response.data.data.length; i++) {
      //     // if(response.data.data[i].latitude!=''&&response.data.data[i].longitude!=''&&response.data.data[i].pointname!=''){
      //     if (response.data.data[i].carema) {
      //       the.marker.push(
      //         new AMap.Marker({
      //           icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      //           position: [
      //             response.data.data[i].latitude,
      //             response.data.data[i].longitude
      //           ],
      //           ipd: response.data.data[i].carema
      //         })
      //       )
      //       the.marker[i].setTitle(response.data.data[i].pointname)
      //       the.marker[i].on('click', function() {
      //         the.$emit('fatherMethod', response.data.data[i].carema)
      //       })
      //     } else if (response.data.data[i].pointtype) {
      //       the.marker.push(
      //         new AMap.Marker({
      //           icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      //           position: [
      //             response.data.data[i].latitude,
      //             response.data.data[i].longitude
      //           ]
      //         })
      //       )
      //       the.marker[i].setTitle('当前占用坑位' + i)
      //     } else {
      //       the.marker.push(
      //         new AMap.Marker({
      //           icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      //           position: [
      //             response.data.data[i].latitude,
      //             response.data.data[i].longitude
      //           ]
      //         })
      //       )
      //       the.marker[i].setTitle(response.data.data[i].pointname)
      //     }
      //     // }
      //   }
      //   this.map.add(this.marker)
      //   this.map.setFitView()
      // })
    },
    gaojing() {
      // const the = this
      // http://192.168.1.29:8081/notifyDate/getVigilanceNotify
      // this.$axios({
      //   url: 'http://192.168.1.121:8081/notifyDate/getVigilanceNotify',
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   this.bjxx = response.data.data
      //   setTimeout(function() {
      //     the.$refs.bao.scrollTop = the.$refs.bao.scrollHeight
      //   }, 0)
      // })
    },
    // 热力图
    reli(da) {
      this.ce = da
      this.map.remove(this.marker)
      this.map.setFitView()
      this.heatmap.show()
      this.trafficLayer.hide()
    },
    lukuang(da) {
      this.ce = da
      this.map.remove(this.marker)
      this.map.setFitView()
      this.trafficLayer.show()
      this.heatmap.hide()
    },
    relichu() {
      this.trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
      })
      this.trafficLayer.setMap(this.map)
      const the = this
      the.map.plugin(['AMap.Heatmap'], function() {
        the.heatmap = new AMap.Heatmap(the.map, {
          radius: 35, // 给定半径
          opacity: [0, 0.8]
        })
        the.heatmap.setDataSet({
          data: [
            {
              'lng': 100.244161,
              'lat': 25.835082,
              'count': 8
            },
            {
              'lng': 100.236945,
              'lat': 25.831451,
              'count': 5
            },
            {
              'lng': 100.236973,
              'lat': 25.831456,
              'count': 10
            },
            {
              'lng': 100.236945,
              'lat': 25.831467,
              'count': 80
            },
            {
              'lng': 100.232345,
              'lat': 25.831451,
              'count': 5
            },
            {
              'lng': 100.276973,
              'lat': 25.831366,
              'count': 10
            },
            {
              'lng': 100.237845,
              'lat': 25.832347,
              'count': 80
            }
          ],
          max: 100
        })
      })
    }
  }
}
</script>

<style scoped>
#home {
  width: 100%;
  height: 100%;
}
/* 地图 */
#container {
  width: 100%;
  height: 100%;
}
/* 地图侧边栏 */
.dian {
  width: 100px;
  height: 85%;
  position: absolute;
  left: 1.6%;
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
  width: 220%;
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
    width: 220%;
    color: #fff;
  }
}
.hengd1 div {
  display: none;
}
/* 报警信息 */
.baoc {
  width: 45%;
  height: 100px;
  position: fixed;
  bottom: 6%;
  left: 1.6%;
  background: #fff;
  z-index: 1000000;
  padding: 1%;
  overflow: hidden;
  overflow-y: auto;
}
.baoc p {
  color: red;
  text-indent: 25px;
}
</style>

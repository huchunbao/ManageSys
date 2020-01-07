<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">电子地图</div>
      <!-- 导航栏 -->
    </div>

    <div style=" float:right; margin-right:13px; margin-top:-25px">
      <!-- <router-link to="/xinxi"><button>信息发布</button></router-link>
      <button @click="tiao('shipin')">视频监控</button> -->
      <router-link to="/map2"><button>点位设置</button></router-link>
    </div>

    <div id="container"></div>
    <div class="right">
      <!-- <input type="text" value="请输入地址或经纬度" class="ipt" /> -->
      <!-- <button class="ze">增加</button> -->
      <div style="margin-top:15%;">
        <p style="color:#fff;font-family:宋体;">点位类型:</p>
        <select id="select" v-model="diantp" class="sel">
          <option value="1">监控</option>
          <option value="2">共享单车</option>
          <option value="4">观景台</option>
          <option value="8">景点</option>
          <option value="9">出入口</option>
          <option value="10">停车场</option>
          <option value="11">公厕</option>
          <option value="12">驿站</option>
          <option value="13">垃圾桶</option>
        </select>
      </div>
      <!-- 景点名称 -->
      <div>
        <p style="color:#fff;  font-family:宋体;">点位名称:</p>
        <input v-model="name" type="text" class="ipt1">
      </div>
      <!-- 景点介绍 -->
      <div>
        <p style="color:#fff;  font-family:宋体;">点位介绍:</p>
        <!-- <input type="text" class="ipt2" v-model="jie" /> -->
        <textarea v-model="jie" type="text" class="ipt2"></textarea>
      </div>
      <!-- 备注 -->
      <div>
        <p style="color:#fff; font-family:宋体;">备 注:</p>
        <input v-model="bei" type="text" class="ipt3">
      </div>
      <!-- 摄像头 -->
      <div v-if="diantp == 1">
        <p style="color:#fff; font-family:宋体;">摄像头:</p>
        <!-- <input type="text" class="ipt3" v-model="shexiang" /> -->
        <select id="select" v-model="shexiang" class="sel">
          <option
            v-for="(item, i) in shexdata"
            :key="i"
            :value="item.indexcode"
          >{{ item.name }}</option>
        </select>
      </div>
      <!-- 位置信息 -->
      <div>
        <p style="color:#fff;font-family:宋体; width:80%;">位置信息</p>
      </div>
      <div>
        <p style="color:#fff; font-family:宋体;">经度:</p>
        <input v-model="jing" type="text" class="ipt3" disabled>
      </div>
      <div>
        <p style="color:#fff;  font-family:宋体;">纬度:</p>
        <input v-model="wei" type="text" class="ipt3" disabled>
      </div>
      <button class="cun" @click="cun()">保存</button>
      <button class="jixu" @click="jcun()">保存并继续</button>
    </div>

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
    <div v-if="stab" class="shanc">
      <p>您确定删除“{{ sming }}”吗？</p>
      <div class="shanc_an" @click="(sid = null), (stab = false), (sming = '')">
        取消
      </div>
      <div class="shanc_an" @click="shanc()">确定</div>
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
      marker: [],
      // 删除
      sid: null,
      stab: false,
      sming: '',
      // 添加点位信息
      diantp: '1',
      name: '',
      jie: '',
      bei: '',
      jing: '',
      wei: '',
      shexiang: '',
      shexdata: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    var the = this
    this.log()
    this.shexdataup()
    this.map = new AMap.Map('container', {
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 11, // 初始化地图层级
      center: [100.194439, 25.90931] // 初始化地图中心点
    })
    this.map.on('click', function(e) {
      // the.value = e.lnglat.toString();
      the.jing = e.lnglat.toString().split(',')[0]
      the.wei = e.lnglat.toString().split(',')[1]
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
      //   this.map.add(this.marker)
      //   this.map.setFitView()
      // })
    },
    cun() {
      if (
        this.diantp !== '' &&
        this.name !== '' &&
        this.jie !== '' &&
        this.jing !== '' &&
        this.wei !== ''
      ) {
        // var qs = require('querystring')
        // var data = {
        //   cpid: this.diantp,
        //   pointtype:
        //     this.diantp === 1 ? '监控' : this.diantp === 2
        //       ? '享单车' : this.diantp === 4
        //         ? '观景台' : this.diantp === 8
        //           ? '景点' : this.diantp === 9
        //             ? '出入口' : this.diantp === 10
        //               ? '停车场' : this.diantp === 11
        //                 ? '公厕' : this.diantp === 12
        //                   ? '驿站' : this.diantp === 13
        //                     ? '垃圾桶' : '',
        //   pointname: this.name,
        //   isuse: 1,
        //   remarks: this.bei,
        //   introduce: this.jie,
        //   latitude: this.jing,
        //   longitude: this.wei,
        //   carema: this.shexiang
        // }
        // this.$axios({
        //   url: 'http://192.168.1.17:8081/dispatch/saveSysDispatch',
        //   method: 'post',
        //   data: qs.stringify(data),
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // }).then(response => {
        //   console.log(response)
        //   this.tiao('map')
        // })
      } else {
        alert('信息未填完整')
      }
    },
    jcun() {
      if (
        this.diantp !== '' &&
        this.name !== '' &&
        this.jie !== '' &&
        this.jing !== '' &&
        this.wei !== ''
      ) {
        // var qs = require('querystring')
        // var data = {
        //   cpid: this.diantp,
        //   pointtype:
        //   this.diantp === 1 ? '监控' : this.diantp === 2
        //     ? '共享单车' : this.diantp === 4
        //       ? '观景台' : this.diantp === 8
        //         ? '景点' : this.diantp === 9
        //           ? '出入口' : this.diantp === 10
        //             ? '停车场' : this.diantp === 11
        //               ? '公厕' : this.diantp === 12
        //                 ? '驿站' : this.diantp === 13
        //                   ? '垃圾桶' : '',
        //   pointname: this.name,
        //   isuse: 1,
        //   remarks: this.bei,
        //   introduce: this.jie,
        //   latitude: this.jing,
        //   longitude: this.wei,
        //   carema: this.shexiang
        // }
        // this.$axios({
        //   url: 'http://192.168.1.17:8081/dispatch/saveSysDispatch',
        //   method: 'post',
        //   data: qs.stringify(data),
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // }).then(response => {
        //   console.log(response)
        //   this.diantp = 1
        //   this.name = ''
        //   this.bei = ''
        //   this.jie = ''
        //   this.jing = ''
        //   this.wei = ''
        //   this.shexiang = ''
        //   this.qingmark()
        //   // this.tiao('map')
        // })
      } else {
        alert('信息未填完整')
      }
    },
    log() {
      // var qs = require("querystring");
    },
    // 请求点位
    qingmark() {
      // var the = this
      // var qs = require('querystring')
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
      //   for (let i = 0; i < response.data.data.length; i++) {
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
      //     this.marker[i].on('rightclick', function(event) {
      //       console.log(event)
      //       the.sid = response.data.data[i].id
      //       the.stab = true
      //       the.sming = response.data.data[i].pointname
      //     })
      //   }
      //   this.map.add(this.marker)
      //   this.map.setFitView()
      // })
    },
    shexdataup() {
      // this.$axios({
      //   url:
      //     'http://192.168.1.17:8081/camara/getHikvisionOrg?nodeIndexCode=001007',
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   // console.log(response.data.data)
      //   var data = response.data.data
      //   for (let i = 0; i < data.length; i++) {
      //     for (let y = 0; y < data[i].hikSurveillancePoint.length; y++) {
      //       this.shexdata.push(data[i].hikSurveillancePoint[y])
      //     }
      //   }
      //   console.log(this.shexdata)
      // })
    },
    // 删除
    shanc() {
      // http://localhost:8081/dispatchtype/deleteByTypename
      // this.$axios({
      //   url:
      //     'http://192.168.1.17:8081/dispatch/deleteDispatchById?id=' + this.sid,
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   console.log(response)
      this.stab = false
      this.sid = null
      this.sming = ''
      this.qingmark()
      // })
    },
    tiao(i) {
      this.$router.push({
        path: i
      })
    }
    // container2lnglat() {
    //     if(!pixelInput.value) return
    //     var inputVal = pixelInput.value.split(',');
    //     var pixel = new AMap.Pixel(inputVal[0],inputVal[1]);
    //     var lnglat = map.containerToLngLat(pixel);
    //     lnglatInput.value = lnglat;
    // }
  }
}
</script>

<style scoped>
.about {
  /* width: 100vw; */
  height: 100vh;
  background: #122f7e;
  font-size: 13px;
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
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
  z-index: 1000000;
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

button {
  border-radius: 5px;
  background: #1f3a89;
  height: 25px;
  outline: none;
  padding: 0 10px 0 10px;
  border: 1px solid #fff;
  color: #6fdafc;
}
.ze,
.sh {
  border-radius: 5px;
  background: #1f3a89;
  width: 110px;
  height: 25px;
  outline: none;
  border: 1px solid #66cdee;
  color: #6fdafc;
  margin-top: 10px;
  margin-left: 50px;
}
.ze,
.sh:hover {
  background: #fff;
  color: black;
  border: 1px solid #fff;
}
.cun,
.jixu {
  border-radius: 5px;
  background: #1f3a89;
  width: 20%;
  height: 25px;
  outline: none;
  border: 1px solid #66cdee;
  color: #6fdafc;
  margin-top: 50px;
  margin-left: 20%;
}
.ze,
.sh:hover {
  background: #fff;
  color: black;
  border: 1px solid #fff;
}

#container {
  width: 69%;
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
button:hover {
  background: #151748;
  color: #fefffb;
}
.right {
  background: #151748;
  width: 29.2%;
  height: 85.2%;
  z-index: 9999;
  float: right;
  position: absolute;
  right: 10px;
  bottom: 27px;
}
.right div {
  width: 80%;
  margin-left: 10%;
  overflow: hidden;
  display: block;
  margin-top: 5%;
  margin-bottom: 1%;
}
.right input,
select {
  float: right;
  max-width: 60%;
}
.right p {
  float: left;
  padding-left: 30px;
  margin: 0;
}
.right .ipt {
  margin-top: 10px;
  max-width: 80%;
  margin-left: 10%;
  height: 30px;
  width: 80%;
  border-radius: 8px;
  background: #43456c;
  outline: none;
  border: 1px solid #43456c;
  color: #898c95;
  padding-left: 15px;
  float: none;
  /* margin-top: 10px;
  margin-left: 20px; */
}
.ipt1 {
  height: 20px;
  width: 59%;
  float: right;
  background: #fff;
  outline: none;
  border: 1px solid #fff;
  color: #898c95;
  padding-left: 15px;
}
.ipt2 {
  height: 80px;
  width: 59%;
  float: right;
  background: #fff;
  outline: none;
  border: 1px solid #fff;
  color: #898c95;
  padding-left: 15px;
  border-radius: 5px;
}
.ipt3 {
  height: 20px;
  width: 59%;
  float: right;
  background: #fff;
  outline: none;
  border: 1px solid #fff;
  color: #898c95;
  padding-left: 15px;
}
.shanc {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 200px;
  background: #151748;
  z-index: 99999;
  margin-left: -150px;
  margin-top: -100px;
  color: #fff;
}
.shanc_an {
  float: left;
  width: 20%;
  margin-left: 20%;
  background: #fff;
  color: #000;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
}
.shanc p {
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: center;
  font-weight: 800;
}
</style>

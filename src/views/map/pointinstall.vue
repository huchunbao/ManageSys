<template>
  <div class="routeinstall">
    <div class="leftdiv">
      <!-- <el-tabs v-model="activeName" type="margin-left:10px;" @tab-click="handleClick">
        <el-tab-pane label="增加" name="qing"> -->
      <div class="leftdiv_list">
        点位类型
        <el-select v-model="value" placeholder="请选择" class="elselect" style="float:right;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="leftdiv_list">
        点位名称
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div class="leftdiv_list">
        点位备注
        <el-input v-model="bei" placeholder="请输入内容"></el-input>
      </div>
      <div class="leftdiv_list">
        点位说明
      </div>
      <div class="leftdiv_list">
        <el-input
          v-model="textarea"
          type="textarea"
          class="textarea"
          maxlength="100"
          :rows="2"
          placeholder="请输入内容"
          resize="none"
        >
        </el-input>
      </div>
      <div class="leftdiv_list">
        位置信息
      </div>
      <div class="leftdiv_list">经度<el-input v-model="diandata.a" placeholder="请输入内容"></el-input></div>
      <div class="leftdiv_list">纬度<el-input v-model="diandata.b" placeholder="请输入内容"></el-input></div>
      <div class="leftdiv_list">
        <!-- <div class="btn" @click="ti()">保存</div> -->
        <el-button type="primary" round @click="ti()">保存</el-button>
        <!-- <div class="btn2" @click="ti2()">保存并继续</div> -->
        <el-button type="info" round @click="ti2()">保存并继续</el-button>
      </div>
      <!-- </el-tab-pane>
        <el-tab-pane label="删除" name="qu">
          删除
        </el-tab-pane>
      </el-tabs> -->
    </div>
    <el-amap class="map" :vid="'amap-vue'" :zoom="zoom" :center="center" :events="events" :amap-manager="amapManager">
    </el-amap>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'

var amapManager = new VueAMap.AMapManager()
export default {
  name: 'Map',
  data() {
    return {
      name: '',
      bei: '',
      textarea: '',
      zoom: 16,
      center: [116.336496, 39.942178],
      mapStyle1: 'amap://styles/whitesmoke',
      activeName: 'qing',
      tape: 1,
      amapManager,
      events: {},
      overlayGroups: [],
      data: [],
      diandata: {
        a: 0,
        b: 0
      },
      options: [{
        value: '1',
        label: '设备'
      }, {
        value: '2',
        label: '景点'
      }, {
        value: '3',
        label: '场所'
      }],
      value: ''
    }
  },
  watch: {
    data() {
      // this.addmarker()
    }
  },
  created() {
    this.addfun()
  },
  methods: {
    ti() {
      if (this.name !== '' && this.value !== '') {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        setTimeout(() => {
          this.tank = ''
          this.$router.push({ path: '/maps/linjingxi' })
        }, 2000)
      } else {
        this.$message({
          message: '请认真检查填写项',
          type: 'warning'
        })
      }
    },
    ti2() {
      if (this.name !== '' && this.value !== '') {
        this.name = ''
        this.bei = ''
        this.value = ''
        this.diandata = {
          a: 0,
          b: 0
        }
        this.overlayGroups = []
        this.addmarker()
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '请认真检查填写项',
          type: 'warning'
        })
      }
    },
    addfun() {
      var that = this
      this.events = {
        init(o) {
          o.on('click', function(e) {
            that.wei(e.lnglat.getLng(), e.lnglat.getLat(), that)
          })
        }
      }
    },
    addmarker() {
      var that = this
      var o = amapManager.getMap()
      var markers = []
      o.remove(that.overlayGroups)
      console.log(2)
      var marker = new AMap.Marker({
        position: [that.diandata.a, that.diandata.b],
        text: '123'
      })
      markers.push(marker)
      this.overlayGroups = new AMap.OverlayGroup(markers)
      o.add(that.overlayGroups)
    },
    wei(a, b, that) {
      this.data[this.data.length - 1] = [a, b]
      that.diandata.a = a
      that.diandata.b = b
      this.addmarker()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }

  }
}
</script>
<style scoped>
.routeinstall{
  width: 100%;
  height: calc(100vh - 80px);
  padding: 1%;
  background: #f0f3ff;
  overflow: hidden;
}
.map{
  width: 100%;
  height: 100%;
}
.leftdiv{
  width: 450px;
  height: 95.5%;
  position: absolute;
  background: #fff;
  z-index: 1;
}
.leftdiv_list{
  width: 70%;
  margin: auto;
  height: 7vh;
  margin-top: 2%;
  font-size: 1.2vh;
  overflow: hidden;
  line-height: 6vh;
}
.leftdiv_list .elselect{
  float: right;
  width: 75%;
}
.el-input--medium{
  width: 100%;
  height: 23px;
  float: right;
  font-size: 10px;
}
.leftdiv_list td,th{
  width: 33%;
}
.leftdiv_list .el-input--medium {
  width: 75%;
  height: 23px;
  font-size: 10px;
  float: right;
}
.el-input__inner{
  height: 100%;
  width: 100%;
}
.leftdiv_list .datainp{
  width: 100%;
  height: 100%;
}
.leftdiv_list .textarea{
  width: 100%;
  height: 100px;
  resize:none;
}
.zhogn{
  background: #ccc;
}
.zhogn td{
  background: #ccc;
}
.btn{
  width: 30%;
  height: 3vh;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 0px 11px 0px rgba(63,106,255,0.28);
  border-radius: 2vh;
  text-align: center;
  font-size: 1vh;
  line-height: 3vh;
  color: #fff;
  float: left;
  margin-left: 10%;
}
.btn2{
  width: 30%;
  height: 3vh;
  background:#fff;
  border:1px solid rgba(63,106,255,1);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  border-radius:2vh;
  text-align: center;
  font-size: 1vh;
  line-height: 3vh;
  color: #3F6AFF;
  float: left;
  margin-left: 10%;
}
  /deep/ .el-select .el-input .el-select__caret {
    line-height: 10px;
}
</style>

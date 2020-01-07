<template>
  <div class="mapinstall">
    <el-scrollbar class="scroll_box" tag="ul">
      <div class="leftdiv">
        <!-- <el-button round class="exports_btn">导入手绘地图</el-button> -->
        <div class="top">
          <div class="titles">地图设置</div>
          <div class="names_c" @click="tapefun(1)">
            <input v-model="tape" type="radio" value="1"><div class="map_name">高德地图</div>
          </div>
          <div class="names_c" @click="tapefun(3)">
            <input v-model="tape" type="radio" value="3"><div class="map_name">腾讯地图</div>
          </div>
          <div class="names_c" @click="tapefun(2)">
            <input v-model="tape" type="radio" value="2"><div class="map_name">百度地图</div>
          </div>
          <div class="names_c" @click="tapefun(4)">
            <input v-model="tape" type="radio" value="4"><div class="map_name">手绘地图</div>
          </div>
        </div>
        <div class="bottom">
          <div class="titles">地图位置信息设置</div>
          <div class="city"><span class="star">*</span>所属省</div>
          <el-select v-model="value" placeholder="请选择" class="inputs" :disabled="disabled" @change="SelectChange(value)">
            <el-option
              v-for="item in options"
              :key="item.provinceName"
              :label="item.provinceName"
              :value="JSON.stringify(item)"
            ></el-option>
          </el-select>
          <div class="city"><span class="star">*</span>所属市</div>
          <el-select v-model="value1" placeholder="请选择" class="inputs" :disabled="disabled" @change="SelectChange(value)">
            <el-option
              v-for="item in options2"
              :key="item.citysName"
              :label="item.citysName"
              :value="item.citysName"
            ></el-option>
          </el-select>
          <div class="location"><span class="star">*</span>经度</div>
          <el-input v-model="input_longitude" placeholder="请输入经度" :disabled="disabled"></el-input>
          <div class="location"><span class="star">*</span>纬度</div>
          <el-input v-model="input_latitude" placeholder="请输入纬度" :disabled="disabled"></el-input>
          <el-button :type="!save ? '': 'primary'" :disabled="!save" size="mini" round @click="Save_btn">保存</el-button>
          <el-button :type="!edit ? '': 'primary'" :disabled="!edit" size="mini" round @click="Edit_btn">修改</el-button>
          <!-- <div class="btn save" :class="save ? '': 'gray'" @click="Save_btn">保存</div>
          <div class="btn edit" :class="edit ? '': 'gray'" @click="Edit_btn">修改</div> -->
        </div>
      </div>
    </el-scrollbar>
    <div v-if="tape==1" class="map map_box">
      <el-amap class="map" :vid="'amap-vue'" :zoom="zoom" :center="center" :map-style="mapStyle1" :events="events" :amap-manager="amapManager">
        <el-amap-marker
          v-for="(marker,index) in markers"
          :key="index"
          :position="marker.position"
          :events="marker.events"
          :icon="marker.icon"
          top-when-click="true"
          :draggable="marker.draggable"
          :raise-on-drag="marker.raiseOnDrag"
        ></el-amap-marker>
      </el-amap>
    </div>
    <div v-if="tape==2" class="map map_box">
      <el-amap class="map" :vid="'amap-vue'" :zoom="zoom" :center="center" :map-style="mapStyle2" :events="events" :amap-manager="amapManager">
        <el-amap-marker
          v-for="(marker,index) in markers"
          :key="index"
          :position="marker.position"
          :events="marker.events"
          :icon="marker.icon"
          top-when-click="true"
          :draggable="marker.draggable"
          :raise-on-drag="marker.raiseOnDrag"
        ></el-amap-marker>
      </el-amap>
    </div>
    <div v-if="tape==3" class="map map_box">
      <el-amap class="map" :vid="'amap-vue'" :zoom="zoom" :center="center" :map-style="mapStyle3" :events="events" :amap-manager="amapManager">
        <el-amap-marker
          v-for="(marker,index) in markers"
          :key="index"
          :position="marker.position"
          :events="marker.events"
          :icon="marker.icon"
          top-when-click="true"
          :draggable="marker.draggable"
          :raise-on-drag="marker.raiseOnDrag"
        ></el-amap-marker>
      </el-amap>
    </div>
    <div v-if="tape==4" class="map map_box" style="text-align: center">
      手绘地图请联系公司定制
    </div>
  </div>
</template>

<script>
import { post, get } from '@/api/axios'
import shengshi from '@/assets/shengshi'
import VueAMap from 'vue-amap'

const amapManager = new VueAMap.AMapManager()
// let timer = null
export default {
  name: 'Map',
  data() {
    return {
      name: '电子地图管理',
      options2: [],
      imageUrl: '',
      tape: 1,
      zoom: 16,
      amapManager,
      markers: [
        {
          position: [116.338535, 39.943609], // [116.338535, 39.943609],
          icon: '',
          draggable: false,
          events: {
            'click': (e) => {
              var lng = e.lnglat.lng
              var lat = e.lnglat.lat
              var list = [lng, lat]
              // this.markers[0].draggable = true
              this.markers[0].position = list
            },
            dragging: (e) => {
              this.input_longitude = e.lnglat.lng
              this.input_latitude = e.lnglat.lat
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            }
          }
        }
      ],
      center: [116.336496, 39.942178],
      events: {
        'click': (e) => {
          var lng = e.lnglat.lng
          var lat = e.lnglat.lat
          var list = [lng, lat]
          if (this.add_marker) {
            this.input_longitude = lng
            this.input_latitude = lat
            this.markers[0].position = list
            // var map = amapManager.getMap()
            // map.add(this.markers[0])
            // map.setFitView()
          } else {
            this.$alert('请先点击修改按钮才可执行此操作', '', {
              confirmButtonText: '确定'
              // callback: action => {
              //   this.$message({
              //     type: 'info',
              //     message: `action: ${ action }`
              //   })
              // }
            })
          }
        }
      },
      mapStyle1: 'amap://styles/normal',
      mapStyle2: 'amap://styles/whitesmoke',
      mapStyle3: 'amap://styles/fresh',
      lfg: true,
      id: 0,
      options: shengshi,
      value: '',
      value1: '',
      input_longitude: '',
      input_latitude: '',
      fun: null,
      save: false, // 可点击
      edit: true,
      disabled: true,
      add_marker: false, // 是否可添加marker
      save_success: false // 是否成功保存
    }
  },
  watch: {
    value() {
      console.log(this.value)
      this.options2 = JSON.parse(this.value).citys
      if (this.lfg) {
        this.value1 = ''
      } else {
        this.lfg = !this.lfg
      }
    }
  },
  created() {
  },
  mounted() {
    this.input_longitude = 116.336496
    this.input_latitude = 39.942178
    // marker.setMap(o)
    this.tapefun(this.tape)
    this.huo()
  },
  methods: {
    SelectChange(val) {
      console.log(val)
    },
    Save_btn() {
      if (this.value && this.value1 && this.input_longitude && this.input_latitude) { // 可保存
        this.tapefun(this.tape)
        this.save_success = true // 保存成功
        this.save = false
        this.edit = true // 可编辑
        this.disabled = true
        this.add_marker = false
        this.markers[0].draggable = false
      } else { // 不可保存
        var titles = ''
        if (!this.value) {
          titles = '省'
        } else if (!this.value1) {
          titles = '市'
        } else if (!this.input_longitude || this.input_latitude) {
          titles = '经纬度'
        }
        this.$alert('请检查' + titles + '是否填写', '', {
          confirmButtonText: '确定'
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: `action: ${ action }`
          //   })
          // }
        })
      }
    },
    Edit_btn() {
      if (this.edit === true) { // 可编辑状态
        console.log('可以编辑')
        this.edit = false
        this.save = true
        this.add_marker = true // 可修改marker
        this.disabled = false // 各选项框可编辑
        this.markers[0].draggable = true
      } else { // 不可编辑
        return false
      }
    },
    tapefun(data) {
      this.tape = data
      var name = data === 1 ? '高德' : data === 2 ? '百度' : data === 3 ? '腾讯' : '手绘'
      var data2 = {
        cpid: this.$store.state.user.companyId,
        id: this.id,
        mapName: name,
        mapType: data,
        province: this.value.provinceName,
        city: this.value1,
        mngMapLon: this.input_longitude,
        mngMapLat: this.input_latitude
      }
      post('/mngmapconfig/updMapConfigbyCpid', data2).then(res => {
        console.log(res)
      })
    },
    huo() {
      get('/mngmapconfig/getMapConfigbyCpid', { cpid: this.$store.state.user.companyId }).then(res => {
        console.log(res, this.options)
        if (res.data.city) {
          this.lfg = false
          for (var i1 = 0; i1 < this.options.length; i1++) {
            for (let i2 = 0; i2 < this.options[i1].citys.length; i2++) {
              if (res.data.city === this.options[i1].citys[i2].citysName) {
                this.value = JSON.stringify(this.options[i1])
                this.value1 = res.data.city
              }
            }
          }
        }
        console.log(res)
        this.tape = res.data.mapType
        this.id = res.data.id
        console.log(this.value1)
      })
    }
  }

}
</script>
<style scoped>
@import './css/place.css';
.mapinstall{
  width: 100%;
  height: calc(100vh - 80px);
  padding: 15px;
  background: #f0f3ff;
  overflow: hidden;
}
.map_box{
  width: calc(100% - 245px);
  height: calc(100% - 30px);
  position: absolute;
  right: 15px;
}
.map_box .map{
  width:100%;
  height: 100%;
}
.scroll_box{
  background: #fff;
  width: 200px;
  height: calc(100% - 30px);
  position:absolute;
  left: 15px;
  top: 15px;
  z-index: 10;
  overflow-x: hidden;
  padding: 0;
  margin: 0 !important;
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius:6px;
}
.titles {
  padding-top:20px;
  padding-left:30px;
  text-align: left;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
}
.leftdiv{
  width: 200px;
  text-align: center;
  z-index: 999;
  margin-top: -15px;
  margin-left:-40px;
  background: #f0f3ff;
}
.leftdiv .top{
  border-radius: 0 0 6px 6px;
  width: 100%;
  height: 260px;
  margin:0;
  background: #fff;
}
.top>div:not(.titles){
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
  margin-top: 30px;
}
.leftdiv .bottom{
  padding-left: 30px;
  background: #fff;
  border-radius: 6px 6px 0 0;
  margin-top: 15px;
  text-align: left;
  width: 100%;
  height: calc(100% - 275px);
}
.leftdiv .bottom .titles{
  padding-left:0;
}
.bottom div:not(.titles), .bottom input{
  font-size:14px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(29,33,51,1);
}
.bottom .el-input,.bottom .el-select{
  height: 30px;
  width: 140px;
}
.bottom .el-input,.bottom .el-select, .bottom div:not(.titles){
  margin-top:20px;
}
.bottom .el-button{
  margin-top: 20px;
}
/* .bottom .btn{
  width:120px;
  height:30px;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 0px 21px 0px rgba(63,106,255,0.28);
  border-radius:15px;
  text-align:center;
  line-height: 30px;
  cursor: pointer;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1)!important;
  margin-left: 10px;
} */
.bottom{
  padding-bottom: 30px;
}
/* 灰色按钮 */
/* .bottom .gray{
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius:6px;
  border:1px solid rgba(225,225,225,1);
  border-radius:15px;
  font-family:PingFang SC;
  font-weight:400;
  color:#DDDEE0!important;
}
.bottom .gray:hover{
  cursor: default;
} */
.star {
  display: inline-block;
  position:relative;
  top: 3px;
  left: -2px;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(204,51,51,1);
}
.exports_btn{
  border: 1px solid #B7C9F7;
  width: 70%;
  color:#B7C9F7;
  background:#fff;
  margin: auto;
  margin:30px 0 0 40px;
}
.exports_btn:hover{
  border: 1px solid #0340F7;
  opacity: 0.5;
  color: #0340F7;
}
.map_name{
  display:inline-block;
  margin-left:15px;
}
/deep/ .amap-logo ,/deep/ .amap-copyright{
  display: none;
  position: absolute;
  left: -400px;
}
</style>

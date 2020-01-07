<template>
  <div class="routeinstall">
    <el-scrollbar class="scroll_box" tag="ul">
      <div class="leftdiv">
        <!-- <el-tabs v-model="activeName" type="margin-left:10px;" @tab-click="handleClick">
          <el-tab-pane label="增加" name="qing"> -->
        <div class="leftdiv_list title_name">设备标记</div>
        <div class="leftdiv_list">
          <div class="star">*</div>
          点位类型
          <!-- <div class="names_type">设备</div> -->
          <el-select v-model="value1" placeholder="请选择" class="elselect" style="float:right;" @change="qing()">
            <el-option
              v-for="item in option10"
              :key="item.value"
              :label="item.typeName"
              :value="JSON.stringify(item)"
            >
            </el-option>
          </el-select>
        </div>
        <div class="leftdiv_list">
          <div class="star">*</div>
          点位名称
          <el-input v-model="value2" placeholder="请输入内容" :disabled="new_built"></el-input>
        </div>
        <div class="leftdiv_list">
          点位备注
          <el-input v-model="value3" placeholder="请输入内容" :disabled="new_built"></el-input>
        </div>
        <div class="leftdiv_list instructions">
          <!-- <div class="star">*</div> -->
          点位说明
          <el-input
            v-model="value4"
            type="textarea"
            class="textarea"
            maxlength="100"
            :rows="2"
            placeholder="请输入内容"
            resize="none"
            :disabled="new_built"
          >
          </el-input>
        </div>
        <div class="leftdiv_list">
          <div class="star">*</div>
          绑定设备
          <el-select v-model="value5" placeholder="请选择" class="elselect" style="float:right;" :disabled="new_built">
            <el-option
              v-for="(item, index) in attractions1"
              :key="index"
              :label="item.name"
              :value="JSON.stringify(item)"
            >
            </el-option>
          </el-select>
        </div>
        <div class="leftdiv_list">
          <div class="star">*</div>
          绑定景点
          <el-select v-model="value6" placeholder="请选择" class="elselect" style="float:right;" :disabled="new_built">
            <el-option
              v-for="(item, index) in attractions2"
              :key="index"
              :label="item.pointName"
              :value="JSON.stringify(item)"
            >
            </el-option>
          </el-select>
        </div>
        <div class="leftdiv_list">
          <div class="star">*</div>
          绑定场所
          <el-select v-model="value7" placeholder="请选择" class="elselect" style="float:right;" :disabled="new_built">
            <el-option
              v-for="(item, index) in attractions3"
              :key="index"
              :label="item.pointName"
              :value="JSON.stringify(item)"
            >
            </el-option>
          </el-select>
        </div>
        <div class="leftdiv_list location title_name" style="padding-left:20px;">
          位置信息
          <div class="blue_bar"></div>
        </div>
        <div class="leftdiv_list"><div class="star">*</div>经度<el-input v-model="value8" placeholder="请输入内容" :disabled="new_built"></el-input></div>
        <div class="leftdiv_list"><div class="star">*</div>纬度<el-input v-model="value9" placeholder="请输入内容" :disabled="new_built"></el-input></div>
        <div class="leftdiv_list">
          <el-button v-if="new_built" :type="!new_built ? '': 'primary'" size="mini" style="float: left; margin-left: 15%;" round @click="new_building()">新建</el-button>
          <el-button v-if="!new_built" :type="'primary'" size="mini" style="float: left; margin-left: 15%;" round @click="new_built=!new_built">取消</el-button>
          <el-button :type="new_built ? '': 'primary'" :disabled="new_built" size="mini" style="float: right; margin-right: 15%;" round @click="ti()">保存</el-button>
        </div>
        <!-- </el-tab-pane>
          <el-tab-pane label="删除" name="qu">
            删除
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </el-scrollbar>
    <el-amap class="map map_box" :vid="'amap-vue'" :map-style="mapStyle1" :zoom="zoom" :center="center" :events="events" :amap-manager="amapManager">
      <el-amap-marker
        v-for="(marker,index) in markers"
        :key="index"
        :position="marker.position"
        :events="marker.events"
        :icon="marker.icon"
        :ext-data="marker"
        top-when-click="true"
        :draggable="marker.draggable"
        :raise-on-drag="marker.raiseOnDrag"
      ></el-amap-marker>
      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :offset="window.offset">
        <div :key="window.position[0]">
          <el-button v-if="markerid !== 'a'" type="primary" plain @click="edit_btn">编辑</el-button>
          <el-button v-if="markerid !== 'a'" type="primary" plain @click="delete_btn">删除</el-button>
          <el-button v-if="markerid === 'a'" type="primary" plain @click="delete_btn">取消</el-button>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import { post, get } from '@/api/axios'
import VueAMap from 'vue-amap'

// import $ from 'jquery'
var amapManager = new VueAMap.AMapManager()
export default {
  name: 'Map',
  data() {
    return {
      zoom: 16,
      center: [116.336496, 39.942178],
      mapStyle1: 'amap://styles/whitesmoke',
      activeName: 'qing',
      tape: 1,
      amapManager,
      value1: '所有场所', // value1 ~ value7为页面从上往下数第几个value
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      new_built: true, // 默认可以点击
      new_marker: false, // 新建的marker
      new_marker_id: '', // 新建marker的id
      new_marker_save: false, // 新建的marker是否点击了保存-默认false  未保存
      old_id: '',
      old_icon: '',
      olc_click: 0,
      maps: null,
      data_all: null, // 页面所有加载的marker
      markerid: '',
      events: {
        'click': (e) => {
          if (this.new_built === false && this.new_marker) { // 若新建按钮已经点击--- 默认为true 点击之后为false
            // this.click_map = (this.click_map + 1)
            var marker = {}
            this.new_marker = false
            marker = {
              position: [e.lnglat.lng, e.lnglat.lat],
              icon: require('../../assets/icon/icon_address.png'),
              draggable: false,
              extData: {
                id: 'a', // 每次新建 都需要一个id 后端传入 这个id仅供测试使用
                pointName: this.value2// 带星号的选项必须都对应上
              }
            }
            this.value8 = e.lnglat.lng
            this.value9 = e.lnglat.lat
            this.new_marker_id = 'a'
            this.markerid = 'a'
            this.markers.push(marker)
            this.ups_load(this.markers)
          } else if (this.markerid !== 'a') {
            this.$message({
              message: '请先点击新建按钮',
              type: 'warning'
            })
          } else {
            this.value8 = e.lnglat.lng
            this.value9 = e.lnglat.lat
            this.markers[this.markers.length - 1].position = [e.lnglat.lng, e.lnglat.lat]
          }
        }
      },
      overlayGroups: [],
      data: [],
      markers: [],
      windows: [],
      window: '',
      slotStyle: {
        padding: '2px 8px',
        color: '#333'
      },
      click_num: '', // 点击的第几个marker
      option: [ // 点位类型
        {
          value: '1',
          label: '游客中心'
        },
        {
          value: '2',
          label: '景点'
        },
        {
          value: '3',
          label: '休息区'
        },
        {
          value: '4',
          label: '观景台'
        }
      ],
      datas: [],
      attractions1: [],
      attractions2: [],
      attractions3: [],
      option10: []
    }
  },
  computed: {
    open: function() {
      return (this.value2 && this.value5 && this.value6 && this.value7 && this.value8 && this.value9)
    }
  },
  watch: {
    data() {
      // this.addmarker()
    },
    new_built() {
      this.markerid = ''
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.value5 = ''
      this.value6 = ''
      this.qing()
    }
  },
  created() {
    // this.addfun()
    // 获取数据或者加载数据
    window.handler = this.handler
  },
  mounted: function() {
    // this.ups_load(this.datas)
    get('/mngpoint/getpointtypeByProperties', { cpid: this.$store.state.user.companyId, properties: 3 }).then(res => {
      var that = this
      this.option10 = res.data
      for (var i = 0; i < that.option10.length; i++) {
        that.option10[i].icon = process.env.VUE_APP_BASE_API + '/mngpoint/img/icon/' + that.option10[i].url + '?t=' + new Date().getTime()
      }
      this.value1 = JSON.stringify(res.data[0])
      this.qing()
    })
    get('/mngpoint/getPointInfoByTypeId', { cpid: this.$store.state.user.companyId, typeid: 1 }).then(res => {
      this.attractions2 = res.data
    })
    get('/mngpoint/getpointtypeByProperties', { cpid: this.$store.state.user.companyId, properties: 2 }).then(res => {
      this.attractions3 = []
      for (var i = 0; i < res.data.length; i++) {
        get('/mngpoint/getPointInfoByTypeId', { cpid: this.$store.state.user.companyId, typeid: res.data[i].id }).then(res2 => {
          for (let i2 = 0; i2 < res2.data.length; i2++) {
            this.attractions3.push(res2.data[i2])
          }
        })
      }
    })
    this.shebei()
  },
  methods: {
    shebei() {
      console.log(1232132)
      get('/camara/getAll', { cpid: this.$store.state.user.companyId }).then(res => {
        this.attractions1 = res
      })
    },
    qing() {
      var that = this
      get('/mngpoint/getPointInfoByTypeId', { cpid: this.$store.state.user.companyId, typeid: JSON.parse(this.value1).id }).then(res => {
        var data = []
        for (var i = 0; i < res.data.length; i++) {
          var icon
          for (var i1 = 0; i1 < that.option10.length; i1++) {
            if (that.option10[i1].id === res.data[0].pointTypeId) {
              icon = that.option10[i1].icon
            }
          }
          data.push({
            icon: icon,
            position: [res.data[i].mngPointLon, res.data[i].mngPointLat],
            id: res.data[i].id,
            pointName: res.data[i].pointName,
            remarks: res.data[i].remarks,
            pointType: '景点',
            mngPointLon: res.data[i].mngPointLon,
            mngPointLat: res.data[i].mngPointLat,
            label: res.data[i].placeName,
            name: res.data[i].pointName,
            path: [res.data[i].mngPointLon, res.data[i].mngPointLat],
            draggable: false,
            extData: {
              id: res.data[i].id,
              pointName: res.data[i].pointName,
              remarks: res.data[i].remarks,
              pointType: '景点',
              mngPointLon: res.data[i].mngPointLon,
              mngPointLat: res.data[i].mngPointLat,
              label: res.data[i].placeName,
              name: res.data[i].pointName,
              path: [res.data[i].mngPointLon, res.data[i].mngPointLat]
            }
          })
        }
        this.data_all = data
        this.ups_load(data)
      })
    },
    change(val) {
      var that = this
      if (this.click_num !== null && this.windows[this.click_num] !== undefined) {
        this.windows[this.click_num].visible = false
      }
      const nums = parseInt(val) - 1
      const obj = {}
      this.option.forEach((value, index) => {
        if (nums === index) {
          obj.label = value.label
          obj.value = nums
        }
      })
      // console.log(obj) //点击change 切换的内容
      // 每次点击change 重新调用ups_load 并修改
      const asd = [
        {
          value: '1',
          label: '游客中心',
          name: '游客中心',
          path: [116.337033, 39.938723],
          icon: require('../../assets/icon/icon_youke.png')
        },
        {
          value: '2',
          label: '景点',
          name: '景点',
          path: [116.333878, 39.941471],
          icon: require('../../assets/icon/icon_jingdian.png')
        }
      ]
      that.ups_load(asd)
      // this.windows = asd
      // this.markers = asd
    },
    ups_load(data) {
      const markers = []
      const windows = []
      const self = this
      for (let i = 0; i < data.length; i++) {
        var marker = {
          position: data[i].position,
          icon: data[i].icon,
          draggable: false,
          extData: data[i].extData,
          events: {
            click(e) {
              if (self.markerid !== 'a' && self.new_built === true) {
                self.markerid = e.target.Uh.extData.extData.id
                self.windows.forEach(window => {
                  window.visible = false
                })
                self.window = self.windows[i]
                self.$nextTick(() => {
                  self.window.visible = true
                  self.window.position = self.markers[i].position
                })
                // 左侧数据同步----只有坐标-其他未写
                self.value8 = this.getPosition().lng
                self.value9 = this.getPosition().lat
                self.value2 = this.Uh.extData.extData.name
                self.value3 = this.Uh.extData.extData.pointName
                self.value4 = this.Uh.extData.extData.remarks
                self.markers.forEach((marker, nowindex) => {
                  if (marker.extData.id === self.markerid) {
                    marker.icon = require('../../assets/icon/icon_address.png')
                  } else {
                    if (marker.extData.id === self.new_marker_id && !self.new_marker_save) {
                      marker.icon = ''
                    } else {
                      marker.icon = JSON.parse(self.value1).icon
                      // require('../../assets/icon/icon_jingdian.png')
                    }
                  }
                })
              } else {
                console.log(e)
                if (this.Uh.extData.extData.id === 'a') {
                  self.windows.forEach(window => {
                    window.visible = false
                  })
                  self.window = self.windows[i]
                  self.$nextTick(() => {
                    self.window.visible = true
                    self.window.position = self.markers[i].position
                  })
                }
              }
            },
            dragstart() {
              self.window.visible = false
            },
            dragging() {
              self.value6 = this.getPosition().lng
              self.value7 = this.getPosition().lat
              self.markers.forEach((marker, index) => {
                if (marker.extData.id === self.markerid) {
                  marker.position = [this.getPosition().lng, this.getPosition().lat]
                }
              })
            }
          }
        }
        markers.push(marker)
        windows.push({
          position: data[i].position,
          visible: false,
          offset: [10, -20],
          closeWhenClickMap: true
        })
      }
      this.markers = markers
      this.data_all = markers
      this.windows = windows
    },
    edit_btn() {
      this.new_built = false // 新建置灰
      this.click_map = 2
      this.markers.forEach((marker) => {
        if (this.markerid === marker.extData.id) {
          marker.draggable = true
          this.window = {
            position: marker.position,
            visible: false,
            offset: [10, -20],
            closeWhenClickMap: true
          }
        }
      })
      this.windows.forEach(window => {
        window.visible = false
      })
      // this.window = self.windows[this.click_num]
      // this.$nextTick(() => {
      //   this.window.visible = false
      // })
    },
    delete_btn() {
      var that = this
      that.$confirm(that.markerid !== 'a' ? '此操作将永久删除该文件, 是否继续?' : '请确认是否取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((e) => {
        that.window.visible = false // 信息窗体隐藏
        that.click_map = 0
        if (that.markerid !== 'a') {
          get('/mngpoint/delPointInfo', { id: that.markerid }).then(res => {
            post('/camara/updpoint', { pid: that.markerid * 1, binding: 0 }).then(res => {
              if (res.msg === 'SUCCESS') {
                this.qing()
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
              }
            })
          })
        } else {
          this.qing()
        }
        that.markerid = ''
        that.value2 = ''
        that.value3 = ''
        that.value4 = ''
        that.value5 = ''
        that.value6 = ''
        that.value7 = ''
        that.value8 = ''
        that.value9 = ''
        that.new_built = true // 新建
      })
    },
    ti() {
      // 判断每一项数据中的参数都不是空，才能保存 new_marker_save: false,-----> 才能变为true
      // this.markers.forEach((marker) => {
      if (this.value1 !== '' && this.value2 !== '' && this.value5 !== '' && this.value6 !== '' ? true : this.value7 !== '' ? true : false && this.value8 !== '' && this.value9 !== '') { // 判断输入项都不为空才能保存
        this.new_built = true // 新建按钮高亮
        // 新建或者保存  都需要对window隐藏
        if (this.click_num) {
          this.windows[this.click_num].visible = false
        }
        var data = {
          cpid: this.$store.state.user.companyId,
          pointTypeId: JSON.parse(this.value1).id,
          pointProperties: 3,
          pointName: this.value2,
          remarks: this.value3,
          pointDescription: this.value4,
          equipmentId: JSON.parse(this.value5).pid,
          pointType: JSON.parse(this.value1).typeName,
          mngPointLon: this.value8,
          mngPointLat: this.value9
        }
        if (this.value6 !== '') {
          data.scenicSpotId = JSON.parse(this.value6).id
          data.scenicSpotName = JSON.parse(this.value6).pointName
        }
        if (this.value7 !== '') {
          data.placeName = JSON.parse(this.value7).pointName
          data.placeId = JSON.parse(this.value7).id
        }
        post('/mngpoint/savePointInfo', data).then(res => {
          post('/camara/updpoint', { pid: data.equipmentId * 1, binding: 1 }).then(res => {
            this.qing()
            this.shebei()
            this.markerid = ''
            this.value2 = ''
            this.value3 = ''
            this.value4 = ''
            this.value5 = ''
            this.value6 = ''
            this.value7 = ''
            this.value8 = ''
            this.value9 = ''
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
        })
      } else {
        this.$message({
          message: '请认真检查填写项',
          type: 'warning'
        })
      }
      // })
    },
    new_building() {
      var that = this
      this.click_map = 0 // 重新初始化 最新添加的marker
      this.new_built = false // 新建按钮置灰
      this.new_marker = true
      this.window = false // window初始化
      this.markers.forEach((marker) => {
        if (this.old_icon) {
          if (marker.extData.id === this.old_id) {
            marker.icon = this.old_icon
          }
        }
      })
      that.value2 = ''
      that.value3 = ''
      that.value4 = ''
      that.value5 = ''
      that.value6 = ''
      that.value7 = ''
      that.value8 = ''
      that.value9 = ''
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
      // o.remove(that.overlayGroups)
      var marker = new AMap.Marker({
        position: [that.value6, that.value7],
        text: '123'
      })
      markers.push(marker)
      this.overlayGroups = new AMap.OverlayGroup(markers)
      o.add(that.overlayGroups)
    },
    wei(a, b, that) {
      this.data[this.data.length - 1] = [a, b]
      that.value6 = a
      that.value7 = b
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
  padding: 15px;
  background: #f0f3ff;
  overflow: hidden;
  position:relative;
}
.map_box{
  width: calc(100% - 345px);
  height: calc(100% - 30px);
  z-index: 10;
  position:absolute;
  right: 15px;
}
.scroll_box{
  width: 300px;
  height: calc(100% - 30px);
  background: #fff;
  position:absolute;
  left: 15px;
  top: 15px;
  z-index: 10;
  overflow-x: hidden;
}
.scroll_box .leftdiv{
  margin-left:-45px;
}
.leftdiv_list{
  width: 80%;/*--------------*/
  margin: auto;
  height: 7vh;
  margin-top: 5px;/*--------------*/
  padding-left:10px;/*--------------*/
  font-size: 1.2vh;
  overflow: hidden;
  line-height: 6vh;
  position:relative;/*--------------*/
}

.leftdiv_list .elselect{
  float: right;
  width: 70%;
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
  width: 70%;/*--------------*/
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
  height: 100%;
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
.el-select .el-input .el-select__caret {
    line-height: 10px;
}
.title_name{
  font-size: 16px;
  font-weight: 800;
  color: #201F32;
  position: relative;
}
.title_name .blue_bar{
  position: absolute;
  top: 27%;
  left: 0;
  width: 6px;
  height: 18px;
  border-radius: 3px;
  background: #3A65FF;
}
.star{
  position: absolute;
  top: 2px;
  left: 2px;
  color:#F54658;
}
.instructions{
  height: 25%;
  overflow-x: auto;
}
.names_type{
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  margin-left: 20px;
}
</style>

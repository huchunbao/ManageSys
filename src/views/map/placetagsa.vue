<template>
  <div class="routeinstall">
    <el-scrollbar class="scroll_box" tag="ul">
      <div class="leftdiv">
        <!-- <el-tabs v-model="activeName" type="margin-left:10px;" @tab-click="handleClick">
          <el-tab-pane label="增加" name="qing"> -->
        <div class="leftdiv_list title_name">场所标记</div>
        <div class="leftdiv_list">
          <div class="star">*</div>
          点位类型
          <el-select v-model="value1" placeholder="请选择" class="elselect" style="float:right;" @change="qing()">
            <el-option
              v-for="(item, index) in option"
              :key="index"
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
          绑定景点
          <el-select v-model="value5" placeholder="请选择" class="elselect" style="float:right;" :disabled="new_built">
            <el-option
              v-for="(item, index) in attractions"
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
        <div class="leftdiv_list"><div class="star">*</div>经度<el-input v-model="value6" placeholder="请输入内容" :disabled="new_built"></el-input></div>
        <div class="leftdiv_list"><div class="star">*</div>纬度<el-input v-model="value7" placeholder="请输入内容" :disabled="new_built"></el-input></div>
        <div class="leftdiv_list btn_box">
          <el-button v-if="new_built" :type="!new_built ? '': 'primary'" size="mini" style="float: left; margin-left: 15%;" round @click="new_building()">新建</el-button>
          <el-button v-if="!new_built" :type="'primary'" size="mini" style="float: left; margin-left: 15%;" round @click="new_built=!new_built">取消</el-button>
          <el-button :type="new_built ? '': 'primary'" :disabled="new_built" size="mini" style="float: right; margin-right: 15%;" round @click="ti()">保存</el-button>
        </div>
      </div>
    </el-scrollbar>
    <el-amap class="map map_box" :vid="'amap-vue'" :zoom="zoom" :center="center" :events="events" :map-style="mapStyle1" :amap-manager="amapManager">
      <el-amap-marker
        v-for="(marker, index) in markers"
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
        <div>
          <el-button v-if="markerid !== 'a'" type="primary" plain @click="edit_btn">编辑</el-button>
          <el-button v-if="markerid !== 'a'" type="primary" plain @click="delete_btn">删除</el-button>
          <el-button v-if="markerid === 'a'" type="primary" plain @click="delete_btn">取消</el-button>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
import { post, get } from '@/api/axios'
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
      value1: '', // value1 ~ value7为页面从上往下数第几个value
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
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
            this.disabled = false
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
            this.value6 = e.lnglat.lng
            this.value7 = e.lnglat.lat
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
            this.value6 = e.lnglat.lng
            this.value7 = e.lnglat.lat
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
      ],
      datas: [],
      attractions: [{ // 绑定景点
        value: '1',
        label: '景点1'
      }, {
        value: '2',
        label: '景点2'
      }, {
        value: '3',
        label: '景点3'
      }]
    }
  },
  computed: {
    open: function() {
      return (this.value1 && this.value2 && this.value5 && this.value6 && this.value7)
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
    this.ups_load(this.datas)
    this.updata()
  },
  methods: {
    qing() {
      var that = this
      var data = {
        cpid: this.$store.state.user.companyId,
        typeid: JSON.parse(this.value1).id
      }
      get('/mngpoint/getPointInfoByTypeId', data).then(res => {
        var data = []
        for (var i = 0; i < res.data.length; i++) {
          var icon
          for (var i1 = 0; i1 < that.option.length; i1++) {
            console.log(that.option[i1].id, res.data[0].pointTypeId)
            if (that.option[i1].id === res.data[0].pointTypeId) {
              icon = that.option[i1].icon
            }
          }
          data.push({
            icon: icon,
            position: [res.data[i].mngPointLon, res.data[i].mngPointLat],
            id: res.data[i].id,
            pointName: res.data[i].pointName,
            remarks: res.data[i].remarks,
            pointType: '场所',
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
    // upoption(e) {
    //   get('/mngpoint/getPointInfoByTypeId', { cpid: 1, typeid: e }).then(res => {
    //     var data = []
    //     for (var i = 0; i < res.data.length; i++) {
    //       data.push({
    //         label: res.data[i].placeName,
    //         name: res.data[i].pointName,
    //         path: [res.data[i].mngPointLon, res.data[i].mngPointLat],
    //         icon: require('../../assets/icon/icon_jingdian.png')
    //       })
    //     }
    //     // this.ups_load(data)
    //   })
    // },
    updata() {
      const that = this
      get('/mngpoint/getpointtypeByProperties', { cpid: this.$store.state.user.companyId, properties: 2 }).then(res => {
        if (res.data.length === 0) {
          get('mngpoint/initpointtype', { cpid: this.$store.state.user.companyId }).then(res2 => {
            this.updata()
          })
        } else {
          that.option = res.data
          for (var i = 0; i < that.option.length; i++) {
            that.option[i].icon = process.env.VUE_APP_BASE_API + '/mngpoint/img/icon/' + that.option[i].url + '?t=' + new Date().getTime()
          }
          that.value1 = JSON.stringify(res.data[0])
          this.qing()
        }
      })
      get('/mngpoint/getPointInfoByTypeId', { cpid: this.$store.state.user.companyId, typeid: 1 }).then(res => {
        that.attractions = res.data
      })
    },
    change(val) {
      var that = this
      // if (that.click_num !== null && that.windows[that.click_num] !== undefined) {
      //   that.windows.visible = false
      // }
      const nums = parseInt(val) - 1
      const obj = {}
      that.option.forEach((value, index) => {
        if (nums === index) {
          obj.label = value.label
          obj.value = nums
        }
      })
      // console.log(obj) //点击change 切换的内容
      // 每次点击change 重新调用ups_load 并修改
      // const asd = [
      //   {
      //     value: '1',
      //     label: '游客中心',
      //     name: '游客中心',
      //     path: [116.337033, 39.938723],
      //     icon: require('../../assets/icon/icon_youke.png')
      //   },
      //   {
      //     value: '2',
      //     label: '景点',
      //     name: '景点',
      //     path: [116.333878, 39.941471],
      //     icon: require('../../assets/icon/icon_jingdian.png')
      //   }
      // ]
      // that.ups_load(asd)
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
                self.value6 = this.getPosition().lng
                self.value7 = this.getPosition().lat
                self.value2 = this.Uh.extData.extData.name
                self.value3 = this.Uh.extData.extData.pointName
                self.value4 = this.Uh.extData.extData.remarks
                self.markers.forEach((marker, nowindex) => {
                  console.log(marker)
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
        console.log(that.data_all)
        if (that.markerid !== 'a') {
          get('/mngpoint/delPointInfo', { id: that.markerid }).then(res => {
            console.log(res)
            if (res.msg === 'SUCCESS') {
              this.qing()
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
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
        that.new_built = true // 新建
      })
    },
    ti() {
      // 判断每一项数据中的参数都不是空，才能保存 new_marker_save: false,-----> 才能变为true
      // this.markers.forEach((marker) => {
      if (this.value2 !== '' && this.value5 !== '' && this.value6 !== '' && this.value7 !== '') { // 判断输入项都不为空才能保存
        this.new_built = true // 新建按钮高亮
        // 新建或者保存  都需要对window隐藏
        if (this.click_num) {
          this.windows[this.click_num].visible = false
        }
        var data = {
          cpid: this.$store.state.user.companyId,
          pointTypeId: JSON.parse(this.value1).id,
          pointProperties: 2,
          pointName: this.value2,
          remarks: this.value3,
          pointDescription: this.value4,
          scenicSpotId: JSON.parse(this.value5).id,
          scenicSpotName: JSON.parse(this.value5).pointName,
          pointType: JSON.parse(this.value1).typeName,
          mngPointLon: this.value6,
          mngPointLat: this.value7
        }
        if (this.markerid !== 'a') {
          data.id = this.markerid
        }
        // var that = this
        post('/mngpoint/savePointInfo', data).then(res => {
          console.log('保存后')
          console.log(res)
          this.qing()
          this.markerid = ''
          this.value2 = ''
          this.value3 = ''
          this.value4 = ''
          this.value5 = ''
          this.value6 = ''
          this.value7 = ''
          this.$message({
            message: '保存成功',
            type: 'success'
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
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.value5 = ''
      this.value6 = ''
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
@import './css/place.css';
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
  overflow-y: auto;
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
  height: 100px;
  resize:none;
}
.zhogn{
  background: #ccc;
}
.zhogn td{
  background: #ccc;
}
.btn_box {
  text-align: center;
}
/* .new_btn, .save_btn{
  width:calc((100% - 15px)/2);
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
}*/
/* 灰色按钮 */
/* .gray{
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border:1px solid rgba(225,225,225,1);
  font-family:PingFang SC;
  font-weight:400;
  color:#DDDEE0!important;
}
.gray:hover{
  cursor: default;
} */
  /deep/ .el-select .el-input .el-select__caret {
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
  height: 98px;
}
.names_type{
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  margin-left: 20px;
}
</style>

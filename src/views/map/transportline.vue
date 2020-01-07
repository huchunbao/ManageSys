<template>
  <div class="routeinstall">
    <div class="scroll_box" tag="ul">
      <!-- 第一页面 -->
      <div v-if="!divtab">
        <el-table
          ref="singleTable"
          style="width: 100%"
          :data="markers"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <div v-for="(item, i) in props.row.fanglist" :key="i" class="row1">
                  <div class="row2">{{ i + 1 }}</div>
                  <div class="row2">{{ item.pointName }}</div>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="路线名称"
            prop="label.content1"
          >
          </el-table-column>
          <el-table-column
            label="路线类型"
            prop="label.vehiclesType2"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            prop="label.linetype"
          >
            <template slot-scope="props">
              <span class="bianshan" @click="bian(props)">编辑</span>
              <span class="bianshan" @click="shan(props)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button v-if="!divtab" type="primary" style="margin-left:20%;width:60%;margin-top:5%;" round @click="divtab=!divtab, linetab='', currentRow=[]">新建路线</el-button>
      <!-- 第二页面 -->
      <div v-if="divtab" id="scroll" class="leftdiv">
        <!-- <el-tabs v-model="activeName" type="margin-left:10px;" @tab-click="handleClick">
          <el-tab-pane label="增加" name="qing"> -->
        <div class="leftdiv_list title_name">车船线路</div>
        <div class="leftdiv_list">
          <el-select v-model="value" placeholder="请选择" class="elselect" style="float:right;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>路线类型<div class="star">*</div>
        </div>
        <div class="leftdiv_list">
          <div class="star">*</div>
          路线名称
          <el-input v-model="name" placeholder="请输入内容"></el-input>
        </div>
        <div class="leftdiv_list">
          路线备注
          <el-input v-model="bei" placeholder="请输入内容"></el-input>
        </div>
        <div class="leftdiv_list">
          <div class="star">*</div>
          路线的站点
          <ul class="img_bg_box">
            <li @click="jia()"><img src="../../assets/images/icon_jia.png"></li>
            <li style="position:relative;" @click="jian()"><img
              src="../../assets/images/icon_jian.png"
              style="position:absolute;top:9px;left:0px;"
            ></li>
            <li @click="shang()"><img src="../../assets/images/icon_up.png"></li>
            <li @click="xia()"><img src="../../assets/images/icon_down.png"></li>
          </ul>
        </div>
        <div class="leftdiv_list">
          <el-table
            ref="singleTable"
            :data="data"
            row-key
            highlight-current-row
            :row-class-name="tableRowClassName"
            :header-cell-style="{background:'#EBEFF8'}"
            style="width: 100%; font-size:10px;"
            @row-click="onRowClick"
          >
            <el-table-column
              prop="单选"
              type="index"
              :index="indexMethod"
              label="序号"
            >
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.name" type="text" class="datainp" placeholder="请输入名称">
              </template>
            </el-table-column>
            <el-table-column
              prop="indt"
              label="定位"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="leftdiv_list"><div class="star">*</div>绑定设备</div>
        <div class="leftdiv_list">
          <el-select v-model="value2" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in options2"
              :key="item.pid"
              :label="item.name"
              :value="item.pid"
            ></el-option>
          </el-select>
        </div>
        <div v-if="value == '3'" class="leftdiv_list">
          <div class="star">*</div>
          首班车时间
          <el-time-select
            v-model="shijian"
            placeholder="起始时间"
            :picker-options="{
              start: '08:30:00',
              step: '00:15:00',
              end: '18:30:00',
              format: 'HH:mm:ss'
            }"
          >
          </el-time-select>
        </div>
        <div v-if="value == '3'" class="leftdiv_list">
          <div class="star">*</div>
          末班车时间
          <!-- <el-input v-model="shijian2" placeholder="请输入内容"></el-input> -->
          <el-time-select
            v-model="shijian2"
            placeholder="结束时间"
            :picker-options="{
              start: '08:30:00',
              step: '00:15:00',
              end: '18:30:00',
              format: 'HH:mm:ss',
              minTime: shijian
            }"
          >
          </el-time-select>
        </div>
        <div v-if="value == '3'" class="leftdiv_list">
          <div class="star">*</div>
          间隔时间(分钟)
          <el-input-number v-model="shijian3" :min="0" :max="300" style="float: right;" size="small"></el-input-number>
        </div>
        <div class="leftdiv_list">
          <el-button type="primary" style="float: left; margin-right: 15%;" round @click="divtab=!divtab">返回</el-button>
          <el-button type="primary" style="float: right; margin-right: 15%;" round @click="ti()">保存</el-button>
        </div>
      </div>
    </div>
    <!-- 地图 -->
    <el-amap
      class="map map_box"
      :vid="'amap-vue'"
      :zoom="zoom"
      :center="center"
      :map-style="mapStyle1"
      :events="events"
      :amap-manager="amapManager"
    >
      <div v-for="(marker, index) in markers" :key="index">
        <!-- <el-amap-marker :position="marker.position" :label="marker.label" :vid="index" /> -->
        <el-amap-polyline :path="marker.path" :stroke-color="linetab == marker.id ? linecolor : linecolor2" :z-index="linetab == marker.id ? 120 : 100" />
        <div v-for="(circle, circleindex) in marker.path" :key="circleindex">
          <el-amap-marker :position="circle" :vid="circleindex" :content="linecontent(circleindex, marker)" :z-index="linetab == marker.id ? 120 : 100" />
        </div>
      </div>
    </el-amap>
    <div v-if="tank" class="tank">
      {{ tank }}
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
import { get, post } from '@/api/axios'
var amapManager = new VueAMap.AMapManager()
export default {
  name: 'Map',
  data() {
    return {
      divtab: false,
      linecolor: '#e79f3c',
      linecolor2: '#7f85f5',
      linetab: '1',
      tank: '',
      currentRow: '',
      name: '',
      bei: '',
      zoom: 16,
      center: [116.336496, 39.942178],
      mapStyle1: 'amap://styles/whitesmoke',
      amapManager,
      events: {},
      overlayGroups: [],
      data: [], // table 列表数据集合
      rowindex: '',
      dataid: 0,
      options: [
        {
          value: '1',
          label: '小火车'
        },
        {
          value: '2',
          label: '缆车'
        },
        {
          value: '3',
          label: '大巴'
        },
        {
          value: '4',
          label: '游船'
        }
      ],
      value: '',
      options2: [],
      value2: '',
      line: '',
      markers: [],
      shijian: '',
      shijian2: '',
      shijian3: ''
    }
  },
  computed: {
    isopen: function() {
      return (this.value && this.name && this.value2 && this.data)
    }
  },
  watch: {
    value2() {
      console.log(this.value2, 123132132)
    },
    divtab() {
      if (!this.divtab) {
        this.data = []
        this.name = ''
        this.bei = ''
        this.value = ''
        this.value2 = ''
        this.shijian = ''
        this.shijian2 = ''
        this.shijian3 = ''
        this.shebei()
        this.addmarker()
      }
    }
  },
  created() {
    this.addfun()
    this.shebei()
    this.shua()
  },
  methods: {
    vehiclesType(data) {
      for (var i = 0; i < this.options.length; i++) {
        if (data === this.options[i].value) {
          return this.options[i].label
        }
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
      this.linetab = val.id
    },
    shebei() {
      get('/camara/getEqType?', { cpid: this.$store.state.user.companyId, system_id: 2 }).then(res => {
        console.log(res)
        this.options2 = res
      })
    },
    shua() {
      get('/mngCircuitInfo/getmngcircuitinfobytype', { cpid: this.$store.state.user.companyId, typeid: 2 }).then(res => {
        console.log(res)
        var data = res.data
        this.markers = []
        for (var i = 0; i < data.length; i++) {
          var path = []
          for (var y = 0; y < data[i].circuitpointlist.length; y++) {
            path.push([data[i].circuitpointlist[y].circuitPointLon, data[i].circuitpointlist[y].circuitPointLat])
          }
          this.markers.push({
            id: data[i].id,
            position: [data[i].circuitpointlist[data[i].circuitpointlist.length - 1].circuitPointLon, data[i].circuitpointlist[data[i].circuitpointlist.length - 1].circuitPointLat],
            label: {
              content1: data[i].circuitName,
              linetype: data[i].circuitType,
              remark: data[i].remark,
              vehiclesType: data[i].vehiclesType,
              vehiclesType2: this.vehiclesType(data[i].vehiclesType + ''),
              equimentId: data[i].equimentId + '',
              shijian: data[i].firstBusTime,
              shijian2: data[i].lastBusTime,
              shijian3: data[i].busIntervalTime
            },
            path: path,
            fanglist: data[i].circuitpointlist
          })
        }
        console.log(this.markers)
      })
    },
    linecontent(index, marker) {
      if (index + 1 === marker.path.length) {
        return '<div style="height: 20px; width: 20px;color: #fff; line-height: 20px; border-radius: 20px; font-size: 12px; text-align: center; background-color: #fd3d10;margin-left:1px; margin-top: 21px;">终<div>'
      } else if (index === 0) {
        return '<div style="height: 20px; width: 20px;color: #fff; line-height: 20px; border-radius: 20px; font-size: 12px; text-align: center; background-color: #07a803;margin-left:1px; margin-top: 21px;">起<div>'
      } else {
        return '<div style="height: 15px; width: 15px; border: 1.5px solid  #7f85f5; border-radius: 15px; background-color: rgba(255,255,255, 1);margin-left:3px; margin-top: 23px;"></div>'
      }
    },
    bian(obj) {
      console.log(obj)
      this.divtab = !this.divtab
      this.linetab = obj.row.id
      this.name = obj.row.label.content1
      this.bei = obj.row.label.remark
      this.value = obj.row.label.vehiclesType + ''
      this.value2 = obj.row.label.equimentId * 1
      this.shijian = obj.row.label.shijian
      this.shijian2 = obj.row.label.shijian2
      this.shijian3 = obj.row.label.shijian3
      this.data = []
      for (var i = 0; i < obj.row.fanglist.length; i++) {
        this.data.push({
          id: obj.row.fanglist[i].id,
          name: obj.row.fanglist[i].pointName,
          indt: [obj.row.fanglist[i].circuitPointLon, obj.row.fanglist[i].circuitPointLat]
        })
      }
      get('/camara/getIdByBinding', { cpid: this.$store.state.user.companyId, id: obj.row.label.equimentId * 1 }).then(res => {
        this.options2 = res
      })
    },
    shan(obj) {
      console.log(obj.row.id)
      get('/mngCircuitInfo/delmngcircuitinfobyid', { id: obj.row.id }).then(res => {
        console.log(res)
        this.shua()
      })
    },
    ti() {
      if (this.name !== '' && this.value !== '' && this.value2 !== '') {
        var markers = []
        for (var i = 0; i < this.data.length; i++) {
          markers.push({
            pointName: this.data[i].name,
            circuitName: this.name,
            orderNumber: i + 1,
            circuitPointLon: this.data[i].indt[0],
            circuitPointLat: this.data[i].indt[1]
          })
          if (this.data[i].id) {
            markers[i].id = this.data[i].id
          }
        }
        var data = {
          cpid: this.$store.state.user.companyId,
          circuitTypeId: 2,
          circuitType: '车船',
          vehiclesType: this.value,
          circuitName: this.name,
          remark: this.bei,
          circuitpointlist: markers,
          equimentId: this.value2 * 1
        }
        if (this.value * 1 === 3) {
          data.firstBusTime = this.shijian.substring(0, 5) + ':00'
          data.lastBusTime = this.shijian2.substring(0, 5) + ':00'
          data.busIntervalTime = this.shijian3
        }
        if (this.linetab !== '') {
          data.id = this.linetab
        }
        post('/mngCircuitInfo/savemngcircuitinfo', data).then(res => {
          post('/camara/updpoint', { pid: data.equimentId * 1, binding: 1 }).then(res => {
            this.divtab = !this.divtab
            this.shebei()
            this.shua()
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
          // setTimeout(() => {
          //   this.tank = ''
          //   this.$router.push({ path: '/map/mapsets' })
          // }, 2000)
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
      console.log(123)
      var that = this
      var o = amapManager.getMap()
      var markers = []
      var open = []
      o.remove(that.overlayGroups)
      o.remove(that.line)
      for (var i = 0; i < that.data.length; i++) {
        if (that.data[i].indt !== '') {
          var marker = new AMap.Marker({
            position: that.data[i].indt,
            rowindex: that.rowindex,
            text: '123',
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (markers.length + 1) + '.png'
          })
          marker.on('click', function() {
            console.log('111')
          })
          open.push(that.data[i].indt)
          markers.push(marker)
        }
      }
      if (open.length > 1) {
        console.log(open)
        that.line = new AMap.Polyline({
          map: o,
          strokeColor: '#80d8ff',
          isOutline: true,
          strokeStyle: 'dashed',
          outlineColor: 'white',
          path: open
        })
      }
      this.overlayGroups = new AMap.OverlayGroup(markers)
      o.add(that.overlayGroups)
    },
    wei(a, b, that) {
      console.log(that.rowindex)
      if (that.rowindex !== '') {
        that.data[that.rowindex].indt = [a, b]
      } else {
        that.data[that.dataid].indt = [a, b]
      }
      this.addmarker()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    jia() {
      this.data.push({ name: '', indt: '' })
      this.dataid = this.data.length - 1
      this.rowindex = this.dataid
      this.$refs.singleTable.setCurrentRow(this.data[this.dataid])
    },
    datafun(i) {
      console.log(i)
      this.dataid = i
    },
    jian() {
      if (this.rowindex || this.rowindex === 0) {
        this.data.splice(this.rowindex, 1)
      } else {
        this.data.splice(this.dataid, 1)
      }
      this.rowindex = this.data.length - 1
      this.$refs.singleTable.setCurrentRow(this.data[this.data.length - 1])
      this.addmarker()
    },
    shang() {
      if (this.dataid > 1 || this.dataid === 1) {
        var a = this.data[this.dataid]
        this.data[this.dataid] = this.data[this.dataid - 1]
        this.data[this.dataid - 1] = a
        this.dataid -= 1
        this.$refs.singleTable.setCurrentRow(this.data[this.dataid])
      }
      this.addmarker()
    },
    xia() {
      console.log(this.rowindex)
      console.log(this.dataid)
      if (this.dataid !== this.data.length - 1 && this.data.length > 1) {
        var a = this.data[this.dataid]
        this.data[this.dataid] = this.data[this.dataid + 1]
        this.data[this.dataid + 1] = a
        this.dataid += 1
        this.$refs.singleTable.setCurrentRow(this.data[this.dataid])
      }
      this.addmarker()
    },
    indexMethod(index) {
      return index + 1
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex // 把每一行的索引放进row
    },
    onRowClick(row, event, column) {
      var index = row.index
      this.rowindex = index // 点击当前行的行数
      this.dataid = index
      console.log(this.data)
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
.scroll_box>div{
  overflow-x: auto;
  width: 100%;
  height: 80%;
}
.scroll_box>div::-webkit-scrollbar {
  width : 1px;
  height: 1px;
}
#scroll{
  height: 100%;
  padding-top: 5%;
  padding-bottom: 5%;
  margin: auto;
}
.row1{
  width: 100%;
  height: 2vh;
  line-height: 2vh;
  font-size: 1.5vh;
  overflow: hidden;
}
.row2{
  width: 40%;
  float: left;
}
.scroll_box .leftdiv{
  margin-left:-45px;
}
.leftdiv_list {
  width: 80%;
  margin: auto;
  margin-top: 20px;
  padding-left:10px;
  font-size: 1.2vh;
  overflow: hidden;
  /* height: 7vh; */
  line-height: 5vh;
  cursor: pointer;
  position:relative;
}
.leftdiv_list .elselect {
  float: right;
  width: 70%;
}
.leftdiv_list table {
  background: #eff1f2;
}
.leftdiv_list tr {
  background: #fff;
}
.leftdiv_list th {
  background: #eff1f2;
}
.leftdiv_list td,
th {
  width: 33%;
  text-align: center;
  margin: 0;
  border-top: 1px solid #EFF1F2;
  border-left: 1px solid #EFF1F2;
  border-right: 1px solid #EFF1F2;
  /* border:  */
}
.leftdiv_list .el-input--medium {
  width: 70%;
  height: 50%;
  font-size: 10px;
  float: right;
}
.el-input__inner {
  height: 100%;
  width: 100%;
}
.leftdiv_list .datainp {
  width: 100%;
  height: 100%;
  border: 0;
}
.listsbox{
  position:relative;
}
.img_bg_box{
  position:absolute;
  top: 4px;
  left: 85px;
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  height:17px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  width: 160px;
  height: 20px;
}
.img_bg_box li{
  padding: 0;
  margin: 0;
  width: 19px;
  height: 19px;
  display: inline-block;
  margin-left: 20px;
  text-align: center;
  line-height: 19px;
}
.img_bg_box li:hover{
  background: #A5A2A2;
}
.zhogn {
  background: #c5d6ff;
}
.zhogn td {
  background: #c5d6ff;
}
.btn {
  width: 30%;
  height: 3vh;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 0px 11px 0px rgba(63, 106, 255, 0.28);
  border-radius: 2vh;
  text-align: center;
  font-size: 1vh;
  line-height: 3vh;
  color: #fff;
  float: left;
  margin-left: 10%;
}
.btn2 {
  width: 30%;
  height: 3vh;
  background: #fff;
  border: 1px solid rgba(63, 106, 255, 1);
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 2vh;
  text-align: center;
  font-size: 1vh;
  line-height: 3vh;
  color: #3f6aff;
  float: left;
  margin-left: 10%;
}
.tank{
  width: 100px;
  height: 50px;
  background: #fff
}
.el-select .el-input .el-select__caret {
    line-height: 10px;
}
.el-input-number--small {
  width: 70%;
}
.title_name{
  font-size: 16px;
  font-weight: 800;
  color: #201F32;
  position: relative;
}
.star{
  position: absolute;
  top: 2px;
  left: 2px;
  color:#F54658;
}
.bianshan{
  color: blue;
  cursor: pointer;
}
</style>

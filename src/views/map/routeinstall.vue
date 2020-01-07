<template>
  <div class="routeinstall">
    <div class="leftdiv">
      <!-- <el-tabs v-model="activeName" type="margin-left:10px;" @tab-click="handleClick">
        <el-tab-pane label="增加" name="qing"> -->
      <div class="leftdiv_list">
        <el-select v-model="value" placeholder="请选择" class="elselect" style="float:right;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>路线类型
      </div>
      <div class="leftdiv_list">
        路线名称
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div class="leftdiv_list">
        路线备注
        <el-input v-model="bei" placeholder="请输入内容"></el-input>
      </div>
      <div class="leftdiv_list">
        路线的站点
        <img src="../../assets/images/icon_down.png" alt class="dian" @click="xia()">
        <img src="../../assets/images/icon_up.png" alt class="dian" @click="shang()">
        <img
          src="../../assets/images/icon_jian.png"
          alt
          class="dian"
          style="padding-top:7px;"
          @click="jian()"
        >
        <img src="../../assets/images/icon_jia.png" alt class="dian" @click="jia()">
      </div>
      <div class="leftdiv_list" style="height:30vh;">
        <el-table
          :data="data"
          height="200"
          border
          row-key
          style="width: 100%; font-size:10px;"
        >
          <el-table-column
            prop="单选"
            width="32"
          >
            <template slot-scope="scope">
              <el-radio v-model="dataid" class="radio" :label="scope.$index">{{ scope.$index+1 }}</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
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
        <!-- <table cellspacing="0">
          <tr>
            <th>序号</th>
            <th>站点名称</th>
            <th>站点位置</th>
          </tr>
          <tr
            v-for="(item,i) in data"
            :key="i"
            :class="dataid==i?'zhogn':''"
            style="height:41px;"
            @click="datafun(i)"
          >
            <td>{{ i }}</td>
            <td>
              <input v-model="item.name" type="text" class="datainp" placeholder="请输入名称">
            </td>
            <td>
              {{ item.indt[0] }}
              <br>
              {{ item.indt[1] }}
            </td>
          </tr>
        </table> -->
      </div>
      <div class="leftdiv_list">绑定设备</div>
      <div class="leftdiv_list">
        <el-select v-model="value2" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="leftdiv_list">
        <!-- <div class="btn" @click="ti()">保存</div> -->
        <el-button type="primary" round @click="ti()">保存</el-button>
        <!-- <div class="btn2" @click="ti2()">保存并继续</div> -->
        <el-button type="info" round @click="ti2()">保存并继续</el-button>
      </div>
      <!-- </el-tab-pane>
        <el-tab-pane label="编辑" name="qu">编辑</el-tab-pane>
      </el-tabs> -->
    </div>
    <el-amap
      class="map"
      :vid="'amap-vue'"
      :zoom="zoom"
      :center="center"
      :map-style="mapStyle1"
      :events="events"
      :amap-manager="amapManager"
    ></el-amap>
    <div v-if="tank" class="tank">
      {{ tank }}
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'

var amapManager = new VueAMap.AMapManager()
export default {
  name: 'Map',
  data() {
    return {
      tank: '',
      name: '',
      bei: '',
      zoom: 16,
      center: [116.336496, 39.942178],
      mapStyle1: 'amap://styles/whitesmoke',
      activeName: 'qing',
      tape: 1,
      amapManager,
      events: {},
      overlayGroups: [],
      data: [{ name: '', indt: '' }],
      dataid: 0,
      options: [
        {
          value: '1',
          label: '游览路线'
        },
        {
          value: '2',
          label: '巡逻路线'
        }
      ],
      value: '',
      options2: [
        {
          value: '1',
          label: '单兵'
        },
        {
          value: '2',
          label: '对讲机'
        }
      ],
      value2: '',
      line: ''
    }
  },
  watch: {
    data() {
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
        this.value2 = ''
        this.dataid = 0
        this.data = [{ name: '', indt: '' }]
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
            text: '123',
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (markers.length + 1) + '.png'
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
          outlineColor: 'white',
          path: open
        })
      }
      this.overlayGroups = new AMap.OverlayGroup(markers)
      o.add(that.overlayGroups)
    },
    wei(a, b, that) {
      that.data[that.dataid].indt = [a, b]
      this.addmarker()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    jia() {
      this.data.push({ name: '', indt: '' })
      this.dataid = this.data.length - 1
    },
    datafun(i) {
      console.log(i)
      this.dataid = i
    },
    jian() {
      this.data.splice(this.dataid, 1)
      this.addmarker()
    },
    shang() {
      if (this.dataid !== 0) {
        var a = this.data[this.dataid]
        this.data[this.dataid] = this.data[this.dataid - 1]
        this.data[this.dataid - 1] = a
        this.dataid -= 1
      }
      this.addmarker()
    },
    xia() {
      if (this.dataid !== this.data.length - 1) {
        var a = this.data[this.dataid]
        this.data[this.dataid] = this.data[this.dataid + 1]
        this.data[this.dataid + 1] = a
        this.dataid += 1
      }
      this.addmarker()
    }
  }
}
</script>
<style scoped>
.routeinstall {
  width: 100%;
  height: calc(100vh - 80px);
  padding: 1%;
  background: #f0f3ff;
  overflow: hidden;
}
.map {
  width: 100%;
  height: 100%;
}
.leftdiv {
  width: 300px;
  height: 95.5%;
  position: absolute;
  background: #fff;
  z-index: 1;
}
.leftdiv_list {
  width: 70%;
  margin: auto;
  margin-top: 2%;
  font-size: 1.2vh;
  overflow: hidden;
  height: 7vh;
  line-height: 5vh;
  cursor: pointer;
}
.leftdiv_list .elselect {
  float: right;
  width: 75%;
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
  width: 75%;
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
.dian {
  float: right;
  margin-right: 10px;
  cursor: pointer;
  vertical-align: middle;
  margin-top: 5%;
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
  /deep/ .el-select .el-input .el-select__caret {
    line-height: 10px;
}
</style>

<template>
  <div>
    <div class="lan">
      <div class="tou">
        <div :style="chatab==1?'color:#3F6AFF;':''" @click="chatab=1">综合查询</div>
        <!-- <div :style="chatab==2?'color:#3F6AFF;':''" @click="chatab=2">班次查询</div> -->
        <div :style="chatab==3?'color:#3F6AFF;':''" @click="chatab=3">准点率查询</div>
      </div>
      <div class="da">
        <div class="top">
          <span>
            路线
            <!-- <el-input v-model="lx" placeholder="请输入内容" class="car-name-input"></el-input> -->
            <el-select v-model="lx" clearable placeholder="请选择">
              <el-option
                v-for="item in lxx"
                :key="item.id"
                :label="item.circuitName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </span>
          <span v-if="chatab==1||chatab==3">
            日期
            <el-date-picker
              v-model="bc"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </span>
          <span v-if="chatab==1">
            设备编号
            <el-input v-model="zdl" style="margin: 0;" placeholder="请输入内容" class="car-name-input"></el-input>
          </span>
          <span v-if="chatab==2">
            选择日期
            <el-date-picker
              v-model="xzrq"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </span>
          <span v-if="chatab==3">
            时间类型
            <el-radio v-model="sjlx" label="1">按天</el-radio>
            <el-radio v-model="sjlx" label="2">按月</el-radio>
          </span>
          <!-- <div class="btn-search" @click="sou">查询</div> -->
          <el-button type="primary" round @click="sou">查询</el-button>
        </div>
      </div>
      <div class="body">
        <!-- 综合查询 -->
        <el-table
          v-if="chatab==1"
          ref="multipleTable"
          :data="arr"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
        >
          <el-table-column
            label="计划日期"
            prop="planTime[0]"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="计划名称"
            prop="planName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="路线名称"
            prop="circuitName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="巡检点名称"
            prop="circuitPointName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="巡检点编号"
            prop="circuitPointId"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="计划时间"
            prop="planTime[1]"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="到达时间"
            prop="arriveTime[1]"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备号"
            prop="equipmentNo"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="采集员"
            prop="personName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="patrolStates"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 班次查询 -->
        <el-table
          v-if="chatab==2"
          ref="multipleTable"
          :data="arr"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
        >
          <el-table-column
            label="计划名称"
            prop="jhmc"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="路线名称"
            prop="lxmc"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="巡检点名称"
            prop="xjdmc"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="巡检点编号"
            prop="xjdbh"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="计划时间"
            prop="yjsj"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="到达时间"
            prop="ddsj"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备号"
            prop="sbh"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="采集员"
            prop="cjy"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="zt"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 准点率查询 -->
        <el-table
          v-if="chatab==3"
          ref="multipleTable"
          :data="arr"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
        >
          <el-table-column
            label="日期"
            :prop="sjlx == 1 ? '日期[0]' : 'yue'"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="计划名称"
            prop="计划名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="路线名称"
            prop="线路名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="开始时间"
            prop="日期[1]"
            align="center"
          >
          </el-table-column>
          <!-- <el-table-column
            label="巡查时间"
            prop="巡查时长"
            align="center"
          >
          </el-table-column> -->
          <el-table-column
            label="巡查点数"
            prop="巡检点数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="按时"
            prop="按时"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="提前"
            prop="早到"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="晚点"
            prop="晚点"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="遗漏"
            prop="漏巡"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="准点率"
            prop="准点率"
            align="center"
          >
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="all"
          @current-change="btnClick"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '@/api/axios'
export default {
  name: 'About',
  data() {
    return {
      // 分页
      lx: '',
      bc: [new Date(2019, 9, 1), new Date()],
      zdl: '',
      xzrq: '',
      mes: '',
      sjlx: '1',
      pagesize: 1,
      chatab: 1,
      pageNumber: 10,
      arr: [],
      lxx: [],
      //    分页
      all: 0, //      总页数
      cur: 1
    }
  },
  computed: {
  },
  watch: {
    chatab() {
      this.sou()
    },
    sjlx() {
      this.cur = 1
      this.sou()
    }
  },
  mounted() {
    this.shua()
  },
  methods: {
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.sou()
    },
    shua() {
      get('/mngCircuitInfo/getmngcircuitinfobytype', { cpid: this.$store.state.user.companyId, typeid: 1 }).then(res => {
        this.lxx = res.data
        this.lx = this.lxx[0].id
        this.sou()
      })
      // console.log(this.cur, this.arrdata)
      // this.arrdata = []
      // for (var i = 0; i < 10; i++) {
      //   if (i < this.arr.length && this.arr[i + (this.cur * 8) - 8]) {
      //     this.arrdata.push(this.arr[i + (this.cur * 8) - 8])
      //   }
      // }
    },
    sou() {
      if (this.chatab === 1) {
        var data = {
          circuitid: this.lx,
          pageNumber: this.cur - 1,
          pageSize: 10,
          starttime: this.shi2(this.bc[0]),
          endtime: this.shi2(this.bc[1])
        }
        if (this.zdl !== '') {
          data.equimentid = this.zdl
        }
        get('/mngpatrol/getMngPatrolLogPointlist', data).then(res => {
          this.arr = res.data.content
          this.all = res.data.totalElements
          for (var i = 0; i < this.arr.length; i++) {
            this.arr[i].planTime = this.arr[i].planTime.trim().split(/\s+/)
            this.arr[i].arriveTime = this.arr[i].arriveTime.trim().split(/\s+/)
          }
          console.log(this.arr, 12321)
        })
      } else {
        get('/mngpatrol/getPerlist', { circuitid: this.lx, datetype: this.sjlx, pageNumber: this.cur - 1, pageSize: 10, starttime: this.shi2(this.bc[0]), endtime: this.shi2(this.bc[1]) }).then(res => {
          this.arr = res.data
          this.all = res.data[0]['总条数']
          for (var i = 0; i < this.arr.length; i++) {
            this.arr[i]['日期'] = this.arr[i]['日期'].trim().split(/\s+/)
            this.arr[i].yue = this.arr[i]['日期'][0].substring(0, this.arr[i]['日期'][0].length - 3)
            this.arr[i]['准点率'] = this.arr[i]['准点率'].toFixed(2)
          }
        })
      }
    },
    shi2(date) {
      var n = date.getFullYear()
      var y = date.getMonth() + 1
      var r = date.getDate()
      var s = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var m = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return n + '-' + y + '-' + r + ' ' + s + ':' + f + ':' + m
    }
  }
}
</script>
<style   scoped>
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  /* margin-top: 10px; */
  overflow: hidden;
}
.tou{
  width: 100%;
  height: 4vh;
  background: #ffffff;
  line-height: 4vh;
  font-size: 2vh;
}
.tou div{
  display: inline-block;
  margin-left:3%;
  cursor: pointer;
}
.da {
  display: flex;
}
/* devmanagement */
.top {
  width: 98%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  padding: 10px;
  margin: 1% 0px 5px 1%;
  border-left: 0.3vw solid #3F6AFF;
}
.top span{
  margin-left: 1%;
  margin-right: 1%;
}
.body{
  width:98%;
  height:80%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:14px;
  padding:10px;
  margin-top:15px;
  overflow-x: auto;
}
.body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 1px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.btn-search,
.car-name-input{
  margin: 0 12px;
}
.btn-search{
  width: 5%;
  height: 4vh;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  float: right;
  text-align: center;
  line-height: 4vh;
  font-size: 2vh;
  border-radius: 3vh;
  color: #ffffff;
}
.car-name-input{
  width: 130px;
}
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
</style>

<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class="top">
          操作时间
          <el-date-picker
            v-model="shij"
            class="czsj"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <span class="czlx">操作类型</span>
          <el-select v-model="data.value5" clearable placeholder="确认" style="width:110px; margin-left:15px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="gjlx">告警类型</span>
          <el-select v-model="data.alarm_type" clearable placeholder="全部" style="width:110px;margin-left:15px;">
            <el-option
              v-for="item in options2"
              :key="item.idalarm_type_name"
              :label="item.alarm_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span class="czy">操作员</span>
          <el-input v-model="data.name" placeholder="请输入操作员" class="car-name-input"></el-input>
          <el-button
            class="btn-search"
            type="primary"
            round
            @click="sou()"
          >查询</el-button>
          <slot />
        </div>
      </div>
      <div class="body">
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          highlight-current-row
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
        >
          <el-table-column prop="id" label="序号" width="180" align="center"></el-table-column>
          <el-table-column prop="alarm_time" label="操作时间" width="180"></el-table-column>
          <el-table-column prop="operate_type" label="操作类型">
            <template slot-scope="scope">
              <span :style="scope.row.operate_type == 0 ? 'color:black' : 'color:black'">
                {{ scope.row.operate_type == 0 ? '确认' : '取消确认' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="operate_man" label="操作员"></el-table-column>
          <el-table-column prop="alarm_type_name" label="告警源">  </el-table-column>
          <el-table-column prop="alarm_address" label="告警位置"></el-table-column>
          <el-table-column prop="operate_type" label="操作来源">
            <template slot-scope="scope">
              <span :style="scope.row.operate_type == 0 ? 'color:black' : 'color:black'">
                {{ scope.row.operate_type == 0 ? 'PC端' : '移动端' }}
              </span>
            </template>
          </el-table-column>
        </el-table>
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
import { get } from '../../api/axios.js'
export default {
  data() {
    return {
      data: {},
      arrdata: [],
      arr: [],
      pagesize: 3,
      pageNumber: 2,
      all: 0, //      总页数
      cur: 1,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: '',
      value: '',
      shij: [],
      options: [
        {
          value: '0',
          label: '确认'
        },
        {
          value: '1',
          label: '取消确认'
        }
      ],
      options2: [],
      lx: [],
      cities: [
        {
          value: 'haikang',
          label: '设备告警'
        },
        {
          value: 'dahua',
          label: '环境告警'
        },
        {
          value: 'huawei',
          label: '主动告警'
        },
        {
          value: 'bxgj',
          label: '报修告警'
        },
        {
          value: 'tjgj',
          label: '统计告警'
        },
        {
          value: 'clgj',
          label: '车辆告警'
        }
      ],
      value6: '',
      value7: '',
      options5: [
        {
          value: 'pc',
          label: 'PC端'
        },
        {
          value: 'mobile',
          label: '移动端'
        }
      ]
    }
  },
  mounted() {
    var that = this
    get('/assetlogs/selectAlarmLogs', {
      cpid: this.$store.state.user.companyId,
      pageNumber: that.cur - 1,
      pageSize: 8
    }).then(res => {
      that.arrdata = res.content
      that.all = res.numberOfElements
      console.log(res, 12212)
    })
    get('/alarmInfo/selectCountAlarmType', {
      cpid: this.$store.state.user.companyId
    }).then(res => {
      this.options2 = res
      console.log(111)
    })
  },
  methods: {
    sou() {
      var that = this
      var data = {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 8,
        operate_type: this.data.value5,
        alarm_type: this.data.alarm_type,
        operate_man: this.data.name
      }
      if (that.shij.length > 0) {
        console.log(that.shij)
        data.startTime = this.shi2(that.shij[0])
        data.endTime = this.shi2(that.shij[1])
      }
      get('/assetlogs/selectAlarmLogs', data).then(res => {
        that.arrdata = res.content
        this.all = res.numberOfElements
        console.log(res, 100)
      })
    },
    clickok() {
      this.zh = false
      this.zhdata = []
    },
    zhfa(i) {
      console.log(i)
      this.zh = true
      this.zhdata = this.arr[i]
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.shua()
    },
    shua() {
      // console.log(this.cur, this.arrdata)
      // this.arrdata = []
      // for (var i = 0; i < 10; i++) {
      //   if (i < this.arr.length && this.arr[i + this.cur * 8 - 8]) {
      //     this.arrdata.push(this.arr[i + this.cur * 8 - 8])
      //   }
      // }
    },
    shi(value) {
      var s = value / 1000
      var m = parseInt(s % 60)
      s = parseInt(s / 60)
      var f = parseInt(s % 60)
      s = parseInt(s / 60)
      var date = (s < 10 ? '0' + s : s) + ':' + (f < 10 ? '0' + f : f) + ':' + (m < 10 ? '0' + m : m)
      return date
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
<style  scoped>
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  overflow: hidden;
}
ul {
  display: flex;
  list-style: none;
}
li {
  padding: 0 12px;
}
a:hover {
  color: rgba(63, 106, 255, 1);
}
.da {
  display: flex;
}
.top {
  width: 98%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  padding: 10px;
  border-left: 0.3vw solid #3F6AFF;
  margin: 15px 0px 5px 1%;
}
.car-search {
  height: 50px;
  line-height: 50px;
  width: 98;
  margin-left: 1%;
  background: #eff3ff;
  padding-left: 1%;
}
.car-search div {
  display: inline-block;
}

.btn-excel,
.btn-search,
.car-name-input,
.car-dropdown,
.date-picker {
  margin: 0 12px;
}

.car-name-input {
  width: 130px;
}

.search-small-input {
  width: 60px;
  margin: 0 10px;
}

.search-small-unit-input {
  width: 60px;
  margin-left: 10px;
}
.feny {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
.el-button--primary{
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  height: 4vh;
  font-size: 2vh;
  padding-top:0;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height: 3.5vh;
  /* line-height: 5vh; */
}
.czsj{
  margin-left:13px;
}
.czlx{
  margin-left:16px;
}
.gjlx{
  margin-left:16px;
}
.czy{
  margin-left:16px;
}
.body{
  width:98%;
  height:80%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:14px;
  padding:10px;
  margin-top:10px;
}
</style>

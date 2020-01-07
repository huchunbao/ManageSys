<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class="top">
          <span>告警时间</span>
          <el-date-picker
            v-model="shij"
            class="gjsj"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <span class="gjlx">告警类型</span>
          <el-select v-model="data.alarmType" clearable placeholder="全部" style="width:110px; margin-left:10px;">
            <el-option
              v-for="item in options"
              :key="item.idalarm_type_name"
              :label="item.alarm_type_name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span class="cjr">处警人</span>
          <el-input v-model="data.name" placeholder="请输入处警人" class="car-name-input"></el-input>
          告警系统
          <el-select v-model="data.xt" clearable placeholder="全部" style="width:110px; margin-left:10px;">
            <el-option
              v-for="item in options2"
              :key="item.source_name"
              :label="item.source_name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="data.xt" placeholder="请输入告警系统" class="car-name-input"></el-input> -->
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
          :header-cell-style="{background:'#edeff8',color:'#909399'}"
        >
          <el-table-column label="序号" type="index" align="center">
            <template slot-scope="scope">
              <span> {{ scope.$index+(cur - 1) * 6 +1 }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="event_levels" label="级别">
            <template slot-scope="scope">
              <span :style="scope.row.event_levels == 1 ? 'color:black' : 'color:black'">
                {{ scope.row.event_levels == 1 ? '一般' : '紧急' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="source_name" label="告警系统"></el-table-column>
          <el-table-column prop="alarm_name" label="告警源"></el-table-column>
          <el-table-column prop="alarm_type_name" label="告警类型"></el-table-column>
          <el-table-column prop="alarm_address" label="告警位置"></el-table-column>
          <el-table-column prop="alarm_time" label="告警时间" width="150"></el-table-column>
          <el-table-column prop="alarmAffirmTime" label="确认时间" width="150"></el-table-column>
          <el-table-column prop="clearTime" label="清除时间" width="150"></el-table-column>
          <el-table-column prop="handler_name" label="处警人"></el-table-column>
          <el-table-column prop="processing_time" label="处警时间" width="140"></el-table-column>
          <el-table-column prop="con" label="查看详情">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="xgfa(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="6"
          layout="total, prev, pager, next, jumper"
          :total="all"
          @current-change="btnClick"
        >
        </el-pagination>
      </div>
    </div>
    <div v-if="xg" class="tanka">
      <div id="zzca">
        <div class="aa_aa">
          <div style="display:flex;">
            <p class="cz">查看详情</p>
            <p class="close" @click="clickok">×</p>
          </div>
          <p class="camera"></p>
          <p class="time">位置：{{ xgdata.alarmAddress }} 告警时间： {{ xgdata.alarmTime }}</p>
          <p class="camera"></p>
          <p class="time">处警人:{{ xgdata.handlerName }} 处警时间： {{ xgdata.processingTime }}</p>
          <div class="beij">
            <p class="wenzi">{{ xgdata.alarmContent }}</p>
          </div>
          <div
            style="display:flex;  font-size: 12px;font-family: PingFang SC; padding-left: 44px; "
          >
            <p>确认时间: {{ xgdata.processingTime }}</p>
            <p style="padding-left:22px;"> 确认人员: {{ xgdata.handlerName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '../../api/axios.js'
export default {
  data() {
    return {
      $index: '',
      name: '',
      ip2: '',
      arrdata: [],
      multipleTable: [],
      arr: [],
      all: 0, //      总页数
      cur: 1,
      data: {},
      multipleSelection: [],
      xt: '',
      zhdata: {},
      zh: false,
      xg: false,
      xgdata: {},
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      shij: [],
      value4: '',
      options2: [],
      options: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '主动报警'
        },
        {
          value: '选项3',
          label: '触发报警'
        },
        {
          value: '选项4',
          label: '异常报警'
        },
        {
          value: '选项5',
          label: '断电报警'
        },
        {
          value: '选项6',
          label: '超速报警'
        },
        {
          value: '选项7',
          label: '越界报警'
        },
        {
          value: '选项8',
          label: '超时报警'
        },
        {
          value: '选项9',
          label: '求助报警'
        }
      ],
      value5: [],
      value11: [],
      cities: [
        {
          value1: 'haikang',
          label: '垃圾桶'
        },
        {
          value1: 'dahua',
          label: '密度摄像机'
        },
        {
          value1: 'huawei',
          label: '客流相机'
        }
      ],
      value6: '',
      value10: []
    }
  },
  mounted() {
    this.shua()
    get('/alarmInfo/selectCountAlarmSource', {
      cpid: this.$store.state.user.companyId
    }).then(response => {
      this.options2 = response
    })
    get('/alarmInfo/selectCountAlarmType', {
      cpid: this.$store.state.user.companyId
    }).then(res => {
      this.options = res
    })
  },
  methods: {
    clickok() {
      this.zh = false
      this.zhdata = []
      this.xg = false
      this.xgdata = []
    },
    zhfa(i) {
      console.log(i)
      this.zh = true
      this.zhdata = this.arr[i]
    },
    xgfa(i) {
      console.log(i)
      this.xg = true
      var that = this
      get('/alarmInfo/selectById', { aid: i.id }).then(res => {
        console.log(res)
        that.xgdata = res[0]
      })
    },
    sou() {
      var that = this
      var data = {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 6,
        alarmSource: this.data.xt,
        alarmType: this.data.alarmType,
        handlerName: this.data.name
      }
      if (that.shij.length > 0) {
        console.log(that.shij)
        data.startTime = this.shi2(that.shij[0])
        data.endTime = this.shi2(that.shij[1])
      }
      console.log(data)
      get('/alarmInfo/selectByClear', data).then(res => {
        that.arrdata = res.content
        this.all = res.totalElements
        console.log(res, 100)
      })
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
      var that = this
      get('/alarmInfo/selectAllPage', {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 6
      }).then(res => {
        that.arrdata = res.content
        this.all = res.totalElements
        console.log(res, 12212)
      })
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
  margin: 17px 0px 5px 1%;
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
#zzc {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}
#zzca {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}
.aa_a {
  width: 360px;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 200px;
  left: 530px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
}
.aa_aa {
  width: 360px;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 200px;
  left: 530px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
}
.camera {
  font-size: 12px;
  color: rgba(63, 106, 255, 1);
  font-family: PingFang SC;
  padding-left: 44px;
}
.cz {
  font-size: 15px;
  font-weight: 550;
  padding-left: 15px;
  padding-top: 15px;
}
.time {
  font-size: 12px;
  font-family: PingFang SC;
  padding-left: 44px;
}

.beij {
  width: 270px;
  height: 90px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 44px;
}
.wenzi {
  font-size: 12px;
  font-family: PingFang SC;
  padding-left: 13px;
  padding-top: 10px;
}
.qxa {
  width: 55px;
  height: 22px;
  border: 1px solid rgba(63, 106, 255, 1);
  border-radius: 8px;
  background: white;
  color: rgba(63, 106, 255, 1);
  margin-top: 30px;
  margin-left: 88px;
  outline: none;
  font-family: 微软雅黑;
  font-size: 13px;
}
.qda {
  width: 55px;
  height: 22px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 88px;
  outline: none;
  font-family: 微软雅黑;
  font-size: 13px;
}
.close {
  margin-top: 27px;
  margin-left: 210px;
  cursor: pointer;
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
textarea{
  margin-left:45px;
}
.gjlx{
  margin-left:16px;
}
.cjr{
   margin-left:16px;
}
.gjsj{
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
  margin-top:14px;
}
</style>

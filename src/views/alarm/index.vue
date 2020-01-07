<template>
  <div class="traffic">
    <div class="gaoj">
      <div class="left">
        <p style="padding-left:20px; font-weight:600;">今日告警{{ gjing }}次</p>
        <div class="ny">
          <div class="first">
            <p style="padding-left:15px;">已确认</p>
            <p style="padding-left:15px;">{{ sure }}次</p>
          </div>
          <div class="first">
            <p style="padding-left:15px;">已清除</p>
            <p style="padding-left:15px;">{{ clear }}次</p>
          </div>
        </div>
        <div class="nya">
          <div class="gjing">
            <p style="padding-left:15px;">未确认</p>
            <p style="padding-left:15px;">{{ nosure }}次</p>
          </div>
          <div class="gjing">
            <p style="padding-left:15px;">未清除</p>
            <p style="padding-left:15px;">{{ noclear }}次</p>
          </div>
        </div>
      </div>
      <div class="center">
        <div style="display:flex;">
          <p style="padding-left:10px; font-weight:600;">告警情况</p>
          <select v-model="seldata" name class="sel">
            <option value="1">今日</option>
            <option value="2">昨日</option>
          </select>
        </div>
        <div
          id="snowTurnover"
          style="width: 100%;height: 112%; margin-top:-8%; margin-left:4%;"
        ></div>
      </div>
      <div class="right">
        <p style="padding-left:10px; font-weight:600;">两天内告警处理统计</p>
        <div
          id="snowTurnoveraa"
          style="width: 100%;height: 110%; margin-left:4%; margin-top:-6.5%;"
        ></div>
      </div>
    </div>
    <div class="body">
      <p class="jr">未清除告警信息</p>
      <div class="anniu">
        <el-button
          class="btn-info"
          type="info"
          round
          @click="yqr(1)"
        >已确认</el-button>
        <el-button
          class="btn-info"
          type="info"
          round
          @click="yqr(0)"
        >取消确认</el-button>
        <el-button
          class="btn-info"
          type="info"
          round
          @click="qc()"
        >清除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="arrdata"
        tooltip-effect="dark"
        style="width: 100%;"
        class="table"
        :header-cell-style="{background:'#edeff8',color:'#909399'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="级别" width="120" prop="event_levels">
          <template slot-scope="scope">
            <span :style="scope.row.event_levels == 1 ? 'color:black' : 'color:black'">
              {{ scope.row.event_levels == 1 ? '一般' : '紧急' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-model="data.confirm_state" prop="confirm_state" label="确认状态" width="150">
          <template slot-scope="scope">
            <span :style="scope.row.confirm_state == 0 ? 'color:black' : 'color:black'">
              {{ scope.row.confirm_state == 0 ? '未确认' : '已确认' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="clear_state" label="清除状态" width="120">
          <template slot-scope="scope">
            <span :style="scope.row.clear_state == 0 ? 'color:black' : 'color:black'">
              {{ scope.row.clear_state == 0 ? '未清除' : '已清除' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="source_name" label="告警系统" show-overflow-tooltip></el-table-column>
        <el-table-column prop="alarm_name" label="告警源" show-overflow-tooltip></el-table-column>
        <el-table-column prop="alarm_type_name" label="告警类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="alarm_address" label="告警位置" show-overflow-tooltip></el-table-column>
        <el-table-column prop="alarm_time" label="告警时间" width="170" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        class="feny"
        :current-page="cur"
        background
        :page-size="5"
        layout="total, prev, pager, next, jumper"
        :total="all"
        @current-change="btnClick"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { get, post } from '../../api/axios.js'
export default {
  name: 'About',
  data() {
    return {
      sure: 0,
      clear: 0,
      nosure: 0,
      noclear: 0,
      gjing: '',
      arrdata: [],
      multipleTable: [],
      arr: [],
      pagesize: 3,
      pageNumber: 2,
      all: 0, //      总页数
      cur: 1,
      data: {},
      seldata: '1',
      open1: {
        color: ['#8aa3ff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: '<br>{b}:告警数量为{c}次'
        },
        xAxis: {
          type: 'category',
          data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLabel: { formatter: '{value} 次' }
        },
        series: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            smooth: true
          }
        ]
      },
      open2: {
        color: [
          '#8aa3ff',
          '#96bbf2',
          '#c2d8ff',
          '#e4e6ff',
          '#ff999a',
          '#ffdd65',
          '#d4c0ff'
        ],
        legend: {
          data: ['告警数', '已确认', '已清除']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br>{a}{c}次'
        },
        xAxis: {
          type: 'category',
          data: ['今日', '昨日']
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value} 次' },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            name: '告警数',
            data: []
          },
          {
            type: 'bar',
            name: '已确认',
            data: []
          },
          {
            type: 'bar',
            name: '已清除',
            data: []
          }
        ]
      },
      zhdata: {},
      zh: false,
      multipleSelection: []
    }
  },
  computed: {},
  watch: {
    seldata() {
      this.open1.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.jinzuoif()
    }
  },
  mounted() {
    this.snowTurnoveraa()
    this.shua()
    this.jinzuoif()
  },
  methods: {
    jinzuoif() {
      if (this.seldata === '1') {
        this.jin()
      } else {
        this.zuo()
      }
    },
    shua() {
      var that = this
      get('/alarmInfo/selectByIdAndClear', {
        cpid: this.$store.state.user.companyId,
        pageNum: that.cur - 1,
        pageSize: 5
      }).then(res => {
        that.arrdata = res.content
        that.all = res.totalElements
      })
      get('/alarmInfo/selectCountToday', {
        cpid: this.$store.state.user.companyId
      }).then(res => {
        if (res['所有告警'] !== null) {
          that.gjing = res['所有告警']
        } else {
          that.gjing = 0
        }
        if (res['已确认'] !== null) {
          that.sure = res['已确认']
        } else {
          that.sure = 0
        }
        if (res['已清除'] !== null) {
          that.clear = res['已清除']
        } else {
          that.clear = 0
        }
        if (res['未确认'] !== null) {
          that.nosure = res['未确认']
        } else {
          that.nosure = 0
        }
        if (res['未清除'] !== null) {
          that.noclear = res['未清除']
        } else {
          that.noclear = 0
        }
      })
    },
    jin() {
      get('/alarmInfo/countTimeAndNumToday', {
        cpid: this.$store.state.user.companyId
      }).then(res => {
        for (var i = 0; i < this.open1.xAxis.data.length; i++) {
          for (var i2 = 0; i2 < res.length; i2++) {
            if (this.open1.xAxis.data[i] === res[i2].c_hour) {
              this.open1.series[0].data[i] = res[i2].num
            }
          }
        }
        this.snowTurnover()
      })
    },
    zuo() {
      get('/alarmInfo/countTimeAndNumYesterday', {
        cpid: this.$store.state.user.companyId
      }).then(res => {
        for (var i = 0; i < this.open1.xAxis.data.length; i++) {
          for (var i2 = 0; i2 < res.length; i2++) {
            if (this.open1.xAxis.data[i] === res[i2].c_hour) {
              this.open1.series[0].data[i] = res[i2].num
            }
          }
        }
        this.snowTurnover()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(data) {
      this.cur = data
      this.shua()
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
    snowTurnover() {
      var snowTurnover = echarts.init(document.getElementById('snowTurnover'))
      snowTurnover.resize()
      snowTurnover.setOption(this.open1)
    },
    snowTurnoveraa() {
      var snowTurnoveraa = echarts.init(
        document.getElementById('snowTurnoveraa')
      )
      get('/alarmInfo/selectCountYesterday', {
        cpid: this.$store.state.user.companyId
      }).then(response => {
        this.open2.series[0].data[1] = response['所有告警']
        this.open2.series[1].data[1] = response['已确认']
        this.open2.series[2].data[1] = response['已清除']
        console.log(111)
        get('/alarmInfo/selectCountToday', {
          cpid: this.$store.state.user.companyId
        }).then(response => {
          this.open2.series[0].data[0] = response['所有告警']
          this.open2.series[1].data[0] = response['已确认']
          this.open2.series[2].data[0] = response['已清除']
          console.log(110)
          snowTurnoveraa.resize()
          snowTurnoveraa.setOption(this.open2)
        })
      })
    },
    yqr(index) {
      var that = this
      var data = []
      for (var i = 0; i < that.multipleSelection.length; i++) {
        data.push({ aid: that.multipleSelection[i].id, confirmState: index + '', alarmAffirmTime: '' })
      }
      post('/alarmInfo/batchUpdateState', data).then(res => {
        that.shua()
      })
    },
    qc() {
      var that = this
      var data = []
      for (var i = 0; i < that.multipleSelection.length; i++) {
        data.push({ aid: that.multipleSelection[i].id, clear_state: i + '', clearTime: '' })
      }
      post('/alarmInfo/batchUpdateStateClear', data).then(res => {
        that.shua()
      })
    }
  }
}
</script>
<style scoped>
.btn-info {
  position: relative;
  top: -20px;
  left:-8px;
}
.table {
  margin-top: 10px;
}
</style>
<style scoped>
.nr{
  background:none;
  border:none;
  margin-left:-16px;
}
.traffic {
  background: #f0f3ff;
  width: 100%;
  height: calc(100vh - 82px);
  overflow: hidden;
}
.gaoj {
  display: flex;
  font-weight: 600;
}
.left {
  width: 34.5%;
  height: 14rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  margin: 10px;
  margin-left:7px;
}
.center {
  width: 34%;
  height: 14rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  margin: 10px ;
}
.right {
  width: 34%;
  height: 14rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
  margin: 10px ;
}
.b-boder {
  width: 98%;
  height: 180px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  margin-left: 14px;
  margin-top: 7px;
}
.ny {
  display: flex;
}
.first {
  width: 10.8rem;
  height: 4rem;
  font-size: 0.8rem;
  box-shadow: 0rem 0rem 1rem 0rem rgba(204, 204, 204, 0.2);
  border-radius: 0.5rem;
  padding-left: 2rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    94deg,
    rgba(174, 197, 255, 1) 0%,
    rgba(139, 171, 253, 1) 100%
  );
  margin-top: 32px;
  margin-left: 30px;
}

.nya {
  display: flex;
}
.sec {
  width: 10.8rem;
  height: 4rem;
  font-size: 0.8rem;
  box-shadow: 0rem 0rem 1rem 0rem rgba(204, 204, 204, 0.2);
  border-radius: 0.5rem;
  padding-left: 2rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    90deg,
    rgba(162, 166, 255, 1) 0%,
    rgba(139, 147, 254, 1) 100%
  );
  margin-left: 30px;
  position: relative;
  top: 10px;
}
/* 数据分析 */
.anniu {
  float: right;
  height: 15%;
  position: relative;
  top:-19px;
}
.visiting {
  float: left;
  width: 50%;
  height: 100%;
  padding-top: 2rem;
  margin-left: 8%;
}
.instrument {
  float: left;
  width: 100%;
  height: 18rem;
}
/* 下拉框 */
.sel {
  width: 3.6%;
  height: 2.3%;
  font-size: 0.8rem;
  text-indent: 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("../../assets/shu/xia.png") no-repeat scroll right 5px center transparent;
  background-color: rgba(63, 106, 255, 0.12);
  border: 0px solid rgba(63, 106, 255, 1);
  border-radius: 0rem;
  position: absolute;
  float: left;
  left:40%;
  top:4.6%;
  z-index: 10;
}
.ny {
  display: flex;
}
.first {
  width: 40%;
  height: 30%;
  font-size: 0.8rem;
  box-shadow: 0rem 0rem 1rem 0rem rgba(204, 204, 204, 0.2);
  border-radius: 0.5rem;
  padding-left: 2rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    94deg,
    rgba(174, 197, 255, 1) 0%,
    rgba(139, 171, 253, 1) 100%
  );
  margin-left: 20px;
  margin-top: 3px;
}
.nya {
  display: flex;
}
.gjing {
  width: 40%;
  height: 30%;
  font-size: 0.8rem;
  box-shadow: 0rem 0rem 1rem 0rem rgba(204, 204, 204, 0.2);
  border-radius: 0.5rem;
  padding-left: 2rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    90deg,
    rgba(162, 166, 255, 1) 0%,
    rgba(139, 147, 254, 1) 100%
  );
  margin-top: 27px;
  margin-left: 20px;
}
.gaoj {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
  padding: 10px 15px;
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
.jr{
  position: relative;
  top:0px;
  left:25px;
}
.feny{
  float: right;
  margin-top:-3%;
}
.body{
  width:97%;
  height:57.6%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:21px;
  padding:10px;
  margin-top:0px;
}
.table{
  position: relative;
  top:-56px;
}
</style>


<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class=" top">
          停车场
          <!-- <el-input v-model="mingc" placeholder="请输入内容" class="car-name-input marrig"></el-input> -->
          <el-select v-model="mingc" placeholder="请选择" clearable class="marrig">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          出场时间
          <el-date-picker
            v-model="shij"
            type="datetimerange"
            class="marrig"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          车牌号<el-input v-model="ip" placeholder="请输入内容" class="car-name-input marrig"></el-input>
          出入口
          <el-select v-model="leixing" placeholder="请选择" clearable class="marrig">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.gatedoorName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!-- <div class="btn1">查询</div> -->
          <el-button type="primary" round @click="shuup(), cur=1">查询</el-button>
          <slot />
        </div>
      </div>
      <div class="body">
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            label="车牌号"
            prop="plantNumber"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="车类型"
            prop="isTemporaryCar"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="入场时间"
            prop="enterTime"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="入口"
            prop="parkName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="出场时间"
            prop="leaveTime"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="出口"
            prop="leaveId"
            align="center"
          >
            <template slot-scope="scope">
              <span v-for="item in options" :key="item.id">
                {{ scope.row.leaveId == item.id ? item.gatedoorName : '' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="停车时长"
            prop="parktime"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="应收"
            prop="receivable"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="实收"
            prop="receipts"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="支付方式"
            prop="payStyle"
            align="center"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="8"
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
  name: 'About',
  data() {
    return {
      // 分页
      pagesize: 1,
      pageNumber: 10,
      arrdata: [],
      shij: [new Date(2019, 9, 1), new Date()],
      arr: [
        {
          id: '京A12138',
          carmaset: '',
          cartype: '临时车',
          inieitem: '2019-10-01 08:22:38',
          rukou: '东门入口',
          outitem: '2019-10-01 09:22:23',
          out: '东门出口',
          time: '00:59',
          ying: '20',
          shi: '20',
          zhitype: '现金'
        },
        {
          id: '京A44958',
          carmaset: '',
          cartype: '临时车',
          inieitem: '2019-10-01 08:22:50',
          rukou: '东门入口',
          outitem: '2019-10-01 09:22:43',
          out: '东门出口',
          time: '00:59',
          ying: '20',
          shi: '20',
          zhitype: '现金'
        },
        {
          id: '京A74D52',
          carmaset: '',
          cartype: '临时车',
          inieitem: '2019-10-01 09:10:40',
          rukou: '西门入口',
          outitem: '2019-10-01 14:10:33',
          out: '西门出口',
          time: '04:59',
          ying: '100',
          shi: '100',
          zhitype: '现金'
        },
        {
          id: '京A7S654',
          carmaset: '',
          cartype: '临时车',
          inieitem: '2019-10-01 10:17:30',
          rukou: '东门入口',
          outitem: '2019-10-01 18:17:35',
          out: '东门出口',
          time: '08:00',
          ying: '160',
          shi: '160',
          zhitype: '现金'
        },
        {
          id: '京A449S5',
          carmaset: '',
          cartype: '临时车',
          inieitem: '2019-10-01 10:20:30',
          rukou: '东门入口',
          outitem: '2019-10-01 12:20:68',
          out: '东门出口',
          time: '01:59',
          ying: '40',
          shi: '40',
          zhitype: '现金'
        },
        {
          id: '京A52A34',
          carmaset: '',
          cartype: '临时车',
          inieitem: '2019-10-01 14:12:30',
          rukou: '东门入口',
          outitem: '2019-10-01 18:10:23',
          out: '东门出口',
          time: '03:57',
          ying: '80',
          shi: '80',
          zhitype: '现金'
        }
      ],
      //    分页
      all: 0, //      总页数
      cur: 1,
      mingc: '',
      ip: '',
      type: '',
      data: {},
      multipleSelection: [],
      options: [],
      options2: [],
      leixing: ''
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.lxup()
    this.tccup()
    this.shuup()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.shuup()
    },
    shua() {
      console.log(this.cur, this.arrdata)
      this.arrdata = []
      for (var i = 0; i < 7; i++) {
        if (i < this.arr.length && this.arr[i + (this.cur * 8) - 8]) {
          this.arrdata.push(this.arr[i + (this.cur * 8) - 8])
        }
      }
    },
    lxup() {
      get('/parkinfo/getparkgatedoor', { cpid: this.$store.state.user.companyId }).then(res => {
        this.options = res.data
        console.log(res)
      })
    },
    tccup() {
      get('/parkinfo/getParkinfo', { cpid: this.$store.state.user.companyId }).then(res => {
        console.log(res)
        this.options2 = res.data
      })
    },
    shuup() {
      var that = this
      var data = {
        pageNumber: that.cur - 1,
        pageSize: 8
      }
      if (that.ip) {
        data.plantnumber = that.ip
      }
      if (that.shij) {
        data.entertime = this.shi2(that.shij[0])
        data.leavetime = this.shi2(that.shij[1])
      }
      if (that.mingc) {
        data.parkname = that.mingc
      }
      if (that.leixing) {
        data.type = that.leixing
      }
      get('/parkinfo/getParklog', data).then(res => {
        console.log(res)
        that.all = res.data.totalElements
        this.arrdata = res.data.content
        for (var i = 0; i < this.arrdata.length; i++) {
          this.arrdata[i].parktime = that.shi(that.arrdata[i].parktime)
        }
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
    },
    sou() {
      this.shuup()
    }
  }
}
</script>
<style   scoped>
.lan {
  width: 100%;
  min-height: calc(100vh - 80px);
  background: #eff3ff;
  padding: 1%;
}
.top {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  padding: 1%;
  border-left: 0.3vw solid #3F6AFF;
  font-size: 1.8vh;
}
.car-name-input{
  width: 130px;
}
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
.body{
  width:100%;
  overflow: hidden;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  padding:1%;
  margin-top:1%;
}
.marrig{
  margin-left: 1%;
  margin-right: 2%;
}
</style>

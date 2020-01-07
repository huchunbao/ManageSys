<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class="top">
          设备名称
          <el-input
            v-model="data.sbmc"
            placeholder="请输入设备名称"
            class="car-name-input"
          ></el-input>
          <span class="sbwz">设备位置</span>
          <el-input
            v-model="data.sbwz"
            placeholder="请输入设备位置"
            class="car-name-input"
          ></el-input>
          <span class="tjsj">统计时间</span>
          <el-date-picker
            v-model="shij"
            type="datetimerange"
            class="marrig"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-button
            class="sea"
            type="primary"
            round
            style="margin-left:7px;"
            @click="sou"
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
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            label="设备编号"
            prop="eid"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备名称"
            prop="eq_name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备位置"
            prop="eq_address"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="检修描述"
            prop="overhaul_result"
            align="center"
          >
            <template slot-scope="scope">
              <span :style="scope.row.overhaul_result == 0 ? 'color:black' : 'color:red'">
                {{ scope.row.overhaul_result == 0 ? '正常' : '故障' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="照片"
            prop="sbh"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="检修结果"
            prop="disc"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="检修时间"
            prop="overhaul_time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="检修人员"
            prop="maintainer"
            align="center"
          >
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
  name: 'About',
  data() {
    return {
      // 分页
      pagesize: 3,
      pageNumber: 2,
      all: 0, //      总页数
      cur: 1,
      arrdata: [
        {
          xh: 1
        }
      ],
      shij: [],
      value4: '',
      arr: [],
      sbmc: '',
      type: '',
      sbwz: '',
      data: {},
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.shua()
    var that = this
    get('/overhaul/selectOverhaul', {
      cpid: this.$store.state.user.companyId,
      pageNumber: that.cur - 1,
      pageSize: 8
    }).then(res => {
      that.arrdata = res.content
      that.all = res.totalElements
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.shua()
    },
    shua() {
      console.log(this.cur, this.arrdata)
      this.arrdata = []
      for (var i = 0; i < 7; i++) {
        if (i < this.arr.length && this.arr[i + this.cur * 8 - 8]) {
          this.arrdata.push(this.arr[i + this.cur * 8 - 8])
        }
      }
    },
    shi(value) {
      var s = value / 1000
      var m = parseInt(s % 60)
      s = parseInt(s / 60)
      var f = parseInt(s % 60)
      s = parseInt(s / 60)
      var date =
        (s < 10 ? '0' + s : s) +
        ':' +
        (f < 10 ? '0' + f : f) +
        ':' +
        (m < 10 ? '0' + m : m)
      return date
    },
    shi2(date) {
      var n = date.getFullYear()
      var y = date.getMonth() + 1
      var r = date.getDate()
      var s = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var f =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var m =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return n + '-' + y + '-' + r + ' ' + s + ':' + f + ':' + m
    },
    sou() {
      var that = this
      var data = {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 8,
        eq_address: this.data.sbwz,
        eq_name: this.data.sbmc
      }
      if (that.shij.length > 0) {
        data.startTime = that.shij[0]
        data.endTime = that.shij[1]
      }
      get('/overhaul/selectOverhaul', data).then(res => {
        that.arrdata = res.content
        that.all = res.totalElements
        console.log(res, 100)
      })
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
  border-left: 0.3vw solid #3f6aff;
  font-size: 2vh;
}
.car-name-input {
  width: 130px;
}
.feny {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
.body {
  width: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  padding: 1%;
  margin-top: 1%;
}
.marrig {
  margin-left: 1%;
  margin-right: 2%;
}
.car-name-input {
  margin-left: 15px;
}
.sbwz {
  margin-left: 15px;
}
.tjsj {
  margin-left: 15px;
}
</style>

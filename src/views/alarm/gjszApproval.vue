<template>
  <div class="passenger2">
    <div class="map2">
      <!-- <div class="header">
        <p class="set">承载量告警设置审批</p>
        <router-link to="/alarm/settingApproval">
          <p class="sheb">设备告警设置审批</p>
        </router-link>
        <el-button class="btn-info" type="info" round @click="opfa(0)">同意</el-button>
        <el-button class="btn-info" type="info" round @click="opfa(1)">不同意</el-button>
      </div> -->
      <el-table
        ref="multipleTable"
        :data="arrdata"
        tooltip-effect="dark"
        style="width: 100%;"
        :header-cell-style="{background:'#edeff8',color:'#909399'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="point_name" label="景区/景点" width="180" align="center">
        </el-table-column>
        <el-table-column prop="bear_passenger" label="承载量" align="center">
          <template slot-scope="scope">
            {{ scope.row.bear_passenger &lt; 1? scope.row.bear_passenger*100+'%' : scope.row.bear_passenger }}
          </template>
        </el-table-column>
        <el-table-column prop="warning_passenger" label="预警承载量设置">
          <template slot-scope="scope">
            {{ scope.row.warning_passenger &lt; 1? scope.row.warning_passenger*100+'%' : scope.row.warning_passenger }}
          </template>
        </el-table-column>
        <el-table-column prop="call_passenger" label="报警承载量设置">
          <template slot-scope="scope">
            {{ scope.row.call_passenger &lt; 1? scope.row.call_passenger*100+'%' : scope.row.call_passenger }}
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="通知人员"></el-table-column>
        <el-table-column prop="way_name" label="通知方案"></el-table-column>
        <el-table-column prop="audit_state" label="审核状态">
          <template slot-scope="scope">
            {{ scope.row.audit_state === '0' ? '通过' : scope.row.audit_state === '1' ? '未通过' : '未审核' }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="but" label>
          <template slot-scope="scope">
            <el-button
              style="font-size:10px; padding:5px 10px; margin-left:5px; color:rgba(63,106,255,1);"
              @click="shfa(scope)"
            >审批</el-button>
          </template>
        </el-table-column> -->
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
      <p class="notice">*注：值为0时，代表没有限制</p>
    </div>
  </div>
</template>
<script>
import { get, post } from '../../api/axios.js'
export default {
  data() {
    return {
      arrdata: [
      ],
      all: 0, //      总页数
      cur: 1,
      multipleSelection: []
    }
  },
  mounted() {
    this.shua()
  },
  methods: {
    shua() {
      var that = this
      get('/alarmset/selectAll', {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 8
      }).then(res => {
        for (var i = 0; i < res.content.length; i++) {
          res.content[i].baoc = false
        }
        that.arrdata = res.content
        this.all = res.totalElements
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(data) {
      this.cur = data
      this.shua()
    },
    opfa(i) {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length >= 1) {
        var data = []
        for (var o = 0; o < this.multipleSelection.length; o++) {
          data.push({ id: this.multipleSelection[o].id, auditState: i + '' })
        }
        console.log(data)
        post('/alarmset/batchUpdateState', data).then(res => {
          this.shua()
        })
      }
    },
    shfa(i) {
      console.log(i)
    }
  }
}
</script>
<style scoped>
.header{
  height: 8%;
  width: 100%;
}
.passenger2 {
  background: #f0f3ff;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.set {
  padding-left: 20px;
  font-family: PingFang SC;
  float: left;
  color: #3a67fe;
}
.sheb {
  padding-left: 20px;
  float: left;
}
.notice {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(204, 51, 51, 1);
  padding-left: 20px;
}
.el-tabs__content {
  width: 100%;
  height: 100%;
}
.btn-info {
  float: right;
  margin-top: 0.5%;
  margin-right: 10px;
}
.feny{
  float: right;
}
.map2 {
  width: 100%;
  height: 100%;
  border-radius: 0rem;
  float: left;
  margin-right: 1%;
  background: rgba(255, 255, 255, 1);
}
</style>

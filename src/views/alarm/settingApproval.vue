<template>
  <div class="passenger">
    <div class="body">
      <div class="header">
        <p :class="tiao?'sheb':'set'" @click="tiao=true">承载量告警设置</p>
        <p :class="tiao?'set':'sheb'" @click="tiao=false">设备告警设置</p>
        <el-button class="btn-info" type="info" round @click="opfa(0)">同意</el-button>
        <el-button class="btn-info" type="info" round @click="opfa(1)">不同意</el-button>
      </div>
      <gjszApproval v-if="tiao" ref="tiaodiv" class="tiao" style="position: relative;"></gjszApproval>
      <div v-if="!tiao">
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#edeff8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="devicename" label="设备名称"></el-table-column>
          <el-table-column prop="point_name" label="所属区域"></el-table-column>
          <el-table-column prop="user_name" label="通知人员"></el-table-column>
          <el-table-column prop="way_name" label="通知方案"></el-table-column>
          <el-table-column prop="shzt" label="审核状态">
            <template slot-scope="scope">
              {{ scope.row.audit_state === '0' ? '通过' : scope.row.audit_state === '1' ? '未通过' : '未审核' }}
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
import { get, post } from '../../api/axios.js'
import gjszApproval from './gjszApproval'
export default {
  components: {
    gjszApproval
  },
  data() {
    return {
      tiao: false,
      arrdata: [],
      all: 100, //      总页数
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
      get('/alarmset/selectSetAll', {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 8
      }).then(res => {
        for (var i = 0; i < res.content.length; i++) {
          res.content[i].baoc = false
        }
        that.arrdata = res.content
        that.all = res.totalElements
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
      if (!this.tiao) {
        if (this.multipleSelection.length >= 1) {
          var data = []
          for (var o = 0; o < this.multipleSelection.length; o++) {
            data.push({ id: this.multipleSelection[o].id, auditState: i + '' })
          }
          console.log(data)
          post('/alarmset/batchUpdateSetState', data).then(res => {
            this.shua()
          })
        }
      } else {
        this.$refs.tiaodiv.opfa(i)
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
.passenger {
  background: #f0f3ff;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
}
.map2 {
  width: 100%;
  height: 100%;
  border-radius: 0rem;
  float: left;
  margin-right: 1%;
  background: rgba(255, 255, 255, 1);
}
.set {
  padding-left: 20px;
  float: left;
  font-family: PingFang SC;
}
.sheb {
  padding-left: 20px;
  float: left;
  color: #3a67fe;
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
.body{
  width:98%;
  height:90%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:10px;
  padding:10px;
  margin-top:10px;
}
</style>


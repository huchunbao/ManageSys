<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class=" top">
          设备名称<el-input
            v-model="data.sbmc"
            placeholder="请输入设备名称"
            class="car-name-input"
          ></el-input>
          设备位置<el-input
            v-model="data.sbwz"
            placeholder="请输入设备位置"
            class="car-name-input"
          ></el-input>
          维修负责人<el-input
            v-model="data.wxfzr"
            placeholder="请输入维修负责人"
            class="car-name-input"
          ></el-input>
          接单时间
          <el-date-picker
            v-model="shij"
            type="datetimerange"
            class="time"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          处理时间
          <el-date-picker
            v-model="shija"
            type="datetimerange"
            class="time"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-button
            class="sea"
            type="primary"
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
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备编号"
            prop="equipment_id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="报修单号"
            prop="repairs_no"
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
            label="修理情况描述"
            prop="disc"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="照片"
            prop="photo"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="mend_state"
            align="center"
          >
            <template slot-scope="scope">
              <span :style="scope.row.mend_state == 0 ? 'color:black' : 'color:black'">
                {{ scope.row.mend_state == 0 ? '未修理' : '修理中' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="接单时间"
            prop="get_time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="维修负责人"
            prop="repairman"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="处理时间"
            prop="do_time"
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
      pagesize: 3,
      pageNumber: 2,
      all: 0, //      总页数
      cur: 1,
      arrdata: [],
      shij: [],
      shija: [],
      arr: [],
      data: {},
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.shua()
    var that = this
    get('/maintain/getmaintain', {
      cpid: this.$store.state.user.companyId,
      pageNumber: that.cur - 1,
      pageSize: 8
    }).then(res => {
      that.arrdata = res.content
      that.all = res.totalElements
      console.log(res, 1112)
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
      for (var i = 0; i < 10; i++) {
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
        eq_name: this.data.sbmc,
        eq_address: this.data.sbwz,
        repairman: this.data.wxfzr
      }
      if (that.shij.length > 0) {
        console.log(that.shij)
        data.startTime = this.shi2(that.shij[0])
        data.endTime = this.shi2(that.shij[1])
      }
      if (that.shija.length > 0) {
        data.startTime2 = this.shi2(that.shija[0])
        data.endTime2 = this.shi2(that.shija[1])
      }
      get('/maintain/getmaintain', data).then(res => {
        that.arrdata = res.content
        that.all = res.totalElements
        console.log(res, 100)
      })
    }
  }
}
</script>
<style   scoped>
.xt {
  width: 300px;
  height: 7px;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(165, 168, 181, 1);
  margin-left: 18px;
  margin-top: -10px;
}
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  /* margin-top: 10px; */
  overflow: hidden;
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
  margin: 1% 0px 5px 1%;
  border-left: 0.3vw solid #3f6aff;
}
.online {
  width: 32%;
  height: 150px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  /* margin-top: 60px; */
  margin-left: 1%;
}
.ona {
  width: 120px;
  height: 8px;
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
  line-height: 9px;
  padding: 15px 15px;
}
.tab {
  width: 98%;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  position: relative;
  top: 18px;
  margin-left: 13px;
}
.tab td {
  font-size: 14px;
  text-align: center;
  font-family: 宋体;
  font-weight: 400;
}
.tab th {
  color: black;
  height: 30px;
  font-size: 15px;
}
.baojing {
  position: fixed;
  right: -6px;
  bottom: 100px;
  display: flex;
}
.img {
  width: 70px;
  height: 38px;
}
.bj {
  position: fixed;
  right: 14px;
  bottom: 116px;
  font-size: 9px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
#zzc {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.aa {
  width: 310px;
  height: 400px;
  background: #eff3ff;
  position: absolute;
  top: 170px;
  left: 500px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
  font-size: 13px;
  font-family: 宋体;
}
.jk {
  width: 200px;
  height: 23px;
}
.qxa {
  width: 55px;
  height: 20px;
  border: 1px solid rgba(63, 106, 255, 1);
  border-radius: 8px;
  background: white;
  color: rgba(63, 106, 255, 1);
  margin-top: 20px;
  margin-left: 80px;
  outline: none;
  font-family: 楷体;
  font-size: 13px;
}
.qda {
  width: 55px;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 15px;
  outline: none;
  font-family: 楷体;
  font-size: 13px;
}
#zzc_a {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.ld {
  width: 280px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 40px;
  margin-top: 20px;
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
.jk {
  width: 120px;
  height: 25px;
}

.qdc {
  width: 55px;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 155px;
  outline: none;
  margin-top: 25px;
  font-size: 11px;
}
#zzca {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.aab {
  width: 310px;
  height: 170px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 260px;
  left: 530px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
  font-family: 宋体;
}
.jk {
  width: 60px;
  height: 15px;
}
.qxb {
  width: 50px;
  height: 20px;
  font-size: 10px;
  border: 1px solid rgba(63, 106, 255, 1);
  border-radius: 8px;
  background: white;
  color: rgba(63, 106, 255, 1);
  margin-top: 30px;
  margin-left: 90px;
  outline: none;
}
.qdb {
  width: 50px;
  height: 20px;
  font-size: 10px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 75px;
  outline: none;
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
.sea {
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  margin-left: 10px;
}
.time {
  width: 260px;
}
.body {
  width: 98%;
  height: 80%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  margin-left: 14px;
  padding: 10px;
  margin-top: 10px;
}
</style>

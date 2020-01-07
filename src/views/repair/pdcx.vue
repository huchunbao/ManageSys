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
          派单时间
          <el-date-picker
            v-model="shij"
            class="pdsj"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
            <template slot-scope="scope">
              <span> {{ scope.$index+(cur - 1) * 8 +1 }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="报修单号"
            prop="repairs_no"
            align="center"
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
            label="故障描述"
            prop="disc"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="照片"
            prop="sbh"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleClick(scope.row)"
              >无</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="派单人员"
            prop="repairman"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="派单时间"
            prop="send_time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="维修负责人"
            prop="lxfs"
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
      mc: '',
      wz: '',
      $index: '',
      // pagesize: 3,
      // pageNumber: 2,
      // pagesize: 1,
      // pageNumber: 8,
      all: 100 / 10, //      总页数
      cur: 1,
      arrdata: [],
      shij: [],
      arr: [
        {
          jhrq: '1',
          jhmc: 'BX20191001001',
          lxmc: 'HK001136',
          xjdmc: '密度摄像机',
          xjdbh: '山林氧吧公园',
          ddsj: '触发报警 时间：2019-10-1 9:24',
          cjy: '王建国',
          zt: '2019-10-1 9:56',
          lxfs: '李明'
        },
        {
          jhrq: '2',
          jhmc: 'BX20191001002',
          lxmc: 'HK001114',
          xjdmc: '客流相机',
          xjdbh: '熊猫馆',
          ddsj: '触发报警   时间：2019-10-1 11:24',
          cjy: '李丽',
          zt: '2019-10-1 11:50',
          lxfs: '李明'
        },
        {
          jhrq: '3',
          jhmc: 'BX20191001003',
          lxmc: 'HK001115',
          xjdmc: '密度摄像机',
          xjdbh: '云端动物园',
          ddsj: '触发报警   时间：2019-10-1 14:24',
          cjy: '王阿毛',
          zt: '2019-10-1 14:56',
          lxfs: '李明'
        }
      ],
      //    分页
      data: {},
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.shua()
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
      var that = this
      get('/send/getsend', {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 8
      }).then(res => {
        that.arrdata = res.content
        that.all = res.totalElements
      // console.log(res, 11122)
      })
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
        eq_address: this.data.sbwz
      }
      if (that.shij.length > 0) {
        console.log(that.shij)
        data.startTime = this.shi2(that.shij[0])
        data.endTime = this.shi2(that.shij[1])
      }
      get('/send/getsend', data).then(res => {
        that.arrdata = res.content
        this.all = res.totalElements
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
.pdsj {
  margin-left: 15px;
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

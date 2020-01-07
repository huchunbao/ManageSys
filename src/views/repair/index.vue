<template>
  <div>
    <div class="lan">
      <div class="bk">
        <div class="ny">
          <div class="sec">
            <p style="padding-left:15px;">今日报修数量</p>
            <p style="padding-left:15px;">2个</p>
          </div>
          <div class="first">
            <p style="padding-left:15px;">今日检修数量</p>
            <p style="padding-left:15px;">0个</p>
          </div>
          <div class="sec">
            <p style="padding-left:15px;">修理中</p>
            <p style="padding-left:15px;">2个</p>
          </div>
          <div class="first">
            <p style="padding-left:15px;">正常</p>
            <p style="padding-left:15px;">0个</p>
          </div>
          <div class="sec">
            <p style="padding-left:15px;">已修好</p>
            <p style="padding-left:15px;">0个</p>
          </div>
          <div class="first">
            <p style="padding-left:15px;">检修好</p>
            <p style="padding-left:15px;">0个</p>
          </div>
          <div class="sec">
            <p style="padding-left:15px;">报修</p>
            <p style="padding-left:15px;">0个</p>
          </div>
        </div>
      </div>
      <div class="da">
      </div>
      <div class="body">
        <p class="xinx">今日报修信息</p>
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" align="center" type="index">
            <template slot-scope="scope">
              <span> {{ scope.$index+(cur - 1) * 6 +1 }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="报修单号"
            prop="repairs_no"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="报修时间"
            prop="repairs_time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="报修人员"
            prop="reporter"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="phone"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备编号"
            prop="indexcode"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备名称"
            prop="devicename"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备位置"
            prop="orgname"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="故障描述"
            prop="remark"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="mend_state"
            align="center"
          >
            <template slot-scope="scope">
              <span :style="scope.row.mend_state == 0 ? 'color:red' : 'color:black'">
                {{ scope.row.mend_state == 0 ? '未修理' : '修理中' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="派单时间"
            prop="send_time"
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
            label="接单时间"
            prop="get_time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="结单时间"
            prop="end_time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            prop="cz"
            align="center"
          >
            <!-- <template slot-scope="scope"> -->
            <!-- <el-button
                type="text"
                size="small"
                @click="zhfa(scope.$index, scope.row)"
              >派单</el-button> -->
            <!-- <el-button
                v-if="scope.row.mend_state=='1'"
                type="text"
                size="small"
                @click="xgfa(scope.row.mend_state)"
              >查看
              </el-button> -->
            <!-- </template> -->
          </el-table-column>
        </el-table>
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="3"
          layout="total, prev, pager, next, jumper"
          :total="all"
          @current-change="btnClick"
        >
        </el-pagination>
      </div>
      <!-- <div v-if="zh" class="tank">
        <div id="zzc">
          <div class="white">
            <p class="cz">派单</p>
            <p class="qx">选择维修负责人</p>
            <div class="yuan">
              <el-checkbox v-for="item in adminlist" :key="item" :label="zhfadata.userId">{{ item.cusName }}</el-checkbox><br>
            </div>
            <input type="button" class="qxb" value="取消" @click="clickok">
            <input type="button" class="qdb" value="确定" @click="clickok">
          </div>
        </div>
      </div> -->
      <div v-if="xg" class="tanka">
        <div id="zzca">
          <div class="ck">
            <div style="display:flex;">
              <p class="cz">查看</p>
              <p class="gb" @click="clickok">x</p>
            </div>
            <div class="beijb">
              <div class="yuana">
                <p>报修单号:201911091632</p>
                <p>报修时间:2019-11-11 16:33:17</p>
                <p>报修人员:小王</p>
                <p>联系方式:13855021306</p>
                <p>设备编号:001185</p>
                <p>报修设备名称:交通卡口</p>
                <p>设备位置:拓展部</p>
                <p>故障描述:001</p>
                <p>派单时间:2019-11-11 13:55:32</p>
                <p>维修负责人:王自健</p>
                <p>接单时间: 2019-11-11 14:27:20</p>
                <p>处理情况描述:</p>
                <p>结单时间: 2019-11-11 16:49:14</p>
              </div>
            </div>
            <!-- <input type="button" class="qxb" value="取消" >
            <input type="button" class="qdb" value="确定" @click="ck()"> -->
          </div>
        </div>
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
      adminlist: [],
      options: [
        {
          value: '选项1',
          label: '检修'
        }
      ],
      value: '',
      cities: [
        {
          value: 'aa',
          label: '未修好'
        },
        {
          value: 'ab',
          label: '未修理'
        },
        {
          value: 'ac',
          label: '修理中'
        },
        {
          value: 'ac2',
          label: '修理好'
        }
      ],
      $index: '',
      value6: '',
      // pagesize: 3,
      // pageNumber: 2,
      all: 0, //      总页数
      cur: 1,
      arrdata: [],
      arr: [], //    分页
      mingc: '',
      ip: '',
      type: '',
      data: {},
      zhdata: {},
      zh: false,
      xgdata: {},
      xg: false,
      multipleSelection: [],
      zhfadata: {}
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.shua()
    var that = this
    get('/user/list/cp12').then(res => {
      console.log(1234)
      that.adminlist = res.data
    })
    get('/overhaul/getOverhaul', {
      cpid: this.$store.state.user.companyId,
      pageNumber: that.cur - 1,
      pageSize: 3
    }).then(res => {
      that.arrdata = res.content
      that.all = res.numberOfElements
      console.log(res, 111)
    })
  },
  methods: {
    clickok() {
      this.zh = false
      this.zhdata = []
      this.xg = false
    },
    zhfa(i) {
      console.log(i)
      this.zh = true
    },
    xgfa(i) {
      console.log(i)
      this.xg = true
      this.xgdata = this.arr[i]
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
      console.log(this.cur, this.arrdata)
      this.arrdata = []
      for (var i = 0; i < 5; i++) {
        if (i < this.arr.length && this.arr[i + (this.cur * 8) - 8]) {
          this.arrdata.push(this.arr[i + (this.cur * 8) - 8])
        }
      }
    },
    ck() {
      var that = this
      get('/overhaul/getOverhaulById?id=1', {
      }).then(res => {
        that.arrdata = res.data.content
        console.log(res, 122)
      })
      this.clickok()
    }
  }
}
</script>
<style   scoped>
.xinx{
  padding-left:14px;
}
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
.bk{
   width: 98%;
   height: 120px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  padding: 10px;
  margin: 1% 0px 5px 1%;
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
  z-index: 9999;
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
#zzca {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.ld {
  width: 280px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 40px;
  margin-top: 20px;
}
.white {
  width: 360px;
  height: 330px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 200px;
  left: 530px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
}
.ck {
  width: 360px;
  height: 520px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 160px;
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
  position: relative;
  top:40px;
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
  position: relative;
  top:40px;
  outline: none;
}
.car-search{
  height: 50px;
  line-height: 50px;
  width: 98;
  margin-left: 1%;
  background: #eff3ff;
  padding-left: 1%;
}
.car-search div{
  display: inline-block;
}

.btn-excel,
.btn-search,
.car-name-input,
.car-dropdown,
.date-picker{
  margin: 0 12px;
}

.car-name-input{
  width: 130px;
}

.search-small-input{
  width: 60px;
  margin: 0 10px;
}

.search-small-unit-input{
  width: 60px;
  margin-left: 10px;
}
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
.ny {
  display: flex;
  margin-top:20px;
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
  margin-left: 30px;
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

  margin-left: 27px;
}
.sea{
  border-radius: 20px;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  margin-left:10px;
}
.aa_a {
  width: 360px;
  height: 300px;
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
.beija {
  width: 270px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 44px;
}
.beijb {
  width: 270px;
  height: 400px;
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
.close {
  margin-top: 27px;
  margin-left: 210px;
}
.qx{
  font-size: 13px;
  padding-left:50px;
  padding-top:5px;
}
.yuan{
  margin-top:15px;
  margin-left:15px;
}
.yuana{
  font-size: 14px;
  margin:12px 15px;
}
.gb{
 position: absolute;
 right: 32px;
 top:8px;
 cursor: pointer;
}
.body{
  width:98%;
  height:75%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:14px;
  padding:10px;
  margin-top:15px;
}
</style>

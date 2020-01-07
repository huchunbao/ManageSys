<template>
  <div class="passenger2">
    <div class="map2">
      <el-table
        ref="multipleTable"
        :data="arrdata"
        tooltip-effect="dark"
        style="width: 100%;"
        :header-cell-style="{background:'#edeff8',color:'#909399'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="point_name" label="景区/景点"></el-table-column>
        <el-table-column prop="bear_passenger" label="承载量设置">
          <template slot-scope="scope">
            <input v-model="scope.row.bear_passenger" type="placeholder" :placeholder="scope.row.bear_passenger" class="ipt" value="1000" :disabled="!scope.row.baoc">
          </template>
        </el-table-column>
        <el-table-column prop="warning_passenger" label="预警承载量设置">
          <template slot-scope="scope">
            <input v-model="scope.row.warning_passenger" type="placeholder" class="ipt" value="800" align="center" :disabled="!scope.row.baoc">
          </template>
        </el-table-column>
        <el-table-column prop="call_passenger" label="报警承载量设置">
          <template slot-scope="scope">
            <input v-model="scope.row.call_passenger" type="placeholder" class="ipt" value="500" align="center" :disabled="!scope.row.baoc">
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="通知人员">
          <template slot-scope="scope">
            {{ scope.row.user_name }}
            <el-button type="text" size="small" :style="scope.row.baoc?'':'color: #ccc;'" @click="if(scope.row.baoc){zhfa(scope)}">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="way_name" label="通知方案">
          <template slot-scope="scope">
            {{ scope.row.way_name }}
            <el-button type="text" size="small" :style="scope.row.baoc?'':'color: #ccc;'" @click="if(scope.row.baoc){xgfa(scope)}">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="anniu" label="操作">
          <template slot-scope="scope">
            <el-button
              :style="scope.row.baoc?'color:rgba(63,106,255,1);font-size:10px; padding:5px 10px; margin-left:5px;':'font-size:10px; padding:5px 10px; margin-left:5px;'"
              :disabled="!scope.row.baoc"
              @click="bc(scope)"
            >保存</el-button>
            <el-button
              :style="!scope.row.baoc?'color:rgba(63,106,255,1);font-size:10px; padding:5px 10px; margin-left:5px;':'font-size:10px; padding:5px 10px; margin-left:5px;'"
              :disabled="scope.row.baoc"
              @click="scope.row.baoc=true"
            >编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="auditState" label="审核状态">
          <template slot-scope="scope">
            {{ scope.row.audit_state === '0'? '通过' : scope.row.audit_state === '1' ? '未通过' : '未审核' }}
          </template>
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
      <p class="notice">*注：值为0时，代表没有限制</p>
      <el-dialog
        title="设置"
        :visible.sync="zh"
        width="30%"
        left
      >
        <p class="qx">选择告警通知人员</p>
        <div class="beija">
          <div class="yuan">
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="(item,i) in adminlist" :key="i" :label="item">{{ item.cusName }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <input type="button" class="qxb" value="取消" @click="clickok">
        <input type="button" class="qdb" value="确定" @click="que">
      </el-dialog>
      <el-dialog
        title="查看处警内容"
        :visible.sync="xg"
        width="30%"
        left
      >
        <p class="qx">选择通知方案</p>
        <div class="beija">
          <div class="yuan">
            <el-checkbox-group v-model="checkList2" :max="1">
              <el-checkbox v-for="(item,i) in adminlist2" :key="i" :label="item">{{ item.wayName }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <input type="button" class="qxb" value="取消" @click="clickok">
        <input type="button" class="qdb" value="确定" @click="que2">
      </el-dialog>
      <el-dialog
        title="批量操作"
        :visible.sync="op"
        width="30%"
        left
      >
        <div class="czl">
          <div style="display:flex;margin-left:10%;">
            <p class="zia">承载量</p>
            <input v-model="data.bearPassenger" type="value" class="ipt1">
          </div>
        </div>
        <div class="yjczl">
          <div style="display:flex;margin-left:10%;">
            <p class="zia">预警承载量</p>
            <input v-model="data.warningPassenger" type="value" class="ipt2">
          </div>
        </div>
        <div class="bjczl">
          <div style="display:flex;margin-left:10%;">
            <p class="zia">报警承载量</p>
            <input v-model="data.callPassenger" type="value" class="ipt3">
          </div>
        </div>
        <div class="bjczl">
          <div style="display:flex;margin-left:10%;">
            <p class="zia">通知人:{{ zhdata.user_name }}</p>
            <p class="sz" @click="zh = true">设置</p>
          </div>
        </div>
        <div class="bjczl">
          <div style="display:flex;margin-left:10%;">
            <p class="zia">通知方案:{{ xgdata.way_name }}</p>
            <p class="sz" @click="xg = true">设置</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button round size="mini" class="el-button-default" @click="op=false">取消</el-button>
          <el-button type="primary" round size="mini" @click="qding()">确定</el-button>
        </span>
      </el-dialog>
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
      arr: [],
      all: 100 / 10, //      总页数
      cur: 1,
      data: {},
      checked: true,
      radio: '1',
      zhdata: { userid: '', user_name: '' },
      zh: false,
      xgdata: { wayid: '', way_name: '' },
      xg: false,
      op: false,
      shdata: {},
      sh: false,
      multipleSelection: [],
      checkList: [],
      adminlist: [],
      checkList2: [],
      adminlist2: []
    }
  },
  mounted() {
    this.shua()
    get('/user/list/cp12').then(res => {
      this.adminlist = res.data
    })
    get('/notify-scheme/12').then(res => {
      this.adminlist2 = res.data
    })
  },
  methods: {
    que() {
      this.zhdata.userid = ''
      for (var i = 0; i < this.checkList.length; i++) {
        if (i === 0) {
          this.zhdata.userid += this.checkList[i].userId
        } else {
          this.zhdata.userid += ',' + this.checkList[i].userId
        }
      }
      this.zhdata.user_name = this.checkList[0].cusName
      this.checkList = []
      this.zh = false
    },
    que2() {
      this.xgdata.wayid += this.checkList2[0].id
      this.xgdata.way_name = this.checkList2[0].wayName
      this.checkList2 = []
      this.xg = false
    },
    shua() {
      var that = this
      get('/alarmset/selectAll', {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 8
      }).then(res => {
        for (var i = 0; i < res.content.length; i++) {
          res.content[i].baoc = false
          res.content[i].userid = ''
          res.content[i].wayid = ''
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
    clickok() {
      this.zh = false
      this.xg = false
      this.op = false
      this.sh = false
    },
    zhfa(i) {
      console.log(i)
      this.zh = true
      this.zhdata = this.arrdata[i.$index]
    },
    xgfa(i) {
      console.log(i)
      this.xg = true
      this.xgdata = this.arrdata[i.$index]
    },
    opfa() {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length >= 1) {
        this.op = true
        this.zhdata = { userid: '', user_name: '' }
        this.xgdata = { wayid: '', way_name: '' }
      } else {
        console.log('请选中设备之后再进行保存')
        this.$message({
          message: '请选中数据之后再进行操作',
          type: 'warning'
        })
      }
    },
    bc(datt) {
      console.log(datt)
      if (datt.row.bear_passenger * 1 > datt.row.call_passenger * 1 && datt.row.call_passenger * 1 > datt.row.warning_passenger * 1) {
        var data = [{
          id: datt.row.id,
          bearPassenger: datt.row.bear_passenger + '',
          warningPassenger: datt.row.warning_passenger + '',
          callPassenger: datt.row.call_passenger + ''
        }]
        if (datt.row.userid !== '') {
          data[0].user_id = datt.row.userid
        }
        if (datt.row.wayid !== '') {
          data[0].way_id = datt.row.wayid
        }
        post('/alarmset/batchUpdateAll', data).then(res => {
          console.log(res, 111)
          datt.row.baoc = false
        })
      } else {
        // console.log('请按照承载量>预警承载量>报警承载量的规则')
        this.$message({
          message: '请按照承载量>报警承载量>预警承载量的规则',
          type: 'warning'
        })
      }
    },
    qding() {
      // if (this.data.bearPassenger * 1 > this.data.warningPassenger * 1 && this.data.warningPassenger * 1 > this.data.callPassenger * 1) {
      var data = []
      for (var o = 0; o < this.multipleSelection.length; o++) {
        var data2 = { id: this.multipleSelection[o].id }
        if (this.data.bearPassenger !== '') {
          data2.bearPassenger = this.data.bearPassenger
        } else {
          data2.bearPassenger = this.multipleSelection[o].bearPassenger
        }
        if (this.data.warningPassenger !== '') {
          data2.warningPassenger = this.data.warningPassenger
        } else {
          data2.warningPassenger = this.multipleSelection[o].warningPassenger
        }
        if (this.data.callPassenger !== '') {
          data2.callPassenger = this.data.callPassenger
        } else {
          data2.callPassenger = this.multipleSelection[o].callPassenger
        }
        if (this.zhdata.userid !== '') {
          data2.userId = this.zhdata.userid
        } else {
          data2.userId = this.multipleSelection[o].user_id
        }
        if (this.xgdata.wayid !== '') {
          data2.wayId = this.xgdata.wayid
        } else {
          data2.wayId = this.multipleSelection[o].way_id
        }
        console.log(data2)
        data.push(data2)
      }
      post('/alarmset/batchUpdateAll', data).then(res => {
        console.log(res, 111234)
        this.shua()
        this.clickok()
      })
      // } else {
      //   console.log('请按照承载量>预警承载量>报警承载量的规则')
      // }
    }
  }
}
</script>
<style scoped>
.passenger2 {
  background: #f0f3ff;
  width: 100%;
  overflow: hidden;
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
  font-family: PingFang SC;
  color: #3a67fe;
}
.sheb {
  padding-left: 20px;
}
.ipt {
  width: 100%;
  text-align: center;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 2px;
  color: #000;
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
  position: absolute;
  right: 13px;
  top: 20px;
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
.cz {
  font-size: 15px;
  font-weight: 550;
  padding-left: 15px;
  padding-top: 15px;
}
.beija {
  width: 270px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 44px;
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
  margin-left: 240px;
}
.qx {
  font-size: 13px;
  padding-left: 50px;
  padding-top: 5px;
}
.yuan {
  padding: 15px 25px;
  width: 100%;
  height: 100%;
  overflow-x: auto;
}
.close {
  cursor: pointer;
}
.ipt1 {
  height: 23px;
  width: 210px;
  margin-left: -10px;
}
.czl {
  display: flex;
}
.yjczl {
  margin-top: -10px;
  display: flex;
}
.bjczl {
  margin-top: -10px;
  display: flex;
}
.zia {
  position: relative;
  top: -15px;
  left: -17px;
}
.ipt2 {
  height: 23px;
  width: 85px;
  margin-left: -7px;
}
.ipt3{
  height: 23px;
  width: 85px;
  margin-left: -7px;
}
.sz {
  color: #3a67fe;
  position: relative;
  top: -16px;
  left: -5px;
}
.feny{
  float: right;
}
</style>

<template>
  <div class="passenger">
    <div class="body">
      <div style="">
        <p :class="tiao?'sheb':'set'" @click="tiao=true">承载量告警设置</p>
        <p :class="tiao?'set':'sheb'" @click="tiao=false">设备告警设置</p>
        <el-button class="btn-info" type="info" round @click="opfa()">批量修改</el-button>
      </div>
      <gjsz v-if="tiao" ref="tiaodiv" class="tiao" style="position: relative;"></gjsz>
      <div v-if="!tiao">
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          align="center"
          :header-cell-style="{background:'#edeff8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="devicename" label="设备名称"></el-table-column>
          <el-table-column prop="point_name" label="所属区域"></el-table-column>
          <el-table-column prop="user_name" label="通知人员">
            <template slot-scope="scope">
              {{ scope.row.user_name }}
              <el-button size="small" type="text" :style="scope.row.baoc?'':'color: #ccc;'" @click="if(scope.row.baoc){zhfa(scope)}">设置</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="way_name" label="通知方案">
            <template slot-scope="scope">
              {{ scope.row.way_name }}
              <el-button size="small" type="text" :style="scope.row.baoc?'':'color: #ccc;'" @click="if(scope.row.baoc){xgfa(scope)}">设置</el-button>
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
          <el-table-column prop="shzt" label="审核状态">
            <template slot-scope="scope">
              {{ scope.row.audit_state === '0'? '通过' : scope.row.audit_state === '1' ? '未通过' : '未审核' }}
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
        <!-- <div v-if="zh" class="tank">
          <div id="zzc">
            <div class="aa_a">
              <p class="cz">设置</p>
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
            </div>
          </div>
        </div> -->
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
        <!-- <div v-if="xg" class="tanka">
          <div id="zzca">
            <div class="aa_aa">
              <div style="display:flex;">
                <p class="cz">查看处警内容</p>
                <p class="close" @click="clickok">x</p>
              </div>
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
            </div>
          </div>
        </div> -->
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
          :visible.sync="centerDialogVisible"
          width="30%"
          left
        >
          <div class="bjczl">
            <div style="display:flex;">
              <p class="zia">通知人:{{ zhdata.user_name }}</p>
              <p class="sz" @click="zh = true">设置</p>
            </div>
          </div>
          <div class="bjczl">
            <div style="display:flex;">
              <p class="zia">通知方案:{{ xgdata.way_name }}</p>
              <p class="sz" @click="xg = true">设置</p>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button round size="mini" class="el-button-default" @click="centerDialogVisible=false">取消</el-button>
            <el-button type="primary" round size="mini" @click="qding()">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { get, post } from '../../api/axios.js'
import gjsz from './gjsz'
export default {
  components: {
    gjsz
  },
  data() {
    return {
      tiao: true,
      checked: true,
      radio: '1',
      all: 10,
      cur: 1,
      arrdata: [],
      data: {},
      zh: false,
      zhdata: { userid: '', user_name: '' },
      xg: false,
      xgdata: {},
      op: false,
      sh: false,
      multipleSelection: [],
      checkList: [],
      adminlist: [],
      checkList2: [],
      adminlist2: [],
      centerDialogVisible: false
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
    opfa() {
      if (!this.tiao) {
        if (this.multipleSelection.length >= 1) {
          this.centerDialogVisible = true
          this.zhdata = { userid: '', user_name: '' }
          this.xgdata = { wayid: '', way_name: '' }
        } else {
          this.$message({
            message: '请选中数据之后再进行操作',
            type: 'warning'
          })
        }
      } else {
        this.$refs.tiaodiv.opfa()
      }
    },
    qding() {
      if (this.zhdata.userid !== '' || this.xgdata.wayid !== '') {
        this.centerDialogVisible = false
        var data = []
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var data2 = { id: this.multipleSelection[i].id }
          if (this.zhdata.userid !== '') {
            data2.user_id = this.zhdata.userid
          } else {
            data2.user_id = this.multipleSelection[i].user_id
          }
          if (this.xgdata.wayid !== '') {
            data2.way_id = this.xgdata.wayid
          } else {
            data2.way_id = this.multipleSelection[i].way_id
          }
          data.push(data2)
        }
        post('/alarmset/batchUpdateSetAll', data).then(res => {
          this.shua()
        })
      }
    },
    shua() {
      var that = this
      get('/alarmset/selectSetAll', {
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
    clickok() {
      this.zh = false
      this.xg = false
      this.op = false
      this.sh = false
    },
    bc(datt) {
      console.log(datt, 1233212121)
      if (datt.row.userid !== '' || datt.row.wayid !== '') {
        var data = [{
          id: datt.row.id
        }]
        if (datt.row.userid) {
          data[0].user_id = datt.row.userid
        } else {
          data[0].user_id = datt.row.user_id
        }
        if (datt.row.wayid !== '') {
          data[0].way_id = datt.row.wayid
        } else {
          data[0].way_id = datt.row.way_id
        }
        post('/alarmset/batchUpdateSetAll', data).then(res => {
          this.shua()
        })
      } else {
        console.log('请改变值以后')
      }
    },
    btnClick(data) {
      this.cur = data
      this.shua()
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
    }
  }
}
</script>
<style scoped>
.tiao {
  position: relative;
  left: 0;
  top: 0;
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
.set {
  padding-left: 20px;
  font-family: PingFang SC;
  float: left;
}
.sheb {
  padding-left: 20px;
  color: #3a67fe;
  float: left;
}
.ipt {
  width: 40px;
  height: 15px;
  background: rgba(247, 248, 255, 1);
  border: 1px solid rgba(239, 241, 242, 1);
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
  right: 46px;
  top: 42px;
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
/* .beij {
  width: 270px;
  height: 90px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 44px;
} */
/* .beija {
  width: 270px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 44px;
} */
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
  margin-left: 240px;
}
.qx {
  font-size: 13px;
  padding-left: 50px;
  padding-top: 5px;
}
.admin {
  color: rgba(0, 0, 0, 0.5);
}
.yuan {
  padding: 15px 25px;
  width: 100%;
  height: 100%;
  overflow-x: auto;
}
.xm {
  display: flex;
  margin-left: 50px;
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
  margin-left: 10%;
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
#sel {
  height: 23px;
  width: 80px;
  margin-left: 10px;
}
#sela {
  height: 22px;
  width: 210px;
  margin-left: 10px;
  margin-top: 13px;
}
.sz {
  color: #3a67fe;
  position: relative;
  top: -16px;
  left: -5px;
}
.spa {
  font-size: 15px;
  margin-left: 40px;
  padding-top: 2px;
}
.ms {
  font-size: 15px;
  margin-left: -102px;
  padding-top: 2px;
}
textarea {
  margin-left: 12px;
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


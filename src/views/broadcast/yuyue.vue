<template>
  <div>
    <div class="lan">
      <div class="baj">
        <div class="top">
          <!-- <span class="btn2">刷新</span>
          <span class="btn2">全部删除</span>
          <span class="btn2">删除选中</span> -->
          <!-- <span class="btn">发起预约</span> -->
          <el-button type="info" round @click="shua()">刷新</el-button>
          <!-- <el-button v-if="$store.state.permission.buttons.includes('预约广播:全部删除')" type="info" round>全部删除</el-button> -->
          <el-button v-if="$store.state.permission.buttons.includes('预约广播:删除选中')" type="info" round @click="shan()">删除选中</el-button>
          <el-button v-if="$store.state.permission.buttons.includes('预约广播:发起预约')" type="primary" round @click="updivtf=true">发起预约</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          highlight-current-row
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="预约时间"
            prop="reservation_time"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.reservation_mode === "4" ? '星期' + scope.row.reservation_week : '' }}
              {{ scope.row.reservation_mode === "2" ? scope.row.reservation_date : scope.row.reservation_time }}
            </template>
          </el-table-column>
          <el-table-column
            label="预约模式"
            prop="reservation_mode"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.reservation_mode === "1" ? "立即播放" : scope.row.reservation_mode === "2" ? '定时播放' : scope.row.reservation_mode === "3" ? "每天播放" : "每周播放" }}
            </template>
          </el-table-column>
          <el-table-column
            label="语音文件"
            prop="filelist[0].filename"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="播放模式"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.play_mode == 1 ? '次数' : '时长' }}
            </template>
          </el-table-column>
          <el-table-column
            label="播放次数/时长"
            prop="play_count"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="广播音响"
            prop="pointlist[0].pointname"
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
        <div v-if="updivtf" class="updiv">
          <div class="updiv_header">
            <span class="updiv_biao">添加预约播放</span>
            <span class="updiv_cha" @click="updivtf=false">×</span>
          </div>
          <div class="updiv_left">
            语音列表
            <el-table
              ref="multipleTable2"
              :data="arrdata2"
              tooltip-effect="dark"
              highlight-current-row
              height="300"
              style="width: 100%;"
              :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
              @selection-change="handleSelectionChange2"
            >
              <el-table-column
                type="selection"
                width="55"
              >
              </el-table-column>
              <el-table-column
                label="文件名称"
                prop="radioName"
                align="center"
              >
              </el-table-column>
            </el-table>
            <div>
              预约模式
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div v-if="value==='2'">
              预约时间
              <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions1"
              >
              </el-date-picker>
            </div>
            <div v-if="value==='3' || value==='4'">
              预约时间
              <el-time-picker
                v-model="value7"
                placeholder="任意时间点"
              >
              </el-time-picker>
            </div>
            <div v-if="value === '4'">
              <el-checkbox v-model="checked[0]">星期一</el-checkbox>
              <el-checkbox v-model="checked[1]">星期二</el-checkbox>
              <el-checkbox v-model="checked[2]">星期三</el-checkbox>
              <el-checkbox v-model="checked[3]">星期四</el-checkbox>
              <el-checkbox v-model="checked[4]">星期五</el-checkbox>
              <el-checkbox v-model="checked[5]">星期六</el-checkbox>
              <el-checkbox v-model="checked[6]">星期七</el-checkbox>
            </div>
          </div>
          <div class="updiv_right">
            广播列表
            <el-table
              ref="multipleTable3"
              :data="arrdata3"
              tooltip-effect="dark"
              height="300"
              highlight-current-row
              style="width: 100%;"
              :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
              @selection-change="handleSelectionChange3"
            >
              <el-table-column
                type="selection"
                width="55"
              >
              </el-table-column>
              <el-table-column
                label="广播ID"
                prop="id"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="备注"
                prop="name"
                align="center"
              >
              </el-table-column>
            </el-table>
            <div>
              播放模式
              <el-select v-model="value3" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div v-if="value3=='1'">
              播放次数
              <el-input v-model="value4" style="width:55%"></el-input>次
            </div>
            <div v-if="value3=='2'">
              播放时长
              <el-input v-model="value5" style="width:55%"></el-input>分钟
            </div>
            <div>
              播放间隔
              <el-input v-model="value6" style="width:55%"></el-input>秒
            </div>
            <div>
              <el-button type="info" round @click="updivtf=false">取消</el-button>
              <el-button type="primary" round @click="updata()">添加</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { post, get } from '@/api/axios'
export default {
  name: 'Broadcast',
  data() {
    return {
      updivtf: false,
      // 分页
      arrdata: [],
      arrdata2: [],
      arrdata3: [],
      checked: [
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      options: [
        {
          label: '立即播放',
          value: '1'
        },
        {
          label: '定时播放',
          value: '2'
        },
        {
          label: '每天播放',
          value: '3'
        },
        {
          label: '每周播放',
          value: '4'
        }
      ],
      options3: [
        {
          label: '次数播放',
          value: '1'
        },
        {
          label: '时长播放',
          value: '2'
        }
      ],
      value: '1',
      value2: '',
      value3: '1',
      value4: '1',
      value5: '1',
      value6: '0',
      value7: '',
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      //    分页
      all: 0, //      总页数
      cur: 1,
      multipleSelection: [],
      multipleSelection2: [],
      multipleSelection3: []
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.shua()
    const that = this
    get('/mngradio/getradiofile', { cpid: this.$store.state.user.companyId, pageNumber: 0, pageSize: 200 }).then(res => {
      console.log(res)
      that.arrdata2 = res.data.content
    })
    get('/camara/getEqType?', { cpid: this.$store.state.user.companyId, system_id: 1 }).then(res => {
      this.arrdata3 = res
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
    },
    handleSelectionChange3(val) {
      this.multipleSelection3 = val
    },
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.shua()
    },
    shan() {
      console.log(this.multipleSelection)
      var id = ''
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (i === 0) {
          id = this.multipleSelection[i].id
        } else {
          id += ',' + this.multipleSelection[i].id
        }
      }
      get('/mngradio/delradio', { ids: id }).then(res => {
        console.log(132, res)
        this.shua()
      })
    },
    shua() {
      const that = this
      get('/mngradio/gettodayradiolist', { cpid: this.$store.state.user.companyId, pageNumber: that.cur - 1, pageSize: 10 }).then(res => {
        console.log(132, res)
        that.arrdata = res.data.content
        this.all = res.data.totalElements
      })
    },
    updata() {
      if (this.value !== '' && this.value3 !== '' && this.value6 !== '') {
        var data = {
          cpid: this.$store.state.user.companyId,
          reservation_mode: this.value,
          play_mode: this.value3,
          play_interval: this.value6,
          filelist: [],
          pointlist: []
        }
        if (this.value === '2') {
          data.reservation_date = this.shi2(this.value2)
        } else if (this.value === '3') {
          data.reservation_time = this.shi3(this.value7)
        } else if (this.value === '4') {
          // 周几播放
          data.reservation_week = ''
          console.log(this.checked)
          data.reservation_time = this.shi3(this.value7)
          for (var s = 0; s < this.checked.length; s++) {
            if (this.checked[s] === true) {
              data.reservation_week += data.reservation_week === '' ? '' + (s + 1) : ',' + (s + 1)
              console.log(this.checked, s, data.reservation_week)
            }
          }
        }
        if (this.value3 === '1') {
          data.play_count = this.value4
        } else {
          data.play_time = this.value5
        }
        console.log()
        for (var i = 0; i < this.multipleSelection2.length; i++) {
          data.filelist.push({
            radioFileId: this.multipleSelection2[i].id,
            radioListOrder: i + 1
          })
        }
        for (var y = 0; y < this.multipleSelection3.length; y++) {
          data.pointlist.push({
            radioPointId: this.multipleSelection3[y].id
          })
        }
        console.log(data)
        post('/mngradio/saveradio', data).then(res => {
          this.all = res.data.totalElements
          this.multipleSelection2 = []
          this.multipleSelection3 = []
          this.updivtf = false
          this.shua()
        })
      } else {
        this.$message({
          message: '请认真检查填写项',
          type: 'warning'
        })
      }
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
    shi3(date) {
      var s = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var m = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return s + ':' + f + ':' + m
    }
  }
}
</script>
<style   scoped>
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  /* margin-top: 10px; */
  padding: 1%
}
/* devmanagement */
.top {
  width: 100%;
  height: 10%;
  padding-bottom: 1%;
}
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
.baj{
  width:100%;
  min-height:100%;
  overflow: hidden;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  padding:1%;
}
.btn{
  display: inline-block;
  padding: 1%;
  padding-top: 0.5%;
  padding-bottom:0.5%;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 0px 11px 0px rgba(63,106,255,0.28);
  border-radius:5vh;
  text-align: center;
  font-size: 1.2vh;
  color: #fff;
  margin-left: 1%;
}
.btn2{
  display: inline-block;
  padding: 1%;
  padding-top: 0.5%;
  padding-bottom:0.5%;
  background:#fff;
  border:1px solid rgba(63,106,255,1);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  border-radius:5vh;
  text-align: center;
  font-size: 1.2vh;
  color: #3F6AFF;
  margin-left: 1%;
}
.updiv{
  width: 50%;
  height: 80%;
  position: fixed;
  background: #fff;
  left: 25%;
  top: 15%;
  z-index: 100;
  border: 1px solid #ccc;
}
.updiv_header{
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.updiv_biao{
  font-size: 15px;
  line-height: 30px;
  font-weight: 800;
  margin-left: 15px;
}
.updiv_cha{
  float: right;
  font-size: 30px;
  margin-right: 15px;
}
.updiv_left{
  height: calc(100% - 30px);
  float: left;
  width: 49%;
  padding: 5px;
}
.updiv_right{
  height: calc(100% - 30px);
  width: 49%;
  float: right;
  padding: 5px;
}
</style>

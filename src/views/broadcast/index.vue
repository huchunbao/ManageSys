<template>
  <div>
    <div class="lan">
      <!-- <div class="da">
        <div class=" top">
          日期
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <el-button class="btn-search" type="primary" style="border-radius: 20px;" @click="sou">查询</el-button>
        </div>
      </div> -->
      <div class="bej">
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
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
            prop="play_mode"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.play_mode == 1 ? '次数' : '时长' }}
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="播放次数/时长"
            prop="bfcs"
            align="center"
          >
          </el-table-column> -->
          <el-table-column label="播放次数/时长">
            <template slot-scope="scope">
              <span v-if="scope.row.play_mode=='1'">{{ scope.row.play_count }}</span>
              <span v-if="scope.row.play_mode=='2'">{{ scope.row.play_time }}/M</span>
              <!-- <span v-if="scope.rew.play_mode=='2'">2</span> -->
            </template>
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
          :total="arr.length"
          @current-change="btnClick"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '@/api/axios'
export default {
  name: 'Broadcast',
  data() {
    return {
      value1: '',
      // 分页
      lx: '',
      bc: '',
      zdl: '',
      mes: '',
      pagesize: 1,
      pageNumber: 10,
      arrdata: [],
      arr: [
        {
          yysj: '06:00:01',
          yyms: '循环播放',
          yywj: '欢迎广播.wav',
          bfms: '次数播放',
          bfcs: '3次',
          gbyx: '出入口音响'
        },
        {
          yysj: '09:23:33',
          yyms: '循环播放',
          yywj: '景区宣传1.wav',
          bfms: '次数播放',
          bfcs: '2次',
          gbyx: '中央音响'
        },
        {
          yysj: '12:00:00',
          yyms: '循环播放',
          yywj: '休闲时光.wav',
          bfms: '时间播放',
          bfcs: '01:00',
          gbyx: '中央音响'
        },
        {
          yysj: '14:23:33',
          yyms: '循环播放',
          yywj: '景区宣传2.wav',
          bfms: '次数播放',
          bfcs: '1次',
          gbyx: '中央音响'
        },
        {
          yysj: '22:30:00',
          yyms: '循环播放',
          yywj: '即将闭关.wav',
          bfms: '时间播放',
          bfcs: '00:20',
          gbyx: '中央音响'
        },
        {
          yysj: '22:50:00',
          yyms: '循环播放',
          yywj: '闭馆.wav',
          bfms: '时间播放',
          bfcs: '00:10',
          gbyx: '中央音响'
        }
      ],
      //    分页
      all: 100 / 10, //      总页数
      cur: 1,
      mingc: '',
      ip: '',
      type: '',
      data: {},
      multipleSelection: []
    }
  },
  computed: {
  },
  watch: {
  },
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
      const that = this
      get('/mngradio/gettodayradiolist', { cpid: this.$store.state.user.companyId, pageNumber: that.cur - 1, pageSize: 10 }).then(res => {
        console.log(res.data.content)
        that.arrdata = res.data.content
      })
    },
    sou() {
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
  overflow: hidden;
  padding: 1%;
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
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
.bej{
  width:98%;
  min-height:100%;
  overflow: hidden;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:14px;
  padding: 1%;
}
</style>

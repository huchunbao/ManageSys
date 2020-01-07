<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class="top">
          操作时间
          <el-date-picker
            v-model="shij"
            class="czsj"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <span class="people">发送人</span>
          <el-input v-model="data.fsr" placeholder="请输入发送人" class="car-name-input"></el-input>
          <el-button
            class="btn-search"
            type="primary"
            style="border-radius: 20px;  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
            box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);"
            @click="sou()"
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
          :header-cell-style="{background:'#edeff8',color:'#909399'}"
        >
          <el-table-column prop="id" label="序号" width="180" align="center"></el-table-column>
          <el-table-column prop="send_time" label="发送时间" width="180"></el-table-column>
          <el-table-column prop="operation_type" label="操作类型"></el-table-column>
          <el-table-column prop="send_man" label="发送人"></el-table-column>
          <el-table-column prop="send_content" label="发送内容"></el-table-column>
          <el-table-column prop="accepter" label="接收人"></el-table-column>
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
  data() {
    return {
      data: {},
      pagesize: 3,
      pageNumber: 2,
      all: 0, //      总页数
      cur: 1,
      ip: '',
      arrdata: [
        {
          num: '1',
          time: '2019-10-1 12:06',
          cztype: '发信息',
          czy: '李明',
          gjy: '请安排清洁车清理垃圾桶已满的垃圾',
          gjwz: '环卫王经理'
        },
        {
          num: '2',
          time: '2019-10-1 13:14',
          cztype: '发信息',
          czy: '小风',
          gjy: '请安排清洁人员及时清理垃圾',
          gjwz: '环卫王经理'
        },
        {
          num: '3',
          time: '2019-10-1 14:23',
          cztype: '发信息',
          czy: '小兰',
          gjy: '请安排安保人员维持秩序，避免危险',
          gjwz: '安保李经理'
        }
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      shij: [],
      value4: '',
      value11: []
    }
  },
  mounted() {
    var that = this
    get('/assetlogs/getSend', {
      cpid: this.$store.state.user.companyId,
      pageNumber: that.cur - 1,
      pageSize: 8
    }).then(res => {
      that.arrdata = res.content
      this.all = res.numberOfElements
      console.log(res, 12212)
    })
  },
  methods: {
    sou() {
      var that = this
      var data = {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 8
      }
      console.log(that.shij, 123321)
      if (that.shij.length > 0) {
        data.startTime = this.shi2(that.shij[0])
        data.endTime = this.shi2(that.shij[1])
      }
      if (this.data.fsr) {
        data.send_man = this.data.fsr
      }
      get('/assetlogs/getSend', data).then(res => {
        that.arrdata = res.content
        this.all = res.numberOfElements
        console.log(res, 100)
      })
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
      var date = (s < 10 ? '0' + s : s) + ':' + (f < 10 ? '0' + f : f) + ':' + (m < 10 ? '0' + m : m)
      return date
    },
    shi2(date) {
      var n = date.getFullYear()
      var y = date.getMonth() + 1
      var r = date.getDate()
      var s = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var m = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return n + '-' + y + '-' + r + ' ' + s + ':' + f + ':' + m
    }
  }
}
</script>
<style  scoped>
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  overflow: hidden;
}
ul {
  display: flex;
  list-style: none;
}
li {
  padding: 0 12px;
}
a:hover {
  color: rgba(63, 106, 255, 1);
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
  border-left: 0.3vw solid #3F6AFF;
  margin: 15px 0px 5px 1%;
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
.czsj{
  margin-left:13px;
}
.people{
  margin-left:13px;
}
.body{
  width:98%;
  height:80%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:14px;
  padding:10px;
  margin-top:10px;
}
</style>

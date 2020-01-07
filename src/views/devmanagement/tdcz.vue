<template>
  <div class="lan">
    <div class="wk">
      <el-button
        type="info"
        round
        @click="plcz()"
      >批量开机</el-button>
      <el-button
        type="info"
        round
        @click="close()"
      >批量关机</el-button>
    </div>
    <div class="body">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          label="序号"
          width="120"
        >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="IP地址"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="jiekou"
          label="接口"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="number"
          label="系统编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="orag"
          label="所属区域"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cpany"
          label="厂商"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="oldnumber"
          label="原编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="online"
          label="状态"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="beizhu"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="caozuo"
          label="操作"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <button
              v-if="scope.row.name=='售票收银机'"
              @click="b3(scope.row.name)"
            >发送补货信息</button>
            <el-button
              v-if="scope.row.name!='售票收银机'"
              type="text"
              size="small"
              @click="b1(scope.row)"
            >重启</el-button>
            <el-button
              v-if="scope.row.name!='售票收银机'"
              type="text"
              size="small"
              @click="b2(scope.row)"
            >关机</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tishi">
      <p style="font-size:12px; padding:10px 14px;">信息提示</p>
      <p style="font-size:12px; padding:10px 32px;">{{ xinxi }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      multipleTable: [],
      tableData3: [
        {
          date: '1',
          name: '热成像摄像机01',
          address: '192.168.1.53',
          jiekou: '8000',
          number: '8754',
          orag: '拓展部',
          type: '',
          cpany: '海康威视',
          oldnumber: 'FKKF15505',
          online: '在线',
          beizhu: ''
        },
        {
          date: '2',
          name: '单兵',
          address: '192.168.1.35',
          jiekou: '8000',
          number: '3390',
          orag: '拓展部',
          type: '',
          cpany: '海康威视',
          oldnumber: '9484',
          online: '在线',
          beizhu: ''
        },
        {
          date: '3',
          name: '密度摄像机',
          address: '192.168.1.78',
          jiekou: '8000',
          number: '4099',
          orag: '拓展部',
          type: '',
          cpany: '',
          oldnumber: '95505',
          online: '在线',
          beizhu: ''
        },
        {
          date: '4',
          name: '应用服务器01',
          address: '192.168.1.29',
          jiekou: '8000',
          number: '8932',
          orag: '拓展部',
          type: '',
          cpany: '',
          oldnumber: 'SKKS0022',
          online: '在线',
          beizhu: ''
        },
        {
          date: '5',
          name: '服务器01',
          address: '192.168.1.89',
          jiekou: '8000',
          number: '0404',
          orag: '拓展部',
          type: '',
          cpany: '',
          oldnumber: 'KEK2020',
          online: '在线',
          beizhu: ''
        },
        {
          date: '6',
          name: '闸机',
          address: '192.168.1.132',
          jiekou: '8000',
          number: '1169',
          orag: '拓展部',
          type: '',
          cpany: '',
          oldnumber: 'HK1595505',
          online: '在线',
          beizhu: ''
        },
        {
          date: '7',
          name: '服务器02',
          address: '192.168.1.248',
          jiekou: '8000',
          number: 'SK33032',
          orag: '拓展部',
          type: '',
          cpany: '海康威视',
          oldnumber: '03021',
          online: '在线',
          beizhu: ''
        }
      ],
      multipleSelection: [],
      pagesize: 1,
      pageNumber: 10,
      arr: [],
      all: 100 / 10, //      总页数
      cur: 1,
      xinxi: '',
      data: {}
    }
  },
  computed: {
    // 实时更新展示的页码
    indexs() {
      var left = 1
      var right = this.all
      var ar = []
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2
          right = this.cur + 2
        } else {
          if (this.cur <= 3) {
            left = 1
            right = 5
          } else {
            right = this.all
            left = this.all - 4
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
      } else {
        left = 1
        right = this.all
        while (left <= right) {
          ar.push(left)
          left++
        }
      }
      return ar
    }
  },
  watch: {
    // 页码发生改变时触发
    cur: function(oldValue, newValue) {
      console.log(oldValue, newValue)
      this.shua()
    }
  },
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    b1(data, i) {
      this.xinxi = data.name
      this.xinxi += '重启成功'
      data.online = '在线'
    },
    b2(data, i) {
      this.xinxi = data.name
      this.xinxi += '已关机'
      data.online = '离线'
    },
    b3(data, i) {
      this.xinxi = data.name
      this.xinxi += '已发送到张三手机上'
    },
    plcz() {
      this.multipleSelection.forEach(open => {
        this.xinxi += open.name
        this.xinxi += ','
        open.online = '在线'
      })
      this.xinxi += '已重启'
    },
    close() {
      this.multipleSelection.forEach(opena => {
        this.xinxi += opena.name
        this.xinxi += ','
        opena.online = '离线'
      })
      this.xinxi += '已关机'
    }
  }
}
</script>
<style scoped>
.wk{
  width:98%;
  height:7%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  border-left: 0.3vw solid #3F6AFF;
  margin: 14px 0px 5px 1%;
}
.kai {
  background: white;
  border-radius: 10px;
  border: 1px solid #3765f8;
  color: #3765f8;
  margin-top: 10px;
  font-size: 14px;
  width: 105px;
  height: 28px;
  outline: none;
}
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  overflow: hidden;
}
.page-bar {
  position: absolute;
  bottom: 20px;
  right: 10px;
  user-select: none;
}
.page-bar li {
  float: left;
  list-style: none;
}
.page-bar li:first-child > a {
  margin-left: 0px;
}
.page-bar a {
  border: 0;
  text-decoration: none;
  position: relative;
  text-align: center;
  margin-left: -1px;
  cursor: pointer;
  display: inline-block;
  width: 1.6vw;
  height: 1.6vw;
  line-height: 1.6vw;
  border-radius: 3px;
  background: white;
  margin: 0.5vw;
  color: black;
  font-size: 0.7vw;
  border: 1px solid gainsboro;
}
.tishi {
  width: 98%;
  height: 20.5%;
  background: white;
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  margin-left:1%;
  margin-top:1.1%;
}
.body{
  width:98%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:14px;
  padding:10px;
  margin-top:15px;
}
.el-button--info{
  background:#fff;
  border:1px solid rgba(63,106,255,1);
  color: #3F6AFF;
  height: 4vh;
  font-size: 2vh;
  padding-top:0;
  font-family:PingFang SC;
  font-weight:500;
  line-height: 3.5vh;
  float: right;
  margin:0.65% 0.3%;
}
</style>

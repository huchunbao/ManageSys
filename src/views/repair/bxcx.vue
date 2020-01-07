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
          报修时间
          <el-date-picker
            v-model="shij"
            class="cxsj"
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
            prop="id"
            align="center"
          >
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
            label="设备编号"
            prop="hik_surveillance_point_id"
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
            prop="alarm_content"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="照片"
            prop="photo"
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
            label="报警来源"
            prop="fault_source"
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
            label="报修时间"
            prop="repairs_time"
            align="center"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="6"
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
      $index: '',
      lx: '',
      bc: '',
      mes: '',
      // pagesize: 1,
      // pageNumber: 6,
      all: 100 / 10, //      总页数
      cur: 1,
      arrdata: [],
      arr: [
        {
          jhrq: '1',
          jhmc: 'BX20191001001',
          lxmc: 'HK001136',
          xjdmc: '密度摄像机',
          xjdbh: '竹博物馆',
          ddsj: '触发报警 时间：2019-10-1 9:24',
          cjy: '告警报修',
          zt: '李明',
          lxfs: '15678901124',
          bxsj: '2019-10-1 10:00'
        },
        {
          jhrq: '2',
          jhmc: 'BX20191001002',
          lxmc: 'HK298484',
          xjdmc: '客流像机',
          xjdbh: '地中海俱乐部',
          ddsj: '触发报警   时间：2019-10-1 10:24',
          cjy: '告警报修',
          zt: '田玲',
          lxfs: '13021098734',
          bxsj: '2019-10-1 10:42'
        },
        {
          jhrq: '3',
          jhmc: 'BX20191001003',
          lxmc: 'SU109872',
          xjdmc: '密度摄像机',
          xjdbh: '山林氧吧公园',
          ddsj: '触发报警 时间:  2019-10-1 12:36',
          cjy: '告警报修',
          zt: '王丽',
          lxfs: '18056021205',
          bxsj: '2019-10-1 12:50'
        },
        {
          jhrq: '4',
          jhmc: 'BX20191001004',
          lxmc: 'af201347',
          xjdmc: '客流像机',
          xjdbh: '竹博物馆',
          ddsj: '触发报警  时间:  2019-10-1 13:30',
          cjy: '告警报修',
          zt: '王思',
          lxfs: '15834120934',
          bxsj: '2019-10-1 13:45'
        }
      ],
      //    分页
      mingc: '',
      ip: '',
      type: '',
      sbwz: '',
      data: {},
      multipleSelection: [],
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
      value4: ''
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
      get('/repair/getRepair', {
        cpid: this.$store.state.user.companyId,
        pageNumber: that.cur - 1,
        pageSize: 6
      }).then(res => {
        that.arrdata = res.content
        that.all = res.totalElements
      // console.log(res, 111223)
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
        pageSize: 6,
        eq_address: this.data.sbwz,
        eq_name: this.data.sbmc
      }
      if (that.shij.length > 0) {
        console.log(that.shij)
        data.startTime = this.shi2(that.shij[0])
        data.endTime = this.shi2(that.shij[1])
      }
      get('/repair/getRepair', data).then(res => {
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
  border-left: 0.3vw solid #3f6aff;
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

.jk {
  width: 200px;
  height: 23px;
}
.ld {
  width: 280px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 40px;
  margin-top: 20px;
}
.jk {
  width: 120px;
  height: 25px;
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
  background: rgba(63, 106, 255, 0.08);
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
.cxsj {
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

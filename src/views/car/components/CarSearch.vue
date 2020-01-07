<template>
  <div class="car-search">
    选择日期
    <el-date-picker
      v-model="time"
      class="date-picker"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      :clearable="false"
    />
    选择车辆
    <el-dropdown trigger="click" class="car-dropdown" @command="handleCommand">
      <el-button plain>
        {{ carName }}<i class="el-icon-caret-bottom el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown" class="no-padding no-border">
        <el-dropdown-item v-for="name in nameList" :key="name.id" :command="name">{{ name.veh_code }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-if="searchType == 'cs'">
      超速值
      <el-input v-model="speedNumInput" placeholder="超速" class="search-small-input" />
      超速时长
      <el-input v-model="speedTimeInput" placeholder="时长(小时)" class="car-name-input" />
    </div>
    <div v-else-if="searchType == 'wz'">
      间隔
      <el-input v-model="intervalInput" placeholder="分钟" class="search-small-input" />
    </div>
    <div v-else-if="searchType == 'tc'">
      时长
      <el-input v-model="durationInput" placeholder="分钟" class="search-small-input" />
    </div>
    <div v-else-if="searchType == 'sbxx'">
      电量≤
      <el-input v-model="power" placeholder="电量" class="search-small-unit-input" />
      %
    </div>
    <div v-else-if="searchType == 'bjxx'">
      报警类型
      <el-dropdown trigger="click" class="car-dropdown" @command="handleCommandAlarm">
        <el-button plain>
          {{ carAlarm }}<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-padding no-border">
          <el-dropdown-item v-for="alarm in alarmList" :key="alarm" :command="alarm">{{ alarm }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-button :loading="searchLoading" class="btn-search" type="primary" round @click="btnSearch">查询</el-button>
    <el-button v-if="searchType !== 'lsgj'" :loading="downloadLoading" class="el-button-default" size="mini" round @click="btnExcel">导出Excel</el-button>
    <slot />
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'CarSearch',
  props: {
    searchType: {
      type: String,
      default: 'xs'
    },
    nameList: {
      type: Array,
      'default': null
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      time: [],
      carName: '选择车辆',
      carNameId: -1,
      speedNumInput: '',
      speedTimeInput: '',
      intervalInput: '',
      durationInput: '',
      power: '',
      carAlarm: '全部报警',
      alarmList: ['全部报警', '断电报警', '超速报警', '超时报警', '区域报警'],
      searchLoading: false,
      downloadLoading: false,
      queryData: []
    }
  },
  created() {
    const now = new Date()
    var startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1)).toLocaleString().slice(0, 10) // 开始事件初始化本月第一天
    var endDate = now
    this.time.push(startDate)
    this.time.push(endDate)
  },
  methods: {
    handleCommand(command) { // 车船列表选择
      this.carName = command.veh_code
      this.carNameId = command.id
    },
    handleCommandAlarm(command) {
      this.carAlarm = command
    },
    btnSearch() { // 查询按钮事件
      let startTime = ''
      let endTime = ''
      let vehCode = ''
      if (this.time === null) {
        this.$message({
          message: '请选择日期',
          type: 'warning',
          duration: 3000
        })
        return
      }
      if (this.time.length > 0) {
        startTime = parseTime(this.time[0])
        endTime = parseTime(this.time[1])
      }
      if (this.carNameId > 0) {
        vehCode = this.carName
      }

      if (this.searchType === 'lsgj' && vehCode === '') {
        this.$message({
          message: '请选择车辆',
          type: 'warning',
          duration: 3000
        })
        return
      }

      const query = {
        'startTime': startTime,
        'endTime': endTime,
        'id': null,
        'vehCode': vehCode,
        'pageNum': 1,
        'pageSize': 5
      }

      switch (this.searchType) { // 生成查询条件
        case 'cs':
          this.queryData = Object.assign(query, { 'speedValue': this.speedNumInput, 'speedTime': this.speedTimeInput })
          break
        case 'wz':
          this.queryData = Object.assign(query, { 'intervalTime': this.intervalInput })
          break
        case 'tc':
          this.queryData = Object.assign(query, { 'intervalTime': this.durationInput })
          break
        case 'sbxx':
          this.queryData = Object.assign(query, { 'power': this.power })
          break
        case 'jy':
          this.queryData = Object.assign(query, { 'oilType': 0 })
          break
        case 'ly':
          this.queryData = Object.assign(query, { 'oilType': 1 })
          break
        case 'bjxx':
          this.queryData = Object.assign(query, { 'alarm': this.carAlarm })
          break
        default:
          this.queryData = query
          break
      }
      this.searchLoading = true
      this.$emit('search', this.tabIndex, this.queryData)
    },
    btnExcel() {
      this.downloadLoading = true
      this.$emit('excel', this.tabIndex, this.queryData)
    }
  }
}
</script>

<style>
.car-search{
  height: 50px;
  line-height: 50px;
  width: 100%;
  padding-left: 20px;
}

.car-search:before{
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  width:4px;
  height:50px;
  background:#3f6aff;
  box-shadow:0px 0px 3px 0px #3f6aff;
  border-radius:4px 0px 0px 4px;
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
  width: 100px;
}

.search-small-input{
  width: 60px;
  margin: 0 10px;
}

.search-small-unit-input{
  width: 60px;
  margin-left: 10px;
}
</style>

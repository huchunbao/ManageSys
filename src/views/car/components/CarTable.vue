<template>
  <div class="car-table-container">
    <el-table
      v-loading="listLoading"
      :data="datalist"
      border
      :header-row-class-name="headerRowClass"
      :row-class-name="rowClass"
    >
      <el-table-column type="index" :index="indexMethod" header-align="center" align="center" label="序号" width="60" />
      <el-table-column v-for="head in headlist" :key="head.lable" :prop="head.prop" header-align="center" align="center" :label="head.label" :width="head.width" />
      <el-table-column v-if="tableType=='wz'" label="查看位置">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleLookSeat(scope.$index, scope.row)">查看位置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="pageChange(arguments)" />
    <div v-if="tableType=='wz'" class="wz-amap-wapper">
      <el-amap class="wz-amap" :vid="'amap-wz'" :zoom="zoom" :center="center">
        <el-amap-marker :position="wzMarker.position" :label="wzMarker.label" :vid="wzMarker.label" :visible="wzShow" />
      </el-amap>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'CarTable', // table列表
  components: { Pagination },
  props: {
    tableType: {
      type: String,
      default: 'xs'
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    tableLimit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      headlist: null,
      datalist: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: this.tableLimit
      },
      headData: {
        'xs': [
          { label: '统计日期', prop: 'createDate', width: '170' },
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '行驶时长(小时)', prop: 'speedTime', width: 'auto' },
          { label: '行驶里程(公里)', prop: 'speedMake', width: 'auto' },
          { label: '油耗/耗电量(百公里)', prop: 'oilEat', width: 'auto' },
          { label: '最大速度(km/h)', prop: 'maxSpeed', width: 'auto' },
          { label: '平均速度(km/h)', prop: 'avSpeed', width: 'auto' }
        ],
        'cs': [
          { label: '统计日期', prop: 'createDate', width: '170' },
          { label: '车船牌号', prop: 'vehCode', width: '90' },
          { label: '超速时长(小时)', prop: 'speedTime', width: 'auto' },
          { label: '超速里程(公里)', prop: 'speedMake', width: 'auto' },
          { label: '超速次数', prop: 'speedNum', width: 'auto' },
          { label: '最大速度(km/h)', prop: 'maxSpeed', width: 'auto' },
          { label: '最小速度(km/h)', prop: 'minSpeed', width: 'auto' },
          { label: '限速(km/h)', prop: 'speedLimit', width: 'auto' }
        ],
        'wz': [
          { label: '车船牌号', prop: 'vehCode', width: '90' },
          { label: '时间', prop: 'time', width: '160' },
          { label: '经度', prop: 'lng', width: 'auto' },
          { label: '纬度', prop: 'lat', width: 'auto' },
          { label: '速度(km/h)', prop: 'speed', width: '100' },
          { label: '方向', prop: 'direction', width: '60' },
          { label: '有效性', prop: 'effect', width: '80' },
          { label: '状态', prop: 'state', width: 'auto' }
        ],
        'tc': [
          { label: '统计日期', prop: 'createDate', width: '170' },
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '停车时长(小时)', prop: 'stopTime', width: 'auto' },
          { label: '停车次数', prop: 'stopCount', width: 'auto' }
        ],
        'lc': [
          { label: '统计日期', prop: 'createDate', width: '170' },
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '行驶里程(公里)', prop: 'dis', width: 'auto' },
          { label: '油耗/耗电量(百公里)', prop: 'oilEat', width: 'auto' }
        ],
        'ml': [
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '发送时间', prop: 'sendTime', width: 'auto' },
          { label: '发送命令', prop: 'sendOrder', width: 'auto' },
          { label: '发送类容', prop: 'sendContent', width: 'auto' },
          { label: '监控员', prop: 'monitorName', width: 'auto' },
          { label: '发送结果', prop: 'sendResult', width: 'auto' }
        ],
        'ts': [
          { label: '统计日期', prop: 'createDate', width: '170' },
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '行驶时长(小时)', prop: 'disTime', width: 'auto' },
          { label: '趟数', prop: 'passes', width: 'auto' }
        ],
        'sbxx': [
          { label: '车船牌号', prop: 'vehCode', width: '90' },
          { label: '设备ID', prop: 'wellId', width: '150' },
          { label: 'SIM卡号', prop: 'SIMId', width: '150' },
          { label: '速度', prop: 'speed', width: '60' },
          { label: '有效性', prop: 'effect', width: '80' },
          { label: '总里程(km)', prop: 'totalMake', width: '100' },
          { label: '电量', prop: 'power', width: '60' },
          { label: '最后回传时间', prop: 'lastTime', width: '160' },
          { label: '状态', prop: 'state', width: 'auto' }
        ],
        'jy': [
          { label: '统计日期', prop: 'createDate', width: '170' },
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '加油/充电量(L/KWH)', prop: 'oilNum', width: 'auto' },
          { label: '加油/充电次数', prop: 'oilCount', width: 'auto' }
        ],
        'ly': [
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '漏油/亏电量(L/mAH)', prop: 'oilNum', width: 'auto' },
          { label: '漏油/亏电次数', prop: 'oilCount', width: 'auto' }
        ],
        'zq': [
          { label: '统计日期', prop: 'createDate', width: '170' },
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '总里程(km)', prop: 'totalDis', width: 'auto' },
          { label: '总油耗/能耗', prop: 'totalOilEat', width: 'auto' },
          { label: '超速次数', prop: 'speedNum', width: 'auto' },
          { label: '超时停车次数', prop: 'outtimeStopcarNum', width: 'auto' },
          { label: '加油/充电量(L/KWH)', prop: 'oilNum', width: 'auto' },
          { label: '漏油/亏电量(L/mAH)', prop: 'oilleakNum', width: 'auto' },
          { label: '百公里油耗/能耗', prop: 'oilEat', width: 'auto' }
        ],
        'bjxx': [
          { label: '车船牌号', prop: 'vehCode', width: 'auto' },
          { label: '报警类型', prop: 'alarmType', width: 'auto' },
          { label: '报警审核', prop: 'alarmCheck', width: 'auto' },
          { label: '报警处理', prop: 'alarmHandle', width: 'auto' },
          { label: '车队', prop: 'fleet', width: 'auto' },
          { label: '终端序列号', prop: 'terminal', width: 'auto' },
          { label: 'SIM卡号', prop: 'mobile', width: 'auto' },
          { label: '报警时间', prop: 'alarmTime', width: 'auto' },
          { label: '报警状态', prop: 'alarmStatus', width: 'auto' },
          { label: '报警地点', prop: 'alarmLocation', width: 'auto' },
          { label: '报警人', prop: 'alarmPerson', width: 'auto' },
          { label: '处警时间', prop: 'handleTime', width: 'auto' },
          { label: '处警方式', prop: 'handleType', width: 'auto' },
          { label: '处警人', prop: 'handlePerson', width: 'auto' },
          { label: '处警类容', prop: 'handleContent', width: 'auto' },
          { label: '处警结果', prop: 'handleResult', width: 'auto' }
        ]
      },
      zoom: 16,
      center: [116.336496, 39.942178],
      wzMarker: {
        position: [116.336496, 39.942178],
        label: ''
      },
      wzShow: false
    }
  },
  watch: {
    // datalist: {
    //   handler(newValue, oldValue) {
    //     this.total = newValue.length
    //   },
    //   deep: true
    // }
  },
  created() {
    this.initTable()
  },
  methods: {
    initTable() {
      this.listLoading = true
      this.headlist = this.headData[this.tableType]
      this.listLoading = false
    },
    pageChange(page) {
      this.$emit('pageChange', this.tabIndex, page[0])
    },
    headerRowClass({ row, rowIndex }) {
      return 'car-table-header'
    },
    rowClass({ row, rowIndex }) {
      return 'car-table-item'
    },
    handleLookSeat(index, row) {
      if (!this.wzShow) {
        this.wzShow = true
      }
      var position = [[116.337078, 39.938673],
        [116.332841, 39.940372],
        [116.335748, 39.942577],
        [116.334145, 39.945174],
        [116.33843, 39.943959],
        [116.337186, 39.941688]
      ]
      this.center = position[index]
      this.wzMarker.position = position[index]
      this.wzMarker.label = {
        content: row.vehCode,
        offset: [25, 0]
      }
    },
    indexMethod(index) {
      return index + (this.listQuery.page - 1) * this.tableLimit + 1
    }
  }
}
</script>

<style>
.car-table-container{
  background-color: #fff;
  padding: 10px;
}

.wz-amap-wapper{
  width: 100%;
  margin-top: 10px;
  height: 50vh;
}

.amap-marker-label{
  border: none !important;
  background-color: rgba(47,49,83,0.6) !important;
  padding: 8px !important;
  color: #fff;
  border-radius: 2px;
}
</style>

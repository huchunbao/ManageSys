<template>
  <el-table
    :data="list"
    :header-row-class-name="headerRowClass"
    :row-class-name="rowClass"
  >
    <el-table-column prop="routeNo" width="54" header-align="center" align="center" label="行驶路线" :formatter="lineFormat" />
    <el-table-column prop="vehCode" header-align="center" align="center" width="54" label="车船牌号" />
    <el-table-column prop="direction" header-align="center" align="center" width="28" label="方向" />
    <el-table-column prop="driverName" header-align="center" align="center" width="54" label="当值司机" />
    <el-table-column prop="driverContact" header-align="center" align="center" width="54" label="联系方式" />
    <el-table-column prop="busHour" header-align="center" align="center" width="54" label="运营时间" />
    <el-table-column prop="ifees" header-align="center" align="center" width="54" label="是否收费" :formatter="ifeesFormat" />
  </el-table>
</template>

<script>
export default {
  name: 'DetailsList', // 车船总览table列表
  props: {
    list: {
      type: Array,
      'default': null
    }
  },
  methods: {
    headerRowClass({ row, rowIndex }) {
      return 'detail-header'
    },
    rowClass({ row, rowIndex }) {
      return 'detail-header'
    },
    ifeesFormat(row, column) {
      return row.ifees === 0 ? '否' : '是'
    },
    lineFormat(row, column) {
      return '线路' + row.routeNo
    }
  }
}
</script>

<style>
.hover-row{
  background-color: transparent !important;
}

.detail-header{
  background-color: transparent !important;
  color: #fff;
}

.detail-header th{
  background-color: transparent !important;
  padding: 4px 0 !important;
  border: none !important;
}

.detail-header td{
  background-color: transparent !important;
  padding: 4px 0 !important;
  overflow: hidden;
  border: none !important;
}

.el-table .el-table__header .gutter{
  display: table-cell !important;
}

.detail-header th .cell{
  padding: 0 2px !important;
}

.detail-header td .cell{
  padding: 0 !important;
  line-height: 14px;
}
</style>

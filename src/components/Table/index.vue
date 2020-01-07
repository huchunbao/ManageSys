<template>
  <div class="table-template-container">
    <el-table
      v-loading="listLoading"
      :data="dataList"
      border
      :header-row-class-name="headerRowClass"
      :row-class-name="rowClass"
    >
      <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
      <el-table-column v-for="head in headList" :key="head.lable" :prop="head.prop" :label="head.label" :width="head.width" />
      <slot />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="pageChange(arguments)" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default { // 表格
  name: 'TableTemplate',
  components: { Pagination },
  props: {
    tableName: {
      type: String,
      default: ''
    },
    headList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      dataList: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 5
      }
    }
  },
  methods: {
    pageChange(page) {
      this.$emit('pageChange', this.tableName, page[0])
    },
    headerRowClass({ row, rowIndex }) {
      return 'car-table-header'
    },
    rowClass({ row, rowIndex }) {
      return 'car-table-item'
    },
    indexMethod(index) {
      return index + (this.listQuery.page - 1) * this.listQuery.limit + 1
    }
  }
}
</script>

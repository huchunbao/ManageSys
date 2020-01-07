<template>
  <div class="table_box" :alldata="alldata" :totals="totals">
    <el-table
      class="tables"
      :data="alldata.tableData"
      style="width: 100%;text-align:center"
      :border="border"
      :show-header="true"
      :header-cell-style="{background:'#eef1f6', color:'#606266'}"
      :highlight-current-row="highlightcurrentrow"
    >
      <el-table-column
        prop="index"
        label="序号"
        :sortable="alldata.tableData.sortable"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="question"
        label="问题"
        :sortable="sortable"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="keywords"
        align="center"
        :sortable="sortable"
        label="问题关键词"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="containe"
        align="center"
        label="回答内容"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >修改问题</el-button>
          <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
          >修改回答内容</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pageshow" class="pages">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageshow: {
      type: Boolean,
      default: true
    },
    totals: {
      type: Number,
      default: 10
    },
    alldata: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          total: 100,
          sortable: false,
          tableData: [{
            index: 1,
            question: '问题1',
            keywords: '问题1',
            containe: '回答问题1'
          }, {
            index: 2,
            question: '问题2',
            keywords: '问题2',
            containe: '回答问题2'
          }]
        }
      }
    }
  },
  data() {
    return {
      border: false, // 是否有纵向线
      sortable: false, // 是否排序
      highlightcurrentrow: true, // 是否高亮
      currentPage: 1, // 默认前往的页码
      total: 100, // 总页数
      pageNumber: 1 // 当前页的页码数默认1
    }
  },
  watch: {
    pageNumber(val) {
      this.$emit('onchange', val)
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      // console.log('当前页：' + val)
    },
    formatter(row, column) {
      return row.address
    }
  }
}

</script>
<style>
.table_box {
  width: 100%;
  height: 100%;
}
.tables {
  width: 100%;
  max-height: calc(100% - 20px -30px);
}
.pages {
  margin-top: 20px;
  height: 30px;
  float: right;
  margin-right: 15px;
}
</style>

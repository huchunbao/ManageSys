<template>
  <div class="index">
    <div class="tablea">
      <el-button type="primary" round class="addBtn" @click="addBtn">增加</el-button>
      <div class="table_box">
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
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="question"
            label="问题"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="keywords"
            align="center"
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
                @click="handleContainer(scope.$index, scope.row)"
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
    </div>
    <el-dialog :visible.sync="adds.adds" title="增加" :modal-append-to-body="false">
      <el-form :model="adds">
        <el-form-item label="问题" :label-width="formLabelWidth">
          <el-input v-model="adds.question" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" :label-width="formLabelWidth">
          <el-input v-model="adds.keywords" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回答内容" :label-width="formLabelWidth">
          <el-input v-model="adds.containe" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <div v-if="addSave" style="color: red;text-align: center;">请检查是否填写完整</div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adds.adds = false">取 消</el-button>
        <el-button type="primary" :disabled="addSave" @click="handAddBtn">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="questions.questions" title="修改问题" :modal-append-to-body="false">
      <el-form :model="questions">
        <el-form-item label="问题" :label-width="formLabelWidth">
          <el-input v-model="questions.question" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" :label-width="formLabelWidth">
          <el-input v-model="questions.keywords" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="questions.questions = false">取 消</el-button>
        <el-button type="primary" @click="handEditsave">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="answers.answers" title="修改回答内容" :modal-append-to-body="false">
      <el-form :model="answers">
        <el-form-item label="回答内容" :label-width="formLabelWidth">
          <el-input v-model="answers.containe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="answers.answers = false">取 消</el-button>
        <el-button type="primary" @click="handContainersave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { get } from '@/api/axios'
// import TableGet from './components/table'
export default {
  name: 'Tourist',
  // components: {
  //   TableGet
  // },
  data() {
    return {
      border: false, // 是否有纵向线
      sortable: false, // 是否排序
      highlightcurrentrow: true, // 是否高亮
      currentPage: 1, // 默认前往的页码
      total: 100, // 总页数
      pageNumber: 1, // 当前页的页码数默认1
      pageshow: false,
      questions: {
        questions: false,
        question: '',
        keywords: '',
        containe: ''
      },
      answers: {
        answers: false,
        question: '',
        keywords: '',
        containe: ''
      },
      adds: {
        adds: false,
        question: '',
        keywords: '',
        containe: ''
      },
      formLabelWidth: '120px',
      index: '',
      row: {},
      alldata: {
        currentPage: 1,
        total: 100,
        sortable: false,
        tableData: [{
          index: 1,
          question: '问题122',
          keywords: '问题1',
          containe: '回答问题1'
        }, {
          index: 2,
          question: '问题22',
          keywords: '问题2',
          containe: '回答问题2'
        }, {
          index: 3,
          question: '问题3',
          keywords: '问题3',
          containe: '回答问题3'
        }, {
          index: 4,
          question: '问题4',
          keywords: '问题4',
          containe: '回答问题4'
        }]
      }
    }
  },
  computed: {
    addSave() {
      if (this.adds.question && this.adds.keywords && this.adds.containe) {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
  },
  methods: {
    onchange(val) {
      console.log('获取到的值' + val)
    },
    // 增加按钮
    addBtn() {
      this.adds.adds = true
      this.adds.question = null
      this.adds.keywords = null
      this.adds.containe = null
    },
    // 增加按钮确定
    handAddBtn() {
      this.adds.adds = false
      var length = this.alldata.tableData.length + 1
      this.alldata.tableData.push({
        index: length,
        question: this.adds.question,
        keywords: this.adds.keywords,
        containe: this.adds.containe
      })
    },
    // 修改问题
    handleEdit(index, row) {
      console.log(index, row)
      // 初始化
      this.questions.questions = true
      this.questions.keywords = row.keywords
      this.questions.question = row.question
      this.questions.containe = row.containe
      this.index = index
      this.row = row
    },
    // 修改问题保存
    handEditsave() {
      this.alldata.tableData[this.index].question = this.questions.question
      this.alldata.tableData[this.index].keywords = this.questions.keywords
      this.questions.questions = false
    },
    // 修改回答内容
    handleContainer(index, row) {
      // console.log(index, row)
      // 初始化
      this.answers.answers = true
      this.answers.question = row.question
      this.answers.keywords = row.keywords
      this.answers.containe = row.containe
      this.index = index
      this.row = row
    },
    // 修改回答内容保存
    handContainersave() {
      this.alldata.tableData[this.index].containe = this.answers.containe
      this.answers.answers = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      console.log('当前页：' + val)
    },
    formatter(row, column) {
      return row.address
    }
  }
}
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.index {
  z-index: 10;
  width: 100%;
  min-width: 480px;
  height: 100%;
  background: #F6F8FF;
  padding: 15px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.index .tablea {
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,1);
  box-shadow: 0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius: 6px;
  padding: 30px;
  position: relative;
}
.addBtn{
  position: absolute;
  right: 30px;
}
.table_box {
  width: 100%;
  height: calc(100% - 45px);
  margin-top: 45px;
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

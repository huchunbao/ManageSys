<template>
  <div>
    <div class="lan">
      <div class="baj">
        <div class="top">
          <!-- <span class="btn2">刷新</span>
          <span class="btn2">全部删除</span>
          <span class="btn2">删除选中</span>
          <span class="btn">上传</span> -->
          <el-button type="info" round @click="shua">刷新</el-button>
          <!-- <el-button v-if="$store.state.permission.buttons.includes('文件管理:全部删除')" type="info" round @click="alldelet">全部删除</el-button> -->
          <el-button v-if="$store.state.permission.buttons.includes('预约广播:删除选中')" type="info" round @click="delet">删除选中</el-button>
          <!-- <el-button type="primary" round>上传</el-button> -->
          <el-upload
            class="upload-demo"
            action="http://192.168.1.17:8089/mngradio/saveradiofile"
            :data="fudata"
            :before-upload="updata"
          >
            <el-button type="primary" round>上传</el-button>
          </el-upload>
        </div>
        <el-table
          ref="multipleTable"
          :data="arrdata"
          highlight-current-row
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="文件名称"
            prop="radioName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="文件大小"
            prop="fileSize"
            align="center"
          >
          </el-table-column>
          <!-- <el-table-column
            label="所属区域"
            prop="yywj"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="bfms"
            align="center"
          >
          </el-table-column> -->
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
import { post, get } from '@/api/axios'
export default {
  name: 'Broadcast',
  data() {
    return {
      fileList: [],
      // 分页
      lx: '',
      bc: '',
      zdl: '',
      mes: '',
      pagesize: 1,
      pageNumber: 10,
      arrdata: [],
      fudata: {
        cpid: this.$store.state.user.companyId
      },
      //    分页
      all: 0, //      总页数
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
      get('/mngradio/getradiofile', { cpid: this.$store.state.user.companyId, pageNumber: that.cur - 1, pageSize: 10 }).then(res => {
        console.log(123, res)
        that.arrdata = res.data.content
        that.all = res.data.numberOfElements
      })
    },
    updata(data) {
      var formData = new FormData()
      formData.append('file', data)
      post('/mngradio/saveradiofile/' + this.$store.state.user.companyId, formData).then(res => {
        console.log(res)
        this.shua()
      })
      return false
    },
    delet() {
      const that = this
      var ids = ''
      for (var i = 0; i < that.multipleSelection.length; i++) {
        if (i === 0) {
          ids += that.multipleSelection[i].id
        } else {
          ids += ',' + that.multipleSelection[i].id
        }
      }
      get('/mngradio/delradiofile', { ids: ids }).then(res => {
        console.log(res.msg)
        if (res.msg === 'SUCCESS') {
          this.shua()
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    alldelet() {
      var ids = ''
      const that = this
      for (var i = 0; i < that.arrdata.length; i++) {
        if (i === 0) {
          ids += that.arrdata[i].id
        } else {
          ids += ',' + that.arrdata[i].id
        }
      }
      get('/mngradio/delradiofile', { ids: ids }).then(res => {
        console.log(res)
        this.shua()
      })
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
  padding: 1%
}
/* devmanagement */
.top {
  width: 100%;
  height: 10%;
  padding: 1%;
}
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
.baj{
  width:100%;
  min-height:100%;
  overflow: hidden;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  padding:1%;
}
.upload-demo {
  display: inline-block;

}
</style>

<template>
  <div class="news-container">
    <div class="news">
      <div class="news_header">
        今天播放节目列表
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
        >
          <!-- <el-table-column
            label="序号"
            prop="id"
            align="center"
          >
          </el-table-column> -->
          <el-table-column
            label="节目编号"
            prop="id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="节目名称"
            prop="programmeName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="显示名称"
            prop="equipmentName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="显示屏ID"
            prop="equipmentNo"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="播放时间"
            prop="showStartTime"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="createDate"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="创建人员"
            prop="createBy"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
            align="center"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="arr.length"
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
  name: 'News',
  data() {
    return {
      name: '信息发布管理',
      cur: 1,
      arr: [
      ],
      arrdata: []
    }
  },
  created() {
    // this.shua()
    this.huo()
  },
  methods: {
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.shua()
    },
    shua() {
      console.log(this.cur, this.arrdata)
      this.arrdata = []
      for (var i = 0; i < 10; i++) {
        if (i < this.arr.length && this.arr[i + (this.cur * 8) - 8]) {
          this.arrdata.push(this.arr[i + (this.cur * 8) - 8])
        }
      }
    },
    huo() {
      var that = this
      console.log(that.cur)
      get('/RadioProgramme/getLedProgrammeList', { pageNumber: that.cur - 1, pageSize: 8 }).then(res => {
        console.log(res.data)
        that.arrdata = res.data.content
        for (var i = 0; i < that.arrdata.length; i++) {
          that.arrdata[i].showStartTime = that.arrdata[i].showStartTime.split(/[ ]+/)[1]
        }
      })
    }
  }
}
</script>
<style scoped>
.news-container{
  background: #f0f3ff;
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 1%;
}
.news{
  width: 100%;
  min-height: 85vh;
  background: #ffffff;
  padding: 1%;
  overflow: hidden;
}
.news_header{
  line-height: 200%;
  margin-bottom: 1%;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
}
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
</style>

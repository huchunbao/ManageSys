<template>
  <div class="news-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="backcha">
          <el-menu
            :default-active="tab"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="fang"
          >
            <el-submenu index="1">
              <template slot="title">
                <span style="margin-left:5%;">银科环企</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item, i) in options" :key="i" :index="item.id+''">{{ item.name }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="backcha">
          <!-- <el-button type="primary" round>停止播放</el-button> -->
          <el-button v-if="$store.state.permission.buttons.includes('查看插播节目:取消播放')" type="info" round @click="del">取消播放</el-button>
          <div style="margin-top:3%;">
            <el-table
              ref="multipleTable"
              :data="arrdata"
              tooltip-effect="dark"
              style="width: 100%;"
              highlight-current-row
              :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
              @current-change="handleCurrentChange"
            >
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
                label="分辨率"
                prop="resolution"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="开始时间"
                prop="showStartTime"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="终止时间"
                prop="showEndTime"
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
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get } from '../../api/axios.js'
export default {
  name: 'News',
  data() {
    return {
      tab: '1',
      id: false,
      arrdata: [
        {
          jmxh: 'CB000001',
          jmmc: '欢迎节目',
          fbl: '1920*1080',
          kssj: '2019-04-26 10:00:00',
          zzsj: '2019-04-26 10:10:00',
          cjry: '朱清',
          bz: ''
        }
      ],
      options: []
    }
  },
  watch: {
    tab() {
      this.huo()
    }
  },
  created() {
    this.huo()
    get('/camara/getEqType2?', { system_id: 3 }).then(res => {
      console.log(res, 111111123)
      this.options = res
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
      console.log(this.tab)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    fang(index, inde) {
      this.tab = index
    },
    huo() {
      var that = this
      // console.log(that.cur)
      get('/RadioProgramme/getRadioProgrammeByScreenId', { id: that.tab * 1, pageNumber: 0, pageSize: 8 }).then(res => {
        console.log(res.data)
        that.arrdata = res.data.content
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      if (val) {
        this.id = val.id
      }
    },
    del() {
      var that = this
      if (that.id) {
        get('/RadioProgramme/delRadioProgrammeById', { id: that.id * 1 }).then(res => {
          console.log(res.data)
          that.huo()
          that.id = false
        })
      } else {
        this.$message({
          message: '请选择一个要取消的节目',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style scoped>
.news-container{
  background: #f0f3ff;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
  padding: 1%;
}
.backcha{
  background: #ffffff;
  height:100%;
  padding: 2%;
}
.el-row{
  height: 100%;
}
.el-col{
  height: 100%;
}
.btn{
  width: 10%;
  padding-top: 0.5%;
  padding-bottom:0.5%;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 0px 11px 0px rgba(63,106,255,0.28);
  border-radius:8px;
  text-align: center;
  font-size: 8px;
  color: #fff;
  float: left;
  margin-left: 1%;
}
.btn2{
  width: 10%;
  padding-top: 0.5%;
  padding-bottom:0.5%;
  background:#fff;
  border:1px solid rgba(63,106,255,1);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  border-radius:8px;
  text-align: center;
  font-size: 8px;
  color: #3F6AFF;
  float: left;
  margin-left: 1%;
}
</style>

<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class="top">
          姓名
          <el-input
            v-model="data.xm"
            placeholder="请输入姓名"
            class="car-name-input"
          ></el-input>
          黑名单类别
          <el-input
            v-model="lb"
            placeholder="请输入黑名单类别"
            class="car-name-input"
          ></el-input>
          证件编号
          <el-input
            v-model="bh"
            placeholder="请输入证件编号"
            class="car-name-input"
          ></el-input>
          入表原因
          <el-input
            v-model="rbyy"
            placeholder="请输入入表原因"
            class="car-name-input"
          ></el-input>
          <el-button
            type="primary"
            round
            @click="chax()"
          >查询</el-button>
          <router-link to="/face/hadd">
            <el-button
              type="info"
              round
              style="margin-left:8px;"
            >增加人员</el-button>
          </router-link>
          <el-button
            type="info"
            round
            style="margin-left:8px;"
            @click="plsc()"
          >批量删除</el-button>
          <el-upload
            class="upload-demo"
            action="http://192.168.1.21:8089/faceInfo/upload/1"
            :data="fudata"
            :before-upload="updata"
          >
            <el-button type="info" round>批量导入黑名单</el-button>
          </el-upload>
          <slot />
        </div>
      </div>
      <div style="width:98%; height:520px;background:rgba(255,255,255,1);box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);border-radius:3px; margin-left:14px; padding:10px;  margin-top:15px;">
        <div style="display:flex;  float:right; margin-right:19px;">
          <img
            src="../../assets/shu/dc.png"
            class="img1"
          >
          <p class="bmd" @click="daochu()">导出黑名单模板</p>
        </div>
        <el-table
          ref="multipleTable"
          :data="arr"
          highlight-current-row
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#edeff8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column
            label="ID"
            prop="id"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="faceName"
            label="姓名"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="120"
          >
            <template slot-scope="scope">
              <span :style="scope.row.sex == 0 ? 'color:black' : 'color:black'">
                {{ scope.row.sex == 0 ? "女" : "男" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="certificateType"
            label="证件类型"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="certificateNum"
            label="证件编号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="blacklistType"
            label="黑名单类别"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cause"
            label="入表原因"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createDate"
            label="入表时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="img"
            label="照片"
            show-overflow-tooltip
          >
            <!-- <img src="../../assets/shu/tx.png"> -->
          </el-table-column>
          <el-table-column
            prop="caozuo"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <button class="btn" @click="schu(scope.$index)">删除</button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="8"
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
// import touxiang from '@/assets/images/touxiang.png'
import { get, post, get2 } from '../../api/bmd.js'
export default {
  name: 'About',
  data() {
    return {
      xm: '',
      lb: '',
      bh: '',
      rbyy: '',
      // 分页
      multipleTable: [],
      arr: [],
      fudata: {
        cpid: this.$store.state.user.companyId
      },
      //    分页
      pagesize: 1,
      pageNumber: 10,
      all: 100 / 10, //      总页数
      cur: 1,
      data: {},
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.chax()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.chax()
    },
    chax() {
      var that = this
      if (that.data.xm || that.lb || that.bh || that.rbyy) {
        var data = {
          cpid: this.$store.state.user.companyId,
          pageNumber: that.cur - 1,
          pageSize: 8,
          faceType: 1
        }
        if (that.data.xm) {
          data.faceName = that.data.xm
        }
        if (that.lb) {
          data.blacklistType = that.lb
        }
        if (that.bh) {
          data.certificateNum = that.bh
        }
        if (that.rbyy) {
          data.cause = that.rbyy
        }
        get2('/faceInfo/selectBlackPage', data).then(res => {
          that.arr = res.content
          that.all = res.totalElements
        })
      } else {
        get2('/faceInfo/selectBlack', {
          cpid: this.$store.state.user.companyId,
          pageNumber: that.cur - 1,
          pageSize: 8
        }).then(res => {
          console.log(res)
          that.arr = res.content
          that.all = res.totalElements
        })
        console.log(that.arr, 1233123)
      }
    },
    schu(i) {
      console.log(i)
      get('/faceInfo/delface', {
        id: this.arr[i].id
      }).then(response => {
        this.chax()
        console.log(response.data)
      })
    },
    plsc() {
      const that = this
      var ids = []
      for (var i = 0; i < that.multipleSelection.length; i++) {
        if (i === 0) {
          ids += that.multipleSelection[i].id
        } else {
          ids += ',' + that.multipleSelection[i].id
        }
      }
      get('/faceInfo/delete', { ids: ids }).then(res => {
        console.log(res)
        this.chax()
      })
    },
    daochu() {
      get('/faceInfo/deriveBlackList?exclePath').then(res => {
        var blob = new Blob([res], { type: 'application/vnd.ms-excel,charset=utf-8' })
        var url = window.URL.createObjectURL(blob)
        var link = document.createElement('a')
        link.download = '黑名单.xlsx'
        link.href = url
        link.click()
        console.log(res, 1111111)
      })
    },
    updata(data) {
      var formData = new FormData()
      formData.append('file', data)
      post('/faceInfo/upload/1', formData).then(res => {
        console.log(res)
        this.chax()
        this.$alert('失败条数为' + res.data[0] + ',成功条数为' + res.data[1] + ',总条数为' + res.data[2], '导入显示', {
        })
      })
      return false
    }
  }
}
</script>
<style   scoped>
.img1 {
  height: 15px;
  width: 15px;
  margin-top: 13px;
  margin-right: 5px;
}
.bmd {
  color: #3f6aff;
  font-family: 微软雅黑;
  font-size: 14px;
  cursor: pointer;
}
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
  font-size: 2vh;
  border-left: 0.3vw solid #3f6aff;
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
  margin: 0 1%;
}

.car-name-input {
  width: 9%;
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
}
.el-button--primary {
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  height: 4vh;
  font-size: 2vh;
  padding-top: 0;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 3.5vh;
  /* line-height: 5vh; */
}
.el-button--info {
  background: #fff;
  border: 1px solid rgba(63, 106, 255, 1);
  color: #3f6aff;
  height: 4vh;
  font-size: 2vh;
  padding-top: 0;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 3.5vh;
}
.upload-demo {
  display: inline-block;
}
.btn{
  background: none;
  border: none;
  color: #3f6aff;
}
</style>

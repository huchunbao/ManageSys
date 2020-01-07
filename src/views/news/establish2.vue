<template>
  <div class="news-container">
    <div class="header">
      播放类型
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span v-if="value==1" class="header_list">
        时间
        <el-time-select
          v-model="value1[0]"
          placeholder="起始时间"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
        >
        </el-time-select>
        <el-time-select
          v-model="value1[1]"
          placeholder="结束时间"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: value1[0]
          }"
        >
        </el-time-select>
      </span>
      <span v-if="value==2" class="header_list">
        次数
        <span class="cishu">
          <el-input v-model="value2" type="number" placeholder="请输入次数"></el-input>
        </span>
      </span>
      <!-- <span class="btn" @click="baocun">保存</span>
      <span class="btn2">取消</span> -->
      <el-button type="primary" round @click="baocun">保存</el-button>
      <el-button type="info" round @click="fan()">返回</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="backcha">
          <el-menu
            :default-active="tab"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @select="fang"
          >
            <el-submenu index="1">
              <template slot="title">
                <span class="titleheader">银科环企</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item, i) in options2" :key="i" :index="i+''">{{ item.name }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="2">
              <template slot="title">
                <span class="titleheader" :class="tab == 2?'jian':'jia'">淘宝</span>
              </template>
              <el-menu-item v-for="(item, i) in options2" :key="i" :index="i+''">测试</el-menu-item>
            </el-submenu> -->
          </el-menu>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="backcha">
          <div>
            <el-table
              v-if="value==1"
              ref="multipleTable"
              :data="arrdata"
              tooltip-effect="dark"
              style="width: 100%;"
              :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
            >
              <el-table-column
                label="节目序号"
                prop="jmxh"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="节目名称"
                prop="jmmc"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="分辨率"
                prop="fbl"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="开始时间"
                prop="kssj"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="终止时间"
                prop="zzsj"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="创建人员"
                prop="cjry"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="备注"
                prop="bz"
                align="center"
              >
              </el-table-column>
            </el-table>

            <el-table
              v-if="value==2"
              ref="multipleTable"
              :data="arrdata"
              tooltip-effect="dark"
              style="width: 100%;"
              :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
            >
              <el-table-column
                label="节目序号"
                prop="jmxh"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="节目名称"
                prop="jmmc"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="分辨率"
                prop="fbl"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="次数"
                prop="cs"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="创建人员"
                prop="cjry"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="备注"
                prop="bz"
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
import { get, post } from '../../api/axios.js'
export default {
  name: 'News',
  props: {
    estdata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      tab: '1',
      arrdata: [
        {
          jmxh: 'CB000001',
          jmmc: '新增插播节目1',
          fbl: '1920*1080',
          kssj: '2019-04-26 10:00:00',
          zzsj: '2019-04-26 10:10:00',
          cs: 3,
          cjry: '朱清',
          bz: ''
        }
      ],
      options: [{
        value: '1',
        label: '按时间播放'
      }, {
        value: '2',
        label: '按次数播放'
      }],
      value: '1',
      value1: [],
      value2: 0,
      options2: []
    }
  },
  watch: {
    tab() {
      console.log(this.tab)
    }
  },
  created() {
    // console.log(this.$route.query.data)
    console.log(this.estdata)
    get('/camara/getEqType2?', { cpid: this.$store.state.user.companyId, system_id: 3 }).then(res => {
      console.log(res)
      this.options2 = res
    })
  },
  methods: {
    fan() {
      this.$parent.establishif = false
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
      console.log(this.tab)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
      // this.tab = 0
    },
    fang(index, inde) {
      this.tab = index
      console.log(this.tab, index)
    },
    baocun() {
      var data = this.estdata
      data.showStartTime = this.date(new Date()) + ' ' + this.value1[0] + ':' + '00'
      data.showEndTime = this.date(new Date()) + ' ' + this.value1[1] + ':' + '00'
      data.equipmentNo = this.options2[this.tab * 1].id
      data.equipmentName = this.options2[this.tab * 1].name
      data.ipAddress = '196.128.1.165'
      this.$router.push({ path: '/news/index' })
      console.log(data)
      post('/RadioProgramme/saveLedProgrammeList', data).then(res => {
        console.log(res.data)
        // that.arrdata = res.data.content
      })
    },
    date(date) {
      const d = new Date(date)
      const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      // const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
      return resDate
    },
    p(s) {
      return s < 10 ? '0' + s : s
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
  height:90%;
  padding: 5%;
}
.el-row{
  height: 100%;
}
.el-col{
  height: 100%;
}
.btn{
  width: 10%;
  display: inline-block;
  padding-top: 0.5%;
  padding-bottom:0.5%;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 0px 11px 0px rgba(63,106,255,0.28);
  border-radius:8px;
  text-align: center;
  font-size: 8px;
  color: #fff;
  margin-left: 1%;
}
.btn2{
  width: 10%;
  display: inline-block;
  padding-top: 0.5%;
  padding-bottom:0.5%;
  background:#fff;
  border:1px solid rgba(63,106,255,1);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  border-radius:8px;
  text-align: center;
  font-size: 8px;
  color: #3F6AFF;
  margin-left: 1%;
}
.header{
  width: 100%;
  padding: 0.5%;
  padding-left: 1%;
  background: #fff;
  margin-bottom: 1%;
  border-left: 0.5vw solid #3F6AFF;
  border-radius:3px 0px 0px 3px;
}
.header_list{
  margin-left: 1%;
}
.cishu{
  display: inline-block;
  width: 10%;
}
.titleheader{
  margin-left: 10px;
}
#app .hideSidebar .el-submenu > .el-submenu__title .el-submenu__icon-arrow{
  display: inline;
}
</style>

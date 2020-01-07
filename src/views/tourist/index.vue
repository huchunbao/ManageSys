<template>
  <div>
    <div v-if="zhe" class="zhe">
      <div class="zhe_body">
        <div class="zhe_body_header">
          同步游客数据
          <span style="float:right;" @click="zhe=false,tong=false">×</span>
        </div>
        <div class="zhe_body_body">
          接口:
          <el-select v-model="value1" placeholder="请选择" style="width:50%;height:1%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" plain @click="tong=true">同步</el-button>
        </div>
        <div class="zhe_body_nei">
          <p v-if="tong">总记录数有62条,同步10条,更新3条,失败2条,</p>
          <p v-if="tong">失败记录有:</p>
          <p v-if="tong">编号&nbsp;0125</p>
          <p v-if="tong">编号&nbsp;0253</p>
        </div>
        <img src="../../assets/btn_queding.png" class="btn1" @click="zhe=false,tong=false">
      </div>
    </div>
    <div class="lan">
      <div class="da">
        <div class=" top">
          数据来源
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.datasource"
              :label="item.datasource"
              :value="item.datasource"
            >
            </el-option>
          </el-select>
          <!-- <span class="btn">查询</span>
          <span class="btn2">同步游客数据</span> -->
          <el-button type="primary" round @click="sou">查询</el-button>
          <!-- <el-button v-if="$store.state.permission.buttons.includes('游客信息管理:同步游客数据')" type="info" round @click="zhe=true">同步游客数据</el-button> -->
        </div>
      </div>
      <div class="bej">
        <el-table
          ref="multipleTable"
          :data="arr"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            label="序号"
            prop="idvo"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="ID"
            prop="id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="会员卡号"
            prop="cardno"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="原编号"
            prop="oldcardno"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="性别"
            prop="sex"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="手机号"
            prop="phone"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="微信号"
            prop="wxnumber"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="identitycard"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="电子邮箱"
            prop="email"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="固定电话"
            prop="telephone"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="联系地址"
            prop="addess"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="生日"
            prop="birthday"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="会员等级"
            prop="memberlevel"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="办卡时间"
            prop="cardtime"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="会员状态"
            prop="memberstatus"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="过期时间"
            prop="expiredate"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="数据来源"
            prop="datasource"
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
          :total="all"
          @current-change="btnClick"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '@/api/axios'
export default {
  name: 'Tourist',
  data() {
    return {
      // 分页
      arrdata: [],
      arr: [
        {
          xh: '1',
          id: '0000001',
          hykh: '0351',
          ybh: '',
          name: '杜河峰',
          sex: '男',
          sjh: '13211332343',
          wxh: '',
          sfzh: '',
          dzyx: '',
          gddh: '',
          lxdz: '',
          sr: '19910103',
          hydj: '年卡',
          bksj: '20180201',
          hyzt: '正常',
          gqsj: '永不过期',
          sjly: '会员系统'
        },
        {
          xh: '2',
          id: '0000002',
          hykh: '0745',
          ybh: '',
          name: '季海德',
          sex: '男',
          sjh: '13245215678',
          wxh: '',
          sfzh: '',
          dzyx: '',
          gddh: '',
          lxdz: '',
          sr: '19930122',
          hydj: '年卡',
          bksj: '20180124',
          hyzt: '正常',
          gqsj: '永不过期',
          sjly: '会员系统'
        },
        {
          xh: '3',
          id: '0000003',
          hykh: '0215',
          ybh: '',
          name: '范海辛',
          sex: '男',
          sjh: '13654581256',
          wxh: '',
          sfzh: '',
          dzyx: '',
          gddh: '',
          lxdz: '',
          sr: '19900615',
          hydj: '年卡',
          bksj: '20170405',
          hyzt: '正常',
          gqsj: '永不过期',
          sjly: '会员系统'
        },
        {
          xh: '4',
          id: '0000004',
          hykh: '0589',
          ybh: '',
          name: '艾希',
          sex: '女',
          sjh: '13545124864',
          wxh: '',
          sfzh: '',
          dzyx: '',
          gddh: '',
          lxdz: '',
          sr: '19960425',
          hydj: '年卡',
          bksj: '20170707',
          hyzt: '正常',
          gqsj: '永不过期',
          sjly: '会员系统'
        }
      ],
      //    分页
      all: 0,
      cur: 1,
      multipleSelection: [],
      options: [{
        value: '1',
        label: '全部'
      }, {
        value: '2',
        label: '会员系统'
      }, {
        value: '3',
        label: '票务系统'
      }, {
        value: '4',
        label: '其他'
      }],
      value: '全部',
      value1: '1',
      tong: false,
      zhe: false
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.sou()
    this.lai()
  },
  methods: {
    lai() {
      get('/touristmessagedemo/selectDataSourceBycpid', { cpid: this.$store.state.user.companyId }).then(res => {
        this.options = res.data
        this.options.push({ datasource: '全部' })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.sou()
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
    sou() {
      var lai = this.value === '全部' ? '' : this.value
      get('/touristmessagedemo/getmessageByDataSources', { cpid: this.$store.state.user.companyId, pageNumber: this.cur - 1, pageSize: 10, datasource: lai }).then(res => {
        this.arr = res.data.content
        this.all = res.data.numberOfElements
        console.log(res)
      })
    }
  }
}
</script>
<style   scoped>
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
  border-left: 0.3vw solid #3F6AFF;
}
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
.bej{
  width:98%;
  height:84%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:14px;
  padding:10px;
  margin-top:15px;
}
.btn{
  display: inline-block;
  padding: 1%;
  padding-top: 0.5%;
  padding-bottom:0.5%;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 0px 11px 0px rgba(63,106,255,0.28);
  border-radius:5vh;
  text-align: center;
  font-size: 8px;
  color: #fff;
  margin-left: 1%;
}
.btn2{
  display: inline-block;
  padding: 1%;
  padding-top: 0.5%;
  padding-bottom:0.5%;
  background:#fff;
  border:1px solid rgba(63,106,255,1);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  border-radius:5vh;
  text-align: center;
  font-size: 8px;
  color: #3F6AFF;
  margin-left: 1%;
}
.zhe{
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  position:fixed;
  left: 0;
  top: 0;
  z-index: 2000;
}
.zhe_body{
  width: 20%;
  height: 40%;
  background: #fff;
  position: relative;
  left: 40%;
  top: 30%;
  border-radius: 10px;
  padding-top: 1%;
}
.zhe_body_header{
  margin-left: 5%;
  margin-bottom: 8%;
  width: 92%;
}
.zhe_body_body{
  width: 80%;
  margin: auto;
}
.zhe_body_nei{
  width: 80%;
  height: 50%;
  margin: auto;
  background: #F3F7FF;
  padding: 5%;
  border-radius: 5px;
  margin-top: 5%;
}
.zhe_body_nei p{
  font-size:7px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(133,137,158,1);
  line-height:15px;
}
.btn1{
  width: 25%;
  margin-top: 1%;
  margin-left: 37.5%;
}
</style>

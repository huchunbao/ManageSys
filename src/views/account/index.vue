<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class="top">
          姓名
          <el-input
            v-model="name"
            placeholder="请输入姓名"
            class="car-name-input"
          ></el-input>手机号
          <el-input
            v-model="tele"
            placeholder="请输入手机号"
            class="car-name-input"
          ></el-input>
          组织
          <el-select
            v-model="value5"
            multiple
            placeholder="全部"
            style="width:100px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            class="btn-search"
            type="primary"
            round
          >查询</el-button>
          <router-link to="/account/zjzh">
            <el-button
              class="btn-info"
              type="info"
              round
            >增加账号</el-button>
          </router-link>
          <el-button
            class="btn-info"
            type="info"
            round
            style="margin-left:8px;"
          >删除账号</el-button>
          <el-button
            class="btn-info"
            type="info"
            round
          >重置密码</el-button>
          <slot />
        </div>
      </div>
      <div style="width:98%;height:470px;background:rgba(255,255,255,1);box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);border-radius:3px; margin-left:14px;  margin-top:15px;">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#edeff8',color:'#909399'}"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            prop="xm"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gwqx"
            label="岗位"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="bm"
            label="部门"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="com"
            label="公司"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="sjh"
            label="手机号"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="zh"
            label="账号ID"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="tx"
            label="头像"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="qx"
            label="角色权限"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="cz"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="zhfa(scope.row.name)"
              >修改角色权限</el-button>
              <el-button
                type="text"
                size="small"
                @click="xgfa(scope.row.name)"
              >修改账号信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div
      v-if="zh"
      class="tank"
    >
      <div id="zzc">
        <div class="aa_a">
          <p class="cz">修改角色权限</p>
          <p class="qx">角色权限</p>
          <div class="beija">
            <div class="yuan">
              <el-checkbox label="管理员1"></el-checkbox><br>
              <el-checkbox label="操作员1"></el-checkbox><br>
              <el-checkbox label="IT运维"></el-checkbox>
            </div>
          </div>
          <input
            type="button"
            class="qxb"
            value="取消"
            @click="clickok"
          >
          <input
            type="button"
            class="qdb"
            value="确定"
            @click="clickok"
          >
        </div>
      </div>
    </div>
    <div
      v-if="xg"
      class="tanka"
    >
      <div id="zzca">
        <div class="aa_aa">
          <div style="display:flex;">
            <p class="cz">修改账号信息</p>
            <p
              class="close"
              @click="clickok"
            >x</p>
          </div>
          <div class="xm">
            <p class="mz"> 姓名</p>
            <input
              type="text"
              value="请输入姓名"
              class="ipt"
            >
          </div>
          <div class="company">
            <p class="gs">所属公司</p>
            <select
              id
              v-model="type"
              name
              style=" width:56.5%;height:27px;font-size:8.2px;border-radius:2px; font-size:13px; margin-left:11px; margin-top:7px;"
            >全部
              <option value="11">三郎国际</option>
              <option value="12">希尔顿酒店</option>
            </select>
          </div>
          <div class="bumen">
            <p class="bm">部门</p>
            <select
              id
              v-model="type"
              name
              style=" width:60.5%;height:27px;font-size:8.2px;border-radius:2px; font-size:13px; margin-left:16px; margin-top:7px;"
            >全部
              <option value="11">信息中心</option>
              <option value="11">后勤部</option>
              <option value="11">客服部</option>
              <option value="11">后勤部</option>
            </select>
          </div>
          <div class="gw">
            <p class="mz"> 岗位</p>
            <input
              type="text"
              value="请输入岗位"
              class="ipt"
            >
          </div>
          <input
            type="button"
            class="qxb"
            value="取消"
            @click="clickok"
          >
          <input
            type="button"
            class="qdb"
            value="确定"
            @click="clickok"
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      tele: '',
      checked: true,
      tableData: [
        {
          xm: '赵峰',
          gwqx: '',
          bm: '信息中心',
          com: '三郎国际',
          sjh: '18812345677',
          zh: '46215648',
          tx: '',
          qx: '管理员1 操作员1'
        },
        {
          xm: '张三',
          gwqx: '经理',
          bm: '后勤部',
          com: '希尔顿酒店',
          sjh: '13001018911',
          zh: '89492109',
          tx: '',
          qx: '管理员1 操作员1'
        },
        {
          xm: '李四',
          gwqx: '',
          bm: '信息中心',
          com: '三郎国际',
          sjh: '15602021398',
          zh: '03032821',
          tx: '',
          qx: '操作员1'
        },
        {
          xm: '王五',
          gwqx: '经理',
          bm: '客服部',
          com: '希尔顿酒店',
          sjh: '15294423476',
          zh: '48482109',
          tx: '',
          qx: '管理员1'
        },
        {
          xm: '赵六',
          gwqx: '经理',
          bm: '后勤部',
          com: '希尔顿酒店',
          sjh: '18078543210',
          zh: '77452310',
          tx: '',
          qx: '管理员1'
        },
        {
          xm: '丽莎',
          gwqx: '',
          bm: '后勤部',
          com: '三郎国际',
          sjh: '1339032921',
          zh: '29293139',
          tx: '',
          qx: '管理员1 操作员1'
        },
        {
          xm: '崔四',
          gwqx: '经理',
          bm: '信息中心',
          com: '三郎国际',
          sjh: '15810297821',
          zh: '45912046',
          tx: '',
          qx: '操作员1'
        },
        {
          xm: '赵铭',
          gwqx: '',
          bm: '后勤部',
          com: '三郎国际',
          sjh: '1339032921',
          zh: '29293139',
          tx: '',
          qx: '管理员1 操作员1'
        },
        {
          xm: 'Wendy',
          gwqx: '经理',
          bm: '后勤部',
          com: '希尔顿酒店',
          sjh: '15802021095',
          zh: '30932002',
          tx: '',
          qx: '操作员1'
        }
      ],
      zhdata: {},
      zh: false,
      xgdata: {},
      xg: false,
      value4: '',
      options: [
        {
          value: '选项1',
          label: '全部'
        }
      ],
      value5: [],
      value11: []
    }
  },
  methods: {
    clickok() {
      this.zh = false
      this.zhdata = []
      this.xg = false
    },
    zhfa(i) {
      console.log(i)
      this.zh = true
      this.zhdata = this.arr[i]
    },
    xgfa(i) {
      console.log(i)
      this.xg = true
      this.xgdata = this.arr[i]
    }
  }
}
</script>
<style  scoped>
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  overflow: hidden;
}
.da {
  display: flex;
}
.top {
  width: 98%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  padding: 10px;
  margin: 10px 0px 5px 1%;
}
.car-search div {
  display: inline-block;
}
.btn-excel,
.btn-search,
.car-name-input,
.car-dropdown,
.date-picker {
  margin: 0 12px;
}
.car-name-input {
  width: 130px;
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
#zzc {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}
#zzca {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}
.aa_a {
  width: 360px;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 200px;
  left: 530px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
}
.aa_aa {
  width: 360px;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 200px;
  left: 530px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
}
.camera {
  font-size: 12px;
  color: rgba(63, 106, 255, 1);
  font-family: PingFang SC;
  padding-left: 44px;
}
.cz {
  font-size: 15px;
  font-weight: 550;
  padding-left: 15px;
  padding-top: 15px;
}
.time {
  font-size: 12px;
  font-family: PingFang SC;
  padding-left: 44px;
}

.beij {
  width: 270px;
  height: 90px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 44px;
}
.beija {
  width: 270px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 44px;
}
.wenzi {
  font-size: 12px;
  font-family: PingFang SC;
  padding-left: 13px;
  padding-top: 10px;
}
.qxb {
  width: 50px;
  height: 20px;
  font-size: 10px;
  border: 1px solid rgba(63, 106, 255, 1);
  border-radius: 8px;
  background: white;
  color: rgba(63, 106, 255, 1);
  margin-top: 30px;
  margin-left: 90px;
  outline: none;
}
.qdb {
  width: 50px;
  height: 20px;
  font-size: 10px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 75px;
  outline: none;
}
.close {
  margin-top: 27px;
  margin-left: 210px;
}

.qx {
  font-size: 13px;
  padding-left: 50px;
  padding-top: 5px;
}
.admin {
  color: rgba(0, 0, 0, 0.5);
}
.yuan {
  padding: 15px 25px;
}
.xm {
  display: flex;
  margin-left: 50px;
}
input {
  width: 60%;
  height: 27px;
  font-size: 13px;
  padding-left: 10px;
}
.ipt {
  margin-top: 10px;
  margin-left: 10px;
}
.mz {
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(29, 33, 51, 1);
  padding-left: 10px;
  font-size: 15px;
}
.company {
  display: flex;
  margin-left: 29px;
  margin-top: -10px;
}
.gs {
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(29, 33, 51, 1);
  font-size: 15px;
}
.bumen {
  display: flex;
  margin-left: 53px;
  margin-top: -10px;
}

.gw {
  display: flex;
  margin-left: 53px;
  margin-top: -14px;
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
  margin-top:5px;
  }
  .btn-info{
    position: relative;
    top: 0px;
    }
    </style>

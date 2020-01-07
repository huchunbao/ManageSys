<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <div class="daohang" @click="dhf">
        <div class="sanjiao"></div>
        导航
      </div>
      <div class="header_text">系统设置</div>
      <!-- 导航栏 -->
      <div class="dhdiv" :class="dh ? 'dh1' : 'dh2'">
        <div class="sanjiao2"></div>
        <div class="lis">可视化大数据中心</div>
        <div class="lis">应急指挥调度中心</div>
        <div class="lis">后台管理系统中心</div>
      </div>
    </div>

    <div style="margin-top:10px;  margin-left:13px;">
      <router-link to="/xitong"><button>个人信息</button></router-link>
      <router-link to="/jiagou"><button>组织架构</button></router-link>
      <button>权限管理</button>
      <button>账号管理</button>
      <button>数据采集</button>
    </div>

    <!-- 上传头像 -->
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      style="margin-left:550px; width:300px; height:300px;"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="dak">
      <el-table
        :data="tableData"
        border
        style="width: 100%; background:#4255a1;"
      >
        <el-table-column prop="date" label="姓名" width="199" height="150">
        </el-table-column>
        <el-table-column prop="name" label="张某" width="199">
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-left:500px; margin-top:20px;">
      <button class="per">修改手机号</button>
      <button class="gou">修改密码</button>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'About',
  components: {
    // Ditu,
    // cctv
  },
  data() {
    return {
      dh: false,
      dialogImageUrl: '',
      dialogVisible: false,
      tableData: [
        {
          date: '岗位',
          name: '经理'
        },
        {
          date: '部门',
          name: '管理部门'
        },
        {
          date: '公司',
          name: '某某公司'
        },
        {
          date: '账号ID',
          name: '199393933'
        },
        {
          date: '手机号(登录账号)',
          name: '13897558993'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    dhf() {
      this.dh = !this.dh
    },
    tiao(i) {
      this.$router.push({
        path: i
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.about {
  width: 100vw;
  height: 100vh;
  background: #122f7e;
}
/* 地图 */

/* 监视 */

/* 头部标签 */
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  background-image: url("../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
}
.header_text {
  width: 30%;
  text-align: center;
  color: #fff;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 10px;
  float: left;
  position: absolute;
  left: 50%;
  top: 0%;
  margin-left: -15%;
}
/* 导航 */
.daohang {
  width: 80px;
  height: 40%;
  background: #fff;
  margin-top: 2px;
  border-radius: 8px;
  margin-left: 10px;
  opacity: 0.4;
  color: #27c4f8;
  font-weight: 800;
  letter-spacing: 5px;
  padding-left: 10px;
}
.sanjiao {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid #6edcf8;
  border-bottom: 10px solid transparent;
  float: right;
  margin-right: 15px;
  margin-top: 5px;
}
.dhdiv {
  width: 250px;
  background: #161e58;
  z-index: 999999;
  position: fixed;
  left: 1%;
  top: 8%;
  border-radius: 10px;
  border: 1px solid #6edcf8;
  display: none;
}
.dh1 {
  display: block;
}
.dh2 {
  display: none;
}
.dhdiv .lis {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 3px;
  font-size: 20px;
  color: #fff;
}
.sanjiao2 {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid #6edcf8;
  position: fixed;
  left: 2%;
  top: 5.3%;
}

button {
  border-radius: 10px;
  background: #1f3a89;
  width: 80px;
  height: 25px;
  outline: none;
  border: 1px solid #fff;
  margin: 5px;
  color: #6fdafc;
}
.backa {
  width: 1360px;
  height: 510px;
  border: 1px solid #0d6ca6;
  margin-left: 17px;
  margin-top: 10px;
}

button:hover {
  background: #fff;
  color: black;
}
.dak {
  width: 400px;
  height: 243px;
  background: #4254a0;
  margin: 0 auto;
  margin-top: -100px;
}
el-table-column {
  background: #4254a0;
  width: 129px;
}
.per,
.gou {
  border-radius: 5px;
  background: #4367a5;
  width: 120px;
  height: 25px;
  outline: none;
  border: 1px solid #4367a5;
}
.per {
  position: absolute;
  left: 460px;
}
.gou {
  position: absolute;
  left: 660px;
}
</style>

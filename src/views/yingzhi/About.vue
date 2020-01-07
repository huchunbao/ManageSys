<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">应急指挥调度中心</div>
    </div>
    <!-- 地图 -->
    <div class="ditu">
      <Ditu @fatherMethod="yu"></Ditu>
    </div>
    <div class="cctv">
      <object
        id="preview"
        ref="preview"
        classid="clsid:BE020CC9-521F-4641-85E1-3B631B7ADDD9"
        name="preview"
        width="100%"
        height="100%"
      >
        <param name="Ip" value="10.33.27.144">
        <param name="UserName" value="admin">
        <param name="PrivilegeCode" value="0401,0402,">
      </object>
    </div>
  </div>
</template>

<script>
import Ditu from './yingji/Home.vue'
// import echarts from 'echarts'
import daoy from './daoyou.vue'
export default {
  name: 'About',
  components: {
    Ditu,
    daoy
  },
  data() {
    return {
      dh: false
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.login()
  },
  methods: {
    dhf() {
      this.dh = !this.dh
    },
    // 摄像头登录
    login() {
      console.log(this.$refs.preview, 1233213212)
      // Demo默认使用密码登录方式
      var IP = '192.168.1.103'
      var port = '80'
      var UserName = 'admin'
      var Password = 'Hik12345'
      var v1 =
        '<?xml version="1.0" encoding="utf-8"?><LoginInfo><LoginType>2</LoginType><SynLogin>1</SynLogin><IP>' +
        IP +
        '</IP><Port>' +
        port +
        '</Port><UserName>' +
        UserName +
        '</UserName><Password>' +
        Password +
        '</Password></LoginInfo>'
      // alert(v1);
      console.log(v1)
      var v = this.$refs.preview.LoginPlat(v1)
      if (v !== 0) alert(v)
    },
    // 摄像头预览
    yu(data) {
      console.log(data, 1233211)
      var Code = data
      var _param =
        '<?xml version="1.0" encoding="UTF-8"?><Preview><CamIndexCode>' +
        Code +
        '</CamIndexCode></Preview>'
      this.$refs.preview.StartPreview(_param)
    },
    tiao(data) {
      this.$router.push({ path: '/' + data })
    }
  }
}
</script>

<style scoped>
.about {
  width: 100vw;
  height: 100vh;
  background: #0c0126;
}
/* 地图 */
.ditu {
  width: 47%;
  height: 85%;
  float: left;
  margin-left: 1.5%;
  border: 3px solid #6edcfa;
  box-shadow: 0 0 10px #ffffff;
}
/* 监视 */
.cctv {
  float: right;
  width: 47%;
  height: 85%;
  margin-right: 1.5%;
  border: 3px solid #6edcfa;
  box-shadow: 0 0 10px #ffffff;
}
/* 头部标签 */
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  background-image: url("../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
  z-index: 10000000000;
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
</style>

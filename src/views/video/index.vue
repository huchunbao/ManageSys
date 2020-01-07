<template>
  <div class="about">
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
    <div class="ziyuan">
      <div v-for="(item, i) in data" :key="i" class="shu">
        <div class="shu1" @click="tab = i"><span :class="tab==i?'red':'blue'">{{ tab==i?'－':'＋' }}</span>{{ item.orgname }}</div>
        <div
          v-for="(item2, y) in data[i].hikSurveillancePoint"
          :key="y"
          class="shu2"
          :class="tab == i ? 'zhong' : ''"
          :style="tab2==item2.indexcode?'color: red;':''"
          @click="yu(item2.indexcode)"
        >
          {{ item2.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '../../api/axios.js'
export default {
  name: 'About',
  components: {},
  data() {
    return {
      dh: false,
      data: [],
      tab: 0,
      tab2: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.log()
    this.login()
    get('/camara/selectPoint?nodeIndexCode=001007', {
    }).then(response => {
      console.log(response, 123)
      this.data = response.data
    })
  },
  methods: {
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
      // else
      // this.yu()
    },
    log() {
      console.log(123)
      // var qs = require('querystring')
      // let data = { username: "admin", password: "111111" };
      // this.$axios({
      //   url: "http://192.168.1.121:8081/user/login",
      //   method: "post",
      //   data: qs.stringify(data),
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // }).then(response => {
      //   console.log(response, 123);
      //   this.qing();
      // });
    },
    // 摄像头预览
    yu(data) {
      console.log(data)
      this.tab2 = data
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
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
/* 监控 */
.cctv {
  float: right;
  width: 80%;
  height: 100%;
  margin-right: 0.5%;
}
.ziyuan{
  float: left;
}
.shu {
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(29,33,51,1);
  cursor: pointer;
  margin-bottom: 1px;
  width: 100%;
}
.shu1 {
  padding-left: 1vw;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(29,33,51,1);
  font-size: 2vh;
  width: 100%;
}
.shu1 span{
  font-size: 2vh;
  line-height: 2vh;
}
.shu1 .red{
  color: red;
}
.shu1 .blue{
  color: blue;
}
.right{
  float: right;
}
.shu2 {
  padding-left: 3vw;
  font-size: 1.5vh;
  display: none;
  border-top: 1px solid #fff;
  width: 100%;
}
.zhong {
  display: block;
}
</style>

<template>
  <div>
    <div id="mudio">
      <img src="../../assets/yingzhi/icon.png" alt="" class="img">
      <img src="../../assets/yingzhi/wenzi.png" alt="" class="img1">
      <img src="../../assets/yingzhi/title.png" alt="" class="img2">
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="diodiv">
        <div class="lis li2">
          <img src="../../assets/yingzhi/user.png" alt="" class="user">
          <input
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名"
            style="outline:none;"
          >
        </div>
        <div class="lis li2">
          <img src="../../assets/yingzhi/pass.png" alt="" class="user">
          <input v-model="loginForm.password" type="password" placeholder="请输入密码">
        </div>
        <div class="lis li4" :loading="loading" @click="handleLogin">登录</div>
        <!-- @click="login()" -->
        <div class="lis li3">
          <div class="li3right">修改密码</div>
          <div class="li3left">|</div>
          <div class="li3left">记住用户名</div>
          <img src="../../assets/yingzhi/dui.png" alt="" class="dui">
        </div>
      </div>
    </el-form>
  </div>
</template>

<script scoped>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Mudio',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loading: false,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    login() {
      // var qs = require('querystring')
      // var data = { username: this.username, password: this.password }
      // this.$axios({
      //   url: 'http://192.168.1.17:8081/user/login',
      //   method: 'post',
      //   data: qs.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   console.log(response, 123)
      this.$router.push({ path: '/daping' })
      // })
    },
    handleLogin() {
      console.log(1)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              if (this.redirect === '/') {
                this.redirect = '/daping'
              }
              this.$router.push({ path: this.redirect || '/daping', query: this.otherQuery })
              if (this.redirect !== '/daping') {
                this.$store.dispatch('app/setTopMenuIndex', '3')
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('登录失败！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
#mudio {
  width: 70vw;
  height: 100vh;
  background: url("../../assets/yingzhi/picture.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.diodiv {
  width: 30%;
  height: 40%;
  position: fixed;
  left: 70%;
  top: 40%;
}
.lis {
  width: 70%;
  height: 15%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 1vh;
  overflow: hidden;
}
.li1 {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 5px;
}
.li2 {
  /* border: 2px solid #119add; */
  border-radius: 10px;
  background: #f6f6f8;
  margin-bottom: 3vh;
}
.li2 input {
  width: 85%;
  height: 98%;
  margin: 0;
  padding: 0;
  float: right;
  background: #f6f6f8;
  border: 0;
  outline: none;
  border-radius: 10px;
  font-size: 13px;
  font-family: 宋体;
}
.li2 input:hover {
  height: 98%;
  border-radius: 10px;
}
.li3left {
  float: right;
  font-size: 13px;
  position: relative;
  margin-right: 10px;
}
.li3right {
  float: right;
  color: #6489f1;
  font-size: 13px;
  margin-right: 5px;
}
.dui {
  height: 16px;
  float: right;
  position: relative;
  top: 2px;
  margin-right: 2px;
}
.li4 {
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  letter-spacing: 5px;
  cursor: pointer;
  background: #4ca5ff;
}
/* input {
  outline-color: blue;
  outline: none;
  border: none;
} */
input:focus {
  outline: none;
}
.img {
  height: 170px;
  position: absolute;
  top: 109px;
  left: 210px;
}
.img1 {
  width: 280px;
  position: absolute;
  top: 367px;
  left: 357px;
}
.img2 {
  float: right;
  width: 20vw;
  position: absolute;
  top: 25vh;
  right: 5vw;
}
.user {
  float: left;
  position: relative;
  top: 25%;
  height: 50%;
  left: 5%;
}
</style>

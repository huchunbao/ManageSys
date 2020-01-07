<template>
  <div class="login-container" :style="loginBG">
    <Logo />
    <img :src="loginText" class="login-text">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <h5 class="username-login">账号登录</h5>
      <el-form-item :class="{'input-focus': userinput}" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          clearable
          @focus="focusinput(1)"
          @blur="blurinput(1)"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item :class="{'input-focus': passinput}" prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @focus="focusinput(2)"
            @blur="blurinput(2)"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin" @keyup.enter.native="handleLogin">登录</el-button>
      <div class="password-option">
        <router-link to="/retrieve">
          找回密码
        </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import LoginBG from '@/assets/images/login-background.jpg'
import LoginText from '@/assets/images/login-text.png'
import { validUsername } from '@/utils/validate'
import Logo from './components/Logo'

export default {
  name: 'Login',
  components: { Logo },
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
      loginBG: {
        backgroundImage: 'url(' + LoginBG + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto'
      },
      loginText: LoginText,
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      userinput: false,
      passinput: false,
      checked: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    this.keyupEnter()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    keyupEnter() {
      document.onkeydown = e => {
        const body = document.getElementsByTagName('body')[0]
        if (e.keyCode === 13 && e.target.baseURI.match(/ManageSys/) && e.target === body) {
          this.handleLogin()
        }
      }
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    focusinput(type) {
      if (type === 1) {
        this.userinput = true
      } else {
        this.passinput = true
      }
    },
    blurinput(type) {
      if (type === 1) {
        this.userinput = false
      } else {
        this.capsTooltip = false
        this.passinput = false
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              if (this.redirect === '/') {
                this.redirect = '/home'
              }
              this.$router.push({ path: this.redirect || '/home', query: this.otherQuery })
              if (this.redirect !== '/home') {
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
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#131432;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 37px;
    width: 85%;
    font-size: 12px !important;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0 5px 0 15px;
      color: $light_gray;
      height: 35px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #F6F6F8 inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    background: rgba(246, 246, 248, 1);
    border-radius: 5px;
    color: #000;
    height: 37px;
    border: 1px solid rgb(246, 246, 248);
  }

  .input-focus{
    border: 1px solid #638AF1;
  }

  .password-option{
    text-align: right;
    font-size: 12px;

    a{
      color: #638AF1 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#121430;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  min-width: 1024px;
  background-color: $bg;
  overflow: hidden;

  .login-text {
    position: absolute;
    top: 35%;
    left: 15%;
    width: 383px;
    height: 286px;
  }

  .login-form {
    position: absolute;
    width: 320px;
    height: 265px;
    right: 10%;
    top: 0;
    bottom: 0;
    margin: auto 0;
    padding: 0 25px;
    background-color: #fff;
    border-radius: 5px;
    color: #000;
    overflow: hidden;
  }

  .tips {
    font-size: 12px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0 5px 0 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 18px;
    top: 0;
    font-size: 12px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

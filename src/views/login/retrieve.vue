<template>
  <div class="retrieve-container">
    <div class="logo-wapper">
      <Logo />
    </div>
    <el-form ref="retrieveForm" :model="retrieveForm" :rules="retrieveRules" class="retrieve-form" autocomplete="on" label-position="left">
      <span>找回密码</span>
      <el-steps class="steps" :active="active" finish-status="success" align-center>
        <el-step title="填写账号名" />
        <el-step title="验证身份" />
        <el-step title="设置新密码" />
        <el-step title="完成" />
      </el-steps>
      <div class="username">
        <el-form-item v-if="active==0" :class="{'input-focus': userInput}" prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="retrieveForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            clearable
            @focus="focusinput(1)"
            @blur="blurinput(1)"
          />
        </el-form-item>

        <el-form-item v-if="active==0" class="code" :class="['input-yzm', {'input-focus': codeInput}]" prop="code">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="code"
            v-model="retrieveForm.code"
            placeholder="请输验证码"
            name="code"
            type="text"
            maxlength="4"
            tabindex="2"
            autocomplete="on"
            clearable
            @focus="focusinput(2)"
            @blur="blurinput(2)"
          />
        </el-form-item>

        <div v-if="active==0" class="s-identify" @click="refreshCode">
          <s-identify :identify-code="identifyCode" :content-width="contentHeight" />
        </div>

        <el-form-item v-if="active==1" :class="{'input-focus': mobileInput}" prop="mobile">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="mobile"
            v-model.number="retrieveForm.mobile"
            placeholder="请输入手机号"
            name="mobile"
            type="text"
            maxlength="11"
            tabindex="3"
            autocomplete="on"
            clearable
            @focus="focusinput(3)"
            @blur="blurinput(3)"
          />
        </el-form-item>

        <el-form-item v-if="active==1" class="code" :class="['input-yzm', {'input-focus': mobileCodeInput}]" prop="mobilecode">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="mobilecode"
            v-model="retrieveForm.mobilecode"
            placeholder="请输短信验证码"
            name="mobilecode"
            type="text"
            maxlength="6"
            tabindex="4"
            autocomplete="on"
            clearable
            @focus="focusinput(4)"
            @blur="blurinput(4)"
          />
        </el-form-item>

        <div v-if="active==1" class="mobile-code" @click="getMobileCode">{{ mobileText }}</div>

        <el-form-item v-if="active==2" :class="{'input-focus': pass1Input}" prop="password1">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="password1"
            v-model="retrieveForm.password1"
            placeholder="请输入新密码"
            name="password1"
            type="password"
            tabindex="5"
            autocomplete="on"
            clearable
            @focus="focusinput(5)"
            @blur="blurinput(5)"
          />
        </el-form-item>

        <el-form-item v-if="active==2" :class="{'input-focus': pass2Input}" prop="password2">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="password2"
            v-model="retrieveForm.password2"
            placeholder="请再次输入新密码"
            name="password2"
            type="password"
            tabindex="6"
            autocomplete="on"
            clearable
            @focus="focusinput(6)"
            @blur="blurinput(6)"
          />
        </el-form-item>

        <el-button v-if="active<=2" type="primary" class="login-btn" @click.native.prevent="handleNext">下一步</el-button>

        <div v-if="active==3" class="jump">
          <span class="jump-svg">
            <svg-icon icon-class="success" />
          </span>
          <span style="display:block; height:25px;">完成修改，{{ leaveTime }}s后将自动跳转到登录页</span>
          <router-link class="jump-a" to="/login">
            未跳转？请点击此处跳转
          </router-link>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Logo from './components/Logo'
import { validUsername, validMobile } from '@/utils/validate'
import SIdentify from '@/components/SIdentify'
import { checkUsername, checkMobile, checkMobileCode, updatePW } from '@/api/user'

export default {
  name: 'Retrieve',
  components: { Logo, SIdentify },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        callback(new Error('验证码不正确!'))
      } else {
        callback()
      }
    }
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!validMobile(value)) {
        callback(new Error('手机号输入不正确!'))
      } else {
        callback()
      }
    }
    const validateMobileCode = (rule, value, callback) => {
      console.log(value)
      console.log(this.mobileCode)
      if (value === '') {
        callback(new Error('请输入短信验证码'))
      } else if (value !== this.mobileCode && this.mobileCode !== '') {
        callback(new Error('短信验证码不正确!'))
      } else {
        callback()
      }
    }
    const validatePassword1 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.retrieveForm.password1) {
        callback(new Error('两次密码输入不一致!'))
      } else {
        callback()
      }
    }
    return {
      retrieveForm: {
        username: '',
        code: '',
        mobile: '',
        mobilecode: '',
        password1: '',
        password2: ''
      },
      retrieveRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        mobilecode: [{ required: true, trigger: 'blur', validator: validateMobileCode }],
        password1: [{ required: true, trigger: 'blur', validator: validatePassword1 }],
        password2: [{ required: true, trigger: 'blur', validator: validatePassword2 }]
      },
      active: 0,
      userInput: false,
      codeInput: false,
      mobileInput: false,
      mobileCodeInput: false,
      pass1Input: false,
      pass2Input: false,
      contentHeight: 100,
      identifyCodes: '1234567890',
      identifyCode: '',
      mobileText: '获取短信',
      mobileCode: '',
      sendStatus: false,
      leaveTime: 5
    }
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    focusinput(type) {
      switch (type) {
        case 1:
          this.userInput = true
          break
        case 2:
          this.codeInput = true
          break
        case 3:
          this.mobileInput = true
          break
        case 4:
          this.mobileCodeInput = true
          break
        case 5:
          this.pass1Input = true
          break
        case 6:
          this.pass2Input = true
          break
        default:
          break
      }
    },
    blurinput(type) {
      switch (type) {
        case 1:
          this.userInput = false
          break
        case 2:
          this.codeInput = false
          break
        case 3:
          this.mobileInput = false
          break
        case 4:
          this.mobileCodeInput = false
          break
        case 5:
          this.pass1Input = false
          break
        case 6:
          this.pass2Input = false
          break
        default:
          break
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },
    getMobileCode() { // 获取短信验证码
      this.$refs.retrieveForm.validateField('mobile', (error) => {
        if (!error && !this.sendStatus) {
          return new Promise((resolve, reject) => {
            checkMobile({ phone: this.retrieveForm.mobile, username: this.retrieveForm.username, num: '' }).then(response => {
              if (response.msg === 'SUCCESS') {
                this.$message({
                  message: '短信获取成功',
                  type: 'success',
                  duration: 3000
                })
                this.mobileCode = this.retrieveForm.mobilecode = response.data.validateNum
                var sendtime = 90
                this.mobileText = sendtime + 's'
                this.sendStatus = true
                var timer = setInterval(() => {
                  if (sendtime <= 0) {
                    this.mobileText = '获取短信'
                    this.sendStatus = false
                    clearInterval(timer)
                  } else {
                    sendtime--
                    this.mobileText = sendtime + 's'
                  }
                }, 1000)
              } else {
                this.$message({
                  message: response.msg,
                  type: 'warning',
                  duration: 3000
                })
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).then(res => {})
        }
      })
    },
    handleNext() {
      if (this.active === 0) {
        this.$refs.retrieveForm.validateField('username', (error) => {
          if (!error) {
            this.$refs.retrieveForm.validateField('code', (codeError) => {
              if (!codeError) {
                return new Promise((resolve, reject) => {
                  checkUsername({ phone: this.retrieveForm.username, username: '' }).then(response => {
                    if (response.msg === 'SUCCESS') {
                      this.active = 1
                    } else {
                      this.$message({
                        message: response.msg,
                        type: 'warning',
                        duration: 3000
                      })
                    }
                    resolve()
                  }).catch(error => {
                    reject(error)
                  })
                }).then(res => {})
              }
            })
          }
        })
      } else if (this.active === 1) {
        this.$refs.retrieveForm.validateField('mobile', (error) => {
          if (!error) {
            this.$refs.retrieveForm.validateField('mobilecode', (codeError) => {
              if (!codeError) {
                return new Promise((resolve, reject) => {
                  checkMobileCode({ phone: this.retrieveForm.mobile, username: '', num: this.retrieveForm.mobilecode }).then(response => {
                    if (response.msg === 'SUCCESS') {
                      this.active = 2
                    } else {
                      this.$message({
                        message: response.msg,
                        type: 'warning',
                        duration: 3000
                      })
                    }
                    resolve()
                  }).catch(error => {
                    reject(error)
                  })
                }).then(res => {})
              }
            })
          }
        })
      } else if (this.active === 2) {
        this.$refs.retrieveForm.validateField('password1', (error) => {
          if (!error) {
            this.$refs.retrieveForm.validateField('password2', (codeError) => {
              if (!codeError) {
                return new Promise((resolve, reject) => {
                  updatePW({ newpassword: this.retrieveForm.password1, username: this.retrieveForm.username }).then(response => {
                    if (response.msg === 'SUCCESS') {
                      this.active = 3
                      var leaveTimer = setInterval(() => {
                        if (this.leaveTime <= 0) {
                          clearInterval(leaveTimer)
                          this.leaveTime = 5
                          this.$router.push({ path: '/login' })
                        } else {
                          this.leaveTime--
                        }
                      }, 1000)
                    } else {
                      this.$message({
                        message: response.msg,
                        type: 'warning',
                        duration: 3000
                      })
                    }
                    resolve()
                  }).catch(error => {
                    reject(error)
                  })
                }).then(res => {})
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.retrieve-container{
  width: 100%;
  height: 100%;
  background-color: #f0f2ff;

  .logo-wapper{
    width: 100%;
    height: 50px;
    background-color: #121430;
  }

  .retrieve-form{
    width: 98%;
    margin-left: 1%;
    margin-top: 12px;
    height: 500px;
    text-align: center;
    padding: 35px;
    background-color: #fff;

    .steps {
      margin-top: 50px;
      margin-left: 25%;
      width: 50%;

      .el-step__title{
        font-size: 12px !important;
      }

      .is-wait{
        .is-text{
          background-color: #C8CCD6;
          border-color: #C8CCD6;
        }
      }

      .is-process{

        .el-step__line{
          left: 0;
          background-color: #3F6AFF;

          .el-step__line-inner{
            display: none;
          }
        }

        .is-text{
          background-color: #3F6AFF;
          border-color: #3F6AFF;
        }

        .is-text:after{
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          border: 4px solid rgba(63,106,255,.2);
          border-radius: 50%;
        }
      }

      .is-success{
        .el-step__line{
          background-color: #3F6AFF;

          .el-step__line-inner{
            display: none;
          }
        }

        .is-text{
          background-color: #3F6AFF;
          border-color: #3F6AFF;
        }
      }

      .el-step__main .is-success,
      .el-step__main .is-process{
        color: #3F6AFF;
      }

      .el-step__line{
        left: 0;
        right: 0;
      }

      .el-step__icon-inner{
        color: #fff;
      }

      .el-step:last-of-type .el-step__line{
        display: block;
      }
    }

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
        color: #000;
        height: 35px;
        caret-color: #000;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #F6F6F8 inset !important;
          -webkit-text-fill-color: #000 !important;
        }
      }
    }

    .el-form-item {
      background: rgba(246, 246, 248, 1);
      border-radius: 5px;
      border: 1px solid rgb(246, 246, 248);
      box-sizing: border-box;
    }

    .input-focus{
      border: 1px solid #638AF1;
    }

    .username{
      margin: 50px auto 0;
      width: 260px;

      .code{
        width: 140px;
        padding-left: 8px;
        float: left;
      }

      .s-identify{
        float: right;
      }

      .mobile-code{
        cursor: pointer;
        float: right;
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin-top: 3px;
        color: #638AF1;
        font-size: 12px;
        border: 1px solid #638AF1;
        border-radius: 5px;
      }

      .jump{
        font-size: 14px;

        & .jump-svg{
          display: block;

          & .svg-icon{
            height: 30px;
            width: 30px;
            margin-bottom: 22px;
          }
        }

        .jump-a{
          font-size: 12px;
          color: #3F6AFF;
          text-decoration: underline;
        }
      }
    }

    .input-yzm{

      .el-input{
        width:105px;
      }

      .el-form-item__error{
        left: -8px;
      }
    }
  }
}
</style>

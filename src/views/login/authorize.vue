<template>
  <div class="authorize-container">
    <div class="logo-wapper">
      <Logo />
    </div>
    <el-form ref="authorizeForm" :model="authorizeForm" :rules="authorizeRules" class="authorize-form" autocomplete="on" label-position="left">
      <span>管理授权</span>
      <div class="management">
        <el-form-item :class="{'input-focus': unitInput}" prop="unit">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="unit"
            v-model="authorizeForm.unit"
            placeholder="请输入授权单位"
            name="unit"
            type="text"
            tabindex="1"
            autocomplete="on"
            clearable
            @focus="focusinput(1)"
            @blur="blurinput(1)"
          />
        </el-form-item>

        <el-form-item :class="{'input-focus': keyInput}" prop="key">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="key"
            v-model="authorizeForm.key"
            placeholder="请输入授权密钥"
            name="key"
            type="text"
            tabindex="2"
            autocomplete="on"
            clearable
            @focus="focusinput(2)"
            @blur="blurinput(2)"
          />
        </el-form-item>
        <el-button type="primary" class="btn" style="float:left;" @click.native.prevent="handleCancel">取消</el-button>
        <el-button type="primary" class="btn" style="float:right;" @click.native.prevent="handleSure">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Logo from './components/Logo'

export default {
  name: 'Authorize',
  components: { Logo },
  data() {
    const validateUnit = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入授权单位'))
      } else {
        callback()
      }
    }
    const validateKey = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入授权密钥'))
      } else {
        callback()
      }
    }

    return {
      authorizeForm: {
        unit: '',
        key: ''
      },
      authorizeRules: {
        unit: [{ required: true, trigger: 'blur', validator: validateUnit }],
        key: [{ required: true, trigger: 'blur', validator: validateKey }]
      },
      unitInput: false,
      keyInput: false
    }
  },
  methods: {
    focusinput(type) {
      switch (type) {
        case 1:
          this.unitInput = true
          break
        case 2:
          this.keyInput = true
          break
        default:
          break
      }
    },
    blurinput(type) {
      switch (type) {
        case 1:
          this.unitInput = false
          break
        case 2:
          this.keyInput = false
          break
        default:
          break
      }
    },
    handleCancel() {
      this.$router.push({ path: '/login' })
    },
    handleSure() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
.authorize-container{
  width: 100%;
  height: 100%;
  background-color: #f0f2ff;

  .logo-wapper{
    width: 100%;
    height: 50px;
    background-color: #121430;
  }

  .authorize-form{
    width: 98%;
    margin-left: 1%;
    margin-top: 12px;
    height: 500px;
    text-align: center;
    padding: 35px;
    background-color: #fff;

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

    .management{
      margin: 50px auto 0;
      width: 260px;
    }

    .btn{
      width:40%;
      height:37px !important;
      line-height:37px !important;
    }
  }
}
</style>

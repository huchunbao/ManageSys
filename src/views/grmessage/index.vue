<template>
  <div class="gr-message">
    <div class="whitek">
      <div class="photo">
        <img
          :src="avatar"
          class="user-avatar"
        >
        <p v-if="$store.state.permission.buttons.includes('上传头像')" class="text-under" @click="updateAvatar">修改头像</p>
      </div>
      <div class="information">个人基本信息</div>
      <div class="mes">
        <div class="name">
          <p>姓名</p>
          <p>岗位</p>
          <p>部门</p>
          <p>集团/公司</p>
          <p>账号ID</p>
          <p>手机号(登录账号)</p>
        </div>
        <div class="namea">
          <p>{{ name }}</p>
          <p>{{ post }}</p>
          <p>{{ section }}</p>
          <p>{{ company }}</p>
          <div style="display:flex; margin-top:-16px;">
            <p>{{ ucode }}</p>
            <p v-if="$store.state.permission.buttons.includes('修改密码')" class="text-under p-l" @click="showPassword=true">修改密码</p>
          </div>
          <div style="display:flex;  margin-top:-12px;">
            <p>{{ mobile }}</p>
            <p v-if="$store.state.permission.buttons.includes('修改手机号')" class="text-under p-l" @click="showMobile=true">修改手机号</p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showCropper" title="修改头像" width="50%">
      <cropper id="avatarCrop" ref="cropper" :uid="uid" :default-url="defaultUrl"></cropper>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="cancelCropper">取消</el-button>
        <el-button round size="mini" type="primary" @click="toCropper">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showMobile" title="修改手机号" width="50%">
      <div class="dialog-mobile">
        <el-form ref="mobileForm" :model="mobileForm" :rules="mobileRules" class="mobile-form" autocomplete="on">
          <el-form-item label="原手机号：">
            <el-input v-model="mobile" :disabled="true" placeholder="原手机号"></el-input>
          </el-form-item>
          <el-form-item label="新手机号：" prop="newMobile">
            <el-input v-model.number="mobileForm.newMobile" name="newMobile" maxlength="11" clearable placeholder="新手机号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="resetMobile">取消</el-button>
        <el-button type="primary" round size="mini" @click="toMobile">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showPassword" title="修改密码" width="50%">
      <div class="dialog-password">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" class="password-form" autocomplete="on">
          <el-form-item label="原密码：" prop="oldPassword">
            <el-input v-model="passwordForm.oldPassword" type="password" clearable placeholder="原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassword">
            <el-input v-model="passwordForm.newPassword" type="password" minlength="6" name="newPassword" clearable placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="newPasswordAgain">
            <el-input v-model="passwordForm.newPasswordAgain" type="password" minlength="6" name="newPasswordAgain" clearable placeholder="确认新密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="resetPassword">取消</el-button>
        <el-button type="primary" round size="mini" @click="toPassword">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validMobile } from '@/utils/validate'
import Cropper from '@/components/Cropper'
import { updatePWByOld } from '@/api/user'

export default {
  components: { Cropper },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新手机号码'))
      } else if (!validMobile(value)) {
        callback(new Error('手机号输入不正确!'))
      } else if (value === this.mobile) {
        callback(new Error('新手机号不能是原手机号!'))
      } else {
        callback()
      }
    }
    const validateOldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    const validateNewPasswordAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认新密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      defaultUrl: '',
      showCropper: false,
      showMobile: false,
      mobileForm: {
        newMobile: ''
      },
      mobileRules: {
        newMobile: [{ required: true, trigger: 'blur', validator: validateMobile }]
      },
      showPassword: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      },
      passwordRules: {
        oldPassword: [{ required: true, trigger: 'blur', validator: validateOldPassword },
          { min: 6, message: '密码必须大于6位', trigger: 'blur' }
        ],
        newPassword: [{ required: true, trigger: 'blur', validator: validateNewPassword },
          { min: 6, message: '密码必须大于6位', trigger: 'blur' }
        ],
        newPasswordAgain: [{ required: true, trigger: 'blur', validator: validateNewPasswordAgain },
          { min: 6, message: '密码必须大于6位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['avatar', 'uid', 'ucode', 'name', 'mobile', 'post', 'section', 'company'])
  },
  created() {
    this.defaultUrl = this.avatar // 头像
  },
  methods: {
    updateAvatar() {
      this.showCropper = true
    },
    // 父组件调用子组件裁剪方法
    toCropper() {
      this.$refs.cropper.submit()
      this.cancelCropper()
    },
    cancelCropper() {
      this.showCropper = false
      this.$refs.cropper.url = this.avatar
      this.$refs.cropper.cropper.replace(this.avatar)
      this.$refs.cropper.$refs.imageFile.value = null
    },
    toMobile() { // 修改手机号
      this.$refs.mobileForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/updateMobile', { uid: this.uid, mobile: { phone: this.mobileForm.newMobile }})
            .then(() => {
              this.$message({
                message: '手机号修改成功，登录账号为新手机号',
                type: 'success',
                duration: 2000
              })
              this.resetMobile()
            })
            .catch((e) => {
              this.$message({
                message: '手机号修改失败，请稍后重试',
                type: 'warning',
                duration: 2000
              })
            })
        } else {
          return
        }
      })
    },
    resetMobile() { // 取消修改手机号
      this.showMobile = false
      this.$refs.mobileForm.resetFields()
    },
    toPassword() { // 修改密码
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          new Promise((resolve, reject) => {
            updatePWByOld(this.uid, { newpwd: this.passwordForm.newPasswordAgain, oldpwd: this.passwordForm.oldPassword }).then(response => {
              if (response.msg === 'SUCCESS') {
                this.$message({
                  message: '密码修改成功',
                  type: 'success',
                  duration: 3000
                })
                this.resetPassword()
              } else {
                this.$message({
                  message: response.msg,
                  type: 'warning',
                  duration: 3000
                })
                return
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).then(res => {})
        } else {
          return
        }
      })
    },
    resetPassword() { // 取消密码修改
      this.showPassword = false
      this.$refs.passwordForm.resetFields()
    }
  }
}
</script>

<style lang="scss">
.tac {
  width: 100px;
}

.gr-message {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #eff3ff;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;

  .whitek {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
    border-radius: 3px;
    padding: 30px;
  }

  .photo {
    height: 160px;
    width: 100px;
    text-align: center;

    .user-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .text-under {
    text-decoration: underline;
    color: rgba(63, 106, 255, 1);
    cursor: pointer;
  }

  .zp .el-upload-dragger {
    height: 160px;
    width: 260px;
  }
  .information {
    text-indent: 27px;
    position: relative;
    font-size: 16px;
    font-weight: 500;
  }
  .information::before {
    content: '';
    position: absolute;
    left: 0;
    width: 7px;
    height: 16px;
    background: rgba(63, 106, 255, 1);
    border-radius: 4px;
  }
  .mes {
    display: flex;
  }
  .name {
    margin-left: 43px;
    color: rgba(29, 33, 51, 1);
  }
  .namea {
    margin-left: 56px;
    color: rgba(29, 33, 51, 1);

    p{
      height: 16px;
    }
  }
  .p-l {
    padding-left: 10px;
  }
  .dialog-password,
  .mobile-form{
    width: 100%;
    text-align: center;

    .el-form-item__label{
      float: none;
    }

    .el-form-item__label:before{
      content: '' !important;
      margin-right: 0 !important;
    }

    .el-form-item__content{
      display: inline-block;
      width: 200px;
    }
  }
  .dialog-password{
    text-align: right !important;
    padding-right: 21%;
  }
  .dialog-footer{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0 15% 15px;
  }
}
</style>

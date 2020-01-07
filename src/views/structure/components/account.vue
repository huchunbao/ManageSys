<template>
  <div class="account-container">
    <el-form ref="accountForm" :model="accountForm" :rules="accountRules" class="account-form" autocomplete="off" hide-required-asterisk label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="accountForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model.number="accountForm.mobile" name="mobile" maxlength="11" clearable placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="post">
        <el-input v-model="accountForm.post" name="post" clearable placeholder="职位" autocomplete="off"></el-input>
        <el-input v-show="false" clearable placeholder="职位"></el-input>
      </el-form-item>
      <el-form-item v-if="userInfo.type != 1" label="密码" prop="password">
        <el-input v-show="false" type="password" placeholder="密码"></el-input>
        <el-input ref="password" v-model="accountForm.password" type="password" name="password" clearable placeholder="密码" autocomplete="off" auto-complete="new-password"></el-input>
      </el-form-item>
      <div class="account-btn" :style="{'padding-top' : (userInfo.type != 1 ? '0' : '50px')}">
        <el-button round size="mini" class="el-button-default" @click="cancel">取消</el-button>
        <el-button :loading="loading" round size="mini" type="primary" @click="submit">保存</el-button>
      </div>
    </el-form>
    <div class="photo">
      <el-upload
        ref="upload"
        class="avatar-uploader"
        action=""
        drag
        :on-change="onchange"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        :http-request="upLoadAvatar"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { post, put } from '@/api/axios'
import { updateAvatar } from '@/api/user'
import { validMobile } from '@/utils/validate'
export default {
  name: 'Account',
  props: {
    userInfo: {
      type: Object,
      'default': null
    }
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新手机号码'))
      } else if (!validMobile(value)) {
        callback(new Error('手机号输入不正确!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      userId: 0,
      showCropper: false,
      imageUrl: '',
      imageUpdate: false,
      imgData: {
        accept: 'image/jpeg, image/png, image/jpg'
      },
      accountForm: {
        name: '',
        mobile: '',
        post: '',
        password: ''
      },
      accountRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        post: [{ required: true, trigger: 'blur', message: '请输入职位' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' },
          { min: 6, message: '密码必须大于6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    var that = this
    if (that.userInfo.type === 1) { // 修改用户
      that.userId = that.userInfo.userId
      that.accountForm.name = that.userInfo.cusName
      that.accountForm.mobile = that.userInfo.phone
      that.accountForm.post = that.userInfo.postName
      that.accountForm.password = '111111'
      that.imageUrl = process.env.VUE_APP_BASE_API + '/user/img/' + that.userInfo.cusPic + '?t=' + new Date().getTime()
    } else { // 添加用户
      that.accountForm.name = ''
      that.accountForm.mobile = ''
      that.accountForm.post = ''
      that.accountForm.password = ''
      that.imageUrl = ''
    }
  },
  methods: {
    getObjectURL: function(file) {
      var url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    onchange: function(file, fileList) {
      const fileData = file.raw
      if (!fileData) return
      const type = fileData.type // 文件的类型，判断是否是图片
      const size = fileData.size // 文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) === -1 || type === '') {
        this.$message({
          message: '请选择jpg、jpeg、png格式图片文件',
          type: 'warning'
        })
        return false
      }
      if (size > 2097152) {
        this.$message({
          message: '请选择2M以下图片文件',
          type: 'warning'
        })
        return false
      }
      this.imageUpdate = true
      this.imageUrl = this.getObjectURL(fileData)
    },
    upLoadAvatar(params) {
      var that = this
      var formData = new FormData()
      formData.append('file', params.file)
      updateAvatar(this.userId, formData).then(response => {
        that.loading = false
        that.$emit('submituser')
      })
    },
    submit() {
      var that = this
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          var user = {
            cpid: that.userInfo.cpid,
            cusName: that.accountForm.name,
            phone: that.accountForm.mobile,
            deptId: that.userInfo.deptId,
            postName: that.accountForm.post,
            cusPassword: that.accountForm.password
          }
          that.loading = true
          if (that.userInfo.type === 0) {
            post('/user', user).then(response => {
              if (response.status === 0) {
                this.userId = response.data.userId
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  duration: 3000
                })
                if (this.imageUrl !== '') {
                  that.$refs.upload.submit()
                } else {
                  that.loading = false
                  that.$emit('submituser')
                }
              } else {
                this.$message({
                  message: response.msg,
                  type: 'warning',
                  duration: 3000
                })
                that.loading = false
                that.$emit('submituser')
              }
            })
          } else {
            user.userId = that.userInfo.userId
            user.cusName = (user.cusName === that.userInfo.cusName ? null : user.cusName)
            user.phone = (user.phone === that.userInfo.phone ? null : user.phone)
            user.postName = (user.postName === that.userInfo.postName ? null : user.postName)
            user.cusPassword = null
            put('/user', user).then(response => {
              if (response.status === 0) {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 3000
                })
                if (this.imageUrl !== '' && this.imageUpdate) {
                  that.$refs.upload.submit()
                } else {
                  that.loading = false
                  that.$emit('submituser')
                }
              } else {
                this.$message({
                  message: response.msg,
                  type: 'warning',
                  duration: 3000
                })
                that.loading = false
                that.$emit('submituser')
              }
            })
          }
        } else {
          return
        }
      })
    },
    cancel() {
      this.$emit('canceluser')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style>
.account-container .el-upload-dragger{
  width: 100% !important;
}
</style>
<style lang="scss" scoped>
.account-container{
  background-color: #ffffff;
  height: 450px;
  border-radius: 4px;
  padding: 40px 50px;

  .account-form{
    width: 300px;
    float: left;

    .account-btn{
      margin-top: 50px;
      display: flex;

      & button:nth-child(1){
        margin: 0 auto;
      }
    }
  }

  .photo{
    width: 200px;
    float: left;
    margin-left: 30px;

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #3F6AFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>

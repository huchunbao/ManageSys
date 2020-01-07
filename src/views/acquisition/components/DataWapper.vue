<template>
  <div class="data-wapper" style="width: 360px;">
    <el-form ref="collectionForm" :disabled="wapperType===0 && !btnSave" :model="collectionForm" :rules="collectionRules" label-width="120px" autocomplete="on" size="mini" class="collection">
      <el-form-item label="数据采集名称" prop="name">
        <el-input v-model="collectionForm.name" placeholder="输入数据采集名称"></el-input>
      </el-form-item>
      <el-form-item label="厂商名称" prop="company">
        <el-input v-model="collectionForm.company" clearable placeholder="输入厂商名称"></el-input>
      </el-form-item>
      <el-form-item label="子系统名称">
        <el-dropdown type="primary" placement="bottom-start" plain @command="handleChildDD(...arguments)">
          <el-button class="el-dropdown-link">
            {{ collectionForm.childSys }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="child in childSysList" :key="child.id" :command="child">{{ child.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="服务器名称或IP" prop="server">
        <el-input v-model="collectionForm.server" clearable placeholder="输入服务器名称或IP"></el-input>
      </el-form-item>
      <el-form-item label="登录用户名" prop="username">
        <el-input v-model="collectionForm.username" clearable placeholder="输入登录用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="collectionForm.password" clearable placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item label="协议类型">
        <el-dropdown type="primary" placement="bottom-start" plain @command="handleDD(...arguments)">
          <el-button class="el-dropdown-link">
            {{ collectionForm.protocol }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="protocol in protocolList" :key="protocol.val" :command="protocol">{{ protocol.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="内容编码" prop="coding">
        <el-input v-model="collectionForm.coding" clearable placeholder="输入内容编码"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input v-model="collectionForm.remark" type="textarea" :rows="3" clearable placeholder="输入描述"></el-input>
      </el-form-item>
    </el-form>
    <el-button v-if="wapperType === 1" round size="mini" class="el-button-default" style="float: left; margin-left: 120px;" @click="handleCancel">取消</el-button>
    <el-button v-if="wapperType === 0" :disabled="collectionForm.name === '' || btnSave" :class="{ 'el-button-default': updateStatus() }" round size="mini" style="float: left; margin-left: 120px;" @click="btnSave=true">修改</el-button>
    <el-button round size="mini" :loading="loading" :disabled="wapperType===0 && !btnSave" :class="{ 'el-button-default': btnSave || wapperType===1 }" style="float: right;" @click="handleSave">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'DataWapper',
  props: {
    wapperType: { // 页面类型1添加 0修改
      type: Number,
      default: 0
    },
    childSysList: { // 子系统列表
      type: Array,
      default() {
        return []
      }
    },
    childSysText: { // 子系统名称
      type: String,
      default: ''
    }
  },
  data() {
    return {
      collectionForm: {
        id: 0,
        name: '',
        company: '',
        childSys: this.childSysText,
        childId: 1,
        server: '',
        username: '',
        password: '',
        protocol: 'HTTP',
        coding: '',
        remark: ''
      },
      collectionRules: {
        name: [{ required: true, message: '请输入数据采集名称', trigger: 'blur' }],
        company: [{ required: true, message: '请输入厂商名称', trigger: 'blur' }],
        server: [{ required: true, message: '请输入服务器名称或IP', trigger: 'blur' }],
        username: [{ required: true, message: '请输入登录用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        coding: [{ required: true, message: '请输入内容编码', trigger: 'blur' }]
      },
      protocolList: [ // 协议类型
        { val: 1, name: 'HTTP' },
        { val: 2, name: 'HTTPS' },
        { val: 3, name: '串口' },
        { val: 4, name: 'UDP' }
      ],
      btnSave: false,
      loading: false
    }
  },
  methods: {
    handleChildDD(item) { // 子系统下拉选择
      this.collectionForm.childSys = item.name
      this.collectionForm.childId = item.id
    },
    handleDD(item) { // 协议下拉选择
      this.collectionForm.protocol = item.name
    },
    updateStatus: function() {
      if (this.btnSave) {
        return false
      } else if (this.collectionForm.id <= 0) {
        return false
      } else {
        return true
      }
    },
    handleCancel: function() {
      this.$emit('cancel')
    },
    handleSave: function() { // 保存
      this.$refs.collectionForm.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.wapperType === 1) {
            this.$emit('add', this.collectionForm)
          } else {
            this.$emit('update', this.collectionForm)
          }
        }
      })
    }
  }
}
</script>

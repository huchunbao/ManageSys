<template>
  <div class="add-dialog-container">
    <el-form ref="addForm" label-width="70px" :model="addForm" :rules="addRules" hide-required-asterisk autocomplete="off" class="set-form" size="mini">
      <el-form-item :label="addText + '名称'" prop="name">
        <el-input v-model="addForm.name" clearable :placeholder="addText + '名称'"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button round size="mini" class="el-button-default" @click="cancelAdd">取消</el-button>
      <el-button round :loading="loading" size="mini" type="primary" @click="submitAdd">确定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    addText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      addForm: {
        name: ''
      },
      addRules: {
        name: [{ required: true, message: '请输入' + this.addText + '名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    cancelAdd: function() {
      this.$emit('canceldlg')
    },
    submitAdd: function() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$emit('submitdlg', this.addForm.name)
        } else {
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-dialog-container{
  width: 100%;
  height: 100%;
  padding: 0 15px;
  text-align: center;

  .set-form{
    margin-bottom: 30px;
  }

  .dialog-footer{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0 15%;
  }
}
</style>

<template>
  <div class="set-dialog-container">
    <el-form label-width="50px" hide-required-asterisk autocomplete="on" class="set-form" size="mini">
      <el-form-item label="姓名">
        <el-dropdown type="primary" placement="bottom-start" plain @command="handleDD(...arguments)">
          <el-button class="el-dropdown-link">
            {{ setForm.showName }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in list" :key="item.id" :command="item">{{ item.cusName }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button round size="mini" class="el-button-default" @click="cancelSet">取消</el-button>
      <el-button round :loading="loading" size="mini" type="primary" @click="submitSet">确定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SetDialog',
  props: {
    showName: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      setForm: {
        userId: 0,
        showName: this.showName
      }
    }
  },
  methods: {
    handleDD: function(data) {
      this.setForm.userId = data.userId
      this.setForm.userId = data.userId
      this.setForm.showName = data.cusName
    },
    cancelSet: function() {
      this.$emit('canceldlg')
    },
    submitSet: function() {
      this.loading = true
      this.$emit('submitdlg', this.setForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.set-dialog-container{
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

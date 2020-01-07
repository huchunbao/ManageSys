<template>
  <el-menu
    :default-active="topMenuIndex"
    class="el-menu-demo top-menu"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">数据中心</el-menu-item>
    <el-menu-item index="3">系统管理</el-menu-item>
    <el-menu-item index="4">系统设置</el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopMenu',
  data() {
    return {
      menuManage: [],
      menuSetting: []
    }
  },
  computed: {
    ...mapGetters(['topMenuIndex', 'permission_routes'])
  },
  created() {
    this.menuManage = this.permission_routes.filter((item) => {
      return item.MenuIndex === '3'
    })
    this.menuSetting = this.permission_routes.filter((item) => {
      return item.MenuIndex === '4'
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      var topIndex = parseInt(key)
      switch (topIndex) {
        case 1:
          this.$router.push({ path: '/home' })
          break
        case 2:
          this.$router.push({ path: '/baogao/index' })
          break
        case 3:
          if (this.menuManage.length > 0) {
            this.$router.push({ path: this.menuManage[0].path })
          } else {
            this.$message({
              message: '您没有该功能权限',
              type: 'warning',
              duration: 3000
            })
          }
          break
        case 4:
          if (this.menuSetting.length > 0) {
            this.$router.push({ path: '/' + this.menuSetting[0].children[0].name + '/' + this.menuSetting[0].children[0].path })
          } else {
            this.$message({
              message: '您没有该功能权限',
              type: 'warning',
              duration: 3000
            })
          }
          break
        default:
          break
      }
      this.$store.dispatch('app/setTopMenuIndex', key)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal{
  border-bottom: none !important;
}

.el-menu--horizontal > .el-menu-item{
  height: 50px !important;
  line-height: 50px !important;
  color: #fff !important;
  font-size: 14px;
  border-bottom: none !important;
}

.el-menu--horizontal > li:hover{
  background-color: rgba($color: #000000, $alpha: 0.3) !important;
}

.el-menu--horizontal > li:focus {
  background-color: transparent !important;
}

.el-menu--horizontal > .el-menu-item.is-active{
  border-bottom: none !important;
  position: relative;
  font-weight: 800;
  &:after{
    content: " ";
    width: 30px;
    height: 3px;
    background: #A0B5FF;
    position: absolute;
    bottom: 0;
    border-radius: 3px;
    left: 50%;
    transform: translateX(-50%);//居中处理
  }
}
</style>

<template>
  <div class="auth-transfer">
    <el-row :gutter="20">
      <el-col :span="10" class="auth-all-item">
        <div class="auth-tree-title">功能清单</div>
        <el-scrollbar class="auth-tree">
          <el-tree
            ref="sysTree"
            :data="sysData"
            :props="defaultProps"
            node-key="id"
            :empty-text="authLoading"
            highlight-current
            accordion
            show-checkbox
            default-expand-all
          >
          </el-tree>
        </el-scrollbar>
      </el-col>
      <el-col :span="4">
        <div class="company auth-bg">
          <div class="auth-set-btn">
            <div :class="btnStatus===0 ? 'auth-disable':'auth-available'" @click="addAuth">授权</div>
            <div :class="btnStatus===0 ? 'auth-disable':'auth-available'" @click="removeAuth">移除</div>
          </div>
        </div>
      </el-col>
      <el-col :span="10" class="auth-item">
        <div class="auth-tree-title">授权功能</div>
        <el-scrollbar class="auth-tree">
          <el-tree
            ref="setTree"
            :data="setData"
            :props="defaultProps"
            :node-key="setKey"
            :empty-text="setLoading"
            highlight-current
            accordion
            show-checkbox
            default-expand-all
          >
          </el-tree>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get, post, byDelete } from '@/api/axios'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectCompanyId: {
      type: Number,
      default: 0
    },
    btnStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      authLoading: '暂无数据',
      setLoading: '暂无数据',
      sysRootNode: [],
      sysData: [],
      setKey: 'id',
      setPKey: 'pid',
      setData: [],
      setDefault: [],
      defaultProps: { children: 'children', label: 'name' }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {
    selectCompanyId: {
      handler(newVal, oldVal) {
        this.getCompanySys(newVal)
      }
    }
  },
  created() {
    this.getAllSys()
  },
  methods: {
    getAllSys() {
      this.authLoading = '数据加载中...'
      if (this.companyId === 12) { // 银科环企成员获取总的功能树
        get('/sysfunc/tree', null).then(response => {
          if (response.status === 0) {
            this.sysData = response.data
            this.sysRootNode = JSON.parse(JSON.stringify(response.data))
            this.sysRootNode[0].children = []
          }
          this.authLoading = '暂无数据'
        })
      } else { // 客户公司获取授权后的功能树
        this.setKey = 'funcId'
        this.setPKey = 'funcPid'
        get('/cpfunc/tree/' + this.companyId, null).then(response => {
          if (response.status === 0) {
            this.sysData = response.data
            this.sysRootNode = JSON.parse(JSON.stringify(response.data))
            this.sysRootNode[0].children = []
          }
          this.authLoading = '暂无数据'
        })

        this.getCompanySys(this.selectCompanyId)
      }
    },
    getCompanySys(companyId) { // 已授权的功能列表
      if (this.selectCompanyId > 0) {
        this.setLoading = '数据加载中...'
        get('/cpfunc/tree/' + this.selectCompanyId, null).then(response => {
          if (response.status === 0) {
            this.setData = response.data
            if (response.data.length > 0) {
              this.setDefault = this.getTreeNode(response.data)
            } else {
              this.setDefault = []
            }
          }
          this.setLoading = '暂无数据'
        })
      }
    },
    addAuth() { // 添加授权功能
      if (this.btnStatus === 0) { return }
      var that = this
      var c = this.$refs.sysTree.getCheckedNodes(false, true)
      if (c.length <= 1 || c === null) {
        return
      } else {
        that.setData = JSON.parse(JSON.stringify(this.sysRootNode))
        that.$nextTick(() => {
          var d = JSON.parse(JSON.stringify(c))
          var node
          for (var i = 1; i < d.length; i++) {
            node = d[i]
            node.children = []
            that.$refs.setTree.append(node, node[this.setPKey])
          }
        })
      }
    },
    removeAuth() { // 删除授权功能
      if (this.btnStatus === 0) { return }
      var that = this
      var sc = that.$refs.setTree.getCheckedKeys()
      for (var r = 0; r < sc.length; r++) {
        that.$refs.setTree.remove(sc[r])
        that.$refs.sysTree.setChecked(sc[r], false)
      }
    },
    async saveAuth() { // 保存授权功能
      var set = this.$refs.setTree.data
      if (set === null) { // 没有勾选
        if (this.setDefault.length > 0) {
          // 删除
          if (await this.deleteAuth(this.setDefault)) {
            this.$message({
              message: '授权保存成功',
              type: 'success',
              duration: 3000
            })
            this.setDefault = []
          } else {
            this.$message({
              message: '授权保存失败',
              type: 'warning',
              duration: 3000
            })
          }
        } else {
          this.$message({
            message: '授权保存成功',
            type: 'success',
            duration: 3000
          })
        }
      } else {
        var authList = this.getTreeNode(set)
        if (this.setDefault.length > 0) {
          var old = JSON.parse(JSON.stringify(this.setDefault))
          var auth = JSON.parse(JSON.stringify(authList))
          for (var j = 0; j < authList.length; j++) { // 删除
            var delIndex = old.findIndex(item => {
              return item.name === authList[j].name
            })
            if (delIndex >= 0) {
              old.splice(delIndex, 1)
            }
          }
          var delRet = true
          if (old.length > 0) {
            delRet = await this.deleteAuth(old)
          }
          if (delRet) {
            for (var i = 0; i < this.setDefault.length; i++) { // 新增
              var index = auth.findIndex(item => {
                return item.name === this.setDefault[i].name
              })
              if (index >= 0) {
                auth.splice(index, 1)
              }
            }
            if (auth.length > 0) {
              if (await this.postAuth(auth)) {
                this.$message({
                  message: '授权保存成功',
                  type: 'success',
                  duration: 3000
                })
              } else {
                this.$message({
                  message: '授权保存失败',
                  type: 'warning',
                  duration: 3000
                })
              }
            } else {
              this.$message({
                message: '授权保存成功',
                type: 'success',
                duration: 3000
              })
            }
          } else {
            this.$message({
              message: '授权保存失败',
              type: 'warning',
              duration: 3000
            })
          }
        } else {
          // 添加
          if (await this.postAuth(authList)) {
            this.$message({
              message: '授权保存成功',
              type: 'success',
              duration: 3000
            })
          } else {
            this.$message({
              message: '授权保存失败',
              type: 'warning',
              duration: 3000
            })
          }
        }
        this.getCompanySys(this.selectCompanyId)
        this.$emit('authend')
      }
    },
    getTreeNode(data) { // 判断节点是否有子节点
      var list = []
      const fn = (source) => {
        source.forEach(el => {
          list.push(el)
          el.children && el.children.length > 0 ? fn(el.children) : ''
        })
      }
      fn(data) // 获取树列表转为数组
      return list
    },
    deleteAuth(list) { // 清空授权
      var delList = []
      list.forEach(item => {
        delList.push(item.id)
      })
      return new Promise((resolve, reject) => {
        byDelete('/cpfunc', delList).then(response => {
          resolve(response.status === 0)
        }).catch(() => {
          reject(false)
        })
      })
    },
    postAuth(list) { // 新增授权
      if (this.setPKey === 'funcPid') {
        for (var c = 0; c < list.length; c++) {
          list[c].id = list[c].funcId
          list[c].pid = list[c].funcPid
        }
      }
      return new Promise((resolve, reject) => {
        post('/cpfunc/' + this.selectCompanyId, list).then(response => {
          resolve(response.status === 0)
        }).catch(() => {
          reject(false)
        })
      })
    }
  }
}
</script>
<style lang="scss">
.auth-transfer{
  width: 100%;
  height: 100%;

  .el-row{
    height: 100%;
  }

  .auth-item,
  .auth-all-item{
    background-color: #F6F8FE;
    padding: 15px;
  }

  .auth-tree-title {
    text-indent: 27px;
    position: relative;
    font-size: 16px;
    font-weight: 500;
  }

  .auth-tree-title::before {
    content: '';
    position: absolute;
    left: 0;
    width: 7px;
    height: 16px;
    background: rgba(63, 106, 255, 1);
    border-radius: 4px;
  }

  .auth-tree{
    height: calc(100% - 30px);
    margin-top: 10px;
    overflow-y: auto;

    .el-tree {
      background-color: #F6F8FE;
    }

    .el-checkbox__inner{
      border-radius: 50%;
    }

    .is-indeterminate .el-checkbox__inner,
    .is-checked .el-checkbox__inner{
      background-color: #3F6AFF;
      border-color: #3F6AFF;
    }
  }

  .auth-bg{
    background-color: #ffffff;
    height: 100%;
    text-align: center;
    position: relative;

    .auth-set-btn{
      position: relative;
      top: 50%;
      transform: translateY(-50%);

      div{
        width: 100%;
        max-width: 100px;
        height: 60px;
        padding-top: 22px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      & div:nth-child(1){
        background-image: url('../../../assets/images/auth_right.png')
      }

      & div:nth-child(2){
        margin-top: 8px;
        background-image: url('../../../assets/images/auth_left.png')
      }

      .auth-disable{
        color: #C9CBD7;
        cursor: no-drop;
      }

      .auth-available{
        color: #3F6AFF;
        cursor: pointer;
      }
    }
  }
}
</style>

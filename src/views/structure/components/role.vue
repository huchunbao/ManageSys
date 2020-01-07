<template>
  <div class="role-container">
    <div class="role-wapper">
      <div class="role-top">
        <div class="f-l">
          <el-form ref="addRoleForm" :model="addRoleForm" :rules="addRoleRules" hide-required-asterisk label-width="80px" autocomplete="off" size="mini">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="addRoleForm.name" clearable placeholder="角色名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button round size="mini" class="el-button-default company-info-btn f-r" style="margin-left: 20px;" @click="cancelRole">取消</el-button>
        <el-button round :loading="loading" size="mini" type="primary" class="company-info-btn f-r" @click="saveRole">保存</el-button>
      </div>
      <el-row :gutter="15" class="first-row">
        <el-col :span="7">
          <div class="company bg">
            <div class="auth-tree-title">系统模块</div>
            <el-scrollbar class="company-tree">
              <el-tree
                ref="sysTree"
                :data="sysData"
                :props="defaultProps"
                node-key="id"
                :empty-text="companyLoading"
                highlight-current
                show-checkbox
                default-expand-all
                @node-click="sysClick"
              >
              </el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="function-table">
            <el-table
              ref="functionTable"
              :data="functionData"
              max-height="100%"
              height="100%"
              style="width: 100%"
              header-row-class-name="car-table-header"
              row-class-name="car-table-item"
              highlight-current-row
            >
              <el-table-column prop="name" label="功能" width="auto" class-name="function-table-begin"></el-table-column>
              <el-table-column label="游览" width="70" class-name="role-select">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.roleFuncAuth.rightSelect" @change="handleCheck(scope, ...arguments, 'rightSelect')">
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="新建" width="70">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.roleFuncAuth.rightInsert" @change="handleCheck(scope, ...arguments, 'rightInsert')">
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="删除" width="70">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.roleFuncAuth.rightDelete" @change="handleCheck(scope, ...arguments, 'rightDelete')">
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="保存" width="70">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.roleFuncAuth.rightUpdate" @change="handleCheck(scope, ...arguments, 'rightUpdate')">
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="审批" width="70">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.roleFuncAuth.rightAudit" @change="handleCheck(scope, ...arguments, 'rightAudit')">
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="打印" width="70">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.roleFuncAuth.rightPrint" @change="handleCheck(scope, ...arguments, 'rightPrint')">
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="导出" width="100" class-name="function-table-end">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.roleFuncAuth.rightExport" @change="handleCheck(scope, ...arguments, 'rightExport')">
                  </el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { get, post, put, byDelete } from '@/api/axios'
export default {
  props: {
    companyId: {
      type: Number,
      default: 0
    },
    addType: {
      type: Number,
      default: 0
    },
    roleId: {
      type: Number,
      default: 0
    },
    roleName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      companyLoading: '暂无数据',
      addRoleForm: {
        name: this.roleName
      },
      addRoleRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      sysData: [],
      sysRootNode: [],
      setData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultAuthList: [], // 修改角色，默认id列表
      functionData: [],
      getList: {}, // 存储点击树列表获取到的功能列表
      clickList: {}, // 存储有点击的功能列表
      addList: {}, // 添加的功能
      updateList: {}, // 修改的功能
      deleteList: {}, // 删除的功能
      defaultFuncAuth: {
        roleId: this.roleId,
        cpFuncId: 0,
        cpFuncPid: 0,
        rightSelect: 0,
        rightInsert: 0,
        rightDelete: 0,
        rightUpdate: 0,
        rightAudit: 0,
        rightPrint: 0,
        rightExport: 0,
        type: 0 // 0表示没有添加默认赋值  1表示存在，读取接口获取的数据
      }
    }
  },
  mounted() {
    this.initAuthList()
  },
  methods: {
    initAuthList() { // 加载授权树列表
      var that = this
      if (that.companyId > 0) {
        that.companyLoading = '数据加载中...'
        get('/cpfunc/truncated-tree/' + that.companyId, { truncateLvl: 2, roleId: that.roleId }).then(response => {
          if (response.status === 0) {
            that.companyLoading = '暂无数据'
            that.sysData = response.data.tree
            that.defaultAuthList = response.data.roleFuncAuthIds
            that.sysRootNode = JSON.parse(JSON.stringify(response.data.tree))
            if (that.sysRootNode.length > 0) {
              that.sysRootNode[0].children = []
            }
            that.$nextTick(() => {
              for (var c = 0; c < response.data.checkedIds.length; c++) {
                that.$refs.sysTree.setChecked(response.data.checkedIds[c], true, false)
              }
            })
          }
        })
      }
    },
    getTreeNode(data) { // 判断节点是否为根节点
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
    sysClick: function(node, all) { // 授权树列表点击事件
      if (node.children === null) {
        get('/cpfunc/' + this.companyId + '/' + node.funcId + '/' + this.roleId, null).then(response => {
          if (response.status === 0) {
            var fd = response.data
            for (var i = 0; i < fd.length; i++) {
              if (fd[i].roleFuncAuth === null) { // 具体权限为空 传入默认值
                if (!this.clickList.hasOwnProperty(fd[i].id)) {
                  fd[i].roleFuncAuth = JSON.parse(JSON.stringify(this.defaultFuncAuth))
                  fd[i].roleFuncAuth.cpFuncId = fd[i].id
                  fd[i].roleFuncAuth.cpFuncPid = fd[i].funcPid
                } else {
                  fd[i].roleFuncAuth = this.clickList[fd[i].id]
                }
              } else {
                fd[i].roleFuncAuth.type = 1
                fd[i].roleFuncAuth.cpFuncPid = fd[i].funcPid
                fd[i].roleFuncAuth.rightSelect = !!fd[i].roleFuncAuth.rightSelect
                fd[i].roleFuncAuth.rightInsert = !!fd[i].roleFuncAuth.rightInsert
                fd[i].roleFuncAuth.rightDelete = !!fd[i].roleFuncAuth.rightDelete
                fd[i].roleFuncAuth.rightUpdate = !!fd[i].roleFuncAuth.rightUpdate
                fd[i].roleFuncAuth.rightAudit = !!fd[i].roleFuncAuth.rightAudit
                fd[i].roleFuncAuth.rightPrint = !!fd[i].roleFuncAuth.rightPrint
                fd[i].roleFuncAuth.rightExport = !!fd[i].roleFuncAuth.rightExport
              }

              if (!this.getList.hasOwnProperty(fd[i].id)) { // 添加存储获取的功能列表
                this.getList[fd[i].id] = JSON.parse(JSON.stringify(fd[i].roleFuncAuth))
              }
            }
            this.functionData = fd
          }
        })
      } else {
        this.functionData = []
      }
    },
    handleCheck(data, parms) { // table功能列表点击事件
      var func = data.row.roleFuncAuth
      this.clickList[data.row.id] = func
    },
    async saveRole() { // 保存角色
      var that = this
      this.$refs.addRoleForm.validate((valid) => {
        if (valid) {
          var role = {
            cpid: this.companyId,
            showName: this.addRoleForm.name,
            roleFuncAuth: []
          }
          var c = that.$refs.sysTree.getCheckedNodes(false, true) // 功能树列表勾选项
          var checkData = [] // 存储树列表勾选项
          var checkListData = [] // 存储表格列表有勾选的行
          var listItem = Object.values(this.clickList)

          this.loading = true
          if (that.addType === 0) { // 添加
            for (var check = 0; check < c.length; check++) { // 遍历树勾选节点
              checkData.push({ // 添加树勾选项
                cpFuncId: c[check].id,
                rightSelect: 1
              })
              if (c[check].children === null && listItem.length > 0) { // 页面节点
                var has = listItem.filter((item) => { // 匹配树勾选后对应的列表
                  return item.cpFuncPid === c[check].funcId
                })
                checkListData = checkListData.concat(has)
              }
            }
            checkListData = checkListData.filter((func) => { // 筛选掉空的
              return func.rightAudit || func.rightDelete || func.rightExport || func.rightInsert || func.rightPrint || func.rightSelect || func.rightUpdate
            })
            role.roleFuncAuth = checkData.concat(this.trueToOne(checkListData))
            console.log(role)
            post('/role/save', role).then(response => {
              this.loading = false
              if (response.status === 0) {
                this.$message({
                  message: '角色添加成功',
                  type: 'success',
                  duration: 3000
                })
              } else {
                this.$message({
                  message: response.msg,
                  type: 'warning',
                  duration: 3000
                })
              }
              that.$emit('submitrole')
            })
          } else { // 修改
            var old = JSON.parse(JSON.stringify(that.defaultAuthList)) // 原有勾选项
            var add = []
            for (var j = 0; j < c.length; j++) {
              if (c[j].roleFuncAuth !== null) { // 筛选出删除的node
                var delIndex = old.findIndex(item => {
                  return item === c[j].roleFuncAuth.id
                })
                if (delIndex >= 0) {
                  old.splice(delIndex, 1)
                }
              } else { // 添加的node
                add.push({
                  roleId: that.roleId,
                  cpFuncId: c[j].id,
                  rightSelect: 1
                })
              }

              if (c[j].children === null && listItem.length > 0) { // 页面节点
                var hasClick = listItem.filter((ft) => { // 匹配树勾选后对应的列表
                  return ft.cpFuncPid === c[j].funcId
                })
                checkListData = checkListData.concat(hasClick)
              }
            }

            var addFunction = []
            var updateFunction = []
            var deleteFunction = []
            for (var v = 0; v < checkListData.length; v++) {
              var f = checkListData[v]
              if (f.rightAudit || f.rightDelete || f.rightExport || f.rightInsert || f.rightPrint || f.rightSelect || f.rightUpdate) {
                if (f.type === 0) { // 类型为默认值则为添加
                  addFunction.push(f)
                } else {
                  if (f !== this.getList[f.cpFuncId]) { // 修改
                    updateFunction.push(f)
                  }
                }
              } else {
                if (this.getList[f.cpFuncId].type === 1) { // 删除
                  deleteFunction.push(f.id)
                }
              }
            }

            post('/role/updateName', { id: this.roleId, showName: this.addRoleForm.name }).then(nameRe => { // 修改角色名称
              if (nameRe.status === 0) {
                byDelete('/rolefunc', old.concat(deleteFunction)).then(response => {
                  if (response.status === 0) {
                    put('/rolefunc', this.trueToOne(updateFunction)).then(updateRe => {
                      if (updateRe.status === 0) {
                        add = that.trueToOne(add)
                        post('/rolefunc', add.concat(this.trueToOne(addFunction))).then(addRe => {
                          if (addRe.status === 0) {
                            this.loading = false
                            this.$message({
                              message: '角色修改成功',
                              type: 'success',
                              duration: 3000
                            })
                            that.$emit('submitrole')
                          } else {
                            this.loading = false
                            this.$message({
                              message: response.msg,
                              type: 'warning',
                              duration: 3000
                            })
                            that.$emit('submitrole')
                          }
                        })
                      } else {
                        this.loading = false
                        this.$message({
                          message: response.msg,
                          type: 'warning',
                          duration: 3000
                        })
                        that.$emit('submitrole')
                      }
                    })
                  } else {
                    this.loading = false
                    this.$message({
                      message: response.msg,
                      type: 'warning',
                      duration: 3000
                    })
                    that.$emit('submitrole')
                  }
                })
              } else {
                this.loading = false
                this.$message({
                  message: nameRe.msg,
                  type: 'warning',
                  duration: 3000
                })
              }
            })
          }
        }
      })
    },
    cancelRole() {
      this.$emit('cancelrole')
    },
    trueToOne(list) { // true false 转换为1  0 后台需要数字
      for (var cl = 0; cl < list.length; cl++) {
        list[cl].rightSelect = list[cl].rightSelect * 1
        list[cl].rightInsert = list[cl].rightInsert * 1
        list[cl].rightDelete = list[cl].rightDelete * 1
        list[cl].rightUpdate = list[cl].rightUpdate * 1
        list[cl].rightAudit = list[cl].rightAudit * 1
        list[cl].rightPrint = list[cl].rightPrint * 1
        list[cl].rightExport = list[cl].rightExport * 1
      }
      return list
    }
  }
}
</script>
<style lang="scss">
.role-container{

  .el-col{
    height: 100%;
    overflow: hidden;
  }

  .el-scrollbar .el-scrollbar__wrap{
    overflow-x: hidden;
  }

  .el-form-item{
    margin-bottom: 0;
  }

  .el-tree {
    min-width: 100%;
    display:inline-block !important;

    .el-checkbox__inner{
      border-radius: 50%;
    }
  }

  .is-indeterminate .el-checkbox__inner,
  .is-checked .el-checkbox__inner{
    background-color: #3F6AFF;
    border-color: #3F6AFF;
  }

  .car-table-header th{
    color: #1D2133;
    border-top: 1px solid #dfe6ec !important;
  }

  .function-table-end{
    border-right: 1px solid #dfe6ec !important;
  }

  .function-table-begin{
    border-left: 1px solid #dfe6ec !important;
  }

  // .function-table .el-table__body-wrapper tr:nth-last-child(1) td{
  //   border-bottom: 1px solid #dfe6ec !important;
  // }

  .el-table__body-wrapper{
    height: calc(100% - 42px);
  }

  .role-table .el-table td{
    border: none !important;
  }

  .el-table::before { // 去掉最下面的那一条线
    height: 0px;
  }

  .el-table__body .role-select{
    background-color: #E8F4FF;
  }
}
</style>
<style lang="scss" scoped>
.role-container{
  height: 450px;
  color: #1D2133;

  .bg{
    border-radius: 6px;
    padding: 30px;
    height: 100%;
  }

  p{
    margin: 0;
  }

  .title{
    font-size: 16px;
    font-weight: 550;
  }

  .f-l{
    float: left;
  }

  .f-r{
    float: right;
  }

  .role-wapper{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  .role-top{
    height: 30px;
  }

  .first-row{
    height: calc(100% - 40px);
    margin-top: 15px;

    .company{
      height: 97%;
      margin-top: 1.5%;
      box-shadow:0px 0px 20px 0px rgba(63,106,255,0.15);

      .auth-tree-title {
        text-indent: 27px;
        position: relative;
        font-size: 16px;
        font-weight: 550;
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
    }

    .function-table{
      width: 100%;
      height: 98%;
      position: relative;
    }
  }

  .company-tree{
    height: calc(100% - 50px);
    margin-top: 30px;
    overflow-y: auto;
  }

  .company-info-btn{
    margin-top: -8px;
  }
}
</style>

<template>
  <div class="structure-container default-container">
    <el-row :gutter="15" class="first-row">
      <el-col :span="5">
        <div class="company bg">
          <div class="company-title">
            <p class="title f-l">公司</p>
            <p class="p-btn f-r" :class="{'btn-disable': !companyDelBtn}" @click="deleteCompany()">删除</p>
            <p class="p-btn f-r" :class="{'btn-disable': !companyDelBtn}" @click="addCompany(1)">修改</p>
            <p class="p-btn f-r" @click="addCompany(0)">增加</p>
            <p class="p-btn f-r" :class="{'btn-disable': !companyDelBtn}" @click="authCompany()">授权</p>
          </div>
          <el-scrollbar class="company-tree">
            <el-tree
              ref="companyTree"
              :data="companyData"
              :props="defaultProps"
              node-key="companyId"
              highlight-current
              accordion
              @node-click="companyClick"
            >
            </el-tree>
          </el-scrollbar>
        </div>
        <div class="department bg">
          <div>
            <p class="title f-l">部门</p>
            <p class="p-btn f-r" @click="deleteDepartment()">删除</p>
            <p class="p-btn f-r" @click="addDepartment(1)">修改</p>
            <p class="p-btn f-r" @click="addDepartment(0)">增加</p>
          </div>
          <el-scrollbar class="company-tree">
            <el-tree
              ref="departmentTree"
              :data="departmentData"
              :props="{ children: 'children', label: 'name' }"
              node-key="id"
              highlight-current
              accordion
              @node-click="departmentClick"
            >
            </el-tree>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="user-info bg">
          <div>
            <p class="title f-l">账号信息</p>
            <p class="p-btn f-l" @click="deleteUser()">删除</p>
            <p class="p-btn f-l" @click="addUser(0)">增加</p>
          </div>
          <div class="user-table">
            <el-table
              ref="userTable"
              v-loading="userLoading"
              :data="userData"
              :row-key="userData.userId"
              max-height="100%"
              height="100%"
              style="width: 100%"
              header-row-class-name="car-table-header"
              row-class-name="car-table-item"
              highlight-current-row
            >
              <el-table-column type="selection" align="center" width="40" class-name="user-table-check"></el-table-column>
              <el-table-column prop="cusName" label="姓名" width="80"></el-table-column>
              <el-table-column prop="dept.name" label="部门" width="90"></el-table-column>
              <el-table-column prop="postName" label="职位" width="90"></el-table-column>
              <el-table-column prop="phone" label="手机号" width="110"></el-table-column>
              <el-table-column prop="username" label="账号" width="110"></el-table-column>
              <el-table-column prop="roleList[0].showName" label="角色" width="100"></el-table-column>
              <el-table-column label="操作" width="auto" class-name="user-table-btn">
                <template slot-scope="scope">
                  <p class="p-btn" style="margin-left:0;" @click="updateUserRole(scope)">修改角色</p>
                  <p class="p-btn" @click="updateUser(scope)">修改账号</p>
                  <p class="p-btn" @click="deleteUserById(scope)">删除账号</p>
                  <p class="p-btn" @click="resetPassword(scope)">重置密码</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="pageChange(arguments)" />
        </div>
        <div class="role-info bg">
          <div>
            <p class="title f-l">角色</p>
            <p class="p-btn f-l" @click="addRole()">增加</p>
          </div>
          <div class="role-table">
            <el-table
              ref="roleTable"
              v-loading="roleLoading"
              :data="roleData"
              :row-key="roleData.id"
              :show-header="false"
              height="100%"
              row-class-name="role-table-item"
              highlight-current-row
            >
              <el-table-column prop="showName" label="角色" width="100"></el-table-column>
              <el-table-column width="auto" fixed="right" class-name="user-table-btn">
                <template slot-scope="scope">
                  <p class="p-btn" style="margin-left:0;" @click="updateRole(scope.row)">修改</p>
                  <p class="p-btn" @click="deleteRole(scope.row)">删除</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showCompany" :title="addCompanyType === 0 ? '新增公司':'修改公司'" width="30%">
      <el-form v-if="showCompany" ref="addCompanyForm" :model="addCompanyForm" :rules="addCompanyRules" hide-required-asterisk label-width="80px" autocomplete="on" size="mini" class="add-company-dlg">
        <el-form-item v-if="addCompanyType === 1" label="原名称">
          <el-input v-model="addCompanyForm.oldName" :disabled="true" placeholder="原名称"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="addCompanyForm.name" clearable placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item v-if="addCompanyType === 0" label="负责人" prop="principal">
          <el-input v-model="addCompanyForm.principal" clearable placeholder="负责人姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="addCompanyType === 0" label="手机号" prop="mobile">
          <el-input v-model="addCompanyForm.mobile" clearable placeholder="负责人手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="cancelCompany">取消</el-button>
        <el-button round size="mini" type="primary" @click="submitCompany">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showDepartment" :title="addDepartmentType === 0 ? '新增部门':'修改部门'" width="30%">
      <el-form v-if="showDepartment" ref="addDepartmentForm" :model="addDepartmentForm" :rules="addDepartmentRules" hide-required-asterisk label-width="80px" autocomplete="on" size="mini" class="add-company-dlg">
        <el-form-item v-if="addDepartmentType === 1" label="原名称">
          <el-input v-model="addDepartmentForm.oldName" :disabled="true" placeholder="原名称"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addDepartmentForm.name" clearable placeholder="部门名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="cancelDepartment">取消</el-button>
        <el-button round size="mini" type="primary" @click="submitDepartment">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showUser" :title="addUserType === 0 ? '新增用户':'修改用户'" width="700px">
      <account v-if="showUser" :user-info="addUserInfo" @canceluser="showUser=false" @submituser="submitUser"></account>
    </el-dialog>
    <el-dialog :visible.sync="showUserRole" title="修改用户角色" width="300px">
      <el-form v-if="showUserRole" label-width="80px" hide-required-asterisk autocomplete="on" class="add-company-dlg" size="mini">
        <el-form-item label="角色名称">
          <el-dropdown type="primary" placement="bottom-start" plain @command="handleDD(...arguments)">
            <el-button class="el-dropdown-link">
              {{ userRoleForm.showName }}<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="role in roleData" :key="role.id" :command="role">{{ role.showName }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="cancelUserRole">取消</el-button>
        <el-button round size="mini" type="primary" @click="submitUserRole">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showRole" :title="addRoleType === 0 ? '新增角色':'修改角色'" width="80%">
      <role v-if="showRole" ref="roleDlg" :add-type="addRoleType" :role-id="addRoleId" :company-id="selectCompanyId" :role-name="addRoleName" @cancelrole="showRole=false" @submitrole="submitRole"></role>
    </el-dialog>
    <el-dialog :visible.sync="showAuth" title="子公司授权" width="750px" class="auth-dlg">
      <div v-if="showAuth" class="auth-wapper">
        <tree-transfer ref="treeTransfer" :select-company-id="selectCompanyId" :btn-status="1" @authend="authend"></tree-transfer>
        <el-button round size="mini" :loading="authLoading" class="auth-edit-btn el-button-default" @click="authSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { get, post, put, byDelete } from '@/api/axios'
import Pagination from '@/components/Pagination'
import Account from './components/account'
import Role from './components/role'
import TreeTransfer from './components/TreeTransfer'
import { mapGetters } from 'vuex'
import { validMobile } from '@/utils/validate'
export default {
  components: { Pagination, Account, TreeTransfer, Role },
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
      companyData: [],
      selectCompanyNode: null,
      companyDelBtn: false,
      showCompany: false,
      addCompanyForm: { name: '', oldName: '', principal: '', mobile: '' },
      addCompanyRules: { name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        principal: [{ required: true, message: '请输入负责人姓名', trigger: 'blur' }],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }]
      },
      addCompanyType: 0,
      defaultProps: {
        children: 'children',
        label: 'companyName'
      },
      showAuth: false,
      authLoading: false,
      selectCompanyId: 0,
      departmentData: [],
      showDepartment: false,
      addDepartmentForm: { name: '', oldName: '' },
      addDepartmentRules: { name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }] },
      addDepartmentType: 0,
      selectDepartmentNode: null,
      userData: [],
      showUser: false,
      addUserType: 0,
      addUserInfo: {
        uid: 0,
        type: 0,
        cpid: '',
        deptId: '',
        cusName: '',
        phone: '',
        postName: '',
        cusPassword: '',
        cusPic: ''
      },
      total: 0,
      userLoading: false,
      userSearchType: 0, // 0是公司  1是部门
      listQuery: {
        page: 1,
        limit: 5
      },
      showUserRole: false,
      userRoleForm: {
        id: 0,
        index: -1,
        showName: '',
        roleId: 0
      },
      roleLoading: false,
      roleData: [],
      showRole: false,
      addRoleId: 0,
      addRoleType: 0,
      addRoleName: ''
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.init()
  },
  methods: {
    init() { // 根据公司ID初始化公司树
      get('/company/' + this.companyId + '/tree', null).then(response => {
        if (response.status === 0) {
          this.companyData = response.data
        }
      })
    },
    companyClick: function(node, all) { // 公司树列表点击事件
      this.selectCompanyNode = node
      if (all.level === 1) {
        this.companyDelBtn = false
      } else {
        this.companyDelBtn = true
      }
      this.addCompanyForm.oldName = node.companyName
      this.showCompanyInfo(node)
    },
    showCompanyInfo(data) { // 点击公司显示该公司部门、角色、用户
      this.selectCompanyId = data.companyId
      this.getDepartmentInfo(data.companyId)
      this.getRoleInfo(data.companyId)
      this.getUserInfoByCompany(data.companyId, 1)
    },
    authCompany() { // 显示授权界面
      this.showAuth = true
    },
    authSave() { // 保存授权
      this.authLoading = true
      this.$refs.treeTransfer.saveAuth()
    },
    authend() { // 授权完成
      this.authLoading = false
      this.showAuth = false
    },
    deleteCompany: function() { // 删除公司
      if (this.selectCompanyNode === null) {
        this.$message({
          message: '请选择需要删除的公司',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.$confirm('是否删除公司"' + this.selectCompanyNode.companyName + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          byDelete('/company/' + this.selectCompanyNode.companyId, null).then(response => {
            if (response.status === 0) {
              this.$refs.companyTree.remove(this.selectCompanyNode)
              this.selectCompanyNode = null
              this.$message({
                message: '公司删除成功',
                type: 'success',
                duration: 3000
              })
            } else {
              this.$message({
                message: '删除失败，请稍后重试',
                type: 'warning',
                duration: 3000
              })
            }
          })
        }).catch(() => {

        })
      }
    },
    addCompany: function(type) { // 显示增加、修改公司界面
      this.addCompanyType = type
      if (type === 1) {
        if (this.selectCompanyNode === null) {
          this.$message({
            message: '请选择需要修改的公司',
            type: 'warning',
            duration: 3000
          })
          return
        }
      }
      this.showCompany = true
    },
    submitCompany: function() { // 增加、修改公司
      var that = this
      this.$refs.addCompanyForm.validate((valid) => {
        if (valid) {
          var company = {
            companyId: null,
            pid: null,
            companyName: this.addCompanyForm.name
          }
          if (this.addCompanyType === 0) {
            if (this.selectCompanyNode !== null) {
              company.pid = this.selectCompanyNode.companyId
            } else {
              company.pid = this.companyId
            }
            company.master = this.addCompanyForm.principal
            company.phone = this.addCompanyForm.mobile
            post('/company', company).then(response => {
              if (response.status === 0) {
                this.$message({
                  message: '公司添加成功',
                  type: 'success',
                  duration: 3000
                })
                this.$refs.companyTree.append(response.data, response.data.pid)
              } else {
                this.$message({
                  message: response.msg,
                  type: 'warning',
                  duration: 3000
                })
              }
              that.cancelCompany()
            })
          } else {
            company.companyId = this.selectCompanyNode.companyId
            company.headCpId = this.companyId
            put('/company', company).then(response => {
              if (response.status === 0) {
                this.companyData = response.data
                this.$message({
                  message: '公司修改成功',
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
              that.cancelCompany()
            })
          }
        } else {
          return
        }
      })
    },
    cancelCompany: function() { // 取消增加、修改公司
      this.showCompany = false
      this.$refs.addCompanyForm.resetFields()
    },
    getDepartmentInfo: function(companyId) { // 获取部门信息
      get('/dept/list/' + companyId, null).then(response => {
        if (response.status === 0) {
          this.departmentData = response.data
        }
      })
    },
    departmentClick: function(node) { // 部门树列表点击
      this.selectDepartmentNode = node
      this.addDepartmentForm.oldName = node.name
      this.getUserInfoByDepartment(node.id, 1)
    },
    addDepartment: function(type) { // 显示添加部门界面
      if (this.selectCompanyNode === null) {
        this.$message({
          message: '请选择需要添加部门的公司',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.addDepartmentType = type
        this.showDepartment = true
      }
    },
    deleteDepartment: function() { // 删除部门
      if (this.selectDepartmentNode === null) {
        this.$message({
          message: '请选择需要删除的部门',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.$confirm('是否删除部门"' + this.selectDepartmentNode.name + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          byDelete('/dept/' + this.selectDepartmentNode.id, null).then(response => {
            if (response.status === 0) {
              this.$refs.departmentTree.remove(this.selectDepartmentNode.id)
              this.selectDepartmentNode = null
              this.$message({
                message: '部门删除成功',
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
          })
        }).catch(() => {

        })
      }
    },
    getUserInfoByDepartment: function(departmentId, number) { // 根据部门id获取用户列表
      this.userLoading = true
      this.userSearchType = 1
      get('/user/page/dp' + departmentId, { size: this.listQuery.limit, page: number - 1 }).then(response => {
        this.userLoading = false
        if (response.status === 0) {
          this.total = response.data.totalElements
          this.userData = response.data.content
        }
      })
    },
    submitDepartment: function() { // 添加、修改部门
      var that = this
      this.$refs.addDepartmentForm.validate((valid) => {
        if (valid) {
          var department = {
            id: null,
            cpid: null,
            name: this.addDepartmentForm.name
          }
          if (this.addDepartmentType === 0) {
            department.cpid = this.selectCompanyNode.companyId
            post('/dept', department).then(response => {
              if (response.status === 0) {
                this.$message({
                  message: '部门添加成功',
                  type: 'success',
                  duration: 3000
                })
                this.$refs.departmentTree.append(response.data, 0)
              } else {
                this.$message({
                  message: '添加失败，请稍后重试',
                  type: 'warning',
                  duration: 3000
                })
              }
              that.cancelDepartment()
            })
          } else {
            put('/dept/' + this.selectDepartmentNode.id + '/' + this.selectCompanyNode.companyId + '/' + this.addDepartmentForm.name, null).then(response => {
              if (response.status === 0) {
                this.departmentData = response.data
                this.$message({
                  message: '部门修改成功',
                  type: 'success',
                  duration: 3000
                })
              } else {
                this.$message({
                  message: '添加失败，请稍后重试',
                  type: 'warning',
                  duration: 3000
                })
              }
              that.cancelDepartment()
            })
          }
        } else {
          return
        }
      })
    },
    cancelDepartment: function() { // 取消添加、修改部门
      this.showDepartment = false
      this.$refs.addDepartmentForm.resetFields()
    },
    addUser: function(type) { // 显示添加用户界面
      if (this.selectDepartmentNode === null) {
        this.$message({
          message: '请选择需要添加用户的部门',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.addUserInfo.cpid = this.selectCompanyNode.companyId
        this.addUserInfo.deptId = this.selectDepartmentNode.id
        this.addUserInfo.type = type
        this.addUserType = type
        this.showUser = true
      }
    },
    deleteUser: function() { // 批量删除用户
      var users = this.$refs.userTable.selection
      if (users.length > 0) {
        this.$confirm('确定删除勾选的用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var delList = []
          users.forEach(item => {
            delList.push(item.userId)
          })
          byDelete('/user/ids', delList).then(response => {
            if (response.status === 0) {
              this.$message({
                message: '用户删除成功',
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
          })
        })
      } else {
        this.$message({
          message: '请勾选需要删除的用户',
          type: 'warning',
          duration: 3000
        })
      }
    },
    updateUser: function(user) { // 显示修改用户界面
      this.addUserInfo.cpid = user.row.cpid
      this.addUserInfo.deptId = user.row.deptId
      this.addUserInfo.userId = user.row.userId
      this.addUserInfo.cusName = user.row.cusName
      this.addUserInfo.phone = user.row.phone
      this.addUserInfo.postName = user.row.postName
      this.addUserInfo.cusPic = user.row.cusPic
      this.addUserInfo.type = 1
      this.addUserType = 1
      this.showUser = true
    },
    handleDD: function(data) { // 角色下拉菜单
      this.userRoleForm.showName = data.showName
      this.userRoleForm.roleId = data.id
    },
    cancelUserRole: function() { // 修改角色取消
      this.userRoleForm.id = 0
      this.userRoleForm.index = -1
      this.userRoleForm.showName = ''
      this.userRoleForm.roleId = 0
      this.showUserRole = false
    },
    updateUserRole: function(user) { // 显示修改角色界面
      this.userRoleForm.id = user.row.userId
      this.userRoleForm.index = user.$index
      this.userRoleForm.showName = user.row.roleList.length > 0 ? user.row.roleList[0].showName : ''
      this.showUserRole = true
    },
    submitUserRole: function() { // 提交用户修改
      if (this.userRoleForm.roleId <= 0) {
        this.$message({
          message: '请选择角色',
          type: 'warning',
          duration: 3000
        })
      } else {
        put('/user/' + this.userRoleForm.id + '/' + this.userRoleForm.roleId, null).then(response => {
          if (response.status === 0) {
            if (this.userData[this.userRoleForm.index].roleList.length > 0) {
              this.userData[this.userRoleForm.index].roleList[0].showName = this.userRoleForm.showName
            } else {
              this.userData[this.userRoleForm.index].roleList.push({
                id: this.userRoleForm.roleId,
                showName: this.userRoleForm.showName
              })
            }
            this.$message({
              message: '用户角色修改成功',
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
          this.showUserRole = false
        })
      }
    },
    deleteUserById: function(user) { // 删除用户
      this.$confirm('确定删除用户"' + user.row.cusName + '"吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        byDelete('/user/' + user.row.userId, null).then(response => {
          if (response.status === 0) {
            this.$message({
              message: '用户"' + user.row.cusName + '"删除成功',
              type: 'success',
              duration: 3000
            })
            this.userData.splice(user.$index)
          } else {
            this.$message({
              message: response.msg,
              type: 'warning',
              duration: 3000
            })
          }
        })
      })
    },
    resetPassword: function(user) { // 重置密码
      this.$confirm('确定重置用户"' + user.row.cusName + '"的密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        put('/user/reset/' + user.row.userId, null).then(response => {
          if (response.status === 0) {
            this.$message({
              message: '用户"' + user.row.cusName + '"密码重置成功',
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
        })
      })
    },
    submitUser: function() { // 修改、添加用户后加载用户列表
      this.showUser = false
      if (this.userSearchType === 0) { // 公司
        this.getUserInfoByCompany(this.selectCompanyId, this.listQuery.page)
      } else {
        this.getUserInfoByDepartment(this.selectDepartmentNode.id, this.listQuery.page)
      }
    },
    getUserInfoByCompany: function(companyId, number) { // 根据公司id获取用户列表
      this.userLoading = true
      this.userSearchType = 0
      get('/user/page/cp' + companyId, { size: this.listQuery.limit, page: number - 1 }).then(response => {
        this.userLoading = false
        if (response.status === 0) {
          this.total = response.data.totalElements
          this.userData = response.data.content
        }
      })
    },
    pageChange: function(page) { // 用户列表翻页
      if (this.userSearchType === 0) { // 公司
        this.getUserInfoByCompany(this.selectCompanyId, page[0].page)
      } else {
        this.getUserInfoByDepartment(this.selectDepartmentNode.id, page[0].page)
      }
    },
    getRoleInfo: function(companyId) { // 获取角色列表
      this.roleLoading = true
      get('/role/list/' + companyId, null).then(response => {
        this.roleLoading = false
        if (response.status === 0) {
          this.roleData = response.data
        }
      })
    },
    addRole() { // 显示添加角色界面
      if (this.selectCompanyNode === null) {
        this.$message({
          message: '请选择需要添加角色的公司',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.addRoleType = 0
        this.addRoleId = 0
        this.addRoleName = ''
        this.showRole = true
      }
    },
    updateRole(data) { // 显示修改角色界面
      this.addRoleType = 1
      this.addRoleId = data.id
      this.addRoleName = data.showName
      this.showRole = true
    },
    deleteRole(data) { // 删除角色
      this.$confirm('确定删除角色"' + data.showName + '"吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        post('/role/del/' + data.id, null).then(response => {
          if (response.status === 0) {
            this.getRoleInfo(this.selectCompanyId)
            this.$message({
              message: '角色"' + data.showName + '"删除成功',
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
        })
      })
    },
    submitRole() { // 添加、修改角色后加载角色列表
      this.showRole = false
      this.getRoleInfo(this.selectCompanyId)
    }
  }
}
</script>
<style lang="scss">
.structure-container{
  .el-col{
    height: 100%;
    overflow: hidden;
  }

  .el-scrollbar .el-scrollbar__wrap{
    overflow-x: hidden;
  }

  .el-tree {
    min-width: 100%;
    display:inline-block !important;
  }

  .car-table-header th{
    color: #1D2133;
    border-top: 1px solid #dfe6ec !important;
  }

  .user-table-btn{
    border-right: 1px solid #dfe6ec !important;
  }

  .user-table-check{
    border-left: 1px solid #dfe6ec !important;
  }

  // .user-table .el-table__body-wrapper tr:nth-last-child(1) td{
  //   border-bottom: 1px solid #dfe6ec !important;
  // }

  .el-table__body-wrapper{
    height: calc(100% - 42px);
  }

  .role-table .el-table td{
    border: none !important;
  }

  .el-table::before,
  .el-table__fixed-right::before { // 去掉最下面的那一条线
    height: 0px !important;
  }

  .user-table .el-table{
    border: 1px solid #dfe6ec;
    border-top: none;
  }

  .el-dropdown{
    width: 100%;

    .el-dropdown-link{
      width: 100%;
      text-align: left;

      i{
        float: right;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.structure-container{
  color: #1D2133;

  .bg{
    background-color: #ffffff;
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

  .p-btn{
    text-decoration: underline;
    color: rgb(63, 106, 255);
    cursor: pointer;
    margin-left: 20px;
    display: inline-block;
  }

  .f-l{
    float: left;
  }

  .f-r{
    float: right;
  }

  .first-row{
    height: 100%;

    .company{
      height: 240px;
    }

    .department{
      margin-top: 15px;
      height: calc(100% - 255px);
    }

    .user-info{
      height: calc(100% - 260px);
    }

    .user-table{
      width: 100%;
      height: calc(100% - 60px);
      margin-top: 30px;
    }

    .role-info{
      margin-top: 15px;
      height: 245px;
    }

    .role-table{
      width: 100%;
      height: calc(100% - 30px);
      margin-top: 30px;
    }
  }

  .company-tree{
    height: calc(100% - 20px);
    margin-top: 40px;
    overflow-y: auto;
  }

  .company-info-btn{
    margin-top: -8px;
  }

  .add-company-dlg{
    width:90%;
    margin: auto;

    .el-form-item{
      margin-bottom: 20px;
    }
  }

  .dialog-footer{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0 15% 15px;
  }

  .auth-dlg{
    height: 100%;

    .auth-wapper{
      position: relative;
      height: 450px;

      .auth-edit-btn{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 5px;
        margin: auto;
      }
    }
  }
}
</style>

<template>
  <div class="glasys-container default-container">
    <el-row :gutter="15" class="first-row mini-form">
      <el-col :span="5">
        <div class="company bg">
          <div class="company-title">
            <p class="title f-l">公司</p>
            <p class="p-btn f-r" :class="{'btn-disable': !companyDelBtn}" @click="deleteCompany()">删除</p>
            <p class="p-btn f-r" :class="{'btn-disable': !isGalasys}" @click="addCompany(1)">增加子公司</p>
            <p class="p-btn f-r" @click="addCompany(0)">增加</p>
          </div>
          <el-scrollbar class="company-tree">
            <el-tree
              ref="companyTree"
              :data="companyData"
              :props="companyProps"
              node-key="companyId"
              highlight-current
              accordion
              @node-click="companyClick"
            >
            </el-tree>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="company-info bg">
          <el-form ref="companyForm" :model="companyForm" autocomplete="on" size="mini">
            <div class="company-title">
              <p class="title f-l">公司信息</p>
              <el-button round size="mini" class="el-button-default company-info-btn" @click="editCompanyInfo">{{ companyForm.btnName }}</el-button>
              <div v-if="companyForm.status===0" class="f-r license-time">
                许可时间
                <div>{{ companyForm.date[0] }}</div>
                至
                <div>{{ companyForm.date[1] }}</div>
              </div>
            </div>
            <el-row class="company-info-item">
              <el-col :span="3">
                <p class="lable">名称</p>
                <p class="lable">性质</p>
                <p class="lable">类型</p>
                <p v-if="companyForm.status===1" class="lable">许可时间</p>
              </el-col>
              <el-col v-if="companyForm.status===0" :span="11">
                <p>{{ companyForm.name }}</p>
                <p>{{ companyForm.nature }}</p>
                <p>{{ companyForm.type }}</p>
              </el-col>
              <el-col v-else :span="11" class="company-info-row1">
                <el-form-item>
                  <el-input v-model="companyForm.name" clearable placeholder="公司名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-dropdown type="primary" placement="bottom-start" plain @command="handleDD(1, ...arguments)">
                    <el-button class="el-dropdown-link">
                      {{ companyForm.nature }}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="nature in natureList" :key="nature.val" :command="nature">{{ nature.name }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
                <el-form-item>
                  <el-dropdown type="primary" placement="bottom-start" plain @command="handleDD(2, ...arguments)">
                    <el-button class="el-dropdown-link">
                      {{ companyForm.type }}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="type in typeList" :key="type.val" :command="type">{{ type.name }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    v-model="companyForm.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="center"
                    class="date-picker"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <p class="lable info-lable">负责人</p>
                <p class="lable info-lable">手机号</p>
                <p class="lable email">邮箱</p>
              </el-col>
              <el-col v-if="companyForm.status===0" :span="7">
                <p>{{ companyForm.principal }}</p>
                <p>{{ companyForm.mobile }}</p>
                <p>{{ companyForm.email }}</p>
              </el-col>
              <el-col v-else :span="7" class="company-info-row2">
                <el-form-item>
                  <el-input v-model="companyForm.principal" clearable placeholder="负责人"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="companyForm.mobile" maxlength="11" clearable placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="companyForm.email" clearable placeholder="邮箱"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="review bg">
          <div class="company-title">
            <p class="title f-l">审批 / 反审</p>
          </div>
          <div class="review-item">
            <div class="review-step">
              <div class="step-icon">
                <img :src="reviewCompanyStatus.firstAuditstatus > 0 ? reviewOk : reviewDefault">
              </div>
              <div class="step-line">
                <div></div>
                <div></div>
              </div>
              <div class="step-icon">
                <img :src="reviewCompanyStatus.secondAuditstatus > 0 ? reviewOk : reviewDefault">
              </div>
              <div class="step-line">
                <div></div>
                <div></div>
              </div>
              <div class="step-icon">
                <img :src="reviewCompanyStatus.thirdAuditstatus > 0 ? reviewOk : reviewDefault">
              </div>
            </div>
            <div class="step-btn">
              <div>
                <p class="lable">一级审批</p>
                <el-button v-if="reviewUser.auditorLevel === 1 && !isGalasys && selectCompanyId > 0" round size="mini" class="el-button-default" :disabled="reviewCompanyStatus.secondAuditstatus >= 0" @click="antiReview()">反审</el-button>
                <div style="height:5px;"></div>
                <el-button v-if="reviewUser.auditorLevel === 1 && !isGalasys && selectCompanyId > 0" round type="primary" size="mini" class="el-button-default" :disabled="getReviewDisable(1)" @click="review()">审批</el-button>
                <el-tooltip :content="'审批意见:' + reviewCompanyContent.first" placement="top">
                  <div class="review-status" :class="getReviewClass(reviewCompanyStatus.firstAuditstatus)">{{ reviewDic(reviewCompanyStatus.firstAuditstatus, 1) }}</div>
                </el-tooltip>
              </div>
              <div>
                <p class="lable">二级审批</p>
                <el-button v-if="reviewUser.auditorLevel === 2 && !isGalasys && selectCompanyId > 0" round size="mini" class="el-button-default" :disabled="reviewCompanyStatus.thirdAuditstatus >= 0" @click="antiReview()">反审</el-button>
                <div style="height:5px;"></div>
                <el-button v-if="reviewUser.auditorLevel === 2 && !isGalasys && selectCompanyId > 0" round type="primary" size="mini" class="el-button-default" :disabled="getReviewDisable(2)" @click="review()">审批</el-button>
                <el-tooltip :content="'审批意见:' + reviewCompanyContent.second" placement="top">
                  <div class="review-status" :class="getReviewClass(reviewCompanyStatus.secondAuditstatus)">{{ reviewDic(reviewCompanyStatus.secondAuditstatus, 2) }}</div>
                </el-tooltip>
              </div>
              <div>
                <p class="lable">三级审批</p>
                <el-button v-if="reviewUser.auditorLevel === 3 && !isGalasys && selectCompanyId > 0" round size="mini" class="el-button-default" @click="antiReview()">反审</el-button>
                <div style="height:5px;"></div>
                <el-button v-if="reviewUser.auditorLevel === 3 && !isGalasys && selectCompanyId > 0" round type="primary" size="mini" class="el-button-default" :disabled="getReviewDisable(3)" @click="review()">审批</el-button>
                <el-tooltip :content="'审批意见:' + reviewCompanyContent.third" placement="top">
                  <div class="review-status" :class="getReviewClass(reviewCompanyStatus.thirdAuditstatus)">{{ reviewDic(reviewCompanyStatus.thirdAuditstatus, 3) }}</div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="second-row">
      <el-col :span="5">
        <div class="company bg">
          <div class="company-title">
            <p class="title f-l">部门</p>
            <p class="p-btn f-r" :class="{'btn-disable': !isGalasys}" @click="addDepartment(1)">修改</p>
            <p class="p-btn f-r" :class="{'btn-disable': !isGalasys}" @click="deleteDepartment()">删除</p>
            <p class="p-btn f-r" :class="{'btn-disable': !isGalasys}" @click="addDepartment(0)">增加</p>
          </div>
          <el-scrollbar class="company-tree">
            <el-tree
              ref="departmentTree"
              :data="departmentData"
              :props="departmentProps"
              node-key="id"
              highlight-current
              accordion
              @node-click="departmentClick"
            >
            </el-tree>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="company bg user-wapper">
          <div class="company-title">
            <p class="title f-l">账号</p>
            <el-button round size="mini" :disabled="!isGalasys" :class="['company-info-btn', { 'el-button-default': isGalasys }]" @click="addUser(0)">增加</el-button>
          </div>
          <div class="user-table">
            <el-table
              v-loading="userLoading"
              :data="userList"
              :row-key="userList.id"
              border
              header-row-class-name="car-table-header"
              row-class-name="car-table-item"
              max-height="100%"
              height="100%"
            >
              <el-table-column prop="cusName" label="姓名" width="80" />
              <el-table-column prop="roleList[0].showName" label="角色" width="85" />
              <el-table-column label="操作" width="auto">
                <template slot-scope="scope">
                  <div class="modify-btn">
                    <p class="p-btn" :class="{'btn-disable': !isGalasys}" @click="updateUserRole(scope)">修改角色</p>
                    <p class="p-btn" :class="{'btn-disable': !isGalasys}" @click="updateUser(scope)">修改</p>
                    <p class="p-btn" :class="{'btn-disable': !isGalasys}" @click="resetPassword(scope)">重置密码</p>
                    <p class="p-btn" :class="{'btn-disable': !isGalasys}" @click="deleteUserById(scope)">删除</p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="company bg role-wapper">
          <div class="company-title">
            <p class="title f-l">角色</p>
            <el-button round size="mini" :disabled="!isGalasys" :class="['company-info-btn', { 'el-button-default': isGalasys }]" @click="addRole()">增加</el-button>
          </div>
          <div class="user-table">
            <el-table
              v-loading="roleLoading"
              :data="roleList"
              :row-key="roleList.id"
              border
              header-row-class-name="car-table-header"
              row-class-name="car-table-item"
              max-height="100%"
              height="100%"
            >
              <el-table-column prop="showName" label="角色" width="120" />
              <el-table-column label="操作" width="auto">
                <template slot-scope="scope">
                  <div class="modify-btn">
                    <p class="p-btn" :class="{'btn-disable': !isGalasys}" @click="updateRole(scope.row)">修改</p>
                    <p class="p-btn" :class="{'btn-disable': !isGalasys}" @click="deleteRole(scope.row)">删除</p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="company bg">
          <div class="company-title" style="height:30px;">
            <p class="title f-l">授权</p>
          </div>
          <div class="auth-wapper">
            <tree-transfer ref="treeTransfer" :select-company-id="selectCompanyId" :btn-status="authStatus" @authend="authLoading = false"></tree-transfer>
            <el-button round size="mini" :loading="authLoading" :disabled="authBtnStatus" :class="['company-info-btn', 'auth-edit-btn', { 'el-button-default': !authBtnStatus }]" @click="authEdit">{{ authBtnText }}</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showAddCompany" :title="addCompanyType === 0 ? '新增公司':'新增子公司'" width="730px" class="mini-form">
      <el-form v-if="showAddCompany" ref="addCompanyForm" :model="addCompanyForm" :rules="addCompanyRules" label-width="80px" hide-required-asterisk autocomplete="on" class="add-company-dlg" size="mini">
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="addCompanyForm.name" clearable placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item label="性质">
              <el-dropdown type="primary" placement="bottom-start" plain @command="handleDD(3, ...arguments)">
                <el-button class="el-dropdown-link">
                  {{ addCompanyForm.nature }}<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="nature in natureList" :key="nature.val" :command="nature">{{ nature.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-dropdown type="primary" placement="bottom-start" plain @command="handleDD(4, ...arguments)">
                <el-button class="el-dropdown-link">
                  {{ addCompanyForm.type }}<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="type in typeList" :key="type.val" :command="type">{{ type.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="许可时间" prop="companyName">
              <el-date-picker
                v-model="addCompanyForm.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="center"
                class="date-picker"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="principal">
              <el-input v-model="addCompanyForm.principal" clearable placeholder="负责人"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="addCompanyForm.mobile" maxlength="11" clearable placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addCompanyForm.email" type="email" clearable placeholder="邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="cancelCompany">取消</el-button>
        <el-button round size="mini" :loading="addCompanyLoading" type="primary" @click="submitCompany">确定</el-button>
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
    <el-dialog :visible.sync="showUserRole" title="修改用户角色" width="300px" class="mini-form">
      <el-form v-if="showUserRole" label-width="80px" hide-required-asterisk autocomplete="on" class="add-company-dlg" size="mini">
        <el-form-item label="角色名称">
          <el-dropdown type="primary" placement="bottom-start" plain @command="handleRoleDD(...arguments)">
            <el-button class="el-dropdown-link">
              {{ userRoleForm.showName }}<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="role in roleList" :key="role.id" :command="role">{{ role.showName }}</el-dropdown-item>
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
    <el-dialog :visible.sync="showReview" :title="reviewType === 0 ? '审批通过':'反审'" width="400px">
      <el-form v-if="showReview" label-width="80px" hide-required-asterisk autocomplete="off" class="add-company-dlg" size="mini">
        <el-form-item label="审批">
          <el-select v-model="reviewStatus" placeholder="请选择" style="width:100%;">
            <el-option label="通过" value="通过"></el-option>
            <el-option label="不通过" value="不通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input v-model="reviewText" type="textarea" placeholder="请输入审批意见" rows="3"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="cancelReview">取消</el-button>
        <el-button round :loading="reviewLoading" size="mini" type="primary" @click="submitReview">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, put, byDelete } from '@/api/axios'
import { validMobile, validEmail } from '@/utils/validate'
import { parseTime } from '@/utils'
import TreeTransfer from './components/TreeTransfer'
import Role from './components/role'
import Account from './components/account'
import ReviewOk from '@/assets/icon/icon_review_ok.png'
import ReviewDefault from '@/assets/icon/icon_review_default.png'
export default {
  components: { TreeTransfer, Role, Account },
  data() {
    const newDate = new Date()
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!validMobile(value)) {
        callback(new Error('手机号输入不正确!'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!validEmail(value)) {
        callback(new Error('邮箱格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      reviewUser: { // 审核用户信息
        id: 0,
        auditorId: 0,
        auditorName: '',
        auditorEmail: '',
        auditorLevel: 0
      },
      reviewType: 0, // 审核级别
      showReview: false, // 是否为审核人员
      reviewText: '', // 审核说明
      reviewStatus: '通过', // 审核状态
      isGalasys: false, // 是否为银科环企用户
      companyDelBtn: false, // 删除公司按钮状态
      selectCompanyNode: null, // 当前公司树列表选择节点
      selectCompanyId: 0, // 当前选择公司ID，选择客户子公司时为客户总公司ID
      selectLicenseId: 0, // 客户公司授权ID
      natureList: [], // 公司性质
      typeList: [], // 公司类别
      companyData: [], // 公司树列表
      companyProps: { children: 'children', label: 'companyName' },
      companyForm: { // 修改公司Form
        btnName: '编辑',
        status: 0,
        companyId: 0,
        name: '',
        principal: '',
        nature: '',
        natureId: 0,
        mobile: '',
        type: '',
        typeId: 0,
        email: '',
        date: ['', '']
      },
      showAddCompany: false, // 添加公司界面状态
      addCompanyType: 0, // 0 总公司 1子公司 只有galasys可以加子公司
      addCompanyForm: { // 添加公司Form
        name: '',
        principal: '',
        nature: '',
        natureId: 0,
        mobile: '',
        type: '',
        typeId: 0,
        email: '',
        licenseId: 0,
        date: [newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate(),
          (newDate.getFullYear() + 1) + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
        ]
      },
      addCompanyRules: { name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        principal: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        mobile: [{ required: true, validator: validateMobile, trigger: 'blur' }],
        email: [{ required: true, validator: validateEmail, trigger: 'blur' }]
      },
      addCompanyLoading: false, // 添加公司按钮Loading
      reviewOk: ReviewOk, // 审核通过图标
      reviewDefault: ReviewDefault, // 审核不通过和默认状态图标
      reviewCompanyStatus: { // 审核Form
        auditStatus: 0,
        id: 0,
        licenseEnd: '',
        licenseStart: '',
        firstAuditstatus: 0,
        secondAuditstatus: 0,
        thirdAuditstatus: 0,
        updateBy: null,
        updateDate: null
      },
      reviewCompanyContent: { // 公司树列表选中公司审核状态
        first: '',
        firstResult: 0,
        second: '',
        secondResult: 0,
        third: '',
        thirdResult: 0
      },
      departmentData: [], // 部门树列表
      departmentProps: { children: 'children', label: 'name' },
      showDepartment: false, // 添加、修改部门界面
      addDepartmentForm: { name: '', oldName: '' },
      addDepartmentRules: { name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }] },
      addDepartmentType: 0, // 0添加部门 1修改部门
      selectDepartmentNode: null, // 当前选中的部门
      userSearchType: 0, // 0是公司  1是部门
      userLoading: false, // 用户列表Loading
      userList: [], // 用户列表
      showUser: false, // 添加、修改用户界面
      addUserType: 0, // 0添加用户 1修改用户
      addUserInfo: { // 用户Form
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
      showUserRole: false, // 添加、修改角色界面
      userRoleForm: { // 角色Form
        id: 0,
        index: -1,
        showName: '',
        roleId: 0
      },
      roleLoading: false, // 角色列表Loading
      roleList: [], // 角色列表
      showRole: false, // 添加、修改角色
      addRoleId: 0, // 当前需要修改的角色ID
      addRoleType: 0, // 0添加角色 1修改角色
      addRoleName: '', // 角色名称
      authStatus: 0, // 授权按钮状态
      authBtnText: '编辑', // 授权按钮文字
      authBtnStatus: true, // 授权按钮状态
      authLoading: false, // 授权按钮Loading
      reviewLoading: false // 审批按钮Loading
    }
  },
  mounted() {
    this.init()
    this.initDDData()
  },
  methods: {
    init() {
      get('/company/tree', null).then(response => { // 加载所有公司树
        if (response.status === 0) {
          this.companyData = response.data
        }
      })

      get('/license/auditors', null).then(response => { // 获取审批人员列表
        if (response.status === 0) {
          const reviewUser = response.data.filter(item => {
            return item.auditorId === this.$store.state.user.uid && item.auditorLevel > 0
          })
          if (reviewUser.length > 0) {
            this.reviewUser = reviewUser[0]
          }
        }
      })
    },
    initDDData() { // 初始化公司性质、类型下拉菜单
      get('/company/const', null).then(response => {
        if (response.status === 0) {
          this.natureList = response.data.natures
          this.typeList = response.data.types
          this.addCompanyForm.nature = this.natureList[1].name
          this.addCompanyForm.natureId = this.natureList[1].val
          this.addCompanyForm.type = this.typeList[0].name
          this.addCompanyForm.typeId = this.typeList[0].val
        }
      })
    },
    reviewDic: function(status, type) { // 审批状态格式化
      let dic = ''
      let result = ''
      switch (type) {
        case 1:
          result = this.reviewCompanyContent.firstResult === 1 ? '通过' : '不通过'
          break
        case 2:
          result = this.reviewCompanyContent.secondResult === 1 ? '通过' : '不通过'
          break
        case 3:
          result = this.reviewCompanyContent.thirdResult === 1 ? '通过' : '不通过'
          break
        default:
          break
      }
      if (status > 0) {
        dic = '审批:' + result
      } else if (status < 0) {
        dic = '反审:' + result
      } else {
        dic = '待审核'
      }
      return dic
    },
    getReviewClass: function(status) { // 审批状态样式
      let className = ''
      if (status <= 0) {
        className = (status === 0 ? 'review-pending' : 'review-return')
      }
      return className
    },
    getReviewDisable: function(type) { // 获取审批按钮状态
      let d = false
      switch (type) {
        case 1:
          if (this.reviewCompanyStatus.secondAuditstatus === 1 && this.reviewCompanyContent.secondResult === 1) {
            d = true
          }
          break
        case 2:
          if (this.reviewCompanyContent.firstResult !== 1 || this.reviewCompanyStatus.thirdAuditstatus === 1 && this.reviewCompanyContent.thirdResult === 1) {
            d = true
          }
          break
        case 3:
          if (this.reviewCompanyContent.secondResult !== 1) {
            d = true
          }
          break
        default:
          break
      }
      return d
    },
    addCompany: function(type) { // 增加公司type 0 总公司 1子公司 只有galasys可以加子公司
      this.addCompanyType = type
      this.showAddCompany = true
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
              this.selectCompanyId = 0
              this.companyForm.btnName = '编辑'
              this.companyForm.status = 0
              this.companyForm.companyId = 0
              this.companyForm.name = ''
              this.companyForm.principal = ''
              this.companyForm.nature = ''
              this.companyForm.natureId = 0
              this.companyForm.mobile = ''
              this.companyForm.type = ''
              this.companyForm.typeId = 0
              this.companyForm.email = ''
              this.companyForm.licenseId = 0
              this.companyForm.date = ['', '']
              this.selectCompanyNode = null
              this.selectDepartmentNode = null
              this.userList = []
              this.roleList = []
              this.$message({
                message: '公司删除成功',
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
    getRootNode: function(node) { // 获取根节点
      if (node.level === 1) {
        return node.data
      } else {
        return this.getRootNode(node.parent)
      }
    },
    companyClick: function(node, all) { // 公司树点击事件
      this.selectCompanyNode = node
      if (node.companyId === 12) {
        this.companyDelBtn = false
        this.isGalasys = true
        this.showCompanyInfo(node)
      } else if (this.getRootNode(all).companyId === 12) {
        this.isGalasys = true
        this.companyDelBtn = true
        this.showCompanyInfo(node)
      } else if (node.pid > 0) {
        this.isGalasys = false
        this.companyDelBtn = false
        this.showCompanyInfo(this.getRootNode(all))
      } else {
        this.isGalasys = false
        this.companyDelBtn = true
        this.showCompanyInfo(node)
      }
    },
    showCompanyInfo: function(data) { // 显示公司信息
      this.selectCompanyId = data.companyId
      this.selectLicenseId = data.licenseId
      this.companyForm.companyId = data.companyId
      this.companyForm.name = data.companyName
      this.companyForm.principal = data.master
      this.companyForm.natureId = data.companyNature
      this.companyForm.nature = this.natureList.filter(function(item) {
        if (item.val === data.companyNature) {
          return item
        }
      })[0].name
      this.companyForm.mobile = data.phone
      this.companyForm.typeId = data.companyType
      this.companyForm.type = this.typeList.filter(function(item) {
        if (item.val === data.companyType) {
          return item
        }
      })[0].name
      this.companyForm.email = data.email
      this.companyForm.licenseId = data.licenseId
      this.companyForm.date = [data.sysLicense.licenseStart.split(' ')[0], data.sysLicense.licenseEnd.split(' ')[0]]
      this.reviewCompanyStatus = data.sysLicense
      console.log(data.sysLicense)
      if (data.companyId === 12) {
        this.authBtnStatus = false
      } else if (data.sysLicense.firstAuditstatus === 1 || data.sysLicense.secondAuditstatus === 1 || data.sysLicense.thirdAuditstatus === 1) {
        this.authBtnStatus = true
      } else {
        this.authBtnStatus = false
      }
      this.getDepartmentInfo(data.companyId)
      this.getRoleInfo(data.companyId)
      this.userSearchType = 0
      this.getUserInfoByCompany(data.companyId)
      this.getCompanyStatus(data.licenseId)
    },
    getCompanyStatus(lid) { // 获取公司审核信息
      get('/license/message/' + lid, null).then(response => {
        if (response.status === 0) {
          response.data.forEach(item => {
            if (item !== null) {
              switch (Math.abs(item.auditorLevel)) {
                case 1:
                  this.reviewCompanyContent.first = item.auditMsg
                  this.reviewCompanyContent.firstResult = item.auditResult
                  break
                case 2:
                  this.reviewCompanyContent.second = item.auditMsg
                  this.reviewCompanyContent.secondResult = item.auditResult
                  break
                case 3:
                  this.reviewCompanyContent.third = item.auditMsg
                  this.reviewCompanyContent.thirdResult = item.auditResult
                  break
                default:
                  break
              }
            }
          })
        }
      })
    },
    handleDD: function(type, data) { // 公司树列表点击事件
      switch (type) {
        case 1:
          this.companyForm.nature = data.name
          this.companyForm.natureId = data.val
          break
        case 2:
          this.companyForm.type = data.name
          this.companyForm.typeId = data.val
          break
        case 3:
          this.addCompanyForm.nature = data.name
          this.addCompanyForm.natureId = data.val
          break
        case 4:
          this.addCompanyForm.type = data.name
          this.addCompanyForm.typeId = data.val
          break
        default:
          break
      }
    },
    submitCompany: function() { // 添加公司
      var that = this
      this.$refs.addCompanyForm.validate((valid) => {
        if (valid) {
          var company = {
            pid: this.addCompanyType === 0 ? 0 : this.selectCompanyNode.companyId,
            companyName: this.addCompanyForm.name,
            companyNature: this.addCompanyForm.natureId,
            companyType: this.addCompanyForm.typeId,
            email: this.addCompanyForm.email,
            master: this.addCompanyForm.principal,
            phone: this.addCompanyForm.mobile,
            sysLicense: {
              licenseStart: parseTime(this.addCompanyForm.date[0], '{y}-{m}-{d} 00:00:00'),
              licenseEnd: parseTime(this.addCompanyForm.date[1], '{y}-{m}-{d} 23:59:59')
            }
          }
          this.addCompanyLoading = true
          post('/company', company).then(response => {
            if (response.status === 0) {
              this.addCompanyLoading = false
              this.$refs.companyTree.append(response.data, response.data.pid)
              this.$message({
                message: '公司添加成功',
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
        } else {
          return
        }
      })
    },
    cancelCompany: function() { // 取消添加公司
      this.showAddCompany = false
      var newDate = new Date() // 时间控件初始化
      this.addCompanyForm.date = [newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate(),
        (newDate.getFullYear() + 1) + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
      ]
      this.$refs.addCompanyForm.resetFields()
    },
    editCompanyInfo: function() { // 编辑公司
      if (this.companyForm.companyId <= 0) {
        this.$message({
          message: '请选择需要编辑的公司',
          type: 'warning',
          duration: 3000
        })
        return
      }

      if (this.companyForm.status === 0) {
        this.companyForm.btnName = '保存'
        this.companyForm.status = 1
      } else {
        var errMsg = ''
        if (this.companyForm.name === '') {
          errMsg = '请输入公司名称'
        } else if (this.companyForm.principal === '') {
          errMsg = '请输入负责人'
        } else if (this.companyForm.mobile === '') {
          errMsg = '请输入手机号'
        } else if (!validMobile(this.companyForm.mobile)) {
          errMsg = '手机号格式输入不正确'
        } else if (this.companyForm.email === '') {
          errMsg = '请输入邮箱'
        } else if (!validEmail(this.companyForm.email)) {
          errMsg = '邮箱格式输入不正确'
        }

        if (errMsg === '') {
          var company = {
            companyId: this.companyForm.companyId,
            companyName: this.companyForm.name,
            companyNature: this.companyForm.natureId,
            companyType: this.companyForm.typeId,
            email: this.companyForm.email,
            master: this.companyForm.principal,
            phone: this.companyForm.mobile,
            licenseId: this.companyForm.licenseId,
            sysLicense: {
              licenseStart: parseTime(this.companyForm.date[0], '{y}-{m}-{d}'),
              licenseEnd: parseTime(this.companyForm.date[1], '{y}-{m}-{d}')
            }
          }
          put('/company', company).then(response => {
            if (response.status === 0) {
              this.$message({
                message: '公司编辑成功',
                type: 'success',
                duration: 3000
              })
              this.companyData = response.data
              this.companyForm.btnName = '编辑'
              this.companyForm.status = 0
            } else {
              this.$message({
                message: response.msg,
                type: 'warning',
                duration: 3000
              })
            }
          })
        } else {
          this.$message({
            message: errMsg,
            type: 'warning',
            duration: 3000
          })
        }
      }
    },
    getDepartmentInfo: function(companyId) { // 获取部门树列表
      get('/dept/list/' + companyId, null).then(response => {
        if (response.status === 0) {
          this.departmentData = response.data
        }
      })
    },
    departmentClick: function(node) { // 部门树列表点击事件
      this.selectDepartmentNode = node
      this.addDepartmentForm.oldName = node.name
      this.userSearchType = 1
      this.getUserInfoByDepartment(node.id)
    },
    addDepartment: function(type) { // 显示添加、修改部门界面
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
              this.$refs.departmentTree.remove(this.selectDepartmentNode)
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
                  message: response.msg,
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
                  message: response.msg,
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
    getRoleInfo: function(companyId) { // 获取角色列表
      this.roleLoading = true
      get('/role/list/' + companyId, null).then(response => {
        this.roleLoading = false
        if (response.status === 0) {
          this.roleList = response.data
        }
      })
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
        this.addUserInfo.userId = 0
        this.addUserInfo.cusName = ''
        this.addUserInfo.phone = ''
        this.addUserInfo.postName = ''
        this.addUserInfo.cusPic = ''
        this.addUserInfo.type = type
        this.addUserType = type
        this.showUser = true
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
    handleRoleDD: function(data) { // 角色下拉菜单
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
    updateUserRole: function(user) { // 显示修改用户角色界面
      this.userRoleForm.id = user.row.userId
      this.userRoleForm.index = user.$index
      this.userRoleForm.showName = user.row.roleList.length > 0 ? user.row.roleList[0].showName : ''
      this.showUserRole = true
    },
    submitUserRole: function() { // 修改用户角色
      if (this.userRoleForm.roleId <= 0) {
        this.$message({
          message: '请选择角色',
          type: 'warning',
          duration: 3000
        })
      } else {
        put('/user/' + this.userRoleForm.id + '/' + this.userRoleForm.roleId, null).then(response => {
          if (response.status === 0) {
            if (this.userList[this.userRoleForm.index].roleList.length > 0) {
              this.userList[this.userRoleForm.index].roleList[0].showName = this.userRoleForm.showName
            } else {
              this.userList[this.userRoleForm.index].roleList.push({
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
            this.userList.splice(user.$index)
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
    submitUser: function() { // 添加、修改用户后获取用户列表
      this.showUser = false
      if (this.userSearchType === 0) { // 公司
        this.getUserInfoByCompany(this.selectCompanyId)
      } else {
        this.getUserInfoByDepartment(this.selectDepartmentNode.id)
      }
    },
    getUserInfoByCompany: function(companyId) { // 根据公司获取用户列表
      this.userLoading = true
      get('/user/list/cp' + companyId, null).then(response => {
        this.userLoading = false
        if (response.status === 0) {
          this.userList = response.data
        }
      })
    },
    getUserInfoByDepartment: function(departmentId) { // 根据部门获取用户列表
      this.userLoading = true
      get('/user/list/dp' + departmentId, null).then(response => {
        this.userLoading = false
        if (response.status === 0) {
          this.userList = response.data
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
    },
    authEdit: function() { // 授权
      if (this.authStatus === 0) {
        this.authStatus = 1
        this.authBtnText = '保存'
      } else {
        this.authStatus = 0
        this.authBtnText = '编辑'
        this.authLoading = true
        this.$refs.treeTransfer.saveAuth()
      }
    },
    review: function() { // 显示审批界面
      this.reviewType = 0
      this.reviewStatus = '通过'
      this.showReview = true
    },
    antiReview: function() { // 显示反审界面
      this.reviewType = 1
      this.reviewStatus = '通过'
      this.showReview = true
    },
    cancelReview: function() { // 取消审批
      this.reviewText = ''
      this.showReview = false
    },
    submitReview: function() { // 提交审批
      if (this.selectCompanyId !== 12) {
        const data = {
          'licenseId': this.selectLicenseId,
          'auditorId': this.$store.state.user.uid,
          'auditorName': this.reviewUser.auditorName,
          'auditorEmail': this.reviewUser.auditorEmail,
          'auditMsg': this.reviewText, // 审核意见
          'auditResult': this.reviewStatus === '通过' ? 1 : 0, // 审核是否通过 1=通过 0=不通过
          'auditorLevel': this.reviewUser.auditorLevel * (this.reviewType === 0 ? 1 : -1) // 审核级别 1=一审 2=二审 3=三审 -1=一级反审 -2=二级反审 -3=三级反审
        }
        this.reviewLoading = true
        post('/license/audit', data).then(response => {
          this.reviewLoading = false
          if (response.status === 0) {
            const companyLen = this.companyData.length
            for (var i = 0; i < companyLen; i++) {
              if (this.companyData[i].companyId === this.selectCompanyId) {
                switch (this.reviewUser.auditorLevel) {
                  case 1:
                    this.reviewCompanyContent.first = this.reviewText
                    this.reviewCompanyContent.firstResult = data.auditResult
                    this.companyData[i].sysLicense.firstAuditstatus = this.reviewType === 0 ? 1 : -1
                    break
                  case 2:
                    this.reviewCompanyContent.second = this.reviewText
                    this.reviewCompanyContent.secondResult = data.auditResult
                    this.companyData[i].sysLicense.secondAuditstatus = this.reviewType === 0 ? 1 : -1
                    break
                  case 3:
                    this.reviewCompanyContent.third = this.reviewText
                    this.reviewCompanyContent.thirdResult = data.auditResult
                    this.companyData[i].sysLicense.thirdAuditstatus = this.reviewType === 0 ? 1 : -1
                    break
                  default:
                    break
                }
              }
            }
            this.$message({
              message: (this.reviewType === 0 ? '审批' : '反审') + '成功',
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
          this.cancelReview()
        })
      }
    }
  }
}
</script>
<style lang="scss">
.glasys-container{
  .el-col{
    height: 100%;
    overflow: hidden;
  }

  .el-input{
    height: 32px;
    line-height: 32px;
  }

  .mini-form .el-form-item{
    margin-bottom: 0;
    height: 32px;

    .el-form-item__content{
      line-height: 32px;
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

    .el-date-editor input:nth-child(4){
      margin-left: 14px;
    }
  }

  .company-info-row1 .el-form-item{
    width: 90%;
  }

  .company-info-row2 .el-form-item{
    width: 100%;
  }

  .el-scrollbar .el-scrollbar__wrap{
    overflow-x: hidden;
  }

  .el-tree {
    min-width: 100%;
    display:inline-block !important;
  }

  .el-table__body-wrapper{
    height: calc(100% - 42px);
  }

  .el-select-dropdown__item.selected{
    color: #3F6AFF !important;
  }
}
</style>
<style lang="scss" scoped>
.glasys-container{
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

  .lable{
    font-size: 14px;
    font-weight: 550;
  }

  .p-btn{
    text-decoration: underline;
    color: rgb(63, 106, 255);
    cursor: pointer;
  }

  .f-l{
    float: left;
  }

  .f-r{
    float: right;
  }

  .date-picker{
    width: 100%;
    margin-left: 0px;
  }

  .company-info-btn{
    margin-left: 20px;
    margin-top: -8px;
  }

  .first-row{
    height: 220px;

    .license-time{
      background-color: #E7EDFF;
      color: #3F6AFF;
      height: 40px;
      line-height: 40px;
      margin-right: -30px;
      margin-top: -11px;
      position: relative;
      padding: 0 8px 0 40px;

      &::before{
        content: '';
        position: absolute;
        left: -20px;
        background-color: #fff;
        width: 40px;
        height: 40px;
        transform: rotate(-45deg);
      }

      div{
        display: inline-block;
        margin: 0 10px;
      }
    }

    .company-info-item{
      margin-top: 20px;

      p{
        height: 32px;
        line-height: 32px;
      }

      .email{
        text-indent: 28px;
      }

      .info-lable{
        text-indent: 14px;
      }
    }

    .review-item{
      padding: 5% 10% 5% 5%;

      .review-step{
        padding: 0 20px;
        margin-top: 10px;
        display: flex;

        & div{
          display: inline-block;

          img{
            height: 26px;
            width: 24px;
          }
        }

        .step-line{
          width: calc(100% - 112px);
          padding: 5px;

          & div{
            width: calc(50% - 2px);
            height: 2px;
            border-bottom: 2px dotted #5DD4AC;
            display: inline-block;
          }
        }
      }

      .step-btn{
        margin-top: 15px;
        display: flex;

        & div{
          width: 70px;
          text-align: center;
          position: relative;

          p{
            height: 30px;
          }
        }

        & div:nth-child(2){
          margin: 0 auto;
        }

        .review-status{
          position: absolute;
          font-size: 12px;
          right: -66px;
          top: -3px;
          border: 1px solid #5DD4AC;
          color: #5DD4AC;
          text-align: center;
          height: 20px;
          line-height: 20px;
          border-radius: 2px;
        }

        .review-pending{
          border-color: #C9CBD7;
          color: #C9CBD7;
        }

        .review-return{
          border-color: #FE706C;
          color: #FE706C;
        }
      }
    }
  }

  .second-row{
    margin-top: 15px;
    height: calc(100% - 235px);

    .user-wapper{
      height: 50%;
    }

    .user-table{
      margin-top: 10px;
      height: calc(100% - 32px);

      .user-el-table{
        height: 100%;
      }

      .modify-btn{
        width: 100%;

        p{
          float: left;
          margin-right: 5px;
        }
      }
    }

    .role-wapper{
      margin-top: 15px;
      height: calc(50% - 15px);
    }

    .auth-wapper{
      height: calc(100% - 30px);
      position: relative;

      .auth-edit-btn{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 5px;
        margin: auto;
      }
    }
  }

  .company-title p:nth-child(3),
  .company-title p:nth-child(2){
    margin-left: 19px;
  }

  .company-tree{
    height: calc(100% - 20px);
    margin-top: 40px;
    overflow-y: auto;
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
}
</style>

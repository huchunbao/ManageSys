<template>
  <div class="system-container default-container">
    <el-row :gutter="15" class="first-row">
      <el-col :span="5" class="first-col">
        <div class="bg">
          <div class="title">维修管理员设置</div>
          <div class="set-item">
            <span>{{ manager }}</span>
            <p class="p-btn f-r" @click="setPerson(1)">设置</p>
          </div>
        </div>
        <div class="bg">
          <div class="title">审核人员设置</div>
          <div class="review">
            <div class="review-item">
              <div class="item-title">承载量告警审核人</div>
              <div class="set-item">
                <span>{{ bearer }}</span>
                <p class="p-btn f-r" @click="setPerson(2)">设置</p>
              </div>
            </div>
            <div class="review-item">
              <div class="item-title">设备告警审核人</div>
              <div class="set-item">
                <span>{{ dev }}</span>
                <p class="p-btn f-r" @click="setPerson(3)">设置</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg">
          <div class="title">积分换算设置</div>
          <div class="integral">
            <el-input v-model="integral.count" oninput="value=value.replace(/[^\d]/g,'')" :disabled="integral.save" size="mini" class="integral-input"></el-input>
            <span>积分 = </span>
            <span> 1元</span>
          </div>
          <div class="integral-btn" style="display: flex;">
            <el-button round :class="{'integral-button' : integral.save}" size="mini" :disabled="!integral.save" @click="editIntegral()">编辑</el-button>
            <el-button round :class="{'integral-button' : !integral.save}" size="mini" :disabled="integral.save" @click="saveIntegral()">保存</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg h-full">
          <div class="title">地图点位类型设置</div>
          <div class="tabs">
            <div :class="['tab-item', {'tab-active' : tabIndex === 0}]" @click="changeTab(0)">设备</div>
            <div :class="['tab-item', {'tab-active' : tabIndex === 1}]" @click="changeTab(1)">场所</div>
            <div class="tab-btn">
              <i class="el-icon-plus" @click="addMapPoint()"></i>
              <i class="el-icon-minus" @click="deleteMapPoint()"></i>
            </div>
          </div>
          <div class="select-table tab-pane">
            <el-table
              v-if="tabIndex === 0"
              ref="devTable"
              :data="devData"
              :show-header="false"
              max-height="100%"
              height="100%"
              highlight-current-row
              @row-click="clickDev"
            >
              <el-table-column prop="name" width="100%"></el-table-column>
            </el-table>
            <el-table
              v-if="tabIndex === 1"
              ref="placeTable"
              :data="placeData"
              :show-header="false"
              max-height="100%"
              height="100%"
              highlight-current-row
              @row-click="clickPlace"
            >
              <el-table-column prop="name" width="100%"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="13">
        <div class="bg h-full">
          <div class="title">通知渠道方案模板设置</div>
          <div class="item-title">渠道通知模板</div>
          <div class="template">
            <div class="message-title channel-title">
              <span>渠道</span>
              <div class="tab-btn message-btn">
                <i class="el-icon-plus" @click="addChannel()"></i>
                <i class="el-icon-minus" @click="deleteChannel()"></i>
              </div>
            </div>
            <div class="message-title template-title">
              <span>模板</span>
              <div class="tab-btn message-btn">
                <el-button round :class="{'integral-button' : !templateSave}" :loading="channelEditLoading" size="mini" :disabled="templateSave" style="float: right;" @click="saveChannel">保存</el-button>
                <el-button round :class="{'integral-button' : templateSave}" size="mini" :disabled="!templateSave" style="margin-right: 15px; float: right;" @click="editChannel">编辑</el-button>
              </div>
            </div>
            <div class="select-table channel-wapper">
              <el-table
                ref="channelTable"
                :data="channelData"
                :show-header="false"
                max-height="100%"
                height="100%"
                highlight-current-row
                @row-click="clickChannel"
              >
                <el-table-column prop="wayName" width="100%"></el-table-column>
              </el-table>
            </div>
            <div class="template-wapper">
              <el-input v-model="channelText" type="textarea" :disabled="templateSave" :rows="5" placeholder="请设置模板内容"></el-input>
            </div>
          </div>
          <div class="plan-wapper">
            <div class="item-title plan">通知方案</div>
            <div class="tab-btn">
              <i class="el-icon-plus" @click="addPlan()"></i>
              <i class="el-icon-minus" @click="deletePlan()"></i>
            </div>
          </div>
          <div class="plan-item">
            <el-table
              ref="planTable"
              :data="planData"
              max-height="100%"
              border
              highlight-current-row
              header-row-class-name="car-table-header"
              row-class-name="car-table-item"
              @row-click="clickPlan"
            >
              <el-table-column width="30px"></el-table-column>
              <el-table-column prop="wayName" label="方案名称" width="auto"></el-table-column>
              <el-table-column :formatter="getPlanItem" label="渠道" width="auto"></el-table-column>
              <el-table-column label="方案名称" width="80px">
                <template slot-scope="scope">
                  <p class="p-btn" @click="updatePlan(scope)">设置</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showDlg" :title="dlgTitle" width="320px">
      <set-dialog v-if="showDlg" ref="setDialog" :show-name="dlgShowName" :list="dlgUserList" @canceldlg="showDlg=false" @submitdlg="submitDlg(arguments)"></set-dialog>
    </el-dialog>
    <el-dialog :visible.sync="showAddDlg" :title="dlgAddTitle" width="320px">
      <add-dialog v-if="showAddDlg" ref="setDialog" :add-text="addText" @canceldlg="showAddDlg=false" @submitdlg="submitAddDlg(arguments)"></add-dialog>
    </el-dialog>
    <el-dialog :visible.sync="showPlanDlg" :title="dlgPlanTitle" width="320px" class="plan-dlg">
      <el-select v-model="planValue" multiple placeholder="请选择">
        <el-option
          v-for="item in channelData"
          :key="item.id"
          :label="item.wayName"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button round size="mini" class="el-button-default" @click="showPlanDlg=false">取消</el-button>
        <el-button round :loading="planLoading" size="mini" type="primary" @click="submitPlan">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { get, post, put, byDelete } from '@/api/axios'
import SetDialog from './components/SetDialog'
import AddDialog from './components/AddDialog'
export default {
  components: { SetDialog, AddDialog },
  data() {
    return {
      companyId: this.$store.state.user.companyId, // 公司ID
      manager: '', // 维修管理员
      bearer: '', // 承载量告警审核人
      dev: '', // 设备告警审核人
      integral: { // 积分换算
        count: '',
        money: 1,
        save: true
      },
      showDlg: false, // 弹窗显示状态
      setType: 0, // 0 添加  1 需改
      dlgTitle: '', // 弹窗标题
      dlgShowName: '', // 弹窗label
      dlgUserList: [], // 人员列表
      tabIndex: 0, // 地图点位 0 设备  1 场所
      devData: [], // 设备地图点位
      placeData: [], // 场所地图点位
      selectDevRow: null, // 设备地图点位当前选中
      selectPlaceRow: null, // 场所地图点位当前选中
      templateSave: true, // 模板保存状态
      channelData: [], // 渠道列表
      selectChannelRow: null, // 渠道列表当前选中
      channelText: '', // 渠道模板内容
      channelEditStatus: true, // 渠道编辑状态
      channelEditLoading: false, // 渠道保存Loading
      planData: [], // 方案列表
      selectPlanRow: null, // 方案列表当前选中
      planValue: [], // 方案列表当前选中项的渠道
      showPlanDlg: false, // 添加方案界面显示状态
      dlgPlanTitle: '', // 添加方案标题
      planLoading: false, // 添加方案Loading
      showAddDlg: false, // 添加界面显示状态
      dlgAddTitle: '', // 添加界面标题
      addText: '', // 添加名称
      addType: 0 // 1设备 2场所 3渠道 4方案
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      get('/property/' + this.companyId, null).then(response => { // 维修员管理 承载量告警审核人 设备告警审核人 积分兑换
        if (response.status === 0) {
          this.manager = response.data.propValue
          response.data.forEach(item => {
            switch (item.propName) {
              case 'repair.clerk.name': // 维修人员
                this.manager = item.propValue
                break
              case 'alarm.load-volume.auditor.name': // 承载量审核
                this.bearer = item.propValue
                break
              case 'alarm.equipment.auditor.name': // 设备审核
                this.dev = item.propValue
                break
              case 'point.ratio': // 积分兑换
                this.integral.count = item.propValue
                break
              default:
                break
            }
          })
        }
      })
      this.initMapPoint() // 显示地图点位列表
      this.initChannel() // 显示渠道列表
      this.initPlan() // 显示通知方案列表
      get('/user/list/cp' + this.companyId, null).then(response => { // 所有人员
        if (response.status === 0) {
          this.dlgUserList = response.data
        }
      })
    },
    initMapPoint: function() {
      get('/mngpoint/point-type/' + this.companyId, null).then(response => { // 获取地图点位
        if (response.status === 0) {
          console.log(response.data)
          this.devData = []
          this.placeData = []
          if (response.data.length > 0) {
            response.data.forEach(item => {
              switch (item.typeProperties) {
                case 1:
                  break
                case 2:
                  this.placeData.push({
                    id: item.id,
                    name: item.typeName
                  })
                  break
                case 3:
                  this.devData.push({
                    id: item.id,
                    name: item.typeName
                  })
                  break
                case 4:
                  break
                default:
                  break
              }
            })
          }
        }
      })
    },
    initChannel: function() {
      get('/notify-template/' + this.companyId, null).then(response => { // 获取渠道通知模板
        if (response.status === 0) {
          this.channelData = response.data
        }
      })
    },
    initPlan: function() {
      get('/notify-scheme/' + this.companyId, null).then(response => { // 获取通知方案
        if (response.status === 0) {
          this.planData = response.data
        }
      })
    },
    getPlanItem: function(row, column) { // 获取通知方案渠道
      let plan = ''
      row.models.forEach(item => {
        plan += item.wayName + '+'
      })
      return plan.substring(0, plan.length - 1)
    },
    setPerson: function(type) { // 显示设置人员界面
      switch (type) {
        case 1:
          this.dlgTitle = '维修管理员设置'
          this.dlgShowName = this.manager
          break
        case 2:
          this.dlgTitle = '承载量告警审核人设置'
          this.dlgShowName = this.bearer
          break
        case 3:
          this.dlgTitle = '设备告警审核人设置'
          this.dlgShowName = this.dev
          break
        default:
          break
      }
      this.setType = type
      this.showDlg = true
    },
    submitDlg: function(data) { // 提交人员设置
      let url = ''
      switch (this.setType) {
        case 1:
          url = '/property/repair-clerk/name'
          break
        case 2:
          url = '/property/load-volume-auditor/name'
          break
        case 3:
          url = '/property/equip-auditor/name'
          break
        default:
          break
      }
      const user = {
        cpid: this.companyId,
        propValue: data[0].showName
      }
      put(url, user).then(response => {
        if (response.status === 0) {
          switch (this.setType) {
            case 1:
              this.manager = data[0].showName
              break
            case 2:
              this.bearer = data[0].showName
              break
            case 3:
              this.dev = data[0].showName
              break
            default:
              break
          }
          this.$message({
            message: '人员设置成功',
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
        this.showDlg = false
      })
    },
    editIntegral: function() { // 积分设置状态
      this.integral.save = false
    },
    saveIntegral: function() { // 保存积分修改
      if (this.integral.count === '') {
        this.$message({
          message: '请输入积分',
          type: 'warning',
          duration: 3000
        })
      } else {
        put('/property/' + this.companyId + '/point-ratio?ratio=' + this.integral.count, null).then(response => {
          if (response.status === 0) {
            this.$message({
              message: '积分保存成功',
              type: 'success',
              duration: 3000
            })
            this.integral.save = true
          } else {
            this.$message({
              message: response.msg,
              type: 'warning',
              duration: 3000
            })
          }
        })
      }
    },
    changeTab: function(index) { // 地图点位tab切换
      this.tabIndex = index
      if (this.tabIndex === 0) {
        this.selectPlaceRow = null
      } else {
        this.selectDevRow = null
      }
    },
    clickDev: function(row) { // 设备地图点位点击事件
      this.selectDevRow = row
    },
    clickPlace: function(row) { // 场所地图点位点击事件
      this.selectPlaceRow = row
    },
    addMapPoint: function() { // 显示添加点位界面
      this.addType = this.tabIndex + 1
      this.dlgAddTitle = '地图点位添加' + (this.tabIndex === 0 ? '(设备)' : '(场所)')
      this.addText = '点位'
      this.showAddDlg = true
    },
    deleteMapPoint: function() { // 删除地图点位
      let row = null
      if (this.tabIndex === 0) {
        row = this.selectDevRow
      } else {
        row = this.selectPlaceRow
      }
      if (row === null) {
        this.$message({
          message: '请选择需要删除的地图点位',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.$confirm('是否删除地图点位"' + row.name + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          byDelete('/mngpoint/delPointType?id=' + row.id, null).then(response => {
            if (response.status === 0) {
              this.$message({
                message: '地图点位删除成功',
                type: 'success',
                duration: 3000
              })
              if (this.tabIndex === 0) {
                this.devData.some((item, i) => {
                  if (item.id === row.id) {
                    this.devData.splice(i, 1)
                    return true
                  }
                })
                this.selectDevRow = null
              } else {
                this.placeData.some((item, i) => {
                  if (item.id === row.id) {
                    this.placeData.splice(i, 1)
                    return true
                  }
                })
                this.selectPlaceRow = null
              }
            } else {
              this.$message({
                message: response.msg,
                type: 'warning',
                duration: 3000
              })
            }
          })
        })
      }
    },
    submitAddDlg: function(data) { // 提交添加
      let url = ''
      const form = {
        cpid: this.companyId
      }
      switch (this.addType) {
        case 1:
          url = '/mngpoint/savePointType' // 地图设备
          form.typeProperties = 3
          form.typeName = data[0]
          break
        case 2:
          url = '/mngpoint/savePointType' // 地图场所
          form.typeProperties = 2
          form.typeName = data[0]
          break
        case 3:
          url = '/notify-template' // 模板
          form.wayName = data[0]
          form.content = ''
          break
        case 4:
          url = '/notify-scheme' // 方案
          form.wayName = data[0]
          break
        default:
          break
      }
      post(url, form).then(response => {
        if (response.status === 0) {
          this.$message({
            message: this.addText + '添加成功',
            type: 'success',
            duration: 3000
          })
          switch (this.addType) {
            case 1:
            case 2:
              this.initMapPoint()
              break
            case 3:
              this.initChannel()
              break
            case 4:
              this.initPlan()
              break
            default:
              break
          }
          this.showAddDlg = false
        } else {
          this.$message({
            message: response.msg,
            type: 'warning',
            duration: 3000
          })
        }
      })
    },
    addChannel: function() { // 显示添加渠道界面
      this.addType = 3
      this.dlgAddTitle = '渠道通知模板添加'
      this.addText = '渠道'
      this.showAddDlg = true
    },
    deleteChannel: function() { // 删除渠道
      if (this.selectChannelRow === null) {
        this.$message({
          message: '请选择需要删除的渠道',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.$confirm('是否删除渠道"' + this.selectChannelRow.wayName + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          byDelete('/notify-template/' + this.selectChannelRow.id, null).then(response => {
            if (response.status === 0) {
              this.$message({
                message: '渠道"' + this.selectChannelRow.wayName + '"删除成功',
                type: 'success',
                duration: 3000
              })
              this.channelData.some((item, i) => {
                if (item.id === this.selectChannelRow.id) {
                  this.channelData.splice(i, 1)
                  return true
                }
              })
              this.selectChannelRow = null
              this.channelText = ''
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
    clickChannel: function(row) { // 点击渠道
      this.selectChannelRow = row
      this.channelText = row.content
    },
    editChannel: function() { // 编辑渠道内容
      if (this.selectChannelRow === null) {
        this.$message({
          message: '请选择需要编辑的渠道',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.templateSave = false
      }
    },
    saveChannel: function() { // 保存渠道内容
      if (this.channelText === '') {
        this.$message({
          message: '请输入模板内容',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.channelEditLoading = true
        put('/notify-template', { id: this.selectChannelRow.id, content: this.channelText }).then(response => {
          if (response.status === 0) {
            this.$message({
              message: '模板修改成功',
              type: 'success',
              duration: 3000
            })
            this.selectChannelRow.content = this.channelText
            this.templateSave = true
            this.channelEditLoading = false
          } else {
            this.$message({
              message: response.msg,
              type: 'warning',
              duration: 3000
            })
          }
        })
      }
    },
    addPlan: function() { // 显示添加方案界面
      this.addType = 4
      this.dlgAddTitle = '通知方案添加'
      this.addText = '方案'
      this.showAddDlg = true
    },
    clickPlan: function(row) { // 点击方案列表
      this.selectPlanRow = row
    },
    deletePlan: function() { // 删除方案
      if (this.selectPlanRow === null) {
        this.$message({
          message: '请选择需要删除的方案',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.$confirm('是否删除方案"' + this.selectPlanRow.wayName + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          byDelete('/notify-scheme/' + this.selectPlanRow.id, null).then(response => {
            if (response.status === 0) {
              this.$message({
                message: '方案"' + this.selectPlanRow.wayName + '"删除成功',
                type: 'success',
                duration: 3000
              })
              this.planData.some((item, i) => {
                if (item.id === this.selectPlanRow.id) {
                  this.planData.splice(i, 1)
                  return true
                }
              })
              this.selectPlanRow = null
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
    updatePlan: function(row) { // 修改方案渠道
      this.dlgPlanTitle = row.row.wayName + '渠道设置'
      row.row.models.forEach(item => {
        this.planValue.push(item.id)
      })
      this.showPlanDlg = true
    },
    submitPlan: function() { // 提交方案渠道
      if (this.planValue.length <= 0) {
        this.$message({
          message: '请选择渠道',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.planLoading = true
        const form = {
          id: this.selectPlanRow.id,
          models: []
        }
        this.planValue.forEach(item => {
          form.models.push({ id: item })
        })
        put('/notify-scheme', form).then(response => {
          if (response.status === 0) {
            this.$message({
              message: '方案设置成功',
              type: 'success',
              duration: 3000
            })
            this.selectPlanRow = null
            this.planValue = []
            this.planLoading = false
            this.initPlan()
            this.showPlanDlg = false
          } else {
            this.$message({
              message: response.msg,
              type: 'warning',
              duration: 3000
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.system-container{
  .el-col{
    height: 100%;
    overflow: hidden;
  }

  .integral{
    .el-input__inner{
      padding: 0 5px;
    }
  }

  .integral-button{
    color: #3f6aff;
    border-color: #3f6aff;
  }

  .el-table__body-wrapper{
    height: calc(100% - 42px);

    .el-table__body{
      width: 100% !important;
    }
  }

  .tab-pane{
    .el-table{
      background-color: #F6F8FE;

      tr{
        background-color: #F6F8FE;
      }
    }
  }

  .el-table__body tr.current-row>td{
    background-color: transparent !important;
    color: #3F6AFF;
  }

  .select-table .el-table{
    &::before { // 去掉最下面的那一条线
      height: 0px;
    }

    tr{
      cursor: pointer;
    }

    td{
      padding: 4px 0;
      border: none !important;
    }
  }

  .el-table__empty-block{
    width: 100% !important;
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

  .plan-dlg .el-dialog__body{
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
.system-container{
  color: #1D2133;

  .bg{
    background-color: #ffffff;
    border-radius: 6px;
    padding: 25px;
    position: relative;
    overflow: hidden;
  }

  p{
    margin: 0;
  }

  .title{
    font-size: 16px;
    font-weight: 550;
    height: 30px;
  }

  .item-title{
    text-indent: 20px;
    position: relative;
    margin-bottom: 15px;
  }

  .item-title::before {
    content: '';
    position: absolute;
    left: 0;
    width: 7px;
    height: 16px;
    background: rgba(63, 106, 255, 1);
    border-radius: 4px;
  }

  .p-btn{
    text-decoration: underline;
    color: rgb(63, 106, 255);
    cursor: pointer;
  }

  .f-r{
    float: right;
  }

  .h-full{
    height: 100%;
  }

  .first-row{
    height: 100%;
  }

  .first-col{
    display: flex;
    flex-direction: column;

    & > div:not(:first-child){
      margin-top: 10px;
    }

    & > div:nth-child(1){
      height: 25%;
    }

    & > div:nth-child(2){
      height: 40%;
    }

    & > div:nth-child(3){
      height: 35%;
    }

    .set-item{
      height: 30px;
      line-height: 30px;
      width: 100%;
      border: 1px solid #C3C6D1;
      border-radius: 4px;
      padding: 0 20px;
      margin-top: 15px;
    }

    .review{
      display: flex;
      flex-direction: column;
      height: calc(100% - 30px);

      .review-item{
        margin: auto 0;
      }
    }

    .integral{
      margin: 20px 0;

      .integral-input{
        width: 30%;
      }
    }
  }

  .tabs{
    height: 30px;
    width: 100%;
    margin-top: 20px;

    .tab-item{
      height: 30px;
      width: 80px;
      line-height: 30px;
      text-align: center;
      border-radius: 4px 4px 0 0;
      display: inline-block;
    }

    .tab-active{
      color: #3f6aff;
      background-color: #E0E8FE;
    }
  }

  .tab-btn{
    float: right;
    height: 30px;
    line-height: 30px;

    i{
      color: #3f6aff;
      font-weight: bolder;
      cursor: pointer;
      font-size: 18px;
    }

    & i:nth-child(1){
      margin-right: 15px;
    }
  }

  .tab-pane{
    height: calc(100% - 80px);
    width: 100%;
    background-color: #F6F8FE;
    padding: 30px;
  }

  .message-title{
    height: 40px;
    line-height: 40px;
    float: left;
    padding: 0 30px;
    background-color: #EDEFF8;
  }

  .message-btn{
    margin-top: 6px;
  }

  .template{
    width: 100%;
    height: 35%;

    .channel-title{
      width: 40%;
      border: 1px solid #E0E7E9;
    }

    .template-title{
      width: 60%;
      border: 1px solid #E0E7E9;
      border-left: none;
    }

    .channel-wapper{
      width: 40%;
      height: calc(100% - 40px);
      border: 1px solid #E0E7E9;
      float: left;
      border-top: none;
      padding-left: 20px;
    }

    .template-wapper{
      width: 60%;
      height: calc(100% - 40px);
      border-right: 1px solid #E0E7E9;
      border-bottom: 1px solid #E0E7E9;
      float: left;
      padding: 10px 25px;
    }
  }

  .plan-wapper{
    height: 30px;
    margin-top: 30px;

    .plan{
      float: left;
      margin-top: 8px;
    }
  }

  .plan-item{
    height: calc(65% - 121px);
  }

  .dialog-footer{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0 15%;
  }
}
</style>

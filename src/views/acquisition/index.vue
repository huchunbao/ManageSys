<template>
  <div class="acquisition-container default-container">
    <el-row :gutter="15" class="first-row">
      <el-col :span="5">
        <div class="company bg">
          <div class="company-title">
            <p class="title f-l">公司</p>
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
        <div class="platform bg">
          <div>
            <p class="title f-l">数据采集</p>
            <p v-if="$store.state.permission.buttons.includes('数据采集:删除')" class="p-btn f-r" @click="deleteCollect">删除</p>
            <p v-if="$store.state.permission.buttons.includes('数据采集:增加')" class="p-btn f-r" @click="showDialog = true">增加</p>
          </div>
          <el-scrollbar class="company-tree">
            <el-tree
              ref="collectionTree"
              :data="collectionData"
              :props="{ children: 'children', label: 'collectionName' }"
              node-key="id"
              highlight-current
              accordion
              @node-click="collectionClick"
            >
            </el-tree>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="bg">
          <data-wapper ref="dataPage" :wapper-type="0" :child-sys-list="childSysList" @update="updateCollection(arguments)"></data-wapper>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showDialog" top="10vh" title="添加数据采集" width="450px" class="data-dlg">
      <data-wapper v-if="showDialog" ref="dataDialog" :wapper-type="1" :child-sys-list="childSysList" :child-sys-text="childSysText" @cancel="showDialog=false" @add="addCollection(arguments)"></data-wapper>
    </el-dialog>
  </div>
</template>
<script>
import { get, post, put, byDelete } from '@/api/axios'
import { mapGetters } from 'vuex'
import DataWapper from './components/DataWapper'
export default {
  components: { DataWapper },
  data() {
    return {
      companyData: [],
      selectCompanyNode: null,
      defaultProps: {
        children: 'children',
        label: 'companyName'
      },
      collectionData: [],
      childSysList: [],
      childSysText: '',
      selectCollectionNode: null,
      showDialog: false,
      dataForm: {
        name: '',
        company: '',
        childSys: '',
        childId: 0,
        server: '',
        username: '',
        password: '',
        protocol: '',
        coding: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      get('/company/' + this.companyId + '/tree', null).then(response => { // 获取公司
        if (response.status === 0) {
          this.companyData = response.data
          this.companyData[0].children = [] // 只显示当前公司，不显示子公司
        }
      })
      this.initCollection()
      get('/subsystem/list-all', null).then(response => { // 获取子系统
        if (response.status === 0) {
          this.childSysList = response.data
          this.childSysText = this.childSysList[0].name
        }
      })
    },
    initCollection() {
      get('/data-collection/list/' + this.companyId, null).then(response => { // 数据采集列表
        if (response.status === 0) {
          this.collectionData = response.data
        }
      })
    },
    companyClick(node, all) {

    },
    addCollection(data) { // 添加数据采集
      const form = {
        cpid: this.companyId,
        subsystemId: data[0].childId,
        collectionName: data[0].name,
        shopName: data[0].company,
        ip: data[0].server,
        name: data[0].username,
        password: data[0].password,
        protocolType: data[0].protocol,
        contents: data[0].coding,
        describes: data[0].remark
      }
      post('/data-collection', form).then(response => {
        if (response.status === 0) {
          this.$refs.dataDialog.loading = false
          this.$message({
            message: '数据采集添加成功',
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
        this.initCollection()
        this.showDialog = false
      })
    },
    collectionClick(node) { // 数据列表点击显示
      this.selectCollectionNode = JSON.parse(JSON.stringify(node))
      this.$refs.dataPage.collectionForm.id = this.selectCollectionNode.id
      this.$refs.dataPage.collectionForm.name = this.selectCollectionNode.collectionName
      this.$refs.dataPage.collectionForm.company = this.selectCollectionNode.shopName
      this.$refs.dataPage.collectionForm.childSys = this.selectCollectionNode.subSystem.name
      this.$refs.dataPage.collectionForm.childId = this.selectCollectionNode.subsystemId
      this.$refs.dataPage.collectionForm.server = this.selectCollectionNode.ip
      this.$refs.dataPage.collectionForm.username = this.selectCollectionNode.name
      this.$refs.dataPage.collectionForm.password = this.selectCollectionNode.password
      this.$refs.dataPage.collectionForm.protocol = this.selectCollectionNode.protocolType
      this.$refs.dataPage.collectionForm.coding = this.selectCollectionNode.contents
      this.$refs.dataPage.collectionForm.remark = this.selectCollectionNode.describes
    },
    deleteCollect() { // 删除数据采集
      if (this.selectCollectionNode === null) {
        this.$message({
          message: '请选择需要删除的数据采集',
          type: 'warning',
          duration: 3000
        })
      } else {
        this.$confirm('是否删除"' + this.selectCollectionNode.collectionName + '"', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          byDelete('/data-collection/' + this.selectCollectionNode.id, null).then(response => {
            if (response.status === 0) {
              this.$refs.collectionTree.remove(this.selectCollectionNode)
              this.$refs.dataPage.btnSave = false
              this.$refs.dataPage.$refs.collectionForm.resetFields()
              this.selectCollectionNode = null
              this.$message({
                message: '数据采集删除成功',
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
      }
    },
    updateCollection(data) { // 修改数据采集
      const form = {
        id: this.selectCollectionNode.id,
        subsystemId: data[0].childId,
        subSystem: {
          id: data[0].childId,
          name: data[0].childSys
        },
        collectionName: data[0].name,
        shopName: data[0].company,
        ip: data[0].server,
        name: data[0].username,
        password: data[0].password,
        protocolType: data[0].protocol,
        contents: data[0].coding,
        describes: data[0].remark
      }
      put('/data-collection', form).then(response => {
        if (response.status === 0) {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 3000
          })
          const len = this.collectionData.length
          for (let i = 0; i < len; i++) {
            if (this.collectionData[i].id === this.selectCollectionNode.id) {
              this.collectionData[i].collectionName = form.collectionName
              this.collectionData[i].shopName = form.shopName
              this.collectionData[i].subSystem.name = form.subSystem.name
              this.collectionData[i].subSystem.id = form.subsystemId
              this.collectionData[i].subsystemId = form.subsystemId
              this.collectionData[i].ip = form.ip
              this.collectionData[i].name = form.name
              this.collectionData[i].password = form.password
              this.collectionData[i].protocolType = form.protocolType
              this.collectionData[i].contents = form.contents
              this.collectionData[i].describes = form.describes
            }
          }
          this.$refs.dataPage.loading = false
          this.$refs.dataPage.btnSave = false
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
</script>
<style lang="scss">
.acquisition-container{
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

  .data-dlg .el-dialog__body{
    text-align: center;
    padding-bottom: 50px;
  }
}
</style>
<style lang="scss" scoped>
.acquisition-container{
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

    .company-tree{
      height: calc(100% - 20px);
      margin-top: 40px;
      overflow-y: auto;
    }

    .platform{
      margin-top: 15px;
      height: calc(100% - 255px);
    }

    .collection{
      width: 350px;
    }
  }
}
</style>

<template>
  <div class="property-wrapper">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :key="item.name" ref="tabItem" :label="item.name" :name="item.name">
        <div class="property-template">今年已投入的资产
          <table-template :id="item.name + 'table1'" ref="propertyTable1" :table-name="item.name + 'table1'" class="property-table" :head-list="headList.table1" height="400px" width="100%" />
        </div>
        <div class="property-template">今年已消耗/报废的资产
          <table-template :id="item.name + 'table2'" ref="propertyTable2" :table-name="item.name + 'table2'" class="property-table" :head-list="headList.table1" height="400px" width="100%" />
        </div>
        <div class="property-template">各类资产数量、金额占比
          <ring-chart v-if="activeName===item.name" :id="item.name + 'chart1'" :nesting="true" :chart-data="chartList" width="100%" style="margin-top:50px;" />
        </div>
        <div class="property-template">超过千元的资产清单
          <table-template :id="item.name + 'table3'" ref="propertyTable3" :table-name="item.name + 'table3'" class="property-table" :head-list="headList.table2" height="400px" width="100%" />
        </div>
      </el-tab-pane>
    </el-tabs> -->
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="property-template template-left">今年已投入资产金额统计
          <table-template id="propertytable1" ref="propertyTable1" table-name="propertytable1" class="property-table" :head-list="headList.table1" width="100%" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="property-template template-right">今年已消耗/报废资产金额资产
          <table-template id="propertytable2" ref="propertyTable2" table-name="propertytable2" class="property-table" :head-list="headList.table1" width="100%" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="property-template template-left template-height">今年资产投入金额占比
          <ring-chart id="propertychart1" :chart-data="chartList" chart-type="资产统计" width="90%" height="300px" style="margin:10px 5% 0;" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="property-template template-right template-height">今年已投入超过千元的资产清单
          <table-template id="propertytable3" ref="propertyTable3" table-name="propertytable3" class="property-table" :head-list="headList.table2" height="300px" width="100%" @pageChange="pageChange(arguments)" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getListByGet } from '@/api/car'
import TableTemplate from '@/components/Table/index'
import RingChart from '@/components/Charts/RingChart'

export default {
  name: 'Property',
  components: { TableTemplate, RingChart },
  data() {
    return {
      activeName: '全部景区',
      tabList: [{ id: 0, name: '全部景区' }, { id: 1, name: 'A景区' }, { id: 2, name: 'B景区' }],
      headList: {
        table1: [{ label: '类别', prop: 'typeName', width: 'auto' },
          { label: '总金额(元)', prop: 'money', width: 'auto' }
        ],
        table2: [{ label: '名称', prop: 'assetName', width: 'auto' },
          { label: '类别', prop: 'typeName', width: 'auto' },
          { label: '单价', prop: 'price', width: 'auto' },
          { label: '数量', prop: 'num', width: '55' },
          { label: '金额(元)', prop: 'money', width: '80' },
          { label: '备注', prop: 'remarks', width: '70' }
        ]
      },
      dataList: {
        table1: [],
        table2: [],
        table3: []
      },
      chartList: {
        ldata: [],
        sdata: []
      }
    }
  },
  mounted() {
    this.$refs.propertyTable1.total = 0
    this.$refs.propertyTable1.dataList = []
    this.$refs.propertyTable2.total = 0
    this.$refs.propertyTable2.dataList = []
    this.getList('/asset/findAssetList', null).then(data => {
      for (var i = 0; i < data.data.assetList.length; i++) {
        if (data.data.assetList[i].scrap === 1) {
          this.$refs.propertyTable1.dataList.push(data.data.assetList[i])
        } else {
          this.$refs.propertyTable2.dataList.push(data.data.assetList[i])
        }
      }

      for (var j = 0; j < data.data.assetRate.length; j++) {
        this.chartList.ldata.push(data.data.assetRate[j].typeName)
        this.chartList.sdata.push({ name: data.data.assetRate[j].typeName, value: data.data.assetRate[j].money })
      }
    })
    this.getInputList(1)
  },
  methods: {
    getList(url, query) {
      return new Promise((resolve, reject) => {
        getListByGet(url, query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getInputList(pages) {
      this.getList('/asset/findMoneyAssetList?pageNum=' + pages + '&pageSize=5', null).then(data => {
        var list = data.data.moneyAssetList.content
        list.forEach(item => {
          item['price'] = Math.round(item.money / item.num)
        })
        this.$refs.propertyTable3.dataList = list
        this.$refs.propertyTable3.total = data.data.moneyAssetList.totalElements
      })
    },
    pageChange(page) {
      this.getInputList(page[1].page)
    }
  }
}
</script>

<style scoped>
.property-wrapper{
  padding: 15px;
  height: 100%;
  min-height: 705px;
  background-color: #F2F5FF;
  box-sizing: border-box;
}

.property-wrapper .el-row:nth-child(1){
  height: 280px;
  margin-bottom: 15px;
}

.property-wrapper .el-row:nth-child(2){
  height: 380px;
}

.property-wrapper .el-col{
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
}

.property-template{
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: #ffffff;
}

.template-height{
  height: 380px;
}

.property-table{
  margin-top: 15px;
}
</style>

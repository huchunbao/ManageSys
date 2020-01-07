<template>
  <div class="carlist-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsInfo" :key="item.name" ref="tabItem" :label="item.label" :name="item.name">
        <car-search ref="childsearch" class="car-panebg" :name-list="nameList" :tab-index="index" :search-type="item.name" @search="search(arguments)" @excel="excel(arguments)" />
        <div v-if="item.chart" class="chart-item">
          <car-chart :id="'carchart' + item.name" :ref="childchart+item.name" class="car-chart" width="100%" :chart-type="item.name" />
        </div>
        <car-table ref="childtable" :table-type="item.name" :tab-index="index" :table-limit="item.tableSize" class="car-chart" @pageChange="pageChange(arguments)" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CarSearch from './components/CarSearch'
import CarTable from './components/CarTable'
import CarChart from '@/components/Charts/CarChart'
import { getList, excelList } from '@/api/car'
import { parseTime } from '@/utils'

export default {
  name: 'CarList',
  components: { CarSearch, CarChart, CarTable },
  data() {
    return {
      tabsInfo: [
        {
          label: '行驶统计', // tab名称
          name: 'xs', // 简称，用于判断
          chart: true, // 是否又图表
          tabClick: true, // 是否点击过，用于判断是否获取tab页的数据
          url: '/dataStatistics/findGoData', // 接口地址
          excelUrl: '/dataExport/excelGoData', // 导出接口地址
          tableSize: 5, // 表格每页数据条数，有图表是5  没有图表是10
          query: [] // 默认查询条件，根据接口要求定义
        },
        {
          label: '超速统计',
          name: 'cs',
          chart: true,
          tabClick: false,
          url: '/dataStatistics/findSpeedData',
          excelUrl: '/dataExport/excelSpeedData',
          tableSize: 5,
          query: [{
            'speedValue': null,
            'speedTime': 0
          }]
        },
        {
          label: '位置统计',
          name: 'wz',
          chart: false,
          tabClick: false,
          url: '/dataStatistics/findSeatData',
          excelUrl: '/dataExport/excelSeatData',
          tableSize: 5,
          query: [{
            'intervalTime': 0
          }]
        },
        {
          label: '停车统计',
          name: 'tc',
          chart: true,
          tabClick: false,
          url: '/dataStatistics/findStopCarData',
          excelUrl: '/dataExport/excelStopCarData',
          tableSize: 5,
          query: [{
            'intervalTime': 0
          }]
        },
        {
          label: '里程统计',
          name: 'lc',
          chart: true,
          tabClick: false,
          url: '/dataStatistics/findDisData',
          excelUrl: '/dataExport/excelDisData',
          tableSize: 5,
          query: []
        },
        {
          label: '命令统计',
          name: 'ml',
          chart: false,
          tabClick: false,
          url: '/dataStatistics/findOrderData',
          excelUrl: '/dataExport/excelOrderData',
          tableSize: 10,
          query: []
        },
        {
          label: '趟数统计',
          name: 'ts',
          chart: true,
          tabClick: false,
          url: '/dataStatistics/findPassesData',
          excelUrl: '/dataExport/excelPassesData',
          tableSize: 5,
          query: []
        },
        {
          label: '设备信息统计',
          name: 'sbxx',
          chart: false,
          tabClick: false,
          url: '/dataStatistics/findWellData',
          excelUrl: '/dataExport/excelWellData',
          tableSize: 10,
          query: [{
            'power': 0
          }]
        },
        {
          label: '加油统计',
          name: 'jy',
          chart: true,
          tabClick: false,
          url: '/dataStatistics/findOilData',
          excelUrl: '/dataExport/excelOilData',
          tableSize: 5,
          query: [{
            'oilType': 0
          }]
        },
        // {
        //   label: '漏油统计',
        //   name: 'ly',
        //   chart: true,
        //   tabClick: false,
        //   url: '/dataStatistics/findOilData',
        //   excelUrl: '/dataExport/excelOilData',
        //   tableSize: 5,
        //   query: [{
        //     'oilType': 1
        //   }]
        // },
        {
          label: '周期统计',
          name: 'zq',
          chart: true,
          tabClick: false,
          url: '/dataStatistics/findCycleData',
          excelUrl: '/dataExport/excelCycleData',
          tableSize: 5,
          query: []
        }
      ],
      activeName: 'xs',
      childchart: 'childchart', // chart id前缀
      nameList: [{ id: 0, veh_code: '全部车辆' }], // 选择车辆下拉菜单默认项
      defaultQuery: { // 查询默认条件，每次查询需加上
        'startTime': '', // 开始时间
        'endTime': '', // 结束时间
        'id': null, // 车船ID 暂无用
        'vehCode': '', // 车船牌号
        'pageNum': 1, // 当前显示页数
        'pageSize': 5 // 每页显示条数
      }
    }
  },
  created() {
    this.getTabList('/boatsInfo/cardList', {}).then(data => { // 获取选择车辆下拉列表数据
      this.nameList = this.nameList.concat(data.data)
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.defaultQuery.startTime = parseTime(this.$refs.childsearch[0].time[0])
      this.defaultQuery.endTime = parseTime(this.$refs.childsearch[0].time[1])
      this.getTabList(this.tabsInfo[0].url, this.defaultQuery).then(data => { // 初始化获取行驶统计数据
        this.$refs['childchartxs'][0].chartData = this.data2Chart('xs', data.data.picList) // piclist 图表显示的数据，条件检索的所有数据没有分页
        this.$refs['childchartxs'][0].initChart()
        this.$refs.childtable[0].datalist = data.data.list.content // 表格显示的数据，条件检索的分页数据
        this.$refs.childtable[0].total = data.data.allCount // 总记录数
        this.$refs.childsearch[0].queryData = Object.assign({}, this.defaultQuery) // 查询条件，每个页面都保存各自的查询条件
      })
    })
  },
  methods: {
    handleClick(tab, event) { // tab点击事件
      var that = this
      const tabItem = that.tabsInfo[parseInt(tab.index)]
      const childChart = 'childchart' + tabItem.name
      if (!tabItem.tabClick) { // 第一次点击加载默认数据，再次进入不请求数据，需点击按钮查询
        let query = Object.assign({}, this.defaultQuery) // 每个页面各自的查询条件
        query.startTime = parseTime(this.$refs.childsearch[tab.index].time[0])
        query.endTime = parseTime(this.$refs.childsearch[tab.index].time[1])
        if (tabItem.query.length > 0) {
          query = Object.assign(query, tabItem.query[0])
        }
        query.pageSize = tabItem.tableSize
        this.getTabList(tabItem.url, query).then(data => {
          if (data) {
            const picList = that.data2Chart(tabItem.name, data.data.picList) // 图表数据
            const list = data.data.list.content || [] // 列表数据
            if (tabItem.chart) { // 有图表更新图表数据
              that.$refs[childChart][0].chartData = picList
              that.$refs[childChart][0].initChart()
            }
            that.$refs.childtable[tab.index].datalist = list
            that.$refs.childtable[tab.index].total = data.data.allCount // 总记录数
          }
        })
        that.$refs.childsearch[tab.index].queryData = query // 更新查询条件
        that.tabsInfo[parseInt(tab.index)].tabClick = true // 更新点击状态
      } else {
        if (tabItem.chart) { // 再次进入tab页，重新加载图表
          setTimeout(() => {
            that.$refs[childChart][0].initChart()
          }, 0)
        }
      }
    },
    search(query) { // 查询
      this.searchData(query[0], query[1])
    },
    pageChange(page) { // 表格页数切换
      const tabIndex = page[0]
      const query = this.$refs.tabItem[tabIndex].$children[0].queryData
      query.pageNum = page[1].page
      this.searchData(tabIndex, query)
    },
    searchData(tabIndex, query) { // 查询请求
      var that = this
      const tabItem = that.tabsInfo[tabIndex] // tab页
      const childChart = 'childchart' + tabItem.name
      query.pageSize = tabItem.tableSize // 当前页
      that.getTabList(tabItem.url, query).then(data => {
        that.$refs.childsearch[tabIndex].searchLoading = false // 查询按钮loading状态
        if (data) {
          if (tabItem.chart) {
            that.$refs[childChart][0].chartData = that.data2Chart(tabItem.name, data.data.picList)
            that.$refs[childChart][0].initChart()
          }
          that.$refs.childtable[tabIndex].datalist = data.data.list.content || []
          that.$refs.childtable[tabIndex].total = data.data.allCount || 0
        }
      })
    },
    excel(query) { // 导出，后台已经生成excel，前端直接下载
      var that = this
      const tabIndex = query[0]
      const tabItem = that.tabsInfo[tabIndex]
      new Promise((resolve, reject) => {
        excelList(tabItem.excelUrl, query[1]).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }).then(response => { // 保存excel
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob)
        } else {
          var link = document.createElement('a')
          var evt = document.createEvent('HTMLEvents')
          evt.initEvent('click', false, false)
          link.href = URL.createObjectURL(blob)
          link.download = tabItem.label + parseTime(new Date())
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
        that.$refs.childsearch[tabIndex].downloadLoading = false // 导出loading状态
      }).catch((e) => {
        // console.log(e)
        that.$refs.childsearch[tabIndex].downloadLoading = false // 导出loading状态
      })
    },
    getTabList(url, query) {
      return new Promise((resolve, reject) => {
        getList(url, query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    data2Chart(type, data) { // 图表数据格式化
      var chart = []
      switch (type) {
        case 'xs':
          chart = [['product'], ['行驶时长'], ['行驶里程'], ['油耗/耗电量'], ['最大速度'], ['平均速度']]
          if (data !== null) {
            data.forEach(item => {
              chart[0].push(item.vehCode)
              chart[1].push(item.speedTime)
              chart[2].push(item.speedMake)
              chart[3].push(item.oilEat)
              chart[4].push(item.maxSpeed)
              chart[5].push(item.avSpeed)
            })
          }
          break
        case 'cs':
          chart = [['product'], ['超速时长'], ['超速里程'], ['超速次数'], ['最大速度'], ['最小速度']]
          if (data !== null) {
            data.forEach(item => {
              chart[0].push(item.vehCode)
              chart[1].push(item.speedTime)
              chart[2].push(item.speedMake)
              chart[3].push(item.speedNum)
              chart[4].push(item.maxSpeed)
              chart[5].push(item.minSpeed)
            })
          }
          break
        case 'tc':
          chart = [['product'], ['停车时长'], ['停车次数']]
          if (data !== null) {
            data.forEach(item => {
              chart[0].push(item.vehCode)
              chart[1].push(item.stopTime)
              chart[2].push(item.stopCount)
            })
          }
          break
        case 'lc':
          chart = [['product'], ['行驶里程'], ['油耗/耗电量']]
          if (data !== null) {
            data.forEach(item => {
              chart[0].push(item.vehCode)
              chart[1].push(item.dis)
              chart[2].push(item.oilEat)
            })
          }
          break
        case 'ts':
          chart = [['product'], ['行驶时长'], ['趟数']]
          if (data !== null) {
            data.forEach(item => {
              chart[0].push(item.vehCode)
              chart[1].push(item.disTime)
              chart[2].push(item.passes)
            })
          }
          break
        case 'jy':
          chart = [['product'], ['加油/充电量'], ['加油/充电次数']]
          if (data !== null) {
            data.forEach(item => {
              chart[0].push(item.vehCode)
              chart[1].push(item.oilNum)
              chart[2].push(item.oilCount)
            })
          }
          break
        case 'ly':
          chart = [['product'], ['漏油/亏电量'], ['漏油/亏电次数']]
          if (data !== null) {
            data.forEach(item => {
              chart[0].push(item.vehCode)
              chart[1].push(item.oilNum)
              chart[2].push(item.oilCount)
            })
          }
          break
        case 'zq':
          chart = [['product'], ['总里程'], ['总油耗/能耗'], ['超速次数'], ['超时停车次数'], ['加油/充电量'], ['漏油/亏电量'], ['百公里油耗/能耗']]
          if (data !== null) {
            data.forEach(item => {
              chart[0].push(item.vehCode)
              chart[1].push(item.totalDis)
              chart[2].push(item.totalOilEat)
              chart[3].push(item.speedNum)
              chart[4].push(item.outtimeStopcarNum)
              chart[5].push(item.oilNum)
              chart[6].push(item.oilleakNum)
              chart[7].push(item.oilEat)
            })
          }
          break
        default:
          break
      }

      return chart
    }
  }
}
</script>

<style lang="scss">
.carlist-container{
  height: 100%;

  .el-tabs{
    height: 100%;
  }

  .el-tabs__content{
    min-height: calc(100% - 40px);
  }

  .car-chart{
    padding: 10px;
  }

  & .car-panebg{
    background-color: #ffffff;
    position: relative;
  }

  & .car-chart{
    margin-top: 15px;
    background-color: #ffffff;
  }

  & .el-tabs__header{
    margin: 0 0 0 15px;
  }

  & .el-tabs__content{
    padding: 15px;
    background-color: #F2F5FF;
  }
}
</style>

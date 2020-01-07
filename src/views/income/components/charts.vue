<template>
  <div class="income-chart-wrapper">
    <el-tabs v-model="activeName" type="card" style="height:100%;" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :key="item.name" ref="incomeItem" :label="item.name" :name="item.name" class="income-pane">
        <div class="income-contrast">
          <div class="income-template">
            <div class="income-item-title">{{ item.itemName[0] }}
              <ul>
                <li>本月{{ item.chartName }}额<span class="yuan">{{ item.data.table1.monthSum }}</span></li>
                <li>同比<span class="percentage">{{ item.data.table1.monthTB }}</span></li>
                <li>环比<span class="percentage">{{ item.data.table1.monthHB }}</span></li>
              </ul>
              <ul>
                <li class="li-bg">本周{{ item.chartName }}额<span class="yuan">{{ item.data.table1.weekSum }}</span></li>
                <li class="li-bg">同比<span class="percentage">{{ item.data.table1.weekTB }}</span></li>
                <li class="li-bg">环比<span class="percentage">{{ item.data.table1.weekHB }}</span></li>
              </ul>
            </div>
            <div v-if="item.name==='酒店'" class="template-ringchart">
              <div class="tabs-jd-item">
                <div :class="{'tabs-jd-active': jdActive===1}" @click="jdActive=1">今年酒店营业额占比</div>/
                <div :class="{'tabs-jd-active': jdActive===2}" @click="jdActive=2">上月每日酒店入住率</div>
              </div>
              <div v-if="activeName==='酒店'" style="height:calc(100% - 20px);">
                <ring-chart v-if="jdActive===1" :id="item.name + 'chart1'" :chart-type="item.name" :chart-data="item.data.chart1" tip-title="酒店营业额占比" height="100%" width="100%" />
                <line-chart v-if="jdActive===2" :id="item.name + 'cahrt4'" chart-type="scale" :chart-data="tabList[5].data.chart4" tip-title="酒店入住率" height="100%" width="100%" />
              </div>
            </div>
            <div v-else class="template-ringchart">{{ item.itemName[1] }}
              <ring-chart v-if="item.name===activeName" :id="item.name + 'chart1'" :nesting="item.name==='会员卡'" :chart-type="item.name" :chart-data="item.data.chart1" :tip-title="item.itemName[1]" height="calc(100% - 20px)" width="100%" />
            </div>
            <div class="template-stackchart" style="clear:both;">{{ item.itemName[2] }}
              <stack-chart v-if="item.name===activeName" :id="item.name + 'cahrt2'" :chart-data="item.data.chart2" :tip-title="item.itemName[2]" :show-legend="item.name=='汇总'" height="calc(100% - 20px)" width="100%" />
            </div>
            <div class="template-stackchart">{{ item.itemName[3] }}
              <line-chart v-if="item.name===activeName" :id="item.name + 'cahrt3'" :chart-data="item.data.chart3" :tip-title="item.itemName[3]" height="calc(100% - 20px)" width="100%" />
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getList } from '@/api/car'
import RingChart from '@/components/Charts/RingChart'
import StackChart from '@/components/Charts/StackChart'
import LineChart from '@/components/Charts/LineChart'
import IncomeData from './data'

export default {
  name: 'Charts',
  components: { RingChart, StackChart, LineChart },
  props: {
    scenicName: {
      type: String,
      default: '全部景区'
    }
  },
  data() {
    const now = new Date()
    return {
      activeName: '汇总',
      tabList: [
        { id: 1, name: '汇总', chartName: '总收入', itemName: ['总收入数据统计', '今年业态收入占比', '历年业态收入统计', '今年每月收入统计'], url: '/income/findAllIncome', tabClick: true, data: IncomeData['tab1'] },
        { id: 2, name: '门票', chartName: '门票销售', itemName: ['门票销售数据统计', '今年门票销售额占比', '历年门票销售额统计', '今年每月门票销售额统计'], url: '/income/findTicketIncome', tabClick: false, data: IncomeData['tab2'] },
        { id: 3, name: '餐饮', chartName: '餐饮营业', itemName: ['餐饮营业数据统计', '今年餐饮营业额占比', '历年餐饮营业额统计', '今年每月餐饮营业额统计'], url: '/income/findFoodIncome', tabClick: false, data: IncomeData['tab3'] },
        { id: 4, name: '零售', chartName: '零售营业', itemName: ['零售营业数据统计', '今年零售营业额占比', '历年零售营业额统计', '今年每月零售营业额统计'], url: '/income/findSaleIncome', tabClick: false, data: IncomeData['tab4'] },
        { id: 5, name: '剧场', chartName: '剧场营业', itemName: ['剧场营业数据统计', '今年剧场营业额占比', '历年剧场营业额统计', '今年每月剧场营业额统计'], url: '/income/findTheatreIncome', tabClick: false, data: IncomeData['tab5'] },
        { id: 6, name: '酒店', chartName: '酒店营业', itemName: ['酒店营业数据统计', '今年酒店营业额占比', '历年酒店营业额统计', '今年每月酒店营业额统计'], url: '/income/findHotelIncome', tabClick: false, data: IncomeData['tab6'] },
        { id: 7, name: '停车场', chartName: '停车场营业', itemName: ['停车场营业数据统计', '今年停车场营业额占比', '历年停车场营业额统计', '今年每月停车场营业额统计'], url: '/income/findParkcarIncome', tabClick: false, data: IncomeData['tab7'] }
      ],
      jdActive: 1,
      thisY: now.getFullYear(),
      lastY: now.getFullYear() - 1,
      beforeY: now.getFullYear() - 2,
      monthCount: now.getMonth() + 1
    }
  },
  mounted() {
    this.$nextTick(() => { // 汇总统计
      this.getTabList('/income/findAllIncome', { areaName: this.scenicName }).then(data => {
        this.formatAllData(data.data, 0)
      })
    })
  },
  methods: {
    handleClick(tab, event) { // tab点击事件
      var that = this
      const tabItem = that.tabList[parseInt(tab.index)]
      if (!tabItem.tabClick) {
        this.getTabList(tabItem.url, { areaName: this.scenicName }).then(data => {
          this.formatAllData(data.data, parseInt(tab.index))
        })
      }
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
    formatAllData(data, tabId) { // 生成报表数据
      if (data.length > 0) {
        var that = this
        var itemData = that.tabList[tabId].data
        var chart1 = itemData.chart1
        var chart2 = itemData.chart2.sdata
        var chart3 = itemData.chart3.sdata
        var table1 = itemData.table1
        var lineData = {}
        data.forEach(item => {
          if (item.dateYear === 0) { // 年度统计
            if (item.imcomeType <= 5 || item.imcomeType === 8) {
              let itemIndex = item.imcomeType - 1
              if (tabId > 0) {
                itemIndex = 0
              } else {
                if (item.imcomeType === 8) {
                  itemIndex = 5
                }
              }
              switch (parseInt(item.dateName)) {
                case that.beforeY:
                  chart2[itemIndex][0] = item.imcomeValue
                  break
                case that.lastY:
                  chart2[itemIndex][1] = item.imcomeValue
                  break
                case that.thisY:
                  chart2[itemIndex][2] = item.imcomeValue
                  if (tabId === 0) {
                    chart1.sdata[itemIndex].value = item.imcomeValue
                  }
                  break
                default:
                  break
              }
            }
          } else if (item.dateYear === 1) { // 每月统计
            if (item.imcomeType <= 5 || item.imcomeType === 8) {
              if (tabId > 0) {
                if (!lineData.hasOwnProperty(item.name)) {
                  lineData[item.name] = new Array(that.monthCount).fill(0)
                }
                lineData[item.name][parseInt(item.dateName) - 1] = item.imcomeValue
              } else {
                let itemIndex = item.imcomeType - 1
                if (item.imcomeType === 8) {
                  itemIndex = 5
                }
                chart3[itemIndex][parseInt(item.dateName) - 1] = item.imcomeValue
              }
            }
          } else if (item.dateYear === 8) { // 总额、同比、环比以及饼图
            table1.monthSum = item.thismonthIncome || 0
            table1.monthTB = item.thismonthSame
            table1.monthHB = item.thismonthDis
            table1.weekSum = item.thisweekIncome || 0
            table1.weekTB = item.thisweekSame
            table1.weekHB = item.thisweekDis
            if (tabId > 0) {
              var pieLData = []
              var pieSData = []
              for (var pie in item.rateMap) {
                pieLData.push(pie)
                pieSData.push({ 'name': pie, 'value': item.rateMap[pie] })
              }
              chart1.ldata = pieLData
              chart1.sdata = pieSData

              if (tabId === 5) { // 酒店入住率
                var checkIn = {}
                item.upMonthHotelRateMap.forEach(rate => {
                  if (!checkIn.hasOwnProperty(rate.hotelName)) {
                    var days = 31
                    var upMonth = that.monthCount - 1
                    if (upMonth === 2) {
                      days = that.thisY % 4 === 0 ? 29 : 28
                    } else if (upMonth === 4 || upMonth === 6 || upMonth === 9 || upMonth === 11) {
                      days = 30
                    }
                    checkIn[rate.hotelName] = new Array(days).fill(0)
                  }
                  var rateDate = new Date(rate.date)
                  checkIn[rate.hotelName][rateDate.getDate() - 1] = parseFloat(rate.roomPrice.toFixed(2))
                })
                itemData.chart4.ldata = Object.keys(checkIn)
                var checkSData = []
                for (var check in checkIn) {
                  checkSData.push(checkIn[check])
                }
                itemData.chart4.sdata = checkSData
              }
            }
          }
        })
        that.$set(that.tabList[tabId].data.chart2, 'sdata', null)
        that.$set(that.tabList[tabId].data.chart2, 'sdata', chart2)
        if (tabId > 0) {
          that.$set(that.tabList[tabId].data.chart3, 'ldata', Object.keys(lineData))
          var sdata = []
          for (var line in lineData) {
            sdata.push(lineData[line])
          }
          chart3 = sdata
        }
        that.$set(that.tabList[tabId].data.chart3, 'sdata', null)
        that.$set(that.tabList[tabId].data.chart3, 'sdata', chart3)
      }
    }
  }
}
</script>

<style lang="scss">
.income-chart-wrapper{
  background-color: #ffffff;
  height: 100%;

  & .el-tabs__item + .is-top,
  & .el-tabs__item:first-child{
    background-color: #E4EBFF;
  }

  & .el-tabs__nav-wrap{
    background-color: #F2F5FF;
  }

  .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;

    .el-tabs__item{
      border: none;
      margin-right: 2px;
    }
  }

  & .el-tabs__item + .is-active,
  & .el-tabs__item.is-active{
    background-color: #ffffff;
    color: #3e6df6;
  }

  .el-tabs__content{
    height: calc(100% - 56px);
  }

  & .income-pane {
    height: 100%;
    padding: 0 20px;
  }

  & .income-contrast {
    height: 100%;
    font-size: 14px;

    & .income-template {
      height: 100%;

      .income-item-title{
        width: 50%;
        height: 40%;
        min-height: 215px;
        float: left;
      }

      ul {
        padding:20px 0 0 0;
        margin:0;
        color: #ffffff;
        list-style:none;
      }

      li{
        font-size: 12px;
        height: 50px;
        width: 150px;
        border-radius: 45px;
        display: inline-table;
        margin: 0 10px;
        padding: 15px;
        line-height: 20px;
        background:linear-gradient(94deg,rgba(174,197,255,1) 0%,rgba(139,171,253,1) 100%);
        box-shadow:0px 0px 5px 0px rgba(204,204,204,0.2);
        border-radius:4px;

        & span{
          font-size: 16px;
          font-weight: bold;
          display: block;
        }

        .yuan:after{
          content: '元';
          font-size: 12px;
          margin-left: 10px;
        }

        .percentage-second{
          display: inline;
        }

        .percentage:after{
          content: '%';
          font-size: 12px;
          margin-left: 8px;
          margin-right: 8px;
        }
      }

      .li-bg{
        background:linear-gradient(90deg,rgba(162,166,255,1) 0%,rgba(139,147,254,1) 100%);
        box-shadow:0px 0px 5px 0px rgba(204,204,204,0.2);
      }

      .template-ringchart{
        float: right;
        width: 50%;
        height: 40%;
        position: relative;

        .tabs-jd-item{
          display: flex;
          cursor: pointer;

          & div:nth-child(1){
            margin-right: 5px;
          }

          & div:nth-child(2){
            margin-left: 5px;
          }

          .tabs-jd-active{
            color: #3f6aff;
          }
        }
      }

      .template-card-chart{
        float: left;
        width: 40%;
        height: 40%;
        position: relative;
        text-align: center;

        .card-all{
          color: #89a2ff;
          display: inline-block;
          text-indent: 20px;
          font-size: 18px;
          font-weight: bold;

          &:after{
            content: '个';
            font-size: 12px;
            font-weight: normal;
          }
        }
      }

      .template-card-use{
        float: left;
        width: 50%;
        height: 60%;
        padding-right: 25px;
        padding-bottom: 10px;
        position: relative;
      }

      .template-stackchart {
        float: left;
        width: 50%;
        height: 60%;
        max-height: calc(100% - 215px);
        padding-bottom: 10px;

        & .chart {
          margin-top: 5px;
        }
      }

      & .income-ipass-title{
        width: 100%;
      }
    }
  }
}
</style>

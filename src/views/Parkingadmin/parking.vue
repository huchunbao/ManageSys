<template>
  <div class="parking-container">
    <el-row :gutter="15" class="first-row">
      <el-col :span="12">
        <div class="parking-template">停车场数据统计
          <div style="height:100%;">
            <pie-chart
              id="parkingchart1"
              chart-type="parking"
              :chart-data="chartList1"
              :tip-title="chartList1.title"
              height="calc(100% - 32px)"
              width="50%"
              style="margin-top:10px; float:left;"
            />
            <pie-chart
              id="parkingchart2"
              chart-type="parking"
              :chart-data="chartList2"
              :tip-title="chartList2.title"
              height="calc(100% - 32px)"
              width="50%"
              style="margin-top:10px; float:left;"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="parking-template">今年每月车流统计
          <line-chart
            id="parkingchart3'"
            :chart-data="chartList3"
            :stack="true"
            chart-type="parking"
            tip-title="车流统计"
            height="calc(100% - 32px)"
            width="100%"
            style="margin-top:10px;"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="second-row">
      <el-col :span="12">
        <div class="parking-template">今年每月停车场营业额统计
          <car-chart
            id="parkingchart4"
            ref="parkingchart4"
            chart-type="parking"
            tip-title="营业额统计"
            height="calc(100% - 32px)"
            width="100%"
            style="margin-top:10px;"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="parking-template">今年车辆来源排行
          <car-chart
            id="parkingchart5"
            ref="parkingchart5"
            chart-type="parkingCar"
            height="calc(100% - 32px)"
            width="100%"
            style="margin-top:10px;"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from '@/components/Charts/PieChart'
import CarChart from '@/components/Charts/CarChart'
import LineChart from '@/components/Charts/LineChart'
import { get } from '../../api/axios.js'

export default {
  name: 'Parking',
  components: { PieChart, CarChart, LineChart },
  data() {
    return {
      chartList1: {
        title: '南门停车场',
        subText: '今日停车场营业额：2306元',
        lData: ['已用', '剩余'],
        lselected: { 已用: 245, 剩余: 55 },
        sData: [{ name: '已用', value: 245 }, { name: '剩余', value: 55 }]
      },
      chartList2: {
        title: '北门停车场',
        subText: '今日停车场营业额：1522元',
        lData: ['已用', '剩余'],
        lselected: { 已用: 165, 剩余: 35 },
        sData: [{ name: '已用', value: 245 }, { name: '剩余', value: 55 }]
      },
      chartList3: {
        ldata: ['南门停车场', '北门停车场'],
        sdata: [
          [1499, 1515, 1510, 1658, 1774, 1540, 1614, 1515, 1648, 1357],
          [1452, 1480, 1448, 1658, 1404, 1580, 1615, 1710, 1528, 1108]
        ]
      },
      chartList4: [
      ],
      chartList5: [
        ['product', '车辆来源'],
        ['四川', 0],
        ['广西', 0],
        ['云南', 0],
        ['广东', 0],
        ['湖南', 0],
        ['江西', 0],
        ['贵州', 0],
        ['重庆', 0],
        ['山西', 0]
      ]
    }
  },
  mounted() {
    this.geng()
  },
  methods: {
    geng() {
      var that = this
      get('/parkinfo/getParkinfomessage', { cpid: this.$store.state.user.companyId }).then(res => {
        that.chartList1.subText = '今日停车场营业额：' + (res.data.parkinfolist[0].turnover || '0') + '元'
        that.chartList2.subText = '今日停车场营业额：' + (res.data.parkinfolist[1].turnover || '0') + '元'
        that.chartList1.sData = [
          { name: '已用', value: res.data.parkinfolist[0].usedplace || 0 },
          { name: '剩余', value: res.data.parkinfolist[0].freeplace || 0 }
        ]
        that.chartList2.sData = [
          { name: '已用', value: res.data.parkinfolist[1].usedplace || 0 },
          { name: '剩余', value: res.data.parkinfolist[1].freeplace || 0 }
        ]
        var data1 = []
        var dataname = []
        var data2 = [['product'], ['1月'], ['2月'], ['3月'], ['4月'], ['5月'], ['6月'], ['7月'], ['8月'], ['9月'], ['10月'], ['11月'], ['12月']]
        for (var i = 0; i < res.data.maplist.length; i++) {
          dataname.push(res.data.maplist[i].parkname)
          data1.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
          data2[0].push(res.data.maplist[i].parkname)
          for (var i2 = 1; i2 < data2.length; i2++) {
            data2[i2].push(0)
          }
          for (var y = 0; y < res.data.maplist[i].datalist.length; y++) {
            data2[res.data.maplist[i].datalist[y].month][i + 1] = (res.data.maplist[i].datalist[y].receipts)
            data1[i][res.data.maplist[i].datalist[y].month - 1] = res.data.maplist[i].datalist[y].num
          }
        }
        // console.log(data2)
        this.chartList3.ldata = dataname
        this.chartList3.sdata = data1
        this.chartList4 = data2
        this.$refs.parkingchart4.chartData = this.chartList4
        this.$refs.parkingchart4.initChart()
        this.chartList5 = [['product', '车辆来源']]
        for (var i3 = 0; i3 < res.data.originmap.length; i3++) {
          this.chartList5.push([
            res.data.originmap[i3].areaname,
            res.data.originmap[i3].count
          ])
        }
        // console.log(this.chartList5, 12321)
        this.$refs.parkingchart5.chartData = this.chartList5
        this.$refs.parkingchart5.initChart()
      })
    }
  }
}
</script>

<style scoped>
.parking-container {
  padding: 15px;
  height: 100%;
  background-color: #f2f5ff;
}

.parking-container .first-row,
.parking-container .second-row{
  height: calc(50% - 7.5px);
}

.parking-container .second-row{
  margin-top: 15px;
}

.parking-container .el-col{
  height: 100%;
}

.parking-template {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>

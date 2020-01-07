<template>
  <div class="caralarm-container">
    <car-search ref="alarmsearch" class="car-panebg" :name-list="nameList" search-type="bjxx" @search="search(arguments)" @excel="excel(arguments)" />
    <car-table ref="alarmtable" table-type="bjxx" class="alarm-table" @pageChange="pageChange(arguments)" />
  </div>
</template>

<script>
import { getList, excelList } from '@/api/car'
import CarSearch from './components/CarSearch'
import CarTable from './components/CarTable'
import { parseTime } from '@/utils'

export default {
  name: 'CarAlarm',
  components: { CarSearch, CarTable },
  data() {
    return {
      nameList: [{ id: 0, veh_code: '全部车辆' }],
      datalist: [{ id: 1, vehCode: '12345', alarmType: '断电报警', alarmCheck: '已审核', alarmHandle: '已处理', fleet: '一队', terminal: '136218', mobile: '13576458758', alarmTime: '2019-9-6 10:32:12', alarmStatus: '已处理', alarmLocation: '云端动物园', alarmPerson: '王小山', handleTime: '2019-9-6 10:38:27', handleType: '检查', handlePerson: '宁晓博', handleContent: '设备断电', handleResult: '处理完成' },
        { id: 2, vehCode: '12346', alarmType: '超速报警', alarmCheck: '已审核', alarmHandle: '已处理', fleet: '一队', terminal: '136219', mobile: '13576458751', alarmTime: '2019-9-7 14:02:52', alarmStatus: '已处理', alarmLocation: '森林冒险公园', alarmPerson: '贺亮', handleTime: '2019-9-7 14:30:27', handleType: '警告', handlePerson: '宁晓博', handleContent: '车辆超速', handleResult: '处理完成' },
        { id: 3, vehCode: '12347', alarmType: '超时报警', alarmCheck: '已审核', alarmHandle: '已处理', fleet: '二队', terminal: '136311', mobile: '13576450738', alarmTime: '2019-9-7 11:12:35', alarmStatus: '已处理', alarmLocation: '云端动物园', alarmPerson: '史俊', handleTime: '2019-9-7 11:38:02', handleType: '通知', handlePerson: '韩佳佳', handleContent: '车辆误点', handleResult: '处理完成' },
        { id: 4, vehCode: '12348', alarmType: '区域报警', alarmCheck: '已审核', alarmHandle: '已处理', fleet: '二队', terminal: '136312', mobile: '13576450736', alarmTime: '2019-9-8 15:32:12', alarmStatus: '已处理', alarmLocation: '森林冒险公园', alarmPerson: '杨文佳', handleTime: '2019-9-8 15:38:55', handleType: '通知', handlePerson: '韩佳佳', handleContent: '车辆越界', handleResult: '处理完成' }
      ]
    }
  },
  created() {
    this.getTabList('/boatsInfo/cardList', {}).then(data => {
      this.nameList = this.nameList.concat(data.data)
    })
  },
  mounted() {
    this.$refs.alarmsearch.queryData = {
      'startTime': '',
      'endTime': '',
      'id': null,
      'vehCode': '',
      'pageNum': 1,
      'pageSize': 20,
      'alarm': '全部报警'
    }

    this.$refs.alarmtable.datalist = this.datalist
    this.$refs.alarmtable.total = 4
  },
  methods: {
    getTabList(url, query) {
      return new Promise((resolve, reject) => {
        getList(url, query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    search(query) {
      this.searchData(query)
    },
    searchData(query) {
      var that = this
      var alarmType = query[1].alarm
      console.log(alarmType)
      if (alarmType === '断电报警') {
        that.$refs.alarmtable.datalist = this.datalist.filter(item => item.id === 1)
        that.$refs.alarmtable.total = 1
      } else if (alarmType === '超速报警') {
        that.$refs.alarmtable.datalist = this.datalist.filter(item => item.id === 2)
        that.$refs.alarmtable.total = 1
      } else if (alarmType === '超时报警') {
        that.$refs.alarmtable.datalist = this.datalist.filter(item => item.id === 3)
        that.$refs.alarmtable.total = 1
      } else if (alarmType === '区域报警') {
        that.$refs.alarmtable.datalist = this.datalist.filter(item => item.id === 4)
        that.$refs.alarmtable.total = 1
      } else {
        that.$refs.alarmtable.datalist = this.datalist
        that.$refs.alarmtable.total = 4
      }
      // that.getTabList('', query).then(data => {
      //   that.$refs.alarmtable.datalist = data.data.list.content
      //   that.$refs.alarmtable.total = data.data.allCount
      // })
    },
    excel(query) {
      var that = this
      new Promise((resolve, reject) => {
        excelList('', query[1]).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }).then(response => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob)
        } else {
          var link = document.createElement('a')
          var evt = document.createEvent('HTMLEvents')
          evt.initEvent('click', false, false)
          link.href = URL.createObjectURL(blob)
          link.download = query[1].alarm + parseTime(new Date())
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
        that.$refs.alarmsearch.downloadLoading = false
      }).catch((e) => {
        console.log(e)
        that.$refs.alarmsearch.downloadLoading = false
      })
    },
    pageChange(page) {
      const query = this.$refs.alarmsearch.queryData
      query.pageNum = page[1].page
      this.searchData(query)
    }
  }
}
</script>

<style lang="scss" scoped>
.caralarm-container {
  padding: 15px;
  height: 100%;
  background-color: #F2F5FF;

  .alarm-table{
    margin-top: 15px;
  }

  .car-panebg{
    background-color: #ffffff;
    position: relative;
  }
}
</style>

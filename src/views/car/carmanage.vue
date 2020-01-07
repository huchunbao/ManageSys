<template>
  <div class="amap-wrapper">
    <el-amap class="amap-box" :vid="'amap-vue'" :zoom="zoom" :center="center" :events="events">
      <div v-for="(marker, index) in markers" :key="index">
        <el-amap-marker :position="marker.position" :label="marker.label" :vid="index" />
        <el-amap-polyline :path="marker.path" :stroke-color="linecolor" :stroke-style="linestyle" />
        <div v-for="(circle, circleindex) in marker.path" :key="circle[0]">
          <el-amap-marker v-if="!(circleindex+1 === marker.path.length)" :position="formatPosition(circle)" :content="linecontent(circleindex)" :label="circleindex" />
        </div>
      </div>
    </el-amap>
    <div v-if="isAlarm" class="car-alarm">
      <div class="alarm-info">{{ alarm }}</div>
      <img :src="alarmico" width="46px" height="auto">
    </div>
    <div class="line-all">
      <el-scrollbar wrap-class="line-scrollbar-wrapper">
        <div class="line-datalist">
          <line-item v-for="(line, lineIndex) in list" :key="line.name" :item="line" :class="{'line-active':lineIndex==lineActive}" @click.native="handleLine(lineIndex)" />
        </div>
        <details-list class="line-detailslist" :list="tableList" />
        <div class="pagination">
          <div :class="{'btn-disable': isFirst}">上一页</div>
          <div :class="{'btn-disable': isEnd}">下一页</div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import AlarmIco from '@/assets/images/alarm.png'
import LineItem from './components/LineItem'
import DetailsList from './components/DetailsList'
import { getList } from '@/api/car'

export default {
  name: 'CarManage',
  components: { LineItem, DetailsList },
  props: {
    isAlarm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      zoom: 16,
      center: [116.336496, 39.942178],
      linecolor: '#3F6AFF',
      linestyle: 'dashed',
      lineradius: 15,
      list: [],
      lineActive: 0,
      events: {
        click(e) {
          // console.log(e.lnglat)
        }
      },
      markers: [
        {
          position: [116.334145, 39.945174],
          label: {
            content: '线路1(上行)',
            offset: [25, 0]
          },
          path: [
            [116.337078, 39.938673],
            [116.332841, 39.940372],
            [116.335748, 39.942577],
            [116.334145, 39.945174]
          ]
        },
        {
          position: [116.338035, 39.938725],
          label: {
            content: '线路1(下行)',
            offset: [25, 0]
          },
          path: [
            [116.334672, 39.945123],
            [116.335981, 39.942573],
            [116.333235, 39.940352],
            [116.338035, 39.938725]
          ]
        }
      ],
      markers1: [
        [{
          position: [116.334145, 39.945174],
          label: {
            content: '线路1(上行)',
            offset: [25, 0]
          },
          path: [
            [116.337078, 39.938673],
            [116.332841, 39.940372],
            [116.335748, 39.942577],
            [116.334145, 39.945174]
          ]
        },
        {
          position: [116.338035, 39.938725],
          label: {
            content: '线路1(下行)',
            offset: [25, 0]
          },
          path: [
            [116.334672, 39.945123],
            [116.335981, 39.942573],
            [116.333235, 39.940352],
            [116.338035, 39.938725]
          ]
        }],
        [{
          position: [116.337987, 39.938713],
          label: {
            content: '线路2(上行)',
            offset: [25, 0]
          },
          path: [
            [116.334586, 39.945145],
            [116.335766, 39.944084],
            [116.341957, 39.941575],
            [116.337987, 39.938713]
          ]
        },
        {
          position: [116.333953, 39.945112],
          label: {
            content: '线路2(下行)',
            offset: [25, 0]
          },
          path: [
            [116.336946, 39.938647],
            [116.341603, 39.94152],
            [116.335423, 39.943971],
            [116.333953, 39.945112]
          ]
        }],
        [{
          position: [116.336667, 39.938671],
          label: {
            content: '线路3(上行)',
            offset: [25, 0]
          },
          path: [
            [116.333052, 39.945482],
            [116.340187, 39.944185],
            [116.336883, 39.941684],
            [116.336667, 39.938671]
          ]
        },
        {
          position: [116.333985, 39.945153],
          label: {
            content: '线路3(下行)',
            offset: [25, 0]
          },
          path: [
            [116.337391, 39.938656],
            [116.337268, 39.941699],
            [116.340626, 39.944314],
            [116.333985, 39.945153]
          ]
        }]
      ],
      isFirst: true,
      isEnd: true,
      tableList: [],
      alarmico: AlarmIco,
      alarm: '报警信息报警信息'
    }
  },
  created() {
    this.getTabList('/boatsInfo/boats', {}).then(data => { // 获取车船列表
      this.list = data.data.routeInfoList || []
      this.tableList = data.data.boatInfoList.content || []
    })
  },
  methods: {
    linecontent(index) {
      return '<div class="line-marker">' + (index + 1) + '</div>'
    },
    formatPosition(position) {
      return [position[0] || position.lng, position[1] || position.lat]
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
    handleLine(index) {
      this.lineActive = index
      this.markers = this.markers1[index]
    }
  }
}
</script>

<style lang="scss">
.amap-wrapper{
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
}

.amap-box{

  .amap-marker{

    .amap-marker-label{
      border: none !important;
      background-color: rgba(47,49,83,0.6) !important;
      padding: 8px !important;
      color: #fff;
      border-radius: 2px;
    }

    .line-marker{
      height: 20px;
      width: 20px;
      border-radius: 10px;
      background-color: rgba(63,106,255, .7);
      text-align: center;
      line-height: 20px;
      margin-top: 20px;
      color: #fff;
    }
  }
}

.car-alarm{
  position: absolute;
  left: 50px;
  top: 20px;
  height: 42px;
  font-size: 12px;
  padding-left: 32px;

  img{
    position: absolute;
    left: 0;
    top: 0;
  }

  .alarm-info{
    color: #fff;
    height: 26px;
    line-height: 26px;
    padding: 0 20px;
    margin-top: 10px;
    border-radius: 0 13px 13px 0;
    background-color: rgba(239,93,78,.7);
  }
}

.line-all{
  position: absolute;
  right: 15px;
  bottom: 15px;
  width: 375px;
  height: 85%;
  color: #fff;
  font-size: 14px;
  background:rgba(47,49,83,.5);
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  padding: 10px 0;

  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .line-scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    left: 0;
  }

  .el-scrollbar {
    height: 100%;
  }

  .line-datalist,
  .line-detailslist{
    width: 94%;
    margin: 0 auto;
  }

  .line-datalist:before{
    content: '车船路线';
    width: 100%;
    height: 34px;
    line-height: 44px;
  }

  .line-active{
    background-color: rgba(47,49,83,.9);
  }

  .line-detailslist:before{
    content: '车船信息详情';
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    position: relative !important;
    background-color: transparent !important;
  }

  .el-table{
    color: #fff;
    font-size: 12px;
    background-color: transparent !important;
  }

  .pagination{
    width: 100%;
    height: 28px;
    text-align: right;
    margin-top: 12px;
    padding-right: 12px;

    div{
      display: inline-block;
      margin-left: 15px;
      border-radius: 4px;
      cursor:pointer;
    }
  }
}
</style>

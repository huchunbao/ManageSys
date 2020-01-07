<template>
  <div class="cartrack-container">
    <car-search ref="tracksearch" class="car-panebg" :name-list="nameList" search-type="lsgj" @search="search(arguments)">
      <slot>
        <el-button size="mini" class="el-button-default" round @click="btnTrack">{{ trackBtn }}</el-button>
      </slot>
    </car-search>
    <div class="track-table">
      <el-table
        v-loading="listLoading"
        :data="datalist"
        border
        header-row-class-name="car-table-header"
        row-class-name="car-table-item"
      >
        <el-table-column type="index" :index="indexMethod" header-align="center" align="center" label="序号" width="60" />
        <el-table-column v-for="head in headlist" :key="head.lable" :prop="head.prop" header-align="center" align="center" :label="head.label" :width="head.width" />
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="pageChange(arguments)" />
    </div>
    <el-amap class="amap-track" :vid="'amap-track'" :amap-manager="amapManager" :zoom="zoom" :center="center" />
    <!-- <div id="trackMap" class="amap-track"></div> -->
  </div>
</template>

<script>
import { getList } from '@/api/car'
import CarSearch from './components/CarSearch'
import Pagination from '@/components/Pagination'
import { AMapManager } from 'vue-amap'
import TrackCar from '@/assets/images/trackCar.png'

var amapManager = new AMapManager()
export default {
  name: 'CarTrack',
  components: { CarSearch, Pagination },
  data() {
    return {
      nameList: [],
      trackBtn: '轨迹回放',
      datalist: [],
      headlist: [
        { label: '车船牌号', prop: 'vehCode', width: 'auto' },
        { label: '速度', prop: 'speed', width: 'auto' },
        { label: '方向', prop: 'direction', width: 'auto' },
        { label: '经度', prop: 'lng', width: 'auto' },
        { label: '纬度', prop: 'lat', width: 'auto' },
        { label: '地址', prop: 'address', width: 'auto' },
        { label: '定位时间', prop: 'fixTime', width: 'auto' }
      ],
      total: 1,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 5
      },
      zoom: 15,
      center: [116.336496, 39.942178],
      amapManager,
      pathSimplifierIns: null,
      trackCar: TrackCar, // 轨迹回放图片
      navg: null,
      trackPath: []
    }
  },
  created() {
    this.getTabList('/boatsInfo/cardList', {}).then(data => { // 车船列表
      this.nameList = data.data
    })
  },
  beforeDestroy() {
    if (!this.navg) {
      return
    }
    this.navg.destroy()
    this.navg = null
  },
  mounted() {
    // this.$nextTick(() => { leaflet 地图
    //   this.initMap()
    // })
  },
  methods: {
    /*  initMap() {
      var that = this
      const map = L.map('trackMap', {
        center: [that.center[1], that.center[0]],
        zoom: that.zoom
      })
      const layer = new L.TileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8', {
        subdomains: '1234'
      })
      map.addLayer(layer)
      const carIcon = L.icon({
        iconUrl: TrackCar,
        iconSize: [24, 48]
      })
      L.motion.polyline([
        [39.942178, 116.336496],
        [39.943188, 116.337596],
        [39.944198, 116.338696],
        [39.945208, 116.339796],
        [39.946228, 116.340896]
      ], {
        color: 'red'
      }, {
        auto: true,
        duration: 5000,
        easing: L.Motion.Ease.easeInOutQuart
      }, {
        removeOnEnd: false,
        icon: carIcon
      }).addTo(map)
    }, */
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
      if (query[1].vehCode === '') {
        return
      }
      this.listLoading = true
      this.searchData(query[1])
      this.trackBtn = '轨迹回放'
      if (!this.navg) {
        return
      }
      this.pathSimplifierIns.setData([])
      this.navg.destroy()
      this.navg = null
    },
    searchData(query) { // 查询
      this.getTabList('/history/loadHistory', query).then(data => {
        this.$refs.tracksearch.searchLoading = false
        this.listLoading = false
        this.total = data.data.pageList.totalElements
        this.datalist = data.data.pageList.content
        this.trackPath = []
        data.data.addressMap.forEach(item => {
          this.trackPath.push([item.lng, item.lat])
        })
      })
    },
    btnTrack() { // 轨迹回放
      var dataCount = this.datalist.length
      if (dataCount === 0) {
        this.$message({
          message: '暂无数据',
          type: 'warning',
          duration: 3000
        })
        return
      } else if (dataCount === 1) {
        this.$message({
          message: '当前只有一条记录，无法回放',
          type: 'warning',
          duration: 3000
        })
        return
      }
      var that = this
      if (that.navg === null) {
        that.initStarck()
        that.trackBtn = '停止回放'
      } else {
        if (that.trackBtn === '轨迹回放') {
          that.navg.resume()
          that.trackBtn = '停止回放'
        } else {
          that.navg.pause()
          that.trackBtn = '轨迹回放'
        }
      }
    },
    pageChange(page) {
      const query = this.$refs.tracksearch.queryData
      query.pageNum = page[0].page
      this.searchData(query)
    },
    initStarck() {
      var that = this
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
        if (!PathSimplifier.supportCanvas) {
          this.$message({
            message: '当前游览器不支持轨迹回放',
            type: 'error',
            duration: 3000
          })
          return
        }

        that.pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          // autoSetFitView:false,
          map: amapManager.getMap(), // 所属的地图实例
          getPath: function(pathData, pathIndex) {
            return pathData.path
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
            }
            return pathData.name + '，点数量' + pathData.path.length
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
          }
        })

        // 设置数据
        that.pathSimplifierIns.setData([{
          name: '路线一',
          path: that.trackPath
        }])

        // 对第一条线路（即索引 0）创建一个巡航器
        that.navg = that.pathSimplifierIns.createPathNavigator(0, {
          loop: true, // 循环播放
          speed: 200, // 巡航速度，单位千米/小时
          pathNavigatorStyle: {
            width: 16,
            height: 32,
            content: PathSimplifier.Render.Canvas.getImageContent(that.trackCar, onload, onerror)
          }
        })
        that.navg.start()
      })
    },
    indexMethod(index) { // 格式化序号
      return index + (this.listQuery.page - 1) * this.listQuery.limit + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.cartrack-container {
  padding: 15px;
  height: 100%;
  background-color: #F2F5FF;

  .car-panebg{
    background-color: #ffffff;
    position: relative;
  }

  .track-table {
    margin-top: 15px;
    padding: 15px;
    background-color: #ffffff
  }

  .amap-track{
    width: 100%;
    margin-top: 15px;
    height: 50vh;
  }
}
</style>

<template>
  <div class="routeinstall">
    <div class="leftdiv">
      <div v-for="(item,i) in data" :key="i" :class="tabfa(item.id)?'list zhong':'list'" @click="addmarker(item)">
        <img :src="item.icon" class="icon" alt="">{{ item.typeName }}
      </div>
      <div class="xin">
        <div class="header">信息提示</div>
        <div class="tabs">
        </div>
      </div>
    </div>
    <el-amap class="map" :vid="'amap-vue'" :zoom="zoom" :center="center" :events="events" :amap-manager="amapManager">
    </el-amap>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
import { get } from '@/api/axios'
var amapManager = new VueAMap.AMapManager()
export default {
  name: 'Map',
  data() {
    return {
      name: '电子地图管理',
      tab: [],
      zoom: 16,
      center: [116.336496, 39.942178],
      mapStyle1: 'amap://styles/whitesmoke',
      activeName: 'qing',
      tape: 1,
      amapManager,
      events: {},
      overlayGroups: [],
      data: [
        {
          name: '游客中心',
          path: [[116.337033, 39.938723], [116.32993, 39.941471], [116.339023, 39.938841]],
          icon: require('../../assets/icon/icon_youke.png')
        },
        {
          name: '景点',
          path: [[116.333878, 39.941471], [116.333943, 39.942655], [116.333878, 39.941471], [116.335574, 39.941322]],
          icon: require('../../assets/icon/icon_jingdian.png')
        },
        {
          name: '休息区',
          path: [[116.337483, 39.942754]],
          icon: require('../../assets/icon/icon_xiuxi.png')
        },
        {
          name: '观景台',
          path: [[116.32993, 39.941536]],
          icon: require('../../assets/icon/icon_guanjingtai.png')
        },
        {
          name: '餐饮',
          path: [[116.341689, 39.93869]],
          icon: require('../../assets/icon/icon_canyin.png')
        },
        {
          name: '商城',
          path: [[116.329866, 39.939151]],
          icon: require('../../assets/icon/icon_shangcheng.png')
        },
        {
          name: '酒店',
          path: [[116.338706, 39.946373], [116.341904, 39.946225]],
          icon: require('../../assets/icon/icon_jiudian.png')
        },
        {
          name: '停车场',
          path: [[116.337269, 39.93869], [116.340809, 39.93874]],
          icon: require('../../assets/icon/icon_p.png')
        },
        {
          name: '驿站',
          path: [[116.340659, 39.944563]],
          icon: require('../../assets/icon/icon_yizhan.png')
        },
        {
          name: '售票处',
          path: [[116.330359, 39.943905]],
          icon: require('../../assets/icon/icon_shoupiao.png')
        },
        {
          name: '卫生间',
          path: [[116.331776, 39.942425], [116.338771, 39.942721]],
          icon: require('../../assets/icon/icon_wc.png')
        },
        {
          name: '出入口',
          path: [[116.329651, 39.943297], [116.334651, 39.94402]],
          icon: require('../../assets/icon/icon_churukou.png')
        },
        {
          name: '乘车点',
          path: [[116.337075, 39.939215], [116.341581, 39.940893], [116.330992, 39.943854]],
          icon: require('../../assets/icon/icon_chengche.png')
        },
        // {
        //   name: '路况',
        //   path: []
        // },
        // {
        //   name: '观光车路线',
        //   path: []
        // },
        // {
        //   name: '巡更路线',
        //   path: []
        // },
        // {
        //   name: '推荐路线',
        //   path: []
        // },
        {
          name: '广播',
          path: [[116.336603, 39.942102], [116.330745, 39.943566], [116.333438, 39.944216]],
          icon: require('../../assets/icon/icon_guangbo.png')
        },
        {
          name: '人员',
          path: [[116.33847, 39.942662], [116.335455, 39.939762], [116.332178, 39.943168], [116.341716, 39.939877]],
          icon: require('../../assets/icon/icon_renyuan.png')
        },
        {
          name: '报警柱',
          path: [[116.338647, 39.940478], [116.332596, 39.939799], [116.338315, 39.945076]],
          icon: require('../../assets/icon/icon_baojinzhu.png')
        },
        {
          name: 'LED显示',
          path: [[116.330729, 39.943492], [116.333454, 39.944138]],
          icon: require('../../assets/icon/icon_LED.png')
        },
        {
          name: '其他定位',
          path: [[116.335069, 39.943875], [116.33692, 39.943604]],
          icon: require('../../assets/icon/icon_qitadingwei.png')
        },
        {
          name: '检测',
          path: [[116.334431, 39.94202], [116.337429, 39.94035], [116.340621, 39.941197], [116.330402, 39.941448]],
          icon: require('../../assets/icon/icon_jiance.png')
        },
        {
          name: '监控',
          path: [[116.331121, 39.943114], [116.333578, 39.945146], [116.337612, 39.945212], [116.341635, 39.942802], [116.340144, 39.940128]],
          icon: require('../../assets/icon/icon_jiankong.png')
        },
        {
          name: '医务室',
          path: [[116.339023, 39.938841], [116.340284, 39.939138]],
          icon: require('../../assets/icon/icon_yiwushi.png')
        }
      ],
      dataid: 0
    }
  },
  watch: {
  },
  created() {
    this.data = []
    this.leishua()
  },
  methods: {
    leishua() {
      const that = this
      get('/mngpoint/selectUsedPointType', { cpid: this.$store.state.user.companyId }).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].icon = process.env.VUE_APP_BASE_API + '/mngpoint/img/icon/' + res.data[i].url + '?t=' + new Date().getTime()
          that.data.push(res.data[i])
        }
      })
      // get('/mngpoint/getpointtypeByProperties', { cpid: this.$store.state.user.companyId, properties: 1 }).then(res => {
      //   console.log(res)
      //   for (var i = 0; i < res.data.length; i++) {
      //     res.data[i].icon = process.env.VUE_APP_BASE_API + '/mngpoint/img/icon/' + res.data[i].url + '?t=' + new Date().getTime()
      //     that.data.push(res.data[i])
      //   }
      // })
      // get('/mngpoint/getpointtypeByProperties', { cpid: this.$store.state.user.companyId, properties: 2 }).then(res => {
      //   console.log(res)
      //   for (var i = 0; i < res.data.length; i++) {
      //     res.data[i].icon = process.env.VUE_APP_BASE_API + '/mngpoint/img/icon/' + res.data[i].url + '?t=' + new Date().getTime()
      //     that.data.push(res.data[i])
      //   }
      // })
      // get('/mngpoint/getpointtypeByProperties', { cpid: this.$store.state.user.companyId, properties: 3 }).then(res => {
      //   console.log(res)
      //   for (var i = 0; i < res.data.length; i++) {
      //     res.data[i].icon = process.env.VUE_APP_BASE_API + '/mngpoint/img/icon/' + res.data[i].url + '?t=' + new Date().getTime()
      //     that.data.push(res.data[i])
      //   }
      // })
      // get('/mngpoint/getpointtypeByProperties', { cpid: this.$store.state.user.companyId, properties: 4 }).then(res => {
      //   console.log(res)
      //   for (var i = 0; i < res.data.length; i++) {
      //     res.data[i].icon = process.env.VUE_APP_BASE_API + '/mngpoint/img/icon/' + res.data[i].url + '?t=' + new Date().getTime()
      //     that.data.push(res.data[i])
      //   }
      // })
    },
    addmarker(data) {
      var that = this
      var markers = []
      var o = amapManager.getMap()
      o.remove(that.overlayGroups)
      if (this.tab.indexOf(data.id) !== -1) {
        this.tab.splice(this.tab.indexOf(data.id), 1)
      } else {
        that.tab.push(data.id)
      }
      console.log(that.tab, 123312221)
      for (var y = 0; y < that.tab.length; y++) {
        get('/mngpoint/getPointInfoByTypeId', { cpid: this.$store.state.user.companyId, typeid: that.tab[y] }).then(res => {
          console.log(res.data[0], that.tab[y])
          var icon
          for (var i1 = 0; i1 < that.data.length; i1++) {
            if (that.data[i1].id === res.data[0].pointTypeId) {
              icon = that.data[i1].icon
            }
          }
          for (var i = 0; i < res.data.length; i++) {
            var marker = new AMap.Marker({
              position: [res.data[i].mngPointLon, res.data[i].mngPointLat],
              icon: icon
            })
            markers.push(marker)
            this.overlayGroups = new AMap.OverlayGroup(markers)
            o.add(that.overlayGroups)
          }
        })
      }
      // for (let y = 0; y < that.tab.length; y++) {
      //   for (let x = 0; x < that.data[that.tab[y]].path.length; x++) {
      //     var marker = new AMap.Marker({
      //       position: that.data[that.tab[y]].path[x],
      //       icon: that.data[that.tab[y]].icon
      //     })
      //     markers.push(marker)
      //   }
      // }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    tabfa(i) {
      var that = this
      for (var i1 = 0; i1 < that.tab.length; i1++) {
        if (that.tab[i1] === i) {
          return true
        }
      }
    }
  }
}
</script>
<style scoped>
.routeinstall{
  width: 100%;
  height: calc(100vh - 80px);
  background: #f0f3ff;
  overflow: hidden;
}
.map{
  width: 100%;
  height: 100%;
}
.leftdiv{
  width: 250px;
  height: 100%;
  position: absolute;
  background: #fff;
  z-index: 1;
}
.leftdiv .list{
  width: 30%;
  height: 3vh;
  margin-left: 1.5%;
  background:rgba(232,237,255,1);
  border-radius:10px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(63,106,255,1);
  text-align: center;
  font-size: 10px;
  line-height: 3vh;
  float: left;
  margin-top: 10px;
  cursor:pointer;
}
.xin{
  width: 100%;
  height: 15vh;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
}
.xin .header{
  width: 100%;
  border-left: 5px solid rgba(63,106,255,1);
  padding-left: 10px;
  margin-bottom: 2%;
}
.xin .tabs{
  font-size: 1vh;
  background: rgba(232,237,255,0.7);
  /* background: #f1f4ff; */
  height: 10vh;
  width: 95%;
  color: #ffffff;
  border-radius: 1vh;
  /* margin: auto; */
  padding: 1%;
}
.leftdiv .zhong {
  background: #3F6AFF;
  color: #fff;
}
.icon{
  height: 70%;
  margin-top: 4%;
  margin-left: 10%;
  float: left;
}
</style>

<template>
  <div class="guide-wapper">
    <el-tabs
      v-model="activeName"
      style="margin-left: 20px; height: 100%;"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        ref="tabItem"
        :label="item.name"
        :name="item.name"
      >
        <div :class="{ 'concise' : item.id === 0, 'multi' : item.id === 1}">
          <div
            v-if="item.id === 1"
            class="multi-title"
          >
            <div>多功能站台</div>
            <div @click="showMulti=true">效果图展示</div>
          </div>
          <vue-particles
            v-if="item.id === 0"
            color="#59def8"
            :particle-opacity="0.9"
            :particles-number="300"
            shape-type="circle"
            :particle-size="4"
            lines-color="#59def8"
            :lines-width="1"
            :line-linked="true"
            :line-opacity="0.6"
            :lines-distance="80"
            :move-speed="2"
            :hover-effect="false"
            :click-effect="false"
            class="small-screen"
          >
          </vue-particles>
          <img
            v-if="item.id === 0"
            :src="conciseBG"
            class="concise-bg"
          >
          <div class="small-screen concise-small">
            <div class="concise-time">
              {{ time }}
            </div>
            <div class="going-to">
              开往
              <div>山林氧吧公园</div>
              <div>线路1</div>
            </div>
            <div class="coming">即将到站</div>
            <div class="arrival">到站时间</div>
            <div class="arrival-time">3</div>
            <div class="arrival arrival2">下一站</div>
            <div class="next next2">云端动物园</div>
          </div>
          <div class="big-screen">
            <el-amap
              v-show="item.id === 0"
              class="amap-guide"
              :vid="'amap-guide'"
              :amap-manager="amapManager"
              :zoom="zoom"
              :center="center"
              :events="events"
            >
              <el-amap-ground-image
                :url="url"
                :bounds="bounds"
              ></el-amap-ground-image>
            </el-amap>
            <div class="line-item">
              <div class="item1">
                <div
                  class="line1"
                  :style="lineBG1"
                ></div>
                <div class="line1-site">
                  <div
                    v-for="site1 in lineSite1"
                    :key="'site1-' + site1.index"
                    class="site-item"
                    :class="{ 'g' : site1.index<lineIndex1, 'b' : site1.index===lineIndex1 }"
                  >{{ site1.name }}</div>
                </div>
              </div>
              <div class="item2">
                <div
                  class="line2"
                  :style="lineBG2"
                ></div>
                <div class="line2-site">
                  <div
                    v-for="site2 in lineSite2"
                    :key="'site2-' + site2.index"
                    class="site-item"
                    :class="{ 'g' : site2.index<lineIndex2, 'b' : site2.index===lineIndex2 }"
                  >{{ site2.name }}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="item.id === 1"
            class="multi-bottom"
          >
            <div>紧急求救电话：</div>
            <div>400-4487-9827</div>
            <img
              :src="timg"
              class="timg"
            >
            <div class="scan">扫码关注公众号</div>
          </div>
          <div
            v-if="item.id === 1"
            class="multi-right"
          >
            <img
              :src="multi1"
              class="multi1"
            >
            <img
              :src="multi2"
              class="multi2"
            >
            <img
              :src="multi3"
              class="multi3"
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-amap
      v-show="activeName === '多功能站台'"
      class="amap-guide-multi"
      :vid="'amap-guide-multi'"
      :amap-manager="amapManager2"
      :zoom="zoom+1"
      :center="center"
      :events="events2"
      :drag-enable="false"
      :zoom-enable="false"
    >
      <el-amap-ground-image
        :url="url"
        :bounds="bounds"
      ></el-amap-ground-image>
    </el-amap>
    <div
      v-if="showMulti"
      class="image-preview"
      @click="showMulti=false"
    >
      <div
        class="close"
        :style="close"
      ></div>
      <img
        :src="multiShow"
        @click.stop=""
      >
    </div>
  </div>
</template>

<script>
import ConciseBG from '@/assets/images/guide_concise.png'
import GuideMap from '@/assets/images/guide_map.jpg'
import TrackBus from '@/assets/images/trackBus.png'
import TrackBus2 from '@/assets/images/trackBus2.png'
import Line1 from '@/assets/images/guide_line2.jpg'
import Line2 from '@/assets/images/guide_line1.jpg'
import Timg from '@/assets/images/guide_timg.png'
import Multi1 from '@/assets/images/guide_multi1.jpg'
import Multi2 from '@/assets/images/guide_multi2.jpg'
import Multi3 from '@/assets/images/guide_multi3.jpg'
import MultiShow from '@/assets/images/guide_show.png'
import MultiClose from '@/assets/images/guide_show_close.png'
import VueAMap from 'vue-amap'

var amapManager = new VueAMap.AMapManager()
var amapManager2 = new VueAMap.AMapManager()
export default {
  name: 'Guide',
  data() {
    const self = this
    return {
      activeName: '简洁站台',
      tabList: [{ id: 0, name: '简洁站台' }, { id: 1, name: '多功能站台' }],
      conciseBG: ConciseBG,
      time: '',
      zoom: 13,
      center: [103.51502, 30.783322],
      amapManager,
      amapManager2,
      pathSimplifierIns: null,
      pathSimplifierIns2: null,
      url: GuideMap,
      bounds: [[103.493247, 30.767875], [103.540969, 30.800025]],
      events: {
        init(o) {
          o.setFeatures()
          self.$nextTick(() => {
            self.initStarck(1)
          })
        },
        click(e) {
          // const { lng, lat } = e.lnglat
          // console.log(lng + ', ' + lat)
        }
      },
      events2: {
        init(o) {
          o.setFeatures()
          self.$nextTick(() => {
            self.initStarck(2)
          })
        },
        click(e) {
          // const { lng, lat } = e.lnglat
          // console.log(lng + ', ' + lat)
        }
      },
      trackBus: TrackBus,
      trackBus2: TrackBus2,
      navg: null,
      navgReverse: null,
      navg2: null,
      navgReverse2: null,
      lineBG1: {
        backgroundImage: 'url(' + Line1 + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      lineBG2: {
        backgroundImage: 'url(' + Line2 + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      lineIndex1: 1,
      lineSite1: [
        { index: 1, name: '山林氧吧公园' },
        { index: 2, name: '记忆森林康养公园' },
        { index: 3, name: '动物主题酒店' },
        { index: 4, name: '云端动物园' },
        { index: 5, name: '大熊猫商服基地' },
        { index: 6, name: '地中海俱乐部' },
        { index: 7, name: '竹博览园' },
        { index: 8, name: '森林冒险公园' },
        { index: 9, name: '大明禅寺文化度假区' },
        { index: 10, name: '大明禅寺公园' },
        { index: 11, name: '戏文化精品酒店' },
        { index: 12, name: '重庆路运动公园' },
        { index: 13, name: '威士忌主题酒店' },
        { index: 14, name: '滨河湿地公园' },
        { index: 15, name: '滨河商业街区' },
        { index: 16, name: '观音沟生态公园' },
        { index: 17, name: '希尔顿温泉度假酒店' },
        { index: 18, name: '综合接待区' },
        { index: 19, name: '山林氧吧公园' }
      ],
      lineIndex2: 1,
      lineSite2: [
        { index: 1, name: '云端动物园' },
        { index: 2, name: '大熊猫商服基地' },
        { index: 3, name: '地中海俱乐部' },
        { index: 4, name: '竹博览园' },
        { index: 5, name: '森林冒险公园' },
        { index: 6, name: '大明禅寺公园' },
        { index: 7, name: '戏文化精品酒店' },
        { index: 8, name: '重庆路运动公园' },
        { index: 9, name: '滨河湿地公园' },
        { index: 10, name: '滨河商业街区' },
        { index: 11, name: '观音沟生态公园' },
        { index: 12, name: '综合接待区' },
        { index: 13, name: '云端动物园' }
      ],
      timg: Timg,
      multi1: Multi1,
      multi2: Multi2,
      multi3: Multi3,
      multiShow: MultiShow,
      close: {
        backgroundImage: 'url(' + MultiClose + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      showMulti: false
    }
  },
  created() {
    this.getData()
    var that = this
    setInterval(() => {
      if (that.lineIndex1 >= 19) {
        that.lineIndex1 = 1
      } else {
        that.lineIndex1++
      }

      if (that.lineIndex2 >= 13) {
        that.lineIndex2 = 1
      } else {
        that.lineIndex2++
      }
    }, 2000)
  },
  beforeDestroy() {
    if (!this.navg) {
      return
    }
    this.navg.destroy()
    this.navg = null

    if (!this.navg2) {
      return
    }
    this.navg2.destroy()
    this.navg2 = null
  },
  methods: {
    handleClick(tab, event) {},
    getData() {
      const t = new Date() // 创建一个date的对象，才可以引用相关的date
      this.time =
        t.getFullYear() +
        '年' +
        (t.getMonth() + 1) +
        '月' +
        t.getDate() +
        '日 ' +
        t.getHours() +
        ':' +
        this.formatTimeItem(t.getMinutes()) +
        ':' +
        this.formatTimeItem(t.getSeconds())
      const that = this
      setTimeout(() => {
        that.getData()
      }, 1000)
    },
    formatTimeItem(item) {
      return item < 10 ? '0' + item : item
    },
    initStarck(index) {
      var that = this // UI 组件库 轨迹展示
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(
        PathSimplifier,
        $
      ) {
        if (!PathSimplifier.supportCanvas) {
          this.$message({
            message: '当前游览器不支持线路轨迹',
            type: 'error',
            duration: 3000
          })
          return
        }

        const emptyLineStyle = {
          lineWidth: 0,
          fillStyle: null,
          strokeStyle: null,
          borderStyle: null
        }

        var pathSimplifierIns = new PathSimplifier({
          zIndex: 300,
          // autoSetFitView:false,
          map: index === 1 ? amapManager.getMap() : amapManager2.getMap(), // 所属的地图实例
          autoSetFitView: false,
          getPath: function(pathData, pathIndex) {
            return pathData.path
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            // if (pointIndex >= 0) {
            //   return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
            // }
            // return pathData.name + '，点数量' + pathData.path.length
            return null
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: -1, // 绘制路线节点，如不需要可设置为-1
            // 将点、线相关的style全部置emptyLineStyle
            pathLineStyle: emptyLineStyle,
            pathLineSelectedStyle: emptyLineStyle,
            pathLineHoverStyle: emptyLineStyle,
            keyPointStyle: emptyLineStyle,
            startPointStyle: emptyLineStyle,
            endPointStyle: emptyLineStyle,
            keyPointHoverStyle: emptyLineStyle,
            keyPointOnSelectedPathLineStyle: emptyLineStyle
          }
        })

        if (index === 1) {
          that.pathSimplifierIns = pathSimplifierIns
        } else {
          that.pathSimplifierIns2 = pathSimplifierIns
        }

        var pathData = [
          [103.516162, 30.794717],
          [103.509038, 30.795233],
          [103.504403, 30.791251],
          [103.499599, 30.786016],
          [103.497281, 30.779675],
          [103.499513, 30.773923],
          [103.503032, 30.775545],
          [103.507409, 30.776946],
          [103.510413, 30.777462],
          [103.511873, 30.773554],
          [103.513332, 30.769867],
          [103.514877, 30.768465],
          [103.518996, 30.769572],
          [103.52346, 30.770678],
          [103.522945, 30.773259],
          [103.529468, 30.773333],
          [103.530841, 30.777094],
          [103.52612, 30.77938],
          [103.528438, 30.786237],
          [103.53127, 30.789703],
          [103.527065, 30.793021],
          [103.516078, 30.794717]
        ]
        var pathUp = pathData.concat()
        var pathDown = pathData.reverse()

        // 设置数据
        pathSimplifierIns.setData([
          {
            name: '上行',
            path: pathUp
          },
          {
            name: '下行',
            path: pathDown
          }
        ])

        // 对第一条线路（即索引 0）创建一个巡航器
        if (index === 1) {
          that.navg = pathSimplifierIns.createPathNavigator(0, {
            loop: true, // 循环播放
            speed: 400, // 巡航速度，单位千米/小时
            pathNavigatorStyle: {
              width: 16,
              height: 32,
              content: PathSimplifier.Render.Canvas.getImageContent(
                that.trackBus,
                onload,
                onerror
              ),
              strokeStyle: null,
              fillStyle: null,
              pathLinePassedStyle: {
                // 经过路径的样式
                lineWidth: 0,
                strokeStyle: 'black',
                dirArrowStyle: {
                  stepSpace: 15,
                  strokeStyle: 'red'
                }
              }
            }
          })
          that.navg.start()

          that.navgReverse = pathSimplifierIns.createPathNavigator(1, {
            loop: true, // 循环播放
            speed: 400, // 巡航速度，单位千米/小时
            pathNavigatorStyle: {
              width: 16,
              height: 32,
              content: PathSimplifier.Render.Canvas.getImageContent(
                that.trackBus2,
                onload,
                onerror
              ),
              strokeStyle: null,
              fillStyle: null,
              pathLinePassedStyle: {
                // 经过路径的样式
                lineWidth: 0,
                strokeStyle: 'black',
                dirArrowStyle: {
                  stepSpace: 15,
                  strokeStyle: 'red'
                }
              }
            }
          })
          that.navgReverse.start()
        } else {
          that.navg2 = pathSimplifierIns.createPathNavigator(0, {
            loop: true, // 循环播放
            speed: 400, // 巡航速度，单位千米/小时
            pathNavigatorStyle: {
              width: 16,
              height: 32,
              content: PathSimplifier.Render.Canvas.getImageContent(
                that.trackBus,
                onload,
                onerror
              ),
              strokeStyle: null,
              fillStyle: null,
              pathLinePassedStyle: {
                // 经过路径的样式
                lineWidth: 0,
                strokeStyle: 'black',
                dirArrowStyle: {
                  stepSpace: 15,
                  strokeStyle: 'red'
                }
              }
            }
          })
          that.navg2.start()

          that.navgReverse2 = pathSimplifierIns.createPathNavigator(1, {
            loop: true, // 循环播放
            speed: 400, // 巡航速度，单位千米/小时
            pathNavigatorStyle: {
              width: 16,
              height: 32,
              content: PathSimplifier.Render.Canvas.getImageContent(
                that.trackBus2,
                onload,
                onerror
              ),
              strokeStyle: null,
              fillStyle: null,
              pathLinePassedStyle: {
                // 经过路径的样式
                lineWidth: 0,
                strokeStyle: 'black',
                dirArrowStyle: {
                  stepSpace: 15,
                  strokeStyle: 'red'
                }
              }
            }
          })
          that.navgReverse2.start()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.guide-wapper {
  width: 100%;
  height: calc(100% - 40px);

  & .el-tabs__header {
    margin: 0 !important;
  }

  & .el-tabs__content {
    height: 100%;
    padding: 15px;
    background-color: #f2f5ff;
  }

  & .g {
    color: #878ca9;
  }

  & .b {
    font-weight: bold;
    color: #45a59a;
  }

  & .amap-guide-multi {
    position: absolute;
    top: 182px;
    left: 200px;
    width: 390px;
    height: 390px;
  }

  & .concise {
    width: 1200px;
    height: 578px;
    position: relative;

    & .small-screen {
      position: absolute;
      left: 142px;
      top: 120px;
      width: 182px;
      height: 254px;
      transform-style: preserve-3d;
      transform: rotateZ(-1deg);
      background: linear-gradient(
        74deg,
        rgba(3, 20, 27, 1) 0%,
        rgba(32, 95, 109, 1) 100%
      );
      color: #ffffff;
      font-size: 12px;
      z-index: 10;
    }

    & .concise-small {
      background: transparent;
      padding: 15px 0 0 15px;

      & .going-to {
        color: #54f1fb;
        margin-top: 25px;
        width: 160px;
        display: flex;
        height: 18px;
        line-height: 18px;
      }

      & .going-to > div {
        margin: 0 auto;
      }

      & .going-to div:nth-child(1) {
        background: #17434e;
        width: 80px;
        height: 18px;
        line-height: 18px;
        text-align: center;
      }

      & .going-to div:nth-child(2) {
        border: 1px solid #54f1fb;
        width: 38px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 5px;
      }

      & .coming {
        font-size: 14px;
        margin-top: 12px;
      }

      & .arrival {
        color: #54f1fb;
        margin-top: 20px;
        margin-bottom: 8px;
      }

      & .next,
      & .arrival-time {
        font-size: 14px;
      }

      & .arrival-time::after {
        content: ' 分钟';
      }
    }

    & .concise-bg {
      width: 1200px;
      height: 578px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
    }

    .big-screen {
      position: absolute;
      right: 342px;
      top: 70px;
      width: 283px;
      height: 480px;
      background-color: #ffffff;
      color: #000000;
      font-size: 12px;
      z-index: 10;

      & .amap-guide {
        width: 100%;
        height: 40%;
      }

      & .line-item {
        width: 100%;
        height: 60%;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 6px;

        & .item1,
        & .item2 {
          padding-bottom: 5px;
          box-sizing: border-box;
          box-shadow: 0 0 10px #defcff;
        }

        & .line1,
        & .line2 {
          height: 40px;
        }

        & .line1-site,
        & .line2-site {
          display: flex;
          padding: 0 5px;
        }

        & .site-item {
          width: 12px;
          margin: 0 auto;
        }
      }
    }
  }

  & .multi {
    position: relative;
    width: 1250px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #ffffff;
    padding-bottom: 10px;

    .multi-title {
      margin: 6px 0 0 10px;
      width: 100%;
      height: 25px;
      font-size: 14px;

      & div:nth-child(1) {
        width: 90px;
        text-align: center;
        line-height: 25px;
        float: left;
      }

      & div:nth-child(2) {
        width: 90px;
        float: left;
        margin-left: 20px;
        text-align: center;
        line-height: 25px;
        height: 25px;
        border-radius: 15px;
        border: 1px solid #3f6aff;
        color: #3f6aff;
      }
    }

    & .small-screen {
      position: absolute;
      left: 170px;
      top: 38px;
      width: 780px;
      height: 92px;
      background: linear-gradient(
        90deg,
        rgba(8, 38, 51, 1) 0%,
        rgba(26, 72, 85, 1) 50%,
        rgba(8, 38, 51, 1) 100%
      );
      color: #ffffff;
      font-size: 14px;
    }

    & .concise-small {
      padding: 20px;

      & .going-to {
        color: #54f1fb;
        margin-top: 12px;
        padding-right: 10px;
        display: flex;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        float: left;
        box-sizing: border-box;
      }

      & .going-to > div {
        margin: 0 auto;
      }

      & .going-to div:nth-child(1) {
        background: #17434e;
        padding: 0 20px;
        margin: 0 20px;
        height: 24px;
        line-height: 24px;
        text-align: center;
      }

      & .going-to div:nth-child(2) {
        border: 1px solid #54f1fb;
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 12px;
      }

      & .coming {
        font-size: 20px;
        margin: 12px 50px 0 30px;
        float: left;
      }

      & .arrival {
        color: #54f1fb;
        margin-top: -12px;
      }

      & .arrival2 {
        margin-top: -47px;
        float: left;
        margin-left: 570px;
      }

      & .next,
      & .arrival-time {
        font-size: 20px;
        margin-top: 8px;
      }

      & .arrival-time::after {
        content: ' 分钟';
      }

      & .next2 {
        float: left;
        margin-top: -25px;
        margin-left: 570px;
      }
    }

    & .big-screen {
      position: relative;
      top: 108px;
      left: 170px;
      width: 780px;
      height: 436px;
      background-color: #ffffff;
      color: #000000;
      font-size: 18px;

      & .line-item {
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 6px;
        float: left;
        margin-left: 50%;
        font-size: 12px;

        & .item1,
        & .item2 {
          padding: 5px 0;
          box-sizing: border-box;
          box-shadow: 0 0 15px #defcff;
          margin-bottom: 10px;
        }

        & .line1,
        & .line2 {
          height: 65px;
        }

        & .line1-site,
        & .line2-site {
          display: flex;
          padding: 0 5px;
        }

        & .site-item {
          width: 12px;
          margin: 0 auto;
        }
      }
    }
  }

  & .multi-bottom {
    position: relative;
    margin-top: 72px;
    width: 840px;
    margin-left: 110px;
  }

  & .multi-bottom div:nth-child(1) {
    margin-left: 100px;
    font-size: 14px;
    float: left;
    font-weight: bold;
    margin-top: 15px;
  }

  & .multi-bottom div:nth-child(2) {
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    float: left;
    font-size: 22px;
    margin-top: 10px;
    color: #45a699;
  }

  & .multi-bottom .scan {
    float: right;
    margin-top: 32px;
    margin-right: 10px;
    font-size: 14px;
  }

  & .multi-bottom img {
    float: right;
    width: 65px;
    height: 65px;
    margin-top: -16px;
    margin-right: 20px;
  }

  & .multi-right {
    width: 270px;
    height: 556px;
    position: absolute;
    top: 38px;
    left: 956px;

    & .multi1 {
      width: 100%;
      height: 65%;
      float: left;
    }

    & .multi2 {
      width: 49%;
      height: 35%;
      float: left;
    }

    & .multi3 {
      width: 49%;
      height: 35%;
      float: left;
      margin-left: 2%;
    }
  }
}

.amap-logo {
  display: none !important;
}

.amap-copyright {
  display: none !important;
}

.image-preview {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  right: 0;
  cursor: default;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  padding-top: 100px;
  z-index: 10000;

  .close {
    position: absolute;
    height: 30px;
    width: 30px;
    margin-left: calc(50% + 472px);
    margin-top: -5px;
  }

  img {
    width: 1000px;
    height: 571px;
  }
}
</style>

<template>
  <div class="command">
    <!-- <router-link to="/map" tag="span">
			<div class="com_btn" @mouseenter="bbb('地图')" style="position: absolute;
			width: 3.95rem;height: 2.2rem;left: 7.7rem;top: 3.4rem;z-index: 999;">
			</div>
    </router-link>-->

    <!-- <div class="com_btn" @click="goIndex" style="position: absolute;
			width: 7rem;height: 3.5rem;left: 6.2rem;top: 5.8rem;z-index: 999">
    </div>-->

    <!-- <router-link to="/guanli" tag="span">
			<div class="com_btn" @mouseenter="bbb('管理')" style="position: absolute;
			width: 1.8rem;height: 1.2rem;left: 13.5rem;top: 4.6rem;z-index: 999;">
			</div>
    </router-link>-->
    <!-- <router-link to="/guide" tag="span">
			<div class="com_btn" @mouseenter="bbb('导览')" style="position: absolute;
			width: 1.8rem;height: 1.4rem;left: 13.5rem;top: 3.2rem;z-index: 999;">
			</div>
    </router-link>-->
    <!-- <router-link to="/broadcast" tag="span">
			<div class="com_btn" @mouseenter="bbb('广播')" style="position: absolute;
			width: 1.7rem;height: 1.3rem;left: 11.8rem;top: 3.2rem;z-index: 999;">
			</div>
    </router-link>-->
    <!-- <router-link to="/equipment" tag="span">
			<div class="com_btn" @mouseenter="bbb('设备')" style="position: absolute;
			width: 1.7rem;height: 1rem;left: 11.8rem;top: 4.6rem;z-index: 999;">
			</div>
    </router-link>-->

    <!-- <router-link to="/resource" tag="span">
			<div class="com_btn" @mouseenter="bbb('能源')" style="position: absolute;
			width: 1.7rem;height: 1rem;left: 6rem;top: 4.6rem;z-index: 999;">
			</div>
    </router-link>-->
    <!-- <router-link to="/guanli" tag="span">
			<div class="com_btn" @mouseenter="bbb('体能检测管理')" style="position: absolute;
			width: 1.7rem;height: 1.2rem;left: 4.2rem;top: 4.6rem;z-index: 999;">
			</div>
		</router-link>
		<router-link to="/guard" tag="span">
			<div class="com_btn" @mouseenter="bbb('巡更')" style="position: absolute;
			width: 1.7rem;height: 1.5rem;left: 4.2rem;top: 3rem;z-index: 999;">
			</div>
		</router-link>
		<router-link to="/more" tag="span">
			<div class="com_btn" @mouseenter="bbb('大数据')" style="position: absolute;
			width: 3.8rem;height: 4rem;left: 15.3rem;top: 2.7rem;z-index: 999;">
			</div>
    </router-link>-->

    <div class="box">
      <!--<transition>-->
      <router-link to="/shipin" tag="span">
        <div class="ani_box shipin_rou" @mouseenter="bbb('视频')">
          <div class="bigcircle" :class="{act_go: areaName === '视频'}"></div>
          <div class="goline" :class="{gochang: areaName === '视频'}"></div>
          <div class="notebox" :class="{goshow: areaName === '视频'}">视频监控</div>
        </div>
      </router-link>

      <router-link to="/map2" tag="span">
        <div class="ani_box scenicMap_rou" @mouseenter="bbb('地图')">
          <div class="bigcircle" :class="{act_go: areaName === '地图'}"></div>
          <div class="goline" :class="{gochang: areaName === '地图'}"></div>
          <div class="notebox" :class="{goshow: areaName === '地图'}">景区地图</div>
        </div>
      </router-link>
      <router-link to="/guanli" tag="span">
        <div class="ani_box carControl_rou" @mouseenter="bbb('智能检测管理')">
          <div class="bigcircle" :class="{act_go: areaName === '智能检测管理'}"></div>
          <div class="goline" :class="{gochang: areaName === '智能检测故管理'}"></div>
          <div class="notebox" :class="{goshow: areaName === '智能检测管理'}">体能检测</div>
        </div>
      </router-link>
      <router-link to="/xinxi" tag="span">
        <div class="ani_box guide_rou" @mouseenter="bbb('导览')">
          <div class="bigcircle" :class="{act_go: areaName === '导览'}"></div>
          <div class="goline" :class="{gochang: areaName === '导览'}"></div>
          <div class="notebox" :class="{goshow: areaName === '导览'}">信息发布</div>
        </div>
      </router-link>

      <router-link to="/paodao" tag="span">
        <div class="ani_box equipment_rou" @mouseenter="bbb('设备')">
          <div class="bigcircle" :class="{act_go: areaName === '设备'}"></div>
          <div class="goline" :class="{gochang: areaName === '设备'}"></div>
          <div class="notebox" :class="{goshow: areaName === '设备'}">智能跑道</div>
        </div>
      </router-link>

      <router-link to="/about" tag="span">
        <div class="ani_box diaodu_rou" @mouseenter="bbb('调度')">
          <div class="bigcircle" :class="{act_go: areaName === '调度'}"></div>
          <div class="goline" :class="{gochang: areaName === '调度'}"></div>
          <div class="notebox" :class="{goshow: areaName === '调度'}">应急指挥调度</div>
        </div>
      </router-link>
      <router-link to="/more" tag="span">
        <div class="ani_box bigdata_rou" @mouseenter="bbb('大数据')">
          <div class="bigcircle" :class="{act_go: areaName === '大数据'}"></div>
          <div class="goline" :class="{gochang: areaName === '大数据'}"></div>
          <div class="notebox" :class="{goshow: areaName === '大数据'}">大数据中心</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'Command',
  components: {},
  data() {
    return {
      areaName: '',
      act_go: false,
      act_out: false,
      gochang: false,
      goshow: false,
      gobig: false,
      bgBasicSize: {
        width: 1000,
        height: 469
      },
      bgWidth: 0,
      timeoutFn: null
    }
  },
  computed: {
    mapCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [396, 172, 605, 281]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    cameraCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [12, 100, 210, 350]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    dataCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [790, 150, 990, 450]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    carCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [696, 235, 784, 305]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    ledCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [674, 165, 784, 230]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    castCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [640, 166, 694, 230]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    organCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [604, 232, 694, 290]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    sourceCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [305, 232, 395, 280]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    urgentCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [305, 169, 395, 230]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },
    watchCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [218, 150, 305, 230]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    },

    parkCoords() {
      const rate = this.bgWidth / this.bgBasicSize.width
      const result = [215, 300, 305, 230]
        .map(item => (item * rate).toFixed(0))
        .join(',')
      return result
    }
  },
  mounted() {},
  methods: {
    bbb(areaName) {
      clearTimeout(this.timeoutFn)
      this.timeoutFn = setTimeout(() => {
        this.areaName = ''
      }, 5000)
      this.areaName = areaName
      this.act_go = true
      this.gochang = true
      this.goshow = true
    },
    aaa() {
      this.areaName = ''
      this.act_go = false
      this.gochang = false
      this.goshow = false
    },

    goIndex() {
      console.log(323)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.command {
  height: 100%;
  position: relative;
  min-height: 678px;
  background: #38394b;
  background-image: url(../../assets/yingzhi/command.jpg);
  background-repeat: no-repeat;
  background-size: 100% auto;
  .com_btn {
    position: absolute;
    z-index: 88;
    cursor: pointer;
  }
  .act_go {
    animation: act_go 0.5s;
    animation-fill-mode: forwards;
  }
  @keyframes act_go {
    0% {
      opacity: 0;
      -webkit-transform: scale(0);
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(1.2);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
    }
  }
  .gochang {
    animation: gochang 0.6s 0.3s;
    animation-fill-mode: forwards;
  }
  @keyframes gochang {
    0% {
      opacity: 0;
      transform: scaleX(0);
      transform-origin: left;
    }
    100% {
      opacity: 1;
      transform-origin: left;
      transform: scaleX(1);
    }
  }
  .goshow {
    animation: goshow 0.4s 0.5s;
    animation-fill-mode: forwards;
  }
  @keyframes goshow {
    0% {
      opacity: 0;
      transform: translateX(-10%) scale(0);
      transform-origin: left;
    }
    100% {
      opacity: 1;
      transform-origin: left;
      transform: translateX(0) scale(1);
    }
  }
  .box {
    position: relative;
    top: 0;
    left: 0;
    min-width: 100%;
    height: 100%;
    width: 100%;
    .shipin_rou {
      left: 7vw;
      top: 34.5vh;
    }
    .scenicMap_rou {
      left: 45vw;
      top: 34.5vh;
    }
    .carControl_rou {
      left: 60.5vw;
      top: 34.5vh;
    }
    .guide_rou {
      left: 70vw;
      top: 34.5vh;
    }
    .equipment_rou {
      left: 22vw;
      top: 34.5vh;
    }
    .diaodu_rou {
      left: 30vw;
      top: 34.5vh;
    }
    .bigdata_rou {
      right: 6vw;
      top: 34.5vh;
    }
    .ani_box {
      position: absolute;
      color: #ffffff;
      min-width: 2vw;
      height: 22vh;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .bigcircle {
        /*position: absolute;*/
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        width: 1vw;
        height: 1vw;
        margin-left: 50px;
        opacity: 0;
        box-shadow: 0 0 14px 1px rgba(255, 255, 255, 0.5);
      }
      .goline {
        width: 2vw;
        height: 1px;
        background: rgba(255, 255, 255, 0.8);
        left: 0.5vw;
        top: 1vh;
        opacity: 0;
      }
      .notebox {
        left: 1vw;
        padding: 5px 10px;
        border-radius: 50px;
        background: #666666;
        border: 1px solid #ffffff;
        opacity: 0;
      }
    }
    img {
      width: 100%;
      position: absolute;
      top: 0;
    }
    .mapbtn {
      /*border: 1px solid red;*/
      width: 65px;
      height: 64px;
      position: absolute;
      left: 200px;
      top: 200px;
    }
  }
}
</style>

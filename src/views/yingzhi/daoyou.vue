<template>
  <div class="daoyou" @click="dl = !dl">
    导览
    <div v-if="dl" class="dl">
      <div @click="tiao('more')">大数据中心</div>
      <div @click="tiao('shipin')">视频监控</div>
      <div @click="tiao('about')">应急指挥</div>
      <div @click="tiao('map2')">电子地图</div>
      <div @click="tiao('daping')">指挥中心</div>
      <div @click="tiao('xinxi')">信息发布</div>
      <div @click="tiao('paodao')">智能跑道管理</div>
      <div @click="tiao('guanli')">体能检测管理</div>
      <div @click="tiao('equipmentstatistics')">设备统计</div>
      <div @click="tiao('roadtest')">生态廊道监管考核</div>
      <div @click="tiao('wartertest')">生态廊道水质监测</div>
      <div @click="tiao('datacenter')">数据中心</div>
    </div>
    <div class="tuic" @click="tiao('/')">退出</div>
  </div>
</template>

<script scoped>
export default {
  name: 'Daoyou',
  components: {},
  data() {
    return {
      dl: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    tiao(i) {
      this.$router.push({
        path: i
      })
    }
  }
}
</script>

<style scoped>
.daoyou {
  width: 80px;
  height: 18px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  font-size: 15px;
  text-align: center;
  line-height: 18px;
  color: #6ddcf8;
  cursor: pointer;
}
.dl {
  width: 120px;
  position: relative;
  top: 100%;
  background: #060838;
  z-index: 1000;
}
.dl div {
  width: 100%;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  border-top: 1px solid #000;
}
.tuic {
  position: fixed;
  right: 20px;
  color: #6ddcf8;
  top: 5px;
}
</style>

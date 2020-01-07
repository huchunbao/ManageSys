<template>
  <div class="fourcorners">
    <div class="bg_opacity"></div>
    <div v-if="showimg" class="imgs">
      <img src="../../../assets/yingzhi/top_left.png">
      <img src="../../../assets/yingzhi/top_right.png">
      <img src="../../../assets/yingzhi/left_bottom.png">
      <img src="../../../assets/yingzhi/right_bottom.png">
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'About',
  props: {
    showimg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    // 背景透明组件，父级必须position: relative;
    }
  }
}
</script>

<style scoped>
/* 四个角落img */
.fourcorners{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.fourcorners .bg_opacity{
  width: 100%;
  height: 100%;
  background:rgba(31,58,137,1);
  border:1px solid rgba(22,199,251,1);
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.fourcorners .imgs img{
  position: absolute;
  width: 15px;
  height: 15px;
}
.fourcorners .imgs img:nth-child(1){
  top: 0;
  left: 0;
}
.fourcorners .imgs img:nth-child(2){
  top: 0;
  right: 0;
}
.fourcorners .imgs img:nth-child(3){
  bottom: 0;
  left: 0;
}
.fourcorners .imgs img:nth-child(4){
  bottom: 0;
  right: 0;
}
</style>

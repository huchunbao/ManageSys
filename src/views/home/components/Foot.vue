<template>
  <div class="foot-wapper">
    <span>版权所有 © 银科环企软件技术有限公司 2019 保留一切权利 苏ICP备17040376号-5 苏B2-20130048号</span>
    <span>苏公网安备 32011402010008号</span>
  </div>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style lang="scss" scoped>
.foot-wapper{
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 50px;
  font-size: 12px;
  color: #6E6E6E;
  text-align: center;
  z-index: 100;

  & span{
    display: block;
    height: 25px;
    line-height: 25px;
  }
}
</style>

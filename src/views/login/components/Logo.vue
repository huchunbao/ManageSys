<template>
  <div class="logo-title" style="padding: 0 15px;">
    <img :src="logo" width="auto" height="60%" class="logo" :alt="sysName">
    <span class="sysname">{{ sysName }}</span>
  </div>
</template>

<script>
import Logo from '@/assets/images/logo.png'
import settings from '@/settings'

export default {
  name: 'LoginLogo',
  data() {
    return {
      logo: Logo,
      sysName: settings.title
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-title{
  position: absolute;
  height: 40px;
  vertical-align: middle;

  .logo{
    vertical-align: middle;
  }

  .sysname{
    color: #fff;
    margin-left: 10px;
    height: 100%;
    line-height: 50px;
    font-size: 14px;
  }
}
</style>

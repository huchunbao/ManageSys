<template>
  <div style="padding: 0 15px;" @click="toHomeClick">
    <img :src="Logo" width="auto" height="60%" class="logo" :alt="SysName">
    <span class="sysname">{{ SysName }}</span>
  </div>
</template>

<script>
import Logo from '@/assets/images/logo.png'
import settings from '@/settings'

export default {
  name: 'Hamburger',
  data() {
    return {
      Logo: Logo,
      SysName: settings.title
    }
  },
  methods: {
    toHomeClick() {
      this.$emit('toHome')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 40%;
  height: 100%;
}

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
</style>

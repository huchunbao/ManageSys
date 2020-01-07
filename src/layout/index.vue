<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <navbar />
    <sidebar class="sidebar-container" @mouseenter.native="openSideBar" @mouseleave.native="handleClickOutside" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <tags-view v-if="needTagsView" />
      <app-main />
    </div>
    <router-link to="/alarm/index">
      <div class="alarm-right" :style="'background-image: url('+ alarmRight +')'">
        <div class="alarm-right-info">{{ alarm }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import AlarmRight from '@/assets/images/alarm-right.png'
import Breadcrumb from '@/components/Breadcrumb'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Breadcrumb,
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      alarmRight: AlarmRight,
      alarm: '报警'
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: true })
    },
    openSideBar() {
      this.$store.dispatch('app/openSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .breadcrumb-container{
    position: fixed;
    left: 54px;
    top: 50px;
    height: 30px;
    line-height: 30px !important;
    margin-left: 0 !important;
    font-size: 13px !important;
    padding-left: 18px;
    z-index: 998;
    background-color: #fff;
    width: calc(100vw - 72px);
  }

.alarm-right{
  position: fixed;
  right: 0;
  bottom: 80px;
  width: 101px;
  height: 66px;
  padding-left: 58px;
  line-height: 56px;
  color: #ffffff;
  z-index: 1002;
}
</style>

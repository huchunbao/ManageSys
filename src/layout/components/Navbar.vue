<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      class="hamburger-container"
      @toHome="toHome"
    />
    <topMenu
      id="top-menu"
      class="top-menu"
    />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <screenfull
          id="screenfull"
          class="right-menu-item hover-effect"
        />
      </template>
      <div class="avatar-container right-menu-item">
        <div class="avatar-image">
          <img
            :src="avatar"
            class="user-avatar"
          >
        </div>
      </div>
      <div class="user-card">
        <div class="name-roles">Hi，{{ name + '(' + roles + ')' }}</div>
        <div class="login-out" @click="logout">安全退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import TopMenu from '@/components/TopMenu'

export default {
  components: {
    Hamburger,
    Screenfull,
    TopMenu
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'name', 'roles'])
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/home' })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
$menuHeight: 50px;
.navbar {
  top: 0;
  height: $menuHeight;
  width: 100%;
  overflow: hidden;
  position: fixed;
  background: #121430;
  z-index: 500;
  color: #fff;
  font-size: 12px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: $menuHeight;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .top-menu {
    position: fixed;
    height: $menuHeight;
    top: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 384px;
    background-color: transparent;
  }

  .user-card {
    float: right;
    margin-right: 20px;

    div{
      float: left;
    }
    .name-roles:after{
      content: "|";
      margin: 0 8px;
    }

    .login-out{
      cursor: pointer;
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $menuHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;
      height: 100;

      .avatar-image {
        height: 100%;
        position: relative;

        .user-avatar {
          width: 26px;
          height: 26px;
          border-radius: 13px;
          vertical-align: middle;
        }
      }
    }
  }
}

.navbar:hover{
  background-color: #2F3153;
}
</style>

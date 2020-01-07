<template>
  <div class="home-wrapper">
    <navbar />
    <el-carousel trigger="click" class="home-carousel">
      <el-carousel-item>
        <img src="@/assets/images/home-carousel1.jpg">
        <div class="carousel1-wrapper">
          <img src="@/assets/images/home-carousel1-text.png" class="carousel1-text">
          <div class="property">
            <ul>
              <li>
                <svg-icon icon-class="visualization" />
                <span class="li-title">可视化</span>
                <span>Visualization</span>
                <span style="opacity: 0;">1</span>
              </li>
              <li>
                <svg-icon icon-class="integrate" />
                <span class="li-title">云管理</span>
                <span>Cloud</span>
                <span>Management</span>
              </li>
              <li>
                <svg-icon icon-class="highefficiency" />
                <span class="li-title">引流&口碑</span>
                <span>Drainage</span>
                <span>Word of mouth</span>
              </li>
            </ul>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item class="carousel2-wrapper" :style="carousel2BG">
        <img class="carousel2-text" src="@/assets/images/home-carousel2-text.png">
        <img class="carousel2-img" src="@/assets/images/home-carousel2-img.png">
      </el-carousel-item>
    </el-carousel>
    <foot />
  </div>
</template>

<script>
import Navbar from '@/layout/components/Navbar'
import Foot from './components/Foot'
import Carousel2 from '@/assets/images/home-carousel2.jpg'

export default {
  name: 'Home',
  components: { Navbar, Foot },
  data() {
    return {
      carousel2BG: {
        backgroundImage: 'url(' + Carousel2 + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss">
.home-wrapper{
  height: 100%;
  width: 100%;

  & .home-carousel{
    position: absolute;
    margin-top: 50px;
    height: calc(100vh - 50px);
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;

    .el-carousel__container{
      height: 100%;

      img{
        height: 100%;
        width: 100%;
      }

      .el-carousel__item{
        text-align: center;
      }
    }

    .carousel1-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 120px auto 0;
      color: #fff;

      .carousel1-text{
        width: 449px;
        height: 94px;
      }

      .property{
        margin-top: 100px;

        ul,li{
          padding:0;
          margin:0;
          list-style:none;
        }

        li{
          font-size: 12px;
          height: 180px;
          width: 90px;
          padding-top: 40px;
          border-radius: 45px;
          display: inline-block;

          & .svg-icon{
            height: 30px;
            width: 30px;
            margin-bottom: 22px;
          }

          & span{
            height: 18px;
            display: block;
          }

          & .li-title{
            font-size: 14px;
            height: 24pxs;
          }
        }

        li:nth-child(2){
          margin: 0 15%;
        }

        li:hover{
          background-color: #554AE5;
        }
      }
    }

    .carousel2-wrapper{

      .carousel2-text{
        position: absolute;
        width: 250px;
        height: auto;
        left: 15%;
        top:  50%;
        transform: translate(0, -50%);
      }

      .carousel2-img{
        position: absolute;
        width: 55%;
        height: auto;
        right: 2%;
        top:  50%;
        transform: translate(0, -50%);
      }
    }
  }
}
</style>

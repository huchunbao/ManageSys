<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <div class="daohang" @click="dhf">
        <div class="sanjiao"></div>
        导航
      </div>
      <div class="header_text">系统设置</div>
      <!-- 导航栏 -->
      <div class="dhdiv" :class="dh ? 'dh1' : 'dh2'">
        <div class="sanjiao2"></div>
        <div class="lis">可视化大数据中心</div>
        <div class="lis">应急指挥调度中心</div>
        <div class="lis">后台管理系统中心</div>
      </div>
    </div>

    <div style="margin-top:10px;  margin-left:13px;">
      <router-link to="/xitong"><button>个人信息</button></router-link>
      <router-link to="/jiagou"><button>组织架构</button></router-link>
      <button>权限管理</button>
      <button>账号管理</button>
      <button>数据采集</button>
    </div>

    <!--  -->
    <div class="dak1">
      <button>个人信息</button>
      <button>组织架构</button>
      <button>权限管理</button>
      <button>账号管理</button>
      <button>数据采集</button>
    </div>
    <nav>
      <ul>
        <li>
          <a href="#">企&nbsp;总公司(6)</a>
          <ul>
            <li><a href="#">1</a></li>
            <li>
              <a href="#">2</a>
              <ul>
                <li><a href="#">部&nbsp;A1部门(4)</a></li>
                <li><a href="#">a</a></li>
                <li><a href="#">b</a></li>
                <li><a href="#">c</a></li>
                <li><a href="#">d</a></li>
              </ul>
            </li>
            <li>
              <a href="#">3</a>
              <ul>
                <li><a href="#">部&nbsp;A2部门(2)</a></li>
                <li><a href="#">a1</a></li>
                <li><a href="#">a2</a></li>
              </ul>
              <ul></ul>
            </li>
            <li>
              <a href="#">4</a>
              <ul>
                <li><a href="#">企&nbsp;分公司(4)</a></li>
                <li><a href="#">分一</a></li>
                <li><a href="#">分二</a></li>
                <li><a href="#">分三</a></li>
                <li><a href="#">分四</a></li>
              </ul>
            </li>
            <li>
              <a href="#">5</a>
              <ul>
                <li><a href="#">部&nbsp;B部门(2)</a></li>
                <li><a href="#">b1</a></li>
                <li><a href="#">b2</a></li>
              </ul>
            </li>
            <li>
              <a href="#">6</a>
              <ul>
                <li><a href="#">部&nbsp;c部门(2)</a></li>
                <li><a href="#">c1</a></li>
                <li><a href="#">c2</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <ul></ul>
      </ul>
    </nav>
  </div>
</template>

<script scoped>
export default {
  name: 'About',
  components: {
    // Ditu,
    // cctv
  },
  data() {
    return {
      dh: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    dhf() {
      this.dh = !this.dh
    },
    tiao(i) {
      this.$router.push({
        path: i
      })
    }
  }
}
</script>

<style scoped>
.about {
  width: 100vw;
  height: 100vh;
  background: #122f7e;
}
/* 地图 */

/* 监视 */

/* 头部标签 */
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  background-image: url("../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
}
.header_text {
  width: 30%;
  text-align: center;
  color: #fff;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 10px;
  float: left;
  position: absolute;
  left: 50%;
  top: 0%;
  margin-left: -15%;
}
/* 导航 */
.daohang {
  width: 80px;
  height: 40%;
  background: #fff;
  margin-top: 2px;
  border-radius: 8px;
  margin-left: 10px;
  opacity: 0.4;
  color: #27c4f8;
  font-weight: 800;
  letter-spacing: 5px;
  padding-left: 10px;
}
.sanjiao {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid #6edcf8;
  border-bottom: 10px solid transparent;
  float: right;
  margin-right: 15px;
  margin-top: 5px;
}
.dhdiv {
  width: 250px;
  background: #161e58;
  z-index: 999999;
  position: fixed;
  left: 1%;
  top: 8%;
  border-radius: 10px;
  border: 1px solid #6edcf8;
  display: none;
}
.dh1 {
  display: block;
}
.dh2 {
  display: none;
}
.dhdiv .lis {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 3px;
  font-size: 20px;
  color: #fff;
}
.sanjiao2 {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid #6edcf8;
  position: fixed;
  left: 2%;
  top: 5.3%;
}

button {
  border-radius: 10px;
  background: #1f3a89;
  width: 80px;
  height: 25px;
  outline: none;
  border: 1px solid #fff;
  margin: 5px;
  color: #6fdafc;
}
.backa {
  width: 1360px;
  height: 510px;
  border: 1px solid #0d6ca6;
  margin-left: 17px;
  margin-top: 10px;
}

button:hover {
  background: #fff;
  color: black;
}
.dak1 {
  width: 600px;
  height: 300px;
  background: #132672;
  margin: 0 auto;
  margin-top: 10px;
}
nav {
  margin-top: -270px;
  text-align: center;
  width: 400px;
  height: 10px;
}
nav ul ul {
  display: none; /*该元素不会显示*/
}
nav ul li:hover > ul {
  /* > 子菜单选择器 鼠标在li上的时候 改变子ul的display属性*/
  display: block;
}
nav ul {
  background: #fff;

  padding: 0 20px;
  /*圆角边框*/
  list-style: none; /*所有的列表属性*/
  position: relative; /*相对定位ul的位置*/
  display: inline-table; /*内敛表格*/
}
nav ul:after {
  /* css after选择器 */
  content: "";
  clear: both;
  display: block;
}
nav ul li {
  /*
transition 属性是一个简写属性，用于设置四个过渡属性：
transition-property
transition-duration
transition-timing-function
transition-delay
transition前面的参数是兼容浏览器用的
*/
  -webkit-transition: all 1s; /*Firefox4*/
  -moz-transition: all 1s; /*Safari and Chrome*/
  -o-transition: all 1s; /* Opera*/
  transition: all 1s;
  float: left; /*使竖向菜单变为横向菜单*/
}
nav ul li:hover {
  background: #fff;
  background: -webkit-linear-gradient(#fff 0%, #132571 40%);
  background: -o-linear-gradient(#132571 0%, #132571 40%);
  background: linear-gradient(#ffffff 0%, #132571 40%);
}
nav ul li:hover a {
  color: #fff;
}
nav ul li a {
  display: block; /*使a标签变成块状*/
  padding: 25px 40px; /*a标签左右的距离*/
  color: #132571;
  text-decoration: none; /*文本的属性*/
}
nav ul ul {
  background: #132571;
  border-radius: 0px;
  padding: 0;
  position: absolute; /*定义子ul的位置*/
  top: 100%;
}
nav ul ul li {
  float: none; /*清楚子ul里面li标签的浮动*/
  border-top: 1px solid #132571; /*下拉菜单中的分割线*/
  border-bottom: 1px solid #132571;
  position: relative;
}
nav ul ul li a {
  padding: 15px 40px;
  color: #132571;
}
nav ul ul li a:hover {
  background: #132571;
}
nav ul ul ul {
  position: absolute;
  left: 100%;
  top: 0;
}
</style>

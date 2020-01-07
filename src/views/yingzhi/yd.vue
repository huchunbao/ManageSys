
<template>
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">智能跑道管理</div>
      <!-- 导航栏 -->
    </div>
    <!-- 按钮 -->
    <div style="margin-top:10px;  margin-left:13px;">
      <router-link to="/zhuce">
        <button>注册人员信息</button>
      </router-link>
      <router-link to="/yd">
        <button style=" background:#141848; color:#6fdafc;">跑道运动信息</button>
      </router-link>
      <router-link to="/jilu">
        <button>跑道运动记录</button>
      </router-link>
    </div>
    <div class="backa">
      <div style="display:flex">
        <div style="margin-top:16px; margin-left:6px;">
          <el-select v-model="value4" clearable placeholder="本周运动次数">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div style="display:flex;  margin-top:10px; margin-left:10px;">
          <p style="color:white;  font-size:16px; margin-top:5px;">大于:</p>
          <input
            v-model="biajiao"
            type="text"
            style="height:28px; width:150px; border-radius:4px; outline:none;border:1px solid #c8cccf; margin-top:5px;"
            @input="sousuo()"
          >
        </div>
      </div>
      <table class="tab" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>序号</th>
          <th>编号</th>
          <th>今日总里程</th>
          <th>今日总时长</th>
          <th>本周总里程</th>
          <th>本周总时长</th>
          <th>本周运动次数</th>
          <th>本月总里程</th>
          <th>本月总时长</th>
          <th>本月运动次数</th>
        </tr>
        <tr></tr>
        <tr v-if="xian">
          <td>1</td>
          <td>PD00000001</td>
          <td>12km</td>
          <td>1小时</td>
          <td>12km</td>
          <td>10小时40分28秒</td>
          <td>15次</td>
          <td>5690km</td>
          <td>30小时12分</td>
          <td>24次</td>
        </tr>
      </table>
      <div class="page-bar">
        <ul>
          <li class="shuang">
            <a style="width:3.1vw;border-radius:25px;" @click="cur=1">首页</a>
          </li>
          <li v-if="cur>1" class="shuang">
            <a @click="cur--">上</a>
          </li>
          <li v-if="cur==1" class="shuang">
            <a class="banclick">上</a>
          </li>
          <li v-for="(index,i) in indexs" :key="i" :class="{ 'active': cur == index}">
            <a @click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="cur<all" class="shuang">
            <a @click="cur++">下</a>
          </li>
          <li v-if="cur == all" class="shuang">
            <a class="banclick">下</a>
          </li>
          <li class="shuang">
            <a style="width:3.1vw;border-radius:25px;" @click="cur=all">尾页</a>
          </li>
          <li class="shuang">
            <a style="width:5vw;border-radius:25px;">
              共
              <i>{{ all }}</i>页
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import daoy from './daoyou.vue'
export default {
  name: 'About',
  components: {
    // Ditu,
    daoy
  },
  data() {
    return {
      biajiao: '',
      xian: false,
      dh: false,
      all: 1, // 总页数
      cur: 1,
      options: [
        {
          value: '1',
          label: '本周总运动次数'
        },
        {
          value: '2',
          label: '本月总运动次数'
        }
      ],
      value4: '1'
    }
  },
  computed: {
    indexs() {
      var left = 1
      var right = this.all
      var ar = []
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2
          right = this.cur + 2
        } else {
          if (this.cur <= 3) {
            left = 1
            right = 5
          } else {
            right = this.all
            left = this.all - 4
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
      } else {
        left = 1
        right = this.all
        while (left <= right) {
          ar.push(left)
          left++
        }
      }
      return ar
    }
  },
  watch: {},
  mounted() {
    //  this.turnover();
    //  var qs = require('querystring')
    // 		let data={username:'admin',password:'111111'}
    // 		this.$axios({
    // 				url: "http://192.168.1.18:8081/user/login",
    // 				method: "post",
    // 				data:qs.stringify(data),
    // 				headers:{
    // 				'Content-Type':'application/x-www-form-urlencoded'
    // 				},
    // 		}).then(response => {
    //     })
    // http://localhost:8081/Body/getIngredienById
    // this.$axios({
    // 			url: "http://192.168.1.18:8081/Body/getIngredienById?id=1",
    // 			method: "get",
    // 			headers:{
    // 			'Content-Type':'application/x-www-form-urlencoded'
    // 			},
    // 	}).then(response => {
    //     console.log(response)
    //   })
    // this.$axios({
    //   url: 'http://192.168.1.18:8081/BodyTest/getBodyTestById?id=1',
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).then(response => {
    //   console.log(response)
    // })
  },
  methods: {
    sousuo() {
      var that = this
      console.log(that.value4, that.value4 === '1', that.biajiao < 15)
      if (that.value4 === '1' && that.biajiao < 15) {
        that.xian = true
      } else if (that.value4 === '2' && that.biajiao < 24) {
        that.xian = true
      } else {
        that.xian = false
      }
    },
    dhf() {
      this.dh = !this.dh
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
.block .el-date-editor .el-range-separator {
  line-height: 23px;
}
.block .el-date-editor .el-input__icon {
  line-height: 23px;
}

.el-select .el-input .el-select__caret {
  margin-top: -17px;
}
</style>

<style scoped>
.about {
  width: 100vw;
  height: 100vh;
  background: #122f7e;
}
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  background-image: url("../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
}
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
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
button {
  border-radius: 10px;
  background: #1f3a89;
  width: 100px;
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
.xian {
  width: 1px;
  background-color: #0d6ca6;
  height: 510px;
  position: absolute;
  left: 900px;
}
.da1 {
  margin-top: 25px;
  margin-left: -235px;
  color: #fff;
}
.yuan {
  border-radius: 60%;
  width: 40px;
  height: 40px;
  background: #6874ae;
  margin-top: -5px;
  margin-left: 5px;
}
.tab {
  width: 99%;
  margin-left: 0.4%;
  text-align: center;
  border: 1px solid #15c8fb;
  margin-top: 15px;
}
.tab td {
  border: 1px solid #15c8fb;
  color: #fff;
  font-size: 15px;
  height: 35px;
}
.tab th {
  border: 1px solid #15c8fb;
  color: #6ed9fb;
  font-size: 18px;
  height: 50px;
}
/* 分页开始 */
.page-bar {
  position: absolute;
  bottom: 17px;
  left: 35%;
  user-select: none;
}
.page-bar li {
  float: left;
  list-style: none;
}
.page-bar li:first-child > a {
  margin-left: 0px;
}
.page-bar a {
  border: 0;
  text-decoration: none;
  position: relative;
  text-align: center;
  margin-left: -1px;
  cursor: pointer;
  display: inline-block;
  width: 1.6vw;
  height: 1.6vw;
  line-height: 1.6vw;
  border-radius: 100%;
  background: #2373a1;
  margin: 0.5vw;
  color: #ffffff;
  font-size: 0.7vw;
}
.page-bar a .banclick {
  cursor: not-allowed;
}
.page-bar a i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 0.7vw;
}
.active a {
  cursor: default;
  background: #70dcfb;
}
.page-bar .shuang a {
  color: #fff;
}
.blocka {
  position: absolute;
  top: 630px;
  left: 440px;
  color: white;
}
</style>

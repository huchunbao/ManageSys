<template>
  <div class="xinxi">
    <div class="header">
      <daoy class="daoy"></daoy>
      <div class="header_text">信息发布</div>
    </div>
    <div class="body">
      <div class="body_herder">
        <div style="border-right:1px solid #fff;" @click="tiao('fabu')">
          增加播放节目
        </div>
        <div @click="tiao('chabo')">查看插播节目</div>
      </div>
      <table class="tab" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>序号</th>
          <th>编号</th>
          <th>节目名称</th>
          <th>显示屏名称</th>
          <th>显示屏ID</th>
          <th>IP地址</th>
          <th>播放时间</th>
          <th>创建时间</th>
          <th>创建人员</th>
          <th>备注</th>
        </tr>
        <tr v-for="(item, i) in data" :key="i">
          <td>{{ item.id }}</td>
          <td>{{ item.equipment }}</td>
          <td>{{ item.programmename }}</td>
          <td>{{ item.equipment==1?'景区入口LED屏':item.equipment==2?'景区广场LED屏':item.equipment==3?'景区出口LED屏':'' }}</td>
          <td>{{ item.equipment }}</td>
          <td>{{ item.ipaddress }}</td>
          <td>{{ item.showstarttime }}</td>
          <td>{{ item.showendtime }}</td>
          <td>{{ item.createby }}</td>
          <td>{{ item.remark }}</td>
        </tr>
      </table>

      <div v-if="data" class="page-bar">
        <ul>
          <li class="shuang">
            <a style="width:3.1vw;border-radius:25px;" @click="cur = 1">首页</a>
          </li>
          <li v-if="cur" class="shuang"> 1"><a @click="cur--">上</a></li>
          <li v-if="cur == 1" class="shuang"><a class="banclick">上</a></li>
          <li
            v-for="(index, i) in indexs"
            :key="i"
            :class="{ active: cur == index }"
          >
            <a @click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="cur < all" class="shuang"><a @click="cur++">下</a></li>
          <li v-if="cur == all" class="shuang"><a class="banclick">下</a></li>
          <li class="shuang">
            <a style="width:3.1vw;border-radius:25px;" @click="cur = all">尾页</a>
          </li>
          <li class="shuang">
            <a style="width:5vw;border-radius:25px;">共<i>{{ all }}</i>页</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script scoped>
import daoy from './daoyou.vue'
export default {
  name: 'Xinxi',
  components: {
    daoy
  },
  data() {
    return {
      data: true,
      datack: [],
      quanck: false,
      all: 100 / 10, // 总页数
      cur: 1 // 当前页码
    }
  },
  computed: {
    // 实时更新展示的页码
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
  watch: {
    // 页码发生改变时触发
    cur: function(oldValue, newValue) {
      console.log(oldValue, newValue)
      this.qing()
    }
  },
  mounted() {
    this.qing()
    // var qs = require('querystring')
  },
  methods: {
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    // 多选判断
    duo() {
      this.quanck = true
      for (var i = 0; i < this.datack.length; i++) {
        if (this.datack[i]) {
          this.quanck = false
        }
      }
    },
    // 点击多选
    quanckx() {
      for (var i = 0; i < this.datack.length; i++) {
        console.log(this.quanck)
        this.datack[i] = !this.quanck
      }
    },
    btnClick(data) {
      // 页码点击事件
      if (data !== this.cur) {
        this.cur = data
      }
    },
    // 请求数据
    qing() {
      // const pageNumber = this.cur - 1
      // this.$axios({
      //   url:
      //     'http://192.168.1.121:8081/RadioProgramme/getLedSceenList?pageNumber=' +
      //     pageNumber +
      //     '&pageSize=10',
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(response => {
      //   console.log(response.data.data.content, 13212)
      //   this.data = response.data.data.content
      //   this.all = Math.ceil(response.data.data.numberOfElements / 10)
      //   for (let i = 0; i < this.data.length; i++) {
      //     this.datack.push(false)
      //   }
      // })
    },
    tiao(data) {
      this.$router.push({ path: '/' + data })
    }
  }
}
</script>

<style scoped>
.xinxi {
  width: 100vw;
  height: 100vh;
  background: #122f7e;
}
/* 头部标签 */
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  /* overflow: hidden; */
  background-image: url("../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
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
.body {
  width: 95vw;
  height: 85vh;
  background: rgba(240, 240, 240, 0.15);
  margin-left: 2.5vw;
  padding-top: 20px;
}
.body_herder {
  border-radius: 50px;
  height: 30px;
  width: 250px;
  border: 1px solid #ffffff;
  line-height: 30px;
  color: #fff;
  background: #1e3b88;
  margin-left: 30px;
  margin-bottom: 20px;
  overflow: hidden;
}
.body_herder div {
  display: inline-block;
  width: 49%;
  text-align: center;
  cursor: pointer;
}
.tab {
  width: 95%;
  margin-left: 2.5%;
  text-align: center;
  border: 1px solid #15c8fb;
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
  bottom: 30px;
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
/* 分页结束 */
</style>

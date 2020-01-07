<template>
  <div class="chabo">
    <div class="header">
      <daoy class="daoy"></daoy>
      <div class="header_text">查看插播节目</div>
    </div>
    <div class="body">
      <div class="body_herder">
        <div style="border-right:1px solid #fff;" @click="tiao('fabu')">增加插播节目</div>
        <div @click="tiao('chabo')">查看插播节目</div>
      </div>
      <div style="float:right;" class="fan" @click="tiao('xinxi')">返回</div>
      <div class="body_body">
        <div class="tuc2_left">
          <div class="left_header">银科环企</div>
          <div v-for="(item,i) in pdata" :key="i" class="left_body" @click="ptab=item.id">
            {{ item.screenname }}({{ item.screenno }})
            <div v-if="ptab==item.id" class="biao"></div>
          </div>
        </div>
        <div class="tuc2_right">
          <div class="an">停止播放</div>
          <div class="an" @click="sel">取消播放</div>
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>编号</td>
              <td>节目名称</td>
              <td>分辨率</td>
              <td>开始时间</td>
              <td>结束时间</td>
              <td>备注</td>
            </tr>
            <tr v-for="(item,i) in data" :key="i" :class="jtab==item.id?'trtab':''" @click="jtab=item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.programmename }}</td>
              <td>{{ item.resolutionratio }}</td>
              <td>{{ item.showstarttime }}</td>
              <td>{{ item.showendtime }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </table>
          <div v-if="data" class="page-bar">
            <ul>
              <li class="shuang"><a style="width:3.1vw;border-radius:25px;" @click="cur=1">首页</a></li>
              <li v-if="cur>1" class="shuang"><a @click="cur--">上</a></li>
              <li v-if="cur==1" class="shuang"><a class="banclick">上</a></li>
              <li v-for="(index,i) in indexs" :key="i" :class="{ 'active': cur == index}">
                <a @click="btnClick(index)">{{ index }}</a>
              </li>
              <li v-if="cur<all" class="shuang"><a @click="cur++">下</a></li>
              <li v-if="cur == all" class="shuang"><a class="banclick">下</a></li>
              <li class="shuang"><a style="width:3.1vw;border-radius:25px;" @click="cur=all">尾页</a></li>
              <li class="shuang"><a style="width:5vw;border-radius:25px;">共<i>{{ all }}</i>页</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import daoy from '../daoyou.vue'
export default {
  name: 'Chabo',
  components: {
    daoy
  },
  data() {
    return {
      pdata: [],
      ptab: 0,
      data: [],
      // 选中节目
      jtab: false,
      all: 0, // 总页数
      cur: 1// 当前页码
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
    // 当选择屏幕发生改变时触发
    ptab() {
      this.huoj()
    },
    // 页码发生改变时触发
    cur(oldValue, newValue) {
      this.huoj()
    }
  },
  mounted() {
    this.huop()
  },
  methods: {
    // 获取屏幕
    huop() {
      this.$axios({
        url: 'http://192.168.1.121:8081/LedScreen/getEquipmentList',
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        console.log(response, 13212)
        this.pdata = response.data.data
      })
    },
    huoj() { // 请求节目
      var cur = this.cur - 1
      console.log(12321312)
      this.$axios({
        url: 'http://192.168.1.121:8081/RadioProgramme/getRadioProgrammeByScreenId?id=' + this.ptab + '&pageNumber=' + cur + '&pageSize=10',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        // console.log(response,this.resolvingDate('2019-07-17T08:21:00.000+0000'))
        this.data = response.data.data.content
        this.all = Math.ceil(response.data.data.totalElements / 10)
      })
    },
    btnClick(data) { // 页码点击事件
      if (data !== this.cur) {
        this.cur = data
      }
    },
    // 删除
    sel() {
      // /RadioProgramme/delRadioProgrammeByScreenId
      this.$axios({
        url: 'http://192.168.1.121:8081/RadioProgramme/delRadioProgrammeByScreenId?id=' + this.jtab,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        this.huoj()
      })
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
  .chabo{
    width: 100vw;
    height: 100vh;
    background: #122f7e;
  }
  /* 头部标签 */
  .header{
    height: 8%;
    width: 100%;
    margin-bottom: 10px;
    background-image: url('../../../assets/yingzhi/topback.png') ;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .daoy{
    position: relative;
    left: 20px;
    top: 5px;
  }
  .header_text{
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
  .body{
    width: 95vw;
    height:85vh;
    background: rgba(240,240,240, 0.15);
    margin-left: 2.5vw;
    padding-top: 20px;
  }
  .body_herder{
    border-radius: 50px;
    height: 30px;
    float: left;
    overflow: hidden;
    width: 250px;
    border: 1px solid #ffffff;
    line-height: 30px;
    color: #fff;
    background: #1e3b88;
    margin-left: 30px;
    margin-bottom: 20px;
  }
  .body_herder div{
    display: inline-block;
    width: 49.5%;
    text-align: center;
    cursor: pointer;
  }
  .body_body{
    width: 95%;
    margin-left: 2.5%;
    background: #fff;
    height: 85%;
    overflow: hidden;
  }
  /* 屏幕 */
  .tuc2_left{
    float: left;
    width: 20%;
    border-right: 1px solid #000;
    height: 100%;
  }
  .left_header{
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .left_body{
    margin-left: 30px;
    font-size: 13px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
  }
  .biao{
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 100%;
    float: right;
    position: relative;
    top: 50%;
    right: 12px;
    margin-top: -5px;
  }
  /* 左边 */
  .tuc2_right{
    float: right;
    width: 79%;
    height: 100%;
    overflow: hidden;
  }
  .tuc2_right table{
    width: 98%;
    border: 1px solid #000;
    margin-top:10px;
  }
  .tuc2_right table td{
    width: 16%;
    border: 1px solid #000;
    text-align: center;
    height: 30px;
    font-size: 13px;
    cursor: pointer;
  }
  .trtab{
    background: #17aee2;
  }
  /* 左边按钮 */
  .an{
    width: 100px;
    height: 25px;
    background: #1e3b88;
    margin-right: 20px;
    text-align: center;
    color: #17aee2;
    border-radius: 5px;
    font-size: 12px;
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 25px;
    cursor: pointer;
  }
  /* 分页开始 */
  .page-bar{
    user-select:none;
    position: absolute;
    bottom: 10%;
    left: 40%;
  }
  .page-bar li{
    float: left;
    list-style: none
  }
  .page-bar li:first-child>a {
    margin-left: 0px
  }
  .page-bar a{
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
  .page-bar a .banclick{
    cursor:not-allowed;
  }
  .page-bar a i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 0.7vw;
  }
  .active a{
    cursor: default;
    background: #70dcfb;
  }
  .page-bar .shuang a{
    color: #fff;
  }
  .fan{
    float: right;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 15px;
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: #1e3b88;
    margin-right:30px;
    cursor: pointer;
  }
  /* 分页结束 */
</style>


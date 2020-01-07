<template>
  <div class="fabu">
    <div class="header">
      <daoy class="daoy"></daoy>
      <div class="header_text">信息发布</div>
    </div>
    <div v-if="tab2 == 0" class="body">
      <!-- 名称等部分 -->
      <div class="bodyheder">
        <div>节目名称: <input v-model="dataname" type="text"></div>
        <div>
          分辨率:
          <select id="" v-model="fenb" name="">
            <option value="1920*1080">1920*1080</option>
            <option value="960*540">960*540</option>
          </select>
        </div>
        <div>
          备注: <input v-model="bei" type="text" placeholder="可填项">
        </div>
      </div>
      <!-- 4个类型切换 -->
      <div class="qie">
        <div :style="tab == 1 ? 'color:#fff' : ''" @click="tab = 1">文档</div>
        <div :style="tab == 2 ? 'color:#fff' : ''" @click="tab = 2">图片</div>
        <div :style="tab == 3 ? 'color:#fff' : ''" @click="tab = 3">视频</div>
        <div :style="tab == 4 ? 'color:#fff' : ''" @click="tab = 4">音频</div>
      </div>
      <!-- 主体 -->
      <div class="tuc">
        <fabuw v-if="tab == 1" @fabufa="jief"></fabuw>
        <fabut v-if="tab == 2" @fabufa="jief"></fabut>
        <fabus v-if="tab == 3" @fabufa="jief"></fabus>
        <fabuy v-if="tab == 4" @fabufa="jief"></fabuy>
      </div>
    </div>
    <!-- 屏幕保存 -->
    <div v-if="tab2 == 1" class="body">
      <div class="bodyheder">
        <div>发布时间</div>
        <div>
          开始时间:
          <select
            id=""
            v-model="kai.nian"
            name=""
            class="shiinp"
            style="width:68px;"
          >
            <option v-for="(item, i) in 9" :key="i" :value="kai.dqnian + i">{{
              kai.dqnian + i
            }}</option> </select>年
          <select
            id=""
            v-model="kai.yue"
            name=""
            class="shiinp"
            style="width:55px;"
          >
            <option v-for="(item, i) in 12" :key="i" :value="i + 1">{{
              i + 1
            }}</option> </select>月
          <select
            id=""
            v-model="kai.ri"
            name=""
            class="shiinp"
            style="width:55px;"
          >
            <option v-for="(item, i) in 30" :key="i" :value="i + 1">{{
              i + 1
            }}</option> </select>日
          <select
            id=""
            v-model="kai.shi"
            name=""
            class="shiinp"
            style="width:59px;"
          >
            <option
              v-for="(item, i) in 24"
              :key="i"
              :value="i < 10 ? '0' + i : i"
            >{{ 10 > i ? "0" + i : i }}</option> </select>时
          <select
            id=""
            v-model="kai.fen"
            name=""
            class="shiinp"
            style="width:60px;"
          >
            <option
              v-for="(item, i) in 60"
              :key="i"
              :value="i < 10 ? '0' + i : i"
            >{{ 10 > i ? "0" + i : i }}</option> </select>分
        </div>
        <div>
          结束时间:
          <select
            id=""
            v-model="jie.nian"
            name=""
            class="shiinp"
            style="width:68px;"
          >
            <option v-for="(item, i) in 9" :key="i" :value="jie.dqnian + i">{{
              jie.dqnian + i
            }}</option> </select>年
          <select
            id=""
            v-model="jie.yue"
            name=""
            class="shiinp"
            style="width:55px;"
          >
            <option v-for="(item, i) in 12" :key="i" :value="i + 1">{{
              i + 1
            }}</option> </select>月
          <select
            id=""
            v-model="jie.ri"
            name=""
            class="shiinp"
            style="width:55px;"
          >
            <option v-for="(item, i) in 30" :key="i" :value="i + 1">{{
              i + 1
            }}</option> </select>日
          <select
            id=""
            v-model="jie.shi"
            name=""
            class="shiinp"
            style="width:55px;"
          >
            <option
              v-for="(item, i) in 24"
              :key="i"
              :value="i < 10 ? '0' + i : i"
            >{{ 10 > i ? "0" + i : i }}</option> </select>时
          <select
            id=""
            v-model="jie.fen"
            name=""
            class="shiinp"
            style="width:55px;"
          >
            <option
              v-for="(item, i) in 60"
              :key="i"
              :value="i < 10 ? '0' + i : i"
            >{{ 10 > i ? "0" + i : i }}</option></select>分
        </div>
        <div class="rightan" @click="shangc">保存</div>
        <div class="rightan" @click="tiao('xinxi')">取消</div>
      </div>
      <div class="tuc">
        <div class="tuc2_left">
          <div class="left_header">银科环企</div>
          <div
            v-for="(item, i) in pdata"
            :key="i"
            class="left_body"
            @click="pid = item"
          >
            {{ item.screenname }}({{ item.screenno }})
          </div>
        </div>
        <div class="tuc2_right">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <th>节目名称</th>
              <th>分辨率</th>
              <th>设备</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>备注</th>
            </tr>
            <tr>
              <td>{{ dataname }}</td>
              <td>{{ fenb }}</td>
              <td>{{ pid.screenname }}</td>
              <td>
                {{ kai.nian + "-" + kai.yue + "-" + kai.ri }}/{{
                  kai.shi + ":" + kai.fen
                }}
              </td>
              <td>
                {{ jie.nian + "-" + jie.yue + "-" + jie.ri }}/{{
                  jie.shi + ":" + jie.fen
                }}
              </td>
              <td>{{ bei }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fabuw from './fabuw'
import fabut from './fabut'
import fabus from './fabus'
import fabuy from './fabuy'
import daoy from '../daoyou.vue'
export default {
  name: 'Fabu',
  components: {
    fabuw,
    fabut,
    fabus,
    fabuy,
    daoy
  },
  data() {
    return {
      dataname: '',
      fenb: '',
      bei: '',
      pid: [],
      // 开始时间
      kai: {
        nian: '',
        yue: '',
        ri: '',
        shi: '',
        fen: '',
        miao: ''
      },
      // 结束时间
      jie: {
        nian: '',
        yue: '',
        ri: '',
        shi: '',
        fen: '',
        miao: ''
      },
      // 类型切换
      tab: 1,
      // 传过来的素材
      data: null,
      pdata: [],
      // 打开显示屏选择
      tab2: 0
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.shijian()
    // 获取屏幕
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
  methods: {
    jief(data) {
      console.log(data, 123)
      if (this.dataname !== '' && this.fenb !== '') {
        this.data = data
        this.tab2 = 1
      } else {
        alert('请将资料填写完整')
      }
    },
    shangc() {
      let date1 =
        this.kai.nian +
        '-' +
        this.kai.yue +
        '-' +
        this.kai.ri +
        ' ' +
        this.kai.shi +
        ':' +
        this.kai.fen
      let date2 =
        this.jie.nian +
        '-' +
        this.jie.yue +
        '-' +
        this.jie.ri +
        ' ' +
        this.jie.shi +
        ':' +
        this.jie.fen
      date1 = date1.replace(/-/g, '/')
      date2 = date2.replace(/-/g, '/')
      date1 = Date.parse(date1)
      date2 = Date.parse(date2)
      var qs = require('qs')
      var data = JSON.stringify({
        programmename: this.dataname,
        resolutionratio: this.fenb,
        equipment: this.pid.id,
        showstarttime: date1,
        showendtime: date2,
        remark: this.bei,
        showmaterial: this.data
      })
      console.log(data, JSON.parse(data))
      this.$axios({
        url: 'http://192.168.1.121:8081/RadioProgramme/saveLedSceenList',
        method: 'post',
        data: qs.stringify({
          jsondata: data
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        console.log(response)
        this.tiao('xinxi')
      })
    },
    tiao(data) {
      this.$router.push({ path: '/' + data })
    },
    // 获取当前时间
    shijian() {
      var date = new Date()
      console.log(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
      this.kai = {
        dqnian: date.getFullYear(),
        nian: date.getFullYear(),
        yue: date.getMonth() + 1,
        ri: date.getDate(),
        shi: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        fen:
          date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      }
      this.jie = {
        dqnian: date.getFullYear(),
        nian: date.getFullYear(),
        yue: date.getMonth() + 1,
        ri: date.getDate(),
        shi: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        fen:
          date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      }
    }
  }
}
</script>

<style scoped>
.fabu {
  width: 100vw;
  height: 100vh;
  background: #122f7e;
}
/* 头部标签 */
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  background-image: url("../../../assets/yingzhi/topback.png");
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
/* 名称等部分 */
.bodyheder {
  margin-left: 20px;
}
.bodyheder div {
  color: #fff;
  display: inline-block;
  margin-left: 10px;
  font-size: 13px;
}
.bodyheder div input,
select {
  border-radius: 5px;
  outline-style: none;
  width: 150px;
  height: 30px;
  text-align: center;
  margin-right: 10px;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
}
/* 文件类型切换 */
.qie {
  margin-left: 20px;
}
.qie div {
  display: inline-block;
  width: 50px;
  text-align: center;
  height: 60px;
  margin-left: 10px;
  line-height: 60px;
  cursor: pointer;
}
/* 图层 */
.tuc {
  width: 95%;
  height: 80%;
  /* position: absolute; */
  margin-left: 2.5%;
  background: #fff;
  margin-top: 20px;
}
/* 屏幕选择 */
.bodyheder .rightan {
  float: right;
  width: 50px;
  margin-right: 20px;
  text-align: center;
  background: #fff;
  color: #000;
  border-radius: 5px;
}
.tuc2_left {
  float: left;
  width: 20%;
  border-right: 1px solid #000;
  height: 100%;
}
.left_header {
  padding-left: 10px;
}
.left_body {
  margin-left: 30px;
  font-size: 13px;
  margin-top: 10px;
  cursor: pointer;
}
.tuc2_right {
  float: right;
  width: 79%;
  height: 100%;
}
.tuc2_right table {
  width: 98%;
  border: 1px solid #000;
  margin-top: 10px;
}
.tuc2_right table td,
th {
  width: 16%;
  border: 1px solid #000;
  text-align: center;
  height: 30px;
}
.tuc2_right table td {
  font-size: 15px;
}
.bodyheder .shiinp {
  height: 25px;
  appearance: none;
}
select::-ms-expand {
  display: none;
}
</style>

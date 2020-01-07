<template>
  <div class="fabus">
    <div class="left" @mousemove="move">
      <!-- 鼠标按下事件  鼠标移动事件  鼠标松开事件 -->
      <div ref="zhu" class="zhu" @mousedown="down" @mouseup="up">
        <div
          class="right_bottom"
          @mousedown="down2"
          @mouseup="up"
          @mousemove="move2"
          @mouseout="up"
        ></div>
      </div>
    </div>
    <div class="right">
      <div class="right_header">页面管理</div>
      <div class="right_body">
        <div class="chuang">
          当前窗口: <input v-model="dataname" type="text">
        </div>
        <div>
          <div class="wdata">窗口位置:</div>
          <div class="wdatali">Y <input v-model="left" type="text"></div>
          <div class="wdatali">X <input v-model="top" type="text"></div>
          <div class="wdatali">H <input v-model="height" type="text"></div>
          <div class="wdatali">W <input v-model="width" type="text"></div>
        </div>
        <div class="kongzhi">
          <div class="kongzhi_jia">
            <input type="file" accept="audio/mp4,video/mp4" @change="add">
          </div>
          <div class="kongzhi_jian" @click="shan()"></div>
          <div class="kongzhi_shang" @click="up()"></div>
          <div class="kongzhi_xia" @click="datadown()"></div>
        </div>
        <div>
          <table class="tab" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>描述</th>
            </tr>
            <tr
              v-for="(item, i) in data"
              :key="i"
              @click="
                whxy(
                  item.pointw,
                  item.pointh,
                  item.pointx,
                  item.pointy,
                  item.name,
                  i
                )
              "
            >
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td></td>
            </tr>
          </table>
        </div>
        <div class="an">
          <div @click="tiao('xinxi')">取消</div>
          <div @click="chuan">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fabus',
  components: {},
  data() {
    return {
      // div的大小位置
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      dataname: '',
      taid: '',
      // 判断有没有点击
      whtf: false,
      lttf: false,
      // 记录鼠标位置
      shux: false,
      shuy: false,
      shux2: false,
      shuy2: false,
      data: [],
      ddata: null
    }
  },
  computed: {},
  watch: {
    left() {
      this.divup()
    },
    top() {
      this.divup()
    },
    width() {
      this.divup()
    },
    height() {
      this.divup()
    }
  },
  mounted() {
    this.divup()
  },
  methods: {
    // 鼠标点下去记录鼠标当前位置
    down(data) {
      this.whtf = true
      this.shux = data.clientX - this.left
      this.shuy = data.clientY - this.top
    },
    down2(data) {
      this.lttf = true
      this.shux2 = data.clientX - this.width
      this.shuy2 = data.clientY - this.height
    },
    // 鼠标松开清空位置信息
    up() {
      this.whtf = false
      this.shux = false
      this.shuy = false
      this.lttf = false
      this.shux2 = false
      this.shuy2 = false
      this.data[this.ddata].pointw = this.width
      this.data[this.ddata].pointh = this.height
      this.data[this.ddata].pointx = this.left
      this.data[this.ddata].pointy = this.top
    },
    // 移动鼠标改变位置
    move(data) {
      if (this.whtf && !this.lttf) {
        this.left = data.clientX - this.shux
        this.top = data.clientY - this.shuy
      }
    },
    move2(data) {
      if (this.lttf) {
        this.width = data.clientX - this.shux2
        this.height = data.clientY - this.shuy2
      }
    },
    // 刷新宽高和位置
    divup() {
      this.$refs.zhu.style.height = this.height + 'px'
      this.$refs.zhu.style.width = this.width + 'px'
      this.$refs.zhu.style.marginTop = this.top + 'px'
      this.$refs.zhu.style.marginLeft = this.left + 'px'
    },
    // 添加文件
    add(data) {
      var dta = data.target.files[0]
      dta.pointw = 100
      dta.pointy = 0
      dta.pointx = 0
      dta.pointh = 100
      this.data.push(dta)
      console.log(this.data)
      this.whxy(
        dta.pointw,
        dta.pointh,
        dta.pointx,
        dta.pointy,
        dta.name,
        this.data.length - 1
      )
    },
    shan() {
      this.data.splice(this.ddata, 1)
      this.width = ''
      this.height = ''
      this.left = ''
      this.top = ''
      this.dataname = ''
      this.ddata = ''
    },
    dataup() {
      if (this.ddata > 0) {
        this.data.splice(this.ddata - 1, 0, this.data[this.ddata])
        this.data.splice(this.ddata + 1, 1)
        this.ddata = this.ddata - 1
      } else {
        alert(this.ddata)
      }
    },
    datadown() {
      if (this.ddata < this.data.length) {
        this.data.splice(this.ddata + 2, 0, this.data[this.ddata])
        this.data.splice(this.ddata, 1)
        this.ddata = this.ddata + 1
      } else {
        alert(this.ddata)
      }
    },
    getdata(i) {},
    // 改变div
    whxy(w, h, x, y, n, d) {
      this.width = w
      this.height = h
      this.left = x
      this.top = y
      this.dataname = n
      this.ddata = d
    },
    // 传数据
    chuan() {
      console.log(this.data)
      if (this.data.length !== 0) {
        this.$emit('fabufa', this.data)
      } else {
        alert('请添加素材')
      }
    },
    tiao(data) {
      this.$router.push({ path: '/' + data })
    }
  }
}
</script>
<style scoped>
.fabus {
  width: 100%;
  height: 100%;
  background: #fff;
}
.left {
  width: 70%;
  height: 100%;
  float: left;
  overflow: hidden;
}

.zhu {
  border: 1px solid #000;
  cursor: move;
}
.zhu .right_bottom {
  width: 40px;
  height: 40px;
  position: relative;
  left: 100%;
  top: 100%;
  margin-left: -20px;
  margin-top: -20px;
  cursor: se-resize;
}
/* 左边窗口信息 */
.right {
  width: 29.8%;
  height: 100%;
  float: right;
  border-left: 1px solid #132987;
}
.right_header {
  /* 左边头部样式 */
  width: 100%;
  height: 30px;
  background: #e5e5e5;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
}
.right_body {
  /* 左边主体样式 */
  width: 90%;
  padding-left: 5%;
}
.right_body > div {
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
}
.chuang input {
  /* 名称样式 */
  float: right;
  width: 240px;
}
.wdata {
  /* 窗口信息样式 */
  float: left;
}
.wdatali {
  float: right;
  width: 120px;
  font-size: 15px;
  padding-left: 5px;
  margin-bottom: 10px;
}
.wdatali input {
  width: 100px;
  float: right;
}
/* 表格 */
.tab {
  width: 100%;
  border: 1px solid #000;
}
.tab th,
td {
  border: 1px solid #000;
  height: 20px;
  font-size: 15px;
}
.kongzhi > div {
  float: left;
  width: 25%;
  text-align: center;
  margin-left: 13%;
}
.kongzhi .kongzhi_jia {
  width: 30px;
  height: 30px;
  background: url("../../../assets/yingzhi/jia.png") no-repeat;
  overflow: hidden;
}
.kongzhi .kongzhi_jian {
  width: 30px;
  height: 30px;
  background: url("../../../assets/yingzhi/jian.png") no-repeat;
  overflow: hidden;
}
.kongzhi .kongzhi_shang {
  width: 30px;
  height: 30px;
  background: url("../../../assets/yingzhi/shang.png") no-repeat;
  overflow: hidden;
}
.kongzhi .kongzhi_xia {
  width: 30px;
  height: 30px;
  background: url("../../../assets/yingzhi/xia.png") no-repeat;
  overflow: hidden;
}
.kongzhi > div > input {
  opacity: 0;
  filter: alpha(Opacity=100);
}
.an div {
  float: left;
  margin-left: 20%;
  width: 20%;
  text-align: center;
  border-bottom: 1px solid #000;
  background: #132987;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
</style>

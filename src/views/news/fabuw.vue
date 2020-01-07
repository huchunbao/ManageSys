<template>
  <div class="fabuw">
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
      <div class="right_header">添加文档</div>
      <div class="right_body">
        <div class="chuang">
          当前窗口: <div style="width:60%;display: inline-block;"><el-input v-model="dataname" placeholder="请输入内容"></el-input></div>
          <!-- <input v-model="dataname" type="text" disabled> -->
        </div>
        <div>
          <div class="wdata">窗口位置:</div>
          <div class="wdatali">
            Y <div class="input"><el-input v-model="left" placeholder="请输入内容"></el-input></div>
            <!-- <input v-model="left" type="text" disabled> -->
          </div>
          <div class="wdatali">
            X <div class="input"><el-input v-model="top" placeholder="请输入内容"></el-input></div>
            <!-- <input v-model="top" type="text" disabled> -->
          </div>
          <div class="wdatali">
            H <div class="input"><el-input v-model="height" placeholder="请输入内容"></el-input></div>
            <!-- <input v-model="height" type="text" disabled> -->
          </div>
          <div class="wdatali">
            W <div class="input"><el-input v-model="width" placeholder="请输入内容"></el-input></div>
            <!-- <input v-model="width" type="text" disabled> -->
          </div>
        </div>
        <div class="kongzhi">
          <div class="kongzhi_jia">
            <input type="file" accept="text/plain" @change="add">
          </div>
          <div class="kongzhi_jian" @click="shan()"></div>
          <div class="kongzhi_shang" @click="dataup()"></div>
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
              <td>{{ item.mname }}</td>
              <td>{{ item.mtype }}</td>
              <td></td>
            </tr>
          </table>
        </div>
        <!-- <div class="an">
          <div @click="tiao('xinxi')">取消</div>
          <div @click="chuan">保存</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fabuw',
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
  // components: {},
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
    },
    data() {
      this.chuan()
    },
    dataname() {
      this.data[this.ddata].mname = this.dataname
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
      if (this.data.length >= 5) {
        alert('超出最大数量')
      } else {
        var dta = data.target.files[0]
        dta.pointw = 100
        dta.pointy = 0
        dta.pointx = 0
        dta.pointh = 100
        dta.mname = dta.name
        dta.mtype = 1
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
      }
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
        console.log(123)
      }
    },
    datadown() {
      if (this.ddata < this.data.length) {
        this.data.splice(this.ddata + 2, 0, this.data[this.ddata])
        this.data.splice(this.ddata, 1)
        this.ddata = this.ddata + 1
      } else {
        console.log(231)
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
      console.log(this.data, 123321)
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
.fabuw {
  width: 100%;
  height: 100%;
  background: #fff;
}
.left {
  width: 65%;
  height: 100%;
  float: left;
  overflow: hidden;
  background:rgba(247,248,255,1);
}
.zhu {
  border: 1px dashed #A0B5FF;
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
  width: 30%;
  height: 100%;
  float: right;
}
.right_header {
  /* 左边头部样式 */
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 3vh;
  color: #698EFF;
}
.right_body {
  /* 左边主体样式 */
  width: 100%;
  color: #698EFF;
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
.wdatali {
  float: left;
  width: 24%;
  font-size: 10px;
  line-height: 200%;
  margin-left: 1%;
  margin-top: 10px;
}
.wdatali .input {
  width: 70%;
  font-size: 10px;
  display: inline-block;
}
/* 表格 */
.tab {
  width: 100%;
  border: 1px solid #698EFF;
}
.tab th,
td {
  border: 1px solid #698EFF;
  height: 20px;
  font-size: 15px;
}
.kongzhi > div {
  float: left;
  width: 15px;
  height: 15px;
  text-align: center;
  margin-left: 10px;
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
.kongzhi .kongzhi_jia {
  background: url("../../assets/jia.png") no-repeat;
  background-size: 100% 100%;
}
.kongzhi .kongzhi_jian {
  background: url("../../assets/jian.png") no-repeat 50%;
}
.kongzhi .kongzhi_shang {
  background: url("../../assets/shang.png") no-repeat;
  background-size: 100% 100%;
}
.kongzhi .kongzhi_xia {
  background: url("../../assets/xia.png") no-repeat;
  background-size: 100% 100%;
}
</style>

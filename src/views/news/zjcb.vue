<template>
  <div class="zjcb-container">
    <div class="zjcb_header">
      <span class="span">节目名称</span>
      <div class="input">
        <el-input v-model="dataname" placeholder="请输入节目名称"></el-input>
      </div>
      <span class="span">分辨率</span>
      <el-select v-model="fenvalue" placeholder="请选择">
        <el-option
          v-for="item in fen"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span class="span">备注</span>
      <div class="input" style="width:20%;">
        <el-input v-model="databei" placeholder="输入备注"></el-input>
      </div>
      <!-- <div class="bai" @click="baocun">
        保存
      </div> -->
      <div style="float:right;">
        <el-button type="info" round>节目预览</el-button>
        <el-button type="info" round>返回</el-button>
        <el-button type="primary" round @click="baocun">保存</el-button>
      </div>
      <!-- <div class="bai">
        返回
      </div>
      <div class="btn">
        节目预览
      </div> -->
    </div>
    <div class="zjcb_body">
      <div class="body_left">
        <div class="left_header">
          <div :class="tab==1?'zhong':''" @click="tab=1">文档</div>
          <div :class="tab==2?'zhong':''" @click="tab=2">图片</div>
          <div :class="tab==3?'zhong':''" @click="tab=3">视频</div>
          <!-- <div :class="tab==4?'zhong':''" @click="tab=4">音频</div> -->
        </div>
        <div class="left_body">
          <fabuw v-if="tab == 1" @fabufa="jief"></fabuw>
          <fabut v-if="tab == 2" @fabufa="jief"></fabut>
          <fabus v-if="tab == 3" @fabufa="jief"></fabus>
          <!-- <fabuy v-if="tab == 4" @fabufa="jief"></fabuy> -->
        </div>
      </div>
      <!-- <div class="body_right"></div> -->
    </div>
  </div>
</template>

<script>
import fabuw from './fabuw'
import fabut from './fabut'
import fabus from './fabus'
// import fabuy from './fabuy'
export default {
  name: 'News',
  components: {
    fabuw,
    fabut,
    fabus
    // fabuy
  },
  data() {
    return {
      name: '增加插播节目',
      tab: 1,
      fen: [
        {
          value: 1,
          label: '1920*1080'
        },
        {
          value: 2,
          label: '1024*768'
        },
        {
          value: 3,
          label: '800*600'
        }
      ],
      fenvalue: 1,
      dataname: '',
      data: [],
      databei: ''
    }
  },
  created() {
  },
  methods: {
    baocun() {
      var that = this
      console.log(123)
      var data = {
        showmaterial: that.data,
        programmeName: that.dataname,
        resolution: that.fenvalue,
        remark: that.databei
      }
      this.$router.push({ path: '/news/establish', query: { data: data }})
    },
    jief(a) {
      console.log(a)
      this.data = a
    }
  }
}
</script>
<style scoped>
.zjcb-container{
  background: #f0f3ff;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
  padding: 1%;
}
.zjcb_header{
  width: 100%;
  height: 10%;
  background: #ffffff;
  padding: 1%;
  margin-bottom: 1%;
  border-radius: 8px;
  border-left: 8px solid #3F6AFF;
}
.span{
  margin-left: 10px;
  margin-right: 10px;
}
.input{
  width: 15%;
  display: inline-block;
}
/* 按钮 */
.bai{
  float: right;
  padding: 8px;
  width: 5%;
  text-align: center;
  border:1px solid rgba(63,106,255,1);
  color: #3F6AFF;
  font-size: 10px;
  border-radius:15px;
  margin-right: 3%;
  margin-top: 0.3%;
}
.btn{
  padding: 8px;
  width: 5%;
  text-align: center;
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  border-radius:15px;
  font-size: 10px;
  float: right;
  color: #FFFFFF;
  margin-right: 3%;
  margin-top: 0.3%;
}
/* 主体 */
.zjcb_body{
  width: 100%;
  height: 87.5%;
  border-radius: 8px;
}
/* 左边 */
.body_left{
  float: left;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 1%;
}
.left_header{
  overflow: hidden;
  margin-bottom: 3%;
}
.left_header div{
  width: 8%;
  height: 5vh;
  background: rgba(241,244,253,1);
  border:1px dashed rgba(160,181,255,1);
  float: left;
  margin-right: 10px;
  text-align: center;
  line-height: 5vh;
  text-indent: 10px;
  color: #3F6AFF
}
.left_body{
  width: 100%;
  height: 85%;
  background:rgba(247,248,255,1);
}
/* 右边 */
.body_right{
  float: right;
  width: 24%;
  height: 100%;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 1%;
}
.left_header .zhong{
  background: #3F6AFF;
  color: #ffffff;
}
</style>

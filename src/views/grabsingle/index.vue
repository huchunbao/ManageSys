<template>
  <div class="index">
    <div class="content">
      <p class="title_name">停止抢单条件设置</p>
      <ul>
        <li>
          <el-radio v-model="radio" :disabled="disabled" label="1" @change="radioClick">
            <span class="name">告警后</span>
            <el-input v-model="input_times" :disabled="times" placeholder="请输入时间(分钟)" class="inputs"></el-input>
            <span class="name">分钟内抢单，超出时间进入派单</span>
          </el-radio>
        </li>
        <li>
          <el-radio v-model="radio" :disabled="disabled" label="2" @change="radioClick">
            <span class="name">告警信息被播报</span>
            <el-input v-model="input_nums" :disabled="nums" placeholder="请输入次数(次)" class="inputs"></el-input>
            <span class="name">次后进入派单</span>
          </el-radio>
        </li>
      </ul>
      <div class="btn_box">
        <el-row>
          <el-button :type="edit ? '' : 'primary'" :disabled="edit" round @click="editClick">修改</el-button>
          <el-button :type="save ? '' : 'primary'" :disabled="save" round @click="saveClick">保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
// import { get } from '@/api/axios'
export default {
  name: 'Tourist',
  data() {
    return {
      radio: null,
      input_times: '',
      input_nums: '',
      disabled: true,
      edit: false,
      save: true,
      times: true,
      nums: true
    }
  },
  computed: {
    // selects: function() {
    //   return (this.radio && this.input_times && this.input_nums)
    // }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    editClick() {
      this.disabled = false
      this.edit = true
      this.save = false
    },
    saveClick() {
      this.disabled = true
      this.edit = false
      this.save = true
    },
    radioClick(val) {
      var that = this
      if (parseInt(val) === 1) {
        that.times = false
        that.nums = true
      } else if (parseInt(val) === 2) {
        that.nums = false
        that.times = true
      }
    }
  }
}
</script>
<style scoped>
@import './css/grabsingle.css';
/*简单初始化---star*/
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
/*简单初始化---end*/
.index {
  z-index: 10;
  width: 100%;
  min-width: 480px;
  height: 100%;
  background: #F6F8FF;
  padding: 15px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.content {
  width: 100%;
  height: 100%;
  min-width: 480px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius:6px;
  padding: 30px;
}
.content .title_name{
  width: 100%;
  min-width: 480px;
  height: 16px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29,33,51,1);
}
.content ul{
  margin-top: 40px;
  min-width: 480px;
}
.content ul li {
  width: 100%;
  height: 30px;
  min-width: 480px;
  margin-bottom: 20px;
}
.content ul li .inputs{
  width: 200px;
  height: 30px;
}
.btn_box {
  width: 480px;
  margin-top: 110px;
  text-align: center;
}
</style>

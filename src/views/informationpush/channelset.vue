<template>
  <div class="index">
    <div class="message_tree">
      <div class="title">
        <div class="names">渠道</div>
        <!-- <div class="operation">
          <el-button class="ad_btn" type="text" @click="addClick">增加</el-button>&nbsp;&nbsp;
          <el-button class="del_btn" type="text" @click="delClick">删除</el-button>
        </div>-->
      </div>
      <div class="list_title">
        <p v-if="datas">暂无数据，请添加</p>
        <el-scrollbar v-if="!datas" class="scroll_box" tag="ul">
          <div class="text_box message_box2">
            <ul>
              <li v-for="(item,index) in list_value" :key="index" :class="{active:index === default_bar}" @click="Clickli(index)">
                <div class="namea">{{ item.name }}</div>
                <el-switch
                  v-model="item.value"
                  class="selects"
                  active-color="#3B65FF"
                  inactive-color="#D4DADF"
                  @change="switchClick(index)"
                >
                </el-switch>
              </li>
            </ul>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="content">
      <p class="sets">渠道配置</p>
      <!-- <el-scrollbar class="scroll_box" tag="ul">
      </el-scrollbar> -->
      <ul>
        <li v-if="contains">
          <div class="title_name">模板名称</div>
          <el-select v-model="name" class="rights" placeholder="请选择" :disabled="disabled" @change="onchange(name)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="name" class="rights" placeholder="请输入内容" :disabled="disabled"></el-input> -->
        </li>
        <li v-if="contains">
          <div class="title_name">模板信息&nbsp;短信开头</div>
          <el-input v-model="messages_tart" class="rights" placeholder="请输入内容" :disabled="disabled"></el-input>
        </li>
        <li v-if="contains" class="moreContent">
          <div class="title_name">短信内容</div>
          <el-input
            v-model="messages_content"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            class="rights"
            :disabled="disabled"
          >
          </el-input>
          <!-- <el-input v-model="messages_content" class="rights" placeholder="请输入内容"></el-input> -->
        </li>
        <li v-if="contains">
          <div class="title_name">短信结尾</div>
          <el-input v-model="messages_end" class="rights" placeholder="请输入内容" :disabled="disabled"></el-input>
        </li>
        <li>
          <div class="title_name">是否启用</div>
          <el-switch
            v-model="isused"
            class="isuse rights"
            active-text="启用"
            inactive-text="不启用"
            active-color="#3B65FF"
            inactive-color="#D4DADF"
            :disabled="disabled"
          >
          </el-switch>
        </li>
        <li>
          <el-row>
            <!-- <el-button round>圆角按钮</el-button>
            <el-button type="primary" round>主要按钮</el-button> -->
            <el-button :disabled="edit" round @click="changeClick">修改</el-button>
            <el-button :type="!save ? '' : 'primary'" :disabled="!save" round @click="saveClick">保存</el-button>
          </el-row>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { get } from '@/api/axios'
export default {
  name: 'Tourist',
  data() {
    return {
      cpid: null,
      default_bar: 0,
      name: '',
      messages_tart: '',
      messages_content: '',
      messages_end: '',
      isused: false,
      contains: false,
      cities: ['短信', '手机游景区', '手机管景区'],
      disabled: true,
      edit: false,
      list_value: [
        {
          name: '短信',
          value: false
        },
        {
          name: '手机游景区',
          value: false
        },
        {
          name: '手机管景区',
          value: false
        }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  computed: {
    datas: function() {
      if (this.list_value.length > 0) {
        return false
      } else {
        return true
      }
    },
    save: function() {
      // return (this.name && this.messages_tart && this.messages_content && this.messages_end)
      return this.isused
    }
  },
  watch: {
  },
  created() {
    this.cpid = this.$store.state.user.companyId
  },
  mounted() {
    // 渠道列表获取
    // this.initChannel()
    // 渠道列表点击
    this.Clickli(0)
    // 模板列表获取
    this.moduleName()
  },
  methods: {
    addClick() {
      var that = this
      this.$prompt('请输入渠道名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S{3,}/,
        inputErrorMessage: '请检查渠道名称是否正确(不少于三个任意字符)'
      }).then(({ value }) => {
        // this.$message({
        //   type: 'success',
        //   message: '你的邮箱是: ' + value
        // })
        if (value) {
          that.list_value.push(
            {
              name: value,
              value: false
            }
          )
          that.Clickli(that.list_value.length - 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    delClick() {
      var that = this
      var val = that.list_value[that.default_bar].name
      this.$confirm('<span>是否删除:&nbsp;&nbsp;<span style="color: red;">' + val + '</span></span>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        dangerouslyUseHTMLString: true,
        center: true
      }).then(() => {
        if (that.default_bar || that.default_bar === 0) {
          that.list_value.splice(that.default_bar, 1)
          that.default_bar = null
        }
      }).catch(() => {
        this.$message({
          type: 'message',
          message: '已取消删除'
        })
      })
    },
    onchange(val) {
      var that = this
      var list = this.options
      console.log(list)
      for (var i = 0; i < list.length; i++) {
        if (list[i].value === val) {
          that.messages_content = list[i].content
        }
      }
    },
    changeClick() {
      this.disabled = false
      // this.edit = true
      console.log('当前修改的是' + this.default_bar)
    },
    // 渠道列表获取
    initChannel() {
      // var that = this
      // get('/notify-template/' + that.cpid, null).then(response => { // 获取渠道通知模板
      //   if (response.status === 0) {
      //     var list = response.data
      //     var list_value = []
      //     for (var i = 0; i < list.length; i++) {
      //       list_value.push({
      //         name: list[i].wayName,
      //         value: false
      //       })
      //     }
      //     that.list_value = list_value
      //   }
      // })
    },
    // 模板名称获取
    moduleName() {
      var that = this
      get('/notify-template/' + that.cpid).then(data => {
        console.log(data)
        if (data.msg === 'SUCCESS') {
          var options = []
          var list = data.data
          for (var i = 0; i < list.length; i++) {
            options.push({ 'value': list[i].id, 'label': list[i].wayName, 'content': list[i].content })
          }
          that.options = options
        }
      })
    },
    saveClick() {
      this.edit = false
      this.disabled = true
      // 保存获取到渠道的选项
      console.log(this.options)
      // that.options = options

      // 渠道的配置项
      // that.list_value
      // this.name
      // this.messages_tart
      // this.messages_content
      // this.messages_end
      // this.isused
      console.log(this.list_value)
    },
    Clickli(index) {
      // window.event.stopPropagation()
      this.default_bar = index
      var that = this
      for (var i = 0; i < that.list_value.length; i++) {
        if (i === index) {
          that.list_value[i].value = !that.list_value[i].value
        }
      }
      // 重置渠道配置
      this.name = null
      this.messages_tart = null
      this.messages_content = null
      this.messages_end = null
      this.isused = false

      this.disabled = true
    },
    switchClick(index) {
      var that = this
      that.default_bar = index
      window.event.stopPropagation()
      // for (var i = 0; i < that.list_value.length; i++) {
      //   if (i !== index) {
      //     that.list_value[i].value = false
      //   }
      // }
    }
  }
}
</script>
<style scoped>
@import './css/messageset.css';
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
  min-width: 690px;
  height: 100%;
  background: #F6F8FF;
  padding: 15px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* 左侧 */
.message_tree{
  width: 360px;
  height: 100%;
  padding: 30px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius:6px;
  position: relative;
}
.message_tree .title{
  width: 100%;
  /* height: 30px;
  line-height: 30px;
  padding: 7px 0 7px 0; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.message_tree .title .names{
  width:99px;
  height:30px;
  padding: 7px 0 7px 0;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
  line-height:18px;
}
.message_tree .title .operation{
  width: 90px;
  height: 100%;
}
.message_tree .title .operation .ad_btn,.message_tree .title .operation .del_btn{
  display: inline-block;
  width:30px;
  height:16px;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  text-decoration:underline;
  color:rgba(63,106,255,1);
  line-height:18px;
  cursor: pointer;
}
.list_title {
  margin-top: 60px;
  width: 100%;
  height: calc(100% - 20px - 60px);
}
.list_title p{
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #D4DADF;
  font-size: 16px;
}
.list_title .scroll_box{
  width: 100%;
  height: 100%;
}
.list_title ul li{
  width: 100%;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 10px 0 10px 0;
  cursor: pointer;
}
.active .namea{
  color:rgba(63,106,255,1)!important;
}
.list_title ul li .namea {
  height:14px;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(29,33,51,1);
  line-height:18px;
}
/* 右侧 */
.content{
  width: calc(100% - 15px - 360px);
  min-width: 650px;
  height: 100%;
  padding: 30px 0 0 50px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius:6px;
}
.content .sets{
  width:99px;
  height:30px;
  padding: 7px 0 7px 0;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
  line-height:18px;
  margin: 0;
}
.content ul{
  width: 100%;
  height: calc(100% - 30px);
  min-width: 650px;
}
.content ul li{
  height: 40px;
  line-height: 40px;
  width: 550px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 20px;
}
.content ul li:last-child{
  padding-left: 95px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.content ul li .title_name{
  width:150px;
  height:13px;
  font-size:14px;
  text-align: right;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(29,33,51,1);
}
.content ul li .rights{
  min-width: 380px;
  width: calc(100% - 20px - 150px);
}
.moreContent{
  height: 140px!important;
}
.moreContent .rights{
  height: 140px!important;
  line-height: 140px;
}
.isuse{
  margin-top: 10px;
}
</style>

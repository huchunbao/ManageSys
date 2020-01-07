<template>
  <div class="index">
    <div class="message_tree">
      <div class="title">
        <div class="names">消息模块名称</div>
        <div class="operation">
          <!-- 增加消息模块弹窗 -->
          <el-button class="ad_btn" type="text" @click="addClick">增加</el-button>&nbsp;&nbsp;
          <!-- <span>增加</span>&nbsp;&nbsp;
          <span class="del_btn" @click="delClick">删除</span>-->
          <el-button class="del_btn" type="text" @click="delClick">删除</el-button>
        </div>
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
      <ul>
        <li>
          <div class="title_name">模板名称</div>
          <el-input v-model="name" class="rights" placeholder="请输入内容" :disabled="disabled"></el-input>
        </li>
        <li>
          <div class="title_name">模板信息&nbsp;短信开头</div>
          <el-input v-model="messages_tart" class="rights" placeholder="请输入内容" :disabled="disabled"></el-input>
        </li>
        <li class="moreContent">
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
        <li>
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
          <el-checkbox-group
            v-model="checkedCities"
            :disabled="disabled"
          >
            <el-checkbox v-for="city in cities" :key="city" :label="city" :disabled="disabled">{{ city }}</el-checkbox>
          </el-checkbox-group>
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
// import { get } from '@/api/axios'
export default {
  name: 'Tourist',
  data() {
    return {
      default_bar: 0,
      name: '',
      messages_tart: '',
      messages_content: '',
      messages_end: '',
      isused: true,
      checkedCities: [],
      cities: ['短信', '手机游景区', '手机管景区'],
      isshow: false,
      disabled: true,
      edit: false,
      list_value: [
        {
          name: '游前温馨提示0',
          value: false
        },
        {
          name: '游前温馨提示1',
          value: false
        },
        {
          name: '游前温馨提示2',
          value: false
        },
        {
          name: '游前温馨提示3',
          value: false
        },
        {
          name: '游前温馨提示4',
          value: false
        },
        {
          name: '游前温馨提示5',
          value: false
        }
      ]
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
      return (this.name && this.messages_tart && this.messages_content && this.messages_end && this.checkedCities.length > 0)
    }
  },
  watch: {
  },
  mounted() {
    // this.list_value = []
    this.Clickli(0)
  },
  methods: {
    addClick() {
      var that = this
      this.$prompt('请输入消息模块名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S{3,}/,
        inputErrorMessage: '请检查消息模块名称是否正确(不少于三个任意字符)'
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

    changeClick() {
      this.isshow = false
      this.disabled = false
      // this.edit = true
      console.log('当前修改的是' + this.default_bar)
    },
    saveClick() {
      this.edit = false
      this.disabled = true
      console.log('当前保存的是' + this.default_bar)
      console.log(this.checkedCities)
    },
    Clickli(index) {
      // window.event.stopPropagation()
      this.default_bar = index
      var that = this
      for (var i = 0; i < that.list_value.length; i++) {
        if (i === index) {
          that.list_value[i].value = !that.list_value[i].value
        } else {
          that.list_value[i].value = false
        }
      }
    },
    switchClick(index) {
      var that = this
      that.default_bar = index
      window.event.stopPropagation()
      for (var i = 0; i < that.list_value.length; i++) {
        if (i !== index) {
          that.list_value[i].value = false
        }
      }
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
  justify-content: space-between;
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
  padding: 50px 0 0 50px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius:6px;
}
.content ul{
  width: 100%;
  height: 100%;
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
.content ul li:nth-last-child(2){
  padding-left: 95px;
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

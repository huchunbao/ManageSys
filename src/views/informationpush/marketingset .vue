<template>
  <div class="index">
    <div class="add">
      <div class="blue_bar"></div>
      <el-button class="btn_add" type="primary" round @click="add">增加营销</el-button>
    </div>
    <div v-if="datashow" class="hasData">暂无数据</div>
    <div class="list_box">
      <div v-for="(item,index) in listStyle" :key="index" class="list">
        <div class="title">
          <div class="list_name">{{ item.nameTitle }}</div>
          <div class="list_stius">状态: &nbsp;&nbsp;<span>{{ item.isused ? '启用': '未启用' }}</span></div>
        </div>
        <div class="content">
          <ul>
            <li>
              <div class="name">营销类型</div>
              <div class="things">{{ item.type }}</div>
            </li>
            <li>
              <div class="name">营销名称</div>
              <div class="things">{{ item.name }}</div>
            </li>
            <li>
              <div class="name">营销时间</div>
              <div class="things">{{ item.dataTime }}</div>
            </li>
            <li>
              <div class="name">推送时间</div>
              <div class="things">{{ item.pushTime }}</div>
            </li>
            <li>
              <div class="name">推送人群</div>
              <div class="things">{{ item.pushPerson }}</div>
            </li>
            <li>
              <div class="name">消息模板</div>
              <div class="things">
                <div>{{ item.textarea }}</div>
                <!-- <el-scrollbar class="box_scroll" tag="ul">
                  <div class="text_box1 message_box1">
                    <ul>
                      <li><el-radio v-model="radio" label="1">模板 1</el-radio></li>
                      <li><el-radio v-model="radio" label="2">模板 2</el-radio></li>
                      <li><el-radio v-model="radio" label="3">模板 3</el-radio></li>
                      <li><el-radio v-model="radio" label="4">模板 4</el-radio></li>
                      <li><el-radio v-model="radio" label="5">模板 5</el-radio></li>
                      <li><el-radio v-model="radio" label="6">模板 6</el-radio></li>
                    </ul>
                  </div>
                </el-scrollbar> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="btn_box">
          <el-button type="primary" round @click="editClick(index)">修改</el-button>
          <el-button type="primary" round @click="delClick(index)">删除</el-button>
        </div>
      </div>
    </div>
    <div v-if="pageShow" class="pages">
      <el-pagination
        background
        :current-page="currentPage4"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog :title="titles" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-scrollbar class="scroll_boxa" tag="ul">
        <el-form :model="show_box">
          <el-form-item label="营销类型" :label-width="formLabelWidth">
            <el-select v-model="show_box.type" class="selectes" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营销名称" :label-width="formLabelWidth">
            <el-input v-model="show_box.name" class="selectes" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="消息模板" :label-width="formLabelWidth">
            <el-scrollbar class="scroll_box" tag="ul">
              <div class="text_box message_box2">
                <ul>
                  <li><el-radio v-model="radios" label="1">模板 1</el-radio></li>
                  <li><el-radio v-model="radios" label="2">模板 2</el-radio></li>
                  <li><el-radio v-model="radios" label="3">模板 3</el-radio></li>
                  <li><el-radio v-model="radios" label="4">模板 4</el-radio></li>
                  <li><el-radio v-model="radios" label="5">模板 5</el-radio></li>
                  <li><el-radio v-model="radios" label="6">模板 6</el-radio></li>
                </ul>
              </div>
            </el-scrollbar>
          </el-form-item>
          <el-form-item label="营销时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="show_box.dataTime"
              class="selectes times"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="推送时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="show_box.pushTime"
              class="selectes times"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="推送人群" :label-width="formLabelWidth">
            <el-select v-model="show_box.pushPerson" class="selectes" clearable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch
              v-model="show_box.isused"
              class="isuse"
              active-text="启用"
              inactive-text="不启用"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div class="dialog-footer btn_two">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleBoxSave">确 定</el-button>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>
<script>
// import { get } from '@/api/axios'
export default {
  name: 'Tourist',
  data() {
    return {
      addnew: false, // 当前新建状态
      editnew: false, // 当前编辑状态
      list: '', // 编辑时弹框的内容数据
      index_num: null, // 编辑或者删除时第几项数据
      currentPage4: 1, // 分页默认的前往页
      radio: '1',
      radios: '1',
      dialogFormVisible: false, // 弹框是否显示
      formLabelWidth: '120px', // 弹框宽度
      titles: '增加营销',
      show_box: { // 弹框内的数据
        nameTitle: '',
        type: '',
        name: '',
        module: '', // 模板
        dataTime: '',
        pushTime: '',
        pushPerson: '',
        isused: false
      },
      pageShow: false, // 是否显示分页
      datashow: false,
      listStyle: [],
      options: [
        {
          value: '类型1',
          label: '类型1'
        },
        {
          value: '类型2',
          label: '类型2'
        },
        {
          value: '类型3',
          label: '类型3'
        }],
      options1: [
        {
          value: '青少年',
          label: '青少年'
        },
        {
          value: '中年',
          label: '中年'
        },
        {
          value: '老年',
          label: '老年'
        }]
    }
  },
  computed: {
    save: function() {
      return (this.show_box.type && this.show_box.name && this.show_box.dataTime && this.show_box.pushTime && this.show_box.pushPerson)
    }
  },
  watch: {
  },
  mounted() {
    this.listStyle = [ // 默认加载的所有数据集合
      {
        nameTitle: '营销1号',
        isused: false,
        type: '类型1',
        name: '营销1号',
        dataTime: '2019-12-01',
        pushTime: '2012-12-12',
        pushPerson: '青年',
        textarea: '息模板消息消息板消息消息模板消息消息模板消息消息'
      },
      {
        nameTitle: '营销2号',
        isused: true,
        type: '类型2',
        name: '营销2号',
        dataTime: '2019-12-01',
        pushTime: '2012-12-12',
        pushPerson: '青年',
        textarea: '息模板消息消息板消息消息模板消息消息模板消息消息'
      }
    ]
    if (this.listStyle.length > 2) {
      this.pageShow = true
    } else {
      this.pageShow = false
      if (this.listStyle.length === undefined || this.listStyle.length === 0) {
        this.datashow = true
      } else {
        this.datashow = false
      }
    }
  },
  methods: {
    add() {
      this.dialogFormVisible = true
      this.addnew = true
      this.editnew = false
      this.titles = '增加营销'

      this.show_box.nameTitle = null
      this.show_box.type = null
      this.show_box.name = null
      this.show_box.module = null
      this.show_box.dataTime = null
      this.show_box.pushTime = null
      this.show_box.pushPerson = null
      this.show_box.isused = null
    },
    // 弹框确定按钮
    handleBoxSave() {
      this.dialogFormVisible = false
      this.listStyle[this.index_num] = this.list
    },
    // 弹框取消按钮
    // handleBoxCancel() {
    //   this.dialogFormVisible = false
    // },
    editClick(index) {
      this.dialogFormVisible = true
      this.titles = '增加营销'
      this.index_num = index
      this.addnew = false
      this.editnew = true

      this.list = JSON.parse(JSON.stringify(this.listStyle[index])) // 数据深拷贝
      this.show_box = this.list
      this.titles = this.list.nameTitle
    },
    delClick(index) {
      var that = this
      var name = that.listStyle[index].name
      this.$confirm('<span>是否删除:&nbsp;&nbsp;<span style="color: red;">' + name + '</span></span>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        dangerouslyUseHTMLString: true
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
        that.listStyle.splice(index, 1)
        if (that.listStyle.length > 0) {
          that.pageShow = true
        } else {
          that.pageShow = false
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    saveClick() {
      console.log(this.show_box)
      this.show_box.nameTitle = this.show_box.name
      var data = this.show_box
      this.listStyle.push(data)
    },
    cancelClick() {
    },
    handleSizeChange(val) {
      console.log(`每页${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页:${val}`)
    }
  }
}
</script>
<style scoped>
@import './css/place.css';
.index {
  z-index: 10;
  width: 100%;
  min-width: 690px;
  height: 100%;
  background: #F6F8FF;
  padding: 15px;
  position: relative;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.add {
  position: relative;
  width: 100%;
  min-width: 660px;
  height: 60px;
  background:rgba(255,255,255,1);
  box-shadow: 0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius: 6px;
}
.blue_bar{
  width:6px;
  height:60px;
  background:rgba(63,106,255,1);
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius:6px 0px 0px 6px;
}
.btn_add{
  position: absolute;
  top: 15px;
  left: 36px;
}
.hasData{
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow:0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius:6px 0px 0px 6px;
  padding: 22px;
  text-align: center;
  font-size: 16px;
  color: #97a8be;
  margin-top: 20px;
}
.list_box {
  width: 100%;
  min-width: 660px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.list {
  margin-top: 15px;
  width: calc(( 100% - 30px)/3);
  min-width: 210px;
  /* width: 600px; */
  height: 450px;
  background:rgba(255,255,255,1);
  box-shadow: 0px 0px 25px 0px rgba(63,106,255,0.08);
  border-radius: 6px;
  padding: 30px;
}
.list:not(:first-child){
   margin-left: 15px;
}
.list .title{
  width: 100%;
  position: relative;
  height: 18px;
}
.list_name {
  position: absolute;
  left: 0px;
  height: 16px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
  line-height: 18px;
}
.list_stius {
  position: absolute;
  right: 0px;
  height:14px;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(29,33,51,1);
  line-height:18px;
}
.list_stius span{
  color:#3F6AFF
}
.content{
  margin-top: 30px;
  width: 100%;
}
.content ul{
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}
.content ul li{
  width: 100%;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 1px;
}
.content ul li:last-child{
  height: 80px;
}
.content ul li:last-child .name{
  padding: 33px 20px;
}
.content ul li .name {
  width:100px;
  height: 100%;
  padding: 13px 20px;
  background:rgba(237,239,248,1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color:rgba(29,33,51,1);
  line-height: 14px;
  text-align: center;
}
.content ul li .things {
  width: calc(100% - 100px);
  height: 100%;
  background:rgba(247,248,255,1);
  padding: 11px;
  font-size: 13px;
  color: #97a8be;
}
.content ul li .things div {
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break:break-all;
  white-space:normal;
  font-size: 13px;
  color: #97a8be;
  letter-spacing:2px;
  text-overflow:ellipsis;
}
.message_box1 ul {
  padding-top:12px;
}
.message_box1 ul li {
  height: 40px!important;
  line-height: 40px!important;
  padding-left: 13px;
}
/* .box_scroll {
  width: 100%;
  height: 100%;
  padding: 0;
} */
.btn_box {
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.pages {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin-top: 30px;
}
/*弹框 增加 编辑 */
.doing_box {
  position: absolute;
  /* display: fixed; */
  left: calc( 50% - 300px);
  top: 5%;
  width: 550px;
  height: 85%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 25px 0px rgba(124,124,124,0.3);
  border-radius:6px;
  padding: 30px;
  z-index: 100;
}
.doing_box ul {
  width: 100%;
}
.doing_box ul li {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.doing_box ul li .name {
  width: 57px;
  height: 30px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color:rgba(29,33,51,1);
  padding: 8px 0px;
}
.doing_box ul li .selectes {
  /* width: calc(100% - 57px - 20px)!important; */
  height: 30px;
  width: 100%;
  position: relative;
}
.doing_box>ul>li {
  margin-bottom: 20px;
}
.scroll_box {
  /* width: calc(100% - 57px - 20px)!important; */
  width: 100%;
  height: 140px;
}
.scroll_box .text_box {
  width: 100%;
}
.text_box ul {
  background:rgba(243,247,255,1);
  border-radius:4px;
  width: 100%;
  padding: 0 20px 20px 13px;
}
.text_box ul li {
  width: 100%;
  height: 40px!important;
}
.message_box2 ul li {
  padding: 12px 0 12px 0;
}
/* .isuse {
  margin-top: 7px;
} */
.save_cancel {
  width: 100%;
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.scroll_boxa{
  height: 500px;
}
.btn_two {
  text-align: center;
}
</style>

<template>
  <div>
    <div class="lan">
      <div class="whitek">
        <div style="display:flex; margin-left:45px;">
          <p style="">姓名</p>
          <el-input
            v-model="data.name"
            class="name"
            placeholder="请输入姓名"
            clearable
            style="width:200px;  margin-top:10px;  padding-left:10px;"
          ></el-input>
        </div>
        <template>
          <div style="display:flex; margin-left:60px;">
            <p class="xb">性别</p>
            <div class="stu">
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="0">女</el-radio>
            </div>
          </div>
        </template>
        <div style="display:flex; margin-left:15px;">
          <p>联系方式</p>
          <el-input
            v-model="data.name1"
            class="name1"
            placeholder="请输入联系方式"
            clearable
            style="width:200px;  margin-top:10px;  padding-left:10px;"
          ></el-input>
        </div>
        <div style="display:flex; margin-left:15px;">
          <p>员工编号</p>
          <el-input
            v-model="data.bh"
            class="bh"
            placeholder="请输入员工编号"
            clearable
            style="width:200px;  margin-top:10px;  padding-left:10px;"
          ></el-input>
        </div>
        <div style="display:flex; margin-left:45px;">
          <p>部门</p>
          <el-input
            v-model="data.bm"
            class="bm"
            placeholder="请输入部门"
            clearable
            style="width:200px;  margin-top:10px;  padding-left:10px;"
          ></el-input>
        </div>
        <div style="display:flex; margin-left:45px;">
          <p>职位</p>
          <el-input
            v-model="data.zw"
            class="zw"
            placeholder="请输入职位"
            clearable
            style="width:200px;  margin-top:10px;  padding-left:10px;"
          ></el-input>
        </div>
        <div style="display:flex; margin-left:15px;">
          <p>证件类型</p>
          <el-input
            v-model="data.lx"
            class="lx"
            placeholder="请输入证件类型"
            clearable
            style="width:200px;  margin-top:10px;  padding-left:10px;"
          ></el-input>
        </div>
        <div style="display:flex; margin-left:15px;">
          <p>证件编号</p>
          <el-input
            v-model="data.zjbh"
            class="zjbh"
            placeholder="请输入证件编号"
            clearable
            style="width:200px;  margin-top:10px;  padding-left:10px;"
          ></el-input>
        </div>
        <router-link to="/face/bmd"><input type="button" value="取消" class="btna"></router-link>
        <input type="button" value="确定" class="btn" @click="qd()">
        <!-- <div class="photo">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { post } from '../../api/axios.js'
export default {
  data() {
    return {
      radio: '1',
      dialogImageUrl: '',
      name: '',
      data: {},
      arr: [],
      pickerOptions1: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      value1: '',
      value2: '',
      options: [
        {
          value: '选项1',
          label: 'A区停车场'
        },
        {
          value: '选项2',
          label: '景区'
        },
        {
          value: '选项3',
          label: 'C区旋转木马'
        }
      ],
      value: '',
      value11: 0,
      value12: 50,
      value13: 36,
      value14: 48,
      value15: 42
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100
    },
    qd() {
      post('/faceInfo/insert', {
        faceName: this.data.name,
        sex: this.radio,
        phone: this.data.name1,
        employeeNum: this.data.bh,
        department: this.data.bm,
        position: this.data.zw,
        certificateType: this.data.lx,
        certificateNum: this.data.zjbh,
        faceType: 0
      }).then(response => {
      //  console.log(response.msg == 'SUCCESS')
        if (response.msg === 'SUCCESS') {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push({
            path: '/face/bmd'
          })
        } else {
          alert(response.msg)
        }
      })
    }
  }
}
</script>
<style   scoped>
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  overflow: hidden;
}
.whitek {
  width: 98%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  height: 500px;
  margin-top: 15px;
  margin-left: 15px;
}
.demonstration {
  margin-top: 10px;
  margin-left: 1px;
}
.xsd {
  display: flex;
  margin-left: 15px;
  margin-top: 10px;
}
.btn {
  width: 60px;
  height: 26px;
  font-size: 10px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 80px;
  margin-top: 30px;
  outline: none;
}
.btna {
  width: 60px;
  height: 26px;
  font-size: 10px;
  background: white;
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: rgba(63, 106, 255, 1);
  margin-left: 76px;
  margin-top: 30px;
  outline: none;
}
.photo {
  float: right;
  margin-right: 800px;
  margin-top: -300px;
}
input{
  height: 30px;
  margin-top:10px;
  margin-left:6px;
}
.xb{
  margin-top:20px;
  margin-left:-19px;
}
.stu{
  margin-top:20px;
}
</style>

<template>
  <div class="lan">
    <div class="whitek">
      <div style="display:flex; margin-left:45px;">
        <p style="">姓名</p>
        <el-input
          v-model="name"
          placeholder="请输入姓名"
          clearable
          style="width:200px;  margin-top:10px;  padding-left:10px;"
        ></el-input>
      </div>
      <div style="display:flex; margin-left:15px; margin-top:5px;">
        <p>所属公司</p>
        <el-select v-model="value" placeholder="请选择" style="width:190px; margin-left:10px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="display:flex; margin-left:53px;">
        <p style="margin-top:14px; margin-left:-5px; ">部门</p>
        <el-select v-model="value6" placeholder="请选择" style="width:190px; margin-left:10px;">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="display:flex; margin-left:15px;  margin-top:-8px;">
        <p style="padding-top:5px;">联系方式</p>
        <el-input
          v-model="phone"
          placeholder="请输入联系方式"
          clearable
          style="width:200px;  margin-top:10px;padding-left:10px;"
        ></el-input>
      </div>
      <div style="display:flex; margin-left:45px;">
        <p>岗位</p>
        <el-input
          v-model="gw"
          placeholder="请输入岗位"
          clearable
          style="width:200px;  margin-top:10px; padding-left:10px;"
        ></el-input>
      </div>
      <div style="display:flex; margin-left:45px;">
        <p>密码</p>
        <el-input
          v-model="mima"
          placeholder="请输入密码"
          clearable
          style="width:200px;  margin-top:10px; padding-left:10px;"
        ></el-input>
      </div>
      <div style="display:flex; margin-left:45px;">
        <p>角色</p>
        <div class="beija">
          <div class="yuan">
            <el-checkbox label="管理员1"></el-checkbox><br>
            <el-checkbox label="操作员1"></el-checkbox><br>
            <el-checkbox label="IT运维"></el-checkbox>
          </div>
        </div>
      </div>
      <router-link to="/account/index"><input type="button" value="取消" class="btna"></router-link>
      <input type="button" value="确定" class="btn">
      <div class="photo">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog size="tiny">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '三郎国际'
        },
        {
          value: '选项2',
          label: '希尔顿酒店'
        }
      ],
      value: '',
      cities: [
        {
          value: 'aa',
          label: '信息中心'
        },
        {
          value: 'ab',
          label: '后勤部'
        },
        {
          value: 'ac',
          label: '客服部'
        }
      ],
      value6: '',
      name: '',
      phone: '',
      gw: '',
      mima: '',
      form: {
        resource: ''
      },
      dialogImageUrl: ''
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100
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
  height: 540px;
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
.beija {
  width: 194px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 8px;
  margin-top:8px;
}
.yuan{
   padding: 15px 25px;
}
</style>

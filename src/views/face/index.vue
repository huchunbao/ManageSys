<template>
  <div>
    <div class="lan">
      <div class="whitek">
        <div style="display:flex; margin-left:15px;">
          <p>开始时间</p>
          <el-date-picker
            v-model="shij"
            style="margin-top:10px; margin-left:10px;"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div style="display:flex; margin-left:15px;">
          <p>结束时间</p>
          <el-date-picker
            style="margin-top:10px; margin-left:10px;"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
          ></el-date-picker>
        </div>
        <div style="display:flex; margin-left:15px;">
          <p>抓拍点</p>
          <el-select
            v-model="data.zpd"
            placeholder="抓拍点"
            style="margin-top:10px; margin-left:24px;  width:220px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="xsd">
          <span class="demonstration">相似度</span>
          <el-slider v-model="data.xsd" style="width:220px; margin-left:23px; "></el-slider>
        </div>
        <input type="button" value="查询" class="btn" @click="cha()">
        <div class="photo">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog size="tiny">
            <img width="100%" alt>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '../../api/axios.js'
export default {
  data() {
    return {
      shij: [new Date(2019, 9, 1), new Date()],
      options: [
        {
          value: '选项1',
          label: '云端动物园'
        },
        {
          value: '选项2',
          label: '熊猫馆'
        },
        {
          value: '选项3',
          label: '山林氧吧公园'
        }
      ],
      value: '',
      value11: 0,
      value12: 50,
      value13: 36,
      value14: 48,
      value15: 42,
      data: {}
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100
    },
    shua() {
      console.log(this.cur, this.arrdata)
      this.arrdata = []
      for (var i = 0; i < 10; i++) {
        if (i < this.arr.length && this.arr[i + (this.cur * 8) - 8]) {
          this.arrdata.push(this.arr[i + (this.cur * 8) - 8])
        }
      }
    },
    shi(value) {
      var s = value / 1000
      var m = parseInt(s % 60)
      s = parseInt(s / 60)
      var f = parseInt(s % 60)
      s = parseInt(s / 60)
      var date = (s < 10 ? '0' + s : s) + ':' + (f < 10 ? '0' + f : f) + ':' + (m < 10 ? '0' + m : m)
      return date
    },
    shi2(date) {
      var n = date.getFullYear()
      var y = date.getMonth() + 1
      var r = date.getDate()
      var s = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var m = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return n + '-' + y + '-' + r + ' ' + s + ':' + f + ':' + m
    },
    cha() {
      var that = this
      get('/repair/getRepair', {
        point: this.data.zpd,
        similarity: this.data.xsd,
        startTime: this.shi2(that.shij[0]),
        endTime: this.shi2(that.shija[1])
      }).then(res => {
        console.log(res, 100)
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
  /* margin-top: 10px; */
  overflow: hidden;
}
.whitek {
  width: 98%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  height: 300px;
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
  margin-left: 110px;
  margin-top: 40px;
  outline: none;
}
.photo {
  float: right;
  margin-right: 800px;
  margin-top: -100px;
}
</style>

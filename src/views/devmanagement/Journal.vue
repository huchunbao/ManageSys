<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class=" top">
          设备名称<el-input v-model="mingc" placeholder="请输入内容" class="car-name-input"></el-input>
          设备位置<el-input v-model="ip" placeholder="请输入内容" class="car-name-input"></el-input>
          <el-button class="btn-search" type="primary" style="border-radius: 20px;" @click="sou">搜索</el-button>
          <slot />
        </div>
      </div>
      <div
        style="width:98%;height:84%;background:rgba(255,255,255,1);box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);border-radius:3px; margin-left:14px; padding:10px;  margin-top:15px;"
      >
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            label="序号"
            prop="id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="wei"
            label="设备位置"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="miaoshu"
            label="故障描述"
            align="center"
            width="300"
          >
          </el-table-column>
          <el-table-column
            label="照片"
            align="center"
          >
            查看
          </el-table-column>
          <el-table-column
            prop="ren"
            label="保修人员"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="iem"
            label="保修时间"
            align="center"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="8"
          layout="total, prev, pager, next, jumper"
          :total="arr.length"
          @current-change="btnClick"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      // 分页
      pagesize: 1,
      pageNumber: 10,
      arrdata: [],
      arr: [
        {
          id: 1,
          name: '密度摄像机',
          wei: '203',
          miaoshu: '设备：密度摄像机    位置：203    告警类型：触发报警    告警时间：2019-08-15 9:24',
          ren: '李明',
          iem: '2019-08-15 9:32'
        },
        {
          id: 2,
          name: '密度摄像机',
          wei: '204',
          miaoshu: '设备：密度摄像机    位置：204    告警类型：触发报警    告警时间：2019-08-05 12:24',
          ren: '李明',
          iem: '2019-08-15 9:32'
        },
        {
          id: 3,
          name: '客流相机',
          wei: '204',
          miaoshu: '设备：客流相机    位置：204    告警类型：触发报警    告警时间：2019-07-25 11:04',
          ren: 'admin',
          iem: '2019-08-15 9:32'
        },
        {
          id: 4,
          name: '显示大屏',
          wei: 'C区广场',
          miaoshu: '线路连接没有问题，就是显示不了播放的内容',
          ren: '李明',
          iem: '2019-08-15 9:32'
        },
        {
          id: 5,
          name: '密度摄像机',
          wei: 'C区广场',
          miaoshu: '设备：密度摄像机    位置：204    告警类型：触发报警    告警时间：2019-08-05 12:24',
          ren: 'admin',
          iem: '2019-08-15 9:32'
        },
        {
          id: 6,
          name: '显示大屏',
          wei: 'C区广场',
          miaoshu: '线路连接没有问题，就是显示不了播放的内容',
          ren: '李明',
          iem: '2019-08-15 9:32'
        },
        {
          id: 7,
          name: '客流相机',
          wei: 'C区广场',
          miaoshu: '线路连接没有问题，就是显示不了播放的内容',
          ren: '李明',
          iem: '2019-08-15 9:32'
        },
        {
          id: 8,
          name: '显示大屏',
          wei: 'C区广场',
          miaoshu: '显示大屏   位置：204    告警类型：触发报警    告警时间：2019-08-05 12:24',
          ren: 'admin',
          iem: '2019-08-15 9:32'
        },
        {
          id: 9,
          name: '密度摄像机',
          wei: 'C区广场',
          miaoshu: '线路连接没有问题，就是显示不了播放的内容',
          ren: '李明',
          iem: '2019-08-15 9:32'
        },
        {
          id: 10,
          name: '显示大屏',
          wei: 'C区广场',
          miaoshu: '设备：密度摄像机    位置：203    告警类型：触发报警    告警时间：2019-08-15 9:24',
          ren: 'admin',
          iem: '2019-08-15 9:32'
        }
      ],
      //    分页
      all: 100 / 10, //      总页数
      cur: 1,
      mingc: '',
      ip: '',
      type: '',
      data: {},
      multipleSelection: []
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.shua()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.shua()
    },
    shua() {
      console.log(this.cur, this.arrdata)
      this.arrdata = []
      for (var i = 0; i < 8; i++) {
        if (i < this.arr.length && this.arr[i + (this.cur * 8) - 8]) {
          this.arrdata.push(this.arr[i + (this.cur * 8) - 8])
        }
      }
    },
    sou() {
    }
  }
}
</script>
<style   scoped>
.xt {
  width: 300px;
  height: 7px;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(165, 168, 181, 1);
  margin-left: 18px;
  margin-top: -10px;
}
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  /* margin-top: 10px; */
  overflow: hidden;
}
.da {
  display: flex;
}
/* devmanagement */
.top {
  width: 98%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  padding: 10px;
  margin: 1% 0px 5px 1%;
  border-left: 0.3vw solid #3F6AFF;
}
.online {
  width: 32%;
  height: 150px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  /* margin-top: 60px; */
  margin-left: 1%;
}
.ona {
  width: 120px;
  height: 8px;
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
  line-height: 9px;
  padding: 15px 15px;
}
.tab {
  width: 98%;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  position: relative;
  top: 18px;
  margin-left: 13px;
}
.tab td {
  font-size: 14px;
  text-align: center;
  font-family: 宋体;
  font-weight: 400;
}

.tab th {
  color: black;
  height: 30px;
  font-size: 15px;
}
.baojing {
  position: fixed;
  right: -6px;
  bottom: 100px;
  display: flex;
}
.img {
  width: 70px;
  height: 38px;
}
.bj {
  position: fixed;
  right: 14px;
  bottom: 116px;
  font-size: 9px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
#zzc {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.aa {
  width: 310px;
  height: 400px;
  background: #eff3ff;
  position: absolute;
  top: 170px;
  left: 500px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
  font-size: 13px;
  font-family: 宋体;
}
.jk {
  width: 200px;
  height: 23px;
}

.qxa {
  width: 55px;
  height: 20px;
  border: 1px solid rgba(63, 106, 255, 1);
  border-radius: 8px;
  background: white;
  color: rgba(63, 106, 255, 1);
  margin-top: 20px;
  margin-left: 80px;
  outline: none;
  font-family: 楷体;
  font-size: 13px;
}
.qda {
  width: 55px;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 15px;
  outline: none;
  font-family: 楷体;
  font-size: 13px;
}
#zzc_a {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.ld {
  width: 280px;
  height: 130px;
  background: rgba(243, 247, 255, 1);
  border-radius: 2px;
  margin-left: 40px;
  margin-top: 20px;
}
.aa_a {
  width: 360px;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 200px;
  left: 530px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
}
.jk {
  width: 120px;
  height: 25px;
}

.qdc {
  width: 55px;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 155px;
  outline: none;
  margin-top: 25px;
  font-size: 11px;
}
#zzca {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.aab {
  width: 310px;
  height: 170px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 260px;
  left: 530px;
  z-index: 9999;
  overflow: hidden;
  border-radius: 5px;
  font-family: 宋体;
}
.jk {
  width: 60px;
  height: 15px;
}
.qxb {
  width: 50px;
  height: 20px;
  font-size: 10px;
  border: 1px solid rgba(63, 106, 255, 1);
  border-radius: 8px;
  background: white;
  color: rgba(63, 106, 255, 1);
  margin-top: 30px;
  margin-left: 90px;
  outline: none;
}
.qdb {
  width: 50px;
  height: 20px;
  font-size: 10px;
  background: linear-gradient(
    90deg,
    rgba(63, 106, 255, 1) 0%,
    rgba(109, 142, 255, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: white;
  margin-left: 75px;
  outline: none;
}
.car-search{
  height: 50px;
  line-height: 50px;
  width: 98;
  margin-left: 1%;
  background: #eff3ff;
  padding-left: 1%;
}
.car-search div{
  display: inline-block;
}

.btn-excel,
.btn-search,
.car-name-input,
.car-dropdown,
.date-picker{
  margin: 0 12px;
}

.car-name-input{
  width: 130px;
}

.search-small-input{
  width: 60px;
  margin: 0 10px;
}

.search-small-unit-input{
  width: 60px;
  margin-left: 10px;
}
.feny{
  float: right;
  margin-right:10px;
  margin-top:10px;
}
</style>

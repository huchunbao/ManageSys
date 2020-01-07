<template>
  <div>
    <div class="white">
      <ul>
        <router-link to="/search"> <li style="margin-left:-28px;  font-size:14px;">确认操作查询</li></router-link>
        <router-link to="/qccx"> <li>清除操作查询</li></router-link>
        <router-link to="/fsxx"><li>发信息查询</li></router-link>
        <li style=" color:#3a67fe">报修记录查询</li>
      </ul>
    </div>
    <div class="lan">
      <div class="da">
        <!-- <div class="top">
          <div style="display:flex; width:900px; height:30px;">
            <p
              style="width:24px;height:7px;font-size:11px;font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);  margin:8px 13px;  white-space: nowrap;"
            >名称</p>
            <input
              v-model="mingc"
              type="placeholder"
              value="输入名称"
              style="width:90px;height:18px;border:1px solid rgba(195,198,209,1);opacity:0.3;border-radius:2px; margin-top:6px; font-size:11px;"
            >
            <div style="margin-left:100px;">
              <p
                style="width:24px;height:7px;font-size:11px;font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);position:relative; left:-76px; top:-2px;"
              >IP</p>
              <input
                v-model="ip"
                type="placeholder"
                value="输入IP"
                style="width:90px;height:18px;border:1px solid rgba(195,198,209,1);opacity:0.3;border-radius:2px;position:relative; left:-55px; top:-23px; font-size:11px;"
              >
            </div>
            <div style="margin-left:95px;">
              <p
                style="width:44px;height:7px;font-size:11px;font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1); position:relative; left:-121px; top:-2px; "
              >所属组织</p>
              <input
                v-model="zuzhi"
                type="placeholder"
                value="输入所属组织"
                style="width:110px;height:18px;border:1px solid rgba(195,198,209,1);opacity:0.3;border-radius:2px;   position:relative; left:-63px; top:-21px; font-size:11px;"
              >
            </div>
            <div style="margin-left:135px;">
              <p
                style="width:44px;height:7px;font-size:11px;font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);   position:relative; left:-171px; top:-2px;"
              >类型</p>
              <select
                id
                v-model="type"
                name
                style="  width:90px;height:18px;font-size:8.2px;opacity:0.3;border-radius:2px;  position:relative; left:-133px; top:-24px;font-size:11px;"
              >
                <option value="11">全部</option>
                <option value="11">监控</option>
                <option value="11">监测</option>
                <option value="11">单兵</option>
                <option value="11">LED</option>
              </select>
            </div>
            <p
              style="width:44px;height:7px;font-size:11px;font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);   position:relative; left:-100px; top:-2px;  white-space:nowrap;"
            >厂商</p>
            <select
              id
              v-model="type"
              name
              style="height:18px;font-size:8.2px;opacity:0.3;border-radius:2px;  position:relative; left:-86px; top:8px;"
            >
              <option value="11">海康威视</option>
              <option value="11">大华</option>
            </select>
            <div style="position:relative;  left:180px;  display:flex;  font-size:13px;">
              <input
                type="button"
                value="搜索"
                style="font-size:11px; width:50px;height:20px;background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);border-radius:10px; border:1px solid rgba(109, 142, 255, 1);  color:white; margin-top:6px; margin-left:30px; outline:none; "
                @click="sou()"
              >
              <input
                type="button"
                value="移除"
                style="width:50px; height:20px;  font-size:11px; color:white; margin-top:6px; margin-left:10px;border:1px solid rgba(63,106,255,1);border-radius:10px; font-family:PingFang SC;font-weight:500;color:rgba(63,106,255,1); background:white; outline:none; "
                @click="shan()"
              >
              <input
                type="button"
                value="修改类型"
                style="width:60px; font-size:11px; height:20px; color:white; margin-top:6px; margin-left:10px;border:1px solid rgba(63,106,255,1);border-radius:10px; font-family:PingFang SC;font-weight:500;color:rgba(63,106,255,1); background:white;outline:none; "
                class="xg"
                @click="xg=true,xg(i)"
              >
              <input
                type="button"
                value="同步设备数据"
                style="width:80px; height:20px; color:white; margin-top:6px; margin-left:10px;border:1px solid rgba(63,106,255,1);border-radius:10px; font-family:PingFang SC;font-weight:500;color:rgba(63,106,255,1); background:white;outline:none;   font-size:11px;"
                class="tb"
                @click="tb=true"
              >
            </div>
          </div>
        </div>-->
        <div class="top">
          操作时间
          <el-date-picker
            v-model="value3"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          发送人
          <el-input v-model="ip" placeholder="请输入发送人" class="car-name-input"></el-input>
          <el-button
            class="btn-search"
            type="primary"
            style="border-radius: 20px;  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
            box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);"
          >搜索</el-button>
          <slot />
        </div>
      </div>
      <div
        style="width:98%;height:470px;background:rgba(255,255,255,1);box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);border-radius:3px; margin-left:14px;  margin-top:15px;"
      >
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#edeff8',color:'#909399'}"
        >
          <el-table-column prop="num" label="序号" width="180" align="center"></el-table-column>
          <el-table-column prop="time" label="发送时间" width="180"></el-table-column>
          <el-table-column prop="cztype" label="操作类型"></el-table-column>
          <el-table-column prop="czy" label="发送人"></el-table-column>
          <el-table-column prop="gjy" label="发送内容"></el-table-column>
          <el-table-column prop="gjwz" label="接收人"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ip: '',
      tableData: [
        {
          num: '1',
          time: '2019-08-15 13:06',
          cztype: '报修设备',
          czy: '李明',
          gjy: '密度摄像机启动不起来，请检修',
          gjwz: '后勤李经理'
        },
        {
          num: '2',
          time: '2019-08-15 13:06',
          cztype: '报修设备',
          czy: '李明',
          gjy: '密度摄像机启动不起来，请检修',
          gjwz: '后勤李经理'
        },
        {
          num: '3',
          time: '2019-08-15 13:06',
          cztype: '报修设备',
          czy: '李明',
          gjy: '密度摄像机启动不起来，请检修',
          gjwz: '后勤李经理'
        },
        {
          num: '4',
          time: '2019-08-15 13:06',
          cztype: '报修设备',
          czy: '李明',
          gjy: '密度摄像机启动不起来，请检修',
          gjwz: '后勤李经理'
        },
        {
          num: '5',
          time: '2019-08-15 13:06',
          cztype: '报修设备',
          czy: '李明',
          gjy: '密度摄像机启动不起来，请检修',
          gjwz: '后勤李经理'
        },
        {
          num: '6',
          time: '2019-08-15 13:06',
          cztype: '报修设备',
          czy: '李明',
          gjy: '密度摄像机启动不起来，请检修',
          gjwz: '后勤李经理'
        },
        {
          num: '7',
          time: '2019-08-15 13:06',
          cztype: '报修设备',
          czy: '李明',
          gjy: '密度摄像机启动不起来，请检修',
          gjwz: '后勤李经理'
        },
        {
          num: '8',
          time: '2019-08-15 13:06',
          cztype: '报修设备',
          czy: '李明',
          gjy: '密度摄像机启动不起来，请检修',
          gjwz: '后勤李经理'
        }
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value3: [new Date(2019, 7, 10, 10, 10), new Date(2019, 7, 11, 10, 10)],
      value4: '',
      options: [
        {
          value: '选项1',
          label: '确认'
        },
        {
          value: '选项2',
          label: '取消确认'
        }
      ],
      value5: [],
      value11: [],

      cities: [
        {
          value1: 'haikang',
          label: '设备告警'
        },
        {
          value1: 'dahua',
          label: '环境告警'
        },
        {
          value1: 'huawei',
          label: '主动告警'
        },
        {
          value1: 'bxgj',
          label: '报修告警'
        },
        {
          value1: 'tjgj',
          label: '统计告警'
        },
        {
          value1: 'clgj',
          label: '车辆告警'
        }
      ],
      value6: '',
      options5: [
        {
          value: 'pc',
          label: 'PC端'
        },
        {
          value: 'mobile',
          label: '移动端'
        }
      ],
      value10: []
    }
  }
}
</script>
<style  scoped>
.lan {
  width: 100%;
  height: calc(100vh - 80px);
  background: #eff3ff;
  overflow: hidden;
}
ul {
  display: flex;
  list-style: none;
}
li {
  padding: 0 12px;
}
a:hover {
  color: rgba(63, 106, 255, 1);
}
.da {
  display: flex;
}
.top {
  width: 98%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  padding: 10px;
  margin: 5px 0px 5px 1%;
}
.car-search {
  height: 50px;
  line-height: 50px;
  width: 98;
  margin-left: 1%;
  background: #eff3ff;
  padding-left: 1%;
}
.car-search div {
  display: inline-block;
}

.btn-excel,
.btn-search,
.car-name-input,
.car-dropdown,
.date-picker {
  margin: 0 12px;
}

.car-name-input {
  width: 130px;
}

.search-small-input {
  width: 60px;
  margin: 0 10px;
}

.search-small-unit-input {
  width: 60px;
  margin-left: 10px;
}
.feny {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
</style>

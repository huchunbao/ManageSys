<template>
  <div>
    <div class="lan">
      <div class="da">
        <div class="top">
          名称
          <el-input
            v-model="mingc"
            placeholder="请输入内容"
            class="car-name-input"
          ></el-input>
          IP
          <el-input
            v-model="ip"
            placeholder="请输入内容"
            class="car-name-input"
          ></el-input>
          所属组织
          <el-input
            v-model="zuzhi"
            placeholder="请输入内容"
            class="car-name-input"
          ></el-input>
          类型
          <el-select v-model="equipment_type" clearable placeholder="全部" style="width:110px;margin-left:15px;">
            <el-option
              v-for="item in options"
              :key="item.equipment_type"
              :label="item.equipment_type"
              :value="item.equipment_type"
            ></el-option>
          </el-select>
          <span class="com">厂商</span>
          <el-select v-model="firm" clearable placeholder="全部" style="width:110px;margin-left:15px;">
            <el-option
              v-for="item in options2"
              :key="item.firm"
              :label="item.firm"
              :value="item.firm"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            round
            style="margin-left:10px;"
            @click="sou"
          >查询</el-button>
          <el-button
            v-if="$store.state.permission.buttons.includes('设备总览:移除')"
            type="info"
            round
            @click="shan()"
          >移除</el-button>
          <el-button
            v-if="$store.state.permission.buttons.includes('设备总览:修改类型')"
            type="info"
            round
            @click="xgfa1()"
          >修改类型</el-button>
          <el-button
            v-if="$store.state.permission.buttons.includes('设备总览:同步设备数据')"
            type="info"
            round
            @click="tb=true"
          >同步设备数据</el-button>
          <slot />
        </div>
      </div>
      <div style="display:flex;">
        <div class="online">
          <div class="ona">设备状态统计</div>
          <div
            id="echarts1"
            style="width: 330px;height: 170px; margin-top:-25px; margin-left:100px;"
          ></div>
        </div>
        <div class="online">
          <div class="ona">设备类型占比</div>
          <div
            id="echarts3"
            style="width: 370px;height: 170px;margin-top:-32px; margin-left:80px;"
          ></div>
        </div>
        <div
          class="online"
          style="display:flex;"
        >
          <div class="ona">设备厂商占比</div>
          <div
            id="echarts2"
            style="width: 460px;height: 170px; position:relative; left:-18px; top:4px;"
          ></div>
        </div>
      </div>
      <div class="body">
        <el-table
          ref="multipleTable"
          :data="arr"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#edeff8',color:'#909399'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column label="序号" type="index" align="center">
            <template slot-scope="scope">
              <span> {{ scope.$index+(cur - 1) * 6 +1 }} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="160"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="deviceip"
            label="IP地址"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="deviceport"
            label="端口"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="bianhao"
            label="系统编号"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="orgname"
            label="所属组织"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="equipmentType"
            label="类型"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="firm"
            label="厂商"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="indexcode"
            label="原编号"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column prop="online" label="状态" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <span :style="scope.row.online == 0 ? 'color:black' : 'color:black'">
                {{ scope.row.online == 0 ? '在线' : '故障' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                style="font-size:10px; padding:5px 10px; margin-left:5px;"
                @click="zhfa(scope.$index)"
              >修改</el-button>
              <el-button
                style="font-size:10px; padding:5px 10px; margin-left:5px;"
                @click="ychu(scope.$index)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="feny"
          :current-page="cur"
          background
          :page-size="6"
          layout="total, prev, pager, next, jumper"
          :total="all"
          @current-change="btnClick"
        ></el-pagination>
      </div>
    </div>
    <div
      v-if="zh"
      class="tank"
    >
      <div id="zzc">
        <div class="aa">
          <div style="display:flex;">
            <p style="font-size:15px; font-weight:600;  padding-left:15px;  padding-top:15px;">修改设备信息</p>
            <p class="close" @click="clickok">×</p>
          </div>
          <div style="display:flex;  padding-left:35px;   font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体;  font-size:13px;">系统编号:</p>
            <p style="font-family:宋体; font-size:13px;">{{ zhdata.pid }}</p>
          </div>
          <div style="display:flex;  padding-left:60px; margin-top:-20px; font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体; font-size:13px;">名称:</p>
            <p style="font-family:宋体; font-size:13px;">{{ zhdata.devicename }}</p>
          </div>
          <div style="display:flex;  padding-left:48px;margin-top:-20px; font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体;  font-size:13px;">IP地址:</p>
            <p style="font-family:宋体; font-size:13px;">{{ zhdata.deviceip }}</p>
          </div>
          <div style="display:flex;  padding-left:60px;  margin-top:-20px;  font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体;  font-size:13px;">端口:</p>
            <p style="font-family:宋体;  font-size:13px;">{{ zhdata.deviceport }}</p>
          </div>
          <div style="display:flex;  padding-left:35px; margin-top:-20px;   font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体; font-size:13px;">所属组织:</p>
            <p style="font-family:宋体;  font-size:13px;">{{ zhdata.orgname }}</p>
          </div>
          <div style="display:flex;  padding-left:60px; margin-top:-20px;   font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体;  font-size:13px;">厂商:</p>
            <p style="font-family:宋体;  font-size:13px;">{{ zhdata.firm }}</p>
          </div>
          <div style="display:flex;  padding-left:46px; margin-top:-20px;   font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体;   font-size:13px;">原编号:</p>
            <p style="font-family:宋体;   font-size:13px;">{{ zhdata.orgindexcode }}</p>
          </div>
          <div style="display:flex;  padding-left:59px; margin-top:-20px;  font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体;  font-size:13px;">状态:</p>
            <p style="font-family:宋体;  font-size:13px;">{{ zhdata.online }}</p>
          </div>
          <div style="display:flex;  padding-left:59px;  margin-top:-20px;  font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体;   font-size:13px;">类型:</p>
            <input
              v-model="zhdata.equipmentType"
              type="text"
              value="监控"
              class="jk"
              style="margin-top:13px;  font-size:12px;"
            >
          </div>
          <div style="display:flex;  padding-left:59px; margin-top:-20px;  padding-top:5px; font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-family:宋体;  font-size:13px;">备注:</p>
            <input
              v-model="zhdata.remark"
              type="text"
              class="jk"
              style="margin-top:13px; font-size:12px;"
            >
          </div>
          <input
            type="button"
            class="qxa"
            value="取消"
            @click="clickok"
          >
          <input
            type="button"
            class="qda"
            value="确定"
            @click="xgai"
          >
        </div>
      </div>
    </div>
    <div
      v-if="xg"
      class="tanka"
    >
      <div id="zzca">
        <div class="aab">
          <div style="display:flex;">
            <p style="font-size:15px; font-family:PingFang SC; font-weight:600;  padding-left:15px;  padding-top:15px;"> 批量修改类型 </p>
            <p class="closeb" @click="clickok">×</p>
          </div>
          <div style="display:flex;  padding-left:40px;">
            <p style="font-size:13px;  font-family:宋体;  font-weight:400;">类型批量修改为:</p>
            <input
              v-model="xgtype"
              type="text"
              class="jk"
              style="width:140px; height:23px;  margin-top:7px;"
            >
          </div>
          <input
            type="button"
            class="qxb"
            value="取消"
            @click="clickok"
          >
          <input
            type="button"
            class="qdb"
            value="确定"
            @click="xgfa()"
          >
        </div>
      </div>
    </div>
    <div
      v-if="tb"
      class="tankb"
    >
      <div id="zzc_a">
        <div class="aa_a">
          <div style="display:flex;">
            <p style="font-size:15px; font-weight:550;  padding-left:15px;  padding-top:15px;">同步设备数据</p>
            <p class="closea" @click="clickok">×</p>
          </div>
          <div style="display:flex;  padding-left:39px;  padding-top:10px; font-family:PingFang SC;font-weight:400;color:rgba(29,33,51,1);">
            <p style="font-size:11px;  margin-top:7px;  font-family:宋体;">接口:</p>
            <select
              id
              name
              style="width:110px;height:18px;font-size:8.2px;border-radius:2px;  color:#080505;  margin-top:5px;"
            >
              <option value>海康威视</option>
              <option value>大华</option>
            </select>
            <input
              type="button"
              value="同步"
              style=" width: 48px;  height: 18px; font-size: 10px; border:1px solid rgba(63,106,255,1);  border-radius:8px;  background: white; color: rgba(63,106,255,1);  margin-left:28px;   margin-top:5px; outline: none;"
              @click="tong()"
            >
          </div>
          <div class="ld">
            <div style="padding:12px 19px;  font-size:11px;  font-family:微软雅黑;">
            </div>
          </div>
          <input
            type="button"
            class="qdc"
            value="确定"
            @click="clickok"
          >
          <input value="取消" type="button" class="qxba" @click="clickok">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get, post } from '@/api/axios'
import echarts from 'echarts'
export default {
  name: 'About',
  data() {
    return {
      // 分页
      $index: '',
      options2: [],
      options: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '主动报警'
        },
        {
          value: '选项3',
          label: '触发报警'
        },
        {
          value: '选项4',
          label: '异常报警'
        },
        {
          value: '选项5',
          label: '断电报警'
        },
        {
          value: '选项6',
          label: '超速报警'
        },
        {
          value: '选项7',
          label: '越界报警'
        },
        {
          value: '选项8',
          label: '超时报警'
        },
        {
          value: '选项9',
          label: '求助报警'
        }
      ],
      value5: [],
      value11: [],
      cities: [
        {
          value1: 'haikang',
          label: '垃圾桶'
        },
        {
          value1: 'dahua',
          label: '密度摄像机'
        },
        {
          value1: 'huawei',
          label: '客流相机'
        }
      ],
      value6: '',
      value10: [],
      arr: [],
      zhdata: {},
      xiu: {},
      zh: false,
      xgdata: [],
      chedata: [],
      xgtype: '',
      xg: false,
      //   修改
      tb: false,
      //   同步
      quanck: false,
      //    分页
      all: 100 / 10, //      总页数
      cur: 1,
      mingc: '',
      ip: '',
      zuzhi: '',
      // online:'',
      type: '',
      data: {},
      orgname: '',
      equipment_type: '',
      firm: '',
      multipleSelection: [],
      option1: {
        title: {
          text: '',
          x: 'left',
          textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c}台({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '0%',
          data: ['在线率', '离线率', '故障率']
        },
        series: [
          {
            name: '设备状态统计',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['35%', '50%'],
            data: [
              { value: 4, name: '在线率', itemStyle: { color: '#89A2FF' }},
              { value: 1, name: '故障率', itemStyle: { color: '#FF9F9c ' }}
            ],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      option2: {
        color: [
          '#89a2ff ',
          '#a2bcff',
          '#c5d6ff ',
          '#e4e5ff ',
          '#ff9f9c',
          '#ffdc79',
          '#fec379 ',
          '#a0d9de',
          '#d4bdf6'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c}台({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '0%',
          data: ['大华', '海康', '华康']
        },
        series: [
          {
            name: '设备厂商占比',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['35%', '50%'],
            data: [
              { value: 4, name: '兰州拉面', itemStyle: { color: '#89A2FF' }},
              { value: 3, name: '海康', itemStyle: { color: '#A2BCFF' }},
              { value: 1, name: '黄焖鸡米饭', itemStyle: { color: '#FF9F9c' }}
            ],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      option3: {
        tooltip: {
          trigger: 'item',
          formatter: '{a}</br>{b}:{c}台({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '0%',
          data: ['监控', '网络', '广播', '报警', 'LED', '巡更']
        },
        series: [
          {
            name: '设备类型占比',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['35%', '50%'],
            data: [
              { value: 3, name: '监控', itemStyle: { color: '#89A2FF' }},
              { value: 1, name: '网络', itemStyle: { color: '#A2BCFF' }},
              { value: 0, name: '广播', itemStyle: { color: '#C5D6FF' }},
              { value: 1, name: '报警', itemStyle: { color: '#ff9f9c' }},
              { value: 1, name: 'LED', itemStyle: { color: '#E4E5FF' }},
              { value: 0, name: '巡更', itemStyle: { color: '#FFDC79' }}
            ],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      yan: ['#89A2FF', '#A2BCFF', '#C5D6FF', '#ff9f9c', '#E4E5FF', '#FFDC79']
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.shua()
    var that = this
    get('/camara/selectMore', {
      cpid: this.$store.state.user.companyId
    }).then(response => {
      // console.log(112)
      this.options2 = response
    })
    get('/camara/selectCountFirm', {
      cpid: this.$store.state.user.companyId
    }).then(res => {
      // console.log(res)
      this.option2.series[0].data = []
      that.option2.legend.data = []
      for (var i = 0; i < res.length; i++) {
        that.option2.legend.data.push(res[i].firm)
        that.option2.series[0].data.push(
          {
            value: res[i]['count(*)'],
            name: res[i].firm,
            itemStyle: res.itemStyle
          }
        )
        this.shua()
        // console.log(that.option2.series[0].data, res)
      }
      this.echaers2fund()
    })
  },
  methods: {
    xgfa1() {
      if (!this.tiao) {
        if (this.multipleSelection.length >= 1) {
          this.xg = true
        } else {
          this.$message({
            message: '请选中记录,再进行操作',
            type: 'warning'
          })
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    btnClick(data) {
      console.log(data)
      this.cur = data
      this.shua()
    },
    shua() {
      var that = this
      get('/camara/getpoint', {
        cpid: this.$store.state.user.companyId,
        pageNumber: this.cur - 1,
        pageSize: 6
      }).then(res => {
        that.arr = res.content
        this.all = Math.ceil(res.data.data.totalElements / 7)
        // console.log(this.all)
        this.clickok()
      })
      get('/camara/selectCountOnline', {
        cpid: this.$store.state.user.companyId
      }).then(res => {
        that.option1.series[0].data[0].value = res[0]['在线']
        that.option1.series[0].data[1].value = res[0]['故障']
        // console.log(res, that.option1)
        this.echaers1fund()
      })
      get('/camara/selectMoreAnd', {
        cpid: this.$store.state.user.companyId
      }).then(response => {
        // console.log(111)
        this.options = response
      })
      get('/camara/selectCountEquType', {
        cpid: this.$store.state.user.companyId
      }).then(res => {
        // console.log(res)
        this.option3.series[0].data = []
        that.option3.legend.data = []
        for (var i = 0; i < res.length; i++) {
          that.option3.legend.data.push(res[i].equipment_type)
          that.option3.series[0].data.push(
            {
              value: res[i]['count(*)'],
              name: res[i].equipment_type,
              itemStyle: res.itemStyle
            }
          )
          // console.log(that.option3.series[0].data, res)
        }
        this.echaers3fund()
        // ]
      })
    },
    clickok() {
      this.zh = false
      this.zhdata = []
      this.xg = false
      this.tb = false
      this.qxa = false
      this.chedata = []
      this.xgdata = []
      this.xgtype = ''
    },
    echaers1fund() {
      const echarts1 = echarts.init(document.getElementById('echarts1'))
      echarts1.setOption(this.option1)
    },
    echaers3fund() {
      const echarts3 = echarts.init(document.getElementById('echarts3'))
      echarts3.setOption(this.option3)
    },
    echaers2fund() {
      const echarts2 = echarts.init(document.getElementById('echarts2'))
      echarts2.setOption(this.option2)
    },
    ychu(i) {
      get('/camara/delpoint', {
        pid: this.arr[i].pid
      }).then(response => {
        if (response.msg !== 'SUCCESS') {
          this.$alert(response.msg)
        }
        this.shua()
      })
    },
    sou() {
      var that = this
      get('/camara/SelPointBy', {
        cpid: this.$store.state.user.companyId,
        pageNum: this.cur - 1,
        pageSize: 6,
        name: this.mingc,
        deviceip: this.ip,
        equipmentType: this.equipment_type,
        orgname: this.zuzhi,
        firm: this.firm
      }).then(res => {
        this.arr = res.content
        this.all = res.numberOfElements
        // console.log(this.arr, res, 123321)
      })
      get('/camara/selectCountEquType', {
        cpid: this.$store.state.user.companyId,
        name: this.mingc,
        deviceip: this.ip,
        equipmentType: this.equipment_type,
        orgname: this.zuzhi,
        firm: this.firm
      }).then(res => {
        // console.log(res)
        this.option3.series[0].data = []
        that.option3.legend.data = []
        for (var i = 0; i < res.length; i++) {
          that.option3.legend.data.push(res[i].equipment_type)
          that.option3.series[0].data.push(
            {
              value: res[i]['count(*)'],
              name: res[i].equipment_type,
              itemStyle: res.itemStyle
            }
          )
          // console.log(that.option3.series[0].data, res)
        }
        this.echaers3fund()
      })
      get('/camara/selectCountOnline', {
        cpid: this.$store.state.user.companyId,
        name: this.mingc,
        deviceip: this.ip,
        equipmentType: this.equipment_type,
        orgname: this.zuzhi,
        firm: this.firm
      }).then(res => {
        that.option1.series[0].data[0].value = res[0]['在线']
        that.option1.series[0].data[1].value = res[0]['故障']
        // console.log(res, that.option1)
        this.echaers1fund()
      })
      get('/camara/selectCountFirm', {
        cpid: this.$store.state.user.companyId,
        name: this.mingc,
        deviceip: this.ip,
        equipmentType: this.equipment_type,
        orgname: this.zuzhi,
        firm: this.firm
      }).then(res => {
        // console.log(res)
        this.option2.series[0].data = []
        that.option2.legend.data = []
        for (var i = 0; i < res.length; i++) {
          that.option2.legend.data.push(res[i].firm)
          that.option2.series[0].data.push(
            {
              value: res[i]['count(*)'],
              name: res[i].firm,
              itemStyle: res.itemStyle
            }
          )
          // console.log(that.option2.series[0].data, res)
        }
        this.echaers2fund()
      })
    },
    shan() {
      const that = this
      if (that.multipleSelection.length >= 1) {
        var pids = []
        for (var i = 0; i < that.multipleSelection.length; i++) {
          if (i === 0) {
            pids += that.multipleSelection[i].pid
          } else {
            pids += ',' + that.multipleSelection[i].pid
          }
        }
        get('/camara/delAllpointByPids?pids=' + pids).then(res => {
          if (res.msg !== 'SUCCESS') {
            this.$alert(res.msg)
          }
          this.$alert('总条数为' + res.data[0] + '条,成功删除' + res.data[1] + '条,剩余条数为' + res.data[2],)
          this.shua()
        })
      } else {
        that.$message({
          message: '请选中记录,再进行操作',
          type: 'warning'
        })
      }
    },
    xgai() {
      post('/camara/updpoint', {
        pid: this.zhdata.pid,
        equipmentType: this.zhdata.equipmentType,
        remark: this.zhdata.remark
      }).then(response => {
        this.arr = response
        var data = response.data.data
        for (var i = 0; i < this.arr.length; i++) {
          if (this.arr[i].pid === data.pid) {
            this.arr[i] = data
          }
        }
        this.shua()
        this.clickok()
      })
    },
    xgfa() {
      var data = []
      for (var y = 0; y < this.multipleSelection.length; y++) {
        data.push({ pid: this.multipleSelection[y].pid, equipmentType: this.xgtype })
      }
      post('/camara/updapoints', data).then(response => {
        this.arr = response
        this.shua()
        this.clickok()
        // console.log(11)
      })
    },
    zhfa(i) {
      // console.log(i)
      this.zh = true
      this.zhdata = this.arr[i]
    },
    chefa(i) {
      var pid = this.arr[i].pid
      if (!this.chedata[i]) {
        this.xgdata.push(pid)
      } else {
        this.xgdata.remove(pid)
        this.xgdata.forEach(function(item, index, arr) {
          if (item === pid) {
            arr.splice(index, 1)
          }
        })
      }
    },
    tong() {
      get('/camara/getHikvisionOrg?nodeIndexCode=001007', {}).then(response => {
        this.shua()
      })
    }
  }
}
</script>
<style scoped>
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
  overflow: hidden;
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
  border-left: 0.3vw solid #3F6AFF;
  margin: 14px 0px 5px 1%;
}
.online {
  width: 32%;
  height: 170px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(63, 106, 255, 0.08);
  border-radius: 3px;
  margin-left: 1%;
  margin-top:10px;
}
.ona {
  width: 120px;
  height: 10px;
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
  line-height: 9px;
  padding: 15px 15px;
}
.baojing {
  position: fixed;
  right: -6px;
  bottom: 100px;
  display: flex;
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
  z-index: 9999;
  top: 0;
  left: 0;
}
.aa {
  width: 310px;
  height: 400px;
  background: white;
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
.qxba{
   width: 55px;
  height: 20px;
  background: white;
  box-shadow: 0px 3px 8px 0px rgba(63, 106, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(63, 106, 255, 1);
  color: rgba(63, 106, 255, 1);
  margin-left: 15px;
  outline: none;
  font-size: 13px;
}
#zzc_a {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
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
  margin-left: 110px;
  outline: none;
  margin-top: 25px;
  font-size: 11px;
}
#zzca {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
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
.car-search {
  height: 50px;
  line-height: 50px;
  width: 100%;
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
  margin: 0 1%;
}
.car-name-input {
  width: 10%;
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
.el-button--primary{
  background:linear-gradient(90deg,rgba(63,106,255,1) 0%,rgba(109,142,255,1) 100%);
  box-shadow:0px 3px 8px 0px rgba(63,106,255,0.3);
  height: 4vh;
  font-size: 2vh;
  padding-top:0;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height: 3.5vh;
  /* line-height: 5vh; */
}
.el-button--info{
  background:#fff;
  border:1px solid rgba(63,106,255,1);
  color: #3F6AFF;
  height: 4vh;
  font-size: 2vh;
  padding-top:0;
  font-family:PingFang SC;
  font-weight:500;
  line-height: 3.5vh;
}
.close{
  float:right;
  margin-top:29px;
  font-weight:600;
  margin-left: 160px;
  cursor: pointer;
}
.closea{
  float:right;
  margin-top:29px;
  font-weight:600;
  margin-left: 190px;
  cursor: pointer;
}
.closeb{
  float:right;
  margin-top:29px;
  font-weight:600;
  margin-left: 150px;
  cursor: pointer;
}
.com{
  margin-left:15px;
}
.body{
  width:98%;
  height:57%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(63,106,255,0.08);
  border-radius:3px;
  margin-left:14px;
  padding:10px;
  margin-top:16px;
}
</style>

<template>
  <div class="passenger">
    <!-- 地图 -->
    <!-- <div id="map2" class="map2"></div> -->
    <el-amap class="map2" :vid="'amap-vue'" :zoom="zoom" :center="center" :map-style="mapStyle">
      <div v-for="(marker, index) in markers" :key="index">
        <el-amap-marker :position="marker.position" :label="marker.label" :vid="index" />
        <el-amap-polyline :path="marker.path" :stroke-color="linecolor" :stroke-style="linestyle" />
        <div v-for="(circle, circleindex) in marker.path" :key="circleindex">
          <el-amap-marker v-if="(circleindex+1 != marker.path.length)" :position="circle" :vid="circleindex" :content="linecontent(circleindex) " />
        </div>
      </div>
    </el-amap>
    <div class="pos">
      <div class="pos_header">
        <div class="pos_left">巡查路线名称</div>
        <div class="pos_right">巡查点</div>
      </div>
      <div v-for="(item, i) in markers" :key="i" class="pos_list">
        <div class="pos_left">{{ item.label.content }}</div>
        <div class="pos_right">
          <span v-for="(item2, index) in item.fanglist" :key="index">{{ index==0? '':'，' }}{{ item2.pointName }}</span>
        </div>
      </div>
    </div>
    <!-- 游客比例 -->
    <div class="right">
      <div id="echarts1" class="zhanbi"></div>
      <div class="right_table">
        <el-table
          ref="multipleTable"
          :data="arrdata"
          tooltip-effect="dark"
          style="width: 100%;"
          :header-cell-style="{background:'#EDEFF8',color:'#909399',fontSize:'1vw'}"
          :cell-style="{fontSize:'1vw'}"
        >
          <el-table-column
            label="巡查路线名称"
            prop="circuitName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="开始时间"
            prop="startTime"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="结束时间"
            prop="endTime"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="巡查时长"
            prop="useTime"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="巡查员"
            prop="personName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="personPhone"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { get } from '@/api/axios'

export default {
  name: 'PassenGer',
  data() {
    return {
      zoom: 16,
      center: [116.336496, 39.942178],
      mapStyle: 'amap://styles/whitesmoke',
      // 客流情况趋势图切换1代表客流情况2代表趋势图
      activeName: 'qing',
      linecolor: '#3F6AFF',
      linestyle: 'dashed',
      arrdata: [
        {
          name: '南巡路线',
          kssj: '07:00',
          jssj: '11:00',
          xcsc: '240分钟',
          xcy: '小明',
          lxfs: '132xxxx0908/ 132xxxx0928'
        },
        {
          name: '东巡路线',
          kssj: '07:00',
          jssj: '11:00',
          xcsc: '240分钟',
          xcy: '李明',
          lxfs: '132xxxx0908/ 132xxxx0928'
        },
        {
          name: '场馆路线',
          kssj: '07:00',
          jssj: '11:00',
          xcsc: '240分钟',
          xcy: '王红红',
          lxfs: '132xxxx0908/ 132xxxx0928'
        }
      ],
      markers: [],
      option1: {
        title: {
          text: '本月巡查历史统计',
          x: 'left',
          textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        },
        tooltip: {
          trigger: 'item',
          formatter: '本月{b}:{c}次({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '10%',
          data: ['准时率', '早巡率', '晚巡率', '漏巡率']
        },
        series: [
          {
            name: '客流量',
            type: 'pie',
            radius: ['25%', '40%'],
            center: ['38%', '50%'],
            data: [
              { value: 335, name: '准时率', itemStyle: { color: '#89a2ff' }},
              { value: 310, name: '早巡率', itemStyle: { color: '#a2bcff' }},
              { value: 234, name: '晚巡率', itemStyle: { color: '#c5d6ff' }},
              { value: 135, name: '漏巡率', itemStyle: { color: '#e4e5ff' }}
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
      }
    }
  },
  mounted() {
    this.drawLine()
    this.geng()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    drawLine() {
      const echarts1 = echarts.init(document.getElementById('echarts1'))
      echarts1.setOption(this.option1)
    },
    linecontent(index) {
      return '<div class="line-marker" style="height: 20px; width: 20px; border-radius: 10px; background-color: rgba(63,106,255, .7); text-align: center; line-height: 20px; margin-top: 20px; color: #fff;">' + (index + 1) + '</div>'
    },
    geng() {
      get('/mngCircuitInfo/getmngcircuitinfobytype', { cpid: this.$store.state.user.companyId, typeid: 1 }).then(res => {
        console.log(res)
        var data = res.data
        this.markers = []
        for (var i = 0; i < data.length; i++) {
          var path = []
          for (var y = 0; y < data[i].circuitpointlist.length; y++) {
            path.push([data[i].circuitpointlist[y].circuitPointLon, data[i].circuitpointlist[y].circuitPointLat])
          }
          this.markers.push({
            position: [data[i].circuitpointlist[data[i].circuitpointlist.length - 1].circuitPointLon, data[i].circuitpointlist[data[i].circuitpointlist.length - 1].circuitPointLat],
            label: {
              content: data[i].circuitName,
              offset: [25, 0]
            },
            path: path,
            fanglist: data[i].circuitpointlist
          })
        }
      })
      get('/mngpatrol/getmonthPerbycpid', { cpid: this.$store.state.user.companyId }).then(res => {
        this.option1.series[0].data[0].value = res.data[0]['准点数'] ? res.data[0]['准时率'] : 0
        this.option1.series[0].data[1].value = res.data[0]['早到数'] ? res.data[0]['早到数'] : 0
        this.option1.series[0].data[2].value = res.data[0]['晚点数'] ? res.data[0]['晚点数'] : 0
        this.option1.series[0].data[3].value = res.data[0]['漏巡数'] ? res.data[0]['漏巡数'] : 0
        this.drawLine()
      })
      get('/mngpatrol/getMngPatrolPlanlist', { cpid: this.$store.state.user.companyId }).then(res => {
        this.arrdata = res.data
      })
    }
  }
}
</script>
<style scoped>
.passenger {
  background: #f0f3ff;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
  padding-left: 10px;
  padding-top:10px;
  padding-bottom: 10px;
  position: relative;
}
/* 地图 */
.map2 {
  width:65%;
  height:100%;
  border-radius: 0rem;
  float: left;
  margin-right: 1%;
}
.right{
  width: 33%;
  float: left;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(63, 106, 255, 0.08);
}
.zhanbi {
  float: left;
  width:100%;
  height:60%;
  border-radius: 0rem;
  margin-top: 0.5%;
}
.el-tabs__content{
  width: 100%;
  height: 100%;
}
.amap-box .amap-marker .line-marker{
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: rgba(63,106,255, .7);
  text-align: center;
  line-height: 20px;
  margin-top: 20px;
  color: #fff;
}
.pos{
  width: 35%;
  height: 30%;
  font-size: 1.5vh;
  background:rgba(47,49,83,0.5);
  border-radius:3px;
  position: absolute;
  left: 2%;
  top:2%;
}
.pos_header{
  width:90%;
  height:4vh;
  margin: auto;
  background:rgb(47,49,83,0.5);
  margin-top: 5%
}
.pos_list{
  width: 90%;
  height: 4vh;
  margin: auto;
}
.pos_left{
  width: 30%;
  height: 100%;
  float: left;
  line-height: 250%;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(255,255,255,1);
  text-indent: 10%;
}
.pos_right{
  width: 69%;
  height: 100%;
  line-height: 250%;
  float: left;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(255,255,255,1);
}
.right_table{
  width: 90%;
  margin: auto;
}
</style>


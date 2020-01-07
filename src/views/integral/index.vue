<template>
  <div class="integral-wrapper">
    <div class="layout_box">
      <div class="top">
        <div class="top_left">
          <div class="top_left_left">
            <div class="title">会员统计数据分析</div>
            <div class="L">
              <div class="data_list">
                <div>
                  <div>会员总数</div>
                  <div>
                    <span class="nums">{{ memberTotalNum }}</span>&nbsp;&nbsp;人
                  </div>
                </div>
              </div>
              <div class="data_list">
                <div>
                  <div>今年送出总积分</div>
                  <div>
                    <span class="nums">{{ totalSendNum }}</span>&nbsp;&nbsp;分
                  </div>
                </div>
              </div>
            </div>
            <div class="R">
              <div class="data_list">
                <div>
                  <div>新增会员</div>
                  <div>
                    <span class="nums">{{ addMemberTotalNum }}</span>&nbsp;&nbsp;人
                  </div>
                </div>
              </div>
              <div class="data_list">
                <div>
                  <div>今年兑换总积分</div>
                  <div>
                    <span class="nums">{{ totalExchangeNum }}</span>&nbsp;&nbsp;分
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="top_left_right echarts"></div>
        </div>
        <div class="top_right">
          <div class="title">今年会员消费占比</div>
          <echart-ring :getdata="series_data"></echart-ring>
          <!-- <div class="echarts echarts_box" id='echartsbox' style="height:100%;width:100%; margin-top:-15px;"></div> -->
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_left">
          <div class="title">
            本年每月会员积分统计
          </div>
          <div id="echartslinecolumn" class="echarts echarts_box " style="height:100%;margin-top:-15px;"></div>
        </div>
        <div class="bottom_right">
          <div class="title">历年会员活跃统计</div>
          <div id="doublecolumn" class="echarts echarts_box" style="width:100%;height:100%;margin-top:-15px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { get } from '@/api/axios'
import echarts from 'echarts'
import EchartRing from './components/EchartRing'
export default {
/* eslint-disable */
  name: 'Integral',
  data() {
    return {
      // tab按钮
      // tab: ["标题一","标题二","标题三"],
      // default_bar: 0,
      memberTotalNum: 0, // 会员总数
      addMemberTotalNum: 0, // 新增会员
      totalExchangeNum: 0, // 兑换积分
      totalSendNum: 0, // 送出积分
      memberTotalNum: '', //会员统计数据分析
      memberList: '', // 消费占比 活跃统计  dataYear 4 今年会员消费占比  dataYear 0 历年活跃不活跃
      memberIntegralInfos: '', // 会员积分统计
      series_data: {
        id: 'echartring',
        series: [],
        legend: [],
        height: '100%',
        width: '100%'
      },
      echart2: null,
      echart3: null
    }
  },
  components:{
    EchartRing
  },
  mounted() {
    var that = this
    this.$nextTick(() => {
      get('/income/findMemberCardIncome').then(data => {
        if (data.msg === 'SUCCESS') {
          var data = data.data
          // 左侧列表数据
          this.memberTotalNum = data.memberTotalNum ? data.memberTotalNum : 0
          this.addMemberTotalNum = data.addMemberTotalNum ? data.addMemberTotalNum : 0
          this.totalExchangeNum = data.totalExchangeNum ? data.totalExchangeNum : 0
          this.totalSendNum = data.totalSendNum ? data.totalSendNum : 0
          var echarts = data.memberList // 图表数据初始化
          var data_series = [], data_legend = [] // 环状图
          var data_active = [], data_close = [], datax = [] // 双柱状图
          for (let i = 0; i < echarts.length; i++) {
            if (echarts[i].dateYear === 4 ) {
              if (echarts[i].name) {
                data_series.push({ 'value': echarts[i].imcomeValue, 'name': echarts[i].name })
                data_legend.push(echarts[i].name)
              }
            } else if (echarts[i].dateYear === 0) {
              if (echarts[i].active === 0) {
                data_active.push(echarts[i].imcomeValue)
                datax.push(parseInt(echarts[i].dateName))
              } else {
                data_close.push(echarts[i].imcomeValue)
              }
            }
          }
          // 环状图
          that.series_data.series = data_series
          that.series_data.legend = data_legend
          // that.EchartsRing(data_series, data_legend)
          // 双柱状图
          that.DoubleColumn(data_active, data_close, datax)
          var LineColumn = data.memberIntegralInfos // 柱状折线图数据初始化
          var data_send = [], data_exchange = [], datax2 = [] // 柱状折线图
          for (var p = 1; p <= 12; p++) {
            datax2.push(p)
            data_send.push(0)
            data_exchange.push(0)
          }
          for (let i = 0; i < LineColumn.length; i++) {
            if (LineColumn[i].integralType === 0) {
              for (let j = 0; j < datax2.length; j++) {
                if (datax2[j] === parseInt(LineColumn[i].dateName)) {
                  data_send[j] = LineColumn[i].integral
                }
              }
              // data_send.push(LineColumn[i].integral ? LineColumn[i].integral : 0)
            } else if (LineColumn[i].integralType === 1) {
              for (let j = 0; j < datax2.length; j++) {
                if (datax2[j] === parseInt(LineColumn[i].dateName)) {
                  data_exchange[j] = LineColumn[i].integral
                }
              }
              // data_exchange.push(LineColumn[i].integral?LineColumn[i].integral : 0)
            }
          }
          that.EchartsLineColumn(data_send, data_exchange, datax2)
        }
      })
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    TabClick(index) {
      this.default_bar = index
    },
    EchartsLineColumn(data_send, data_exchange, datax) {
      var that = this
      var data_legend = [{ name: '送出积分' }, { name: '兑换积分', icon: 'circle' }]
      var option = {
        title: {
          show: data_send.length < 1 || data_exchange.length < 1 || datax.length < 1,
          textStyle: {
            color: '#909399',
            fontWeight: 'normal',
            fontSize: 14
          },
          text: '暂无数据',
          left: 'center',
          top: 'center'
        },
        grid: {
          left: '20',
          right: '70',
          bottom: '50'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          // axisPointer: {
          // type: 'shadow'
          // },
          formatter: function(params) {
            var result = ''
            result = params[0].name + '月份积分出入情况' + '</br>'
            params.forEach(function(item) {
              result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '</br>'
            })
            return result
          }
          // "{b}月会员积分情况 <br/>{a} :{c}<br/>{a1}: {c1}"
          // a ---legend第一个 名字  a1---第二个名字
          // b --- 第一个表x轴
          // b1 --- 第二标x轴
          // c  ---第一个y轴值
          // c1 ---第二个y轴
        },
        legend: { // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          data: data_legend
        },
        color: ['#3F6AFF', '#A2BCFF'],
        xAxis: [{
          name: '月份(月)',
          type: 'category',
          splitLine: {
            show: false
          },
          data: datax,
          axisPointer: {
            type: 'shadow'
          },
          axisTick: {
            alignWithLabel: true,
            show: false
          }
        }],
        yAxis: [{
          type: 'value',
          name: '积分(分)',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}'
          }
        }],
        series: [{
          name: '送出积分',
          type: 'line',
          data: data_send
        },
        {
          name: '兑换积分',
          type: 'bar',
          // yAxisIndex: 1,
          data: data_exchange
        }]
      }
      that.echart2 = echarts.init(document.getElementById('echartslinecolumn'))
      option.grid.left = this.getYWidth(Math.max.apply(null, option.series[0].data), Math.max.apply(null, option.series[1].data))
      that.echart2.setOption(option)
      window.addEventListener('resize', that.resizeHandler)
    },
    DoubleColumn(data_active, data_close, datax) {
      // var datax = ['2016','2017','2018','2019']
      // var data_active = [1, 2, 8, 9]
      // var data_close = [5, 1, 9, 10]
      var option = {
        title: {
          show: datax.length < 1 || data_active.length < 1 || data_close.length < 1,
          textStyle: {
            color: '#909399',
            fontWeight: 'normal',
            fontSize: 14
          },
          text: '暂无数据',
          left: 'center',
          top: 'center'
        },
        grid: {
          left: '20',
          right: '70',
          bottom: '50'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          // axisPointer: {
          // type: 'shadow'
          // },
          formatter: function(params) {
            var result = ''
            result = params[0].name + '年会员活跃度统计' + '</br>'
            params.forEach(function(item) {
              result += item.marker + '' + item.seriesName + ' : ' + item.value + '</br>'
            })
            return result
          }
        },
        legend: {
          data: [{ name: '活跃会员', icon: 'circle' }, { name: '沉默会员', icon: 'circle' }]
        },
        color: ['#89A2FF', '#A2BCFF'],
        yAxis: [{
          type: 'value',
          name: '人数(人)',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: false
          },
          axisTick: { // 刻度
            show: false
          }
        }],
        xAxis: [{
          type: 'value',
          name: '日期(年)',
          splitLine: {
            show: false
          },
          axisTick: { // 刻度
            show: false
          },
          type: 'category',
          data: datax
        }],
        series: [
          {
            name: '活跃会员',
            type: 'bar',
            barMaxWidth: 50, // 最大宽度
            data: data_active
          },
          {
            name: '沉默会员',
            type: 'bar',
            barMaxWidth: 50, // 最大宽度
            data: data_close
          }
        ]
      }
      var that = this
      that.echart3 = echarts.init(document.getElementById('doublecolumn'), 'light')
      // window.onresize = myChart.resize
      option.grid.left = this.getYWidth(Math.max.apply(null, option.series[0].data), Math.max.apply(null, option.series[1].data))
      that.echart3.setOption(option)
      window.addEventListener('resize', that.resizeHandler)
    },
    resizeHandler() { // 自适应echarts
      if (this.echart2) {
        this.echart2.resize()
      }
      if (this.echart3) {
        this.echart3.resize()
      }
    },
    getYWidth(data1, data2) { // 根据数值长度计算显示宽度
      return ((data1 > data2 ? data1.toString().length : data2.toString().length) * 12).toString()
    }
  }
}
</script>

<style scoped>
/* eslint-disable */
.integral-wrapper {
  padding: 0;
  margin: 0px;
  height: 100%;
  width: 100%;
  background-color: #F2F5FF;
}
.tab_title {
  height:4rem;
  line-height:4rem;
  width:100%;
  background:rgba(255,255,255,1);
  position:relative;
}
/* tab按钮 */
.tab_title .tab_box {
  list-style:none;
  padding:0px;
  margin:0px;
  align-items: center;
}
.tab_title .tab_box li {
  display:inline-block;
  font-size:16px;
  margin-left:15px;
}
.tab_title .tab_box li:hover {
  cursor: pointer;
}
.tab_title .tab_box li.active{
  color:#3E6AFF;
}
.tab_title .tab_box li.active .show_bar{
  background:#3E6AFF;
}
.tab_title .tab_box .box_name{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tab_title .tab_box .box_name .show_bar{
  width: 20px;
  height: 4px;
  border-radius: 3px;
  margin-top: -13px;
}
/*layout 布局*/
.top_right , .bottom_left .bottom_right{
  position: relative;
}
.top_right .title, .bottom_left .title.bottom_right .title{
  position: absolute;
  font-size: 0.8rem;
  /* text-indent: 10px; */
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
}
.layout_box{
  width:100%;
  height:100%;
  margin:0px;
  padding:15px;
  display:flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-content:flex-start;
}
.layout_box .top ,.layout_box .bottom{
    width:100%;
    display:flex;
    flex-direction: row;
    /* justify-content: space-between; */
     justify-content: flex-start;
}
.layout_box .top {
    height:50%;
    max-height: 380px;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    padding:0;
}
.layout_box .bottom {
  margin-top:15px;
  height:50%;
  display:flex;
  flex-direction: row;
  justify-content:flex-start;
  padding:0;
}
.layout_box .top>div ,.layout_box .bottom>div {
  width:50%;
  height:100%;
  background:#fff;
}
/* 第一框css重写 */
.layout_box .top .top_left {
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  width: calc((100% - 15px)/2);
}
.layout_box .top .top_right {
  width: calc((100% - 15px)/2);
}
.layout_box .top .top_left .top_left_left {
  width:100%;
  height: 100%;
}
/* 四个框内边距 */
.layout_box .top .top_left {
  padding:15px 30px 0px 30px;
}
/* 除去第一个框，其他三个框的高度为100% */
.layout_box .top .top_right,
.layout_box .bottom .bottom_left , .layout_box .bottom .bottom_right {
  padding:15px 30px 0px 30px;
  height:100%;
}
.layout_box .top .top_right,.layout_box .bottom .bottom_right {
  margin-left:15px;
}

/* title */
.layout_box .top .title ,.layout_box .bottom .title {
  padding:0;
  margin: 0;
  font-size: 0.8rem;
  /* text-indent: 10px; */
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(29, 33, 51, 1);
}
.top_left_left .L,.top_left_left .R {
  display:flex;
  justify-content: flex-start;
  height:70px;
  width:100%;
  flex-flow:row nowrap;
  align-content: flex-start;
  margin-top: 30px;
}
.top_left_left .L{
  margin-top: 30px;
}
.top_left_left .L .data_list, .top_left_left .R .data_list {
  /* width:35%; */
  min-width: 160px;
  max-width: 160px;
  width: 160px;
  height: 100%;
  margin-right: 30px;
  /* max-width:13.7rem; */
  /* height:40%; */
  padding:30px 0px 23px 15px;
  display: flex;
  flex-direction: column;
  /* justify-content: ; */
  justify-content: center;
  border-radius: 8px;
}
.top_left_left .L .data_list div, .top_left_left .R .data_list div {
  font-size: 0.875rem;
  color:#fff;
}
.top_left_left .L .data_list>div .nums , .top_left_left .R .data_list>div .nums {
  font-size: 18px;
  display:inline-block;
  margin-top:5px;
}
.top_left_left .L .data_list {
  background:linear-gradient(94deg,rgba(174,197,255,1) 0%,rgba(139,171,253,1) 100%);
  box-shadow:0px 0px 10px 0px rgba(204,204,204,0.2);
}
.top_left_left .R .data_list {
  background:linear-gradient(90deg,rgba(163,164,255,1) 0%,rgba(140,144,255,1) 100%) !important;
  box-shadow:0px 0px 10px 0px rgba(204,204,204,0.2);
}
.top_left_left .L .data_list>div, .top_left_left .R .data_list>div {
  text-align:left;
  color:#fff;
}
.top_left, .top_right, .bottom_left, .bottom_right{
  border-radius: 5px;
}
.top_left{
  overflow: hidden;
}
</style>

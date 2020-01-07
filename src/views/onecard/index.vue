<!-- eslint-disable -->
<template>
  <div class="integral-wrapper">
    <!--<div class="tab_title click_change">
         <ul class="tab_box">
             <li  v-for="(title,index) in tab"
                    @click="TabClick(index)"
                    :class="{active:index == default_bar}" :key='index'>
                 <div class="box_name" >
                     <div class="title_name">{{title}}</div>
                     <div class="show_bar"></div>
                 </div>
             </li>
         </ul> 
    </div>-->
    <div class="layout_box">
      <div class="top">
        <div class="top_left">
          <div class="top_left_left">
            <div class="title">
              一卡通数据分析
            </div>
            <div class="echarts left_ulbox">
              <ul class="tops_box">
                <li>
                    <div class="names">本月一卡通充值金额</div>
                    <div class="price nums_box">
                      {{ thismonthreCharge }}<span>&nbsp;&nbsp;元</span>
                    </div>
                </li>
                <li>
                    <div class="names">同比/环比</div>
                    <div class="nums_box">
                      {{ thismonthChargeSame }}<span>&nbsp;&nbsp;%&nbsp;/&nbsp;</span>{{ thismonthChargeDis }}<span>&nbsp;&nbsp;%</span>
                    </div>
                </li>
                <li>
                    <div class="names">本月一卡通消费金额</div>
                    <div class="price nums_box">
                      {{ thismonthIncome }}<span>&nbsp;&nbsp;元</span>
                    </div>
                </li>
                <li>
                    <div class="names">同比/环比</div>
                    <div class="nums_box">
                      {{ thismonthSame }}<span>&nbsp;&nbsp;%&nbsp;/&nbsp;</span>{{ thismonthDis }}<span>&nbsp;&nbsp;%</span>
                    </div>
                </li>
              </ul>
              <ul class="bottom_ulbox">
                <li>
                    <div class="names">本周一卡通充值金额</div>
                    <div class="price nums_box">
                      {{ thisweekChargeIncome }}<span>&nbsp;&nbsp;元</span>
                    </div>
                </li>
                <li>
                    <div class="names">同比/环比</div>
                    <div class="nums_box">
                      {{ thisweekChargeSame }}<span>&nbsp;&nbsp;%&nbsp;/&nbsp;</span>{{ thisweekChargeDis }}<span>&nbsp;&nbsp;%</span>
                    </div>
                </li>
                <li>
                    <div class="names">本周一卡通消费金额</div>
                    <div class="price nums_box">
                      {{ thisweekIncome }}<span>&nbsp;&nbsp;元</span>
                    </div>
                </li>
                <li>
                    <div class="names">同比/环比</div>
                    <div class="nums_box">
                      {{ thisweekSame }}<span>&nbsp;&nbsp;%&nbsp;/&nbsp;</span>{{ thisweekDis }}<span>&nbsp;&nbsp;%</span>
                    </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="top_left_right echarts"></div>
        </div>
          <div class="top_right">
            <div class="ring_title">一卡通(手环/腕带)总数量 &nbsp;&nbsp;<span class="sum_num" >{{ totalNum }}</span>&nbsp;&nbsp;个  </div>
            <div class="echarts echarts_box" id='echartsbox' style="height:100%; margin-top:-15px;"></div>
          </div>
      </div>
      <div class="bottom">
        <div class="bottom_left">
          <div class="title">本月一卡通各业态消费额占比</div>
            <div class="echarts echarts_box " id="echartslinecolumn" style="height:100%;margin-top:-15px;" ></div>
        </div>
        <div class="bottom_right">
          <div class="title"> 本年每月一卡通消费趋势</div>
          <div class="echarts echarts_box" id="moreline" style="height:100%;margin-top:-15px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import echarts from 'echarts'
import { get } from '@/api/axios'
export default {
 /* eslint-disable */
  name: 'onecard',
  data() {
    return {
      //tab按钮
      // tab: ["标题一","标题二","标题三"],
      // default_bar: 0,
      thismonthreCharge: '', // 本月充值金额
      thismonthChargeSame: '', // 本月充值同比
      thismonthChargeDis: '', // 本月充值环比
      thismonthIncome: '', // 本月消费金额
      thismonthSame: '', // 本月消费同比
      thismonthDis: '' , //, 本月消费环比
      thisweekChargeIncome: '', // 本周充值金额
      thisweekChargeSame: '' , // 本周充值金额同比
      thisweekChargeDis: '' , // 本周充值金额环比
      thisweekIncome: '' , // 本周消费
      thisweekSame: '', // 同
      thisweekDis : '', // 环
      totalNum: '',// 总数
      usedTotalNum: '',// 已使用
      restTotalNum: '',// 未使用
      ehcart1: null,
      ehcart2: null,
      ehcart3: null
    }
  },
  mounted() {
    // this.TabClick(0)
    var that = this
    this.$nextTick(() => {
      get('income/findIPassIncome').then(data => {
        if (data.msg === "SUCCESS") {
          var sourceMap = data.data.sourceMap
          var data = data.data.list
          var ring_series = [] // 一卡通腕带环状图
          var left_lend = [], left_series = [] //消费额占比
          var right_legend = [] , right_series = [], 
          data_9 = [0,0,0,0,0,0,0,0,0,0,0,0], data_10 = [0,0,0,0,0,0,0,0,0,0,0,0], data_11 = [0,0,0,0,0,0,0,0,0,0,0,0], data_12 = [0,0,0,0,0,0,0,0,0,0,0,0]// 消费趋势list_data--为循环添加的data数组
          for (var i = 0 ; i < data.length; i++) {
            if (data[i].dateYear == 8) {
              that.thismonthreCharge = data[i].thismonthreCharge ? data[i].thismonthreCharge : 0
              that.thismonthChargeSame = data[i].thismonthChargeSame ? data[i].thismonthChargeSame : 0
              that.thismonthChargeDis = data[i].thismonthChargeDis ? data[i].thismonthChargeDis : 0
              that.thismonthIncome = data[i].thismonthIncome ? data[i].thismonthIncome : 0
              that.thismonthSame = data[i].thismonthSame ? data[i].thismonthSame : 0
              that.thismonthDis = data[i].thismonthDis ? data[i].thismonthDis : 0

              that.thisweekChargeIncome = data[i].thisweekChargeIncome ? data[i].thisweekChargeIncome : 0
              that.thisweekChargeSame = data[i].thisweekChargeSame ? data[i].thisweekChargeSame : 0
              that.thisweekChargeDis = data[i].thisweekChargeDis ? data[i].thisweekChargeDis : 0
              that.thisweekIncome = data[i].thisweekIncome ? data[i].thisweekIncome : 0
              that.thisweekSame = data[i].thisweekSame ? data[i].thisweekSame : 0
              that.thisweekDis = data[i].thisweekDis ? data[i].thisweekDis : 0
              // 总数 totalNum
              // 已使用 usedTotalNum
              // 剩余 restTotalNum
              that.totalNum = data[i].totalNum
              ring_series =[
                {'value':data[i].usedTotalNum, 'name':'已使用数量'},
                {'value':data[i].restTotalNum, 'name':'未使用数量'}]
            } else if (data[i].dateYear == 1) {
              left_lend.push(data[i].sourceName)
              left_series.push({'value': data[i].imcomeValue, 'name': data[i].sourceName})
            } 
            else if (data[i].dateYear == 0 && data[i].sourceId == 9) {
              if (data[i].dateName) {
                data_9[parseInt(data[i].dateName) -1] = data[i].imcomeValue
              }
            } else if (data[i].dateYear == 0 && data[i].sourceId == 10) {
              if (data[i].dateName) {
                data_10[parseInt(data[i].dateName) -1] = (data[i].imcomeValue)
              }
            } else if (data[i].dateYear == 0 && data[i].sourceId == 11) {
              if (data[i].dateName) {
                data_11[parseInt(data[i].dateName) - 1] = (data[i].imcomeValue)
              }
            } else if (data[i].dateYear == 0 && data[i].sourceId == 12) {
              if (data[i].dateName) {
                data_12[parseInt(data[i].dateName) -1] = (data[i].imcomeValue)
              }
            }
          }
          var data_type = [data_9 , data_10 , data_11, data_12]

          for (var x = 0 ; x < sourceMap.length ; x++) {
            right_legend.push( {'name':sourceMap[x].sourceName,'icon':'circle'})
            right_series.push({'name':sourceMap[x].sourceName,'type':'line','data':data_type[x]})
          }
          that.EchartsRing(ring_series)
          left_lend = left_lend.reverse()
          that.EchartsRing_bottom_left(left_lend, left_series)
          that.MoreLine(right_legend, right_series)
        }
      })
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    // TabClick(index){
    // this.default_bar = index
    // },
    EchartsRing(ring_series){
      var that = this
      that.ehcart1 = echarts.init(document.getElementById('echartsbox'));
      // color: ['#89A2FF','#A2BCFF','#FF9F9C','#FFDC79'],//扇形区域以及列表颜色
      var option = {
        title: {
          show:ring_series.length < 1,
          textStyle: {
            color: '#909399',
            fontWeight: 'normal',
            fontSize: 14
          },
          text: '暂无数据',
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
            hoverAnimation: true,
            formatter:
            function(params){
              var result =''
              // result =params.seriesName+''+"</br>"
              result += params.seriesName +"</br>"+params.marker + " " + params.data.name + " : " + params.data.value+'('+params.percent+'%'+')' +"</br>"
              return result
            }
        },
        legend: {
          orient: 'vertical',
          icon: "circle",
          x: '75%',
          y:'center',
          data:['已使用数量','未使用数量']
        },
        color: ['#89A2FF', '#FF9F9C'], // 扇形区域以及列表颜色
        series: [
          {
            name:'一卡通',
            type:'pie',
            legendHoverLink:true,
            // radius: ['38%', '68%'],
            // center:["50%",'60%'],
            center: ['40%', '55%'],
            radius: ['30%', '50%'],
            minAngle: 5, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效
            labelLine: { // 设置延长线的长度
              normal: {
                show:true,
                length: 15, // 设置延长线的长度
                // length2: 10,//设置第二段延长线的长度
               }
            },
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  var result =''
                  // result =params.seriesName+''+"</br>"
                  result +=  params.data.value+'('+params.percent+'%'+')'
                  return result
                }
              },
              emphasis:{
                show:true,
                textStyle:{
                  // fontSize:'16',
                  // fontWeight:'bold'
                }
              }
            },
            data:ring_series
          }
        ]
      }
      that.ehcart1.setOption(option)
      window.addEventListener('resize', that.resizeHandler)
    },
    EchartsRing_bottom_left(data_legend, data_series){
      // var data_legend = ['餐饮','零食','酒店','其他']
      // var data_series = [
      //   {value:335, name:'餐饮'},
      //   {value:310, name:'零食'},
      //   {value:234, name:'酒店'},
      //   {value:135, name:'其他'}
      // ]
      var that = this
      that.ehcart2 = echarts.init(document.getElementById('echartslinecolumn'))
      var option = {
        title: {
          show:data_legend.length < 1 && data_series.length < 1,
          textStyle: {
            color: '#909399',
            fontWeight: 'normal',
            fontSize: 14
          },
          text: '暂无数据',
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'item',
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
          hoverAnimation: true,
          formatter: function(params) {
            var result =''
            //  result =params.seriesName+''+"</br>" ;
            result += params.seriesName +"</br>"+params.marker + " " + params.data.name + " : " + params.data.value+'('+params.percent+'%'+')' +"</br>"
            return result
          }
        },
        legend: {
          orient: 'vertical',
          icon: "circle",
          x: '80%',
          y:'center',
          data:data_legend
        },
        color: ['#FFDC79','#FF9F9C','#A2BCFF','#89A2FF'],//扇形区域以及列表颜色
        series: [
          {
            name:'消费来源',
            type:'pie',
            center: ['40%', '55%'],
            radius: ['30%', '50%'],
            minAngle: 5, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效
            labelLine: { // 设置延长线的长度
              normal: {
                show:true,
                length: 15, // 设置延长线的长度
                // length2: 10,//设置第二段延长线的长度
                }
            },
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  var result =''
                  //  result =params.seriesName+''+"</br>"
                  result += params.data.value+'('+params.percent+'%'+')'
                  return result
                }
              },
              emphasis:{
                show:true,
                textStyle:{
                  // fontSize:'16',
                  // fontWeight:'bold'
                }
              }
            },
            data:data_series
          }
        ]
      }
      that.ehcart2.setOption(option)
      window.addEventListener('resize', that.resizeHandler)
    },
    MoreLine(right_legend, right_series){
      var that = this
      var rightx = ['1','2','3','4','5','6','7','8','9','10','11','12']
      // var right_legend = [
      //       {name:'餐饮',icon:'circle'},
      //       {name:'零食',icon:'circle'},
      //       {name:'酒店',icon:'circle'},
      //       {name:'其他',icon:'circle'}
      //     ]
      // var right_series = [
      //     {
      //       name:'餐饮',
      //       type:'line',
      //       data:data_9
      //     },
      //     {
      //       name:'零食',
      //       type:'line',
      //       // yAxisIndex: 1,
      //       data:data_10
      //     },
      //     {
      //       name:'酒店',
      //       type:'line',
      //       // yAxisIndex: 1,
      //       data:data_11
      //     },
      //     {
      //       name:'其他',
      //       type:'line',
      //       // yAxisIndex: 1,
      //       data:data_12
      //     }
      //   ]
      var option = {
        title: {
          show:right_legend.length < 1 && right_series.length < 1,
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
          formatter: function(params) {
            var result =''
            result =params[0].name+'月各店消费额'+"</br>"
            params.forEach(function(item){
              result+= item.marker + " " + item.seriesName + " : " + item.value +"</br>"
            })
            return result;
          }
          // "{b}月会员积分情况 <br/>{a} :{c}<br/>{a1}: {c1}"
          // a ---legend第一个 名字  a1---第二个名字
          // b --- 第一个表x轴
          // b1 --- 第二标x轴
          // c  ---第一个y轴值
          // c1 ---第二个y轴值
        },
        legend: { // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          data:right_legend
        },
        color: ['#89A2FF','#A2BCFF','#FF9F9C','#FFDC79'],//扇形区域以及列表颜色
        xAxis: [{
          type: 'category',
          name: '日期(月)',
          splitLine:{
            show:false
          },
          data: rightx,
          // axisPointer: {
          // type: 'shadow'//轴线是线还是柱形   'line' 直线指示器 'shadow' 阴影指示器'none' 无指示器
          // }, 
          axisTick: {
            alignWithLabel: true,
            show:false
          }
        }],
        yAxis: [{
          type: 'value',
          name: '积分(分)',
          splitLine:{
            show:false
          },
          axisTick:{
            show:false
          },
          axisLabel: {
            formatter: '{value}'
          },
        }],
        series: right_series
      }
      that.ehcart3 = echarts.init(document.getElementById('moreline'));
      option.grid.left = this.getYWidth(Math.max.apply(null, option.series[0].data), Math.max.apply(null, option.series[0].data))
      that.ehcart3.setOption(option)
      window.addEventListener('resize', that.resizeHandler)
    },
    resizeHandler() {
      if (this.ehcart1) {
        this.ehcart1.resize()
      }
      if (this.ehcart2) {
        this.ehcart2.resize()
      }
      if (this.ehcart3) {
        this.ehcart3.resize()
      }
    },
    getYWidth(data1, data2) { // 根据数值长度计算显示宽度
      return ((data1 > data2 ? data1.toString().length : data2.toString().length) * 12).toString()
    }
  }
}
</script>

<style scoped lang="scss">
/* eslint-disable */

$width_left:60%;// top_left 宽度
$width_right:40%;// top_right 宽度
.integral-wrapper{
  padding: 0;
  margin:0px;
  height: 100%;
  width:100%;
  background-color: #F2F5FF;
}
.tab_title{
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
.tab_title .tab_box li{  
  display:inline-block;
  font-size:16px;
  margin-left:15px;
}
.tab_title .tab_box li:hover{
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
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    padding:0;
}
.layout_box .bottom{
    margin-top:15px;
    height:50%;
    display:flex;
    flex-direction: row;
    justify-content:flex-start;
    padding:0;
}
.layout_box .top>div ,.layout_box .bottom>div{
    width:50%;
    height:100%;
    background:#fff;
}
/* 第一框css重写 */
.layout_box .top .top_left {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    width:$width_left;
    height: 100%;
}
.layout_box .top .top_right {
    width:$width_right;
}
.layout_box .top .top_left .top_left_left{
    width:100%;
    height: 100%;
}
/* top_left下 四个框内边距 */
.layout_box .top .top_left{
    padding:15px 30px 0px 30px;
}
/* 除去第一个框，其他三个框的高度为100% */
.layout_box .top .top_right,
.layout_box .bottom .bottom_left , .layout_box .bottom .bottom_right{
    padding:15px 30px 0px 30px;
    height:100%;
}
/* 第四个大框marin调整 */
.layout_box .bottom .bottom_right{
  margin-left:15px;
}
.left_ulbox {
  width: 100%;
  height: calc(100% - 29px)!important;
  margin-top: 30px;
}
.left_ulbox ul{
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 70px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.left_ulbox ul li {
  width: 160px;
  max-width: 160px;
  min-width: 160px;
  height: 70px;
  font-size:14px;
  margin-right: 30px;
  font-family:PingFang SC;
  font-weight:500;
  border-radius: 5px;
  color:rgba(255,255,255,1);
  background:linear-gradient(94deg,rgba(174,197,255,1) 0%,rgba(139,171,253,1) 100%);
  box-shadow:0px 0px 10px 0px rgba(204,204,204,0.2);
  padding: 10px 5px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.left_ulbox ul li .names{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
.left_ulbox ul li .nums_box{
  width: 100%;
  font-size:14px;
  font-family:DIN Condensed;
  font-weight:bold;
  color:rgba(255,255,255,1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.left_ulbox ul li .nums_box span{
  display: inline-block;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.bottom_ulbox {
  margin-top: 30px !important;
}
.bottom_ulbox li{
  background:linear-gradient(90deg,rgba(163,164,255,1) 0%,rgba(140,144,255,1) 100%) !important;
  box-shadow:0px 0px 10px 0px rgba(204,204,204,0.2);
}
/* title */
.layout_box .top .title ,.layout_box .bottom .title{
    padding:0;
    margin: 0;
    font-size: 0.8rem;
    /* text-indent: 10px; */
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(29, 33, 51, 1);
}
.ring_title{
    position:absolute;
    height:32px;
    font-size: 0.8rem;
    /* text-indent: 10px; */
    font-family: PingFang SC;
    font-weight: 500;
    color: #1d2133;
    top:10px;
}

.ring_title .sum_num{
    height:100%;
    font-size:36px;
    color:#85A0FF;
    display:inline-block;
}
.top_left, .top_right, .bottom_left, .bottom_right{
  border-radius: 5px;
}
.top_left{
  overflow: hidden;
}
</style>

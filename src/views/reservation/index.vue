<!-- eslint-disable -->
<template>
  <div class="integral-wrapper">
    <div class="tab_title click_change">
      <ul class="tab_box">
        <li  v-for="(title,index) in tab"
        @click="TabClick(index)"
        :class="{active:index == default_bar}" :key='index'>
          <div class="box_name">
            <div class="title_name">{{title}}</div>
            <div class="show_bar"></div>
          </div>
        </li>
      </ul> 
    </div>
    <div class="layout_box">
      <div class="top">
        <div class="top_left">
          <div class="top_left_left">
            <div class="title">{{ titles }}预订数据分析</div>
              <div class="echarts left_ulbox">
                <ul class="tops_box">
                  <li>
                      <div class="names">下周{{ titles }}预定金额</div>
                      <div class="price nums_box">
                        {{ nextweekIncome }}<span>&nbsp;&nbsp;元</span>
                      </div>
                  </li>
                  <li>
                      <div class="names">同比</div>
                      <div class="nums_box">
                        {{ nextweekSame }}<span>&nbsp;&nbsp;%</span>
                      </div>
                  </li>
                  <li>
                      <div class="names">环比</div>
                      <div class="nums_box">
                        {{ nextweekDis }}<span>&nbsp;&nbsp;%</span>
                      </div>
                  </li>
                </ul>
                <ul class="bottom_ulbox">
                  <li>
                      <div class="names">未来一个月{{ titles }}预订金额</div>
                      <div class="price nums_box">
                        {{ nextmonthIncome }}<span>&nbsp;&nbsp;元</span>
                      </div>
                  </li>
                  <li>
                      <div class="names">同比</div>
                      <div class="nums_box">
                        {{ nextmonthSame }}<span>&nbsp;&nbsp;%</span>
                      </div>
                  </li>
                  <li>
                      <div class="names">环比</div>
                      <div class="nums_box">
                        {{ nextmonthDis }}<span>&nbsp;&nbsp;%</span>
                      </div>
                  </li>
                </ul>
              </div>
          </div>
          <div class="top_left_right echarts"></div>
        </div>
        <div class="top_right">
          <div class="title">下周{{titles}}各渠道预定金额占比</div>
          <div class="echarts echarts_box" id='echartsbox' style="width:100%;height:100%; margin-top:-15px;"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_left">
          <div class="title">未来一个月{{titles}}预订趋势</div>
          <div class="echarts echarts_box " id="futuretend" style="width:100%;height:100%;margin-top:-15px;"></div>
        </div>
        <div class="bottom_right">
          <div class="title" v-if="this.titles === '门票'">未来一个月{{titles}}各渠道预定金额占比</div>
          <div class="title" v-if="this.titles === '酒店'">本月酒店入住率统计</div>
          <div class="echarts echarts_box" id="futuremoney" style="width:100%;height:100%;margin-top:-15px;"> </div>
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
  name: 'reservation',
  data() {
    return {
    //tab按钮
      tab: ["门票","酒店"],
      titles:'门票',
      default_bar: 0,//默认第一个tab 
      nextmonthIncome: '', // 下月金额
      nextmonthSame: '', // 同比
      nextmonthDis: '', // 环比
      nextweekIncome: '', // 下周金额
      nextweekSame: '', // 同比
      nextweekDis: '', // 环比
      data_hotel: null,
      data_tickets: null,
      days: [],
      nowdays: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      right1: [],
      right2: [],
      right3: [],
      right4: [],
    }
  },
  mounted() {
    // 下个月
    var day = this.getNowFormatDate()
    var days = [],
    nowdays = [],
    data1 = [],
    data2= [],
    data3 =[],
    data4 = []
    for (var i =1; i<= day;i++) {
      days.push(i)
      data1.push(0)
      data2.push(0)
      data3.push(0)
      data4.push(0)
    }
    this.days = days
    this.data1 = data1
    this.data2 = data2
    this.data3 = data3
    this.data4 = data4
    // 这个月
    var nowday = this.GetDate()
    var nowdays = []
    var right1 = [],
    right2 = [],
    right3 = [],
    right4 = []
    for (var i = 1; i<= nowday;i++) {
      nowdays.push(i)
      right1.push(0)
      right2.push(0)
      right3.push(0)
      right4.push(0)
    }
    this.nowdays = nowdays
    this.right1 = right1
    this.right2 = right2
    this.right3 = right3
    this.right4 = right4
    this.TabClick(0)
  },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.resizeHandler)
  // },
  methods: {
    TabClick(index){
      this.default_bar = index
      var that = this
      if(index === 0){
        // 门票
        this.titles="门票"
        that.ticks()
      }else if(index === 1){
        // 酒店
        this.titles = "酒店"
        that.hotes()
      }
    },
    ticks() { // 门票
      var that = this
      this.$nextTick(() => {
        get('income/findTicketList').then(data => {
          if (data.msg === "SUCCESS") {
            this.data_tickets = data.data
            // 初始化各图数据
            var sourceMap = this.data_tickets.sourceMap
            var legend = [], series_line = [],
            series1 = [], series2 = []
            for (var i = 0 ; i< sourceMap.length; i++) {
              legend.push(sourceMap[i].sourceName);
              series1.push({'value': 0, 'name':sourceMap[i].sourceName});
              series2.push({'value': 0, 'name':sourceMap[i].sourceName});
              series_line.push( {'name': sourceMap[i].sourceName,'type':'line','data':sourceMap[i].sourceName})
            }
            var data = this.data_tickets.list
            // 右上角环状图
            var top_right_series = series1, top_right_legend = legend
            // 左下角折线图
            var left_series = series_line,
            left_legend = legend,
            left_datax = that.days
            left_legend = legend
            var data_sum = [], data_1 = that.data1, data_2 = that.data2, data_3 = that.data3, data_4 =that.data4
            // 右下角环状图
            var right_series = series2, right_legend = legend
            for (var i = 0 ; i < data.length; i++) {
              if (data[i]) {
                if (data[i].dateYear == 8) {
                  that.nextmonthIncome = data[i].nextmonthIncome ? data[i].nextmonthIncome : 0
                  that.nextmonthSame = data[i].nextmonthSame ? data[i].nextmonthSame : 0
                  that.nextmonthDis = data[i].nextmonthDis ? data[i].nextmonthDis : 0
                  that.nextweekIncome = data[i].nextweekIncome ? data[i].nextweekIncome : 0
                  that.nextweekSame = data[i].nextweekSame ? data[i].nextweekSame : 0
                  that.nextweekDis = data[i].nextweekDis ? data[i].nextweekDis : 0
                } else if (data[i].dateYear == 10) { // 未来一个月预定金额占比
                  //top_right_legend.push(data[i].sourceName)
                  for (var a = 0; a< right_series.length; a++) {
                    if (right_series[a].name === data[i].sourceName) {
                      right_series[a].value = data[i].price
                    }
                  }
                } else if (data[i].dateYear == 9 && data[i].sourceId == 1) {
                  // left_datax.push(data[i].date.split(' ')[0].split('-')[2])
                  for (var a = 0; a< that.days.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) === parseInt(that.days[a])) {
                      data_1[a] = data[i].price
                    }
                  }
                } else if (data[i].dateYear == 9 && data[i].sourceId == 2) {
                  for (var a = 0; a< that.days.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) === parseInt(that.days[a])) {
                      data_2[a] = data[i].price
                    }
                  }
                } else if (data[i].dateYear == 9 && data[i].sourceId == 3) {
                  for (var a = 0; a< that.days.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) === parseInt(that.days[a])) {
                      data_3[a] = data[i].price
                    }
                  }
                } else if (data[i].dateYear == 9 && data[i].sourceId == 4) {
                  for (var a = 0; a< that.days.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) === parseInt(that.days[a])) {
                      data_4[a] = data[i].price
                    }
                  }
                }else if (data[i].dateYear == 11) { // 下周预定金额
                  for (var a = 0; a< top_right_series.length; a++) {
                    if (top_right_series[a].name === data[i].sourceName) {
                      top_right_series[a].value = data[i].price
                    }
                  }
                }
              }
            }
            data_sum = [data_1, data_2, data_3, data_4] // 左下折线图 datax
            for (var i = 0; i< left_series.length; i++) {
              left_series[i].data = data_sum[i]
            }
            that.EchartsRing(top_right_legend, top_right_series,'echartsbox')
            that.FutureLine_trend(left_legend, left_series, left_datax,'futuretend', '金额',{star: '', end:'日门票预定金额:'})
            that.EchartsRing(right_legend, right_series,'futuremoney')
          }
        })
      })
    },
    hotes() { // 酒店
      var that = this
      this.$nextTick(() => {
        get('income/findHotelList').then(data => {
          if (data.msg === "SUCCESS") {
            that.data_hotel = data.data
            var sourceMap = that.data_hotel.hotelMap
            // console.log('输出')
            // console.log(sourceMap)
            // 初始化各图数据
            var legend = [], series = [], seriesL = [],seriesR = []
            for (let a = 0; a < sourceMap.length; a++) {
              legend.push(sourceMap[a].hotelName)
              series.push({'value': 0, 'name':sourceMap[a].hotelName})
              seriesL.push({'name': sourceMap[a].hotelName, 'type':'line', 'data': null})
              seriesR.push({'name': sourceMap[a].hotelName, 'type':'line', 'data': null})
            }
            var data = this.data_hotel.list
            // 下周酒店金额占比-环状图
            var top_right_series = series,
            top_right_legend = legend
            // 未来一个月酒店预订-- 多折线图
            var data_left = [],
            left_1 = that.data1,
            left_2 = that.data2,
            left_3 = that.data3,
            left_4 = that.data4,
            // var left_series = leftall,
            left_legend = legend,
            left_datax = that.days
            // 本月酒店入住-- 多折线图
            var data_right = [],
            right_1 = that.right1,
            right_2 = that.right2,
            right_3 = that.right3,
            right_4 = that.right4,
            //var right_series = seriesdata,
            right_legend = legend,
            right_datax = that.nowdays
            for (var i = 0 ; i < data.length; i++) {
              if (data[i].dateYear === 8) {
                that.nextmonthIncome = data[i].nextmonthIncome ? data[i].nextmonthIncome : 0
                that.nextmonthSame = data[i].nextmonthSame ? data[i].nextmonthSame : 0
                that.nextmonthDis = data[i].nextmonthDis ? data[i].nextmonthDis : 0
                that.nextweekIncome = data[i].nextweekIncome ? data[i].nextweekIncome : 0
                that.nextweekSame = data[i].nextweekSame ? data[i].nextweekSame : 0
                that.nextweekDis = data[i].nextweekDis ? data[i].nextweekDis : 0
              } else if (data[i].dateYear === 11) {
                for (var p = 0; p< top_right_series.length; p++) {
                  if (top_right_series[p].name == data[i].hotelName) {
                    top_right_series[p].value = data[i].price
                  }
                }
                //top_right_series.push({'value':data[i].price, 'name':data[i].hotelName})
              } else if (data[i].dateYear === 9) {
                //left_datax.push(data[i].date.split(' ')[0].split('-')[2])
                if (data[i].sourceId === 1) {
                  for (var a = 0; a< that.days.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) == parseInt(that.days[a])) {
                      left_1[a] = data[i].price
                    }
                  }
                } else if (data[i].sourceId === 2) {
                  for (var a = 0; a< that.days.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) == parseInt(that.days[a])) {
                      left_2[a] = data[i].price
                    }
                  }
                } else if (data[i].sourceId === 3) {
                  for (var a = 0; a< that.days.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) == parseInt(that.days[a])) {
                      left_3[a] = data[i].price
                    }
                  }
                } else if ( data[i].sourceId === 4) {
                  for (var a = 0; a< that.days.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) == parseInt(that.days[a])) {
                      left_4[a] = data[i].price
                    }
                  }
                }
                //left_1.push(data[i].price)
              } else if (data[i].dateYear === 1 ) {
                if (data[i].hotelId === 1) {
                  for (var a = 0; a< that.nowdays.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) == parseInt(that.days[a])) {
                      right_1[a] = data[i].price
                    }
                  }
                } else if (data[i].hotelId === 2) {
                  for (var a = 0; a< that.nowdays.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) == parseInt(that.days[a])) {
                      right_2[a] = data[i].price
                    }
                  }
                } else if (data[i].hotelId === 3) {
                  for (var a = 0; a< that.nowdays.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) == parseInt(that.days[a])) {
                      right_3[a] = data[i].price
                    }
                  }
                } else if (data[i].hotelId === 4) {
                  for (var a = 0; a< that.nowdays.length; a++) {
                    if (parseInt(data[i].date.split(' ')[0].split('-')[2]) == parseInt(that.days[a])) {
                      right_4[a] = data[i].price
                    }
                  }
                }
                //right_datax.push(data[i].date.split(' ')[0].split('-')[2])
              }
            }
            // 左下折线图 datax
            data_left = [left_1, left_2, left_3, left_4]
            // 右下折线图 datax
            data_right = [right_1, right_2, right_3, right_4]
            let left_se = seriesL
            let right_se = seriesR
            for (let i = 0; i< legend.length; i++) {
              left_se[i].data = data_left[i]
              right_se[i].data = data_right[i]
            }
            // left_se = [
            //   {'name': '酒店1', 'type':'line', 'data': left_1},
            //   {'name': '酒店2', 'type':'line', 'data': left_2},
            //   {'name': '酒店3', 'type':'line', 'data': left_3},
            //   {'name': '酒店4', 'type':'line', 'data': left_4},
            // ]
            // right_se = [
            //   {'name': '酒店1', 'type':'line', data: right_1},
            //   {'name': '酒店2', 'type':'line', data: right_2},
            //   {'name': '酒店3', 'type':'line', data: right_3},
            //   {'name': '酒店4', 'type':'line', data: right_4},
            // ]
            that.EchartsRing(top_right_legend, top_right_series,'echartsbox')
            //that.FutureLine_trend(left_legend, left_series, left_datax,'futuretend', '金额', {star: '', end:'日酒店预订:'})
            that.FutureLine_trend(left_legend, left_se, left_datax, 'futuretend', '金额',{star: '', end:'日酒店预订:'})
            that.FutureLine_trend(right_legend, right_se, right_datax, 'futuremoney', '百分比',{star: '', end:'日酒店入住率:'})
          }
        })
      })
    },
    EchartsRing(legend, series , id){
      var that = this
      var echart1 = echarts.init(document.getElementById(id));
      var option = {
        title: {
          show: series.length < 1 && legend.length < 1,
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
          formatter:
          function(params){
            var result =''
            //  result =params.seriesName+''+"</br>"
             result += params.seriesName +"</br>"+params.marker + " " + params.data.name + " : " + params.data.value+'('+params.percent+'%'+')' +"</br>";
              return result
          }
        },
        legend: {
          orient: 'vertical',
          icon: "circle",
          x: '80%',
          y:'center',
          data:legend
        },
        color: ['#89A2FF','#A2BCFF','#FF9F9C','#FFDC79'],//扇形区域以及列表颜色
        series: [
          {
            name:'预订金额占比',
            type:'pie',
            center: ['40%', '55%'],
            radius: ['30%', '50%'],
            //minAngle: 5, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
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
                formatter: 
                function(params){
                  var result =''
                  //  result =params.seriesName+''+"</br>"
                  result +=  params.data.value+'('+params.percent+'%'+')'
                  return result
                }
              },
              emphasis:{
                show:true,
                textStyle:{
                  // fontSize:'16',
                }
              }
            },
            data:series
          }
        ]
      }
      echart1.clear()
      echart1.setOption(option)
      window.addEventListener('resize', e => {
        if (echart1) {
          echart1.resize()
        }
      })
    },
    FutureLine_trend(lengend, series, datax, id, name, showbox){
      var data_color = ['#89A2FF','#A2BCFF','#FF9F9C','#FFDC79'] // 扇形区域以及列表颜色
      var that = this
      var option = {
        title: {
          show: series.length < 1 && lengend.length < 1,
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
          formatter:
          function(params){
            var result =''
            result = showbox.star + params[0].name+ showbox.end +"</br>"
            params.forEach(function(item){
              result+= item.marker + " " + item.seriesName + " : " + item.value +"</br>"
            })
            return result
          }
        },
        legend:{
          left: 100,
          top: 30,
          data: lengend
        }, // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        color:data_color,//扇形区域以及列表颜色
        xAxis: [{
          type: 'category',
          name: '日期(日)',
          splitLine:{
            show:false
          },
          data: datax,
          axisPointer: {
            type: 'line'//轴线是线还是柱形   'line' 直线指示器 'shadow' 阴影指示器'none' 无指示器
          }, 
          axisTick: {//是否显示刻度
            alignWithLabel: true,
            show:false
          }
        }],
        yAxis: [
          {
            type: 'value',
            name: name,
            splitLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel: {
              formatter: '{value}'
            },
          }
        ],
        series: series
      }
      var that = this
      var echart2 = echarts.init(document.getElementById(id))
      echart2.clear()
      option.grid.left= this.getYWidth(Math.max.apply(null, option.series[0].data), Math.max.apply(null, option.series[0].data))
      echart2.setOption(option)
      window.addEventListener('resize', function() {
        if (echart2) {
          echart2.resize()
        }
      })
    },
    // 获取下个月多少天
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        //return currentdate;
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        var arr = currentdate.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中的月的天数
            var nextDays = days
       return nextDays;
    },
    //获取当前月的天数
    GetDate(){
     var date = new Date();
     var year = date.getFullYear();
     var month = date.getMonth()+1;
     var d = new Date(year, month, 0);
     return d.getDate();
    },
    getYWidth(data1, data2) { // 根据数值长度计算显示宽度
      return ((data1 > data2 ? data1.toString().length : data2.toString().length) * 12).toString()
    }
  }
}
</script>

<style scoped lang="scss">
/* eslint-disable */

$width_left:50%;// top_left 宽度
$width_right:50%;// top_right 宽度
$font_num:30px;//top_left 下面变大字体的大小
$font-change_before:24px;
// --width-primary

.integral-wrapper{
  padding: 0;
  margin:0px;
  height: 100%;
  width:100%;
  background-color: #F2F5FF;
}
.tab_title{
    height:55px;
    width:100%;
    background:rgba(255,255,255,1);
    position:relative;
    position:fixed;
    
}
/* tab按钮 */
.tab_title .tab_box {
    position:absolute;
    bottom:0px;
     list-style:none;
     padding:0px;
     margin:0px;
     align-items: center;
     height:36px;
}
.tab_title .tab_box li{  
  display:inline-block;
  font-size:16px;
  height:100%;
  margin-left:15px;
  color:#1D2133;
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
    margin-top: 5px;
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
    padding:70px 15px 15px 15px;
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
    width: calc((100% - 15px)/2);
}
.layout_box .top .top_right {
    width: calc((100% - 15px)/2);
}
.layout_box .top .top_left .top_left_left{
    width:100%;
}
/* top_left下 四个框内边距 */
.layout_box .top .top_left{
    padding:15px 30px 10px 30px;
}
/* 除去第一个框，其他三个框的高度为100% */
.layout_box .top .top_right,
.layout_box .bottom .bottom_left , .layout_box .bottom .bottom_right{
    padding:15px 30px 0px 30px;
    height:100%;
}
/* 第2 4个大框marin调整 */
.layout_box .top .top_right,
.layout_box .bottom .bottom_right{
    margin-left:15px;
}

.top_left_left .echarts{
  height:100%;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
.left_ulbox ul .names{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.left_ulbox ul li {
  // width: calc((100% - 45px)/3);
  // height: 100%;
  // max-width: 180px;
  // max-height: 90px;
  max-width: 160px;
  min-width: 160px;
  width: 160px;
  height:70px;
  margin-right: 30px;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  border-radius: 5px;
  color:rgba(255,255,255,1);
  background:linear-gradient(94deg,rgba(174,197,255,1) 0%,rgba(139,171,253,1) 100%);
  box-shadow:0px 0px 10px 0px rgba(204,204,204,0.2);
  padding: 10px 15px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
.top_left, .top_right, .bottom_left, .bottom_right{
  border-radius: 5px;
}
.top_left{
  overflow: hidden;
}
</style>

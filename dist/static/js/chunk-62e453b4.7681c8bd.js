(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62e453b4"],{"050b":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"parking-container"},[e("el-row",{staticClass:"first-row",attrs:{gutter:15}},[e("el-col",{attrs:{span:12}},[e("div",{staticClass:"parking-template"},[t._v("停车场数据统计\n        "),e("div",{staticStyle:{height:"100%"}},[e("pie-chart",{staticStyle:{"margin-top":"10px",float:"left"},attrs:{id:"parkingchart1","chart-type":"parking","chart-data":t.chartList1,"tip-title":t.chartList1.title,height:"calc(100% - 32px)",width:"50%"}}),t._v(" "),e("pie-chart",{staticStyle:{"margin-top":"10px",float:"left"},attrs:{id:"parkingchart2","chart-type":"parking","chart-data":t.chartList2,"tip-title":t.chartList2.title,height:"calc(100% - 32px)",width:"50%"}})],1)])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("div",{staticClass:"parking-template"},[t._v("今年每月车流统计\n        "),e("line-chart",{staticStyle:{"margin-top":"10px"},attrs:{id:"parkingchart3'","chart-data":t.chartList3,stack:!0,"chart-type":"parking","tip-title":"车流统计",height:"calc(100% - 32px)",width:"100%"}})],1)])],1),t._v(" "),e("el-row",{staticClass:"second-row",attrs:{gutter:15}},[e("el-col",{attrs:{span:12}},[e("div",{staticClass:"parking-template"},[t._v("今年每月停车场营业额统计\n        "),e("car-chart",{ref:"parkingchart4",staticStyle:{"margin-top":"10px"},attrs:{id:"parkingchart4","chart-type":"parking","tip-title":"营业额统计",height:"calc(100% - 32px)",width:"100%"}})],1)]),t._v(" "),e("el-col",{attrs:{span:12}},[e("div",{staticClass:"parking-template"},[t._v("今年车辆来源排行\n        "),e("car-chart",{ref:"parkingchart5",staticStyle:{"margin-top":"10px"},attrs:{id:"parkingchart5","chart-type":"parkingCar",height:"calc(100% - 32px)",width:"100%"}})],1)])],1)],1)},i=[],s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{class:t.className,style:{height:t.height,width:t.width},attrs:{id:t.id}})},n=[],c=(e("7f7f"),e("313e")),l=e.n(c),h=e("f42c"),o={mixins:[h["a"]],props:{className:{type:String,default:"chart"},id:{type:String,default:"chart"},title:{type:String,default:""},width:{type:String,default:"200px"},height:{type:String,default:"200px"},chartType:{type:String,default:""},chartData:{type:Object,default:function(){return{}}},tipTitle:{type:String,default:"占比"}},data:function(){return{chart:null,colorlist:this.$store.state.settings.chartColors}},watch:{chartData:{immediate:!0,handler:function(t){var a=this;this.$nextTick(function(){a.initChart(t)})},deep:!0}},mounted:function(){this.chart=l.a.init(document.getElementById(this.id))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(t){var a=this,e="{c}个 ",r="{a} <br/>{b}: {c} ({d}%)";"parking"===a.chartType&&(r=function(t){return a.tipTitle+'</div><div class="circle" >'+t.marker+t.name+" : "+t.value+"个("+t.percent+"%)</div>"}),a.chart.setOption({title:{text:t.title,subtext:t.subText,x:"center"},tooltip:{trigger:"item",formatter:r},grid:{bottom:20},legend:{type:"scroll",orient:"vertical",right:10,y:"center",data:t.lData,selected:t.lselected},series:[{name:"占比",type:"pie",radius:"45%",center:["45%","50%"],data:t.sData,label:{show:!0,formatter:e},itemStyle:{normal:{color:function(t){return a.colorlist[t.dataIndex%a.colorlist.length]}},emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]})}}},d=o,p=e("2877"),u=Object(p["a"])(d,s,n,!1,null,null,null),f=u.exports,m=e("3ed2"),g=e("0926"),v=e("0d5e"),k={name:"Parking",components:{PieChart:f,CarChart:m["a"],LineChart:g["a"]},data:function(){return{chartList1:{title:"南门停车场",subText:"今日停车场营业额：2306元",lData:["已用","剩余"],lselected:{"已用":245,"剩余":55},sData:[{name:"已用",value:245},{name:"剩余",value:55}]},chartList2:{title:"北门停车场",subText:"今日停车场营业额：1522元",lData:["已用","剩余"],lselected:{"已用":165,"剩余":35},sData:[{name:"已用",value:245},{name:"剩余",value:55}]},chartList3:{ldata:["南门停车场","北门停车场"],sdata:[[1499,1515,1510,1658,1774,1540,1614,1515,1648,1357],[1452,1480,1448,1658,1404,1580,1615,1710,1528,1108]]},chartList4:[],chartList5:[["product","车辆来源"],["四川",0],["广西",0],["云南",0],["广东",0],["湖南",0],["江西",0],["贵州",0],["重庆",0],["山西",0]]}},mounted:function(){this.geng()},methods:{geng:function(){var t=this,a=this;Object(v["b"])("/parkinfo/getParkinfomessage",{cpid:this.$store.state.user.companyId}).then(function(e){a.chartList1.subText="今日停车场营业额："+e.data.parkinfolist[0].turnover+"元",a.chartList2.subText="今日停车场营业额："+e.data.parkinfolist[1].turnover+"元",a.chartList1.sData=[{name:"已用",value:e.data.parkinfolist[0].usedplace},{name:"剩余",value:e.data.parkinfolist[0].freeplace}],a.chartList2.sData=[{name:"已用",value:e.data.parkinfolist[1].usedplace},{name:"剩余",value:e.data.parkinfolist[1].freeplace}];for(var r=[],i=[],s=[["product"],["1月"],["2月"],["3月"],["4月"],["5月"],["6月"],["7月"],["8月"],["9月"],["10月"],["11月"],["12月"]],n=0;n<e.data.maplist.length;n++){i.push(e.data.maplist[n].parkname),r.push([0,0,0,0,0,0,0,0,0,0,0,0]),s[0].push(e.data.maplist[n].parkname);for(var c=1;c<s.length;c++)s[c].push(0);for(var l=0;l<e.data.maplist[n].datalist.length;l++)s[e.data.maplist[n].datalist[l].month][n+1]=e.data.maplist[n].datalist[l].receipts,r[n][e.data.maplist[n].datalist[l].month-1]=e.data.maplist[n].datalist[l].num}t.chartList3.ldata=i,t.chartList3.sdata=r,t.chartList4=s,t.$refs.parkingchart4.chartData=t.chartList4,t.$refs.parkingchart4.initChart(),t.chartList5=[["product","车辆来源"]];for(var h=0;h<e.data.originmap.length;h++)t.chartList5.push([e.data.originmap[h].areaname,e.data.originmap[h].count]);t.$refs.parkingchart5.chartData=t.chartList5,t.$refs.parkingchart5.initChart()})}}},b=k,y=(e("4714"),Object(p["a"])(b,r,i,!1,null,"1fe13667",null));a["default"]=y.exports},"0d5e":function(t,a,e){"use strict";e.d(a,"b",function(){return i}),e.d(a,"c",function(){return s}),e.d(a,"d",function(){return n}),e.d(a,"a",function(){return c});var r=e("b775");function i(t,a){return Object(r["a"])({url:t,method:"get",params:a})}function s(t,a){return Object(r["a"])({url:t,method:"post",data:a})}function n(t,a){return Object(r["a"])({url:t,method:"put",data:a})}function c(t,a){return Object(r["a"])({url:t,method:"delete",data:a})}},"3ed2":function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{class:t.className,style:{height:t.height,width:t.width},attrs:{id:t.id}})},i=[],s=(e("7f7f"),e("313e")),n=e.n(s),c=e("f42c"),l={mixins:[c["a"]],props:{className:{type:String,default:"chart"},id:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"200px"},chartType:{type:String,default:"xs"},barWidth:{type:String,default:"big"},tipTitle:{type:String,default:""}},data:function(){return{chart:null,chartData:[],colorlist:this.$store.state.settings.chartColors}},mounted:function(){this.chart=n.a.init(document.getElementById(this.id))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart&&this.chart.clear();var t=this,a=t.chartData,e="数值",r="",i="",s={},n=45;"jftj"===t.chartType?(i="分",e="积分(分)",r="日期(年)",s={formatter:function(a){var e=a.name+t.tipTitle+'<br /><div class="circle" >'+a.marker+a.seriesName+" : "+a.value[1]+"分</div>";return e}}):"parking"===t.chartType?(i="元",e="营业额(元)",r="日期(月)",s={formatter:function(a){var e=a.name+t.tipTitle+'<br /><div class="circle" >'+a.marker+a.seriesName+" : "+a.value[2]+"元</div>";return e}}):"parkingCar"===t.chartType?(i="辆",e="车辆数量(辆)",r="省(市)",s={formatter:function(t){var a=t.seriesName+'<br /><div class="circle" >'+t.marker+t.name+" : "+t.value[1]+"辆</div>";return a}}):s={formatter:function(t){var a="";switch(t.name){case"行驶时长":case"超速时长":case"停车时长":a="(小时)";break;case"行驶里程":case"超速里程":case"总里程":a="(公里)";break;case"油耗/耗电量":case"百公里油耗/能耗":a="(XL/KWH)/100KM";break;case"最大速度":case"平均速度":case"最小速度":a="(km/h)";break;case"超速次数":case"停车次数":case"加油/充电次数":case"漏油/亏电次数":case"超时停车次数":a="(次)";break;case"趟数":a="(趟)";break;case"加油/充电量":case"总油耗/能耗":a="(L/KWH)";break;case"漏油/亏电量":a="(L/mAH)";break;default:break}var e="车船牌号："+t.seriesName+'<br /><div class="circle" >'+t.marker+t.name+" : "+t.value[t.seriesIndex+1]+a+"</div>";return e}};var c=function(){var e=[];if(a[0].length<=1)return[];var r=a[0].length-1,i=r*a.length;n="big"!==t.barWidth?i>10?18:22:i>10?22:40;for(var s=0,c=0;s<r;s++)c>=t.colorlist.length&&(c=0),e.push({type:"bar",barMaxWidth:n,itemStyle:{normal:{color:t.colorlist[c]}},label:{show:!1}}),c++;return e}();this.chart.setOption({title:{show:c.length<=0,textStyle:{color:"#909399",fontWeight:"normal",fontSize:14},text:"暂无数据",left:"center",top:"center"},legend:{},tooltip:s,grid:{left:"10%",right:"10%",borderWidth:0,top:50,bottom:20,textStyle:{color:"#fff"}},dataset:{source:a},xAxis:[{name:r,type:"category",axisLine:{lineStyle:{color:"#90979c"}},splitLine:{show:!1},axisTick:{show:!1},splitArea:{show:!1},axisLabel:{interval:0}}],yAxis:[{name:e,type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"#90979c"}},axisTick:{show:!1},axisLabel:{interval:0,formatter:"{value}"+i},splitArea:{show:!1}}],series:c},!0),this.chart.resize()}}},h=l,o=e("2877"),d=Object(o["a"])(h,r,i,!1,null,null,null);a["a"]=d.exports},4714:function(t,a,e){"use strict";var r=e("8d4f"),i=e.n(r);i.a},"8d4f":function(t,a,e){}}]);
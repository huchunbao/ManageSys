(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0277a466","chunk-51de5932","chunk-c811f042","chunk-2d0b9474","chunk-2d21b13a","chunk-2d0d39fa","chunk-2d0dd09b"],{"0c61":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"daoyou",on:{click:function(e){t.dl=!t.dl}}},[t._v("\n  导览\n  "),t.dl?a("div",{staticClass:"dl"},[a("div",{on:{click:function(e){return t.tiao("more")}}},[t._v("大数据中心")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("shipin")}}},[t._v("视频监控")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("about")}}},[t._v("应急指挥")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("map2")}}},[t._v("电子地图")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("daping")}}},[t._v("指挥中心")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("xinxi")}}},[t._v("信息发布")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("paodao")}}},[t._v("智能跑道管理")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("guanli")}}},[t._v("体能检测管理")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("equipmentstatistics")}}},[t._v("设备统计")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("roadtest")}}},[t._v("生态廊道监管考核")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("wartertest")}}},[t._v("生态廊道水质监测")]),t._v(" "),a("div",{on:{click:function(e){return t.tiao("datacenter")}}},[t._v("数据中心")])]):t._e(),t._v(" "),a("div",{staticClass:"tuic",on:{click:function(e){return t.tiao("/")}}},[t._v("退出")])])},n=[],o={name:"Daoyou",components:{},data:function(){return{dl:!1}},computed:{},watch:{},mounted:function(){},methods:{tiao:function(t){this.$router.push({path:t})}}},r=o,s=(a("a86d"),a("2877")),l=Object(s["a"])(r,i,n,!1,null,"0988af69",null);e["default"]=l.exports},1982:function(t,e,a){},"2b95":function(t,e,a){"use strict";var i=a("1982"),n=a.n(i);n.a},"31ee":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.getdata.height,width:t.getdata.width},attrs:{id:t.getdata.id}})},n=[],o=a("313e"),r=a.n(o),s={props:{className:{type:String,default:"chart"},getdata:{type:Object,default:function(){return{id:"echar",height:"100%",width:"100%",legend:[],datay1:[],datay2:[],datax:[]}}}},data:function(){return{chart:null,colorlist:["#89A2FF","#A2BCFF","#FF9F9C","#FFDC79"]}},watch:{getdata:{handler:function(t){var e=this;this.$nextTick(function(){e.LineClomn(t)})},deep:!0}},mounted:function(){this.chart=r.a.init(document.getElementById(this.getdata.id))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{LineClomn:function(t){var e=this,a=t.legend,i=t.datax,n=t.datay2,o=t.datay1,s={grid:{x:48,y:60,x2:60,y2:30,borderWidth:1},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{top:20,textStyle:{color:"#16C7FB"},data:a},xAxis:[{type:"category",triggerEvent:!1,data:i,axisTick:{show:!1},nameTextStyle:{color:"#16C7FB"},axisLabel:{show:!0,formatter:function(t){var e="",a=t.length,i=2,n=Math.ceil(a/i);if(a>i)for(var o=0;o<n;o++){var r="",s=o*i,l=s+i;r=o===n-1?t.substring(s,a):t.substring(s,l)+"\n",e+=r}else e=t;return e},textStyle:{color:"#fff"}},axisLine:{lineStyle:{color:"#16C7FB"}}}],yAxis:[{type:"value",name:"在线数",nameTextStyle:{color:"#16C7FB"},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{formatter:"{value}",textStyle:{color:"#fff"}},axisLine:{lineStyle:{color:"#16C7FB"}}},{type:"value",name:"在线率",axisTick:{show:!1},nameTextStyle:{color:"#16C7FB"},splitLine:{show:!1},axisLabel:{formatter:"{value} %",textStyle:{color:"#fff"}},axisLine:{lineStyle:{color:"#16C7FB"}}}],series:[{name:"在线数",type:"bar",barWidth:30,itemStyle:{normal:{color:new r.a.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#FBF816"},{offset:1,color:"#3FB306"}],!1)},lineStyle:{color:"#3FB306"}},data:o},{name:"在线率",type:"line",symbol:"circle",itemStyle:{normal:{color:"#FB2616",lineStyle:{color:"#FB2616"}}},yAxisIndex:1,data:n}]};e.chart.setOption(s),window.addEventListener("resize",function(){e.chart.resize()})}}},l=s,c=a("2877"),d=Object(c["a"])(l,i,n,!1,null,null,null);e["default"]=d.exports},"4d92":function(t,e,a){},"4df4":function(t,e,a){},"5e0d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.getdata.height,width:t.getdata.width},attrs:{id:t.getdata.id}})},n=[],o=a("313e"),r=a.n(o),s={props:{className:{type:String,default:"chart"},getdata:{type:Object,default:function(){return{id:"echar",height:"100%",width:"100%",grid:"",legend:[],series_data:[],datax:[],color:[],row_nums:2,x_name:"",y_name:"分布",y_fomatter:"",stickx:"",sticky:"",xyline_color:"#16C7FB",font_color:"#fff",legend_color:"#16C7FB",stack:"1"}}}},data:function(){return{chart:null,colorlist:["#89A2FF","#A2BCFF","#FF9F9C","#FFDC79"]}},watch:{getdata:{handler:function(t){var e=this;this.$nextTick(function(){e.clomnthree(t)})},deep:!0}},mounted:function(){this.chart=r.a.init(document.getElementById(this.getdata.id))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{clomnthree:function(t){var e=this,a=t.legend,i=t.datax,n=t.color,o=t.stack;""!==o&&void 0!==o||(o=null);for(var r=t.series_data,s=[],l=0;l<r.length;l++)s.push({name:a[l],type:"bar",stack:o,data:r[l]});var c=t.row_nums;""!==c&&void 0!==c||(c=2);var d=t.x_name;""!==d&&void 0!==d||(d="");var u=t.y_name;""!==u&&void 0!==u||(u="");var h=t.xyline_color;""!==h&&void 0!==d||(h="#080808");var A=t.font_color;""!==A&&void 0!==A||(A="080808");var f=t.legend_color;""!==f&&void 0!==f||(f="080808");var v=t.stickx;""!==v&&void 0!==v||(v=!1);var g=t.sticky;""!==g&&void 0!==g||(g=!1);var m=t.y_fomatter;""!==m&&void 0!==m||(m="{value}");var p=t.grid;""!==p&&void 0!==p||(p={x:30,y:40,x2:0,y2:30,containLabel:!1});var _={grid:p,tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{orient:"horizontal",x:"center",y:"top",top:8,textStyle:{color:f},data:a},color:n,xAxis:[{type:"category",name:d,triggerEvent:!1,data:i,axisTick:{show:v},axisLabel:{show:!0,formatter:function(t){var e="",a=t.length,i=c,n=Math.ceil(a/i);if(a>i)for(var o=0;o<n;o++){var r="",s=o*i,l=s+i;r=o===n-1?t.substring(s,a):t.substring(s,l)+"\n",e+=r}else e=t;return e},textStyle:{color:"#fff"}},axisLine:{lineStyle:{color:h}}}],yAxis:[{type:"value",name:u,axisTick:{show:g},splitLine:{show:!1},axisLabel:{formatter:m,textStyle:{color:A}},axisLine:{lineStyle:{color:h}}}],series:s};e.chart.setOption(_),window.addEventListener("resize",function(){e.chart.resize()})}}},l=s,c=a("2877"),d=Object(c["a"])(l,i,n,!1,null,null,null);e["default"]=d.exports},6629:function(t,e,a){"use strict";var i=a("4df4"),n=a.n(i);n.a},7418:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEUAAAAAoOkAoOkAoOkAoOkAoOkAoOkAoOkAoOmBKbvLAAAACHRSTlMA9dZgKwqhn3H8YTQAAAArSURBVBjTY+hAAcKo/CYHVH4pA0NHAwMSGOXTnJ+Aym8KQOWLMKACA1QuADBDMEEr7mC5AAAAAElFTkSuQmCC"},"804a":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.getdata.height,width:t.getdata.width},attrs:{id:t.getdata.id}})},n=[],o=(a("7f7f"),a("313e")),r=a.n(o),s={props:{className:{type:String,default:"chart"},getdata:{type:Object,default:function(){return{id:"echar",series:[],legend:[],height:"",width:""}}}},data:function(){return{chart:null,colorlist:this.$store.state.settings.chartColors}},watch:{getdata:{handler:function(t){var e=this;this.$nextTick(function(){e.EchartsRing(t)})},deep:!0}},mounted:function(){this.chart=r.a.init(document.getElementById(this.getdata.id))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{EchartsRing:function(t){var e=[{name:"在线",value:333},{name:"离线",value:32},{name:"未知",value:444}],a=["在线","离线","未知"],i=this,n={tooltip:{trigger:"item",formatter:function(t){var e="";return e+=t.seriesName+"</br>"+t.marker+t.data.name+" : "+t.data.value+"("+t.percent+"%)</br>",e}},legend:{orient:"horizontal",icon:"rect",bottom:0,data:a,textStyle:{color:"#fff"}},color:this.$store.state.settings.chartColors,series:[{name:"消费来源",type:"pie",radius:["38%","68%"],center:["50%","45%"],avoidLabelOverlap:!1,hoverAnimation:!0,labelLine:{normal:{show:!0,length:15}},label:{normal:{show:!0,formatter:function(t){var e="";return e+=t.data.value+"("+t.percent+"%)",e}},emphasis:{show:!0,textStyle:{}}},data:e}]};i.chart.setOption(n),window.addEventListener("resize",function(){i.chart.resize()})}}},l=s,c=a("2877"),d=Object(c["a"])(l,i,n,!1,null,null,null);e["default"]=d.exports},"973b":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAHlBMVEUAAAAAoOkAoOkAoOkAoOkAoOkAoOkAoOkAoOkAoOlQ6akYAAAACXRSTlMA9dQqCqCfYF9S6VkiAAAAJ0lEQVQY02NoYEAFwmj8SQ6o/JkBaPwJo3y68pFBChp/kgEqf6Y4AEsgNiOG/SxCAAAAAElFTkSuQmCC"},a86d:function(t,e,a){"use strict";var i=a("4d92"),n=a.n(i);n.a},bddf:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.getdata.height,width:t.getdata.width},attrs:{id:t.getdata.id}})},n=[],o=(a("55dd"),a("313e")),r=a.n(o),s={props:{className:{type:String,default:"chart"},getdata:{type:Object,default:function(){return{id:"echar",height:"100%",width:"100%",legend:[],datalist:[],color:[]}}}},data:function(){return{chart:null}},watch:{getdata:{immediate:!0,handler:function(t){var e=this;this.$nextTick(function(){e.pieCharts(t)})}}},mounted:function(){this.chart=r.a.init(document.getElementById(this.getdata.id))},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{pieCharts:function(t){var e=this,a=t.datalist,i=t.legend,n=["#587CF1","#3AE3BC","#FAD972","#F88582","#9299F3"],o={title:{left:"center",top:20,textStyle:{color:"#ccc"}},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"horizontal",icon:"rect",bottom:0,data:i,textStyle:{color:"#fff"}},color:n,series:[{name:"设备类型",type:"pie",radius:"65%",center:["50%","50%"],data:a.sort(function(t,e){return t.value-e.value}),roseType:"radius",label:{normal:{textStyle:{color:"#fff"}}},labelLine:{normal:{lineStyle:{color:"#fff"},length:10,length2:20}}}]};e.chart.setOption(o),window.addEventListener("resize",function(){e.chart.resize()})}}},l=s,c=a("2877"),d=Object(c["a"])(l,i,n,!1,null,null,null);e["default"]=d.exports},bfae:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about"},[a("div",{staticClass:"header"},[a("daoy",{staticClass:"daoy"}),t._v(" "),a("div",{staticClass:"header_text"},[t._v("设备统计")])],1),t._v(" "),a("div",{staticClass:"bg_img"}),t._v(" "),a("div",{staticClass:"echarts_box"},[a("div",{staticClass:"top"},[a("div",{staticClass:"top_left"},[a("fourcorners"),t._v(" "),a("div",{staticClass:"echart_top_left"},[a("div",{staticClass:"title"},[t._v("监控点在线情况")]),t._v(" "),a("div",{staticClass:"topleft"},[a("line-clomn",{attrs:{getdata:t.data_lineclomn}})],1)])],1),t._v(" "),a("div",{staticClass:"top_right"},[a("fourcorners"),t._v(" "),a("div",{staticClass:"title"},[t._v("设备类型占比")]),t._v(" "),a("div",{staticClass:"topright"},[a("chart-pie",{attrs:{getdata:t.pie}})],1)],1)]),t._v(" "),a("div",{staticClass:"bottom"},[a("div",{staticClass:"bottom_left"},[a("fourcorners"),t._v(" "),a("div",{staticClass:"title"},[t._v("设备状态统计")]),t._v(" "),a("div",{staticClass:"bottomleft"},[a("echart-ring",{attrs:{getdata:t.chartring}})],1)],1),t._v(" "),a("div",{staticClass:"bottom_right"},[a("fourcorners"),t._v(" "),a("div",{staticClass:"title"},[t._v("设备同分布统计")]),t._v(" "),a("div",{staticClass:"bottomright"},[a("echar-clomn-thtee",{attrs:{getdata:t.clomnthree}})],1)],1)])])])},n=[],o=a("0c61"),r=a("e90f"),s=a("31ee"),l=a("bddf"),c=a("804a"),d=a("5e0d"),u={name:"About",components:{daoy:o["default"],fourcorners:r["default"],LineClomn:s["default"],ChartPie:l["default"],EchartRing:c["default"],EcharClomnThtee:d["default"]},data:function(){return{data_lineclomn:{id:"lineclomn",height:"100%",width:"100%",legend:[],datay1:[],datay2:[],datax:[]},pie:{id:"chartspie",datalist:[],height:"100%",width:"100%",legend:[]},chartring:{id:"cahrtring",series:[],legend:[],height:"100%",width:"100%"},clomnthree:{id:"clomnthree",height:"100%",width:"100%",legend:[],series_data:[],datax:[],color:[],row_nums:2,x_name:"",y_name:"分布",xyline_color:"#16C7FB",font_color:"#fff",legend_color:"#16C7FB",stack:""}}},computed:{},watch:{},mounted:function(){this.data_lineclomn.legend=["在线数","在线率"],this.data_lineclomn.datay1=[2.6,5.9,9,26.4,28.7,70.7,175.6,182.2,48.7,18.8,6,2.3],this.data_lineclomn.datay2=[2,4.9,7,23.2,25.6,76.7,135.6,162.2,32.6,20,6.4,3.3],this.data_lineclomn.datax=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],this.pie.datalist=[{value:335,name:"监控"},{value:310,name:"服务器"},{value:274,name:"广播"},{value:235,name:"LED"},{value:400,name:"报警"}],this.pie.legend=["监控","服务器","广播","LED","报警"],this.chartring.legend=["在线","离线","未知"],this.chartring.series=[{name:"在线",value:333},{name:"离线",value:32},{name:"未知",value:444}],this.clomnthree.legend=["灵眸","摄像头","大屏","水质监测"],this.clomnthree.datax=["智能跑道","客栈南端","客栈北端","湿地公园"];var t=[23.2,25.6,76.7,0],e=[33,70.7,175.6,28.2],a=[66,23,77,58.6],i=[111,66.7,0,77.2];this.clomnthree.series_data=[t,e,a,i],this.clomnthree.color=["#4BF1A4","#63EDF7","#6367F8","#047DFF"]},methods:{tiao:function(t){this.$router.push({path:"/"+t})}}},h=u,A=(a("2b95"),a("2877")),f=Object(A["a"])(h,i,n,!1,null,"119cb038",null);e["default"]=f.exports},c373:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEUAAAAAoOkAoOkAoOkAoOkAoOkAoOkAoOkAoOmBKbvLAAAACHRSTlMA9dVfKwqgn80CDYwAAAAnSURBVBjTYzDsQAEMLBqofIZwVD4K4Bjl05XPhsZn1WBABY5ofGYAbIQj5B+3oWwAAAAASUVORK5CYII="},e90f:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"fourcorners"},[i("div",{staticClass:"bg_opacity"}),t._v(" "),t.showimg?i("div",{staticClass:"imgs"},[i("img",{attrs:{src:a("7418")}}),t._v(" "),i("img",{attrs:{src:a("c373")}}),t._v(" "),i("img",{attrs:{src:a("973b")}}),t._v(" "),i("img",{attrs:{src:a("ea71")}})]):t._e()])},n=[],o={name:"About",props:{showimg:{type:Boolean,default:!0}},data:function(){return{}}},r=o,s=(a("6629"),a("2877")),l=Object(s["a"])(r,i,n,!1,null,"cca9f3f4",null);e["default"]=l.exports},ea71:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAG1BMVEUAAAAAoOkAoOkAoOkAoOkAoOkAoOkAoOkAoOmBKbvLAAAACHRSTlMA9dSfKQpgXmLb2xEAAAApSURBVBjTY0AF7Gh8R1QuqwYqn7kDlc8xyqc5P7gDGTCwaKDyEztQAAANbiQRKn4hHgAAAABJRU5ErkJggg=="}}]);
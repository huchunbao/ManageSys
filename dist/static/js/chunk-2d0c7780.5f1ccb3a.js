(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c7780"],{"516d":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{style:{height:t.getdata.height,width:t.getdata.width},attrs:{id:t.getdata.id}})},a=[],i=(r("7f7f"),r("313e")),s=r.n(i),o={props:{className:{type:String,default:"chart"},getdata:{type:Object,default:function(){return{id:"echar",series:[],legend:[],height:"",width:""}}}},data:function(){return{chart:null,colorlist:this.$store.state.settings.chartColors}},watch:{getdata:{handler:function(t){var e=this;this.$nextTick(function(){e.EchartsRing(t)})},deep:!0}},mounted:function(){this.chart=s.a.init(document.getElementById(this.getdata.id))},beforeDestroy:function(){var t=this;window.removeEventListener("resize",t.resizeHandler)},methods:{EchartsRing:function(t){var e=t.series,r=t.legend,n=this,a={title:{show:e.length<1&&r.length<1,textStyle:{color:"#909399",fontWeight:"normal",fontSize:14},text:"暂无数据",left:"center",top:"center"},tooltip:{trigger:"item",formatter:function(t){var e="";return e+=t.seriesName+"</br>"+t.marker+t.data.name+" : "+t.data.value+"("+t.percent+"%)</br>",e}},legend:{orient:"vertical",icon:"circle",x:"80%",y:"center",data:r},color:this.$store.state.settings.chartColors,series:[{name:"消费来源",type:"pie",center:["40%","55%"],radius:["30%","50%"],avoidLabelOverlap:!0,hoverAnimation:!0,labelLine:{normal:{show:!0}},label:{normal:{show:!0,formatter:function(t){var e="";return e+=t.data.value+"("+t.percent+"%)",e}},emphasis:{show:!0}},data:e}]};n.chart.setOption(a),window.addEventListener("resize",n.resizeHandler)},resizeHandler:function(){this.chart&&this.chart.resize()}}},c=o,l=r("2877"),d=Object(l["a"])(c,n,a,!1,null,null,null);e["default"]=d.exports}}]);
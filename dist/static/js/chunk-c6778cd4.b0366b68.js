(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c6778cd4"],{"1c6a":function(t,i,a){"use strict";a.r(i);var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"fabuw"},[a("div",{staticClass:"left",on:{mousemove:t.move}},[a("div",{ref:"zhu",staticClass:"zhu",on:{mousedown:t.down,mouseup:t.up}},[a("div",{staticClass:"right_bottom",on:{mousedown:t.down2,mouseup:t.up,mousemove:t.move2,mouseout:t.up}})])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"right_header"},[t._v("页面管理")]),t._v(" "),a("div",{staticClass:"right_body"},[a("div",{staticClass:"chuang"},[t._v("\n        当前窗口: "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.dataname,expression:"dataname"}],attrs:{type:"text",disabled:""},domProps:{value:t.dataname},on:{input:function(i){i.target.composing||(t.dataname=i.target.value)}}})]),t._v(" "),a("div",[a("div",{staticClass:"wdata"},[t._v("窗口位置:")]),t._v(" "),a("div",{staticClass:"wdatali"},[t._v("\n          Y "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.left,expression:"left"}],attrs:{type:"text",disabled:""},domProps:{value:t.left},on:{input:function(i){i.target.composing||(t.left=i.target.value)}}})]),t._v(" "),a("div",{staticClass:"wdatali"},[t._v("\n          X "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.top,expression:"top"}],attrs:{type:"text",disabled:""},domProps:{value:t.top},on:{input:function(i){i.target.composing||(t.top=i.target.value)}}})]),t._v(" "),a("div",{staticClass:"wdatali"},[t._v("\n          H "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.height,expression:"height"}],attrs:{type:"text",disabled:""},domProps:{value:t.height},on:{input:function(i){i.target.composing||(t.height=i.target.value)}}})]),t._v(" "),a("div",{staticClass:"wdatali"},[t._v("\n          W "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.width,expression:"width"}],attrs:{type:"text",disabled:""},domProps:{value:t.width},on:{input:function(i){i.target.composing||(t.width=i.target.value)}}})])]),t._v(" "),a("div",{staticClass:"kongzhi"},[a("div",{staticClass:"kongzhi_jia"},[a("input",{attrs:{type:"file",accept:"text/plain"},on:{change:t.add}})]),t._v(" "),a("div",{staticClass:"kongzhi_jian",on:{click:function(i){return t.shan()}}}),t._v(" "),a("div",{staticClass:"kongzhi_shang",on:{click:function(i){return t.dataup()}}}),t._v(" "),a("div",{staticClass:"kongzhi_xia",on:{click:function(i){return t.datadown()}}})]),t._v(" "),a("div",[a("table",{staticClass:"tab",attrs:{border:"0",cellspacing:"0",cellpadding:"0"}},[t._m(0),t._v(" "),t._l(t.data,function(i,s){return a("tr",{key:s,on:{click:function(a){return t.whxy(i.pointw,i.pointh,i.pointx,i.pointy,i.name,s)}}},[a("td",[t._v(t._s(i.name))]),t._v(" "),a("td",[t._v(t._s(i.type))]),t._v(" "),a("td")])})],2)]),t._v(" "),a("div",{staticClass:"an"},[a("div",{on:{click:function(i){return t.tiao("xinxi")}}},[t._v("取消")]),t._v(" "),a("div",{on:{click:t.chuan}},[t._v("保存")])])])])])},e=[function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("tr",[a("th",[t._v("名称")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("描述")])])}],n=(a("7f7f"),{name:"Fabuw",components:{},data:function(){return{left:0,top:0,width:100,height:100,dataname:"",taid:"",whtf:!1,lttf:!1,shux:!1,shuy:!1,shux2:!1,shuy2:!1,data:[],ddata:null}},computed:{},watch:{left:function(){this.divup()},top:function(){this.divup()},width:function(){this.divup()},height:function(){this.divup()}},mounted:function(){this.divup()},methods:{down:function(t){this.whtf=!0,this.shux=t.clientX-this.left,this.shuy=t.clientY-this.top},down2:function(t){this.lttf=!0,this.shux2=t.clientX-this.width,this.shuy2=t.clientY-this.height},up:function(){this.whtf=!1,this.shux=!1,this.shuy=!1,this.lttf=!1,this.shux2=!1,this.shuy2=!1,this.data[this.ddata].pointw=this.width,this.data[this.ddata].pointh=this.height,this.data[this.ddata].pointx=this.left,this.data[this.ddata].pointy=this.top},move:function(t){this.whtf&&!this.lttf&&(this.left=t.clientX-this.shux,this.top=t.clientY-this.shuy)},move2:function(t){this.lttf&&(this.width=t.clientX-this.shux2,this.height=t.clientY-this.shuy2)},divup:function(){this.$refs.zhu.style.height=this.height+"px",this.$refs.zhu.style.width=this.width+"px",this.$refs.zhu.style.marginTop=this.top+"px",this.$refs.zhu.style.marginLeft=this.left+"px"},add:function(t){if(this.data.length>=5)alert("超出最大数量");else{var i=t.target.files[0];i.pointw=100,i.pointy=0,i.pointx=0,i.pointh=100,this.data.push(i),console.log(this.data),this.whxy(i.pointw,i.pointh,i.pointx,i.pointy,i.name,this.data.length-1)}},shan:function(){this.data.splice(this.ddata,1),this.width="",this.height="",this.left="",this.top="",this.dataname="",this.ddata=""},dataup:function(){this.ddata>0?(this.data.splice(this.ddata-1,0,this.data[this.ddata]),this.data.splice(this.ddata+1,1),this.ddata=this.ddata-1):console.log(123)},datadown:function(){this.ddata<this.data.length?(this.data.splice(this.ddata+2,0,this.data[this.ddata]),this.data.splice(this.ddata,1),this.ddata=this.ddata+1):console.log(231)},getdata:function(t){},whxy:function(t,i,a,s,e,n){this.width=t,this.height=i,this.left=a,this.top=s,this.dataname=e,this.ddata=n},chuan:function(){console.log(this.data,123),0!==this.data.length?this.$emit("fabufa",this.data):alert("请添加素材")},tiao:function(t){this.$router.push({path:"/"+t})}}}),h=n,d=(a("8c41"),a("2877")),o=Object(d["a"])(h,s,e,!1,null,"1dea2a5c",null);i["default"]=o.exports},"8c41":function(t,i,a){"use strict";var s=a("b7fc"),e=a.n(s);e.a},b7fc:function(t,i,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18281aa5"],{"16f7":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAADBAMAAACHXflZAAAAFVBMVEU7Zv87Zv87Zv87Zv87Zv87Zv87Zv8SjMEtAAAABnRSTlPg0GFRcFvMdUYhAAAAGElEQVQI12MwFISAAAa1NAhwYDBggAAFAEkSBHmbL3EsAAAAAElFTkSuQmCC"},"248c":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"routeinstall"},[i("div",{staticClass:"leftdiv"},[i("div",{staticClass:"leftdiv_list"},[i("el-select",{staticClass:"elselect",staticStyle:{float:"right"},attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(a){t.value=a},expression:"value"}},t._l(t.options,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v("路线类型\n    ")],1),t._v(" "),i("div",{staticClass:"leftdiv_list"},[t._v("\n      路线名称\n      "),i("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}})],1),t._v(" "),i("div",{staticClass:"leftdiv_list"},[t._v("\n      路线备注\n      "),i("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.bei,callback:function(a){t.bei=a},expression:"bei"}})],1),t._v(" "),i("div",{staticClass:"leftdiv_list"},[t._v("\n      路线的站点\n      "),i("img",{staticClass:"dian",attrs:{src:e("b887"),alt:""},on:{click:function(a){return t.xia()}}}),t._v(" "),i("img",{staticClass:"dian",attrs:{src:e("7433"),alt:""},on:{click:function(a){return t.shang()}}}),t._v(" "),i("img",{staticClass:"dian",staticStyle:{"padding-top":"7px"},attrs:{src:e("16f7"),alt:""},on:{click:function(a){return t.jian()}}}),t._v(" "),i("img",{staticClass:"dian",attrs:{src:e("60cb"),alt:""},on:{click:function(a){return t.jia()}}})]),t._v(" "),i("div",{staticClass:"leftdiv_list",staticStyle:{height:"30vh"}},[i("el-table",{staticStyle:{width:"100%","font-size":"10px"},attrs:{data:t.data,height:"200",border:"","row-key":""}},[i("el-table-column",{attrs:{prop:"单选",width:"32"},scopedSlots:t._u([{key:"default",fn:function(a){return[i("el-radio",{staticClass:"radio",attrs:{label:a.$index},model:{value:t.dataid,callback:function(a){t.dataid=a},expression:"dataid"}},[t._v(t._s(a.$index+1))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"姓名",prop:"name"},scopedSlots:t._u([{key:"default",fn:function(a){return[i("input",{directives:[{name:"model",rawName:"v-model",value:a.row.name,expression:"scope.row.name"}],staticClass:"datainp",attrs:{type:"text",placeholder:"请输入名称"},domProps:{value:a.row.name},on:{input:function(e){e.target.composing||t.$set(a.row,"name",e.target.value)}}})]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"indt",label:"定位"}})],1)],1),t._v(" "),i("div",{staticClass:"leftdiv_list"},[t._v("绑定设备")]),t._v(" "),i("div",{staticClass:"leftdiv_list"},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:t.value2,callback:function(a){t.value2=a},expression:"value2"}},t._l(t.options2,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("div",{staticClass:"leftdiv_list"},[i("el-button",{attrs:{type:"primary",round:""},on:{click:function(a){return t.ti()}}},[t._v("保存")]),t._v(" "),i("el-button",{attrs:{type:"info",round:""},on:{click:function(a){return t.ti2()}}},[t._v("保存并继续")])],1)]),t._v(" "),i("el-amap",{staticClass:"map",attrs:{vid:"amap-vue",zoom:t.zoom,center:t.center,"map-style":t.mapStyle1,events:t.events,"amap-manager":t.amapManager}}),t._v(" "),t.tank?i("div",{staticClass:"tank"},[t._v("\n    "+t._s(t.tank)+"\n  ")]):t._e()],1)},s=[],n=(e("7f7f"),e("8f9b")),l=e.n(n),A=new l.a.AMapManager,o={name:"Map",data:function(){return{tank:"",name:"",bei:"",zoom:16,center:[116.336496,39.942178],mapStyle1:"amap://styles/whitesmoke",activeName:"qing",tape:1,amapManager:A,events:{},overlayGroups:[],data:[{name:"",indt:""}],dataid:0,options:[{value:"1",label:"游览路线"},{value:"2",label:"巡逻路线"}],value:"",options2:[{value:"1",label:"单兵"},{value:"2",label:"对讲机"}],value2:"",line:""}},watch:{data:function(){}},created:function(){this.addfun()},methods:{ti:function(){var t=this;""!==this.name&&""!==this.value?(this.$message({message:"保存成功",type:"success"}),setTimeout(function(){t.tank="",t.$router.push({path:"/maps/linjingxi"})},2e3)):this.$message({message:"请认真检查填写项",type:"warning"})},ti2:function(){""!==this.name&&""!==this.value?(this.name="",this.bei="",this.value="",this.value2="",this.dataid=0,this.data=[{name:"",indt:""}],this.addmarker(),this.$message({message:"保存成功",type:"success"})):this.$message({message:"请认真检查填写项",type:"warning"})},addfun:function(){var t=this;this.events={init:function(a){a.on("click",function(a){t.wei(a.lnglat.getLng(),a.lnglat.getLat(),t)})}}},addmarker:function(){console.log(123);var t=this,a=A.getMap(),e=[],i=[];a.remove(t.overlayGroups),a.remove(t.line);for(var s=0;s<t.data.length;s++)if(""!==t.data[s].indt){var n=new AMap.Marker({position:t.data[s].indt,text:"123",icon:"https://webapi.amap.com/theme/v1.3/markers/n/mark_b"+(e.length+1)+".png"});i.push(t.data[s].indt),e.push(n)}i.length>1&&(console.log(i),t.line=new AMap.Polyline({map:a,strokeColor:"#80d8ff",isOutline:!0,outlineColor:"white",path:i})),this.overlayGroups=new AMap.OverlayGroup(e),a.add(t.overlayGroups)},wei:function(t,a,e){e.data[e.dataid].indt=[t,a],this.addmarker()},handleClick:function(t,a){console.log(t,a)},jia:function(){this.data.push({name:"",indt:""}),this.dataid=this.data.length-1},datafun:function(t){console.log(t),this.dataid=t},jian:function(){this.data.splice(this.dataid,1),this.addmarker()},shang:function(){if(0!==this.dataid){var t=this.data[this.dataid];this.data[this.dataid]=this.data[this.dataid-1],this.data[this.dataid-1]=t,this.dataid-=1}this.addmarker()},xia:function(){if(this.dataid!==this.data.length-1){var t=this.data[this.dataid];this.data[this.dataid]=this.data[this.dataid+1],this.data[this.dataid+1]=t,this.dataid+=1}this.addmarker()}}},d=o,r=(e("f076"),e("2877")),v=Object(r["a"])(d,i,s,!1,null,"2b9c6bcb",null);a["default"]=v.exports},2548:function(t,a,e){},"60cb":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARBAMAAADJQ1rJAAAAJ1BMVEUAAAA7Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv+C3BOyAAAADHRSTlMA0PDggfmKeGigkHIq6oMXAAAANElEQVQI12MAArblDFDAdJBMVrKxsc1RY2PjDQxzzkCAA4OjoKDMUUFBwQayTYYCdg8QCQBVJhWbVQBKgAAAAABJRU5ErkJggg=="},7433:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAAA7Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv/f4m3vAAAADnRSTlMAeC8fl+ADvrKlaU1FAkiZSrEAAABQSURBVAjXYwACRgEGCJB7CKEZ370TgAi8e/cQItD3HCwk98Tukd9DkICD3SOWdwJAAQa7RwxAITkHECPzFQP3BRCD7QBQNYgBBEQyTIOABABwIB7nLJ+yeQAAAABJRU5ErkJggg=="},b887:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUAAAA7Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv87Zv/1M/EzAAAAD3RSTlMAeB8wl+ADvrKlaU1FKgKwo5P9AAAAT0lEQVQI12MAAtVYBgjQ/0wsg/sBiMF2gEHeAcTI/MUg/wXE8P/IwPjfQf8zy38BBqCQ/megAANQqP87SAAo9P8/UAAsBBIACwEFIEIgAQAUqiAWOaLasAAAAABJRU5ErkJggg=="},f076:function(t,a,e){"use strict";var i=e("2548"),s=e.n(i);s.a}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d2f0509e"],{"0d5e":function(t,e,a){"use strict";a.d(e,"b",function(){return n}),a.d(e,"c",function(){return i}),a.d(e,"d",function(){return l}),a.d(e,"a",function(){return r});var s=a("b775");function n(t,e){return Object(s["a"])({url:t,method:"get",params:e})}function i(t,e){return Object(s["a"])({url:t,method:"post",data:e})}function l(t,e){return Object(s["a"])({url:t,method:"put",data:e})}function r(t,e){return Object(s["a"])({url:t,method:"delete",data:e})}},"1bfe":function(t,e,a){},d12c:function(t,e,a){"use strict";var s=a("1bfe"),n=a.n(s);n.a},ebb2:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"passenger2"},[a("div",{staticClass:"map2"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.arrdata,"tooltip-effect":"dark","header-cell-style":{background:"#edeff8",color:"#909399"}},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"point_name",label:"景区/景点"}}),t._v(" "),a("el-table-column",{attrs:{prop:"bear_passenger",label:"承载量设置"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("input",{directives:[{name:"model",rawName:"v-model",value:e.row.bear_passenger,expression:"scope.row.bear_passenger"}],staticClass:"ipt",attrs:{type:"placeholder",placeholder:e.row.bear_passenger,value:"1000",disabled:!e.row.baoc},domProps:{value:e.row.bear_passenger},on:{input:function(a){a.target.composing||t.$set(e.row,"bear_passenger",a.target.value)}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"warning_passenger",label:"预警承载量设置"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("input",{directives:[{name:"model",rawName:"v-model",value:e.row.warning_passenger,expression:"scope.row.warning_passenger"}],staticClass:"ipt",attrs:{type:"placeholder",value:"800",align:"center",disabled:!e.row.baoc},domProps:{value:e.row.warning_passenger},on:{input:function(a){a.target.composing||t.$set(e.row,"warning_passenger",a.target.value)}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"call_passenger",label:"报警承载量设置"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("input",{directives:[{name:"model",rawName:"v-model",value:e.row.call_passenger,expression:"scope.row.call_passenger"}],staticClass:"ipt",attrs:{type:"placeholder",value:"500",align:"center",disabled:!e.row.baoc},domProps:{value:e.row.call_passenger},on:{input:function(a){a.target.composing||t.$set(e.row,"call_passenger",a.target.value)}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"通知人员"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.user_name)+"\n          "),a("el-button",{style:e.row.baoc?"":"color: #ccc;",attrs:{type:"text",size:"small"},on:{click:function(a){e.row.baoc&&t.zhfa(e)}}},[t._v("设置")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"way_name",label:"通知方案"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.way_name)+"\n          "),a("el-button",{style:e.row.baoc?"":"color: #ccc;",attrs:{type:"text",size:"small"},on:{click:function(a){e.row.baoc&&t.xgfa(e)}}},[t._v("设置")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"anniu",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{style:e.row.baoc?"color:rgba(63,106,255,1);font-size:10px; padding:5px 10px; margin-left:5px;":"font-size:10px; padding:5px 10px; margin-left:5px;",attrs:{disabled:!e.row.baoc},on:{click:function(a){return t.bc(e)}}},[t._v("保存")]),t._v(" "),a("el-button",{staticStyle:{"font-size":"10px",padding:"5px 10px","margin-left":"5px",color:"rgba(63,106,255,1)"},attrs:{disabled:e.row.baoc},on:{click:function(t){e.row.baoc=!0}}},[t._v("编辑")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"auditState",label:"审核状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s("0"===e.row.audit_state?"通过":"1"===e.row.audit_state?"未通过":"未审核")+"\n        ")]}}])})],1),t._v(" "),a("el-pagination",{staticClass:"feny",attrs:{"current-page":t.cur,background:"","page-size":8,layout:"total, prev, pager, next, jumper",total:t.all},on:{"current-change":t.btnClick}}),t._v(" "),a("p",{staticClass:"notice"},[t._v("*注：值为0时，代表没有限制")]),t._v(" "),a("el-dialog",{attrs:{title:"设置",visible:t.zh,width:"30%",left:""},on:{"update:visible":function(e){t.zh=e}}},[a("p",{staticClass:"qx"},[t._v("选择告警通知人员")]),t._v(" "),a("div",{staticClass:"beija"},[a("div",{staticClass:"yuan"},[a("el-checkbox-group",{model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},t._l(t.adminlist,function(e,s){return a("el-checkbox",{key:s,attrs:{label:e}},[t._v(t._s(e.cusName))])}),1)],1)]),t._v(" "),a("input",{staticClass:"qxb",attrs:{type:"button",value:"取消"},on:{click:t.clickok}}),t._v(" "),a("input",{staticClass:"qdb",attrs:{type:"button",value:"确定"},on:{click:t.que}})]),t._v(" "),a("el-dialog",{attrs:{title:"查看处警内容",visible:t.xg,width:"30%",left:""},on:{"update:visible":function(e){t.xg=e}}},[a("p",{staticClass:"qx"},[t._v("选择通知方案")]),t._v(" "),a("div",{staticClass:"beija"},[a("div",{staticClass:"yuan"},[a("el-checkbox-group",{attrs:{max:1},model:{value:t.checkList2,callback:function(e){t.checkList2=e},expression:"checkList2"}},t._l(t.adminlist2,function(e,s){return a("el-checkbox",{key:s,attrs:{label:e}},[t._v(t._s(e.wayName))])}),1)],1)]),t._v(" "),a("input",{staticClass:"qxb",attrs:{type:"button",value:"取消"},on:{click:t.clickok}}),t._v(" "),a("input",{staticClass:"qdb",attrs:{type:"button",value:"确定"},on:{click:t.que2}})]),t._v(" "),a("el-dialog",{attrs:{title:"批量操作",visible:t.op,width:"30%",left:""},on:{"update:visible":function(e){t.op=e}}},[a("div",{staticClass:"czl"},[a("div",{staticStyle:{display:"flex","margin-left":"10%"}},[a("p",{staticClass:"zia"},[t._v("承载量")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.bearPassenger,expression:"data.bearPassenger"}],staticClass:"ipt1",attrs:{type:"value"},domProps:{value:t.data.bearPassenger},on:{input:function(e){e.target.composing||t.$set(t.data,"bearPassenger",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"yjczl"},[a("div",{staticStyle:{display:"flex","margin-left":"10%"}},[a("p",{staticClass:"zia"},[t._v("预警承载量")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.warningPassenger,expression:"data.warningPassenger"}],staticClass:"ipt2",attrs:{type:"value"},domProps:{value:t.data.warningPassenger},on:{input:function(e){e.target.composing||t.$set(t.data,"warningPassenger",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"bjczl"},[a("div",{staticStyle:{display:"flex","margin-left":"10%"}},[a("p",{staticClass:"zia"},[t._v("报警承载量")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.callPassenger,expression:"data.callPassenger"}],staticClass:"ipt3",attrs:{type:"value"},domProps:{value:t.data.callPassenger},on:{input:function(e){e.target.composing||t.$set(t.data,"callPassenger",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"bjczl"},[a("div",{staticStyle:{display:"flex","margin-left":"10%"}},[a("p",{staticClass:"zia"},[t._v("通知人:"+t._s(t.zhdata.user_name))]),t._v(" "),a("p",{staticClass:"sz",on:{click:function(e){t.zh=!0}}},[t._v("设置")])])]),t._v(" "),a("div",{staticClass:"bjczl"},[a("div",{staticStyle:{display:"flex","margin-left":"10%"}},[a("p",{staticClass:"zia"},[t._v("通知方案:"+t._s(t.xgdata.way_name))]),t._v(" "),a("p",{staticClass:"sz",on:{click:function(e){t.xg=!0}}},[t._v("设置")])])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"el-button-default",attrs:{round:"",size:"mini"},on:{click:function(e){t.op=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(e){return t.qding()}}},[t._v("确定")])],1)])],1)])},n=[],i=a("0d5e"),l={data:function(){return{arrdata:[],arr:[],all:10,cur:1,data:{},checked:!0,radio:"1",zhdata:{userid:"",user_name:""},zh:!1,xgdata:{wayid:"",way_name:""},xg:!1,op:!1,shdata:{},sh:!1,multipleSelection:[],checkList:[],adminlist:[],checkList2:[],adminlist2:[]}},mounted:function(){var t=this;this.shua(),Object(i["b"])("/user/list/cp12").then(function(e){t.adminlist=e.data}),Object(i["b"])("/notify-scheme/12").then(function(e){t.adminlist2=e.data})},methods:{que:function(){this.zhdata.userid="";for(var t=0;t<this.checkList.length;t++)this.zhdata.userid+=0===t?this.checkList[t].userId:","+this.checkList[t].userId;this.zhdata.user_name=this.checkList[0].cusName,this.checkList=[],this.zh=!1},que2:function(){this.xgdata.wayid+=this.checkList2[0].id,this.xgdata.way_name=this.checkList2[0].wayName,this.checkList2=[],this.xg=!1},shua:function(){var t=this;Object(i["b"])("/alarmset/selectAll",{cpid:this.$store.state.user.companyId,pageNumber:t.cur-1,pageSize:8}).then(function(e){for(var a=0;a<e.content.length;a++)e.content[a].baoc=!1,e.content[a].userid="",e.content[a].wayid="";t.arrdata=e.content,t.all=e.totalElements})},handleSelectionChange:function(t){this.multipleSelection=t},btnClick:function(t){this.cur=t,this.shua()},clickok:function(){this.zh=!1,this.xg=!1,this.op=!1,this.sh=!1},zhfa:function(t){console.log(t),this.zh=!0,this.zhdata=this.arrdata[t.$index]},xgfa:function(t){console.log(t),this.xg=!0,this.xgdata=this.arrdata[t.$index]},opfa:function(){console.log(this.multipleSelection),this.multipleSelection.length>=1?(this.op=!0,this.zhdata={userid:"",user_name:""},this.xgdata={wayid:"",way_name:""}):(console.log("请选中设备之后再进行保存"),this.$message({message:"请选中数据之后再进行操作",type:"warning"}))},bc:function(t){if(console.log(t),1*t.row.bear_passenger>1*t.row.call_passenger&&1*t.row.call_passenger>1*t.row.warning_passenger){var e=[{id:t.row.id,bearPassenger:t.row.bear_passenger+"",warningPassenger:t.row.warning_passenger+"",callPassenger:t.row.call_passenger+""}];""!==t.row.userid&&(e[0].user_id=t.row.userid),""!==t.row.wayid&&(e[0].way_id=t.row.wayid),Object(i["c"])("/alarmset/batchUpdateAll",e).then(function(e){console.log(e,111),t.row.baoc=!1})}else this.$message({message:"请按照承载量>报警承载量>预警承载量的规则",type:"warning"})},qding:function(){for(var t=this,e=[],a=0;a<this.multipleSelection.length;a++){var s={id:this.multipleSelection[a].id};""!==this.data.bearPassenger?s.bearPassenger=this.data.bearPassenger:s.bearPassenger=this.multipleSelection[a].bearPassenger,""!==this.data.warningPassenger?s.warningPassenger=this.data.warningPassenger:s.warningPassenger=this.multipleSelection[a].warningPassenger,""!==this.data.callPassenger?s.callPassenger=this.data.callPassenger:s.callPassenger=this.multipleSelection[a].callPassenger,""!==this.zhdata.userid?s.userId=this.zhdata.userid:s.userId=this.multipleSelection[a].user_id,""!==this.xgdata.wayid?s.wayId=this.xgdata.wayid:s.wayId=this.multipleSelection[a].way_id,console.log(s),e.push(s)}Object(i["c"])("/alarmset/batchUpdateAll",e).then(function(e){console.log(e,111234),t.shua(),t.clickok()})}}},r=l,o=(a("d12c"),a("2877")),c=Object(o["a"])(r,s,n,!1,null,"0b19c208",null);e["default"]=c.exports}}]);
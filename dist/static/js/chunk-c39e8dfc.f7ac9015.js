(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c39e8dfc"],{"5eea":function(e,t,r){},e8a7:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-table",{attrs:{data:e.list,"header-row-class-name":e.headerRowClass,"row-class-name":e.rowClass}},[r("el-table-column",{attrs:{prop:"routeNo",width:"54","header-align":"center",align:"center",label:"行驶路线",formatter:e.lineFormat}}),e._v(" "),r("el-table-column",{attrs:{prop:"vehCode","header-align":"center",align:"center",width:"54",label:"车船牌号"}}),e._v(" "),r("el-table-column",{attrs:{prop:"direction","header-align":"center",align:"center",width:"28",label:"方向"}}),e._v(" "),r("el-table-column",{attrs:{prop:"driverName","header-align":"center",align:"center",width:"54",label:"当值司机"}}),e._v(" "),r("el-table-column",{attrs:{prop:"driverContact","header-align":"center",align:"center",width:"54",label:"联系方式"}}),e._v(" "),r("el-table-column",{attrs:{prop:"busHour","header-align":"center",align:"center",width:"54",label:"运营时间"}}),e._v(" "),r("el-table-column",{attrs:{prop:"ifees","header-align":"center",align:"center",width:"54",label:"是否收费",formatter:e.ifeesFormat}})],1)},l=[],n={name:"DetailsList",props:{list:{type:Array,default:null}},methods:{headerRowClass:function(e){e.row,e.rowIndex;return"detail-header"},rowClass:function(e){e.row,e.rowIndex;return"detail-header"},ifeesFormat:function(e,t){return 0===e.ifees?"否":"是"},lineFormat:function(e,t){return"线路"+e.routeNo}}},o=n,i=(r("fde1"),r("2877")),c=Object(i["a"])(o,a,l,!1,null,null,null);t["default"]=c.exports},fde1:function(e,t,r){"use strict";var a=r("5eea"),l=r.n(a);l.a}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b1d94ec","chunk-4cad374f"],{"16bf":function(e,t,n){"use strict";var o=n("fc52"),s=n.n(o);s.a},2017:function(e,t,n){"use strict";var o=n("3b76"),s=n.n(o);s.a},"3b76":function(e,t,n){},4828:function(e,t,n){e.exports=n.p+"static/img/login-text.576fa819.png"},"7e65":function(e,t,n){},"8fdd":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"logo-title",staticStyle:{padding:"0 15px"}},[n("img",{staticClass:"logo",attrs:{src:e.logo,width:"auto",height:"60%",alt:e.sysName}}),e._v(" "),n("span",{staticClass:"sysname"},[e._v(e._s(e.sysName))])])},s=[],r=n("9d64"),i=n.n(r),a=n("83d6"),c=n.n(a),u={name:"LoginLogo",data:function(){return{logo:i.a,sysName:c.a.title}}},l=u,p=(n("be0f"),n("2877")),d=Object(p["a"])(l,o,s,!1,null,"5dbdc7d4",null);t["default"]=d.exports},"9ed6":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container",style:e.loginBG},[n("Logo"),e._v(" "),n("img",{staticClass:"login-text",attrs:{src:e.loginText}}),e._v(" "),n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"}},[n("h5",{staticClass:"username-login"},[e._v("账号登录")]),e._v(" "),n("el-form-item",{class:{"input-focus":e.userinput},attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),n("el-input",{ref:"username",attrs:{placeholder:"请输入用户名",name:"username",type:"text",tabindex:"1",autocomplete:"on",clearable:""},on:{focus:function(t){return e.focusinput(1)},blur:function(t){return e.blurinput(1)}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),e._v(" "),n("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(t){e.capsTooltip=t},expression:"capsTooltip"}},[n("el-form-item",{class:{"input-focus":e.passinput},attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),n("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"请输入密码",name:"password",tabindex:"2",autocomplete:"on"},on:{focus:function(t){return e.focusinput(2)},blur:function(t){return e.blurinput(2)}},nativeOn:{keyup:[function(t){return e.checkCapslock(t)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}]},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),n("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),n("el-button",{staticClass:"login-btn",attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}}},[e._v("登录")]),e._v(" "),n("div",{staticClass:"password-option"},[n("router-link",{attrs:{to:"/retrieve"}},[e._v("\n        找回密码\n      ")])],1)],1)],1)},s=[],r=(n("ac6a"),n("456d"),n("4917"),n("e23e")),i=n.n(r),a=n("4828"),c=n.n(a),u=n("61f7"),l=n("8fdd"),p={name:"Login",components:{Logo:l["default"]},data:function(){var e=function(e,t,n){Object(u["f"])(t)?n():n(new Error("请输入用户名"))},t=function(e,t,n){t.length<6?n(new Error("密码不能少于6位")):n()};return{loginBG:{backgroundImage:"url("+i.a+")",backgroundRepeat:"no-repeat",backgroundSize:"100% auto"},loginText:c.a,loginForm:{username:"admin",password:"111111"},loginRules:{username:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:t}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{},userinput:!1,passinput:!1,checked:!1}},watch:{$route:{handler:function(e){var t=e.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},created:function(){this.keyupEnter()},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{keyupEnter:function(){var e=this;document.onkeydown=function(t){var n=document.getElementsByTagName("body")[0];13===t.keyCode&&t.target.baseURI.match(/ManageSys/)&&t.target===n&&e.handleLogin()}},checkCapslock:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.shiftKey,n=e.key;n&&1===n.length&&(this.capsTooltip=!!(t&&n>="a"&&n<="z"||!t&&n>="A"&&n<="Z")),"CapsLock"===n&&!0===this.capsTooltip&&(this.capsTooltip=!1)},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick(function(){e.$refs.password.focus()})},focusinput:function(e){1===e?this.userinput=!0:this.passinput=!0},blurinput:function(e){1===e?this.userinput=!1:(this.capsTooltip=!1,this.passinput=!1)},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(t){if(!t)return console.log("登录失败！"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then(function(){"/"===e.redirect&&(e.redirect="/home"),e.$router.push({path:e.redirect||"/home",query:e.otherQuery}),"/home"!==e.redirect&&e.$store.dispatch("app/setTopMenuIndex","3"),e.loading=!1}).catch(function(){e.loading=!1})})},getOtherQuery:function(e){return Object.keys(e).reduce(function(t,n){return"redirect"!==n&&(t[n]=e[n]),t},{})}}},d=p,f=(n("2017"),n("16bf"),n("2877")),g=Object(f["a"])(d,o,s,!1,null,"5c4ec44b",null);t["default"]=g.exports},be0f:function(e,t,n){"use strict";var o=n("7e65"),s=n.n(o);s.a},e23e:function(e,t,n){e.exports=n.p+"static/img/login-background.a654c0ce.jpg"},fc52:function(e,t,n){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fbe12ef0"],{2573:function(e,t,s){},"7af1":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"gr-message"},[s("div",{staticClass:"whitek"},[s("div",{staticClass:"photo"},[s("img",{staticClass:"user-avatar",attrs:{src:e.avatar}}),e._v(" "),e.$store.state.permission.buttons.includes("上传头像")?s("p",{staticClass:"text-under",on:{click:e.updateAvatar}},[e._v("修改头像")]):e._e()]),e._v(" "),s("div",{staticClass:"information"},[e._v("个人基本信息")]),e._v(" "),s("div",{staticClass:"mes"},[e._m(0),e._v(" "),s("div",{staticClass:"namea"},[s("p",[e._v(e._s(e.name))]),e._v(" "),s("p",[e._v(e._s(e.post))]),e._v(" "),s("p",[e._v(e._s(e.section))]),e._v(" "),s("p",[e._v(e._s(e.company))]),e._v(" "),s("div",{staticStyle:{display:"flex","margin-top":"-16px"}},[s("p",[e._v(e._s(e.ucode))]),e._v(" "),e.$store.state.permission.buttons.includes("修改密码")?s("p",{staticClass:"text-under p-l",on:{click:function(t){e.showPassword=!0}}},[e._v("修改密码")]):e._e()]),e._v(" "),s("div",{staticStyle:{display:"flex","margin-top":"-12px"}},[s("p",[e._v(e._s(e.mobile))]),e._v(" "),e.$store.state.permission.buttons.includes("修改手机号")?s("p",{staticClass:"text-under p-l",on:{click:function(t){e.showMobile=!0}}},[e._v("修改手机号")]):e._e()])])])]),e._v(" "),s("el-dialog",{attrs:{visible:e.showCropper,title:"修改头像",width:"50%"},on:{"update:visible":function(t){e.showCropper=t}}},[s("cropper",{ref:"cropper",attrs:{id:"avatarCrop",uid:e.uid,"default-url":e.defaultUrl}}),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"el-button-default",attrs:{round:"",size:"mini"},on:{click:e.cancelCropper}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{round:"",size:"mini",type:"primary"},on:{click:e.toCropper}},[e._v("确定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{visible:e.showMobile,title:"修改手机号",width:"50%"},on:{"update:visible":function(t){e.showMobile=t}}},[s("div",{staticClass:"dialog-mobile"},[s("el-form",{ref:"mobileForm",staticClass:"mobile-form",attrs:{model:e.mobileForm,rules:e.mobileRules,autocomplete:"on"}},[s("el-form-item",{attrs:{label:"原手机号："}},[s("el-input",{attrs:{disabled:!0,placeholder:"原手机号"},model:{value:e.mobile,callback:function(t){e.mobile=t},expression:"mobile"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"新手机号：",prop:"newMobile"}},[s("el-input",{attrs:{name:"newMobile",maxlength:"11",clearable:"",placeholder:"新手机号"},model:{value:e.mobileForm.newMobile,callback:function(t){e.$set(e.mobileForm,"newMobile",e._n(t))},expression:"mobileForm.newMobile"}})],1)],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"el-button-default",attrs:{round:"",size:"mini"},on:{click:e.resetMobile}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:e.toMobile}},[e._v("确定")])],1)]),e._v(" "),s("el-dialog",{attrs:{visible:e.showPassword,title:"修改密码",width:"50%"},on:{"update:visible":function(t){e.showPassword=t}}},[s("div",{staticClass:"dialog-password"},[s("el-form",{ref:"passwordForm",staticClass:"password-form",attrs:{model:e.passwordForm,rules:e.passwordRules,autocomplete:"on"}},[s("el-form-item",{attrs:{label:"原密码：",prop:"oldPassword"}},[s("el-input",{attrs:{type:"password",clearable:"",placeholder:"原密码"},model:{value:e.passwordForm.oldPassword,callback:function(t){e.$set(e.passwordForm,"oldPassword",t)},expression:"passwordForm.oldPassword"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"新密码：",prop:"newPassword"}},[s("el-input",{attrs:{type:"password",minlength:"6",name:"newPassword",clearable:"",placeholder:"新密码"},model:{value:e.passwordForm.newPassword,callback:function(t){e.$set(e.passwordForm,"newPassword",t)},expression:"passwordForm.newPassword"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认新密码：",prop:"newPasswordAgain"}},[s("el-input",{attrs:{type:"password",minlength:"6",name:"newPasswordAgain",clearable:"",placeholder:"确认新密码"},model:{value:e.passwordForm.newPasswordAgain,callback:function(t){e.$set(e.passwordForm,"newPasswordAgain",t)},expression:"passwordForm.newPasswordAgain"}})],1)],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"el-button-default",attrs:{round:"",size:"mini"},on:{click:e.resetPassword}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:e.toPassword}},[e._v("确定")])],1)])],1)},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"name"},[s("p",[e._v("姓名")]),e._v(" "),s("p",[e._v("岗位")]),e._v(" "),s("p",[e._v("部门")]),e._v(" "),s("p",[e._v("集团/公司")]),e._v(" "),s("p",[e._v("账号ID")]),e._v(" "),s("p",[e._v("手机号(登录账号)")])])}],o=(s("a481"),s("db72")),i=s("2f62"),n=s("61f7"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"modal-dialog modal-lg",attrs:{id:e.id}},[s("div",{staticClass:"avatar-upload"},[s("label",{staticClass:"el-button el-button--primary",attrs:{for:"avatarInput"}},[e._v("选择图片")]),e._v(" "),s("input",{ref:"imageFile",staticClass:"avatar-input",staticStyle:{visibility:"hidden"},attrs:{id:"avatarInput",type:"file",name:"file",accept:"image/*"},on:{change:e.change}})]),e._v(" "),s("div",{staticClass:"avatar-wrapper"},[s("img",{ref:"cropperImage",attrs:{id:"image",src:e.url,alt:"Picture"}})])])},c=[],d=(s("34ef"),s("4917"),s("28a5"),s("6c7b"),s("c5f6"),s("bab4")),p=s.n(d),u={props:{id:{type:String,default:""},uid:{type:Number,default:0},defaultUrl:{type:String,default:""}},data:function(){return{cropper:null,url:this.defaultUrl,imgCropperData:{accept:"image/jpeg, image/png, image/jpg"}}},created:function(){},mounted:function(){this.$nextTick(function(){this.init()})},methods:{init:function(){this.cropper=new p.a(this.$refs.cropperImage,{aspectRatio:1,viewMode:1,zoomOnWheel:!1,background:!0,rotatable:!0,ready:function(){}}),this.cropper.replace(this.defaultUrl)},getObjectURL:function(e){var t=null;return void 0!==window.createObjectURL?t=window.createObjectURL(e):void 0!==window.URL?t=window.URL.createObjectURL(e):void 0!==window.webkitURL&&(t=window.webkitURL.createObjectURL(e)),t},change:function(e){var t=e.target.files||e.dataTransfer.files;if(t.length){var s=t[0].type,a=t[0].size;if(-1===this.imgCropperData.accept.indexOf(s))return this.$message({message:"请选择jpg、jpeg、png格式图片文件",type:"warning"}),!1;if(a>2097152)return this.$message({message:"请选择2M以下图片文件",type:"warning"}),!1;this.url=this.getObjectURL(t[0]),this.cropper&&this.cropper.replace(this.url)}},getRoundedCanvas:function(e){var t=document.createElement("canvas"),s=t.getContext("2d"),a=e.width,r=e.height;return t.width=a,t.height=r,s.imageSmoothingEnabled=!0,s.drawImage(e,0,0,a,r),s.globalCompositeOperation="destination-in",s.beginPath(),s.arc(a/2,r/2,Math.min(a,r)/2,0,2*Math.PI,!0),s.fill(),t},submit:function(){var e=this,t=null;if(t=this.cropper.getCroppedCanvas(),null!==t){var s=new FormData,a=this.dataURLtoFile(t.toDataURL(),"");this.url=this.getObjectURL(a),this.cropper&&this.cropper.replace(this.url),s.append("file",a),this.$store.dispatch("user/updateAvatar",{uid:this.uid,formData:s}).then(function(){e.$message({message:"头像修改成功",type:"success",duration:2e3})}).catch(function(t){e.$message({message:"修改失败，请稍后重试",type:"warning",duration:2e3})})}},dataURLtoFile:function(e,t){var s=e.split(","),a=s[0].match(/:(.*?);/)[1],r=atob(s[1]),o=r.length,i=new Uint8Array(o);while(o--)i[o]=r.charCodeAt(o);return new File([i],t,{type:a})}}},m=u,w=(s("fa7f"),s("2877")),f=Object(w["a"])(m,l,c,!1,null,null,null),v=f.exports,b=s("c24f"),h={components:{Cropper:v},data:function(){var e=this,t=function(t,s,a){""===s?a(new Error("请输入新手机号码")):Object(n["e"])(s)?s===e.mobile?a(new Error("新手机号不能是原手机号!")):a():a(new Error("手机号输入不正确!"))},s=function(e,t,s){""===t?s(new Error("请输入原密码")):s()},a=function(e,t,s){""===t?s(new Error("请输入新密码")):s()},r=function(t,s,a){""===s?a(new Error("请输入确认新密码")):s!==e.passwordForm.newPassword?a(new Error("两次密码输入不一致")):a()};return{defaultUrl:"",showCropper:!1,showMobile:!1,mobileForm:{newMobile:""},mobileRules:{newMobile:[{required:!0,trigger:"blur",validator:t}]},showPassword:!1,passwordForm:{oldPassword:"",newPassword:"",newPasswordAgain:""},passwordRules:{oldPassword:[{required:!0,trigger:"blur",validator:s},{min:6,message:"密码必须大于6位",trigger:"blur"}],newPassword:[{required:!0,trigger:"blur",validator:a},{min:6,message:"密码必须大于6位",trigger:"blur"}],newPasswordAgain:[{required:!0,trigger:"blur",validator:r},{min:6,message:"密码必须大于6位",trigger:"blur"}]}}},computed:Object(o["a"])({},Object(i["b"])(["avatar","uid","ucode","name","mobile","post","section","company"])),created:function(){this.defaultUrl=this.avatar},methods:{updateAvatar:function(){this.showCropper=!0},toCropper:function(){this.$refs.cropper.submit(),this.cancelCropper()},cancelCropper:function(){this.showCropper=!1,this.$refs.cropper.url=this.avatar,this.$refs.cropper.cropper.replace(this.avatar),this.$refs.cropper.$refs.imageFile.value=null},toMobile:function(){var e=this;this.$refs.mobileForm.validate(function(t){t&&e.$store.dispatch("user/updateMobile",{uid:e.uid,mobile:{phone:e.mobileForm.newMobile}}).then(function(){e.$message({message:"手机号修改成功，登录账号为新手机号",type:"success",duration:2e3}),e.resetMobile()}).catch(function(t){e.$message({message:"手机号修改失败，请稍后重试",type:"warning",duration:2e3})})})},resetMobile:function(){this.showMobile=!1,this.$refs.mobileForm.resetFields()},toPassword:function(){var e=this;this.$refs.passwordForm.validate(function(t){t&&new Promise(function(t,s){Object(b["j"])(e.uid,{newpwd:e.passwordForm.newPasswordAgain,oldpwd:e.passwordForm.oldPassword}).then(function(s){"SUCCESS"===s.msg?(e.$message({message:"密码修改成功",type:"success",duration:3e3}),e.resetPassword(),t()):e.$message({message:s.msg,type:"warning",duration:3e3})}).catch(function(e){s(e)})}).then(function(e){})})},resetPassword:function(){this.showPassword=!1,this.$refs.passwordForm.resetFields()}}},g=h,_=(s("8fea"),Object(w["a"])(g,a,r,!1,null,null,null));t["default"]=_.exports},"8fea":function(e,t,s){"use strict";var a=s("e2a0"),r=s.n(a);r.a},e2a0:function(e,t,s){},fa7f:function(e,t,s){"use strict";var a=s("2573"),r=s.n(a);r.a}}]);
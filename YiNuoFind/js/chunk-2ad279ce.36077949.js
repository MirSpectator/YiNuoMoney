(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ad279ce","chunk-2d21802b"],{"18a7":function(t,e,s){"use strict";var i=s("b5c2"),a=s.n(i);a.a},"1e4b":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home_login"},[s("div",{staticClass:"bcg"}),s("div",{staticClass:"logo"},[s("div",{staticClass:"logo-bcg"},[s("img",{attrs:{src:t.imgSrc,alt:""}})])]),s("logins",{directives:[{name:"show",rawName:"v-show",value:t.IFlogin,expression:"IFlogin"}]}),s("registered",{directives:[{name:"show",rawName:"v-show",value:t.IFregistered,expression:"IFregistered"}]}),s("div",{staticStyle:{"font-size":"13px",color:"#1489ed",width:"90%",margin:"0 auto"}},[s("div",{staticStyle:{width:"64px"},on:{click:t.resClick}},[t._v(t._s(t.msg))])])],1)},a=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"froms"},[s("toast_loading",{attrs:{show:t.loading}}),s("van-form",{on:{submit:t.onSubmit}},[s("van-field",{attrs:{name:"用户名",placeholder:"手机号/用户名"},model:{value:t.user.user_phone,callback:function(e){t.$set(t.user,"user_phone",e)},expression:"user.user_phone"}}),s("van-field",{attrs:{type:"password",name:"密码",placeholder:"密码"},model:{value:t.user.user_pwd,callback:function(e){t.$set(t.user,"user_pwd",e)},expression:"user.user_pwd"}}),s("div",{staticStyle:{margin:"26px 0 0"}},[s("van-button",{attrs:{block:"",type:"info","native-type":"submit"}},[t._v("提交")])],1)],1)],1)])},n=[],r={name:"login",data:function(){return{user:{user_phone:"",user_pwd:""},msgPhone:"发送验证码",totalTime:60,canClick:!0,loading:!1}},methods:{onSubmit:function(t){var e=this,s=!0;if(""==this.username)return this.$toast({position:"bottom",message:"手机号/用户名不能为空"}),s=!1,!1;if(""==this.password)return this.$toast({position:"bottom",message:"密码不能为空"}),s=!1,!1;this.loading=s;var i=JSON.stringify(this.user),a={jsonUser:i};this.$addtitle("user/select_User.po",a).then((function(t){200===t.status&&(e.loading=!1,t.data.data instanceof Array==s?(e.$toast.success("登录成功"),sessionStorage.setItem("user",JSON.stringify(t.data.data)),localStorage.setItem("user_local",JSON.stringify(t.data.data)),e.$store.commit("company_id",t.data.data[0].user_company),""==t.data.data[0].user_company||void 0==t.data.data[0].user_company||null==t.data.data[0].user_company?e.$router.push({name:"bind_this"}):e.$router.push({name:"home"})):"暂无数据"==t.data.data?e.$toast.fail("账号或密码有误"):e.$toast.fail("没有此用户请注册"))})).catch((function(t){e.$toast.fail("数据异常")}))},gotime:function(){var t=this;if(this.canClick){this.canClick=!1,this.msgPhone=this.totalTime+"s后重新发送";localStorage.getItem("time");var e=window.setInterval((function(){t.totalTime--,localStorage.setItem("time",t.totalTime),t.msgPhone=t.totalTime+"s后重新发送",t.totalTime<0&&(window.clearInterval(e),t.msgPhone="重新发送验证码",t.totalTime=60,t.canClick=!0)}),1e3)}}},created:function(){}},u=r,l=s("2877"),c=Object(l["a"])(u,o,n,!1,null,"e18d6f0c",null),d=c.exports,m=s("c8bb"),h={name:"home_login",data:function(){return{imgSrc:s("390a"),IFlogin:!0,IFregistered:!1,msg:"立即注册"}},methods:{resClick:function(){!0===this.IFlogin?(this.IFlogin=!1,this.IFregistered=!0,this.msg="登录"):(this.IFlogin=!0,this.IFregistered=!1,this.msg="立即注册")}},created:function(){},components:{logins:d,registered:m["default"]}},g=h,p=(s("18a7"),Object(l["a"])(g,i,a,!1,null,"3d1457e0",null));e["default"]=p.exports},"390a":function(t,e,s){t.exports=s.p+"img/2146070222.5abdcb9e.jpg"},b5c2:function(t,e,s){},c8bb:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"registered"},[s("toast_loading",{attrs:{show:t.loadding}}),s("div",{staticClass:"froms"},[s("van-form",{on:{submit:t.onSubmit}},[s("van-field",{attrs:{name:"手机号",placeholder:"手机号"},model:{value:t.user.user_phone,callback:function(e){t.$set(t.user,"user_phone",e)},expression:"user.user_phone"}}),s("van-field",{attrs:{name:"验证码",placeholder:"验证码"},model:{value:t.user.code,callback:function(e){t.$set(t.user,"code",e)},expression:"user.code"}}),s("van-field",{attrs:{type:"password",name:"密码",placeholder:"密码"},model:{value:t.user.user_pwd,callback:function(e){t.$set(t.user,"user_pwd",e)},expression:"user.user_pwd"}}),s("van-field",{attrs:{name:"姓名",placeholder:"姓名"},model:{value:t.user.user_name,callback:function(e){t.$set(t.user,"user_name",e)},expression:"user.user_name"}}),s("div",{staticClass:"time",class:{canClick:!t.canClick},on:{click:t.gotime}},[t._v(t._s(t.msgPhone))]),s("div",{staticStyle:{margin:"26px 0 0"}},[s("van-button",{attrs:{block:"",type:"info","native-type":"submit"}},[t._v("提交")])],1)],1)],1)],1)},a=[],o={name:"registered",inject:["reload"],data:function(){return{user:{user_phone:"",code:"",user_pwd:"",user_name:"",msgId:""},msgPhone:"发送验证码",totalTime:60,canClick:!0,loadding:!1}},created:function(){},methods:{onSubmit:function(){var t=this,e=/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,s=/^[0-9]*$/,i=/^[a-zA-Z0-9_]{0,}$/,a=/^[\u4E00-\u9FA5]{2,10}$/;if(""==this.user.user_phone)return this.$toast({position:"bottom",message:"手机号不能为空"}),!1,!1;if(!e.test(this.user.user_phone))return this.$toast({position:"bottom",message:"手机格式出错"}),!1,!1;if(""==this.user.code)return this.$toast({position:"bottom",message:"验证码不能为空"}),!1,!1;if(!s.test(this.user.code))return this.$toast({position:"bottom",message:"验证码格式有误"}),!1,!1;if(""==this.user.user_pwd)return this.$toast({position:"bottom",message:"密码不能为空"}),!1,!1;if(!i.test(this.user_pwd))return this.$toast({position:"bottom",message:"密码格式有误"}),!1,!1;if(""==this.user.user_name)return this.$toast({position:"bottom",message:"姓名不能为空"}),!1,!1;if(!a.test(this.user.user_name))return this.$toast({position:"bottom",message:"姓名格式有误"}),!1,!1;this.loadding=!0;var o=JSON.stringify(this.user),n={jsonUser:o};this.$addtitle("user/add_User.po",n).then((function(e){if(t.loadding=!1,200===e.status)if("注册成功"==e.data.data){t.$toast.success("注册成功"),t.$router.push({name:"bind_this"});var s=JSON.stringify({user_id:e.data.user_id,msg:t.user.user_name});sessionStorage.setItem("user_id",s)}else t.$toast.fail("账号或密码有误")})).catch((function(e){t.$toast.fail("数据异常"),t.loadding=!1}))},gotime:function(){var t=this;if(this.canClick){var e=/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;if(""==this.user.user_phone)return this.$toast({position:"bottom",message:"手机号不能为空"}),!1,!1;if(!e.test(this.user.user_phone))return this.$toast({position:"bottom",message:"手机格式出错"}),!1,!1;this.axios.get("user/code.po?phone="+this.user.user_phone).then((function(e){t.user.msgId=e.data.data})),this.canClick=!1,this.msgPhone=this.totalTime+"s后重新发送";var s=window.setInterval((function(){t.totalTime--,t.msgPhone=t.totalTime+"s后重新发送",t.totalTime<0&&(window.clearInterval(s),t.msgPhone="重新发送验证码",t.totalTime=60,t.canClick=!0)}),1e3)}}}},n=o,r=s("2877"),u=Object(r["a"])(n,i,a,!1,null,"4f71190f",null);e["default"]=u.exports}}]);
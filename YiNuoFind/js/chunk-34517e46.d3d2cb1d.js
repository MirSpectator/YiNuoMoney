(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34517e46","chunk-1be87738"],{"1d78":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"transfer_money"},[n("header_header",{attrs:{title:"现金录入"}}),n("title_header",{attrs:{title_header:e.title,title_header_one:e.title_header,title_header_show:!0,"all-money":e.money}}),n("van-field",{attrs:{name:"radio",label:"现金录入"},scopedSlots:e._u([{key:"input",fn:function(){return[n("van-radio-group",{attrs:{direction:"horizontal"},on:{change:e.onConfirm},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[n("van-radio",{attrs:{name:"支出"}},[e._v("支出")]),n("van-radio",{attrs:{name:"收入"}},[e._v("收入")]),n("van-radio",{attrs:{name:"转账"}},[e._v("转账")])],1)]},proxy:!0}])}),n("income",{attrs:{income:e.income}}),n("expenditure",{attrs:{"expenditure-show":e.expenditure}}),n("transfer",{attrs:{transfer_show:e.transfer}}),n("all_bank")],1)},i=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.income,expression:"income"}],staticClass:"income"},[n("toast_loading",{attrs:{show:e.loadding}}),n("van-form",{on:{submit:e.incomeSubmit}},[n("class_select",{on:{monitor:e.fund_monitor}}),n("site_people",{attrs:{labe:"工地名称",place:"请输入工地名称"},on:{site_peoples:e.siteId},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}}),n("people",{attrs:{peopleLabel:"相关人",placePeople:"请输入相关人"},on:{peopleList:e.peopleID},model:{value:e.listRelevant,callback:function(t){e.listRelevant=t},expression:"listRelevant"}}),e.reiceShow?n("van-field",{attrs:{readonly:"",clickable:"",name:"picker",value:e.reice,label:"应收款项",placeholder:"点击应收款项"},on:{click:function(t){e.reicePicker=!0}}}):e._e(),n("van-popup",{attrs:{position:"bottom"},model:{value:e.reicePicker,callback:function(t){e.reicePicker=t},expression:"reicePicker"}},[n("van-picker",{attrs:{"show-toolbar":"",columns:e.reicecolumns},on:{confirm:e.onConfirm,cancel:function(t){e.reicePicker=!1}}})],1),n("time_data",{attrs:{label:"日期"},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}}),n("van-field",{attrs:{name:"备注",label:"备注",placeholder:"请输入备注"},model:{value:e.clearBei,callback:function(t){e.clearBei=t},expression:"clearBei"}}),n("van-field",{attrs:{name:"转入账户",label:"转入账户",placeholder:"请选择下列银行卡",disabled:""},model:{value:e.money_bank_person,callback:function(t){e.money_bank_person=t},expression:"money_bank_person"}}),n("van-field",{attrs:{name:"金额",label:"金额",placeholder:"￥"},model:{value:e.money,callback:function(t){e.money=t},expression:"money"}}),n("fee",{attrs:{label:"手续费"},on:{rate:e.money_rateConfirm},model:{value:e.money_rate,callback:function(t){e.money_rate=t},expression:"money_rate"}}),n("van-field",{attrs:{name:"实际收入",label:"实际收入",placeholder:"请输入金额"},model:{value:e.money_actual,callback:function(t){e.money_actual=t},expression:"money_actual"}}),n("div",{staticClass:"che"},[n("label"),n("van-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("转为应付")])],1),n("div",{staticStyle:{margin:"16px"}},[n("submit_submit",{attrs:{text:"Transfes"}})],1)],1)],1)},o=[],r=(n("b0c0"),n("a9e3"),{name:"income",inject:["reload"],props:["income"],data:function(){return{site:"",site_id:"",listRelevant:"",listRelevant_id:"",fund_detail_id:"1",reicecolumns:[],money_bank_name:"",reice:"",dateTime:"",clearBei:"",money_bank_id:"",money:"",money_rate:"",checked:!1,reicePicker:!1,reiceShow:!1,loadding:!1,money_bank_person:"",money_get:"",ceew:{}}},created:function(){this.bank(),this.dateTime=this.$time(new Date)},methods:{onConfirm:function(e){console.log(e)},fund_monitor:function(e){this.fund_detail_id=e},money_rateConfirm:function(e){this.money_rate=e},incomeSubmit:function(e,t){var n=this;if(""==this.detailed)return this.$toast({position:"bottom",message:"款项名称不能为空"}),!1,!1;if(1==this.slimShow&&""==this.slim)return this.$toast({position:"bottom",message:"款项详细不能为空"}),!1,!1;if(""==this.dateTime)return this.$toast({position:"bottom",message:"日期不能为空"}),!1,!1;if(""==this.mongey_bank)return this.$toast({position:"bottom",message:"转入账户不能为空"}),!1,!1;if(""==this.money)return this.$toast({position:"bottom",message:"金额不能为空"}),!1,!1;this.loadding=!0;var a={customer_id:this.site_id,fund_person_id:this.listRelevant_id,fund_name_id:this.fund_detail_id,fund_money:Number(this.money),fund_text:this.clearBei,fund_detail_text:this.clearBei,fund_detail_transaction_text:this.clearBei,fund_detail_money:Number(this.money),fund_detail_transaction_money:Number(this.money),fund_detail_transaction_bank_id:this.money_bank_id,fund_date:this.dateTime,fund_detail_date:this.dateTime,fund_detail_transaction_date:this.dateTime,company_id:this.$store.getters.company_id,sj_money:this.money_get},i=JSON.stringify(a),s={jsonFund:i};this.$addtitle("fund/out_Enter.po",s).then((function(e){200===e.status&&(n.loadding=!1,"添加成功"==e.data.data?(n.$toast.success(e.data.data),n.reload()):n.$toast.fail(e.data.data))})).catch((function(e){n.$toast.fail("数据异常")}))},siteId:function(e,t){this.site=e,this.site_id=t,this.ceew["customer_id"]=t;var n=JSON.stringify(this.ceew);this.fund_ciew(n)},peopleID:function(e,t){this.listRelevant=e,this.listRelevant_id=t,this.ceew["fund_person_id"]=t;var n=JSON.stringify(this.ceew);this.fund_ciew(n)},fund_ciew:function(e){this.$addtitle("fund/select_beforehand_fund.po",e).then((function(e){console.log(e)}))},bank:function(){if(JSON.parse(sessionStorage.getItem("bank"))){var e=JSON.parse(sessionStorage.getItem("bank"));this.$store.commit("income_bank",{name:e.name,id:e.id})}else;}},computed:{mongey_bank:function(){this.money_bank_id=this.$store.state.income_bank_id,this.money_bank_name=this.$store.state.money_bank_name;var e="";return""!==this.$store.state.income_bank_person&&""!==this.$store.state.income_bank&&void 0!==this.$store.state.income_bank_person&&void 0!==this.$store.state.income_bank&&(e=this.$store.state.income_bank_person+" - "+this.$store.state.income_bank),e},money_actual:{get:function(){if(""===this.money_rate||void 0===this.money_rate){var e=this.money;return e}var t=this.money-this.money*this.money_rate,n=Math.floor(100*t)/100;return this.money_get=n,n},set:function(e){this.money_get=e}}},watch:{mongey_bank:function(e){this.money_bank_person=e}}}),l=r,_=(n("3590"),n("2877")),d=Object(_["a"])(l,s,o,!1,null,"2465d1d0",null),c=d.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.expenditureShow,expression:"expenditureShow"}],staticClass:"expenditure"},[n("toast_loading",{attrs:{show:e.loadding}}),n("van-form",{on:{submit:e.expendonSubmit}},[n("class_select",{on:{monitor:e.fund_monitor}}),n("site_people",{attrs:{labe:"工地名称",place:"请输入工地名称"},on:{site_peoples:e.siteId},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}}),n("people",{attrs:{peopleLabel:"收款人",placePeople:"请输入收款人"},on:{peopleList:e.peopleID},model:{value:e.fund_person,callback:function(t){e.fund_person=t},expression:"fund_person"}}),n("time_data",{attrs:{label:"日期"},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}}),n("van-field",{attrs:{name:"金额",label:"金额",placeholder:"￥"},model:{value:e.bank_deal_money,callback:function(t){e.bank_deal_money=t},expression:"bank_deal_money"}}),n("van-field",{attrs:{name:"备注",label:"备注",placeholder:"请输入备注"},model:{value:e.clearBei,callback:function(t){e.clearBei=t},expression:"clearBei"}}),n("van-field",{attrs:{name:"转出账户",label:"转出账户",placeholder:"请选择下列银行卡",disabled:""},model:{value:e.money_bank_person,callback:function(t){e.money_bank_person=t},expression:"money_bank_person"}}),n("div",{staticClass:"che"},[n("label"),n("van-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("转为应收")])],1),n("div",{staticStyle:{margin:"16px"}},[n("submit_submit",{attrs:{text:"Transfers"}})],1)],1)],1)},u=[],f={name:"expenditure",inject:["reload"],props:["expenditureShow"],data:function(){return{site:"",site_id:"",fund_person:"",fund_person_id:"",fund_detail_id:"",dateTime:"",bank_deal_money:"",clearBei:"",money_bank_id:"",checked:!1,loadding:!1,money_bank_person:""}},methods:{fund_monitor:function(e){this.fund_detail_id=e},siteId:function(e,t){this.site=e,this.site_id=t},peopleID:function(e,t){this.fund_person=e,this.fund_person_id=t},expendonSubmit:function(){var e=this;if(""==this.detailed)return this.$toast({position:"bottom",message:"款项名称不能为空"}),!1,!1;if(1==this.slimShow&&""==this.slim)return this.$toast({position:"bottom",message:"款项详细不能为空"}),!1,!1;if(""==this.dateTime)return this.$toast({position:"bottom",message:"日期不能为空"}),!1,!1;if(""==this.mongey_bank)return this.$toast({position:"bottom",message:"转出账户不能为空"}),!1,!1;if(""==this.bank_deal_money)return this.$toast({position:"bottom",message:"金额不能为空"}),!1,!1;this.loadding=!0;var t={customer_id:this.site_id,fund_person_id:this.fund_person_id,fund_name_id:this.fund_detail_id,fund_money:Number(-this.bank_deal_money),fund_text:this.clearBei,fund_detail_text:this.clearBei,fund_detail_transaction_text:this.clearBei,fund_detail_money:Number(-this.bank_deal_money),fund_detail_transaction_money:Number(-this.bank_deal_money),fund_detail_transaction_bank_id:this.money_bank_id,fund_date:this.dateTime,fund_detail_date:this.dateTime,fund_detail_transaction_date:this.dateTime,company_id:this.$store.getters.company_id},n=JSON.stringify(t),a={jsonFund:n};this.$addtitle("fund/out_Enter.po",a).then((function(t){200===t.status&&(e.loadding=!1,"添加成功"==t.data.data?(e.$toast.success(t.data.data),e.reload()):e.$toast.fail(t.data.data))})).catch((function(t){e.$toast.fail("数据异常")}))},bank:function(){if(JSON.parse(sessionStorage.getItem("bank"))){var e=JSON.parse(sessionStorage.getItem("bank"));this.$store.commit("income_bank",{name:e.name,id:e.id})}else;}},created:function(){this.bank(),this.dateTime=this.$time(new Date)},computed:{mongey_bank:function(){this.money_bank_id=this.$store.state.income_bank_id;var e="";return""!==this.$store.state.income_bank_person&&""!==this.$store.state.income_bank&&void 0!==this.$store.state.income_bank_person&&void 0!==this.$store.state.income_bank&&(e=this.$store.state.income_bank_person+" - "+this.$store.state.income_bank),e}},watch:{mongey_bank:function(e){this.money_bank_person=e}}},h=f,b=(n("f36c"),Object(_["a"])(h,m,u,!1,null,"b400000a",null)),p=b.exports,k=n("8d06"),v={name:"transfer_money",components:{income:c,expenditure:p,transfer:k["default"]},data:function(){return{income:!0,expenditure:!1,title:"支出",title_header:"Cash entry",value:"支出",transfer:!1}},methods:{onConfirm:function(e){this.value=e,sessionStorage.setItem("transfer_money",e),this.showIcomePicker=!1,this.trans()},trans:function(){"收入"==this.value?(this.income=!0,this.expenditure=!1,this.transfer=!1,this.title="收入",this.title_header="Cash entry"):"支出"==this.value?(this.expenditure=!0,this.income=!1,this.transfer=!1,this.title="支出",this.title_header="expenditure"):"转账"==this.value&&(this.transfer=!0,this.income=!1,this.expenditure=!1,this.title="转账",this.title_header="transfer")},mm:function(){var e=sessionStorage.getItem("transfer_money");this.value=null==e?"支出":e}},created:function(){this.mm(),this.trans()},computed:{money:function(){return this.$store.state.allMoney}}},y=v,g=(n("4c42"),Object(_["a"])(y,a,i,!1,null,"1000957a",null));t["default"]=g.exports},3590:function(e,t,n){"use strict";var a=n("ac47"),i=n.n(a);i.a},"4c42":function(e,t,n){"use strict";var a=n("5908"),i=n.n(a);i.a},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var a=n("1d80"),i=n("5899"),s="["+i+"]",o=RegExp("^"+s+s+"*"),r=RegExp(s+s+"*$"),l=function(e){return function(t){var n=String(a(t));return 1&e&&(n=n.replace(o,"")),2&e&&(n=n.replace(r,"")),n}};e.exports={start:l(1),end:l(2),trim:l(3)}},5908:function(e,t,n){},7156:function(e,t,n){var a=n("861d"),i=n("d2bb");e.exports=function(e,t,n){var s,o;return i&&"function"==typeof(s=t.constructor)&&s!==n&&a(o=s.prototype)&&o!==n.prototype&&i(e,o),e}},"843a":function(e,t,n){},"8d06":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.transfer_show,expression:"transfer_show"}],staticClass:"transfer"},[n("toast_loading",{attrs:{show:e.loading}}),n("van-form",{on:{submit:e.transferSubmit}},[n("van-field",{attrs:{name:"转出",label:"转出",placeholder:"请选择下列银行卡",disabled:""},model:{value:e.bank_out_money,callback:function(t){e.bank_out_money=t},expression:"bank_out_money"}}),n("van-field",{attrs:{name:"转入",label:"转入",placeholder:"请选择下列银行卡",disabled:""},model:{value:e.bank_enter_money,callback:function(t){e.bank_enter_money=t},expression:"bank_enter_money"}}),n("time_data",{attrs:{label:"日期"},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}}),n("van-field",{attrs:{name:"金额",label:"金额",placeholder:"￥"},model:{value:e.bank_deal_money,callback:function(t){e.bank_deal_money=t},expression:"bank_deal_money"}}),n("fee",{attrs:{label:"转账费率"},on:{rate:e.money_rateConfirm},model:{value:e.bank_deal_rate,callback:function(t){e.bank_deal_rate=t},expression:"bank_deal_rate"}}),n("van-field",{attrs:{name:"实际转账",label:"实际转账",placeholder:"￥"},model:{value:e.allMoneys,callback:function(t){e.allMoneys=t},expression:"allMoneys"}}),n("div",{staticStyle:{margin:"16px"}},[n("submit_submit",{attrs:{text:"Transfers"}})],1)],1)],1)},i=[],s=(n("a9e3"),{inject:["reload"],name:"transfer",props:["transfer_show"],data:function(){return{bank_out:"",bank_out_id:"",bank_enter:"",bank_enter_id:"",dateTime:"",bank_deal_money:"",bank_deal_rate:"",loading:!1,bank_enter_money:"",bank_out_money:"",money_get:""}},created:function(){this.dateTime=this.$time(new Date)},methods:{money_rateConfirm:function(e){this.bank_deal_rate=e},transferSubmit:function(){var e=this;if(""==this.bank_out_com)return this.$toast({position:"bottom",message:"转出不能为空"}),!1,!1;if(""==this.bank_enter_com)return this.$toast({position:"bottom",message:"转入不能为空"}),!1,!1;if(this.bank_out_id==this.bank_enter_id)return this.$toast({position:"bottom",message:"转出与转入银行卡不能相同"}),!1,!1;if(""==this.dateTime)return this.$toast({position:"bottom",message:"日期不能为空"}),!1,!1;if(""==this.bank_deal_money)return this.$toast({position:"bottom",message:"金额不能为空"}),!1,!1;this.loading=!0;var t={bank_id:this.bank_out_id,bank_deal_date:this.dateTime,bank_deal_money:Number(this.bank_deal_money),company_id:this.$store.state.company_id,sj_money:this.money_get},n={jsonBankDetail:JSON.stringify(t),bank_id:this.bank_enter_id};this.$addtitle("bankDetail/add_Bank_Detail.po",n).then((function(t){e.loading=!1,200===t.status&&("访问成功"==t.data.msg?(e.$toast.success("转账成功"),e.reload(),e.$store.commit("bank_out",""),e.$store.state.transfer_bank_name_out="",e.$store.state.transfer_bank_name_out_id="",e.$store.state.transfer_bank_name_enter="",e.$store.state.transfer_bank_name_enter_id=""):e.$toast.fail("转账异常"))})).catch((function(t){e.$toast.fail("数据异常"),e.loading=!1}))}},computed:{bank_out_com:function(){this.bank_out_id=this.$store.state.transfer_bank_name_out_id;var e="";return""!==this.$store.state.transfer_bank_name_out&&""!==this.$store.state.transfer_bank_person_out&&(e=this.$store.state.transfer_bank_name_out+" - "+this.$store.state.transfer_bank_person_out),e},bank_enter_com:function(){this.bank_enter_id=this.$store.state.transfer_bank_name_enter_id;var e="";return""!==this.$store.state.transfer_bank_name_enter&&""!==this.$store.state.transfer_bank_person&&void 0!==this.$store.state.transfer_bank_name_enter&&void 0!==this.$store.state.transfer_bank_person&&(e=this.$store.state.transfer_bank_name_enter+" - "+this.$store.state.transfer_bank_person),e},allMoneys:{get:function(){if(""===this.bank_deal_rate||void 0===this.bank_deal_rate){var e=this.bank_deal_money;return this.money_get=e,e}var t=this.bank_deal_money-this.bank_deal_money*this.bank_deal_rate,n=Math.floor(100*t)/100;return this.money_get=n,n},set:function(e){this.money_get=e}}},watch:{bank_enter_com:function(e){this.bank_enter_money=e},bank_out_com:function(e){this.bank_out_money=e}}}),o=s,r=(n("d545"),n("2877")),l=Object(r["a"])(o,a,i,!1,null,"e0df65e6",null);t["default"]=l.exports},a9e3:function(e,t,n){"use strict";var a=n("83ab"),i=n("da84"),s=n("94ca"),o=n("6eeb"),r=n("5135"),l=n("c6b6"),_=n("7156"),d=n("c04e"),c=n("d039"),m=n("7c73"),u=n("241c").f,f=n("06cf").f,h=n("9bf2").f,b=n("58a8").trim,p="Number",k=i[p],v=k.prototype,y=l(m(v))==p,g=function(e){var t,n,a,i,s,o,r,l,_=d(e,!1);if("string"==typeof _&&_.length>2)if(_=b(_),t=_.charCodeAt(0),43===t||45===t){if(n=_.charCodeAt(2),88===n||120===n)return NaN}else if(48===t){switch(_.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+_}for(s=_.slice(2),o=s.length,r=0;r<o;r++)if(l=s.charCodeAt(r),l<48||l>i)return NaN;return parseInt(s,a)}return+_};if(s(p,!k(" 0o1")||!k("0b1")||k("+0x1"))){for(var $,x=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof x&&(y?c((function(){v.valueOf.call(n)})):l(n)!=p)?_(new k(g(t)),n,x):g(t)},w=a?u(k):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;w.length>N;N++)r(k,$=w[N])&&!r(x,$)&&h(x,$,f(k,$));x.prototype=v,v.constructor=x,o(i,p,x)}},ac47:function(e,t,n){},b1f8:function(e,t,n){},d545:function(e,t,n){"use strict";var a=n("b1f8"),i=n.n(a);i.a},f36c:function(e,t,n){"use strict";var a=n("843a"),i=n.n(a);i.a}}]);
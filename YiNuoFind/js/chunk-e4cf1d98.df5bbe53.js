(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e4cf1d98"],{1502:function(t,e,n){},"247d":function(t,e,n){"use strict";var a=n("1502"),s=n.n(a);s.a},"45fc":function(t,e,n){"use strict";var a=n("23e7"),s=n("b727").some,o=n("a640"),i=n("ae40"),r=o("some"),d=i("some");a({target:"Array",proto:!0,forced:!r||!d},{some:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}})},"792f":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"people"},[n("header_header",{attrs:{title:"添加相关人"}}),n("toast_loading",{attrs:{show:t.loadding}}),n("div",{staticClass:"i-from"},[n("van-form",{on:{submit:t.onSubmit}},[n("van-field",{attrs:{name:"相关人",label:"相关人",placeholder:"请输入相关人"},model:{value:t.people.fund_person,callback:function(e){t.$set(t.people,"fund_person",e)},expression:"people.fund_person"}}),n("van-field",{attrs:{name:"radio",label:"职位类型"},scopedSlots:t._u([{key:"input",fn:function(){return[n("van-radio-group",{attrs:{direction:"horizontal"},model:{value:t.people.fund_stale,callback:function(e){t.$set(t.people,"fund_stale",e)},expression:"people.fund_stale"}},[n("van-radio",{attrs:{name:"1"}},[t._v("相关人")]),n("van-radio",{attrs:{name:"2"}},[t._v("项目负责人")])],1)]},proxy:!0}])}),n("div",{staticStyle:{margin:"16px"}},[n("submit_submit",{attrs:{text:"提交"}})],1)],1)],1),n("div",{staticClass:"i-from"},[n("van-field",{attrs:{label:"快速搜索",placeholder:"请输入关键字"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),n("table",{attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[t._m(0),t._l(t.list_data_search,(function(e,a){return n("tr",{key:a},[n("td",[n("span",[t._v(t._s(e.fund_person_id))])]),n("td",[n("span",[t._v(t._s(e.fund_person))])]),n("td",[n("span",[t._v(t._s(e.fund_stale))])]),n("td",[n("span",{on:{click:function(n){return t.deleteClick(e)}}},[t._v("删除")])])])}))],2)],1)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",[n("span",[t._v("id")])]),n("th",[n("span",[t._v("名称")])]),n("th",[n("span",[t._v("职位类型")])]),n("th",[n("span",[t._v("操作")])])])}],o=(n("d81d"),n("45fc"),n("a434"),n("ac1f"),n("841c"),{name:"people",inject:["reload"],data:function(){return{loadding:!1,list_data:[],search:"",people:{fund_person:"",fund_stale:"",company_id:""}}},created:function(){this.comp(),this.list()},methods:{comp:function(){if(null!==sessionStorage.getItem("user")){var t=JSON.parse(sessionStorage.getItem("user"))[0].user_company;this.people.company_id=t}else if(null!==sessionStorage.getItem("company_id")){var e=sessionStorage.getItem("company_id");this.people.company_id=e}},onSubmit:function(){var t=this,e=JSON.stringify(this.people),n={jsonFungPerson:e};this.loadding=!0,this.$addtitle("fund_person/add_Fund_Person.po",n).then((function(e){200===e.status&&(t.loadding=!1,"添加成功"==e.data.data?(t.$toast.success(e.data.data),t.reload()):t.$toast.fail("添加失败"))})).catch((function(e){t.$toast.fail("数据异常")}))},deleteClick:function(t){var e=this;this.loadding=!0,this.$moneyGet("fund_person/delete_Fund_Person.po?fund_person_id="+t.fund_person_id).then((function(n){200===n.status&&(e.loding=!1,"删除成功"==n.data.data?(e.loadding=!1,e.$toast.success(n.data.data),e.list_data.some((function(n,a){if(n.fund_person_id==t.fund_person_id)return e.list_data.splice(a,1),!0}))):e.$toast.fail(n.data.data))})).catch((function(t){e.$toast.fail("数据异常")}))},list:function(){var t=this,e=this.$store.state.company_id;this.$moneyGet("fund_person/select_Fund_Person.po?fund_stale=1&company_id="+e).then((function(e){var n=e.data.data;"暂无数据"!==n&&(n.map((function(t){1===t.fund_stale?t.fund_stale="相关人":2===t.fund_stale&&(t.fund_stale="项目负责人")})),t.list_data=n)}))}},computed:{list_data_search:function(){var t=this,e=[];return this.list_data.map((function(n){-1==n.fund_person.search(t.search)&&-1==n.fund_stale.search(t.search)||e.push(n)})),e}}}),i=o,r=(n("247d"),n("2877")),d=Object(r["a"])(i,a,s,!1,null,"7ba139b4",null);e["default"]=d.exports},a434:function(t,e,n){"use strict";var a=n("23e7"),s=n("23cb"),o=n("a691"),i=n("50c4"),r=n("7b0b"),d=n("65f0"),l=n("8418"),c=n("1dde"),u=n("ae40"),f=c("splice"),p=u("splice",{ACCESSORS:!0,0:0,1:2}),_=Math.max,h=Math.min,m=9007199254740991,v="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var n,a,c,u,f,p,g=r(this),b=i(g.length),y=s(t,b),$=arguments.length;if(0===$?n=a=0:1===$?(n=0,a=b-y):(n=$-2,a=h(_(o(e),0),b-y)),b+n-a>m)throw TypeError(v);for(c=d(g,a),u=0;u<a;u++)f=y+u,f in g&&l(c,u,g[f]);if(c.length=a,n<a){for(u=y;u<b-a;u++)f=u+a,p=u+n,f in g?g[p]=g[f]:delete g[p];for(u=b;u>b-a+n;u--)delete g[u-1]}else if(n>a)for(u=b-a;u>y;u--)f=u+a-1,p=u+n-1,f in g?g[p]=g[f]:delete g[p];for(u=0;u<n;u++)g[u+y]=arguments[u+2];return g.length=b-a+n,c}})},a640:function(t,e,n){"use strict";var a=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&a((function(){n.call(null,e||function(){throw 1},1)}))}}}]);
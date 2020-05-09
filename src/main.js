import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {add,moneyGet,time} from './components/module_js/module_js'  //封装post get 接口
import submit_submit from "./components/submit_submit" //保存按钮
import header_header from "./components/header_header" //导航条
import title_header from "./components/title_header"    //标题语
import toast_loading from "./components/toast_loading"  //加载动画
import people from "./components/people" //相关人
import site_people from "./components/site_people"  //工地
import all_bank from "./views/bank/all_bank"  //银行卡
import time_data from "./components/time_data"  //时间封装
import class_select from "./components/class_select"  //级联查询
import fee from "./components/fee"//费率
import util from "./components/module_js/util"
Vue.component('submit_submit',submit_submit);
Vue.component('header_header',header_header);
Vue.component('title_header',title_header);
Vue.component('toast_loading',toast_loading);
Vue.component('people',people);
Vue.component('site_people',site_people);
Vue.component('all_bank',all_bank);
Vue.component('time_data',time_data);
Vue.component('class_select',class_select);
Vue.component('fee',fee);
Vue.use(Vant);
Vue.use(util);
Vue.use(ElementUI);
Vue.prototype.$addtitle = add;
Vue.prototype.$moneyGet = moneyGet;
Vue.prototype.$time = time;
const ser = Vue.prototype.axios = axios.create({
  //真实地址
  baseURL:'https://formattingclub.com/YiNuoFund/',
  //baseURL:'http://localhost:8080/YiNuoFund/',
  timeout:20000,
  withCredentials:true,
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 每次提交携带token，2019-9-6 携带token后台被拦截
  /* console.log(sessionStorage.getItem('loginToken'))
  if (sessionStorage.getItem('loginToken')) {
    config.headers.Authorization = `${sessionStorage.getItem('loginToken')}`
    console.log('123')
  } */
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});




// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  if (error.response.status) {
    switch (error.response.status) {
      case 404:
        this.$toast({position:'bottom', message:'服务器已挂'})
        break
      case 500:
        this.$toast({position:'bottom', message:'客户端无法修复服务器'})
        break
      case 301:
        this.$toast({position:'bottom', message:'禁止浏览器重定向'})
        break
      case 406:
        this.$toast({position:'bottom', message:'我解析不了'})
        break
      case 400:
        this.$toast({position:'bottom', message:'服务器解析错误'})
        break
      case 401:
        this.$toast({position:'bottom', message:'请使用正确的认证正数'})
        break
      case 101:
        this.$toast({position:'bottom', message:'请切换到http的新版本'})
        break
      case 405:
        this.$toast({position:'bottom', message:'接口出错'})
    }
  }
  return Promise.reject(error);
});



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

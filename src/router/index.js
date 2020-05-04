import Vue from 'vue'
import VueRouter from 'vue-router'
import {route} from "vant/lib/utils/router"
import { Toast } from 'vant';
Vue.use(Toast);
Vue.use(VueRouter)
const routes = [
  {path: '/', name: 'login', component: resolve=>require(['@/views/index'],resolve),},
  {path:'/home', name:'home', component: resolve=>require(['@/views/home'],resolve)},
  {path:'/registered', name:'registered', component: resolve=>require(['@/components/registered'],resolve)},
  {path:'/bank/bank_card', name:'bank_card', component: resolve=>require(['@/views/bank/bank_card'],resolve)},
  {path:'/home/setup', name:'setup', component: resolve=>require(['@/views/stting/setup'],resolve)},
  {path:'/home/running_money', name:'running_money', component: resolve=>require(['@/views/money/running_money'],resolve)},
  {path:'/all_bank', name:'all_bank', component: resolve=>require(['@/views/bank/all_bank'],resolve)},
  {path:'/transfer_money', name:'transfer_money', component: resolve=>require(['@/views/money/transfer_money'],resolve)},
  {path:'/site_people', name:'site_people', component: resolve=>require(['@/components/site_people'],resolve)},
  {path:'/transfer', name:'transfer', component: resolve=>require(['@/views/money/transfer'],resolve)},
  {path:'/home/running_money/flowing_details/:id', name:'flowing_details', component: resolve=>require(['@/views/money/flowing_details'],resolve)},
  {path:'/home/running_money/flowing_details/runing_details_updata/:id', name:'runing_details_updata', component: resolve=>require(['@/views/money/runing_details_updata'],resolve)},
  {path:'/home/receivable_money', name:'receivable_money', component: resolve=>require(['@/views/receivable/receivable_money'],resolve)},
  {path:'/home/receivable_money/Receivablepayable_entry', name:'Receivablepayable_entry', component: resolve=>require(['@/views/receivable/Receivablepayable_entry'],resolve)},
  {path:'/home/running_money/transfer_running_money_details/:id', name:'transfer_running_money_details', component: resolve=>require(['@/views/money/transfer_running_money_details'],resolve)},
  {path:'/home/category_class', name:'category_class', component: resolve=>require(['@/views/category/category_class'],resolve)},
  {path:'/bind_this', name:'bind_this', component: resolve=>require(['@/views/bind/bind_this'],resolve)},
  {path:'/home/class_vue', name:'class_vue', component: resolve=>require(['@/views/class_ification/class_vue'],resolve)},
  {path:'/home/class_vue/people', name:'people', component: resolve=>require(['@/views/class_ification/people'],resolve)},
  {path:'/home/class_vue/projet_name', name:'projet_name', component: resolve=>require(['@/views/class_ification/projet_name'],resolve)},
  {path:'/home/class_vue/projet_name/projet_name_update/:id', name:'projet_name_update', component: resolve=>require(['@/views/class_ification/projet_name_update'],resolve)},
  {path:'/home/receivable_money/account_translation/:id', name:'account_translation', component: resolve=>require(['@/views/receivable/account_translation'],resolve)},
  {path:'/fee', name:'fee', component: resolve=>require(['@/components/fee'],resolve)},
]

const router = new VueRouter({
  routes,
})

export default router

//路由守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('user');
  if (to.fullPath != '/'){
    //判断用户是否登录，没有登录则不能跳转
    if (token === undefined){
      return next({path:'/'});
    }
  }
  return next()
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allMoney:0,//银行所有金额
    income_bank:'',//收入银行卡选择
    income_bank_person:'',//收入户主
    income_bank_id:'',//收入银行卡id
    transfer_bank_name_out:'',//转账转出
    transfer_bank_name_out_id:'',//转账转出id
    transfer_bank_person:'',//转账户主
    transfer_bank_person_out:'',//转账账户
    transfer_bank_name_enter:'',//转账转入
    transfer_bank_name_enter_id:'',//转账转入id
    index_count:0,//计算转账
    user_id:'',//注册id
    company_id:sessionStorage.getItem('id') || '',
  },
  mutations: {
    //all_bank模块所有金额
    allMoney(state,val){
      state.allMoney = val;
    },
    //income_bank //收入银行卡名字
    income_bank(state,val){
      state.income_bank = val.name;
      state.income_bank_id = val.id;
      state.income_bank_person = val.person;
    },
    //转账转出
    bank_out(state,val){
      state.index_count++;
      if (state.index_count % 2 == 0){
        state.transfer_bank_name_enter = val.name;
        state.transfer_bank_name_enter_id = val.id;
        state.transfer_bank_person = val.person;
      }else{
        state.transfer_bank_name_out = val.name;
        state.transfer_bank_name_out_id = val.id;
        state.transfer_bank_person_out = val.person;
      }
    },
  //  注册id
    registered(state,val){
        state.user_id = val;
    },
    //登录
    company_id(state,val){
      state.company_id = val;
      sessionStorage.setItem('id',val);
    },

  },
  getters:{
    company_id(state){
      if (sessionStorage.getItem('user') !== undefined || sessionStorage.getItem('user') !== ''){
        state.company_id = JSON.parse(sessionStorage.getItem('user'))[0].user_company
      }
      return state.company_id
    }
  },
  actions: {
  },
  modules: {

  }
})

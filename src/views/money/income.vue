<template>
    <div class="income" v-show="income">
        <toast_loading :show="loadding"></toast_loading>
        <van-form @submit="incomeSubmit">
            <!--           下拉框-->
            <class_select @monitor="fund_monitor"></class_select>
            <site_people labe="工地名称" @site_peoples="siteId" v-model="site" place="请输入工地名称"></site_people>
            <people peopleLabel="相关人" @peopleList="peopleID" v-model="listRelevant" placePeople="请输入相关人"></people>
            <van-field readonly clickable name="picker" v-if="reiceShow" :value="reice" label="应收款项" placeholder="点击应收款项" @click="reicePicker = true"/>
            <van-popup v-model="reicePicker" position="bottom">
                <van-picker show-toolbar :columns="reicecolumns" @confirm="onConfirm" @cancel="reicePicker = false"/>
            </van-popup>
            <time_data label="日期" v-model="dateTime"></time_data>
            <van-field v-model="clearBei" name="备注" label="备注" placeholder="请输入备注"/>
            <van-field v-model="money_bank_person" name="转入账户" label="转入账户" placeholder="请选择下列银行卡" disabled/>
            <van-field v-model="money" name="金额" label="金额" placeholder="￥"/>
            <fee label="手续费" v-model="money_rate" @rate="money_rateConfirm"></fee>
            <van-field v-model="money_actual" name="实际收入" label="实际收入" placeholder="请输入金额"/>
            <div class="che">
                <label></label>
                <van-checkbox v-model="checked">转为应付</van-checkbox>
            </div>
            <div style="margin: 16px;">
                <submit_submit text="Transfes"></submit_submit>
            </div>
        </van-form>
    </div>
</template>
<script>
  export default {
    name: "income",
    inject:["reload"],
    props:[
      'income'
    ],
    data(){
      return{
        site:'',//工地名称
        site_id:'',//工地名称id
        listRelevant:'',//相关人
        listRelevant_id:'',//相关人id
        fund_detail_id:'1',//相关项目id
        reicecolumns:[],//应收款项
        money_bank_name:'',//户主
        reice:'',//应收款项
        dateTime:'',//日期
        clearBei:'',//备注
        money_bank_id:'',//银行卡id
        money:'',//金额
        money_rate:'',//手续费
        checked: false,
        reicePicker:false,
        reiceShow:false,//应收款项
        loadding:false, //加载动画
        money_bank_person:'',//转出账户
        money_get:'',//实际转账如果修改就传这个
        ceew:{},//应收付款是否显示
      }
    },
    created() {
      this.bank();
      this.dateTime = this.$time(new Date())
    },
    methods:{

      //应收款项
      onConfirm(val){
        console.log(val)
      },
      //下拉框获取最后的id
      fund_monitor(val){
        this.fund_detail_id = val;
      },
      //手续费
      money_rateConfirm(value){
        this.money_rate = value;
      },
      //提交
      incomeSubmit(val,d){
        let check = true;
        if (this.detailed == ''){
          this.$toast({position:'bottom', message:'款项名称不能为空'});
          check = false
          return false
        }
        if (this.slimShow == true){
          if (this.slim == ''){
            this.$toast({position:'bottom', message:'款项详细不能为空'});
            check = false
            return false
          }
        }
        if (this.dateTime == ''){
          this.$toast({position:'bottom', message:'日期不能为空'});
          check = false
          return false
        }
        if (this.mongey_bank == ''){
          this.$toast({position:'bottom', message:'转入账户不能为空'});
          check = false
          return false
        }
        if (this.money == ''){
          this.$toast({position:'bottom', message:'金额不能为空'});
          check = false
          return false
        }
        this.loadding = true;
        //费率改number
        let rate = 0;
        let list = {customer_id:this.site_id,fund_person_id:this.listRelevant_id,fund_name_id:this.fund_detail_id,fund_money:Number(this.money),fund_text:this.clearBei,
          fund_detail_text:this.clearBei,fund_detail_transaction_text:this.clearBei,fund_detail_money:Number(this.money),fund_detail_transaction_money:Number(this.money),
          fund_detail_transaction_bank_id:this.money_bank_id,fund_date:this.dateTime,fund_detail_date:this.dateTime,fund_detail_transaction_date:this.dateTime,
          company_id:this.$store.getters.company_id,sj_money:this.money_get}
        var listJs = JSON.stringify(list);
        var liss = {jsonFund:listJs}
        this.$addtitle('fund/out_Enter.po',liss).then(res=>{
          if (res.status === 200){
            this.loadding = false;
            if (res.data.data == '添加成功'){
              this.$toast.success(res.data.data);
              this.reload();    //提交成功局部刷新
            }else{
              this.$toast.fail(res.data.data);
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
        })
      },
      //工地名称
      siteId(data,id){
        this.site = data;
        this.site_id = id;
        this.ceew['customer_id'] = id;
        let jo = JSON.stringify(this.ceew)
        this.fund_ciew(jo)
      },
      //相关人
      peopleID(data,id){
        this.listRelevant = data;
        this.listRelevant_id = id;
        this.ceew['fund_person_id'] = id;
        let jo = JSON.stringify(this.ceew)
        this.fund_ciew(jo)
      },
      //应收款项
      fund_ciew(val){
        this.$addtitle('fund/select_beforehand_fund.po',val).then(res=>{
          console.log(res)
        })
      },
      //银行卡获取
      bank(){
        if (JSON.parse(sessionStorage.getItem('bank'))){
          var json = JSON.parse(sessionStorage.getItem('bank'));
          this.$store.commit('income_bank',{name:json.name,id:json.id});
          return
        }else{
          return
        }
      }
    },
    computed:{
      //重vuex里面拉取数据
      mongey_bank(){
        this.money_bank_id = this.$store.state.income_bank_id;
        this.money_bank_name = this.$store.state.money_bank_name;
        let data = '';
        if (this.$store.state.income_bank_person !== '' && this.$store.state.income_bank !== ''
        && this.$store.state.income_bank_person !== undefined && this.$store.state.income_bank !== undefined){
          data = this.$store.state.income_bank_person + ' - ' + this.$store.state.income_bank
        }
        return data
      },
      //实际金额
      money_actual:{
        get:function () {
          if (this.money_rate === '' || this.money_rate === undefined){
            let a = this.money;
            return a;
          }else{
            let money_rate = 0;
            let a = this.money - (this.money * this.money_rate);
            let b = Math.floor(a*100)/100;
            this.money_get = b;
            return b;
          }
        },
        set:function (value) {
          this.money_get = value;
        }
      }
    },
    watch:{
      //实时监听vuex银行卡的数据
      mongey_bank(val){
        this.money_bank_person = val;
      }
    }
  }
</script>

<style scoped>
    @import "../../assets/css/public.css";
    /deep/.van-field__control:disabled{color: black}
    /deep/.van-field__control[name='金额'],/deep/.van-field__control[name='实际收入']{color:green}
    /deep/.van-checkbox__icon{margin-left: 80px}
    /deep/.van-checkbox__label{position: absolute}
</style>

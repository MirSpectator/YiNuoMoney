<template>
    <div class="transfer" v-show="transfer_show">
        <toast_loading :show="loading"></toast_loading>
        <van-form @submit="transferSubmit">
            <van-field v-model="bank_out_money" name="转出" label="转出" placeholder="请选择下列银行卡" disabled/>
            <van-field v-model="bank_enter_money" name="转入" label="转入" placeholder="请选择下列银行卡" disabled/>
            <time_data label="日期" v-model="dateTime"></time_data>
            <van-field v-model="bank_deal_money" name="金额" label="金额" placeholder="￥"/>
            <fee label="转账费率" v-model="bank_deal_rate" @rate="money_rateConfirm"></fee>
            <van-field v-model="allMoneys" name="实际转账" label="实际转账" placeholder="￥"/>
            <div style="margin: 16px;">
                <submit_submit text="Transfers"></submit_submit>
            </div>
        </van-form>
    </div>
</template>

<script>
  export default {
    inject:['reload'],
    name: "transfer",
    props:['transfer_show'],
    data(){
      return{
        bank_out:'',//转出
        bank_out_id:'',//转出id
        bank_enter:'',//转入
        bank_enter_id:'',//转入id
        dateTime:'',//日期
        bank_deal_money:'',//金额
        bank_deal_rate:'',//转账费率
        loading:false,//加载动画
        bank_enter_money:'',//转入银行卡
        bank_out_money:'',//转出银行卡
        money_get:'',//修改实际金额
      }
    },
    created(){
      this.dateTime = this.$time(new Date());
    },
    methods:{
      //费率
      money_rateConfirm(value){
        this.bank_deal_rate = value;
      },
      transferSubmit(){
        let check = true;
        if (this.bank_out_com == ''){
          this.$toast({position:'bottom', message:'转出不能为空'});
          check = false
          return false
        }
        if (this.bank_enter_com == ''){
          this.$toast({position:'bottom', message:'转入不能为空'});
          check = false
          return false
        }
        if (this.bank_out_id == this.bank_enter_id){
          this.$toast({position:'bottom', message:'转出与转入银行卡不能相同'});
          check = false
          return false
        }
        if (this.dateTime == ''){
          this.$toast({position:'bottom', message:'日期不能为空'});
          check = false
          return false
        }
        if (this.bank_deal_money == ''){
          this.$toast({position:'bottom', message:'金额不能为空'});
          check = false
          return false
        }
        this.loading = true;
        let list = {bank_id:this.bank_out_id,bank_deal_date:this.dateTime,bank_deal_money:Number(this.bank_deal_money),
          company_id:this.$store.state.company_id,sj_money:this.money_get}
        let jsonList = {jsonBankDetail:JSON.stringify(list),bank_id:this.bank_enter_id}
        this.$addtitle('bankDetail/add_Bank_Detail.po',jsonList).then(res=>{
          this.loading = false;
            if (res.status === 200){
              if (res.data.msg == '访问成功'){
                this.$toast.success('转账成功');
                this.reload();//刷新局部
                this.$store.commit('bank_out','')
                this.$store.state.transfer_bank_name_out='';    //刷新后银行卡转出为空
                this.$store.state.transfer_bank_name_out_id = '';//银行卡转出id为空
                this.$store.state.transfer_bank_name_enter = '' ;//银行卡转入为空
                this.$store.state.transfer_bank_name_enter_id = '' ;//银行卡转入id为空
              }else{
                this.$toast.fail('转账异常');
              }
            }
        }).catch(err=>{
          this.$toast.fail('数据异常');
          this.loading = false;
        })
        },
    },
    computed:{
      //转出
      bank_out_com(){
        this.bank_out_id = this.$store.state.transfer_bank_name_out_id;
        let data = '';
        if (this.$store.state.transfer_bank_name_out !== '' && this.$store.state.transfer_bank_person_out !== ''){
          data = this.$store.state.transfer_bank_name_out + ' - ' + this.$store.state.transfer_bank_person_out
        }
        return data;
      },
      //转入
      bank_enter_com(){
        this.bank_enter_id = this.$store.state.transfer_bank_name_enter_id;
        let data = '';
        if (this.$store.state.transfer_bank_name_enter !== '' && this.$store.state.transfer_bank_person !== ''
        && this.$store.state.transfer_bank_name_enter !== undefined && this.$store.state.transfer_bank_person !== undefined){
          data = this.$store.state.transfer_bank_name_enter + ' - ' + this.$store.state.transfer_bank_person
        }
        return data;
      },
      allMoneys:{
        get:function () {
          if (this.bank_deal_rate === '' || this.bank_deal_rate === undefined){
            let a = this.bank_deal_money;
            this.money_get = a;
            return a;
          }else{
            let a = this.bank_deal_money - (this.bank_deal_money * this.bank_deal_rate);
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
      //监听转入银行卡
      bank_enter_com(val){
        this.bank_enter_money = val;
      },
      //监听转出银行卡
      bank_out_com(val){
        this.bank_out_money = val;
      }
    }
  }
</script>

<style scoped>
    /deep/.van-field__control:disabled{color: black}
    /deep/.van-field__control[name='金额'],/deep/.van-field__control[name='实际转账']{color: purple}
</style>

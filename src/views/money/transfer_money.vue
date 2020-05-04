<template>
    <div class="transfer_money">
        <header_header title="现金录入"></header_header>
        <title_header :title_header="title" :title_header_one="title_header" :title_header_show="true" :all-money="money"></title_header>
        <van-field name="radio" label="现金录入">
            <template #input>
                <van-radio-group v-model="value" @change="onConfirm" direction="horizontal">
                    <van-radio name="支出" >支出</van-radio>
                    <van-radio name="收入" >收入</van-radio>
                    <van-radio name="转账" >转账</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <income :income="income"></income>
        <expenditure :expenditure-show="expenditure"></expenditure>
        <transfer :transfer_show="transfer"></transfer>
        <all_bank></all_bank>
    </div>
</template>

<script>
    import income from "./income"
  import expenditure from "./expenditure"
  import transfer from "./transfer"
  export default {
    name: "transfer_money",
    components:{
      'income':income,
      'expenditure':expenditure,
      'transfer':transfer
    },
    data(){
      return{
        income:true,    //收入
        expenditure:false, //支出
        title:'支出',
        title_header:'Cash entry',
        value:'支出',
        transfer:false,
      }
    },
    methods:{
      onConfirm(val){
        this.value = val;
        sessionStorage.setItem('transfer_money',val);
        this.showIcomePicker = false;
        this.trans();
      },
      trans(){
        if (this.value == '收入'){
          this.income = true;
          this.expenditure = false;
          this.transfer = false;
          this.title = '收入';
          this.title_header = 'Cash entry';
        }else if(this.value == '支出'){
          this.expenditure = true;
          this.income = false;
          this.transfer = false;
          this.title = '支出';
          this.title_header = 'expenditure';
        }else if(this.value == '转账'){
          this.transfer = true;
          this.income = false;
          this.expenditure = false;
          this.title = '转账';
          this.title_header = 'transfer';
        }
      },
      mm(){
        let val = sessionStorage.getItem('transfer_money');
        if (val == null){
          this.value = '支出';
        }else{
          this.value = val;
        }
      }
    },
    created(){
      this.mm();
      this.trans();
    },
    computed:{
      money(){
        return this.$store.state.allMoney;
      }
    }
  }
</script>

<style scoped>
@import "../../assets/css/public.css";
.img-icon {
    height: 20px;
}
/*单选按钮*/


/deep/.van-radio__icon{margin-left: 33px}
/deep/.van-radio__label{position: absolute;margin-left: 0px;}
</style>

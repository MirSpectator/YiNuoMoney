<template>
    <div>
        <header_header title="退款"></header_header>
        <toast_loading :show="loadding"></toast_loading>
        <div class="i-from">
        <van-cell-group>
            <van-divider v-if="list.list.fund_detail_transaction_money >0 ">收入</van-divider>
            <van-divider v-else>支出</van-divider>
            <van-field label="户主" :value="list.list.bank_person" readonly />
            <van-field label="开户行" :value="list.list.bank_name" readonly />
            <van-field label="银行卡" :value="list.list.bank_stale" readonly />
            <van-field label="金额" v-model="list.list.fund_detail_transaction_money"/>
        </van-cell-group>
            <submit_submit text="退款" @click="submit"></submit_submit>
            <all_bank @runing_details="all_bank"></all_bank>
        </div>
    </div>
</template>

<script>
  export default {
    name: "refund",
    data(){
      return{
        list:'',
        loadding:false,
      }
    },
    created() {
      this.list = JSON.parse(this.$route.params.id);
    },
    methods:{
      all_bank(val){
        this.list.list.bank_person = val.person;
        this.list.list.bank_name = val.name;
        this.list.list.bank_stale = val.bank_stale;
        this.list.list.fund_detail_transaction_bank_id = val.id;
      },
      submit(){
        this.loadding = true;
        delete this.list.list.fund_detail_id
        delete this.list.list.fund_detail_transaction_id
        let json = JSON.stringify(this.list.list);
        let jso = {jsonFund:json}
        this.$addtitle('fund/retund.po',jso).then(res=>{
          if (res.status === 200){
            this.loadding = false;
            this.$toast.success(res.data.data)
            this.$router.push({name:'running_money'});
          }else{
            this.loadding = false;
          }
        })
      }
    }
  }
</script>

<style scoped>
    .van-divider{margin: 0 0;padding-top: 10px}
</style>

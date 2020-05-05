<template>
    <div>
        <van-nav-bar title="转账详情"/>
        <div class="i-from">
            <van-cell-group v-for="(item,i) in listJson" :key="i">
                <van-divider v-if="item.bank_deal_money >0">转入</van-divider>
                <van-divider v-else-if="item.bank_deal_money <0">转出</van-divider>
                <van-field label="户主" :value="item.bank_person" readonly />
                <van-field label="开户行" :value="item.bank_name" readonly />
                <van-field label="银行卡" :value="item.bank_stale" readonly />
                <van-field label="金额" :value="item.bank_deal_money" readonly />
                <van-field label="费率" v-if="item.bank_deal_rate!==undefined" :value="item.bank_deal_rate / 100+'%'" readonly />
                <van-field label="交易时间" :value="item.bank_deal_date" readonly />
                <van-field label="余额" :value="item.money" readonly />
            </van-cell-group>
            <van-cell-group v-for="(item,i) in fund" :key="i" v-if="fund_show">
                <van-divider>手续费</van-divider>
                <van-field label="户主" :value="item.bank_person" readonly />
                <van-field label="开户行" :value="item.bank_name" readonly />
                <van-field label="银行卡" :value="item.bank_stale" readonly />
                <van-field label="金额" :value="item.fund_detail_transaction_money" readonly />
                <van-field label="余额" :value="item.money" readonly />
            </van-cell-group>
        </div>
        <div class="btn">
            <van-button type="primary" color="black" @click="deletes">删除</van-button>
            <van-button type="primary" color="black" @click="updates">修改</van-button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "transfer_running_money_details",
    props:['listJson','fund','moneyss'],
    data(){
      return{
        // listJson:'',
        bank_detail:'',
        fund_show:false,
      }
    },
    methods:{
      //删除
      deletes(){
        this.$emit('deletes','transfer_running_money_details',this.listJson[0]);
      },
      //修改
      updates(){

        // console.log(this.listJson)
       /* let data = [];
        this.listJson.map((item)=>{
          data.push(item);
        });
        this.fund.map((item)=>{
          data.push(item)
        });*/
        let list = {};
        this.listJson.forEach((item)=>{
          if (item.bank_deal_money >0){
            list.entr_bank = item;
          }else if (item.bank_deal_money <0){
            list.outr_bank = item;
          }
        })
        if (this.fund_show) {
          list.fund_rate = this.fund[0];
        }
        this.$router.push(`/home/running_money/flowing_details/runing_details_updata/${JSON.stringify(list)}`);
      },
    },
    created() {
      if (this.fund !== '查询利息信息失败'){
        this.fund_show = true
      }else{
        this.fund_show = false
      }
    }
  }
</script>

<style scoped>
    /*btn*/
    .btn{text-align: center}
    .btn button{margin: 16px;width: 24%}
    .btn /deep/.van-button{line-height: 0}
    .btn /deep/.van-button{height: 35px}
    .van-divider{margin: 0;padding-top: 10px;border-bottom: 1px solid #dadada;padding-bottom: 8px;font-size: 16px;color: black}
    .i-from{margin-top: 0!important;}
</style>

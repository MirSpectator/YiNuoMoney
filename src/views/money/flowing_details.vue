<template>
    <div class="flowing_details">
        <van-nav-bar title="详情"/>
        <toast_loading :show="loading"></toast_loading>
        <div class="i-from">
<!--            这个事收入支出-->
            <van-cell-group>
                <van-divider v-if="listJson.list.fund_detail_transaction_money >0 ">收入</van-divider>
                <van-divider v-else>支出</van-divider>
                <van-field label="户主" :value="listJson.list.bank_person" readonly/>
                <van-field label="开户行" :value="listJson.list.bank_name" readonly />
                <van-field label="卡号类型" :value="listJson.list.bank_stale" readonly />
                <van-field label="交易金额" :value="listJson.list.fund_detail_transaction_money" readonly />
                <van-field label="余额" :value="listJson.list.money" readonly />
                <van-field label="交易时间" :value="listJson.list.fund_detail_transaction_date" readonly />
                <van-field label="项目名称" :value="listJson.list.customer_name" readonly />
                <van-field label="期款" :value="listJson.list.fund_detail_batch" v-if="listJson.list.fund_detail_batch" readonly />
                <van-field label="期款" v-else-if="listJson.list.fund_detail_batch == '' || listJson.list.fund_detail_batch == undefined" value="无" readonly />
                <van-field :label="str(i)" v-for="(item,i) in name" :key="i" :value="item" readonly />
                <van-field label="相关人" :value="listJson.list.fund_person" readonly />
                <van-field label="备注" :value="listJson.list.fund_text" readonly />
            </van-cell-group>
            <van-cell-group v-if="listJson.fl !=undefined">
                <van-divider>手续费</van-divider>
                <van-field label="户主" :value="listJson.fl.bank_person" readonly />
                <van-field label="开户行" :value="listJson.fl.bank_name" readonly />
                <van-field label="银行卡" :value="listJson.fl.bank_stale" readonly />
                <van-field label="金额" :value="listJson.fl.fund_detail_transaction_money" readonly />
                <van-field label="余额" :value="listJson.fl.money" readonly />
            </van-cell-group>
        </div>
        <div class="btn">
            <van-button type="primary" color="black" @click="deletes">删除</van-button>
            <van-button type="primary" color="black" @click="refund">退款</van-button>
            <van-button type="primary" color="black" @click="updates">修改</van-button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "flowing_details",
    props:['listJson'],
    data(){
      return{
        // listJson:'',
        money:'',
        name:[],
        loading:false
      }
    },
    created(){
      // console.log(this.listJson)
    },
    methods:{
      //删除
      deletes(){
        this.$emit('deletes','flowing_details',this.listJson);
      },
      //退款
      refund(){
        this.$router.push(`/home/running_money/flowing_details/refund/${JSON.stringify(this.listJson)}`);
      },
      //修改
      updates(){
        this.$router.push(`/home/running_money/flowing_details/runing_details_updata/${JSON.stringify(this.listJson)}`);
      },
      str(i){
        var ins = i+1;
        switch (ins) {
          case 1:
            return "一级菜单";
            break;
          case 2:
            return "二级菜单";
            break;
          case 3:
            return "三级菜单";
            break;
          case 4:
            return "四级菜单";
            break;
          case 5:
            return "无级菜单";
            break;
          case 6:
            return "六级菜单";
            break;
          case 7:
            return "七级菜单";
            break;
          case 8:
            return "八级菜单";
            break;
          case 9:
            return "九级菜单";
            break;
          case 10:
            return "十级菜单";
            break;
        }
      }
    }
  }
</script>

<style scoped>
@import "../../assets/css/public.css";

/*btn*/
.btn{text-align: center}
.btn button{margin: 16px;width: 24%}
.btn /deep/.van-button{line-height: 0}
.btn /deep/.van-button{height: 35px}
    .i-from{margin-top: 0}
</style>

<template>
    <div class="all_bank">
        <toast_loading :show="loadding"></toast_loading>
        <div class="used_money">
            <div class="all">
                <div class="sc">Y/C</div>
                <div class="saving">常用卡</div>
            </div>
            <table cellspacing="0" cellpadding="0" class="table-xin">
                <tr>
                    <th><span :style="lefta"></span></th>
                    <th><span>开户行</span></th>
                    <th><span>户主</span></th>
                    <th><span>余额</span></th>
                </tr>
                <tr v-for="(item,i) in common_card" :key="i">
                    <td>
                        <span @click="clearBank(item)"><img :src="item.bank_src" alt=""></span>
                    </td>
                    <td><span @click="balanceClick(item.bank_name,item.bank_id,item.bank_person,item.bank_stale)">{{item.bank_name}}</span></td>
                    <td><span>{{item.bank_person}}</span></td>
                    <td><span @click="bank_name(item.bank_name,item.bank_id,item.bank_number,item.bank_stale,item.bank_person)">￥{{item.balance}}</span></td>
                </tr>
            </table>
        </div>
        <!--table-->
        <div class="all">
            <div class="sc">B/C</div>
            <div class="saving"> 储蓄卡</div>
            <div class="all-money">￥{{debit_card_money}}</div>
        </div>
        <table border="0" cellspacing="0" cellpadding="0" class="tables">
            <tr>
                <th><span :style="lefta"></span></th>
                <th><span>开户行</span></th>
                <th><span>户主</span></th>
                <th><span>余额</span></th>
            </tr>
            <tr v-for="(item,i) in debit_card" :key="i">
                <td>
                    <span @click="addBank(item)"><img :src="item.bank_src" alt=""></span>
                </td>
                <td><span @click="balanceClick(item.bank_name,item.bank_id,item.bank_person,item.bank_stale)">{{item.bank_name}}</span></td>
                <td><span>{{item.bank_person}}</span></td>
                <td><span @click="bank_name(item.bank_name,item.bank_id,item.bank_number,item.bank_stale,item.bank_person)">￥{{item.balance}}</span></td>
            </tr>
        </table>
        <div class="mui-content all">
            <div class="sc cc">C/C</div>
            <div class="saving">信用卡</div>
            <div class="all-money">￥{{credit_card_money}}</div>
        </div>
        <table class="table-xin" cellspacing="0" cellpadding="0">
            <tr>
                <th><span :style="lefta"></span></th>
                <th><span>开户行</span></th>
                <th><span>户主</span></th>
                <th><span>余额</span></th>
                <th><span>额度</span></th>
            </tr>
            <tr v-for="(item,i) in credit_card" :key="i">
                <td>
                    <span @click="addBank(item)"><img :src="item.bank_src" alt=""></span>
                </td>
                <td><span @click="balanceClick(item.bank_name,item.bank_id,item.bank_person,item.bank_stale)">{{item.bank_name}}</span></td>
                <td><span>{{item.bank_person}}</span></td>
                <td><span @click="bank_name(item.bank_name,item.bank_id,item.bank_number,item.bank_stale,item.bank_person)">￥{{item.balance}}</span></td>
                <td><span>￥{{item.bank_limit}}</span></td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: "all_bank",
    props:['bankOut'],
    inject:['reload'],
    data(){
      return{
        debit_card:[],  //储蓄卡
        debit_card_money:0,//储蓄卡总额
        credit_card:[], //信用卡
        credit_card_money:0,//信用卡总额
        common_card:[], //常用卡
        company_id:'',
        loadding:false,
        lefta: {
          paddingLeft: '10px'
        },
      }
    },
    methods:{
      all_money(){
        let id = '';
        if (sessionStorage.getItem('company_id') !== null){
          id = sessionStorage.getItem('company_id');
        }else if (sessionStorage.getItem('user') !== null){
          id = JSON.parse(sessionStorage.getItem('user'))[0].user_company
        }
        this.company_id = id;
        this.$moneyGet('bank/select_Bank.po?company_id='+id).then(res=>{
          this.$store.commit('all_bank',JSON.stringify(res.data.data));
          let data = res.data.data;
          let xin = 0,chu=0,allMoney=0;  //信用卡,储蓄卡
          for (var index in data){
            if (data[index].bank_stale == '储蓄卡'){
              this.debit_card.push(data[index]);
              chu+=data[index].balance;
            }else if (data[index].bank_stale == '信用卡'){
              this.credit_card.push(data[index]);
              xin+=data[index].balance;
            }
            if (data[index].bank_sign == 2){
              this.common_card.push(data[index]);
            }
          }
          this.credit_card_money += Math.floor(xin * 100) / 100;
          this.debit_card_money += Math.floor(chu *100 / 100);
          allMoney = this.debit_card_money + this.credit_card_money;
          let moneyFloor = Math.floor(allMoney * 100) / 100;
          this.$store.commit('allMoney',moneyFloor);
        })
      },
      //点击开户行  数据传入vuex
      balanceClick(name,id,person,stale){
        this.$store.commit('income_bank',{name:name,id:id,person:person});
        this.$store.commit('bank_out',{name:name,id:id,person:person});
        //传入现金流水修改监听变化
        this.$emit('runing_details',{name:name,id:id,person:person,bank_stale:stale})
      },
      bank_name(name,id,number,stale,person){
        sessionStorage.setItem("bank",JSON.stringify({name:name,id:id}));
        /*筛选查询流水页面*/
        let json = {bank_number:number,bank_name:name,bank_stale:stale,bank_person:person,company_id:this.company_id};
        let jsonBank = JSON.stringify(json);
        let jo = {}
        let json_jso = {jsonBank:jsonBank,jsonFund:JSON.stringify(jo)}
        this.loadding = true;
        this.$addtitle('fund/select_Money.po',json_jso).then(res=>{
            this.loadding = false;
            //处理查询到的数据
            let data = JSON.stringify(res.data.data);
            if (res.data.msg === '访问成功'){
                this.$toast.success("查询成功");
              this.$router.push({name:'running_money'});
              sessionStorage.setItem("all_bank_card",data);
            }else{
                this.$toast.fail('数据异常');
            }
        });
      },
      //移除常用卡
      clearBank(val){
        let value = val;
        console.log(val)
        value.bank_sign = 3;
        let data = JSON.stringify(value);
        let json = {jsonBank:data}
        this.$dialog.confirm({
          title: '是否移除常用卡',
          message: `<p>银行卡类型：${val.bank_stale}</p><p>开户行：${val.bank_name}</p><p>户主：${val.bank_person}</p>`,
        }).then(()=>{
          this.$addtitle('bank/update_Bank.po',json).then(res=>{
            if (res.data.data === '修改成功'){
              this.$toast.success('移除成功');
              this.reload()
            }else{
              this.$toast.fail('添加失败');
            }
          })
        }).catch(()=>{

        })
      },
      //添加常用卡
      addBank(val){
        let value = val;
        value.bank_sign = 2;
        let data = JSON.stringify(value);
        let json = {jsonBank:data}
        this.$dialog.confirm({
          title: '标题',
          message: '是否添加常用卡',
        }).then(()=>{
          this.$addtitle('bank/update_Bank.po',json).then(res=>{
            if (res.data.data === '修改成功'){
              this.$toast.success('添加成功');
              this.reload()
            }else{
              this.$toast.fail('添加失败');
            }
          })
        }).catch(()=>{

        })
      }
    },
    created(){
      this.all_money();
    },
  }
</script>

<style scoped>
  @import "../../assets/css/public.css";
    .used_money table tr th:nth-child(2){width: 22%}
    .used_money table tr th:nth-child(3){width: 21%}
</style>

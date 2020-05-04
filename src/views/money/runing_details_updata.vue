<template>
    <div class="runing_details_updata">
        <toast_loading :show="loadding"></toast_loading>
        <header_header title="现金流水账单修改"></header_header>
        <div class="i-from">
<!--            收入支出-->
            <van-form v-if="show">
                <van-cell-group>
                    <van-divider v-if="list.list.fund_detail_transaction_money > 0">收入</van-divider>
                    <van-divider v-if="list.list.fund_detail_transaction_money < 0">支出</van-divider>
                    <van-field label="户主" v-model="list.list.bank_person" readonly/>
                    <van-field label="开户行" v-model="list.list.bank_name" readonly />
                    <van-field label="卡号类型" v-model="list.list.bank_stale" readonly />
                    <van-field label="交易金额" v-model="list.list.fund_detail_transaction_money"/>
                    <van-field label="余额" v-model="list.list.money" readonly />
                    <time_data label="交易时间" v-model="list.list.fund_detail_transaction_date"></time_data>
                    <site_people labe="项目名称" @site_peoples="siteId" v-model="list.list.customer_name" place="空"></site_people>
                    <van-field label="批次" v-model="list.list.fund_detail_batch" v-if="list.list.fund_detail_batch" readonly />
                    <van-field label="批次" v-else-if="list.list.fund_detail_batch == '' || list.list.fund_detail_batch == undefined" value="无" readonly />
                    <people people-label="相关人" @peopleList="peopleID" v-model="list.list.fund_person" place-people="空"></people>
                    <van-field label="备注" v-model="list.list.fund_text" />
                </van-cell-group>
                <van-cell-group v-if="list.fl !== undefined">
                    <van-divider>手续费</van-divider>
                    <van-field label="户主" :value="list.fl.bank_person" readonly />
                    <van-field label="开户行" :value="list.fl.bank_name" readonly />
                    <van-field label="银行卡" :value="list.fl.bank_stale" readonly />
                    <van-field label="费率" v-model="list.fl.fund_detail_transaction_money" />
                    <van-field label="余额" :value="list.fl.money" readonly />
                </van-cell-group>
            </van-form>
            <!--                转账  -->
            <van-form v-if="show == false">
                <van-divider>转入</van-divider>
                <van-field label="户主" v-model="list.entr_bank.bank_person" readonly />
                <van-field label="开户行" v-model="list.entr_bank.bank_name" readonly />
                <van-field label="银行卡" v-model="list.entr_bank.bank_stale" readonly />
                <van-field label="金额" v-model="list.entr_bank.bank_deal_money" />
                <time_data label="交易时间" @change="time(list.entr_bank.bank_deal_date)" v-model="list.entr_bank.bank_deal_date"></time_data>
                <van-field label="余额" v-model="list.entr_bank.money" readonly />
                <van-divider>转出</van-divider>
                <van-field label="户主" v-model="list.outr_bank.bank_person" readonly />
                <van-field label="开户行" v-model="list.outr_bank.bank_name" readonly />
                <van-field label="银行卡" v-model="list.outr_bank.bank_stale" readonly />
                <van-field label="金额" v-model="list.outr_bank.bank_deal_money" />
                <van-field label="交易时间" v-model="list.entr_bank.bank_deal_date" readonly />
                <van-field label="余额" v-model="list.outr_bank.money" readonly />
                <van-cell-group v-if="list.fund_rate !== undefined">
                    <van-divider>手续费</van-divider>
                    <van-field label="户主" :value="list.outr_bank.bank_person" readonly />
                    <van-field label="开户行" :value="list.outr_bank.bank_name" readonly />
                    <van-field label="银行卡" :value="list.outr_bank.bank_stale" readonly />
                    <van-field label="费率" v-model="list.fund_rate.fund_detail_transaction_money" />
<!--                    <fee label="手续费" v-model="list.fund_rate.fund_detail_transaction_money +'%'" @rate="money_rateConfirm"></fee>-->
                    <van-field label="余额" :value="list.fund_rate.money" readonly />
                </van-cell-group>
            </van-form>
            <div style="margin: 16px;">
                <submit_submit @click="updataSubmit" text="保存"></submit_submit>
            </div>
        </div>
        <all_bank @runing_details="all_bank"></all_bank>
    </div>
</template>

<script>
  export default {
    name: "runing_details_updata",
    data(){
      return{
        loadding :false,
        list:'',//接收参数
        show:false,//判断是否显示
        index:0,//计算点击了几次
        iszero : true
      }
    },
    created(){
      //接收参数
      this.list = JSON.parse(this.$route.params.id);
      //去掉-
      /*if (this.list.entr_bank !== undefined){
        this.list.fund_rate['fund_detail_transaction_money'] = this.regist(this.list.fund_rate.fund_detail_transaction_money);
      }else if (this.list.fl !== undefined){
        this.list.fl['fund_detail_transaction_money'] = this.regist(this.list.fl.fund_detail_transaction_money);
      }*/

      if (this.list.entr_bank === undefined){
        this.show = true;
      }else{
        this.show = false;
      }
      //处理金额正负问题
      if (this.list.list !== undefined){
        if (this.list.list.fund_detail_transaction_money > 0){
          //收入
          this.iszero = true
        }else if (this.list.list.fund_detail_transaction_money < 0){
          //支出
          this.iszero = false
        }
      }
    },
    methods:{
      //处理 负号
      regist(val){
        return val.toString().replace(/[-]/g,'');
      },
      //处理时间格式
      time(data){
        let time = this.$time(data);
        this.list.entr_bank.bank_deal_date = time;
        // this.list.fund_rate.bank_deal_date = time;
        this.list.outr_bank.bank_deal_date = time;
      },
      //下拉框获取最后的id 级联
      fund_monitor(val){
        this.fund_detail_id = val;
      },
      //工地名称
      siteId(data,id){
        this.list.list.customer_name = data;
        this.list.list['customer_id'] = id;
      },
      //相关人
      peopleID(data,id){
        this.list.list.fund_person = data;
        this.list.list['fund_person'] = data;
        this.list.list['fund_person_id'] = id;
      },
      //手续费
      money_rateConfirm(value){
        this.money_rate = value;
      },
      //监听银行卡
      all_bank(val){
        //收入支出
        if (this.list.fl !== undefined){
          //户主
          this.list.list.bank_person = val.person;
          //开户行
          this.list.list.bank_name = val.name;
          //卡号类型
          this.list.list.bank_stale = val.bank_stale;
          //银行卡id
          this.list.list['fund_detail_transaction_bank_id'] = val.id;
          //手续费
          //户主
          this.list.fl.bank_person = val.person;
          //开户行
          this.list.fl.bank_name = val.name;
          //卡号类型
          this.list.fl.bank_stale = val.bank_stale;
          this.list.fl['fund_detail_transaction_bank_id'] = val.id;
        }/*else if (this.list.fl === undefined){
          //户主
          this.list.list.bank_person = val.person;
          //开户行
          this.list.list.bank_name = val.name;
          //卡号类型
          this.list.list.bank_stale = val.bank_stale;
          //银行卡id
          this.list.list['fund_detail_transaction_bank_id'] = val.id;
        }*/else if (this.list.entr_bank !== undefined){
          this.index++;
          if (this.index % 2 ===0 ){
            this.list.outr_bank.bank_person = val.person;
            this.list.outr_bank.bank_name = val.name;
            this.list.outr_bank.bank_stale = val.bank_stale;
            this.list.outr_bank['bank_id'] = val.id;
          }else{
            this.list.entr_bank.bank_person = val.person;
            this.list.entr_bank.bank_name = val.name;
            this.list.entr_bank.bank_stale = val.bank_stale;
            this.list.entr_bank['bank_id'] = val.id;
          }
        }
      },
      //提交
      updataSubmit(){
        // jsonEnterBank 转入卡     jsonOutBank 转出卡    jsonFund收入支出    jsonRate手续费
        let jsonEnterBank = '';
        let jsonOutBank = '';
        let jsonFund = '';
        let jsonRate = '';
        //初始化 跟后台 数据库字段匹配
        //支出 收入
        //判断是否为转账

        let data = '';
        //如果修改时间，则改变时间格式
        if (this.list.entr_bank === undefined){
          data = this.$time(this.list.list.fund_detail_transaction_date)
        }else{
          data = this.$time(this.list.entr_bank.bank_deal_date)
          data = this.$time(this.list.outr_bank.bank_deal_date)
          if (this.list.fund_rate !== undefined){
            data = this.$time(this.list.fund_rate.bank_deal_date)
          }
        }
        //转入
        if (this.list.entr_bank === undefined){
          if (this.list.list.fund_detail_transaction_money === undefined){
            this.list.list['fund_money'] = this.list.list.fund_detail_transaction_money
            this.list.list['fund_detail_money'] = this.list.list.fund_detail_transaction_money
            this.list.list['fund_detail_transaction_text'] = this.list.list.fund_text
            this.list.list['fund_detail_text'] = this.list.list.fund_text
            this.list.list['fund_detail_date'] = data
            this.list.list['fund_date'] = data
          }else{
            this.list.list['fund_money'] = this.list.list.fund_detail_transaction_money
            this.list.list['fund_detail_money'] = this.list.list.fund_detail_transaction_money
            this.list.list['fund_detail_transaction_text'] = this.list.list.fund_text
            this.list.list['fund_detail_text'] = this.list.list.fund_text
            this.list.list['fund_detail_date'] = data
            this.list.list['fund_date'] = data
          }
          //收入费率
          if (this.list.fl !== undefined){
            this.list.fl['fund_money'] = this.list.list.fund_detail_transaction_money
            this.list.fl['fund_detail_money'] = this.list.list.fund_detail_transaction_money
            this.list.fl['fund_detail_transaction_text'] = this.list.list.fund_text
            this.list.fl['fund_detail_text'] = this.list.list.fund_text
            this.list.fl['fund_text'] = this.list.list.fund_text
            this.list.fl['fund_detail_date'] = this.list.list.fund_detail_transaction_date
            this.list.fl['fund_date'] = this.list.list.fund_detail_transaction_date
          }
        }else if (this.list.fund_rate !== undefined){
          //费率
          this.list.fund_rate['fund_money'] = this.list.fund_rate.fund_detail_transaction_money
          this.list.fund_rate['fund_detail_money'] = this.list.fund_rate.fund_detail_transaction_money
          this.list.fund_rate['fund_detail_date'] = this.list.fund_rate.fund_detail_transaction_date
          this.list.fund_rate['fund_date'] = this.list.fund_rate.fund_detail_transaction_date
        }
        //转账
        if (this.show === false){
            this.list.entr_bank['bank_deal_money'] = this.list.entr_bank.bank_deal_money;
            this.list.outr_bank['bank_deal_money'] = this.list.entr_bank.bank_deal_money * (-1) + '';
          let data = {
            'jsonEnterBank' : JSON.stringify(this.list.entr_bank),
          'jsonOutBank' : JSON.stringify(this.list.outr_bank),
          }
          if(this.list.fund_rate !== undefined){
            data['jsonRate'] = JSON.stringify(this.list.fund_rate);
          }
          util.add.call(this,data,'https://formattingclub.com/YiNuoFund/fund/update_Money.po').then(res=>{
            if (res.status === 200){
              if (res.data.data.length>0){
                this.$toast.success('修改成功');
                this.$router.push({name:'running_money'});
              }else{
                this.$toast.fail('修改失败');
              }
            }
          })
        }else if (this.list.fl !== undefined){
          //收入
          if (this.list.fl.fund_detail_transaction_money > 0){
            this.list.fl.fund_detail_transaction_money = 0-this.list.fl.fund_detail_transaction_money
          }
          this.list.fl['fund_money'] = this.list.fl.fund_detail_transaction_money;
          this.list.fl['fund_detail_money'] = this.list.fl.fund_detail_transaction_money;
          let data = {
            'jsonFund' : JSON.stringify(this.list.list),
          'jsonRate' : JSON.stringify(this.list.fl),
          }
          util.add.call(this,data,'https://formattingclub.com/YiNuoFund/fund/update_Money.po').then(res=>{
            if (res.status === 200){
              if (res.data.data.length>0){
                this.$toast.success('修改成功');
                this.$router.push({name:'running_money'});
              }else{
                this.$toast.fail('修改失败');
              }
            }
          })
        }else{
          //支出
          if(!this.iszero && this.list.list.fund_detail_transaction_money  > 0){
            this.list.list.fund_detail_transaction_money = 0-this.list.list.fund_detail_transaction_money;
          }
          let data = {jsonFund:JSON.stringify(this.list.list)}
          util.add.call(this,data,'https://formattingclub.com/YiNuoFund/fund/update_Money.po').then(res=>{
            if (res.status === 200){
              if (res.data.data.length>0){
                this.$toast.success('修改成功');
                this.$router.push({name:'running_money'});
              }else{
                this.$toast.fail('修改失败');
              }
            }
          })
        }
      }
    },
    watch:{
      //监听转账金额并同步金额
      new_val(val,old){
        this.list.outr_bank.bank_deal_money = val;
      },
    },
    computed:{
      //获取转账金额 进行监听
      new_val(){
        if (this.list !=''){
          if (this.list.entr_bank !== undefined){
            return this.list.entr_bank.bank_deal_money
          }
        }
      },
      //获取交易时间，并监听
      time_val(){
        if (this.list != ''){
          return this.list.entr_bank.fund_detail_transaction_date
        }
      }
    },
  }
</script>

<style scoped>
@import "../../assets/css/public.css";
.van-divider{margin: 0;padding-top: 7px}
</style>

<template>
    <div class="expenditure" v-show="expenditureShow">
        <toast_loading :show="loadding"></toast_loading>
        <van-form @submit="expendonSubmit">
<!--           下拉框-->
            <class_select @monitor="fund_monitor"></class_select>
            <site_people v-on:change="sitePeopleChange" labe="工地名称" @site_peoples="siteId" v-model="site" place="请输入工地名称"></site_people>
            <people v-on:change="peopleChange" peopleLabel="收款人" @peopleList="peopleID" v-model="fund_person" placePeople="请输入收款人"></people>
			<van-field readonly clickable name="picker" v-if="reiceShow" :value="reice" label="应收款项" placeholder="点击应收款项" @click="reicePicker = true"/>
			<van-popup v-model="reicePicker" position="bottom">
			    <van-picker show-toolbar :columns="reicecolumns" @confirm="onConfirm" @cancel="reicePicker = false"/>
			</van-popup>
            <time_data label="日期" v-model="dateTime"></time_data>
            <van-field v-model="bank_deal_money" name="金额" label="金额" placeholder="￥"/>
            <van-field v-model="clearBei" name="备注" label="备注" placeholder="请输入备注"/>
            <van-field v-model="money_bank_person" name="转出账户" label="转出账户" placeholder="请选择下列银行卡" disabled/>
            <div class="che">
                <label></label>
                <van-checkbox v-model="checked">转为应收</van-checkbox>
            </div>
            <div style="margin: 16px;">
                <submit_submit text="Transfers"></submit_submit>
            </div>
        </van-form>
    </div>
</template>

<script>
  export default {
    name: "expenditure",
    inject:['reload'],
    props:['expenditureShow'],
    data(){
      return{
        site:'',//工地
        site_id:'',//工地id
        fund_person:'',//收款人
        fund_person_id:'',//收款人id
        fund_detail_id:'',//下拉框id
        dateTime:'',//时间
        bank_deal_money:'',//金额
        clearBei:'',//备注
        money_bank_id:'',//银行卡id
        checked: false,
        loadding:false,//加载动画
        money_bank_person:'',//转出账户
		reiceShow:false,
		reicecolumns:[],//应收款项
		reicePicker:false,
		 ceew:{},//应付款是否显示
		  reice:'',//应收款项
		 customer_id:null,
      }
    },
    methods:{
		sitePeopleChange(data,id){
			this.customer_id=id
			if(data==""&&this.fund_person_id!=undefined){
				this.ceew['fund_person_id'] = this.fund_person_id;
				this.ceew['customer_id'] = undefined;
				this.fund_ciew(JSON.stringify(this.ceew))
			}else if(data===""){
				this.ceew['customer_id']=undefined
			    this.reiceShow=false
			}
		},
		peopleChange(data,id){
			this.fund_person_id=id
			if(data==""&&this.customer_id!=undefined){
				this.ceew['fund_person_id'] = undefined;
				this.ceew['customer_id'] = this.customer_id;
				this.fund_ciew(JSON.stringify(this.ceew))
			}else if(data===""){
				this.ceew['fund_person_id']=undefined
				 this.reiceShow=false
			}
		},
		onConfirm(val){
				this.reicePicker=false
				this.reice = val.text
				this.fund_detail_id = val.fund_detail_id
		},
      //下拉框获取最后的id
      fund_monitor(val){
        this.fund_detail_id = val;
      },
      siteId(data,id){
        this.site = data;
        this.site_id = id;
		this.ceew['customer_id'] = id;
		this.fund_ciew(JSON.stringify(this.ceew))
      },
      peopleID(data,id){
        this.fund_person = data;
        this.fund_person_id = id;
		this.ceew['fund_person_id'] = id;
		this.fund_ciew(JSON.stringify(this.ceew))
      },
	  //应付款项
	  fund_ciew(val){
	  		  let data  = {"jsonfund_detail":val}
	    this.$addtitle('fund/select_beforehand_fund.po',data).then(res=>{
	  		  if(res.status===200&&res.data.data!='暂无数据'){
	  			  let list = [];
	  			  res.data.data.forEach((item)=>{
	  				  if(item.fund_detail_money<0){
	  					  item['text']='￥'+item.fund_detail_money+"  |  "+item.fund_detail_date+"   |   "+item.fund_detail_text
	  					  list.push(item)
	  				  }
	  			  })
	  		  this.reicecolumns = list
	  		  this.reiceShow = true
	  		  }else{
				  this.reiceShow = false
			}
	    })
	  },
      expendonSubmit(){
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
          this.$toast({position:'bottom', message:'转出账户不能为空'});
          check = false
          return false
        }
        if (this.bank_deal_money == ''){
          this.$toast({position:'bottom', message:'金额不能为空'});
          check = false
          return false
        }
        this.loadding = true;
        let list = {customer_id:this.site_id,fund_person_id:this.fund_person_id,fund_name_id:this.fund_detail_id,fund_money:Number(-this.bank_deal_money),fund_text:this.clearBei,
          fund_detail_text:this.clearBei,fund_detail_transaction_text:this.clearBei,fund_detail_money:Number(-this.bank_deal_money),fund_detail_transaction_money:Number(-this.bank_deal_money),
          fund_detail_transaction_bank_id:this.money_bank_id,fund_date:this.dateTime,fund_detail_date:this.dateTime,fund_detail_transaction_date:this.dateTime,
          company_id:this.$store.getters.company_id}
        var listJs = JSON.stringify(list);
        var liss = {jsonFund:listJs}
        this.$addtitle('fund/out_Enter.po',liss).then(res=>{
          if (res.status === 200){
            this.loadding = false;
            if (res.data.data == '添加成功'){
              this.$toast.success(res.data.data);
              this.reload();    //提交成功局部刷新
            }else{
              this.$toast.fail(res.data.data)
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
        })
      },
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
    created(){
      this.bank();
      this.dateTime = this.$time(new Date())
    },
    computed:{
      //获取vux银行卡数据
      mongey_bank(){
        this.money_bank_id = this.$store.state.income_bank_id;
        let data = '';
        if (this.$store.state.income_bank_person !== '' && this.$store.state.income_bank !== ''
          && this.$store.state.income_bank_person !== undefined && this.$store.state.income_bank !== undefined){
          data = this.$store.state.income_bank_person + ' - ' + this.$store.state.income_bank
        }
        // let data = this.$store.state.income_bank_person + ' - ' + this.$store.state.income_bank
        return data;
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

<style lang="scss" scoped>
    /deep/.van-field__control:disabled{color: black}
    /deep/.van-field__control[name='金额'],/deep/.van-field__control[name='实际收入']{color:red}
    /deep/.van-checkbox__icon{margin-left: 80px}
    /deep/.van-checkbox__label{position: absolute}
    @import "../../assets/css/vue_style.scss";
</style>

<template>
    <div class="bank_card">
        <header_header :title="title"></header_header>
        <title_header :title_header="title" :title_header_one="engtile"></title_header>
        <toast_loading :show="loding"></toast_loading>
        <div class="i-form">
        <van-form @submit="onSubmit">
            <van-field name="radio" label="卡号类型">
                <template #input>
                        <van-radio-group v-model="radio" direction="horizontal" @change="radioCard">
                            <van-radio v-for="(item,i) in listRadio" :name="item.name" :key="i">{{item.text}}</van-radio>
                        </van-radio-group>
                </template>
            </van-field>
<!--            <radio_label label="卡号类型" :list-radio="listRadio"></radio_label>-->
            <van-field v-model="bank_bank" name="开户行" label="开户行" placeholder="请输入开户行"/>
            <van-field v-model="bank_number" type="text" name="尾号" label="尾号" placeholder="请输入尾号"/>
            <van-field v-model="bank_person" type="text" name="户主" label="户主" placeholder="请输入户主"/>
            <van-field v-model="bank_money" type="text" name="可用余额" label="可用余额" placeholder="可用余额"/>
            <van-field v-model="bank_limit" type="text" name="额度" label="额度" placeholder="请输入额度" v-show="persion_if"/>
            <van-field name="radio" label="常用银行卡">
                <template #input>
                    <van-radio-group v-model="userd" direction="horizontal">
                        <van-radio v-for="(item,i) in listUserd" :name="item.name" :key="i">{{item.text}}</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <submit_submit text="保存"></submit_submit>
            </div>
        </van-form>
        </div>
        <all_bank></all_bank>
    </div>
</template>

<script>
    // import radio_label from "../../components/radio_label"
  export default {
    name: "bank_card",
    inject:['reload'],
    /*components:{
      'radio_label':radio_label
    },*/
    data(){
      return{
        title:'银行卡录入',
        engtile:'Bank card entry',
        bank_bank:'',//开户行name
        bank_number:'',//卡号
        bank_person:'',//户主
        bank_money:'',//可用余额
        bank_limit:'',//额度
        persion_if: false,
        userd:'1',//常用银行卡
        loding:false,//加载
        company_id:'',//用户id
        listUserd:[
          {name:'1',text:'是'},
          {name:'2',text:'否'},
        ],
        radio:'储蓄卡',//bank_stale
        listRadio:[
          {name:'储蓄卡',text:'储蓄卡'},
          {name:'信用卡',text:'信用卡'},
        ]
      }
    },
    created(){
      this.user_id()
    },
    methods:{
      radioCard(){this.radio == '储蓄卡'?this.persion_if=false:this.persion_if=true;},
      user_id(){
        if (sessionStorage.getItem('company_id') != null){
          this.company_id = sessionStorage.getItem('company_id');
        }else if (sessionStorage.getItem('user') != null){
          this.company_id = JSON.parse(sessionStorage.getItem('user'))[0].user_company
        }
      },
      onSubmit(){
        var check = true
        var card = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/ // 身份证验证
        var nameReg = /^[\u4E00-\u9FA5]{2,4}$/ // 验证人的名字
        var yin = /^(\d{16}|\d{19})$/ // 银行卡验证
        var nuber = /^\d+(\.\d+)?$/ // 验证数字
        var listJson = {bank_name:this.bank_bank,bank_number:this.bank_number,bank_person:this.bank_person,bank_money:parseFloat(this.bank_money),
          bank_init_money:parseFloat(this.bank_money), bank_sign:Number(this.userd),bank_stale:this.radio,balance:this.bank_money,company_id:this.company_id}
          // 开户行
          if (this.bank_bank == '') {
            this.$toast({position:'bottom', message:'开户行不能为空'})
            check = false
            return false
          }
          if (!nameReg.test(this.bank_bank)) {
            this.$toast({position:'bottom', message:'开户行格式错误'})
            check = false
            return false
          }
          // 尾号
          if (this.bank_number == '') {
            this.$toast({position:'bottom', message:'尾号不能为空'})
            check = false
            return false
          }
          if (this.bank_number.length < 4){
            this.$toast({position:'bottom', message:'尾号至少4位'})
            check = false
            return false
          }
          //   户主
          if (this.bank_person == '') {
            this.$toast({position:'bottom', message:'户主不能为空'})
            check = false
            return false
          }
          if (!nameReg.test(this.bank_person)) {
            this.$toast({position:'bottom', message:'户主格式错误'})
            check = false
            return false
          }
          // 余额
          if (this.bank_money == '') {
            this.$toast({position:'bottom', message:'余额不能为空'})
            check = false
            return false
          }
          if (!nuber.test(this.bank_money)) {
            this.$toast({position:'bottom', message:'余额格式错误'})
            check = false
            return false
          }
        if(this.radio != '储蓄卡'){
          // 额度
          if (this.bank_limit == '') {
            this.$toast({position:'bottom', message:'额度不能为空'})
            check = false
            return false
          }
          if (!nuber.test(this.bank_limit)) {
            this.$toast({position:'bottom', message:'额度格式错误'})
            check = false
            return false
          }
            listJson['bank_limit'] = parseFloat(this.bank_limit);
        }
        var as = JSON.stringify(listJson)
        var ss = {jsonBank:as}
        this.loding = true
        this.$addtitle('bank/add_Bank.po',ss).then(res=>{
          if (res.status === 200){
            this.loding = false;
            if (res.data.data == '添加成功'){
              this.$toast.success(res.data.data);
              this.reload();
            }else{
              this.$toast.fail(res.data.data);
            }
          }
        }).catch(res=>{
          this.$toast.fail('数据异常');
        });
      },
    },
  }
</script>

<style scoped>
@import "../../assets/css/public.css";

</style>

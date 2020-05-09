<template>
    <div class="account_translation">
        <header_header title="详情"></header_header>
        <title_header title_header="详情" title_header_one="Amount"></title_header>
        <toast_loading :show="loading"></toast_loading>
        <el-card class="box-card">
            <div class="text item">
                <van-field label="工地名称" :border="false" :value="title_data.customer_name" readonly/>
                <van-field label="相关人" :border="false" :value="title_data.fund_person" readonly/>
                <van-field label="分类" :border="false" :value="title_data.fund_name" readonly/>
            </div>
        </el-card>
        <van-cell-group v-for="(item,i) in list" :key="i">
            <van-divider>第{{i+1}}阶段</van-divider>
            <div class="block">
                <span class="demonstration">日期</span>
                <el-date-picker v-model="item.fund_detail_date" type="datetime" placeholder="选择日期时间" :disabled="item.fund_detail_id !== title_data.fund_detail_id"></el-date-picker>
            </div>
            <van-field label="金额" v-model="item.fund_detail_money" :disabled="item.fund_detail_id !== title_data.fund_detail_id" />
            <van-field label="备注" v-model="item.fund_detail_text" :disabled="item.fund_detail_id !== title_data.fund_detail_id" />
            <van-field name="radio" label="情况">
                <template #input>
                    <van-radio-group v-model="item.fund_detail_type" :disabled="item.fund_detail_id !== title_data.fund_detail_id" direction="horizontal">
                        <van-radio v-for="(item,i) in level" :key="i" :name="item.radio">{{item.text}}</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field name="radio" label="级别">
                <template #input>
                    <van-radio-group v-model="item.fund_detail_level" :disabled="item.fund_detail_id !== title_data.fund_detail_id" direction="horizontal">
                        <van-radio name="A">A</van-radio>
                        <van-radio name="B">B</van-radio>
                        <van-radio name="C">C</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
        </van-cell-group>
        <div class="btn" v-show="btn_zeng">
           <van-button type="primary" color="black" @click="updates">修改</van-button>
			<van-button type="primary" color="black" @click="deletes">删除</van-button>
        </div>
        <div class="btn two" v-show="btn_f">
            <van-button type="primary" color="black" @click="updates">修改</van-button>
            <van-button type="primary" color="black" @click="deletes">删除</van-button>
      
        </div>
    </div>
</template>

<script>
  export default {
    name: "account_translation",
    data(){
      return{
        title_data:{
          customer_name:'',
          fund_person:'',
          fund_detail_id:'',
        },
        list:[],
        btn_zeng:false,
        btn_f:false,
        loading:false,
        level:[
          {text:'是',radio:0},
          {text:'否',radio:1},
        ]
      }
    },
    created() {
      this.list_list()
    },
    methods:{
      list_list(){
        let data = JSON.parse(this.$route.params.id)
        this.title_data = data;
        this.axios.get('fund/select_Beforehand_money.po?fund_id='+data.fund_id).then(res=>{
          if (res.status === 200){
            this.list = res.data.data
            //判断是应收应付
            if (this.list[0].fund_detail_money < 0){
              this.btn_zeng = false
              this.btn_f = true
            }else if (this.list[0].fund_detail_money > 0){
              this.btn_zeng = true
              this.btn_f = false
            }
            //这里直接修改数据  如果有的字段没有修改为空
            this.list.map(function (item) {
              if (item.fund_detail_text === undefined || item.fund_detail_text === ''){
                item['fund_detail_text'] = '空';
              }
            })
          }
        });
      },
      //删除
      deletes(){
        this.loading = true
        this.axios.get('fund/delete_fund_detail.po?fund_detil_id='+this.title_data.fund_detail_id).then(res=>{
          if (res.status === 200){
            this.loading = false
            if (res.data.data === '删除成功'){
              this.$toast.success(res.data.data);
              this.$router.push({name:'receivable_money'});
            }else{
              this.$toast.fail(res.data.data);
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
          this.loading = false
        })
      },
    //  退款
      refund(){
        console.log('123')
      },
    //  修改
      updates(){
        this.loading = true;
        //这里是修改的阶段
        let data = '';
        //匹配那一阶段修改了
        for (let index in this.list){
          if (this.list[index].fund_detail_id == this.title_data.fund_detail_id){
            data = this.list[index];
            data['fund_text'] = this.list[index].fund_detail_text;
            data['fund_date'] = this.list[index].fund_detail_date;
          }
        }
        data['fund_name_id'] = this.title_data.fund_name_id;
        data['fund_person_id'] = this.title_data.fund_person_id;
        data['customer_id'] = this.title_data.customer_id;
        //更改格式
        let jio = JSON.stringify(data);
        let json = {jsonFund:jio};
        this.$addtitle('fund/update_Fund_Detail.po',json).then(res=>{
          this.loading = false;
          if (res.data.data === '修改成功'){
            this.$toast.success(res.data.data);
            this.$router.push({name:'receivable_money'});
          }else{
            this.$toast.fail(res.data.data);
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
          this.loading = false;
        })
      },
   
   
    },
  }
</script>

<style scoped>
    /deep/.text {font-size: 14px;}
    /deep/.item {padding: 0 0 0;}
    /deep/.box-card {width: auto}
    /deep/.el-card__body{padding: 0}
    /deep/.van-cell{padding: 6px 16px}
    .block{display: flex;padding: 0 16px;border-bottom: 1px solid #dadada}
    .block span{display: block;line-height: 41px;width: 90px;font-size: 14px}
    /deep/.el-input--prefix .el-input__inner{background-color: transparent;border: none;padding: 0}
    /deep/.el-input__prefix{display: none}
    .btn{text-align: center}
    .btn button{margin: 16px;width: 24%}
    .btn /deep/.van-button{line-height: 0}
    .btn /deep/.van-button{height: 35px}
    .two /deep/.van-button{margin: 9px;width: 16%}
</style>

<template>
    <div class="projet_name_update">
        <header_header title="项目名称修改"></header_header>
        <toast_loading :show="loadding"></toast_loading>
        <div class="i-from">
            <van-form @submit="onSubmit">
                <van-field v-model="projet.customer_name" name="项目名称" label="项目名称" placeholder="请输入项目名称"/>
                <van-field name="radio" label="工程">
                    <template #input>
                        <van-radio-group v-model="projet.customer_stale" direction="horizontal">
                            <van-radio v-for="(item,i) in list_s" :key="i" :name="item.num">{{item.text}}</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <div style="margin: 16px;">
                    <submit_submit text="提交"></submit_submit>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
  export default {
    name: "projet_name_update",
    data(){
      return{
        projet:'',
        loadding:false,
        list_s:[
          {text:'再谈中',num:0},
          {text:'收款中',num:1},
          {text:'结尾',num:2},
        ],
      }
    },
    created(){
        this.projet_stal()
    },
    methods:{
      onSubmit(){
        this.loadding = true;
        var json = JSON.stringify(this.projet);
        var jso = {jsonCustomer:json};
        this.$addtitle('customer/update_Customer_Name.po',jso).then(res=>{
          if (res.status === 200){
            this.loadding = false;
            if (res.data.data == '修改成功'){
              this.$toast.success(res.data.data);
              this.$router.push({name:'projet_name'});
            }else{
              this.$toast.fail("添加失败")
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
          this.loadding = false;
        })
      },
      projet_stal(){
        let data = [];
        data.push(JSON.parse(this.$route.params.id));
        data.map(function (item) {
          if (item.customer_stale == '再谈中'){
            item.customer_stale = 0;
          }else if (item.customer_stale == '收款中'){
            item.customer_stale = 1;
          }else if (item.customer_stale == '结尾'){
            item.customer_stale = 2;
          }
        })
        this.projet = data[0];
      }
    }
  }
</script>

<style scoped>

</style>

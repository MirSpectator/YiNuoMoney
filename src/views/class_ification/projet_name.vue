<template>
    <div class="projet_name">
        <header_header title="添加项目名称"></header_header>
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
        <div class="i-from">
            <van-field v-model="search" label="快速搜索"  placeholder="请输入关键字"/>
        </div>
        <table cellspacing="0" cellpadding="0" border="0">
            <tr>
                <th><span>id</span></th>
                <th><span>名称</span></th>
                <th><span>进度</span></th>
                <th><span>操作</span></th>
            </tr>
            <tr v-for="(item,i) in list_data_search" :key="i">
                <td><span>{{item.customer_id}}</span></td>
                <td><span>{{item.customer_name}}</span></td>
                <td><span>{{item.customer_stale}}</span></td>
                <td><span @click="showPopup(item)">修改</span></td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: "projet_name",
    inject:['reload'],
    data(){
      return{
        loadding:false,
        search:'',
        list:[],
        projet:{
          customer_name:'',
          customer_stale:'',
          company_id:''
        },
        list_s:[
          {text:'再谈中',num:'0'},
          {text:'收款中',num:'1'},
          {text:'结尾',num:'2'},
        ],
      }
    },
    created(){
      this.comp();
      this.stale();
    },
    methods:{
      //获取company_id
      comp(){
        //登录缓存user
        if (sessionStorage.getItem('user') !== null){
          let company_id_login = JSON.parse(sessionStorage.getItem('user'))[0].user_company;
          this.projet.company_id = company_id_login;
        }else if (sessionStorage.getItem('company_id') !== null){
          //公司绑定缓存
          let company_id_bind = sessionStorage.getItem('company_id');
          this.projet.company_id = company_id_bind;
        }
      },
      showPopup(val) {
        let upd = {customer_id:val.customer_id,customer_name:val.customer_name,customer_stale:val.customer_stale}
        let data = JSON.stringify(upd);
        this.$router.push({path:`/home/class_vue/projet_name/projet_name_update/${data}`});
      },
      //录入接口
      onSubmit(){
        let _true = true;
        if (this.projet.customer_name == ''){
          this.$toast({position:'bottom', message:'工地名称不能为空'})
          check = false
          return false
        }
        if (this.projet.customer_stale == ''){
          this.$toast({position:'bottom', message:'工程不能为空'})
          check = false
          return false
        }
        this.loadding = true;
        let then = this;
        var json = JSON.stringify(this.projet);
        var jso = {jsonCustomer:json};
        this.$addtitle('customer/add_Customer_Name.po ',jso).then(res=>{
          if (res.status === 200){
            this.loadding = false;
            if (res.data.data == '添加成功'){
              then.$toast.success(res.data.data);
              then.reload();
            }else{
              then.$toast.fail("添加失败")
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
          this.loadding = false;
        })
      },
      //查询接口
      stale(){
        let data = this.$store.state.company_id
        this.$moneyGet('customer/select_Customer_Name.po?company_id='+data).then(res=>{
          let data = res.data.data;
          data.map(function (item) {
            if (item.customer_stale == 0){
              item.customer_stale = '再谈中';
            }else if (item.customer_stale == 1){
              item.customer_stale = '收款中';
            }else if (item.customer_stale == 2){
              item.customer_stale = '结尾';
            }
          })
          this.list = res.data.data;
        })
      },
    },
    computed:{
      list_data_search(){
        let then = this;
        let list = [];
        this.list.map(function (item) {
          if (item.customer_name.search(then.search) != -1 || item.customer_stale.search(then.search) != -1){
            list.push(item);
          }
        });
        return list;
      }
    }
  }
</script>

<style scoped>
    table{width: 100%;text-align: left;font-size: 14px;white-space: nowrap;margin-bottom: 100px}
    table tr{border-bottom: 1px solid #DADADA;line-height: 28px}
    table tr th{background-color: #DADADA;line-height: 27px}
    table tr th:nth-child(1),table tr td:nth-child(1){padding-left: 16px;}
    table tr th:nth-child(1){width: 10%;min-width: 31px;}
    table tr th:nth-child(2){width: 20%;min-width: 74px;}
    table tr th:nth-child(3){width: 15%;min-width: 59px;}
    table tr td:nth-child(2) span{display: block;width: 190px;text-overflow: ellipsis;overflow: hidden;}
</style>

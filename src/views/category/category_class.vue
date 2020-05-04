<template>
    <div>
        <header_header title="分类调整"></header_header>
        <toast_loading :show="loading"></toast_loading>
        <div class="i-from">
            <van-form>
                <fund-input v-bind:level="true" ref="oheader" @em="em" v-bind:company_id="company_id"></fund-input>
                <van-field v-model="values" :label="menu" placeholder="新菜单请输入"/>
                <div style="margin: 16px;">
                    <submit_submit text="保存" @click="btn"></submit_submit>
                </div>
            </van-form>
        </div>
        <div class="i-from">
            <van-field v-model="search" label="分类名称搜索" placeholder="请输入关键字"/>
        </div>
        <table cellspacing="0" cellpadding="0" border="0">
            <tr>
                <th><span>id</span></th>
                <th><span>名称</span></th>
                <th><span>等级</span></th>
                <th><span>状态</span></th>
                <th><span>上级菜单</span></th>
                <th><span>操作</span></th>
            </tr>
            <tr v-for="(item,i) in fund_name_list_search" :key="i">
                <td><span>{{item.id}}</span></td>
                <td><span>{{item.fund_name}}</span></td>
                <td><span>{{item.level}}</span></td>
                <td><span>{{item.fund_stale}}</span></td>
                <td><span>{{item.parentid}}</span></td>
                <td><span @click="deleteClick(item)">删除</span></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import dele from "./dele"
    import fundInput from "../../components/fundInput"
  export default {
    components:{
      'dele':dele,
      'fundInput':fundInput
    },
    name: "category_class",
    inject:['reload'],
    data(){
      return{
        fund_name_list:[],
        values:'',
        menu:'添加一级菜单:',
        loading:false,
        search:'',
        company_id:'',
        oinput:{
          fund_name:'',
          level:'',
          parentid:'',
          fund_stale:'',
          company_id:''
        }
      }
    },
    created(){
      this.comp();
      this.fund();

    },
    methods:{
      //获取company_id
      comp(){
        //公司绑定缓存
        let company_id_bind = sessionStorage.getItem('company_id');
        //登录缓存
        let company_id_login = JSON.parse(sessionStorage.getItem('user'))[0].user_company;
        if (company_id_bind === undefined || company_id_bind === '' || company_id_bind === null){
          this.company_id = company_id_login;
          this.oinput.company_id = company_id_login;
        }else if (company_id_login === undefined || company_id_login === '' || company_id_login === null){
          this.company_id = company_id_bind;
          this.oinput.company_id = company_id_bind;
        }
        console.log(this.company_id)
      },
      //获取参数
      fund(){
        this.$moneyGet('fund/select_fundName.po?company_id='+this.company_id).then(res=>{
          //处理数组中的状态
          let data = res.data.data;
          if (data != '无数据'){
            data.map(function (item) {
              if (item.fund_stale == 0){
                item.fund_stale = '收入'
              }else if (item.fund_stale == 1){
                item.fund_stale = '支出'
              }else if (item.fund_stale == 3){
                item.fund_stale = '隐藏'
              }
            })
            this.fund_name_list = data;
          }
        })
      },
      //删除
      deleteClick(val){
        this.loading = true;
        this.axios.get('fund/delete_Fund_Name.po?id='+val.id).then(res=>{
          if (res.status === 200) {
            this.loading = false;
            if (res.data.data === '删除成功') {
              this.$toast.success(res.data.data);
              this.fund_name_list.some((item,i)=>{
                if (val.id == item.id){
                  this.fund_name_list.splice(i,1);
                  return true;
                }
              })
            } else {
              this.$toast.fail(res.data.data);
            }
          }
        })
      },
      btn(){
        this.oinput.fund_name = this.values;
        this.oinput.fund_stale = this.$refs.oheader.radio;
        let val = this.$refs.oheader.oinput();
        this.oinput.parentid = val.id;
        if (val.level == null || val.level==''){
          this.oinput.parentid = 0;
          this.oinput.level = 1;
        }else{
          this.oinput.level = val.level+1;
        }
        this.oinput.company_id = this.company_id;

        let ss = JSON.stringify(this.oinput);
        let json = {jsonFund:ss};
        this.loading = true;
        this.$addtitle('fund/add_Fund_Name.po',json).then(res=>{
          if (res.status === 200){
            this.loading = false;
            if (res.data.data ==='添加成功'){
              this.$toast.success(res.data.data);
              this.reload();
            }else{
              this.$toast.fail(res.data.data);
            }
          }
        })
      },
      em(level){
        if (level == 1) {
           this.menu = '添加一级菜单';
        } else if (level == 2) {
          this.menu = '添加二级菜单';
        } else if (level == 3) {
          this.menu = '添加三级菜单';
        } else if (level == 4) {
          this.menu = '添加四级菜单';
        } else if (level == 5) {
          this.menu = '添加五级菜单';
        } else if (level == 6) {
          this.menu = '添加六级菜单';
        } else if (level == 7) {
           this.menu = '添加七级菜单';
        }
      }
    },
    computed:{
      fund_name_list_search(){
        let then = this;
        let list = [];
        this.fund_name_list.map(function(item){
          if (item.fund_name.search(then.search) != -1 || item.fund_stale.search(then.search) != -1){
            list.push(item);
          }
        })
        return list;
      }
    }
  }
</script>

<style scoped>
@import "../../assets/css/public.css";
table{width: 100%;text-align: left;font-size: 14px;white-space: nowrap;margin-bottom: 100px}
table tr{border-bottom: 1px solid #DADADA;line-height: 28px}
table tr th{background-color: #DADADA;line-height: 27px}
table tr th:nth-child(1),table tr td:nth-child(1){padding-left: 16px;}
    table tr th:nth-child(1){width: 10%;min-width: 31px;}
    table tr th:nth-child(2){width: 25%;min-width: 91px;}
    table tr th:nth-child(3){width: 10%;min-width: 41px;}
    table tr th:nth-child(4){width: 10%;}
    table tr th:nth-child(5){width: 20%;}
</style>

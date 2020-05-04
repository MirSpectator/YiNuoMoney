<template>
    <div class="people">
        <header_header title="添加相关人"></header_header>
        <toast_loading :show="loadding"></toast_loading>
        <div class="i-from">
            <van-form @submit="onSubmit">
                <van-field v-model="people.fund_person" name="相关人" label="相关人" placeholder="请输入相关人"/>
                <van-field name="radio" label="职位类型">
                    <template #input>
                        <van-radio-group v-model="people.fund_stale" direction="horizontal">
                            <van-radio name="1">相关人</van-radio>
                            <van-radio name="2">项目负责人</van-radio>
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
                <th><span>职位类型</span></th>
                <th><span>操作</span></th>
            </tr>
            <tr v-for="(item,i) in list_data_search" :key="i">
                <td><span>{{item.fund_person_id}}</span></td>
                <td><span>{{item.fund_person}}</span></td>
                <td><span>{{item.fund_stale}}</span></td>
                <td><span @click="deleteClick(item)">删除</span></td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: "people",
    inject:['reload'],
    data(){
      return{
        loadding:false,
        list_data:[],
        search:'',
        people:{
          fund_person:'',
          fund_stale:'',
          company_id:'',
        }
      }
    },
    created(){
      this.comp();
      this.list();
    },
    methods:{
      //获取company_id
      comp(){
        //登录缓存user
        if (sessionStorage.getItem('user') !== null){
          let company_id_login = JSON.parse(sessionStorage.getItem('user'))[0].user_company;
          this.people.company_id = company_id_login;
        }else if (sessionStorage.getItem('company_id') !== null){
          //公司绑定缓存
          let company_id_bind = sessionStorage.getItem('company_id');
          this.people.company_id = company_id_bind;
        }
      },
      onSubmit() {
        var json = JSON.stringify(this.people);
        var jso = {jsonFungPerson:json};
        this.loadding = true;
        this.$addtitle('fund_person/add_Fund_Person.po',jso).then(res=>{
          if (res.status === 200){
            this.loadding = false;
            if (res.data.data == '添加成功'){
              this.$toast.success(res.data.data);
              this.reload();
            }else{
              this.$toast.fail("添加失败")
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
        })
      },
      deleteClick(val){
        this.loadding = true;
        this.$moneyGet('fund_person/delete_Fund_Person.po?fund_person_id='+val.fund_person_id).then(res=>{
          if (res.status === 200){
            this.loding = false;
            if (res.data.data == '删除成功'){
              this.loadding = false;
              this.$toast.success(res.data.data);
              this.list_data.some((item,i)=>{
                if (item.fund_person_id == val.fund_person_id){
                  this.list_data.splice(i,1);
                  return true
                }
              })
            }else{
              this.$toast.fail(res.data.data);
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常')
        })
      },
      list(){
        let data = this.$store.state.company_id
        this.$moneyGet('fund_person/select_Fund_Person.po?fund_stale=1&company_id='+data).then(res=>{
          let data = res.data.data;
          if (data !== '暂无数据'){
            data.map(function (item) {
              if (item.fund_stale === 1){
                item.fund_stale = '相关人';
              }else if (item.fund_stale === 2){
                item.fund_stale = '项目负责人';
              }
            });
            this.list_data = data;
          }
        })
      }
    },
    computed:{
      list_data_search(){
        let then = this;
        let list = [];
        this.list_data.map(function (item) {
          if (item.fund_person.search(then.search) != -1 || item.fund_stale.search(then.search) != -1){
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
    table tr th:nth-child(3){width: 30%;min-width: 74px;}
</style>

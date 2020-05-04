<template>
    <div class="setup">
        <header_header :title="title"></header_header>
        <div class="links">
            <linkRouter v-for="(item,i) in value" :key="i" :text="item.text" @click="HClick"></linkRouter>
        </div>
        <submit_submit @click="submitClick" text="退出"></submit_submit>
    </div>
</template>

<script>
    import link_router from "../../components/link_router"
  export default {
    name: "setup",
    data(){
      return{
        title:'设置',
        text:'444444',
        value:[
          {text:'修改用户名'},
          {text:'修改密码'},
          {text:'个人信息'},
        ]
      }
    },
    methods:{
      HClick(){
        console.log('123')
      },
      submitClick(){
        localStorage.clear();
        sessionStorage.clear();
        this.$toast.success('退出成功');
        this.$router.push({path:'/'});
      }
    },
    components:{
      'linkRouter':link_router,
    },
  }
</script>

<style scoped>
@import "../../assets/css/public.css";
    .links{margin-top: 10px;margin-bottom: 16px}
/deep/.link_router>.link>.van-cell{background-color: white!important;}
</style>

<template>
    <div class="home_login">
        <div class="bcg"></div>
        <div class="logo">
            <div class="logo-bcg">
                <img :src="imgSrc" alt="">
            </div>
        </div>
        <logins v-show="IFlogin"></logins>
        <registered v-show="IFregistered"></registered>
        <div style="font-size: 13px;color: #1489ed;width: 90%;margin: 0 auto">
            <div style="width: 64px;" @click="resClick">{{msg}}</div>
        </div>
    </div>
</template>

<script>
  import logins from '@/components/login.vue'
  import registered from "@/components/registered"
  export default {
    name: "home_login",
    data(){
      return{
        imgSrc: require('../assets/images/2146070222.jpg'),
        IFlogin:true,
        IFregistered:false,
        msg:'立即注册'
      }
    },
    methods:{
      resClick(){
        if (this.IFlogin === true){
          this.IFlogin = false;
          this.IFregistered = true;
          this.msg = '登录'
        }else{
          this.IFlogin = true;
          this.IFregistered = false;
          this.msg = '立即注册'
        }
      }
    },
    created() {

    },
    components:{
      'logins':logins,
      'registered':registered
    }
  }
</script>

<style scoped>
    @import "../assets/css/public.css";
    .logo{position: relative;z-index: 1000;width: 100%;top: 11%;text-align: center;margin-top: 12%;
    margin-bottom: 5%;}
    .logo .logo-bcg{width: 100%}
    .logo .logo-bcg img{width: 80px}
    .home{position: fixed;width: 100%;height: 100%}
</style>

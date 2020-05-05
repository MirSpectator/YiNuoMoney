<template>
<div class="home">
    <!--header-->
<div class="header">
    <router-link :to="{name:'setup'}">
    <div class="title_images">
        <div class="title">{{msg}}</div>
        <div class="img">
            <div class="img_img">
                <img :src="images" alt="user">
            </div>
        </div>
    </div>
    </router-link>
</div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- 一诺装饰 -->
    <div class="one-noble">
        <div class="one">
            <h2>一诺装饰</h2>
            <p>版本号：0.4.4</p>
        </div>
        <p class="left-p">Enterprise Resource Planning</p>
    </div>
<!--    九宫格-->
    <div class="nine">
        <van-grid clickable :column-num="3" icon-size="40">
            <van-grid-item v-for="(item,i) in list" :icon="item.listImg" @click="itrmClik(item.text)"  :text="item.text" :to="item.href"  :key="i"/>
        </van-grid>
    </div>
    </van-pull-refresh>
<!--    第一次进入首页需要加载一次银行卡所有数据并且保存到vuex，刚进入首页直接进入现金流水，以免没有筛选数据-->
    <all_bank v-show="false"></all_bank>
</div>
</template>

<script>
  export default {
    name: "home",
    inject:['reload'],
    data(){
      return{
        msg:'',
        images:require("../assets/images/user.png"),
        list: [
          { href: 'bank/bank_card', listImg: require('../assets/images/bank_card.png'), text: '银行卡录入' },
          { href: '/home/running_money', listImg: require('../assets/images/xianjin.png'), text: '现金流水' },
          { href: '/transfer_money', listImg: require('../assets/images/zhuanzhang.png'), text: '现金录入' },
          { href: '/home/category_class', listImg: require('../assets/images/fen.png'), text: '分类调整' },
          { href: '/home/class_vue', listImg: require('../assets/images/fl.png'), text: '分类' },
          { href: '/home/receivable_money', listImg: require('../assets/images/caiwu.png'), text: '应收应付' },

        ],
        isLoading: false,
      }
    },
    methods:{
      //判断是否有银行卡查询的流水缓存，有缓存则清理
      itrmClik(val){
        if (val == '现金流水'){
          if (sessionStorage.getItem('all_bank_card') != null){
            return sessionStorage.removeItem("all_bank_card");
          }
        }
      },
      // 用户名
      message(){
        //登录
        if (sessionStorage.getItem('user') !== null){
          let user_id_login = JSON.parse(sessionStorage.getItem('user'))[0].user_name;
          this.msg=user_id_login;
        }else if (sessionStorage.getItem('user_id') !== null){
          //注册
          let regesitred_user_id = JSON.parse(sessionStorage.getItem('user_id')).msg;
          this.msg = regesitred_user_id;
        }
      },
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.reload()
          this.isLoading = false;
        }, 1000);
      },
    },
    created() {
        this.message();
    }
  }
</script>

<style scoped>
@import "../assets/css/public.css";
/*首页index昵称*/
.header{background-color: white;width: 100%;box-shadow: 0 1px 6px #ccc;}
.img_img{width: 20px}
.img_img img{width: 100%}
.title_images{display: flex;line-height: 36px}
.title{flex: 6;text-align: right;padding-right: 7px}
.img{flex: 1;padding-top: 4px}
.one{display: flex;line-height: 38px}
.one p{flex: 1;text-align: right;padding-right: 13px;}
.left-p{text-align: left}
.one-noble{padding-left: 6%;padding-top: 17%;line-height: 8px;}
    h2{font-size: 30px;line-height: 1;margin-top: 5px;margin-bottom: 5px;}
    p{font-size: 14px;color: #8f8f94;margin-top: 0;margin-bottom: 10px;}
    a{color: black}
.van-pull-refresh{height: 80vh}
</style>

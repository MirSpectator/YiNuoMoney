<template>
    <div class="header_header">
        <van-nav-bar :title="title" :to="to" fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="wap-home-o" slot="right"/>
        </van-nav-bar>
    </div>
</template>

<script>
  export default {
    name: "header_header",
    props:[
      'title',
      'to'
    ],
    methods:{
      onClickRight(){this.$router.push({name:'home'})},
      onClickLeft(){this.$router.history.go(-1);},
    }
  }
</script>

<style scoped>
@import "../assets/css/public.css";
</style>

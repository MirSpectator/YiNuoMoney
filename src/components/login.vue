<template>
<div class="login">
    <div class="froms">
        <toast_loading :show="loading"></toast_loading>
        <van-form @submit="onSubmit">
            <van-field v-model="user.user_phone" name="用户名" placeholder="手机号/用户名" />
            <van-field v-model="user.user_pwd" type="password" name="密码" placeholder="密码"/>
            <div style="margin: 26px 0 0;">
                <van-button block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        user:{
          user_phone: '',
          user_pwd: '',
        },
        msgPhone:'发送验证码',
        totalTime:60,
        canClick:true,
        loading:false,
      }
    },
    methods:{
      onSubmit(values) {
        let _true = true;
        if (this.username == ''){
          this.$toast({position:'bottom', message:'手机号/用户名不能为空'});
          _true = false;
          return false;
        }
        if (this.password == ''){
          this.$toast({position:'bottom', message:'密码不能为空'});
          _true = false;
          return false;
        }
        this.loading = _true
        let json = JSON.stringify(this.user);
        let jso = {jsonUser:json}
        this.$addtitle('user/select_User.po',jso).then(res=>{
          if (res.status === 200){
            this.loading = false;
            if (res.data.data instanceof Array == _true){
              this.$toast.success('登录成功');
              sessionStorage.setItem('user',JSON.stringify(res.data.data));
              localStorage.setItem('user_local',JSON.stringify(res.data.data));
              this.$store.commit('company_id',res.data.data[0].user_company)
              //判断个人信息 user_company没值跳到绑定页面  反之跳到home页面
              if (res.data.data[0].user_company  == '' || res.data.data[0].user_company == undefined || res.data.data[0].user_company == null){
                this.$router.push({name:'bind_this'});
              }else{
                this.$router.push({name:'home'});
              }
            }else if (res.data.data == '暂无数据'){
              this.$toast.fail("账号或密码有误");
            }else{
              this.$toast.fail('没有此用户请注册');
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
        })
      },
      gotime(){
        if (!this.canClick) return
        this.canClick = false
        this.msgPhone = this.totalTime + 's后重新发送'
        let time = localStorage.getItem('time');
        let clock = window.setInterval(() => {
          this.totalTime--;
          localStorage.setItem('time',this.totalTime);
          this.msgPhone = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.msgPhone = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true
          }
        },1000)
      },
    },
    created() {

    }
  }
</script>

<style scoped>

</style>

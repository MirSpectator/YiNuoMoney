<template>
    <div class="registered">
        <toast_loading :show="loadding"></toast_loading>
        <div class="froms">
            <van-form @submit="onSubmit">
                <van-field v-model="user.user_phone" name="手机号" placeholder="手机号" />
                <van-field v-model="user.code" name="验证码" placeholder="验证码"/>
                <van-field v-model="user.user_pwd" type="password" name="密码" placeholder="密码"/>
                <van-field v-model="user.user_name" name="姓名" placeholder="姓名"/>
                <div class="time" :class="{canClick:!canClick}" @click="gotime">{{msgPhone}}</div>
                <div style="margin: 26px 0 0;">
                    <van-button block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
  export default {
    name: "registered",
    inject:['reload'],
    data(){
      return{
        user:{
          user_phone: '',
          code: '',
          user_pwd:'',
          user_name:'',
          msgId:''
        },
        msgPhone:'发送验证码',
        totalTime:60,
        canClick:true,
        loadding:false,//加载动画
      }
    },
    created(){

    },
    methods:{
      onSubmit() {
        var _true = true;
        let then = this;
        var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;   //手机号
        var code = /^[0-9]*$/ // 验证数字
        var pwd = /^[a-zA-Z0-9_]{0,}$/; //密码不能为中文
        var nameReg = /^[\u4E00-\u9FA5]{2,10}$/ // 验证人的名字
        if (this.user.user_phone == ''){
          this.$toast({position:'bottom', message:'手机号不能为空'});
          _true = false;
          return false;
        }
        if (!telStr.test(this.user.user_phone)){
          this.$toast({position:'bottom', message:'手机格式出错'});
          _true = false;
          return false;
        }
        if (this.user.code == ''){
          this.$toast({position:'bottom', message:'验证码不能为空'});
          _true = false;
          return false;
        }
        if (!code.test(this.user.code)){
          this.$toast({position:'bottom', message:'验证码格式有误'});
          _true = false;
          return false;
        }
        if (this.user.user_pwd == ''){
          this.$toast({position:'bottom', message:'密码不能为空'});
          _true = false;
          return false;
        }
        if (!pwd.test(this.user_pwd)){
          this.$toast({position:'bottom', message:'密码格式有误'});
          _true = false;
          return false;
        }
        if (this.user.user_name == ''){
          this.$toast({position:'bottom', message:'姓名不能为空'});
          _true = false;
          return false;
        }
        if (!nameReg.test(this.user.user_name)){
          this.$toast({position:'bottom', message:'姓名格式有误'});
          _true = false;
          return false;
        }
        this.loadding = true;
        let json = JSON.stringify(this.user);
        let jso = {jsonUser:json}
        this.$addtitle('user/add_User.po',jso).then(res=>{
          this.loadding = false;
          if (res.status === 200){
            if (res.data.data == '注册成功'){
              this.$toast.success('注册成功');
              this.$router.push({name:'bind_this'});
              let data = JSON.stringify({user_id:res.data.user_id,msg:this.user.user_name});
              sessionStorage.setItem('user_id',data);
            }else{
              this.$toast.fail('账号或密码有误');
            }
          }
        }).catch(err=>{
          this.$toast.fail('数据异常');
          this.loadding = false;
        })
      },
      gotime(){
        if (!this.canClick) return  //改动的是这两行代码
        let _true = true;
        var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;   //手机号
        if (this.user.user_phone == ''){
          this.$toast({position:'bottom', message:'手机号不能为空'});
          _true = false;
          return false;
        }
        if (!telStr.test(this.user.user_phone)){
          this.$toast({position:'bottom', message:'手机格式出错'});
          _true = false;
          return false;
        }
        this.axios.get('user/code.po?phone='+this.user.user_phone).then(res=>{
          this.user.msgId = res.data.data;
        })
        this.canClick = false
        this.msgPhone = this.totalTime + 's后重新发送'
        let clock = window.setInterval(() => {
          this.totalTime--;
          this.msgPhone = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.msgPhone = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true  //这里重新开启
          }
        },1000)
      },
    }
  }
</script>

<style scoped>

</style>

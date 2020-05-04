<template>
    <div>
        <header_header title="公司绑定"></header_header>
        <toast_loading :show="loading"></toast_loading>
        <div class="i-from">
            <div class="froms">
            <van-field name="radio" label="绑定信息">
                <template #input>
                    <van-radio-group v-model="radio" @change="radioChange" direction="horizontal">
                        <van-radio name="1">绑定公司</van-radio>
                        <van-radio name="2">新建公司</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-form v-show="userShow">
                <van-field v-model="user.user_phone" name="手机号" label="手机号" placeholder="请输入手机号"/>
                <van-field v-model="user.code" name="验证码" label="验证码" placeholder="请输入验证码"/>
                <div class="time" :class="{canClick:!canClick}" @click="gotime">{{msgPhone}}</div>
            </van-form>
            <van-form v-show="pwdShow">
                <van-field v-model="not.company_name" name="新建公司" label="新建公司" placeholder="请输入公司名称"/>
                <van-field v-model="not.company_credit" name="信用代码" label="信用代码" placeholder="信用代码"/>
            </van-form>
            <div style="margin: 16px;">
                <submit_submit text="保存" @click="submitG"></submit_submit>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "bind_this",
    data(){
      return{
        radio: '1',
        user:{
          user_phone:'',
          code:'',
          msgId:'',
          user_id:'',
        },
        not:{
          company_name:'',
          company_credit:'',
          user_id:'',
        },
        userShow:true,
        pwdShow:false,
        msgPhone:'发送验证码',
        totalTime:60,
        canClick:true,
        loading:false
      }
    },
    created(){
      this.fun();
    },
    methods:{
      //获取登录 注册id
      fun(){
        let id = '';
        console.log('注册：'+sessionStorage.getItem('user_id'))
        console.log('登录：'+sessionStorage.getItem('user'))
        if (sessionStorage.getItem('user') !== null){
          let user_id_login = JSON.parse(sessionStorage.getItem('user'))[0].user_id;
          id+=user_id_login;
          console.log('login：'+user_id_login)
        }else if (sessionStorage.getItem('user_id') !== null){
          let regesitred_user_id = JSON.parse(sessionStorage.getItem('user_id')).user_id;
          id+=regesitred_user_id;
          console.log('注册：'+regesitred_user_id)
        }
        this.user.user_id = id;
        this.not.user_id = id;
      },
      radioChange(val){
        //1代表绑定公司  2代表新建公司   在if内部写条件
        if (val == 1){
          this.userShow = true;
          this.pwdShow = false;
        }else if(val == 2){
          this.userShow = false;
          this.pwdShow = true;
        }
      },
      //提交
      submitG(){
        if (this.radio == 1){
          let _true = true;
          let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;   //手机号
          let code = /^[0-9]*$/ // 验证数字
          if(this.user.user_phone == ''){
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
          let json = JSON.stringify(this.user);
          let jso = {jsonUser:json};
          this.loading = _true;
          this.$addtitle('company/already_Company.po',jso).then(res=>{
            if (res.status === 200){
              this.loading = false;
              if (res.data.data != undefined || res.data.data != null || res.data.data != ''){
                this.$toast.success('绑定成功');
                sessionStorage.setItem('company_id',res.data.data);
                this.$store.commit('company_id',res.data.data);
                this.$router.push({name:'home'});
              }else{
                this.$toast.fail('绑定失败');
                this.loading = false;
              }
            }
          }).catch(err=>{
            this.$toast.fail('数据异常');
          })
        }else if (this.radio == 2){
          let _true = true;
          let nameReg = /^[\u4E00-\u9FA5]{2,10}$/ // 验证是否为中文
          if(this.not.company_name == ''){
            this.$toast({position:'bottom', message:'新建公司不能为空'});
            _true = false;
            return false;
          }
          if (!nameReg.test(this.not.company_name)){
            this.$toast({position:'bottom', message:'新建公司格式有误'});
            _true = false;
            return false;
          }
          let json = JSON.stringify(this.not);
          let jso = {jsonCompany:json};
          this.loading = _true;
          this.$addtitle('company/new_Company.po',jso).then(res=>{
            if (res.status === 200){
              this.loading = false;
              if (res.data.data != undefined ||res.data.data != null || res.data.data != ''){
                this.$toast.success('创建成功');
                sessionStorage.setItem('company_id',res.data.data);
                this.$store.commit('company_id',res.data.data)
                this.$router.push({name:'home'});
              }else{
                this.$toast.fail('绑定失败');
              }
            }
          }).catch(err=>{
            this.this.loading = false;
            this.$toast.fail('数据异常');
          })
        }
      },
      gotime(){
        if (!this.canClick) return  //改动的是这两行代码
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
@import "../../assets/css/public.css";
.froms{width: 100%;}
    .time{top: 102px}
/deep/.van-icon-wap-home-o::before,/deep/.van-icon-arrow-left::before{content: none}
</style>

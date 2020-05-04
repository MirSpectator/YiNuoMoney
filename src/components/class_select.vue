<template>
    <div>
        <div class="select_option">
            <label>相关项目</label>
            <select v-model="fund_detail_name" :class="{garyList:fund_detail_name === '',blackList:fund_detail_name!==''}" @change="RadioConfirm(fund_detail_name)">
                <option value="" selected="selected">请选择</option>
                <option v-for="(item,i) in Radiocolumns" :value="item.id" :key="i">{{item.fund_name}}</option>
            </select>
        </div>
        <div class="select_option">
            <label>款项名称</label>
            <select v-model="detailed" :class="{garyList:detailed === '',blackList:detailed!==''}" @change="detailedConfirm(detailed)">
                <option value="" selected="selected">请选择</option>
                <option v-for="(item,i) in detailedcolumns" :key="i" :value="item.id">{{item.fund_name}}</option>
            </select>
        </div>
        <div class="select_option" v-show="slimShow">
            <label>款项名称</label>
            <select v-model="slim" :class="{garyList:slim === '',blackList:slim!==''}" @change="slimConfirm(slim)">
                <option value="" selected="selected">请选择</option>
                <option v-for="(item,i) in slimcolumns" :key="i" :value="item.id">{{item.fund_name}}</option>
            </select>
        </div>
    </div>
</template>

<script>
  export default {
    name: "class_select",
    data(){
      return{
        fund_detail_name:'',//相关项目
        Radiocolumns:'',//相关项目数据
        detailed:'',//款项名称
        detailedcolumns:'',//款项名称数据
        slim:'',//款项详细
        slimShow:false,//3级菜单隐藏
        slimcolumns:'',//款项详细数据
        fund_id:'',//最后需要的数据id
      }
    },
    created(){
      this.fundList();
    },
    methods:{
      //相关项目
      RadioConfirm(value){
        this.fund_id = value;
        this.$emit('monitor',this.fund_id)
        //点击相关项目直接向后台发送数据进行查找第二级菜单的数据，如果有直接返回到二级菜单
        this.fundList_two(value).then(res=>{
          if (res.data.data.length > 0){
            //数据返到二级菜单
            this.detailedcolumns = res.data.data;
            //3级菜单false + 清空 + 2级菜单清空
            this.slimShow = false;  //3
            this.slim = '';         //3
            this.detailed = '';     //2
          }
        })
      },
      //款项名称
      detailedConfirm(value){
        this.fund_id = value;
        this.$emit('monitor',this.fund_id)
        //点击款项名称向后台发送数据进行查找第三级菜单的数据，如果有，显示3级菜单并将数据渲染，没有则false
        this.fundList_two(value).then(res=>{
          if (res.data.data === '无数据'){
            this.slimShow = false;
          }else{
            this.slimShow = true;
            this.slimcolumns = res.data.data;
          }
        })
      },
      //款项详细
      slimConfirm(value){
        this.fund_id = value;
        this.$emit('monitor',this.fund_id)
      },
      //分类
      fundList(){
        this.loadding = true;
        this.$moneyGet('fund/select_fundName.po?fund_stale=1&level=1&company_id='+this.$store.getters.company_id).then(res=>{
          if (res.status === 200){
            this.loadding = false;
            this.Radiocolumns = res.data.data;
            if (res.data.data.length >0){
              for (let index in res.data.data){
                if (res.data.data[index].fund_name === '公司'){
                  //获取公司ID并渲染
                  this.fund_detail_name = res.data.data[index].id;
                  //公司id传入需要用的变量名
                  this.fund_id = res.data.data[index].id;
                  this.fundList_two(res.data.data[index].id).then(res=>{
                    this.detailedcolumns = res.data.data;
                  });
                }else{
                  //获取公司ID并渲染
                  this.fund_detail_name = res.data.data[0].id;
                  //公司id传入需要用的变量名
                  this.fund_id = res.data.data[0].id;
                  this.fundList_two(res.data.data[0].id).then(res=>{
                    this.detailedcolumns = res.data.data;
                    this.fund_id = res.data.data;
                  });
                }
              }
            }
          }
        });
      },
      //封装连查
      fundList_two(id){
        return new Promise((resolve, reject) => {
          this.$moneyGet('fund/select_fundName.po?fund_stale=1&parentid='+id+'&company_id='+this.$store.getters.company_id).then(res=>{
            resolve(res);
          }).catch(err=>{
            reject(err);
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/public.css";
    @import "../assets/css/vue_style.scss";
</style>

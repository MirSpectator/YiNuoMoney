<template>
    <div class="select_option">
        <label>{{label}}</label>
        <select v-model="money_rate" @change="rate(money_rate)" :class="{garyList:money_rate === '',blackList:money_rate!==''}">
            <option value="">请选择</option>
            <option v-for="(item,i) in money_ratecolumns" :key="i" :value="item.text">{{item.text}}%</option>
        </select>
    </div>
</template>

<script>
  export default {
    name: "fee",
    props:['label'],
    data(){
      return{
        money_rate:'',//手续费
        money_ratecolumns:[
          {text:0.6},
          {text:0.55},
          {text:0.38},
          {text:0.57},
        ],
      }
    },
    methods:{
      rate(val){
        let data = 0;
        if (val === 0.6){
          data = 0.006;
        }else if (val === 0.55){
          data = 0.0055;
        }else if (val === 0.38){
          data = 0.0038;
        }else if (val === 0.57){
          data = 0.0057;
        }
        this.$emit('rate',data);
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../assets/css/vue_style.scss";
    @import "../assets/css/public.css";
</style>

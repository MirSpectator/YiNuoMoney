<template>
    <div class="select_option">
        <label>{{label}}</label>
        <select v-model="list" :class="{garyList:list === '',blackList:list!==''}">
            <option value="" selected>请选择</option>
            <option v-for="(item,i) in list_data" :key="i" :value="item">123</option>
        </select>
    </div>
</template>

<script>
  export default {
    name: "select_option",
    props:{
      label:{type:null},
      value:{type:null},

    },
    data(){
      return{
        list:this.value
      }
    },
    watch:{
      value(val){
        this.list = val;
      },
      label(val){
        this.$emit('input',val);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

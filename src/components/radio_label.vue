<template>
    <div class="radio">
        <label>{{label}}</label>
        <el-radio v-for="(item,i) in listRadio" v-model="radio" :label="item.name">item.name</el-radio>
    </div>
</template>

<script>
  export default {
    name: "radio_label",
    props:['label','listRadio'],
    data(){
      return{
        radio: '1',
      }
    }
  }
</script>

<style scoped>
.radio label:nth-child(1){width: 90px;display: block;font-size: 14px}
    .radio {display: flex;padding: 10px 16px;border-bottom: 1px solid #dadada;box-sizing: border-box;}
/deep/.el-radio__inner{width: 1.25em;height: 1.25em}
</style>

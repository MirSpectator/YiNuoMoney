<template>
    <div class="time_data">
        <label>{{label}}</label>
        <el-date-picker v-model="time" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </div>
</template>

<script>
  export default {
    name: "time_data",
    props:{
      label:{type:null},
      value:{type:null},
    },
    data(){
      return{
        time:this.value
      }
    },
    watch:{
      time(val){
        this.$emit('input',val);
        this.$emit('change',val)
      }
    }
  }
</script>

<style lang="scss">
    .el-time-panel{width: 160px}
    .time_data{
        position: relative;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 2px 16px;
        color: #323233;
        line-height: 40px;
        border-bottom: 1px solid #DADADA;
        label{
            flex: none;
            box-sizing: border-box;
            width: 90px;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            overflow: visible;
            flex: 1;
        }
        .el-input--prefix .el-input__inner{padding-left: 0}
    }
</style>

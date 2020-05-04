<template>
    <div class="submit_submit">
        <div class="form-btn">
            <button type="submit" id="btn" class="mui-btn mui-btn-blue" @click="sunmitClick">{{text}}</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "submit_submit",
    props:[
      'text',
    ],
    data(){
      return{

      }
    },
    methods:{
      sunmitClick(){
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>

</style>

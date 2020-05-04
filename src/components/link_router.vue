<!---->
<template>
    <div class="link_router">
        <div class="link">
            <van-cell is-link @click="HClick">{{text}}</van-cell>
        </div>
    </div>
</template>

<script>

  export default {
    name: "link_router",
    props:[
      'text'
    ],
    data(){
      return{
        // aaa:'23'
      }
    },
    methods:{
      HClick(){
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>

</style>

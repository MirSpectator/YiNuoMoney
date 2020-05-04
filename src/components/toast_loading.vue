<template>
    <div class="toast_loading">
        <van-overlay :show="show">
            <van-loading size="50" ref="sh"/>
        </van-overlay>
    </div>
</template>

<script>
  export default {
    name: "toast_loading",
    props:[
      'show'
    ],
    data(){
      return{

      }
    },
    methods:{

    },
    created() {

    }
  }
</script>

<style scoped>
    .van-overlay{z-index: 2500;background-color: rgba(0,0,0,0.52)}
</style>

<template>
  <div id="app">
    <router-view v-if="isRouterShow"/>
  </div>
</template>

<script>
  export default {
    name:'app',
    provide(){
      return{
        reload:this.reload,
      }
    },
    data(){
      return{
        isRouterShow:true,
        isLoading: false,
      }
    },
    created(){
      /*if (sessionStorage.getItem('state')){
        this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem('user'))))
      }
      window.addEventListener('beforeunload',()=>{
        sessionStorage.setItem('state',JSON.stringify(this.$store.state))
      })*/
    },
    methods:{
      reload(){
        this.isRouterShow = false;
        this.$nextTick(function () {
          this.isRouterShow = true;
        })
      },
    }
  }
</script>
<style>
label{font-size: 14px}
</style>

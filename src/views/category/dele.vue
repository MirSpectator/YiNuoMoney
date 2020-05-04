<template>
    <div class="dele">
        123
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        page:0,
        number:2,
      };
    },
    created(){

    },
    methods: {
      onLoad() {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          for (let i=0;i< 10;i++){
            this.list.push(this.list.length + 1);
          }
          this.loading = false;
          if (this.list.length >= 100){
            this.finished = true
          }
        }, 1000);
      },
    }
  }
</script>

<style scoped>
</style>

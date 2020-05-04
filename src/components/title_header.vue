<template>
    <div class="title_header">
        <div class="one-img">
            <div class="customer">
                <h2>{{title_header}}</h2>
                <p>/{{title_header_one}}</p>
            </div>
            <div class="mui-img" v-show="title_header_show">
                <div>￥{{allMoney}}</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "title_header",
    props:[
      'title_header',
      'title_header_one',
      'allMoney',
      'title_header_show'
    ],
    data(){
      return{

      }
    }
  }
</script>

<style scoped>

</style>

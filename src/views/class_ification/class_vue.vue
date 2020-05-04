<template>
    <div class="class_vue">
        <header_header title="分类"></header_header>
        <title_header title_header="分类" title_header_one="class_vue"></title_header>
        <div class="i-from">
            <div class="nine">
                <van-grid clickable :column-num="3" icon-size="40">
                    <van-grid-item :icon="item.images" v-for="(item,i) in list" :key="i" :text="item.text" :to="item.href" />
                </van-grid>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "class_vue",
    data(){
      return{
        list:[
          {images:require("@/assets/images/xgr.png"),text:'相关人',href:'/home/class_vue/people'},
          {images:require("@/assets/images/621.png"),text:'项目名称',href:'/home/class_vue/projet_name'},
        ]
      }
    }
  }
</script>

<style scoped>
</style>

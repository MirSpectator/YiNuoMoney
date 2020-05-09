<template>
    <div class="site_people">
        <van-field :label="labe" v-model="site" :placeholder="place" @keyup="siteKeyuo(site)"  @input="myChange"/>
        <ul class="bckShow" v-show="listShow">
            <li v-for="(item,i) in list_columns" :key="i" @click="onClick(item.customer_name,item.customer_id)">{{item.customer_name}}</li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "site_people",
    props:{
      labe:{type:String},
      value:{type: null},
      place:{type:String},
    },
    data(){
      return{
        site:this.value,
        site_id:'',
        columns: [],
        list_columns:[],
        listShow:false
      }
    },
    methods:{
		//监听输入框的变化
	  myChange(){
		  if(this.site===""){
			  this.$emit('change',this.site)
		  }else {
			  this.$emit('change',this.site,this.site_id)
		  }
	  }	,
      siteKeyuo(val){
        let then = this;
        if (val.length == ''){
          this.listShow = false;
        }else{
          this.listShow = true;
          let list = [];
          if (this.columns != ''){
            this.columns.map(function (item) {
              if (item.customer_name.search(then.site) != -1){
                list.push(item);
              }
            })
          }
          this.list_columns = list;
        }
      },
      onClick(value,id) {
        this.site = value;
        this.site_id = id;
        this.$emit('site_peoples',value,this.site_id);
        this.$emit('change',this.site,id)
		this.listShow = false;
      },
      siteName(){
        let data = this.$store.state.company_id;
        this.$moneyGet('customer/select_Customer_Name.po?company_id='+data).then(res=>{
          this.columns = res.data.data
        })
      }
    },
    created(){
      //  工地名称
      this.siteName();
    },
    watch:{
    }
  }
</script>

<style scoped>
/*.bckShow{background-color: white;position: absolute;z-index: 1000;right: 0;left: 0}
    .bckShow>li{padding: 8px 18px;border-bottom: 1px solid #d6d6d6}*/
</style>

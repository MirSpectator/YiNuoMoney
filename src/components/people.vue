<template>
    <div class="people">
        <van-field :label="peopleLabel" v-model="listRelevant" :placeholder="placePeople" @keyup="peopleKeyuo(listRelevant)"/>
        <ul class="bckShow" v-show="peopleShow">
            <li v-for="(item,i) in peopleArray" :key="i" @click="peopleClick(item.fund_person,item.fund_person_id)">{{item.fund_person}}</li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "people",
    props:{
      peopleLabel:{type:String},
      value:{type: null},
      placePeople:{type:String},
    },
    data(){
      return{
        listRelevant:this.value,
        listRelevant_id :'',
        list_people:[],
        peopleArray:[],
        peopleShow:false
      }
    },
    methods:{
      peopleKeyuo(val){
        let then = this;
        if (val == ''){
          this.peopleShow = false;
        }else{
          this.peopleShow = true;
          let list = [];
          if (this.list_people != ''){
            this.list_people.map(function (item) {
              if (item.fund_person.search(then.listRelevant) != -1){
                list.push(item);
              }
            })
          }
          this.peopleArray = list;
        }
      },
      peopleClick(val,id){
        this.listRelevant = val;
        this.listRelevant_id = id;
        this.$emit('peopleList',val,id);
        this.peopleShow = false;
      },
      people_name(){
        this.$moneyGet('fund_person/select_Fund_Person.po?fund_stale=1&company_id='+JSON.parse(sessionStorage.getItem('user'))[0].user_company).then(res=>{
          this.list_people = res.data.data;
        })
      }
    },
    created(){
      this.people_name();
    },
    watch:{
    }
  }
</script>

<style scoped>

</style>

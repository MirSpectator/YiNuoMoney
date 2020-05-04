<template>
    <div class="receivable_money">
        <header_header to="home" title="应收应付汇总"></header_header>
        <toast_loading :show="loadding"></toast_loading>
         <title_header title_header="应收应付汇总" title_header_one="Receivables"></title_header>
           <router-link :to="{name:'Receivablepayable_entry'}">
          <div class="margin">
           <svg t="1584950925110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2639" data-spm-anchor-id="a313x.7781069.0.i0" width="30" height="30"><path d="M832 469.333333H554.666667V192c0-25.6-17.066667-42.666667-42.666667-42.666667s-42.666667 17.066667-42.666667 42.666667V469.333333H192c-25.6 0-42.666667 17.066667-42.666667 42.666667s17.066667 42.666667 42.666667 42.666667H469.333333v277.333333c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666667-42.666667V554.666667h277.333333c25.6 0 42.666667-17.066667 42.666667-42.666667s-17.066667-42.666667-42.666667-42.666667z" p-id="2640" data-spm-anchor-id="a313x.7781069.0.i1" class="selected" ></path></svg>
          </div>
        </router-link>
        <!--table-->
         <div class="btn">
             <van-field name="checkbox" label="汇总类型">
                 <template #input>
                     <van-checkbox v-model="revi"  @change="checkboxChange" shape="square" >应收</van-checkbox>
                     <van-checkbox v-model="ble"  @change="checkboxChange" shape="square" >应付</van-checkbox>
                 </template>
             </van-field>
        </div>
        <table border="0" cellspacing="0" cellpadding="0">
            <tr>
                <th><span>日期</span></th>
                <th><span>类别</span></th>
                <th><span>项目</span></th>
                <th><span>相关人</span></th>
                <th><span>金额</span></th>
            </tr>
            <tr v-for="(item,i) in data" :key="i" @click="dataClick(item)" v-show="data !== '暂无数据'">
                <td><span>{{time(item.fund_detail_date)}}</span></td>
                <td><span>{{item.fund_name}}</span></td>
                <td><span>{{item.customer_name}}</span></td>
                <td><span>{{item.fund_person}}</span></td>
                <td>
                    <span v-if="item.fund_detail_money>0">￥{{item.fund_detail_money}}</span>
                    <span v-else :style="red_monye">￥{{negative(item.fund_detail_money)}}</span>
                </td>
            </tr>
        </table>
        <div v-show="data === '暂无数据'" style="text-align: center">
            无数据
        </div>
        <div class="footer">
            <div class="box">
                总金额:￥{{all_money}}
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "receivable_money",

    data(){
      return{
        loadding:false, //加载
        data:'',    //流水
        data_bacup:'',//流水
        revi: false,    //应收
        ble:false,//应付
        all_money:0,//金额
        list_th:[
          {text:'应收日期'},
          {text:'类别'},
          {text:'项目'},
          {text:'相关人'},
          {text:'金额'},
        ],
        red_monye:{color:'red'}
      }
    },
    created(){
      this.list_list();
    },
    methods:{
      //去掉-号
      negative(value){
        if (value < 0){
          return (value.toString()).replace(/[-]/g,'');
        }
      },
      //所有流水
      list_list(){
        this.$addtitle('fund/select_beforehand_fund.po').then(res=>{
          this.data = res.data.data;
          this.data_bacup = res.data.data;
          let all_money = 0;//总金额;
          //计算总金额
          for (var index in this.data){
            all_money+=this.data[index].fund_detail_money;
          }
          this.all_money = all_money;
        })
      },
      //复选框筛选
      checkboxChange(val){
        let then = this;
        let list = [];//筛选应收应付
        let money = 0;//筛选出的总金额金额
        if (this.revi == true && this.ble == false){
          //筛选应收
          this.data.map(function (item) {
            if (item.fund_detail_money > 0){
              list.push(item);
              money+=item.fund_detail_money;
            }
          });
          this.data = list;
          this.all_money = money;
        }else if (this.ble == true && this.revi == false){
          //筛选应付
          this.data.map(function (item) {
            if (item.fund_detail_money < 0){
              list.push(item);
              money+=item.fund_detail_money;
            }
          });
          this.data = list;//筛选出的数据渲染
          this.all_money = money;//筛选出的流水 金额全部相加;
        }else if (this.revi == true && this.ble == true || this.revi == false && this.ble == false){
          //不在筛选全部流水
          this.data = this.data_bacup;
          //所有金额
          for (var index in this.data){
            money+=this.data[index].fund_detail_money;
          }
          this.all_money = money;
        }
      },
      //日期时分秒
      time(data){
        let date = new Date(data);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m<10?m="0"+m:m;
        let d = date.getDate();
        d<10?d="0"+d:d;
        return `${y}-${m}-${d}`;
      },
    //  点击详情
      dataClick(val){
        let values = {customer_name:val.customer_name,fund_person:val.fund_person,fund_person_id:val.fund_person_id,fund_id:val.fund_id,fund_detail_id:val.fund_detail_id,fund_name_id:val.fund_name_id,
          fund_name:val.fund_name,customer_id:val.customer_id}
        let data = JSON.stringify(values)
        this.$router.push({path:`/home/receivable_money/account_translation/${data}`});
      }
    }
  }
</script>

<style scoped>
    /deep/.van-collapse-item__content{background-color: transparent!important;padding: 0}
    .van-cell{padding: 7px 16px}
    table{width: 100%;text-align: left;font-size: 13px;white-space: nowrap;margin-bottom: 100px}
    table tr{border-bottom: 1px solid #DADADA;line-height: 28px}
    table tr th{background-color: #DADADA;line-height: 27px}
    table tr th:nth-child(1),table tr td:nth-child(1){padding-left: 16px}
    table tr th:nth-child(1){min-width: 75px;width: 20%}
    table tr th:nth-child(2){min-width: 57px;width: 14%}
    table tr th{min-width: 44px;width: 32%}
    table tr th:nth-child(4){min-width: 44px;width: 12%}
    table tr th:nth-child(5){min-width: 44px;width: 22%}
    table tr td:nth-child(3) span{width: 102px;overflow: hidden;white-space: nowrap;display: block;text-overflow: ellipsis}
    /*底部*/
    .footer{position: fixed;bottom: 0;background-color: #acacac;width: 100%;line-height: 29px;font-size: 15px;text-align: right;}
    .footer .box{padding-right: 30px}
    .wid{width: 30%;margin: 0px 0px 20px 13% }
    .margin{ width: 30px; float: right;position: absolute;right: 5%;top: 9%;}

    /*单选框*/
    .van-checkbox{width: 73px}
</style>

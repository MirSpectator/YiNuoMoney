<template>
    <div class="running_money">
<!--        导航条-->
        <header_header :title="title"></header_header>
        <!--        加载动画-->
        <toast_loading :show="loadding"></toast_loading>
<!--        标题-->
        <title_header :title_header="title" title_header_one="administration"></title_header>
<!--        账单-->
            <div class="download">
                <span @click="linkHref">下载账单</span>
                <span @click="recent">最近数据</span>
            </div>
<!--        详情-->
        <van-popup v-model="show">
            <flowing_details :list-json="List_search_edit" @deletes="deletes"></flowing_details>
        </van-popup>
        <van-popup v-model="show_money">
            <transfer_running_money_details :list-json="List_search_edit" :fund="fund" :moneyss="moneyss" @deletes="deletes"></transfer_running_money_details>
        </van-popup>
<!--        数据-->
        <div class="search">
            <van-field v-model="SearchValue" :border="true" size="100" label="输入关键字" placeholder="请输入关键字"/>
            <van-collapse v-model="activeNames">
                <van-collapse-item title="查询" name="1">
                    <van-field readonly clickable name="picker" :value="bank_person" label="户主" placeholder="点击选择户主" @click="bank_personPicker = true"/>
                    <van-popup v-model="bank_personPicker" position="bottom">
                        <van-picker show-toolbar :columns="bank_personcolumns" @confirm="bank_personConfirm" @cancel="bank_personPicker = false"/>
                    </van-popup>
                    <van-field readonly clickable name="picker" :value="bank_bank" label="开户行" placeholder="点击选择开户行" @click="bank_bankPicker = true"/>
                    <van-popup v-model="bank_bankPicker" position="bottom">
                        <van-picker show-toolbar :columns="bank_bankcolumns" @confirm="bank_bankConfirm" @cancel="bank_bankPicker = false"/>
                    </van-popup>
                    <van-field readonly clickable name="picker" :value="bank_number" label="尾号" placeholder="点击选择尾号" @click="bank_numberPicker = true"/>
                    <van-popup v-model="bank_numberPicker" position="bottom">
                        <van-picker show-toolbar :columns="bank_numbercolumns" @confirm="bank_numberConfirm" @cancel="bank_numberPicker = false"/>
                    </van-popup>
                    <van-field readonly clickable name="picker" :value="dateStart" label="起始时间" placeholder="点击选择起始时间" @click="dateStartPicker = true"/>
                    <van-popup v-model="dateStartPicker" position="bottom">
                        <van-picker show-toolbar :columns="dateStartcolumns" @confirm="dateStartConfirm" @cancel="dateStartPicker = false"/>
                    </van-popup>
                    <van-field readonly clickable name="picker" :value="dateEnter" label="结束时间" placeholder="点击选择结束时间" @click="dateEnterPicker = true"/>
                    <van-popup v-model="dateEnterPicker" position="bottom">
                        <van-picker show-toolbar :columns="dateEntercolumns" @confirm="dateEnterConfirm" @cancel="dateEnterPicker = false"/>
                    </van-popup>
                    <van-field readonly clickable name="picker" :value="fund_nameo" label="类别选择" placeholder="点击选择类别选择" @click="fund_nameoPicker = true"/>
                    <van-popup v-model="fund_nameoPicker" position="bottom">
                        <van-picker show-toolbar :columns="fund_nameocolumns" @confirm="fund_nameoConfirm" @cancel="fund_nameoPicker = false"/>
                    </van-popup>
                    <van-field readonly clickable name="picker" :value="list_fund_namea" label="类别名称" placeholder="点击选择类别名称" @click="list_fund_nameaPicker = true"/>
                    <van-popup v-model="list_fund_nameaPicker" position="bottom">
                        <van-picker show-toolbar :columns="list_fund_nameacolumns" @confirm="list_fund_nameaConfirm" @cancel="list_fund_nameaPicker = false"/>
                    </van-popup>
                    <van-field readonly clickable name="picker" :value="customer_name" label="工地名称" placeholder="点击选择工地名称" @click="customer_namePicker = true"/>
                    <van-popup v-model="customer_namePicker" position="bottom">
                        <van-picker show-toolbar :columns="customer_namecolumns" @confirm="customer_nameConfirm" @cancel="customer_namePicker = false"/>
                    </van-popup>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="table_list">
            <div class="div-th">
                <div>户主</div>
                <div>开户行</div>
                <div>交易金额</div>
                <div>余额</div>
                <div>日期</div>
            </div>
            <div class="div-table" @scroll="scrolls">
                <div class="div-tr" v-for="(item,i) in table_search" :key="i">
                    <div>{{item.bank_person}}</div>
                    <div>{{item.bank_name}}</div>
                    <div @click="moneyClick(item)">
                                <span :class="{money_green:item.bank_deal_money>0,money_red:item.bank_deal_money<0}"
                                      v-if="item.bank_deal_money">￥{{negative(item.bank_deal_money)}}</span>
                        <span :class="{money_green:item.fund_detail_transaction_money>0,money_red:item.fund_detail_transaction_money<0}"
                              v-if="item.fund_detail_transaction_money">￥{{negative(item.fund_detail_transaction_money)}}</span>
                    </div>
                    <div :style="floorNumber">
                        <span v-if="item.money !== undefined || item.money !==''">￥{{item.money}}</span>
                        <span v-if="item.money === '' || item.money === undefined">￥无</span>
                    </div>
                    <div>
                        <span v-if="item.fund_detail_transaction_date !== undefined && item.fund_detail_transaction_date !==''">{{titleDh(item.fund_detail_transaction_date)}}</span>
                        <span v-else-if="item.bank_deal_date !==undefined && item.bank_deal_date !==''">{{titleDh(item.bank_deal_date)}}</span>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div>TOTAL</div>
            <em :style="green">￥{{green_money}}</em>
            <em :style="red">￥{{negative(red_money)}}</em>
            <div>￥{{all_money}}</div>
        </footer>
    </div>
</template>

<script>
    import flowing_details from "./flowing_details"
    import transfer_running_money_details from "./transfer_running_money_details"
  export default {
    name: "running_money",
    components:{
      'flowing_details':flowing_details,
      'transfer_running_money_details':transfer_running_money_details
    },
    data(){
      return{
        title:'现金流水',
        SearchValue:'',//关键字搜索
        activeNames:[],//下拉显示
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],//下拉选择
        showPicker: false,//是否显示
        bank_person:'',//户主
        bank_person_id:'',//户主id
        bank_personcolumns:[],//户主下拉列表
        bank_bank:'',//开户行
        bank_bank_id:'',//开户行id
        bank_bankcolumns:[],//开户行列表
        bank_number:'',//尾号
        bank_numbercolumns:[],//尾号列表
        dateStart:'',//开始时间
        dateStartcolumns:[],//开始时间列表
        dateEnter:'',//结束时间
        dateEntercolumns:[],//结束时间列表
        fund_nameo:'',//类别选择
        fund_nameocolumns:[],//类别选择列表
        list_fund_namea:'',//类别名称
        list_fund_id:'',//类别id
        list_fund_nameacolumns:[],//类别名称列表
        customer_name:'',//工地名称
        customer_name_id:'',//工地名称id
        customer_namecolumns:[],//工地名称列表
        green_money:0,//绿色金额
        red_money:0,//红色金额
        all_money:0,//所有金额
        sh_data:'',//前两天时间
        show:false,
        show_money:false,
        //弹窗
        bank_personPicker:false,//户主弹窗
        bank_bankPicker:false,//开户行弹窗
        bank_numberPicker:false,//尾号
        dateStartPicker:false,//开始时间
        dateEnterPicker:false,//结束时间
        fund_nameoPicker:false,//类别选择
        list_fund_nameaPicker:false,//类别名称
        customer_namePicker:false,//工地名称
        flowing:false,//账单详情
        flowing_money:false,//账单详情
        List_search:[],//现金流水数据
        loadding:false,//加载
        List_search_edit:'',//渲染弹出的数据
        fund:'',//利息
        moneyss:'',//利息余额
        //流水详情
        list_data_details:'',//获取详情这条信息
        //样式
        floorNumber: {
          color: 'gray',
          paddingLeft: '5px'
        },
        red: {
          color: 'red',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
        green: {
          color: 'green',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
      }
    },
    created(){
      //现金流水总数据
      this.getData();
    },
    methods:{
      //户主
      bank_personConfirm(value){
        this.bank_person = value;
        this.bank_person_id = value;
        this.bank_personPicker = false;
      },
      //开户行
      bank_bankConfirm(value){
        this.bank_bank = value;
        this.bank_bank_id = value;
        this.bank_bankPicker = false;
      },
      //尾号
      bank_numberConfirm(value){
        this.bank_number = value;
        this.bank_numberPicker = false;
      },
      //开始时间
      dateStartConfirm(value){
        this.dateStart = value;
        this.dateStartPicker = false;
      },
      //结束时间
      dateEnterConfirm(value){
        this.dateEnter = value;
        this.dateEnterPicker = false;
      },
      //类别选择
      fund_nameoConfirm(value){
        this.fund_nameo = value;
        this.fund_nameoPicker = false;
      },
      //类别名称
      list_fund_nameaConfirm(value){
        this.list_fund_namea = value;
        this.list_fund_id = value;
        this.list_fund_nameaPicker = false;
      },
      //工地名称
      customer_nameConfirm(value){
        this.customer_name = value;
        this.customer_id = value;
        this.customer_namePicker = false;
      },
      onConfirm(value) {
        this.bank_person = value;
        this.showPicker = false;
      },
      //去掉-号
      negative(value){
          return (value.toString()).replace(/[-]/g,'');
      },
      //日期月日
      titleDh(date){
        var data = new Date(date);
        var m = (data.getMonth() + 1).toString();
        m<10?m='0'+m:m;
        var d = (data.getDate()).toString();
        d<10?d='0'+d:d;
        return m+'/'+d;
      },
      //最近数据
      recent(){
        let data = JSON.stringify(1);
        let jo = {};
        let json = {sort:data,jsonBank:JSON.stringify(jo),jsonFund: JSON.stringify(jo)}
        this.$addtitle('fund/select_Money.po',json).then(res=>{
          this.List_search = res.data.data;
          this.all_amounts(this.List_search);
        });
      },
      time (time) {
        var date = new Date(time)
        date.setMonth(date.getMonth() - 1)
        this.sh_data = date
        var month = date.getMonth() + 1
        var day = date.getDay();
        if (day < 10) {
          day = '0' + day
        }
        if (month < 10) {
          month = '0' + month
        }
        let h = date.getHours();
        h<10?h="0"+h:h;
        let m = date.getMinutes();
        m<10?m="0"+m:m;
        let s = date.getSeconds();
        s<10?s="0"+s:s;
        var shijian = date.getFullYear() + '-' + month + '-' + day +' ' + h+':'+m+':'+s;
        return shijian
      },
      //scrolls
      scrolls(e){
        let scrollTop = e.srcElement.scrollTop;
        let windowHeight = e.srcElement.clientHeight;
        let scrollHeight = e.srcElement.scrollHeight - 2;
        if (scrollTop+windowHeight >= scrollHeight) {
          var time = this.GetDateStr();
          if (time === this.sh_data) {
            var date = this.time(this.sh_data)
            this.fund_data(date)
          } else {
            var enddate = this.time(this.sh_data);
            var startdate = this.time(this.sh_data);
            this.fund_data(startdate, enddate)
          }
        }
      },
      //调用流水滑动
      fund_data(startdate,enddate){
        this.loadding = true;
        let data = {company_id: this.$store.state.company_id,startDate:startdate};
        if (enddate != null){
          data['endDate'] = enddate;
        }
        let datas = {jsonBank:JSON.stringify({}),jsonFund:JSON.stringify(data)};
        this.$addtitle('fund/select_Money.po',datas).then(res=>{
          if(res.data.data === '暂无数据'){
            this.$toast.success(res.data.data);
            this.loadding = false
          }else{
            this.$toast.success('加载成功');
            this.List_search = res.data.data;
            this.all_amounts(this.List_search);
            this.loadding = false
          }
        }).catch(err=>{
          this.$toast.fail('接口出现问题');
          this.loadding = false
        });
      },
      //通过接口查询出的信息进行更改格式 并渲染弹窗
      moneyClick(val){
        let data = '';
        //转账
        if (val.fund_detail_transaction_id ===undefined){
          this.$moneyGet('fund/bank_parentid.po?parentid='+val.bank_detail_parentid).then(res=>{
            this.show_money = true;
            this.List_search_edit = res.data.bank_detail;
            this.fund = res.data.fund;
            this.moneyss = val.moneyss;
            if (res.data.fund != undefined || res.data.fund != '查询利息信息失败'){
              this.fund = res.data.fund;
            }
          });
         data = val;
         //收入支出
        } else{
          this.show = true;
          let data_list = {};
          //判断收入支付费率
          //判断是否有费率
          if (val.bank_detail_parentid !== undefined && val.bank_detail_parentid !==''){
            this.List_search.forEach((item)=>{
              if (item.bank_detail_parentid === val.bank_detail_parentid){
                if (item.fund_detail_transaction_money > 0){
                  data_list['list'] = item;
                }
                if (item.fund_detail_transaction_money <= 0){
                  data_list['fl'] = item
                }
              }
            })
            this.List_search_edit = data_list;
            data = val;
          }else{
            let datas = {};
              datas['list'] = val;
            this.List_search_edit = datas;
            data = datas
          }
        }
        this.list_data_details = data;
      },
      //详情删除
      deletes(val,data){
        let fund_id = '';   //这里是要发送的参数
        let jso = '';       //发送处理好的格式
        //两个不同的页面  flowing_details  transfer_running_money_details
        if (val === 'transfer_running_money_details'){
          //判断收入支出转账的ID
          if (this.list_data_details.fund_id !== undefined){
            fund_id = {fund_id:this.list_data_details.fund_id,parentid:this.list_data_details.bank_detail_parentid}
          }else if (this.list_data_details.bank_deal_id !== undefined){
            fund_id={parentid:this.list_data_details.bank_detail_parentid}
          }else if (this.list_data_details.fund_detail_transaction_id !== undefined){
            fund_id={fund_detail_transaction_id:this.list_data_details.fund_detail_transaction_id,parentid:this.list_data_details.bank_detail_parentid}
          }
          if (this.list_data_details.bank_deal_rate !== 0){
            fund_id['fund_rate'] = this.list_data_details.fund_rate
          }
          /*let json = JSON.stringify(fund_id);
          jso = {jsonFund:json};*/
        }else if (val === 'flowing_details'){
          if (this.list_data_details.bank_detail_parentid === undefined){
            fund_id = {fund_detail_id:this.list_data_details.list.fund_detail_id,fund_detail_transaction_id:this.list_data_details.list.fund_detail_transaction_id,fund_id:this.list_data_details.list.fund_id};
          }else{
            fund_id = {fund_detail_id:this.list_data_details.fund_detail_id,fund_detail_transaction_id:this.list_data_details.fund_detail_transaction_id,fund_id:this.list_data_details.fund_id,parentid:this.list_data_details.bank_detail_parentid};
          }
        }
        let json = JSON.stringify(fund_id);
        jso = {jsonFund:json};
        //调用封装好的删除
        this.delefund(jso,data);
      },
      //下载账单
      linkHref(){
        let data ={};
        let data_s = {startDate:this.GetDateStr(-3)}
        // let data_s = {startDate:'2020-01-01 00:00:00',company_id: 28}
        let data_json = {jsonFund:JSON.stringify(data_s),jsonBank:JSON.stringify(data)}
        this.$addtitle('https://formattingclub.com/YiNuoFund/fund/excelMoney.po',data_json).then(res=>{
          if (res.data.msg == '访问成功'){
            location.href = 'https://formattingclub.com/YiNuoFile/'+res.data.data;
          }else{
            this.$toast('数据异常');
          }
        })
      },
      // 封装前两天时间
      GetDateStr (AddDayCount) {
        var dd = new Date()
        dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
        var y = dd.getFullYear()
        var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)// 获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()// 获取当前几号，不足10补0
        return y + '-' + m + '-' + d;
      },
      //流水数据
      getData(){
        //银行卡查询数据是否有数据
        let data = sessionStorage.getItem("all_bank_card");
        this.sh_data = this.GetDateStr(-2);
        let jso = {company_id:this.$store.state.company_id,startDate:this.GetDateStr(-3)}
        let jsonB = {}
        let json = {jsonBank:JSON.stringify(jsonB),jsonFund:JSON.stringify(jso)}
        if (data == undefined || data == null){
          this.$addtitle('fund/select_Money.po',json).then(res=>{
            this.List_search = res.data.data;
            this.all_amounts(this.List_search);
          });
        }else{
          let lit = JSON.parse(data);
          this.List_search = lit;
          this.all_amounts(lit);
        }
      },
      //封装计算金额
      all_amounts(val){
        let green_money = 0,zero_money = 0,allMoney = 0,bankDealMoney=0,red_all_money=0,red_money = 0,fund_transaction_money = 0//底部红色总额绿色总额 所有总额
        for(let index in val){
          //bank_deal_money金额大于0
          if (val[index].bank_deal_money > 0){
            bankDealMoney+=val[index].bank_deal_money
          }
          //bank_deal_money金额小于0
          if (val[index].bank_deal_money < 0){
            red_money+=val[index].bank_deal_money
          }
          //fund_detail_transaction_money大于0
          if (val[index].fund_detail_transaction_money > 0){
            fund_transaction_money+=val[index].fund_detail_transaction_money;
          }
          //fund_detail_transaction_money 小于0
          if (val[index].fund_detail_transaction_money < 0){
            zero_money+=val[index].fund_detail_transaction_money;
          }
        }
        //绿色金额相加
        green_money+=parseFloat(bankDealMoney) + parseFloat(fund_transaction_money);
        //哄色金额相加
        red_all_money+=parseFloat(zero_money) + parseFloat(red_money);
        //红绿相加总额
        allMoney+=parseFloat(green_money) + parseFloat(red_all_money);
        this.green_money += Math.floor(green_money * 100) / 100;
        this.red_money += Math.floor(red_money * 100) / 100;
        this.all_money += Math.floor(allMoney * 100) / 100;
      },
    //  封装删除函数
      delefund(val,data){
        let then = this;
        this.$addtitle('fund/delete_money.po',val).then(res=>{
          if (res.data.data === '删除成功'){
            this.$toast.success(res.data.data);
            //不刷新直接删除这个节点 这里是判断json是否相同true则删除这个节点
            this.List_search = this.List_search.filter(function (item) {
              if (data.list == undefined){
                return item.bank_detail_parentid != data.bank_detail_parentid;
              }else{
                return item.bank_detail_parentid != data.list.bank_detail_parentid;
              }
            })
            //  判断那个弹出框是true则那个弹出框消失
            if (this.show === true && this.show_money === false){
              this.show = false
            }else if (this.show === false && this.show_money === true){
              this.show_money = false;
            }
          }else{
            this.$toast.fail(res.data.data);
          }
        })
      }
    },
    computed:{
      table_search(){
        let then = this;
        let newList = [];
        if (this.List_search === '暂无数据') return
        this.List_search.filter(item=>{
          if ((item.fund_detail_transaction_money+'').includes(then.SearchValue) || (item.bank_deal_money+'').includes(then.SearchValue)){
            newList.push(item)
          }
        })
        return newList
      }
    },
  }
</script>

<style scoped>
@import "../../assets/css/public.css";
*{font-size: 15px}
.download{margin-bottom: 13px;margin-top: 19px;margin-left: 6%}
.download span:nth-child(1){color:#409eff}
.download span:nth-child(2){margin-left: 10px;color: #67c23e}
.search .van-cell{border: 1px solid #d6d6d6;line-height: 35px;border-right: 0;border-left: 0;padding: 0}
/deep/.search .van-cell .van-field__label{margin-left: 6%}
/deep/.van-field__control:nth-child(1){padding-left: 12px}
/deep/.search .van-collapse-item__content{background-color: transparent!important;padding: 0}
/deep/.van-cell--clickable{padding: 7px 6%}
/*table*/
.div-th,.div-tr{display: flex;}
.div-th{background-color: #DADADA;line-height: 26px;position: absolute;width: 100%;}
.div-table{position: relative;top: 28px;height: 519px;overflow: auto;padding-bottom: 110px;}
.div-tr{padding-left: 6%;border-bottom: 1px solid #DADADA;line-height: 28px}
.table_list .div-th div:nth-child(1){padding-left: 6%;width: 15%}
.table_list .div-th div:nth-child(2){width: 20%}
.table_list .div-th div:nth-child(3){width: 22%}
.table_list .div-th div:nth-child(4){width: 22%}
.table_list .div-table .div-tr div:nth-child(1){width: 16%}
.table_list .div-table .div-tr div:nth-child(2){width: 20%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap}
.table_list .div-table .div-tr div:nth-child(3){width: 22%}
.table_list .div-table .div-tr div:nth-child(4){width: 26%}
/* .table_list{padding-bottom: 100px;} */
.div-tr div:nth-child(5){text-align: right}

.money_green{color: green;}
.money_red{color: red;}
.black_mui{margin-top: 5px;padding-bottom: 5px;border: 1px solid white;}
/*底部*/
footer{position: fixed;bottom: 0;display:flex;width: 100%;background-color: #a7a7a7;line-height: 30px;font-size: 14px;padding-left: 16px}
footer div,footer em{flex: 1;font-style: normal}

.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.van-popup--center{width: 92%;height: 629px;overflow: auto}
</style>

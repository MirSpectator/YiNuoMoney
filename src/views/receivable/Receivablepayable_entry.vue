<template>
    <div class="receivable_money">
        <header_header title="应收应付录入"></header_header>
        <toast_loading :show="loadding"></toast_loading>
         <title_header title_header="应收应付录入" title_header_one="Receivablepayableentry"></title_header>

        <!--table-->
         <div class="btn">
             <van-field name="radio" label="类型">
                 <template #input>
                     <van-radio-group v-model="typeOfValue" @change="typeof_change" direction="horizontal">
                         <van-radio v-for="(item,i) in type_list" :key="i" :name="item.radio">{{item.text}}</van-radio>
                     </van-radio-group>
                 </template>
             </van-field>
        </div>
        <van-form @submit="add">
            <site_people labe="工地名称" @site_peoples="siteId" v-model="site" place="请输入工地名称"></site_people>
            <people @peopleList="peopleID" v-show="receivable_show" v-model="fund_debtor" peopleLabel="债务人" placePeople="请输入债务人"></people>
            <people v-show="time_show" @peopleList="fund_personID" v-model="fund_person" peopleLabel="债权人" placePeople="请输入债权人"></people>
            <van-field readonly clickable name="name" :value="fund_detail_name" label="相关项目" placeholder="点击选择相关项目"  @click="fund_detail_idClick = true"/>
            <van-popup v-model="fund_detail_idClick" position="bottom">
                <van-picker show-toolbar :columns="Radiocolumns" value-key="fund_name" @confirm="RadioConfirm" @cancel="fund_detail_idClick = false"/>
            </van-popup>
            <van-field readonly clickable name="款项名称" :value="detailed" label="款项名称" placeholder="点击选择款项名称"  @click="detailedClick = true"/>
            <van-popup v-model="detailedClick" position="bottom">
                <van-picker show-toolbar :columns="detailedcolumns" value-key="fund_name" @confirm="detailedConfirm" @cancel="detailedClick = false"/>
            </van-popup>
            <van-field readonly clickable name="款项详细" :value="slim" v-show="slimShow" label="款项详细" placeholder="点击选择款项详细"  @click="slimClick = true"/>
            <van-popup v-model="slimClick" position="bottom">
                <van-picker show-toolbar :columns="slimcolumns" value-key="fund_name" @confirm="slimConfirm" @cancel="slimClick = false"/>
            </van-popup>
            <van-field name="radio" label="级别">
                <template #input>
                    <van-radio-group v-model="level_a_b_c" direction="horizontal">
                        <van-radio v-for="(item,i) in list_level" :key="i" :name="item.text">{{item.text}}</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field name="radio" label="情况">
                <template #input>
                    <van-radio-group v-model="happening" direction="horizontal">
                        <van-radio v-for="(item,i) in list_happening" :key="i" :name="item.radio">{{item.text}}</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field v-model="fund_money" label="金额" placeholder="请输入金额"/>
            <van-field name="radio" label="付款类型">
                <template #input>
                    <van-radio-group v-model="payment" @change="paymentChange" direction="horizontal">
                        <van-radio v-for="(item,i) in list_payment" :key="i" :name="item.text">{{item.text}}</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
<!--            这里是 阶段付款-->
            <div class="list_data_time" v-show="list_data_time">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <th><span>日期</span></th>
                    <th><span>批次</span></th>
                    <th><span>金额</span></th>
                    <th><span>备注</span></th>
                </tr>
                <tr v-for="(item,i) in list_data" :key="i">
                    <td>
                        <span><el-date-picker v-model="item.fund_detail_date" type="date" placeholder="选择日期" @input="fund_date(item)"></el-date-picker></span>
                    </td>
                    <td><span><van-field v-model="item.fund_detail_batch" placeholder="批次"/></span></td>
                    <td><span><van-field v-model="item.fund_detail_money" placeholder="￥"/></span></td>
                    <td><span><van-field v-model="item.fund_detail_text" placeholder="备注" @input="fund_text(item)"/></span></td>
                </tr>
            </table>
            <p id="btn-form" @click="formAdd">添加新一行</p>
            <p id="btn-del" @click="del(list_data)">删除</p>
            </div>
<!--            这里是周期付款-->
            <div v-show="zhouq">
<!--                <time_data label="还款时间" :value="list_zhou" @data_time="list_data_change"></time_data>-->
                <van-cell-group class="data_time">
                    <label>还款时间</label>
                    <el-date-picker class="data_data" v-model="list_zhou" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </van-cell-group>
                <van-field name="radio" label="还款周期">
                    <template #input>
                        <van-radio-group v-model="cycle_list" @change="list_data_radio_change" direction="horizontal">
                            <van-radio v-for="(item,i) in cycle_list_data" :key="i" :name="item.text">{{item.text}}</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="time_data" type="number" label="还款期数" placeholder="请输入还款期数"/>
            </div>
            <div style="margin: 16px;">
                <submit_submit text="保存"></submit_submit>
            </div>
        </van-form>
    </div>
</template>

<script>
  export default {
    name: "Receivablepayable_entry",
    data(){
      return{
        loadding:false, //加载
        radio:'储蓄卡',
        typeOfValue:'1',    //按钮
        type_list:[
          {text:'应收',radio:'1'},
          {text:'应付',radio:'2'},
        ],
        site:'',    //工地
        fund_debtor:'',//债券人
        fund_person:'',//债权人
        fund_detail_name:'公司',//相关项目
        Radiocolumns:[],//相关项目
        detailed:'',//款项名称
        detailedcolumns:[],
        slim:'',//款项详细
        slimcolumns:[],
        fund_money:'',//金额
        happening:'',//情况
        level_a_b_c:'',//级别
        payment:'阶段付款',//阶段付款
        entry:{ //直接处理成json 不用在处理格式
          customer_id :'',   //工地id
          fund_person_id:'',   //债务人ID
          fund_name_id:'1',//阶段id
          fund_detail_level:'',//级别
          fund_detail_type:'',//情况
          fund_money:'',//金额
          fund_type:'阶段付款',//阶段付款
          company_id:0
        },
        handle:{//应付格式
          customer_id :'',   //工地id
          fund_person_id:'',//债权人
          fund_name_id:'1',//阶段id
          fund_type:'阶段付款',//阶段付款
          fund_money:'',//金额
          fund_detail_level:'',//级别
          fund_detail_type:'',//情况
          company_id:0
        },
        list_level:[{text:'A'}, {text:'B '}, {text:'C '},],
        list_happening:[
          {radio:'0',text:'是'},
          {radio:'1',text:'否'},
        ],
        list_payment:[  //付款类型
          {text:'阶段付款'},
          {text:'周期付款'},
        ],
        list_data: [
          { 'fund_detail_date': '', 'fund_detail_batch': '1'.toString(), 'fund_detail_money': '', 'fund_detail_text': '' ,'fund_text':'','fund_date':''},
        ],
        batch_index:1,//定义阶段批次
        list_zhou:'',   //周期付款时间
        cycle_list:'',//还款周期
        time_data:'',//还款周期
        cycle_list_data:[
          {text:'按月'},
          {text:'按年'},
          {text:'按周'},
        ],
      //  弹窗
        fund_detail_idClick:false,//相关项目
        detailedClick:false,//款项名称
        slimClick:false,//款项详细
        slimShow:false,//款项详细
        list_data_time:true,//阶段付款list
        zhouq:false,//周期付款
      //  点击应付出现的事件
        time_show:false,
      //  点击应收出现的事件
        receivable_show:true,
      }
    },
    created(){
      this.fundList();
    },
    methods:{
      //工地名称
      siteId(val,id){
        this.site = val;
        this.entry.customer_id  = id;
        this.handle.customer_id  = id;
      },
      //债务人
      peopleID(val,id){
        this.fund_debtor = val;
        this.entry.fund_person_id = id;
      },
      //债权人
      fund_personID(val,id){
        this.fund_person = val;
        this.handle.fund_person_id = id;
      },
      //阶段日期
      paymentChange(val){
        this.entry.fund_type = val;
        this.handle.fund_type = val;
        if (val === '阶段付款'){
          this.list_data_time = true;
          this.zhouq = false;
        }else{
          this.list_data_time = false;
          this.zhouq = true;
        }
      },
      //新增一行
      formAdd(){
        this.batch_index++;
        var s = { 'fund_detail_date': '', 'fund_detail_batch': '1'.toString(), 'fund_detail_money': '', 'fund_detail_text': '' ,'fund_text':'','fund_date':''}
        s.fund_detail_batch = this.batch_index.toString();
        this.list_data.push(s)
      },
      //删除一行
      del(val){
        this.batch_index--;
        if (this.list_data.length === 0){
          this.$toast.fail('没有可删除的了');
        }else{
          this.list_data.splice(this.list_data.indexOf(val),1);
        }
      },
      //因为后台多出了两个字段，这里数组无法绑定两个值所以用触发事件进行绑定  这里是时间同步
      fund_date(val){
        for (var index in this.list_data){
          if (val === this.list_data[index]){
            this.list_data[index].fund_date = this.time(this.list_data[index].fund_detail_date);
          }
        }
      },
      //这里是备注同步
      fund_text(val){
        for (var index in this.list_data){
          if (val === this.list_data[index]){
            this.list_data[index].fund_text = this.list_data[index].fund_detail_text;
          }
        }
      },
      //周期付款
      list_data_change(val){
        this.list_zhou = this.$time(val);
      },
      //还款周期
      list_data_radio_change(val){
        this.cycle_list = val;
      },
      //相关项目
      RadioConfirm(value) {
        this.fund_detail_name = value.fund_name;
        this.entry.fund_name_id = value.id;
        this.handle.fund_name_id = value.id;
        this.fund_detail_idClick = false;
        this.fundList_two(value.id).then(res=>{
          if (res.data.data.length > 0){
            this.detailedcolumns = res.data.data;
            this.slimShow = false;  //3级菜单false；
            this.slim = ''; //3级内容清空
            this.detailed = '';//2级菜单清空
          }
        })
      },
      //款项名称
      detailedConfirm(value){
        this.detailed = value.fund_name;
        this.entry.fund_name_id = value.id;
        this.handle.fund_name_id = value.id;
        this.detailedClick = false;
        this.fundList_two(value.id).then(res=>{
          if (res.data.data == '无数据'){
            this.slimShow = false;
          }else{
            this.slimShow = true;
            this.slimcolumns = res.data.data;
          }
        })
      },
      //款项详细
      slimConfirm(value){
        this.slim = value.fund_name;
        this.entry.fund_name_id = value.id;
        this.handle.fund_name_id = value.id;
        this.slimClick = false;
      },
      //项目名称
      fundList_two(id){
        return new Promise((resolve, reject) => {
          this.$moneyGet('fund/select_fundName.po?fund_stale=0&parentid='+id).then(res=>{
            resolve(res);
          }).catch(err=>{
            reject(err);
          })
        })
      },
      //分类
      fundList(){
        this.loadding = true;
        this.$moneyGet('fund/select_fundName.po?fund_stale=0&level=1').then(res=>{
          if (res.status === 200){
            this.loadding = false;
            this.Radiocolumns = res.data.data;
            if (res.data.data.length >0){
              this.fundList_two(3).then(res=>{
                this.detailedcolumns = res.data.data;
              });
            }
          }
        });
      },
      //应收应付按钮
      typeof_change(val){
        if (val === '1'){
          //1代表应收  债务人显示，其余三个消失
          this.receivable_show = true;
          this.time_show = false;
        }else if (val === '2'){
          //2代表应付  债权人消失 其余三个显示
          this.receivable_show = false;
          this.time_show = true;
        }
      },
      time(data){
        let date = new Date(data);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m<10?m="0"+m:m;
        let d = date.getDate();
        d<10?d="0"+d:d;
        return `${y}-${m}-${d}`;
      },
      add(){
        //阶段付款
        let cevi = this.list_data
        //  判断阶段付款
        if (this.entry.fund_type === '阶段付款'){
        //    这里写正则
          //这里判读应收应付  应收则为正数  应付为负数
          let money;
          if (this.typeOfValue === '1'){

          }else if (this.typeOfValue === '2'){
            this.list_data.map(function (item) {
              item.fund_detail_money = item.fund_detail_money * (-1);
            });
          }
          //这里判读应收应付  应收则为正数  应付为负数
        }else if (this.entry.fund_type === '周期付款'){
          let data_huan = new Date(this.list_zhou);
          let zhouqi = this.cycle_list;
          let qi = this.time_data;
          let qishu_money;
          //这里判读应收应付  应收则为正数  应付为负数
          if (this.typeOfValue === '1'){
            qishu_money = this.fund_money / qi;
          }else if (this.typeOfValue === '2'){
            let qis = this.fund_money / qi;
            //转为负数
            qishu_money = qis * (-1);
          }
          let date = '';
          this.list_data = [];
          if (zhouqi === '按月'){
            for (let i = 0; i<=qi-1;i++){
              let f = data_huan.getFullYear()
              let m = data_huan.getMonth() + 1 + i;
              m<10?m="0"+m:m;
              let d = data_huan.getDate();
              d<10?d="0"+d:d;
              let h = data_huan.getHours();
              h<10?h="0"+h:h;
              let mm = data_huan.getMinutes();
              mm<10?mm="0"+mm:mm;
              let s = data_huan.getSeconds();
              s<10?s='0'+s:s;
              date = `${f}-${m}-${d} ${h}:${mm}:${s}`
              let a = { 'fund_detail_date': date, 'fund_detail_money': qishu_money.toString(), 'fund_detail_batch': i.toString(), 'fund_detail_text': '' }
              this.list_data.push(a)
            }
          } else if (zhouqi === '按年') {
            for (let i = 0; i <= qi - 1; i++) {
              let y = data_huan.getFullYear() + i
              let m = data_huan.getMonth() + 1
              m<10?m="0"+m:m;
              let d = data_huan.getDate();
              d<10?d="0"+d:d;
              let h = data_huan.getHours();
              h<10?h="0"+h:h;
              let mm = data_huan.getMinutes();
              mm<10?mm="0"+mm:mm;
              let s = data_huan.getSeconds();
              s<10?s='0'+s:s;
              date = `${y}-${m}-${d} ${h}:${mm}:${s}`
              let a = { 'fund_detail_date': date, 'fund_detail_money': qishu_money.toString(), 'fund_detail_batch': i.toString(), 'fund_detail_text': '' }
              this.list_data.push(a)
            }
          } else if (zhouqi === '按周') {
            for (let i = 0; i <= qi - 1; i++) {
              let f = data_huan.getFullYear()
              let m = data_huan.getMonth() + 1
              data_huan.setDate(data_huan.getDate() + 7)
              m<10?m="0"+m:m;
              let d = data_huan.getDate();
              d<10?d="0"+d:d;
              let h = data_huan.getHours();
              h<10?h="0"+h:h;
              let mm = data_huan.getMinutes();
              mm<10?mm="0"+mm:mm;
              let s = data_huan.getSeconds();
              s<10?s='0'+s:s;
              date = `${f}-${m}-${d} ${h}:${mm}:${s}`
              let a = {'fund_detail_date': date, 'fund_detail_money': qishu_money.toString(), 'fund_detail_batch': i.toString(), 'fund_detail_text': ''}
              this.list_data.push(a)
            }
          }
        }
        this.loadding = true;
        //判断应收应付 1代表应收  2代表应付
        if (this.typeOfValue === '1'){
          //将金额传给entry里面
          this.entry.fund_money = this.fund_money;
            //情况
          this.entry.fund_detail_type = this.happening;
          //级别
          this.entry.fund_detail_level = this.level_a_b_c;
         // 这里调用接口
         this.recivalble_add(this.entry,this.list_data).then(res=>{
           this.loadding = false;
           if (res.status === 200){
             if (res.data.data === '添加成功'){
               this.$toast.success(res.data.data);
               this.$router.push({name:'receivable_money'});
             }else{
               this.$toast.fail(res.data.data)
             }
           }
         }).catch(err=>{
           this.$toast.fail(res.data.data);
           this.loadding = false;
         })
        }else if (this.typeOfValue === '2'){
          //将金额传给handle里面
          this.handle.fund_money = this.fund_money * (-1);
          //情况
          this.handle.fund_detail_type = this.happening;
          //级别
          this.handle.fund_detail_level = this.level_a_b_c;
          //这里调用接口
          this.recivalble_add(this.handle,this.list_data).then(res=>{
            this.loadding = false;
            if (res.status === 200){
              if (res.data.data === '添加成功'){
                this.$toast.success(res.data.data);
                this.$router.push({name:'receivable_money'});
              }else{
                this.$toast.fail(res.data.data)
              }
            }
          }).catch(err=>{
            this.$toast.fail(res.data.data);
            this.loadding = false;
          })
        }
      },
    //  这里是打包的应收应付的接口，直接调用就行
      recivalble_add(data,data_data){
        //处理格式
        let json = JSON.stringify(data)
        let json_funs = JSON.stringify(data_data)
        return new Promise((resolve, reject) => {
          this.axios({
            method: 'POST',
            url: 'fund/beforehand_Out_Enter.po',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;'},
            data: {
              jsonFund:json,
              jsonfund_detail:json_funs
            },
            // 把json格式编码转为x-www-form-urlencoded
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }]
          }).then(res=>{
            resolve(res)
          }).catch(err=>{
            reject(err)
          })
        })
      }
    }
  }
</script>

<style scoped>
    @import "../../assets/css/public.css";
    /deep/input::-webkit-input-placeholder{color: #818181}
    table{width: 100%;text-align: left;font-size: 13px;white-space: nowrap;}
    table tr{border-bottom: 1px solid #DADADA;line-height: 28px}
    table tr th{background-color: #DADADA;line-height: 27px}
    table tr th:nth-child(1),table tr td:nth-child(1){padding-left: 16px}
    table tr th:nth-child(1){min-width: 73px;width: 5%}
    table tr th:nth-child(2){min-width: 23px;width: 7%}
    table tr th{min-width: 16px;width: 10%}
    table tr th:nth-child(4){min-width: 44px;width: 12%}
    table tr th:nth-child(5){min-width: 44px;width: 22%}
    table /deep/.van-cell{padding: 8px 0}
    #btn-form,#btn-del{text-align: right;padding-right: 20px;color: #00679b;font-weight: bold;font-size: 13px}
    /deep/.el-date-editor.el-input,.el-date-editor /deep/.el-input__inner{width: 100%;padding:4px 0;background-color: transparent;border-top: none;border-left: none;border-right: none;}
    /deep/.el-input__icon{display: none}
    /deep/.el-input--prefix .el-input__inner{border-color: #DADADA}
    .data_time label{width: 30%;font-size: 14px;padding: 14px 16px}
    .data_data{width: 70% !important}
</style>

<template>
	<!-- 下载账单选择日期 -->
	<div class="download">
		<button 
		@click="buttons(item)"
		v-for="item in button" 
		:key="item"> {{item}}
		</button>
	</div>
</template>

<script>
	 export default {
	    data(){
			return {
				button:["一个月","三个月","半年","一年","所有记录"]
			}
		},
	    methods:{
			buttons(item){
				switch (item){
					case "一个月":
					this.time('月',1);
						break;
					case "三个月":
					this.time('月',3);
						break;	
					case "半年":
					this.time('月',6);
						break;
					case "一年":
					this.time('年',1);
						break;
					case "所有记录":
					this.time();
						break;
				}
			},
			time(type,count){
				let date = new Date();
				let Year = date.getFullYear()
				let Month = date.getMonth()
				let Day = date.getDate()
				if(type!=undefined&&type === '年'){
				    Year = Year-count
				}else if(type!=undefined&&type === '月'){
					if(Month>count){
						 Month = Month-count
					}else {
						Month = 12+ Month-count
						Year--
					}
				}else {
					this.download()
					return 
				}
				Month++
				if(Month<10){
					Month="0"+Month
				}
				if(Day<10){
					Day="0"+Day
				}
				let time = Year+"-"+Month+"-"+Day+" "+"00:00:00"
				this.download(time)
			},
			download(data){
				let s = {}
				let data_s = {company_id: sessionStorage.getItem('id')} 
				if(data!=null){
					data_s['startDate'] = data
				}
				let data_json = {jsonFund:JSON.stringify(data_s),jsonBank:JSON.stringify(s)};
				console.log(data_json);
				  this.$addtitle('https://formattingclub.com/YiNuoFund/fund/excelMoney.po',data_json).then(res=>{
				  if (res.data.msg == '访问成功'){
					  console.log(res);
					  if(res.data.data === '暂无数据'){
						  console.log(res);
					}else{
						location.href = 'https://formattingclub.com/YiNuoFile/'+res.data.data;
					}
				  }else{
				    this.$toast('数据异常');
				  }
				}) 
			}
				
		}
	 }
</script>

<style>
</style>

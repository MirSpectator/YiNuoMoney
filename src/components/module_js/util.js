
let util = {
	 test(){
		 console.log("公有方法测试成功");
	 },
	 add(data,url){
		 return new Promise((resolve,reject)=>{
		      this.axios({
		       method: 'POST',
		       url: url,
		       headers: {'Content-Type': 'application/x-www-form-urlencoded;'},
		       data: data,
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
		     }).catch(res=>{
		       reject(res)
		     })
		   })
	 },
	 Get(url){
	 		 return new Promise((resolve,reject)=>{
	 		      this.axios({
	 		       method: 'Get',
	 		       url: url,
	 		     }).then(res=>{
	 		       resolve(res)
	 		     }).catch(res=>{
	 		       reject(res)
	 		     })
	 		   })
	 }
}
export default ()=>{
	window.util=util;
}
//post请求
function add(url,data) {
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
    }).catch(err=>{
      reject(err)
    })
  })
}
//get请求
function moneyGet(url) {
  return new Promise((resolve, reject) => {
    this.axios({
      method: 'GET',
      url:url,
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
//日期 年月日时分秒
function time(data) {
  let date = new Date(data);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m<10?m="0"+m:m;
  let d = date.getDate();
  d<10?d="0"+d:d;
  let h = date.getHours();
  h<10?h="0"+h:h;
  let mm = date.getMinutes();
  mm<10?mm="0"+mm:mm;
  let s = date.getSeconds();
  s<10?s="0"+s:s;
  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}


export {add,moneyGet,time};

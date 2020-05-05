# finance

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 老系统更改的细节  搬到新系统中要添加的细节
1.现金流水查询后  点击某个详情页面再次返回的时候则还在点击的那个数据<br/> 
2.查询流水  可以查询用户+金额<br/> //旧版完成
3.现金流水下拉刷新 一次渲染一个月的<br/> //旧版完成
4.新卡加标，添加新卡的时候，每张银行卡自动加标<br/>
5.支出收入 可以对应收应付进行销账，按照相关人和项目名称进行销账，然后下拉
列表显示 时间 金额 批次 备注 选择完销账信息后 金额自动填充到下边<br/>
6.收入支出选择银行卡进入到银行卡的流水里面后，最近流水功能 不能用<br/>
7.现金流水页面点击每条流水的银行卡后，进入到该银行卡的流水中<br/>//旧版完成
8.流水详情里的银行卡卡号不用显示<br/>  //旧版完成
9.退款功能添加一个可以修改账户的账户<br/>
10.现金流水修改没有3级菜单<br/>
2020-4-15问题：<br/>
11.现金录入点击开户行 向上滑动<br/>
11.转入账户显示开户行+户主<br/>
时间组件封装<br/>
12.现金流水上拉加载


## 修改内容
2020/5/5:现金流水新增退款功能，现金流水查询功能<br/>
2020/4/25:现金流水可修改<br/>
2024/4/16:修改现金流水转账无法进入详情<br/>
2020/4/18:修复现金流水详情改为弹窗模式，修复删除删错问题<br/>
2020/4/18:修复现金流水账单删除，两条可以同时删除除了有费率的（不知道怎么判断某条数据有费率）<br/>
2020/4/18:封装时间组件，这个ERP都将调用这个时间组件，目前已覆盖完<br/>



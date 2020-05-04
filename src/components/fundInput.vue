<template>
	<div>
		<van-radio-group v-if="level" @change="radios()" v-model="radio" direction="horizontal">
			<van-radio name="0">收入</van-radio>
			<van-radio name="1">支出</van-radio>
		</van-radio-group>
		<van-field v-if="bol" readonly clickable name="picker" :value="value" :label="menu" placeholder="点击选择" @click="showPicker = true" />
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="columns" value-key="fund_name" @confirm="onConfirm" @cancel="showPicker = false" />
		</van-popup>
		<fund-input v-if="isShow" v-bind:level="false" v-bind:parentid="id" @em="em" ref="header"></fund-input>
	</div>
</template>

<script>
export default {
	name: 'fundInput',
	props: ['level', 'parentid','company_id'],
	data() {
		return {
			value: '',
			columns: '',
			showPicker: false,
			isShow: false,
			levels: 0,
			id: 0,
			radio: '0',
			fund_name:'',
			bol:true
		};
	},
	computed: {
		//计算属性不能修改属性值，只能做判断
		menu: function() {
			if (this.levels == 0) {
				return '分类菜单';
			} else if (this.levels == 1) {
				return '一级菜单';
			} else if (this.levels == 2) {
				return '二级菜单';
			} else if (this.levels == 3) {
				return '三级菜单';
			} else if (this.levels == 4) {
				return '四级菜单';
			} else if (this.levels == 5) {
				return '五级菜单';
			} else if (this.levels == 6) {
				return '六级菜单';
			}
		}
	},
	created() {
		this.select_fund();
	},
	methods: {
		/**input框的点击事件
		 * @param {Object} value
		 */
		onConfirm(value) {
			if (value.bol){
				this.isShow = false;
				this.value = value.fund_name;
				this.showPicker = false;
			}else{
				this.value = value.fund_name;
				this.fund_name = value;
				this.showPicker = false;
				this.isShow = false;
				this.id = value.id;
				this.$emit('em',value.level+1);
				let url = 'https://formattingclub.com/YiNuoFund/fund/select_fundName.po?parentid=' + value.id;
				util.Get.call(this, url).then(res => {
					if (res.data.data == '无数据') {
						this.isShow = false;
					} else {
						this.isShow = true;
					}
				});
			}
		},
		em(level){
			this.$emit('em',level);
		},
		/**
		 * 判断查收入支出
		 */
		radios(){
			this.value = "请选择"
			this.isShow=false
			this.defaultName()
		},
		/**
		 * 默认加载第几层数据
		 */
		select_fund() {
			if (this.level) {
				this.defaultName()
			} else if (this.parentid != undefined && this.parentid != null) {
				let url = 'https://formattingclub.com/YiNuoFund/fund/select_fundName.po?parentid=' + this.parentid;
				util.Get.call(this, url).then(res => {
					this.columns = res.data.data;
					this.levels = res.data.data[0].level;
				});
			}
		},
		/**
		 * 公有方法  加载第一级菜单的方法
		 */
		defaultName(){
			let url = 'https://formattingclub.com/YiNuoFund/fund/select_fundName.po?level=1&fund_stale='+this.radio+'&company_id='+this.company_id;
			util.Get.call(this, url).then(res => {
				if (res.data.data =='无数据'){
					this.bol = false;
				}else{
					this.bol = true;
				}
				this.columns = res.data.data;
				let s = [{fund_name: "请选择", bol:true}];
				this.columns = s.concat(res.data.data)
				this.levels = res.data.data[0].level;
			});
		},
		oinput(val){
			if (this.isShow){
				this.fund_name = this.$refs.header.oinput();
				return  this.fund_name
			}else{
				return this.fund_name
			}
		}
	}
};
</script>
<style scoped>
.van-radio-group--horizontal {
	display: flex;
	border-bottom: 1px solid #dadada;
	padding-bottom: 16px;
	margin-top: 59px;
	padding-left: 16px;
}

</style>

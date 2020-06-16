<template>
	<!--props过滤，计算属性，验证-->
	<div>
		<p v-text="propA"></p>
		<p v-text="propB"></p>
		<p v-text="propC"></p>
		<p v-text="propD"></p>
		<p v-text="propE.message"></p>
		<p v-text="propF"></p>
		<p v-text="propP"></p>
		<p>{{ propP.firstName }} - {{ propP.lastName }}</p>
	</div>
</template>

<script>
//	import Person from "../utils/config/constructor.js"
	
	export default {
		props: {
		    // 基础的类型检查 (`null` 匹配任何类型)
		    propA: Number,
		    // 多个可能的类型
		    propB: [String, Number],
		    // 必填的字符串
		    propC: {
		      type: String,
		      required: true
		    },
		    // 带有默认值的数字
		    propD: {
		      type: Number,
		      default: 100
		    },
		    // 带有默认值的对象
		    propE: {
		      type: Object,
		      // 对象或数组且一定会从一个工厂函数返回默认值
		      default: function () {
		        return { message: 'hello' }
		      }
		    },
		    // 自定义验证函数
		    propF: {
		    		// 7. props 验证：传入不符合格式依然显示，会报错；注意那 prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或 validator 函数中是不可用的
			    validator: function (value) {
			        // 这个值必须匹配下列字符串中的一个
			        return ['success', 'warning', 'danger'].indexOf(value) !== -1
			    }
		    },
		    
		    // 自定义类型
		    propP: window.Person
	  	},
	  	data() {
	  		return {
	  
	  		}
	  	},
	  	methods: {
	  		
	  	}
	}
</script>

<style>
</style>
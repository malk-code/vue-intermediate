<template>
	<div>
		<group title='入门教程'>
			<grid :cols='3'>
				<grid-item v-for="item in intro" :key="item.id" :link="item.order" :label="item.title">
					<img slot="icon" src="../assets/img/logo.png">
				</grid-item>
			</grid>
		</group>
		<group title='组件进阶'>
			<grid :cols='3'>
				<grid-item v-for="item in comp" :key="item.id" :link="item.path" :label="item.title" :class="{ index:item.isIndex }">
					<img slot="icon" src="../assets/img/logo.png">
				</grid-item>
			</grid>
		</group>
		<group title='过渡动画'>
			<grid :cols='3'>
				<grid-item v-for="(item, index) in trans" :key="index" :link="item.path" :label="item.title">
					<img slot="icon" src="../assets/img/logo.png">
				</grid-item>
			</grid>
		</group>
		<group title='可复用性 & 组合'>
			<grid :cols='3'>
				<grid-item v-for="(item, index) in reuse" :key="index" :link="item.path" :label="item.title">
					<img slot="icon" src="../assets/img/logo.png">
				</grid-item>
			</grid>
		</group>
		<group title='工具'>
			<grid :cols='3'>
				<grid-item v-for="(item, index) in tool" :key="index" :link="item.path" :label="item.title">
					<img slot="icon" src="../assets/img/logo.png">
				</grid-item>
			</grid>
		</group>
		<group title='规模化'>
			<grid :cols='3'>
				<grid-item v-for="(item, index) in scale" :key="index" :link="item.path" :label="item.title">
					<img slot="icon" src="../assets/img/logo.png">
				</grid-item>
			</grid>
		</group>
		<group title='其它'>
			<grid :cols='3'>
				<grid-item v-for="(item, index) in other" :key="index" :link="item.path" :label="item.title">
					<img slot="icon" src="../assets/img/logo.png">
				</grid-item>
			</grid>
		</group>
	</div>
</template>

<script>
	import { Grid, GridItem, Group } from 'vux';

	const jsondata = require('../json/indexRouter/');
	console.log(jsondata.transition);

	const jsonFile = require('../json/jsonFile');
	console.log(jsonFile)

	export default {
		inject: ['headerState'],
		data() {
			return {
				comp: jsondata.component,
				intro: jsondata.introduction,
				trans: jsondata.transition,
				reuse: jsondata.reusability_composition,
				tool: jsondata.tool,
				scale: jsondata.scale,
				other: jsondata.other,
			}
		},
		components: {
			Grid,
			GridItem,
			Group,
		},
		mounted() {
			document.title = this.$route.meta.title;
			// 依赖注入隐藏返回按键
			this.headerState({
				hasheader: true,
				iscanback: true,
			});

			// 路由传参
			this.$nextTick(() => {
				console.log('路由传参');
				// 3. $router 切换路由页面，router 对象配置 name 或 path 都行，如果同时指定，则以第一个为准。还可添加 params 和 query 传参，params 页面刷新数据消失。通过 $route 访问
				console.log(this.$route.query.name);
				console.log(this.$route.params.name);
				// 4. ${ }：需要使用折反单引号，不是引号，${}里边依旧是js，外边也是js ，场景如字符串拼接，只要console.log(`== ${a} ==`)：这和 C# 打印的 $ 用法极相似。还可以用作路由传参
				console.log(`query: ${this.$route.query.name} - params: ${this.$route.params.name}`);

				console.log(this.$route.query.obj);
			})
		}
	}
</script>

<style scoped="scoped">
	.index {
		background: #F0F0F0;
	}
</style>
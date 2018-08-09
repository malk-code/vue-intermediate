<template>
	<div class="main">
		<div class="title">{{ title }}</div>
		<div class="card" v-for="(manager, index) in managers" :key="index" @click.stop="manager_description(manager)">
			<p class="left">
				<img class="figure" :src="manager.img" alt="figure" />
				<img class="logo" src="../assets/appsimg/icbc.png" alt="logo" />
			</p>
			<p class="right">
				<span>
					<img class="line" src="../assets/appsimg/line.png" alt="line" />
					<div class="name">{{ manager.nickname }}</div>
					<span>({{ manager.alias }})</span>
				<span class="feature">{{ manager.strong }}</span>
				</span>
				<ul class="order">
					<span class="item" v-for="feature in manager.feature">
						<img src="../assets/appsimg/order.png" alt="contact">
						{{ feature }}				
						<br />
					</span>
				</ul>
				<span>
					<img class="contact" src="../assets/appsimg/contact.png">
				</span>
			</p>
		</div>
	</div>
</template>

<script>
	import Bus from '../utils/bus/bus.js';
	export default {
		// 隐藏全局导航栏
		inject: ['headerState'],
		data() {
			return {
				title: '金融客户经理',
				managers: [{
						img: require('../assets/appsimg/1.jpeg'),
						nickname: "子云",
						alias: "Simon",
						strong: "公司金融管家",
						feature: ['公司授信', "股票质押", "员工代发薪"]
					},
					{
						img: require('../assets/appsimg/2.jpeg'),
						nickname: "秋秋",
						alias: "Jolly",
						strong: "个人理财管家",
						feature: ['个人理财策划', "基金投资顾问", "家庭保险规划"]
					},
					{
						img: require('../assets/appsimg/3.jpeg'),
						nickname: "思允",
						alias: "Cici",
						strong: "个人贷款管家",
						feature: ['个人住房贷款', "个人消费贷款", "深圳房产置业"]
					},
					{
						img: require('../assets/appsimg/4.jpeg'),
						nickname: "小烨",
						alias: "John",
						strong: "账户管家",
						feature: ['个人开户', "公司开户", "信用卡办卡"]
					}
				],

				detail_mananger: null,
			}
		},
		methods: {
			manager_description(manager) {

				this.detail_mananger = manager;
				//14. 路径：/ 代表根目录下，./ 表示当前目录下，../ 代表的是上层目录下：本地服务器时，注意 ./ 和 / 的使用，因为本地服务器项目是启动在根目录下，这时 ./ 和 / 使用是一致。
				this.$router.push({
					path: "/manager_description"
				});
			}
		},
		mounted() {
			document.title = this.$route.meta.title;
			// 依赖注入隐藏返回按键
			this.headerState({
				hasheader: false
			});
		},
		beforeDestroy() {
			Bus.$emit('manager', this.detail_mananger);
		}
	}
</script>

<style scoped="scoped" lang="less">
	.mian {
		background: #FFFFFF;
	}
	
	.title {
		padding: 0.1rem 0rem 0rem 0.1rem;
		font-size: .2rem;
	}
	
	.card {
		margin: .11rem .11rem .2rem .11rem;
		height: 2.2rem;
		border-radius: 8px;
		box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
		.left {
			float: left;
			width: 30%;
			height: 90%;
			margin: .11rem;
			.figure {
				width: 100%;
				border-radius: 8px;
				height: 1.5rem;
			}
			.logo {
				width: 100%;
			}
		}
		.right {
			padding: .1rem;
			height: 100%;
			margin-left: 37%;
			.line {
				height: .2rem;
				padding-top: .1rem;
			}
			.name {
				display: inline;
				font-size: .18rem;
			}
			.feature {
				color: #4F94CD;
				padding-left: 3%;
				font-size: .15rem;
			}
			.order {
				padding: .13rem 0rem 0rem .05rem;
				font-size: .13rem;
				.item {
					color: #7A7A7A;
					img {
						height: .13rem;
					}
				}
			}
			.contact {
				width: 100%;
				padding: .15rem 0rem 0rem 0rem;
			}
		}
	}
</style>
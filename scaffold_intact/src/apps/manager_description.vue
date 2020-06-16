<template>
	<div v-if="manager == null">
		请不要刷新当前页面，因为部分数据是从上一个页面带入的。
	</div>
	<div class="main" v-else>
		<div class="header">
			<img class="headportrait" :src="manager.img" alt="headportrait" />
			<div class="contact">
				<span v-for="label in contact">{{ label }}</span>
			</div>
		</div>
		<div class="portrait">
			<img class="figure" :src="manager.img" alt="figure" />
			<div class="description">
				<img class="line" src="../assets/appsimg/des_line.png" alt="line" />
				<div class="name">{{ manager.nickname }}</div>
				<span>({{ manager.alias }})</span>
				<span class="feature">{{ manager.strong }}</span>
				<img class="share" src="../assets/appsimg/share.png" alt="share" />
			</div>
		</div>
		<div class="section">
			<p>Career Highlights</p>
			<p style="font-size: .18rem;">职业亮点</p>
		</div>
		<ul class="career">
			<li class="item" v-for="light in career">
				<img class="line" src="../assets/appsimg/des_line.png" alt="line" />
				<span class="light">{{ light }}</span>
			</li>
		</ul>
		<div class="section">
			<p>Personal View</p>
			<p style="font-size: .18rem;">个人观点</p>
		</div>
		<p class="person">{{ person }}</p>
		<div class="section">
			<p>Recommended Products</p>
			<p style="font-size: .18rem;">推荐产品</p>
		</div>
		<div class="recommend">
			<h3>{{ recommend.title }}</h3>
			<h4>{{ recommend.description }}</h4>
			<ul>
				<li v-for="reason in recommend.category">
					■ {{ reason }}
				</li>
			</ul>
			<p>{{ recommend.remark }}</p>
		</div>
		<div class="section">
			<p>Life</p>
			<p style="font-size: .18rem;">我·生活</p>
		</div>
		<div class="life">
			<img class="figure" :src="life.img" alt="life" />
			<p class="motto">{{ life.motto }}</p>
		</div>
		
		<div class="bottom">我就是底，别再拉了-_-!!</div>
	</div>
</template>

<script>
	import Bus from '../utils/bus/bus.js';
	export default {
		data() {
			return {
				manager: null,
				contact: ['Call 她', '加微信', '去找她'],
				career: ['工行个人信贷服务10年从业经验。', '获工行深圳分行“个人信贷十佳客户经理”称号。', '累计办理个人融资贷款超20亿元。', '擅长为高成长人群提供专业信贷服务，见证客户成就梦想的幸福。'],
				person: '从表面上看，降准意味着流动性的提升，进而降低资金成本，对房地产市场利好。而实际上，存款基准利率一直没有变松，往后还有可能继续上升，和不断上升的货币市场利率保持同步，那时预计房贷利率还会上行。',
				recommend: {
					title: '工行消费分期',
					description: "购车、家装、大额日常消费、二手房税费都能分期",
					category: ['额度高至100万', '月费低至0.32%', '期间长达5年'],
					remark: '这是我目前主推的产品，利好。'
				},
				life: {
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528284369234&di=87b623baf5ce741cc3d94fca4beafb24&imgtype=0&src=http%3A%2F%2Fyouthvillage.co.za%2Fwp-content%2Fuploads%2F2014%2F09%2FAdele1.jpg',
					motto: "眼要看远，脚要近迈，世界是属于勇敢者的"
				}
			}
		},
		created() {
			// location is incorrect maybe - Bus.js
			Bus.$once('manager', (manager) => {
				this.manager = manager;
				document.title = manager.nickname;
			});
		},
		beforeDestroy() {
			Bus.$off('manager');
		},
	}
</script>

<style scoped="scoped" lang="less">
	.main {
		background: WhiteSmoke;
		padding: .1rem;
	}
	.header {
		height: .4rem;
		.headportrait {
			width: .4rem;
			height: 100%;
			border-radius: .2rem;
		}
		.contact {
			float: right;
			padding-top: .05rem;
			height: .2rem;
			span {
				font-size: .16rem;
				color: #FF3636;
				border: solid 1px #FF3636;
				border-radius: .2rem;
				margin: 0rem 0rem 0rem .1rem;
				padding: .03rem 0.05rem;
			}
		}
	}
	.portrait {
		margin-top: .1rem;
		border-radius: 8px;
		background: white;
		.figure {
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
			width: 100%;
			height: 3.1rem;
		}
		.description {
			padding: .1rem 0rem;
			height: .4rem;
			.name {
				display: inline;
				font-size: .22rem;
				height: 100%;
			}
			.feature {
				padding-left: 10%;
				font-size: .18rem;
				height: 100%;
				color: DimGray;
			}
			.share {
				width: .5rem;
				height: 100%;
				float: right;
			}
			.line {
				height: .2rem;
				width: .05rem;
			}
		}
	}
	.section {
		color: FireBrick;
		text-align: center;
		padding: .15rem 0rem;
	}
	.career {
		background: white;
		border-radius: 8px;
		padding: .15rem 0rem;
		.item {
			padding: 0.05rem .15rem;
			.line {
				height: .15rem;
				width: .04rem;
				padding-right: .03rem;
			}
			.light {
				color: DimGray;
			}
		}
	}
	.person {
		background: white;
		border-radius: 8px;
		padding: .15rem;
		text-indent: .3rem;
		text-align: justify;
		line-height: .31rem;
	}
	.recommend {
		border-radius: 8px;
		background: white;
		h3 {
			padding-top: .15rem;
			color: FireBrick;
			text-align: center;
		}
		h4 {
			color: DimGray;
			width: 60%;
			padding: .1rem 0rem 0rem 20%;
		}
		ul {
			margin-top: .1rem;
			padding: .1rem 0rem;
			background: #EE6363;
			
			li {
				width: 50%;
				padding-left: 30%;
				color: white;
			}
		}
		p {
			text-align: center;
			color: #848484;
			padding: .2rem;
		}
	}
	.life {
		border-radius: 8px;
		background: white;
		.figure {
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
			width: 100%;
			height: 2.3rem;
		}
		.motto {
			text-align: center;
			color: DimGray;
			padding: .3rem;
		}
	}
	.bottom {
		padding-top: .28rem;
		text-align: center;
		color: #CDCDC1;
		font-size: .14rem;
	}
</style>
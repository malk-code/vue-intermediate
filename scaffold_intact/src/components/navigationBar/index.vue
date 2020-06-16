<template>
	<div class="header" :style="{color:color,background:backColor}">
		<div class="goBack">
			<!--<img src="../../assets/search/goback.png" alt="返回"/>-->
			<span class="iconfont" @click="goBack">
            &#xe615;
          </span>

			<span v-if="closeShow" class="iconfont" @click="close" style="margin-left: .2rem">
            &#xe633;
          </span>

		</div>
		<div class="seekConent">
			<p>{{title}}</p>
		</div>
		<div class="seekRight goBack">
			<!--<span class="monthVi" v-if="month" @click="monthView"><img src="../../assets/verifica/1_3_icon.png"></span>-->
			<img v-if="rightIcon != null" class="rightIcon" :src="rightIcon" @click.stop="$emit('right-event')">
		</div>
	</div>
</template>

<script>
	//import {lonIn} from "./../static/js/logIn";

	export default {
		props: {
			title: String,
			month: Boolean,
			callbackTrue: {
				type: Boolean,
				default: false
			},
			callback: {
				type: Function,
				default: () => {}
			},
			color: {
				type: String,
				default: "#000"
			},
			backColor: {
				type: String,
				default: "#fff"
			},
			closeShow: {
				type: Boolean,
				default: true
			},
			rightIcon: {
				type: String,
				default: null,
			},
		},
		components: {},
		data() {
			return {

			}
		},
		mounted() {

		},

		methods: {
			//返回（待优化）
			goBack: function() {
				if(this.callbackTrue) {
					this.callback();
					return
				}
				if(location.href.indexOf("mode=open") > -1) {
					this.close();
					return
				}
				history.go(-1);
			},
			close: function() {
				window.native.PopViewController();
			},
			//月视图
			monthView: function() {
				this.$router.push({
					"name": "monthView"
				});
			}
		},
		computed: {

		},
		//监控数据变化
		watch: {

		},
		//vue销毁前
		beforeDestroy() {

		}
	}
</script>

<style lang="less" scoped>
	@font-face {
		font-family: 'iconfont';
		/* project id 466348 */
		src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot');
		src: url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.woff') format('woff'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.ttf') format('truetype'), url('//at.alicdn.com/t/font_466348_k31j5fys1rr7ldi.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: "iconfont" !important;
		font-size: .16rem;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.header {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		height: .44rem;
		padding: 0 .12rem;
		background-color: #ff3442;
		z-index: 9999;
		box-sizing: border-box;
		color: #fff;
	}
	
	.goBack {
		width: .6rem;
	}
	
	.goBack img {
		width: .18rem;
		vertical-align: middle;
		margin-bottom: .03rem;
	}
	
	.goBack span {
		line-height: .3rem;
	}
	
	.seekRight {
		span {
			display: inline-block;
			width: 0.23rem;
			height: 0.23rem;
			img {
				width: 100%;
			}
		}
	}
	
	.monthVi {
		// float: right;
		position: absolute;
		top: .08rem;
		right: 1.2rem;
	}
	
	.rightIcon {
		float: right;
		line-height: .44rem;
		padding-top: .03rem;
	}
</style>
<style>

</style>
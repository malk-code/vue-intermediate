<template>
	<div class="login">
		<div class="top"></div>
		<div class="main">
			<p class="title"><img src="../assets/img/LOGO-01.png"></p>
			<div class="invoe">
	  			<p><input type="tel" maxlength="11" v-model="phone" placeholder="请输入手机号"></p>
	  			<p class="code">
	  				<input type="tel" maxlength="4" v-model="verificationCode" placeholder="输入验证码">
	  				<span @click="getVerification" :class="{ action:verificationTrue }">{{ verificationText }}</span>
	  			</p>
	  		</div>
  			<p class="ashore" @click="login" :class="{ action:lonInTrue }">登 录</p>
  			<p class="weChart" @click="wxauth"><img src="../assets/img/weixin.png"></p>
		</div>
	</div>
</template>

<script>	
//	import {sendLoginCode,login} from '../unilts/config/app.api.js'

	export default {
		// 处理导航栏
		beforeCreate() {
			this.$emit('header-state', { hasheader:false })
		},
		data() {
			return {
				phone: "",// 用户输入的电话号码
				verificationCode: "",//验证码的值
//				verificationTrue: false, // 验证码按钮是否可点击
				verificationText: '获取验证码',
				time: null, //计时器
			}
		},
		//引入的组件
	    components: {
	
	    },
		//方法
	    methods: {
			//获取验证码
			getVerification:function(){
				if(!this.verificationTrue){
					return //如果没有电话码号就不发请求
				}
				this.countTime();
			},
			//验证码的倒计时
			countTime:function(){
				let i = 59;
				this.verificationTrue = false;		
				this.verificationText = "59s";								
				this.time = setInterval(()=>{
					i--;
					this.verificationText = i+"s";
					if(i == 0){
						this.verificationText = "获取验证码";
						this.verificationPhone();
						clearInterval(this.time);
					}
				},1000)
			},
			//校验电话号码，决定是否可点击获取验证码
//			verificationPhone:function(){
//				var reg = /^1[0-9]{10}$/;
//				if(reg.test(this.phone)){
//					this.verificationTrue = true;
//				}else{
//					this.verificationTrue = false;				
//				}
//			},
			//账号密码登录
			login:function(){
				if(!this.lonInTrue){
					return //如果没有电话码号和验证码就不发请求
				}
				login({
					"phone":this.phone,
					"code":this.verificationCode
				}).then((data)=>{
					if(!data)return;
					window.localStorage.setItem("logInCode",data.data.result);
					window.native.StartRefresh({"isRefresh":true});
					window.close();
					window.native.PopViewController();
				})
			},
			wxauth: function() {
				window.native.ShareByUI()
			}
		},
		//进入页面加载：设置标题
	  	mounted() {
			let title = (this.$route.meta.title);
			document.title = title;
		},
		//计算属性
	  	computed: {
			lonInTrue:function(){
				var phoneReq = /^1[0-9]{10}$/;
				var verificationReq = /^[0-9]{4}$/;
				if(phoneReq.test(this.phone)&&verificationReq.test(this.verificationCode)){
					return true;
				}else{
					return false;
				}
			},
			// 用 computed 替换 watch
			verificationTrue: function() {
				let reg = /^1[0-9]{10}$/;
				return reg.test(this.phone)
			}
		},
//		//监控数据变化
//	 	watch: {
//			phone:function(v){
//				this.verificationPhone()
//			}
//		}
	}
</script>

<!--引入less库  npm install less less-loader --save-->
<style scoped lang="less">
/*引入vux的重置样式表，重置浏览器默认属性 - 可能未完全成功- 见margin路由引出导致的问题*/
/*@import '~vux/src/styles/reset.less';*/
/*@import '~/node_modules/vux/src/styles/reset.less';*/
	:-moz-placeholder { 
	    color: #aeaeae; 
	}
	::-moz-placeholder {
	    color: #aeaeae;
	}
	input:-ms-input-placeholder {
	    color: #aeaeae;
	}
	input::-webkit-input-placeholder {
	    color: #aeaeae;
	}
	
	.login {
		min-height: 100%;
		background-color: #fff;
		/*备注：需要从App.vue内作路由引出login页面，否则会导致适配问题*/
		/*margin: -20px -8px;*/
	}
	.top {
		height: 1.7rem;
		background-size: 100% 100%;
		background-image:url('../assets/img/carBack.png');
	}
	.main {
		position: relative;
		padding: .54rem .3rem 0 .3rem;
		background: #fff;
		.title {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 0.72rem;
			height: 0.72rem;
			/*background: #ccc;*/
			border-radius: .1rem;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.invoe {
		p {
			line-height: 0.36rem;
			border-bottom: 1px solid #ebecee;
			margin-top: .24rem;
			input {
				width: 100%;
				line-height: 0.36rem;
				outline: inherit;
				text-indent: .05rem;
			}
		}
		.code {
			display: flex;
			justify-content: space-between;
			span {
				width: 0.88rem;
				height: .28rem;
				line-height: 0.28rem;
				border-radius: 0.03rem;
				border: solid 0.01rem #e0e0e0;
				text-align: center;
				color: #aeaeae;
				font-size: 13px;
			}
			.action {
				border: solid 0.01rem #fda80e;
				color: #fda80e;								
			}
		}
	}
	.ashore {
		line-height: 0.45rem;
		background-image: linear-gradient(0deg, #c0c0c0 0%, #e0e0e0 100%);
		box-shadow: 0rem 0.05rem 0.1rem 0rem 
		rgba(192, 192, 192, 0.3);
		border-radius: 0.01rem;
		text-align: center;
		font-size: 15px;
		color: #ffffff;
		margin-top: .35rem;
	}
	.ashore.action {
		background-image: linear-gradient(0deg, 
			#fda80e 0%, 
			#ffc156 100%);
		box-shadow: 0rem 0.05rem 0.1rem 0rem 
			rgba(253, 172, 25, 0.3);
	}
	.weChart {
		text-align: center;
		margin-top: .8rem;
		img {
			width: 0.6rem;
			height: 0.6rem;
		}
	}
	
	input {
		border: none;
		background: 0;
	}
</style>
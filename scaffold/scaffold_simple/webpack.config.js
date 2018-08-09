var path = require('path')
var webpack = require('webpack')

// 引入 vux
const vuxLoader = require('vux-loader')
const webpackConfig = {
	//module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		/* 菜鸟&坑爹：
				在调试模式下，vue 会自动将 build.js 写入运行内存中。simple 的 webpack.config.js 和 init 下的 build 基本等效，只是是简版。生产将 dist 文件放到服务器，直接引用 index.html 即可。
				无论是 simple 还是 init，在 build 的时候都要将 webpack 基础配置信息中 output 的 publicPath 设置为相对路径（./），否则就是请求服务器根目录下的 dist/build.js 文件了。
		*/
		publicPath: process.env.NODE_ENV === 'production' ? './' : '/dist/',
		filename: 'build.js'
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				],
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						['es2015', {
							modules: false
						}]
					],
					plugins: ['syntax-dynamic-import']
				}
			},
			{
				test: /\.(png|jpg|gif|svg|jpeg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader",
			}
		]
	},

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true,

		// 启用本地服务器配置2-2
		inline: true, //实时刷新
		host: "192.168.2.101", //本机的局域网ip
		//  host: "192.168.1.104", // 家
		//  "server": "webpack-dev-server --open", 指令优先级更高
		open: false //是否运行成功后直接打开页面
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
}

if(process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}

// 引用vux：原来的 module.exports 代码赋值给变量 webpackConfig，即将原来的module.exports 改为 const webpackConfig
//module.exports = vuxLoader.merge(webpackConfig, {
//plugins: ['vux-ui']
//})
// vux 可选配置 2：module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })
module.exports = vuxLoader.merge(webpackConfig, {
	plugins: [{
		name: 'vux-ui'
	}, {
		name: 'duplicate-style'
	}]
})
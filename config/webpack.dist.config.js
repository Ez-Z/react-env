process.env.NODE_ENV = 'production';
const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); //复制插件
const AssetsPlugin = require('assets-webpack-plugin');

const { APP_ROOT, commonConfig, localIp, localPort } = require('./webpack.base.config');
const rm = require('rimraf');//删除文件夹

rm(path.resolve(APP_ROOT, 'dist'), err => {
	if (err) throw err;
	webpack(webpackConfig, function (err, stats) {
		if (err) throw err;
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n\n');

		
	});
});

let webpackConfig = {
	mode: 'production',
	plugins: [
		new AssetsPlugin({
			path: path.resolve(APP_ROOT, 'dist/statics/js/'),
			filename: 'webpack-assets.js',
			processOutput: function (assets) {
				return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
			}
		}),
		
		/**
		 * 压缩同时转移静态文件
		 */
		// new CopyWebpackPlugin([
		//     {
		//     	from: path.resolve(APP_ROOT, 'src/statics'),
		//     	to: path.resolve(APP_ROOT, 'dist/statics'),
		//     	ignore: ['*.png', '*.jpg', '*.gif', '*.scss', '*.css']
		//     },
		// ]),
		/**
		 * 生产环境
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: 'false'
		}),
		/**
		 * 这里不用dev模式下的输出html，改用js输出是为了版本控制；index.html会造成缓存，导致即使js带hash无效（微信端是这样）
		 * 需要屏蔽HtmlWebpackPlugin功能，即注释
		 */
		new HtmlWebpackPlugin({
			template: path.resolve(APP_ROOT, 'src/index.tpl.html'),
			inject: 'body',
			filename: './index.html'
		}),
		/**
		 * 优化
		 * webPack 提供了内建插件，直接配置以下代码即可压缩代码.同 -p 显示打包后文件大小
		 */
		// new BundleAnalyzerPlugin({
		//     analyzerMode: 'static', // static 生成html文件 | server 一直监听 | disabled 生成json文件
		//     // analyzerHost: localIp,
		//     // analyzerPort: bundleAnalyzerPort,
		//     reportFilename: 'report.html',
		//     defaultSizes: 'gzip',
		//     openAnalyzer: false,
		//     generateStatsFile: false,
		//     // statsFilename: 'stats.json',
		//     // statsOptions: null,
		//     logLevel: 'info'
		// }),
		/**
		 * webpack3.x 模块串联
		 */
		new webpack.optimize.ModuleConcatenationPlugin()
	],
};

module.exports = webpackMerge(
	commonConfig,
	webpackConfig
);
process.env.NODE_ENV = 'production';
const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const { APP_ROOT, commonConfig, localIp, localPort } = require('./webpack.base.config');

let webpackConfig = {
    mode: 'production',
    plugins: [
        new AssetsPlugin({
            path: path.resolve(APP_ROOT, 'dist/static/js/'),
            filename: 'webpack-assets.js',
            processOutput: function (assets) {
                return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
            }
        }),
        
		/**
		 * 压缩同时转移静态文件
		 */
        // new CopyWebpackPlugin([
        //     { from: path.resolve(APP_ROOT, 'src/static'), to: path.resolve(APP_ROOT, 'dist/static')},
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
		 * webPack 提供了内建插件，直接配置以下代码即可压缩代码.同 -p
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
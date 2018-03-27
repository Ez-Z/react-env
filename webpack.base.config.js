const path = require('path');
const APP_ROOT = process.cwd();
const ENV_IS_DEV = process.env.NODE_ENV === 'development';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const localPort = (() => {
    if (ENV_IS_DEV) {
        return 8000;
    } else {
        return 9000;
    }
})();

const localIp = (() => {
    let ips = [];
    let os = require('os');
    let ntwk = os.networkInterfaces();
    for (let k in ntwk) {
        for (let i = 0; i < ntwk[k].length; i++) {
            let _add = ntwk[k][i].address;
            if (_add && _add.split('.').length == 4 && !ntwk[k][i].internal && ntwk[k][i].family == 'IPv4') {
                ips.push(ntwk[k][i].address);
            }
        }
    }
    return ips[0] || 'localhost';
})();
const defaultConfig = {
    // cheap-module-eval-source-map 原始源码（仅限行）
    // cheap-eval-source-map 转换过的代码（仅限行）// 重构建比较好
    devtool: ENV_IS_DEV ? 'cheap-module-eval-source-map' : undefined,
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devServer: {
        host: localIp,
        contentBase: "/",
        port: localPort,
        inline: true,
        // compress: true, // gzip
        stats: 'errors-only',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 100,
            poll: 500,
            ignored: /node_modules/
        },
        // proxy: {
        // 	"/api": {
        // 		target: "http://test.com",
        // 		pathRewrite: {"^/api" : ""}
        // 	}
        // },
        // hot: true,// HMR 注意需要配合 HotModuleReplacementPlugin 与 module.hot 同--hot
        // hotOnly: true, // 报错原因
        // lazy: true
    },
    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        Buffer: true,
        clearImmediate: false,
        setImmediate: false
    },
    // 启用编译缓存
    cache: true,
};

const baseConfig = {
    resolve: {
        mainFiles: ['index.web', 'index'],
        modules: [path.resolve(APP_ROOT, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'],
        alias: {
            // 依赖
            'react': path.resolve(APP_ROOT, 'node_modules/react/cjs/react.production.min.js'),
            'react-router': path.resolve(APP_ROOT, 'node_modules/react-router/umd/ReactRouter.min.js'),
            'react-dom/server': path.resolve(APP_ROOT, 'node_modules/react-dom/server'),
            'react-dom': path.resolve(APP_ROOT, 'node_modules/react-dom/cjs/react-dom.production.min.js'),
            'react-redux': path.resolve(APP_ROOT, 'node_modules/react-redux/dist/react-redux.min.js'),
            'react-router-redux': path.resolve(APP_ROOT, 'node_modules/react-router-redux/dist/ReactRouterRedux.min.js'),
            'redux-thunk': path.resolve(APP_ROOT, 'node_modules/redux-thunk/dist/redux-thunk.min.js'),
            // 'rc-form/lib': path.resolve(APP_ROOT, 'node_modules/rc-form/lib'),
            // 'rc-form': path.resolve(APP_ROOT, 'node_modules/rc-form/dist/rc-form.min.js'),
            'redux': path.resolve(APP_ROOT, 'node_modules/redux/dist/redux.min.js'),
            // 'immutable': path.resolve(APP_ROOT, 'node_modules/immutable/dist/immutable.min.js'),
            'babel-polyfill': path.resolve(APP_ROOT, 'node_modules/babel-polyfill/dist/polyfill.min.js'),
            // 'lrz': path.resolve(APP_ROOT, 'node_modules/lrz/dist/lrz.all.bundle.js'),
            // 其他
            // 'pure-render-decorator': path.resolve(APP_ROOT, 'src/pages/utils/pure-render-decorator'),
            // '@'								: path.resolve(APP_ROOT, 'src/pages'),
            // '@common': path.resolve(APP_ROOT, 'src/pages/components/_common'),
            // 主端
            // '@actions': path.resolve(APP_ROOT, 'src/pages/actions'),
            // '@components': path.resolve(APP_ROOT, 'src/pages/components'),
            // '@constants': path.resolve(APP_ROOT, 'src/pages/constants'),
            // '@utils': path.resolve(APP_ROOT, 'src/pages/utils'),
        }
    },
    //入口
    entry: {
        app: [
            './src/main.js'
        ],
        // common: [
        //     'react',
        //     'react-dom',
        //     'react-router-dom',
        //     'babel-polyfill',
        //     'redux',
        //     'redux-thunk',
        //     'react-router-redux',
        //     'classnames',
        // ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendors',
                },
                common: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        },
        runtimeChunk: { name: 'runtime' }
    },
    // 出口
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:8].bundle.js',  // 每个页面对应的主js的生成配置
        chunkFilename: 'js/[name].[hash:8].chunk.js',  // chunk生成的配置
        sourceMapFilename: 'js/[name].[hash:8].bundle.map',
    },
    
    // 插件
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/initial.[name].[hash:8].css',
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],     
    // 模块
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['es2015', 'react'],
                        cacheDirectory: true // 启用编译缓存
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
                use: ['file-loader']
            },

        ]
    }
};

module.exports = {
    APP_ROOT,
    localIp,
    localPort,
    commonConfig: webpackMerge(
        baseConfig,
        defaultConfig
    )
};
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
    devServer: {
        host: localIp,
        contentBase: "/",
        port: localPort,
        inline: true,
        // autoOpenBrowser: true,
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
            // 依赖重定向
            'react': path.resolve(APP_ROOT, 'node_modules/react/cjs/react.production.min.js'),
            'react-router-dom': path.resolve(APP_ROOT, 'node_modules/react-router-dom/umd/react-router-dom.min.js'),
            'react-dom/server': path.resolve(APP_ROOT, 'node_modules/react-dom/server'),
            'react-dom': path.resolve(APP_ROOT, 'node_modules/react-dom/cjs/react-dom.production.min.js'),
            'react-redux': path.resolve(APP_ROOT, 'node_modules/react-redux/dist/react-redux.min.js'),
            'pure-render-decorator': path.resolve(APP_ROOT, 'src/utils/pure-render-decorator'),
            // 'react-router-redux': path.resolve(APP_ROOT, 'node_modules/react-router-redux/dist/ReactRouterRedux.min.js'),
            'redux-thunk': path.resolve(APP_ROOT, 'node_modules/redux-thunk/dist/redux-thunk.min.js'),
            'redux': path.resolve(APP_ROOT, 'node_modules/redux/dist/redux.min.js'),
            'babel-polyfill': path.resolve(APP_ROOT, 'node_modules/babel-polyfill/dist/polyfill.min.js'),
            // 主端
            '@common': path.resolve(APP_ROOT, 'src/components/_common'),
            '@actions': path.resolve(APP_ROOT, 'src/stores/actions'),
            '@components': path.resolve(APP_ROOT, 'src/components'),
            '@containers': path.resolve(APP_ROOT, 'src/containers'),
            '@images': path.resolve(APP_ROOT, 'src/statics/images'),
            '@utils': path.resolve(APP_ROOT, 'src/utils'),
        }
    },
    //入口
    entry: {
        app: [
            './src/main.js'
        ],
    },
    optimization: {
        // 默认关闭压缩
        minimize: ENV_IS_DEV ? false : true,
        // 原：NamedModulesPlugin()
        namedModules: true,
        // 原：NoEmitOnErrorsPlugin() - 异常继续执行
        noEmitOnErrors: true,
        // 原：ModuleConcatenationPlugin() - 模块串联 - dev模式下回影响antd（比如：Pagination, 和语言有关）
        concatenateModules: !ENV_IS_DEV,
        // 原：CommonsChunkPlugin()
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: chunk => {
                        const modules = [
                            'babel-polyfill',
                            'react',
                            'react-dom',
                            'react-redux',
                            'react-router-dom',
                            'redux',
                            'redux-thunk',
                            'classnames',
                        ];
                        let isInModules = modules.some(i => (new RegExp(`([\\\\/]+)node_modules([\\\\/_]+)${i}`)).test(chunk.resource));
                        return chunk.resource
                            && /\.js$/.test(chunk.resource)
                            && isInModules;
                    },
                    chunks: 'all',
                    name: 'vendors',
                },
            }
        },
        runtimeChunk: { name: 'runtime' }
    },
    // 出口
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'statics/js/[name].[hash:8].bundle.js',  // 每个页面对应的主js的生成配置
        chunkFilename: 'statics/js/[name].[hash:8].chunk.js',  // chunk生成的配置
        sourceMapFilename: 'statics/js/[name].[hash:8].bundle.map',
    },

    // 插件
    plugins: [
        //单独抽离css文件
        new ExtractTextPlugin({
            filename: 'statics/css/initial.[name].[hash:8].css',
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
            // {
            //     test: /\.css$/,
            //     include: [path.resolve(APP_ROOT, "src/statics/css")],
            //     exclude: [path.resolve(APP_ROOT, "node_modules")],
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'postcss-loader']
            //     })
            // },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ],

            },
            {
                test: /\.(scss|css)$/,
                include: [path.resolve(APP_ROOT, "src/statics/css"), path.resolve(APP_ROOT, "src/components")],
                exclude: [path.resolve(APP_ROOT, "node_modules")],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(APP_ROOT, 'config/postcss.config.js')
                            }
                        }
                    }, 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader?name=statics/images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: 'file-loader?name=statics/fonts/[hash:8].[name].[ext]'
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
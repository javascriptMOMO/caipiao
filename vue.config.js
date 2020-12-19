const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    // 基本路径
    publicPath: "./",
    // 输出文件目录
    outputDir: "caipiao",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    productionSourceMap: false,//不生成MAP文件
    // webpack配置
    chainWebpack: config => {
        // config.entry("index").add("babel-polyfill");
        config.resolve.alias
            .set('api', resolve('src/apis'))
            .set('coms', resolve('src/components'))
            .set('tool', resolve('src/tool'))
            .set('assets', resolve('src/assets'))
    },
    // 生产版本取出console调试信息
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.plugins.push(
                new TerserPlugin({
                    terserOptions: {
                        parallel: true,//使用多进程提高构建速度
                        warnings: false,
                        compress: {
                            drop_debugger: true, // console
                            drop_console: true,
                            pure_funcs: ["console.log"] // 移除console
                        },
                    },
                }),
            );
        }
        // config.devtool('source-map');
    },
    // 生产环境是否生成 sourceMap 文件
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: process.env.NODE_ENV === "production" ? false : true,
        // css预设器配置项
        loaderOptions: {

        },
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false
    },
    // webpack-dev-server 相关配置
    devServer: {
        port: 8888, // 端口号
        // host: "localhost",
        https: false,// http:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            "/cp": {
                target: "http://118.31.42.0:8080",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/cp": ""
                }
            }
        }
    },
    // devtool:'source-map',
};
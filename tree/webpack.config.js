var path = require("path") //node.js内置模块 用于操作文件路径
let HtmlWebpackPlugin = require("html-webpack-plugin") //html插件 自动构建html文件
module.exports = {
    devServer: { //开发服务器配置  会在内存中生成打包文件 不会真的生成文件
        port: 3000, //设置端口号
        progress: true, //显示打包进度
        contentBase: "./dist", //设置静态服务器文件目录
        open: true, //自动打开浏览器
    },
    mode: "production",
    entry: "./bst.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:5].js"
    },
    plugins: [ //数组 处理webpack的所有插件
        new HtmlWebpackPlugin({
            template: "./index.html", //模板文件
            filename: "index.html",
            minify: {
                removeAttributeQuotes: true, //删除属性双引号
                collapseWhitespace: true, //清除折叠空行

            },
            // hash: true, //生成hash戳
        })
    ]
};
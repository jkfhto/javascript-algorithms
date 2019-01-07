var path = require("path"); //node.js内置模块 用于操作文件路径

module.exports = {
    mode: "development",
    entry: "./minStack.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }]
    }
};
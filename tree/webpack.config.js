var path = require("path"); //node.js内置模块 用于操作文件路径

module.exports = {
    mode: "development",
    entry: "./bst.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
};
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 按需生成html模版
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清理文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 样式抽取
module.exports = {
    // mode: "production",
    mode: "development",
    entry: path.resolve(__dirname, "assets/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "hapidog.bundle.[hash].js",
        publicPath: ""
    },
    resolve: {
        extensions: [".js", ".jsx", ".js"],
        modules: ["./components", "./assets", "./pages", "node_modules"],
        alias: {
            // components: path.resolve(__dirname, "components/"),
            // assets: path.resolve(__dirname, "assets/")
        }
    },
    devServer: {
        port: 9000,
        openPage: "",
        contentBase: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.jsx|js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015","env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: MiniCssExtractPlugin.loader,
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: "file-loader" //加载图片， 混合到css中 
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader", "url-loader"] // 加载字体
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]"
            }
        ]
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/pages/index.html"
        }),
        new CleanWebpackPlugin('dist/**/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}
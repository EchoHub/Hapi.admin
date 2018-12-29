const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 按需生成html模版
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清理文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 样式抽取
module.exports = {
    // mode: "production",
    mode: "development",
    entry: {
        index: path.resolve(__dirname, "assets/index.js"),
        login: path.resolve(__dirname, "assets/login.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "hapidog.[name].bundle.[hash].js",
        // publicPath: "/dist"
    },
    resolve: {
        extensions: [".js", ".jsx", ".js"],
        modules: ["./components", "./assets", "./pages", "./libs","node_modules"],
        alias: {
            // components: path.resolve(__dirname, "components/"),
            // assets: path.resolve(__dirname, "assets/")
        }
    },
    devServer: {
        port: 9000,
        openPage: "login.html",
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
                            "env", "react", "es2015", "stage-0"
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
                test: /\.(s?)css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            // {
            //     test: /\.(png|svg|jpg|gif|ico)$/,
            //     use: "file-loader" //加载图片， 混合到css中 
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"] // 加载字体
                // , "url-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: "url-loader?limit=8192&name=./static/[name].[hash:8].[ext]"
            }
        ]
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/pages/index.html",
            filename: "index.html",
            title: "index",
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/pages/login.html",
            filename: "login.html",
            title: "login",
            chunks: ["login"]
        }),
        new CleanWebpackPlugin('dist/**/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}
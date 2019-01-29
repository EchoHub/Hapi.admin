const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Glob = require("./default");
const env = process.env.NODE_ENV;
module.exports = {
    mode: env,
    entry: {
        ...Glob.entries,
        vendor: ["@babel/polyfill", "react", "react-dom"]
    },
    output: Glob.outputOps,
    resolve: {
        extensions: Glob.resolveExtension,
        modules: Glob.resolveModules,
        alias: Glob.resolveAlias
    },
    cache: true,
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: [
                            "env", "react", "es2015", "stage-0"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s?)css$/,
                use: env === "production" ? [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './../dist/public'
                        }
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    }, {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ] : [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                        },
                        {
                            loader: "sass-loader" // 将 Sass 编译成 CSS
                        }
                    ]
            },
            {
                test: /\.htm|html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: env === "production"  //压缩html代码
                    }
                }
            },
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
    plugins: [
        new CleanWebpackPlugin(Glob.pathsToClean, Glob.cleanWebpackPluginOps),
        ...addHTMLWebpackPlugins(Glob.entryPages),
        new webpack.optimize.SplitChunksPlugin({ // 分割打包，代码复用
            chunks: "async",
            minSize: 20000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true
        })
    ]
}
function addHTMLWebpackPlugins(paths) {
    const _paths = paths.filter(path => /\.(htm|html)$/.test(path));
    return _paths.map(filename => {

        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `./../pages/${filename}`),
            filename: filename
        })
    })
}
// const webpack = require("webpack");
// const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // 按需生成html模版
// const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清理文件
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 样式抽取
// const env = process.env.NODE_ENV
// module.exports = {
//     mode: env,
//     entry: {
//         index: path.resolve(__dirname, "assets/index.js"),
//         login: path.resolve(__dirname, "assets/login.js"),
//     },
//     output: {
//         path: path.resolve(__dirname, "dist"),
//         filename: "hapidog.[name].bundle.[hash].js",
//         // publicPath: "/dist"
//     },
//     resolve: {
//         extensions: [".js", ".jsx", ".js"],
//         modules: ["./components", "./assets", "./pages", "./libs","node_modules"],
//         alias: {
//             // components: path.resolve(__dirname, "components/"),
//             // assets: path.resolve(__dirname, "assets/")
//         }
//     },
//     devServer: {
//         port: 9000,
//         openPage: "login.html",
//         contentBase: "./dist"
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx|js$/,
//                 use: {
//                     loader: "babel-loader",
//                     options: {
//                         presets: [
//                             "env", "react", "es2015", "stage-0"
//                         ]
//                     }
//                 },
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.css$/,
//                 loader: MiniCssExtractPlugin.loader,
//             },
//             {
//                 test: /\.(s?)css$/,
//                 use: [{
//                     loader: "style-loader"
//                 }, {
//                     loader: "css-loader"
//                 }, {
//                     loader: "sass-loader"
//                 }]
//             },
//             // {
//             //     test: /\.(png|svg|jpg|gif|ico)$/,
//             //     use: "file-loader" //加载图片， 混合到css中 
//             // },
//             {
//                 test: /\.(woff|woff2|eot|ttf|otf)$/,
//                 use: ["file-loader"] // 加载字体
//                 // , "url-loader"
//             },
//             {
//                 test: /\.(png|svg|jpg|gif)$/,
//                 use: "url-loader?limit=8192&name=./static/[name].[hash:8].[ext]"
//             }
//         ]
//     },
//     optimization: {
//         minimize: true
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: __dirname + "/pages/index.html",
//             filename: "index.html",
//             title: "index",
//             chunks:['index']
//         }),
//         new HtmlWebpackPlugin({
//             template: __dirname + "/pages/login.html",
//             filename: "login.html",
//             title: "login",
//             chunks: ["login"]
//         }),
//         new CleanWebpackPlugin('dist/**/*.*', {
//             root: __dirname,
//             verbose: true,
//             dry: false
//         })
//     ]
// }
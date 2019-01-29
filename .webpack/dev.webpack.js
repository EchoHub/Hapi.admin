const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");
const base = require("./base.webpack");
module.exports = webpackMerge(
    base,
    {
        devServer: {
            port: 8888,
            contentBase: path.join(__dirname, '../dist'),
            compress: true,
            host: "0.0.0.0",
            hot: true,
            inline: true,
            open: true,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
)

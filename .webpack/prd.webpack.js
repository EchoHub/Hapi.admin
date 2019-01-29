const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");
const base = require("./base.webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const extractSass = new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css"
});
module.exports = webpackMerge(
    base,
    {
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.(js|jsx)$/,
                })
            ]
        },
        plugins: [
            extractSass
        ]
    }
)

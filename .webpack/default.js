const path = require("path");
const fs = require("fs");
const pkg = require("./../package.json");

// const srcPath = path.resolve(__dirname, "./../src");
const srcPath = __dirname
const distPath = path.resolve(__dirname, "./../dist");
// 入口文件
let entries = {}
fs.readdirSync(path.resolve(__dirname, "./../assets")).forEach(entry => {
    const regExp = /\.(js|jsx|ts|tsx)$/
    if(regExp.test(entry))
    entries[entry.replace(regExp, "")] = path.resolve(__dirname, `./../assets/${entry}`)
});
const entryPages = fs.readdirSync(path.resolve(__dirname, "./../pages"));

// 出口文件
const outputOps = {
    publicPath: "",
    path: distPath,
    filename: "[name].[hash].bundle.js"
};

// 自动解析确定的扩展名
const resolveExtension = [".js", ".jsx", ".ts", ".tsx", ".json"];

// 解析搜索模块的目录
const resolveModules = [
    path.resolve(__dirname, "./../components"), 
    path.resolve(__dirname, "./../assets"), 
    path.resolve(__dirname, "./../pages"),
    "node_modules"]

// 别名
const resolveAlias = {
    components: path.resolve(srcPath, "/components"),
    pages: path.resolve(srcPath, "/pages"),
    public: path.resolve(srcPath, "/public"),
}

module.exports = {
    version: pkg.version,
    srcPath: srcPath,
    distPath: distPath,
    entries: entries,
    entryPages: entryPages,
    outputOps: outputOps,
    resolveExtension: resolveExtension,
    resolveModules: resolveModules,
    resolveAlias: resolveAlias,
    pathsToClean: path.resolve(__dirname, "./../dist/**/*.*"),
    cleanWebpackPluginOps: {
        root: __dirname,
        allowExternal: true, // 允许清除根路径外的文件
        verbose: true,
        dry: false
    }
}
/**
 * @desc 页面配置信息
 */
import Console from "./console"
import ButtonPage from "./buttonPage"
import FormPage from "./formPage"
import Table from "./table"
import Layout from "./layout"
import Notice from "./notice"
import Canvas from "./canvas"
import Others from "./others"
var Pages = {
    "console" : Console,
    "buttonPage" : ButtonPage,
    "layout" : Layout,
    "formPage" : FormPage,
    "notice" : Notice,
    "others" : Others,
    "table" : Table,
    "canvas" : Canvas,
};
export default Pages;
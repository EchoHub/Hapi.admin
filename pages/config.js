/**
 * @desc 页面配置信息
 */
import Console from "./console"
import ButtonPage from "./buttonPage"
import FormPage from "./formPage"
import TablePage from "./tablePage"
import Layout from "./layout"
import Notice from "./notice"
import Canvas from "./canvas"
import Others from "./others"
import ExpertPage from "./expertPage"
import ExpertList from "./expertList"
var Pages = {
    "console" : Console,
    "buttonPage" : ButtonPage,
    "layout" : Layout,
    "formPage" : FormPage,
    "notice" : Notice,
    "others" : Others,
    "tablePage" : TablePage,
    "canvas" : Canvas,
    "expertPage" : ExpertPage,
    "expertList" : ExpertList,
};
export default Pages;
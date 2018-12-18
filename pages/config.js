/**
 * @desc 页面配置信息
 */
import Console from "./console"
import ButtonPage from "./buttonPage"
import FormPage from "./formPage"
import TablePage from "./tablePage"
import Layout from "./layout"
import NoticePage from "./noticePage"
import ModalPage from "./modalPage"
import Canvas from "./canvas"
import Others from "./others"
import ExpertPage from "./expertPage"
import ExpertList from "./expertList"
import TransferPage from "./transferPage"
var Pages = {
    "console" : Console,
    "buttonPage" : ButtonPage,
    "layout" : Layout,
    "formPage" : FormPage,
    "noticePage" : NoticePage,
    "modalPage" : ModalPage,
    "others" : Others,
    "tablePage" : TablePage,
    "canvas" : Canvas,
    "expertPage" : ExpertPage,
    "expertList" : ExpertList,
    "transferPage" : TransferPage,
};
export default Pages;
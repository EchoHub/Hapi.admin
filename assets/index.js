import React, { Component } from "react";
import { render } from "react-dom";
import AdminSystem from "adminSystem/adminSystem";
import "./index.scss";
const root = document.getElementById("root");
const menus = [
    {
        title: "中控台",
        icon: "icon-browse",
        route: "",
        flag: 0,
        children: []
    },
    {
        title: "组件",
        icon: "icon-manage",
        flag: 1,
        children: [
            {
                title: "布局",
                icon: "",
                route: "",
                flag: 0,
            },
            {
                title: "按钮",
                icon: "",
                route: "",
                flag: 0,
            },
            {
                title: "表单",
                icon: "",
                route: "",
                flag: 0,
            },
            {
                title: "表格",
                icon: "",
                route: "",
                flag: 0,
            },
            {
                title: "通知",
                icon: "",
                route: "",
                flag: 0,
            },
            {
                title: "其他",
                icon: "",
                route: "",
                flag: 0,
            },
        ]
    },
    {
        title: "页面",
        icon: "icon-other",
        flag: 1,
        children: [
            {
                title: "基础组件",
                icon: "",
                flag: 0,
            },
            {
                title: "布局",
                icon: "",
                flag: 0,
            },
            {
                title: "表单",
                icon: "",
                flag: 0,
            },
            {
                title: "表格",
                icon: "",
                flag: 0,
            },
            
        ]
    },
    {
        title: "演示",
        icon: "icon-createtask",
        flag: 1,
        children: [
            {
                title: "详情页",
                icon: "",
                route: "",
                flag: 0
            },
            {
                title: "会员列表",
                icon: "",
                route: "",
                flag: 0
            }
        ]
    }
]
render(<AdminSystem theme="primary" menus={menus}></AdminSystem>, root, () => {
    console.log("%cWelcome to Hapi World!!!", "color: #ff6600")
});
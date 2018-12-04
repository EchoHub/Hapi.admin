import React, { Component } from "react";
import { render } from "react-dom";
import AdminSystem from "adminSystem/adminSystem";
import "./index.scss";
const root = document.getElementById("root");
const menus = [
    {
        title: "中控台",
        belong: "首页",
        icon: "icon-browse",
        route: "/console",
        flag: 0
    },
    {
        title: "组件",
        icon: "icon-manage",
        flag: 1,
        children: [
            {
                title: "布局",
                belong: "组件",
                icon: "",
                route: "/layout",
                flag: 0,
            },
            {
                title: "按钮",
                belong: "组件",
                icon: "",
                route: "/buttonPage",
                flag: 0,
            },
            {
                title: "表单",
                belong: "组件",
                icon: "",
                route: "/formPage",
                flag: 0,
            },
            {
                title: "表格",
                belong: "组件",
                icon: "",
                route: "/tablePage",
                flag: 0,
            },
            {
                title: "通知",
                belong: "组件",
                icon: "",
                route: "/notice",
                flag: 0,
            },
            {
                title: "画布",
                belong: "组件",
                icon: "",
                route: "/canvas",
                flag: 0,
            },
            {
                title: "其他",
                belong: "组件",
                icon: "",
                route: "/others",
                flag: 0,
            }
        ]
    },
    {
        title: "页面",
        icon: "icon-other",
        flag: 1,
        children: [
            {
                title: "登陆页",
                belong: "页面",
                icon: "",
                route: "/login",
                flag: 0,
            },
            {
                title: "注册页",
                belong: "页面",
                icon: "",
                route: "/registry",
                flag: 0,
            },
            {
                title: "空白页",
                belong: "页面",
                icon: "",
                route: "/blank",
                flag: 0,
            },
            {
                title: "结果页",
                belong: "页面",
                icon: "",
                route: "/result",
                flag: 0,
            },
            {
                title: "404",
                belong: "页面",
                icon: "",
                route: "/404",
                flag: 0,
            }
        ]
    },
    {
        title: "演示",
        icon: "icon-createtask",
        flag: 1,
        children: [
            {
                title: "详情页",
                belong: "演示",
                icon: "",
                route: "/detail",
                flag: 0
            },
            {
                title: "专家列表",
                belong: "演示",
                icon: "",
                route: "/expertList",
                flag: 0
            },
            {
                title: "专家详情",
                belong: "演示",
                icon: "",
                route: "/expertPage",
                flag: 0,
            }
        ]
    }
]
render(<AdminSystem theme="primary" menus={menus}></AdminSystem>, root, () => {
    console.log("%cWelcome to Hapi World!!!", "color: #ff6600")
});
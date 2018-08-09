import React, { Component } from "react";
import { render } from "react-dom";
import AdminSystem from "adminSystem/adminSystem";
import "./index.scss";
const root = document.getElementById("root");
const menus = [
    {
        title: "中控台",
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
                icon: "",
                route: "/layout",
                flag: 0,
            },
            {
                title: "按钮",
                icon: "",
                route: "/button",
                flag: 0,
            },
            {
                title: "表单",
                icon: "",
                route: "/form",
                flag: 0,
            },
            {
                title: "表格",
                icon: "",
                route: "/table",
                flag: 0,
            },
            {
                title: "通知",
                icon: "",
                route: "/notice",
                flag: 0,
            },
            {
                title: "其他",
                icon: "",
                route: "/others",
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
                title: "登陆页",
                icon: "",
                route: "/login",
                flag: 0,
            },
            {
                title: "注册页",
                icon: "",
                route: "/registry",
                flag: 0,
            },
            {
                title: "空白页",
                icon: "",
                route: "/blank",
                flag: 0,
            },
            {
                title: "结果页",
                icon: "",
                route: "/result",
                flag: 0,
            },
            {
                title: "404",
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
                icon: "",
                route: "/detail",
                flag: 0
            },
            {
                title: "会员列表",
                icon: "",
                route: "/member_list",
                flag: 0
            }
        ]
    }
]
render(<AdminSystem theme="primary" menus={menus}></AdminSystem>, root, () => {
    console.log("%cWelcome to Hapi World!!!", "color: #ff6600")
});
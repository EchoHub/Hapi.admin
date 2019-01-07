import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import { Button, Notice, DropDown, GridLayout, Layout, Panel } from "common"
import "./dropDownPage.scss"

export default class DropDownPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        return <div className="hp-dropdownpage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="下拉菜单" toolbar={true}>
                        <p className="introduction">向下弹出的列表。当页面中操作项太多时，可以运用此组件将用户操作放到下拉菜单中。</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={4}>
                    <Panel className="mt-10"
                        title="基本用法" toolbar={true}>
                        <p>最简单的下拉菜单</p>
                        <DropDown
                            menu={
                                [
                                    {
                                        item: {
                                            key: 1, name: "1st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 2, name: "2st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 3, name: "3st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 4, name: "4st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 5, name: "5st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 6, name: "6st menu item"
                                        }
                                    }
                                ]
                            }>
                            Hover me
                        </DropDown>
                        <DropDown
                            className="ml-10"
                            type="click"
                            menu={
                                [
                                    {
                                        item: {
                                            key: 1, name: "1st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 2, name: "2st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 3, name: "3st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 4, name: "4st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 5, name: "5st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 6, name: "6st menu item"
                                        }
                                    }
                                ]
                            }>
                            Click me
                        </DropDown>
                    </Panel>
                </Layout>
                <Layout col={4}>
                    <Panel className="mt-10"
                        style={{ width: "calc(100% - 5px)", marginLeft: "5px" }}
                        title="多级菜单" toolbar={true}>
                        <p>通过传入的菜单里有多个层级，实现多级菜单。</p>
                        <DropDown
                            menu={
                                [
                                    {
                                        subMenu: {
                                            name: "1st submenu",
                                            menu: [
                                                {
                                                    key: 1, name: "1st menu item", disabled: true
                                                },
                                                {
                                                    key: 2, name: "2st submenu item"
                                                },
                                                {
                                                    key: 3, name: "3st submenu item"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        item: {
                                            key: 2, name: "2st menu item"
                                        }
                                    },
                                    {
                                        subMenu: {
                                            name: "3st submenu",
                                            menu: [
                                                {
                                                    subMenu: {
                                                        name: "3st submenu",
                                                        menu: [
                                                            {
                                                                key: 1, name: "1st menu item", disabled: true
                                                            },
                                                            {
                                                                key: 2, name: "2st submenu item"
                                                            },
                                                            {
                                                                key: 3, name: "3st submenu item"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    key: 2, name: "2st submenu item"
                                                },
                                                {
                                                    key: 3, name: "3st submenu item"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        subMenu: {
                                            name: "4st submenu",
                                            menu: [
                                                {
                                                    subMenu: {
                                                        name: "4st submenu",
                                                        menu: [
                                                            {
                                                                subMenu: {
                                                                    name: "4st submenu",
                                                                    disabled: true,
                                                                    menu: [
                                                                        {
                                                                            key: 1, name: "1st menu item"
                                                                        },
                                                                        {
                                                                            key: 2, name: "2st submenu item"
                                                                        },
                                                                        {
                                                                            key: 3, name: "3st submenu item"
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                key: 2, name: "2st submenu item"
                                                            },
                                                            {
                                                                key: 3, name: "3st submenu item"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    key: 2, name: "2st submenu item"
                                                },
                                                {
                                                    key: 3, name: "3st submenu item"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        item: {
                                            key: 5, name: "5st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 6, name: "6st menu item"
                                        }
                                    }
                                ]
                            }>
                            Cascading menu
                        </DropDown>
                    </Panel>
                </Layout>
                <Layout col={4}>
                    <Panel className="mt-10"
                        style={{ width: "calc(100% - 5px)", marginLeft: "5px" }}
                        title="禁用菜单状态">
                        <p>状态 disabled 设置禁用状态</p>
                        <DropDown
                            menu={
                                [
                                    {
                                        item: {
                                            key: 1, name: "1st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 2, name: "2st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 3, name: "3st menu item", disabled: true
                                        }
                                    },
                                    {
                                        item: {
                                            key: 4, name: "4st menu item"
                                        }
                                    },
                                    {
                                        item: {
                                            key: 5, name: "5st menu item", disabled: true
                                        }
                                    },
                                    {
                                        item: {
                                            key: 6, name: "6st menu item"
                                        }
                                    }
                                ]
                            }>
                            some disabled
                        </DropDown>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10"
                        title="触发事件" toolbar={true}>
                        <p>点击菜单会触发事件，用户可以获取对应的菜单内容，并进行不同的操作。</p>
                        <DropDown
                            menu={
                                [
                                    {
                                        item: {
                                            key: 1, name: "1st menu item",
                                            onClick: item => {
                                                Notice.info({
                                                    title: item.name,
                                                    content: `Current active item is ${item.name}, value is ${item.value}`
                                                }, true)
                                            }
                                        }
                                    },
                                    {
                                        item: {
                                            key: 2, name: "2st menu item",
                                            onClick: item => {
                                                Notice.success({
                                                    title: item.name,
                                                    content: `Current active item is ${item.name}, value is ${item.value}`
                                                }, true)
                                            }
                                        }
                                    },
                                    {
                                        item: {
                                            key: 3, name: "3st menu item",
                                            onClick: item => {
                                                Notice.warning({
                                                    title: item.name,
                                                    content: `Current active item is ${item.name}, value is ${item.value}`
                                                }, true)
                                            }
                                        }
                                    },
                                    {
                                        item: {
                                            key: 4, name: "4st menu item",
                                            onClick: item => {
                                                Notice.error({
                                                    title: item.name,
                                                    content: `Current active item is ${item.name}, value is ${item.value}`
                                                }, true)
                                            }
                                        }
                                    },
                                    {
                                        item: {
                                            key: 5, name: "5st menu item",
                                            onClick: item => {
                                                Notice.info({
                                                    title: item.name,
                                                    content: `Current active item is ${item.name}, value is ${item.value}`
                                                }, true)
                                            }
                                        }
                                    },
                                    {
                                        item: {
                                            key: 6, name: "6st menu item",
                                            onClick: item => {
                                                Notice.success({
                                                    title: item.name,
                                                    content: `Current active item is ${item.name}, value is ${item.value}`
                                                }, true)
                                            }
                                        }
                                    }
                                ]
                            }>
                            Hover me, and Click menu item
                        </DropDown>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
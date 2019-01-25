import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import { Cascader, GridLayout, Layout, Panel } from "common"
import "./cascaderPage.scss"

export default class CascaderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        return <div className="hp-cascaderpage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="级联选择器" toolbar={true}>
                        <p className="introduction">级联选择器：多级数据集合分隔，逐级选择。</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)" }} title="基本用法" toolbar={true}>
                        <p className="introduction">基本用法：基本用法，例如省市区选择器、车型选择器等。</p>
                        <Cascader 
                        className="w-16"
                        options={
                            [
                                {
                                    name: "Zhejiang",
                                    label: "Zhejiang",
                                    children: [
                                        {
                                            name: "HangZhou",
                                            label: "HangZhou",
                                            children: [
                                                {
                                                    name: "West Lake",
                                                    label: "West Lake"
                                                }
                                            ]
                                        },
                                        {
                                            name: "HuZhou",
                                            label: "HuZhou",
                                            children: [
                                                {
                                                    name: "De Qing",
                                                    label: "De Qing"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "JiangSu",
                                    label: "JiangSu",
                                    children: [
                                        {
                                            name: "NanJing",
                                            label: "NanJing",
                                            children: [
                                                {
                                                    name: "Xuanwu Lake",
                                                    label: "Xuanwu Lake"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        ></Cascader>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="默认值" toolbar={true}>
                        <p className="introduction">默认值：通过数组的形式，进行默认值设定。</p>
                        <Cascader 
                        className="w-16"
                        options={
                            [
                                {
                                    name: "Zhejiang",
                                    label: "Zhejiang",
                                    children: [
                                        {
                                            name: "HangZhou",
                                            label: "HangZhou",
                                            children: [
                                                {
                                                    name: "West Lake",
                                                    label: "West Lake"
                                                }
                                            ]
                                        },
                                        {
                                            name: "HuZhou",
                                            label: "HuZhou",
                                            children: [
                                                {
                                                    name: "De Qing",
                                                    label: "De Qing"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: "JiangSu",
                                    label: "JiangSu",
                                    children: [
                                        {
                                            name: "NanJing",
                                            label: "NanJing",
                                            children: [
                                                {
                                                    name: "Xuanwu Lake",
                                                    label: "Xuanwu Lake"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        values={["Zhejiang", "HuZhou", "De Qing"]}
                        ></Cascader>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
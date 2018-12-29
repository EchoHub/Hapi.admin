import React, { Component } from 'react';
import { Panel, GridLayout, Layout, Button, Transfer } from "common";
import PropTypes from 'prop-types';
import "./transferPage.scss"

export default class TransferPage extends Component {
    render() {
        return <div className="hp-tablepage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="穿梭框" toolbar={true}>
                        <p className="introduction">双栏穿梭选择框，需要在多个可选项之间进行多选，相比选择框、树型选择框，展示的可选项信息更多。</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" title="基本用法" style={{ width: "calc(100% - 5px)", marginRight: "5px" }} toolbar={true}>
                        <p>选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。 其中，左边一栏为 source，右边一栏为 target。</p>
                        <Transfer
                            dataSource={[
                                {
                                    content: "content0",
                                    key: 0
                                },
                                {
                                    content: "content1",
                                    key: 1
                                },
                                {
                                    content: "content2",
                                    key: 2
                                },
                                {
                                    content: "content3",
                                    key: 3
                                },
                                {
                                    content: "content4",
                                    key: 4
                                },
                                {
                                    content: "content5",
                                    key: 5
                                }
                            ]}
                            targetSource={[
                                {
                                    content: "content6",
                                    key: 6
                                },
                                {
                                    content: "content7",
                                    key: 7
                                }
                            ]}
                        ></Transfer>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10" title="基本用法" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} toolbar={true}>
                        <p>带搜索框的穿梭框：通过模糊搜索对数据来源进行过滤，筛选出需要的结果集再进行选择。</p>
                        <Transfer
                            showSearch
                            dataSource={[
                                {
                                    content: "content0",
                                    key: 0
                                },
                                {
                                    content: "content1",
                                    key: 1
                                },
                                {
                                    content: "content2",
                                    key: 2
                                },
                                {
                                    content: "content3",
                                    key: 3
                                },
                                {
                                    content: "content4",
                                    key: 4
                                },
                                {
                                    content: "content5",
                                    key: 5
                                }
                            ]}
                            targetSource={[
                                {
                                    content: "content6",
                                    key: 6
                                },
                                {
                                    content: "content7",
                                    key: 7
                                }
                            ]}
                        ></Transfer>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
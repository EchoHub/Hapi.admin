import React, { Component } from 'react';
import { Panel, DataGridView, Column, GridLayout, Layout, Button, Notice } from "common";
import PropTypes from 'prop-types';
import "./tablePage.scss"

export default class TablePage extends Component {
    render() {
        return <div className="hp-tablepage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="列表" toolbar={true}>
                        <p className="introduction">DataGridView通常结合Column来使用，由Column定义其数据结构，支持多种类型数据。</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginRight: "5px" }}
                        title="基本用法" toolbar={true}>
                        <DataGridView dataSource={[
                            {
                                name: "李雷",
                                age: 21,
                                address: "华盛顿"
                            },
                            {
                                name: "韩梅梅",
                                age: 21,
                                address: "香港"
                            },
                            {
                                name: "章三",
                                age: 21,
                                address: "印度"
                            },
                            {
                                name: "王五",
                                age: 21,
                                address: "华盛顿"
                            },
                            {
                                name: "韩梅梅",
                                age: 21,
                                address: "香港"
                            },
                            {
                                name: "韩磊",
                                age: 21,
                                address: "印度"
                            },
                            {
                                name: "王五",
                                age: 21,
                                address: "华盛顿"
                            },
                            {
                                name: "韩梅梅",
                                age: 21,
                                address: "香港"
                            },
                            {
                                name: "韩磊",
                                age: 21,
                                address: "印度"
                            }
                        ]}>
                            <Column title="姓名">{row => row.name}</Column>
                            <Column title="年龄">{row => row.age}</Column>
                            <Column title="地址">{row => row.address}</Column>
                            <Column title="操作">{row => <div>
                                <Button className="hp-button-small hp-button-primary" onClick={() => { console.log(row) }}>查看</Button>
                                <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                    () => {
                                        const notice = new Notice
                                        notice.info({
                                            title: "删除提示",
                                            content: "删除成功",
                                            autoClose: true
                                        })
                                    }
                                }>删除</Button>
                            </div>}</Column>
                        </DataGridView>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }}
                        title="分页" toolbar={true}>
                        <DataGridView
                            dataSource={[
                                {
                                    name: "李雷",
                                    age: 21,
                                    address: "华盛顿"
                                },
                                {
                                    name: "韩梅梅",
                                    age: 21,
                                    address: "香港"
                                },
                                {
                                    name: "章三",
                                    age: 21,
                                    address: "印度"
                                },
                                {
                                    name: "王五",
                                    age: 21,
                                    address: "华盛顿"
                                },
                                {
                                    name: "韩梅梅",
                                    age: 21,
                                    address: "香港"
                                },
                                {
                                    name: "韩磊",
                                    age: 21,
                                    address: "印度"
                                },
                                {
                                    name: "王五",
                                    age: 21,
                                    address: "华盛顿"
                                },
                                {
                                    name: "韩梅梅",
                                    age: 21,
                                    address: "香港"
                                },
                                {
                                    name: "韩磊",
                                    age: 21,
                                    address: "印度"
                                }
                            ]}
                            showPagination
                            paginationOptions={
                                {
                                    page: 1,
                                    pageSize: 10,
                                    total: 9
                                }
                            }
                        >
                            <Column title="姓名">{row => row.name}</Column>
                            <Column title="年龄">{row => row.age}</Column>
                            <Column title="地址">{row => row.address}</Column>
                            <Column title="操作">{row => <div>
                                <Button className="hp-button-small hp-button-primary icon iconfont icon-brush" onClick={() => { console.log(row) }}></Button>
                                <Button className="ml-10 hp-button-danger hp-button-small icon iconfont icon-trash" onClick={
                                    () => {
                                        const notice = new Notice
                                        notice.info({
                                            title: "删除提示",
                                            content: "删除成功",
                                            autoClose: true
                                        })
                                    }
                                }></Button>
                            </div>}</Column>
                        </DataGridView>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginRight: "5px" }}
                        title="单选／多选" toolbar={true}>
                        <DataGridView multiply dataSource={[
                            {
                                name: "李雷",
                                age: 21,
                                address: "华盛顿"
                            },
                            {
                                name: "韩梅梅",
                                age: 21,
                                address: "香港"
                            },
                            {
                                name: "章三",
                                age: 21,
                                address: "印度"
                            }
                        ]}>
                            <Column indicator></Column>
                            <Column title="姓名">{row => row.name}</Column>
                            <Column title="年龄">{row => row.age}</Column>
                            <Column title="地址">{row => row.address}</Column>
                            <Column title="操作">{row => <div>
                                <Button className="hp-button-small hp-button-primary" onClick={() => { console.log(row) }}>查看</Button>
                                <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                    () => {
                                        const notice = new Notice
                                        notice.info({
                                            title: "删除提示",
                                            content: "删除成功",
                                            autoClose: true
                                        })
                                    }
                                }>删除</Button>
                            </div>}</Column>
                        </DataGridView>
                    </Panel>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginRight: "5px" }}
                        title="单选／多选" toolbar={true}>
                        <DataGridView dataSource={[
                            {
                                name: "李雷",
                                age: 21,
                                address: "华盛顿"
                            },
                            {
                                name: "韩梅梅",
                                age: 21,
                                address: "香港"
                            },
                            {
                                name: "章三",
                                age: 21,
                                address: "印度"
                            }
                        ]}>
                            <Column indicator></Column>
                            <Column title="姓名">{row => row.name}</Column>
                            <Column title="年龄">{row => row.age}</Column>
                            <Column title="地址">{row => row.address}</Column>
                            <Column title="操作">{row => <div>
                                <Button className="hp-button-small hp-button-primary" onClick={() => { console.log(row) }}>查看</Button>
                                <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                    () => {
                                        const notice = new Notice
                                        notice.info({
                                            title: "删除提示",
                                            content: "删除成功",
                                            autoClose: true
                                        })
                                    }
                                }>删除</Button>
                            </div>}</Column>
                        </DataGridView>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import { DataGridView, Column, Button, Notice } from "common"
import "./expertList.scss"

export default class ExpertList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        return <div className="hp-expertlist">
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
                <Column title="Name">{row => row.name}</Column>
                <Column title="Mobile">{row => row.mobile}</Column>
                <Column title="Email">{row => row.email}</Column>
                <Column title="Wechat">{row => row.weixin}</Column>
                <Column title="操作">{row => <div>
                    <Button className="hp-button-small hp-button-primary icon iconfont icon-browse" onClick={() => { console.log(row) }}></Button>
                    <Button className="ml-10 hp-button-primary hp-button-small icon iconfont icon-editor" onClick={
                        () => {
                            const notice = new Notice
                            notice.info({
                                title: "删除提示",
                                content: "删除成功",
                                autoClose: true
                            })
                        }
                    }></Button>
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
        </div>
    }
}
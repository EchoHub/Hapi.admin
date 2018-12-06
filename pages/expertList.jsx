
import React, { Component } from "react";
import { DataGridView, Column, Button, Notice, getCookie } from "common"
import { PropTypes } from 'prop-types';
import { expertList } from "api/api";
import "./expertList.scss"

export default class ExpertList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    loadInfo() {
        // {
        //     "page": 0,
        //     "query_words": "string",
        //     "size": 0,
        //     "sort_direction": "ASC",
        //     "sort_field": "createdTime"
        //   }
        const access_token = getCookie("access_token");
        const param = {
            page: 1,
            size: 10
        }
        expertList(param, {
            contentType: "application/json",
            type: "POST"
        }, (data, res) => {
            console.log(data)
        }, error => {

        }, {
            headers : {
                access_token: access_token
            }
        })
    }
    componentDidMount() {
        this.loadInfo()
    }
    render() {
        return <div className="hp-expertlist">
            <Button
                className="hp-button-primary mb-10"
                onClick={() => { location.href = "#/expertPage" }}>
                新增
            </Button>

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
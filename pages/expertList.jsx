
import React, { Component } from "react";
import {
    getCookie, DataGridView, Column, Button, Notice, Dialog, Form, FormLayout, FormField,
    TextBox, TextArea
} from "common"
import { PropTypes } from 'prop-types';
import { expertList, expertDelete, expertCreate } from "api/api";
import "./expertList.scss"

export default class ExpertList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
        this.loadInfo = this.loadInfo.bind(this)
        this.createHandle = this.createHandle.bind(this)
        this.editHandle = this.editHandle.bind(this)
        this.deleteHandle = this.deleteHandle.bind(this)
    }
    loadInfo(options, callback) {
        const access_token = getCookie("access_token");
        expertList(options, {
            withCredentials: true,
            contentType: "application/json",
            type: "POST"
        }, (data, res) => {
            if (data.success) {
                const info = data.data;
                callback && callback(info.items, info.total_count)
            }
        }, error => {
            const notice = new Notice;
            notice.warning({
                title: "错误提示",
                content: "接口请求失败，请稍后",
                autoClose: true
            });
        }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                access_token: access_token
            }
        })
    }
    componentDidMount() {
        // this.loadInfo()
    }
    render() {
        return <div className="hp-expertlist">
            <Button
                className="hp-button-primary mb-10"
                onClick={this.createHandle}>
                新增
            </Button>

            <DataGridView 
                showPagination
                load={this.loadInfo}
            >
                <Column title="First Name (en)">{row => row.first_name_en}</Column>
                <Column title="Last Name (en)">{row => row.last_name_en}</Column>
                <Column title="Nick Name">{row => row.nick_name}</Column>
                <Column title="Source">{row => row.source}</Column>
                <Column title="Expertise (en)">{row => row.expertise_en}</Column>
                <Column title="Created Time">{row => row.created_time}</Column>
                <Column title="Last Modifed Time">{row => row.last_modifed_time}</Column>
                <Column title="操作">{row => <div>
                    <Button
                        className="hp-button-small hp-button-primary icon iconfont icon-browse"
                        onClick={() => { this.detailHandle(row) }}>
                    </Button>
                    <Button
                        className="ml-10 hp-button-primary hp-button-small icon iconfont icon-editor"
                        onClick={() => this.editHandle(row)}>
                    </Button>
                    <Button className="ml-10 hp-button-danger hp-button-small icon iconfont icon-trash"
                        onClick={() => this.deleteHandle(row)}>
                    </Button>
                </div>}</Column>
            </DataGridView>
        </div>
    }

    /**
     * 创建
     */
    createHandle() {
        let form
        Dialog.show(<div className="p-1rem">
            <Form ref={input => form = input}>
                <FormLayout>
                    <FormField label="FirstName：" required>
                        <TextBox name="first_name_en" required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="LastName：" required>
                        <TextBox name="last_name_en" required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="NickName：" required>
                        <TextBox name="nick_name" required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="Source：" required>
                        <TextBox name="source" required></TextBox>
                    </FormField>
                    <br />
                    <FormField colSpan={3} label="Background：" required>
                        <TextArea name="background_en" required></TextArea>
                    </FormField>
                    <br />
                    <FormField colSpan={3} label="Expertise_en：" required>
                        <TextArea name="expertise_en" required></TextArea>
                    </FormField>
                </FormLayout>
            </Form>
        </div>, "新增专家", { 新建: true, 取消: false }, () => {
            if (form.reportValidity().valid) {
                const value = form.value;
                const access_token = getCookie("access_token");
                expertCreate(value, {
                    responseType: "json",
                    withCredentials: true,
                    contentType: "application/json",
                    type: "POST"
                }, (data, res) => {
                    if (data.success) {
                        const notice = new Notice;
                        notice.info({
                            title: "操作提示",
                            content: "操作成功"
                        })
                        this.loadInfo()
                    }
                }, error => {
                    const notice = new Notice;
                    notice.info({
                        title: "错误提示",
                        content: "接口请求失败，请稍后"
                    })
                }, {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            access_token: access_token
                        }
                    })
            }
        })
    }

    /**
     * 查看
     */
    detailHandle(row) {
        location.href = `#/expertPage?id=${row.id}&detail=true`
    }

    /**
     * 编辑信息 
     * @param {*} row 
     */
    editHandle(row) {
        location.href = `#/expertPage?id=${row.id}`
    }

    /**
     * 删除专家
     */
    deleteHandle(row) {
        Dialog.comfirm("确认删除该条专家信息吗？", "删除提示", () => {
            const access_token = getCookie("access_token");
            expertDelete({ expert_id: row.id, }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                const notice = new Notice
                notice.info({
                    title: "删除提示",
                    content: "删除成功",
                    autoClose: true
                })
                this.loadInfo()
            }, error => {
                const notice = new Notice;
                notice.warning({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    access_token: access_token
                }
            })
        })
    }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Panel, GridLayout, Layout, Button, Notice, Dialog, Form, FormLayout, FormField, 
    TextBox, RadioBoxGroup, RadioBox, TextArea
} from "common";
import "./modalPage.scss"

export default class NoticePage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="hp-modalpage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="模态框" toolbar={true}>
                        <p className="introduction">模态对话框，用户需要临时处理事物，不希望打开新窗口、终端流程的情况下，使用模态框可以在当前页面进行相关操作。</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={4}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginRight: "5px" }} title="基本用法" toolbar={true}>
                        <p><strong>常用对话框包括顶部标题、内容、操作按钮三部分，在对话框的基础上可以衍生出各类性质的对话窗口。</strong></p>
                        <Button theme="primary" onClick={() => {
                            Dialog.show(<div className="m-20">
                                This is the content of the Modal.
                                <br />
                                This is the content of the Modal.
                                <br />
                                This is the content of the Modal.
                                <br />
                                This is the content of the Modal.
                            </div>,
                                "Modal Title", { 取消: false, 确认: true })
                        }}>基本对话框</Button>
                    </Panel>
                </Layout>
                <Layout col={4}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginRight: "5px" }} title="确认框" toolbar={true}>
                        <p><strong>确认框一般用于对当前操作行为进行确认操作提示，点击确定则确认操作，取消则终止操作。</strong></p>
                        <Button className="mt-10" onClick={() => {
                            Dialog.confirm("This is A Confirm Modal.",
                                "Modal Title", () => {
                                    Notice.success({
                                        title: "提示",
                                        content: "操作成功"
                                    })
                                })
                        }}>确认框</Button>
                    </Panel>
                </Layout>
                <Layout col={4}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="消息提示框" toolbar={true}>
                        <p><strong>提示类对话框包括消息、成功、警告、错误四类提示，功能和消息提示类似，但目的性更强。</strong></p>
                        <div className="mt-10">
                            <Button theme="dashed" onClick={() => {
                                Dialog.info("This is A Info Alert.",
                                    "Modal Title")
                            }}>消息提示</Button>
                            <Button className="ml-10" theme="dashed" onClick={() => {
                                Dialog.success("This is A Success Alert.",
                                    "Modal Title")
                            }}>成功提示</Button>
                            <br />
                            <Button className="mt-10" theme="dashed" onClick={() => {
                                Dialog.warning("This is A Warning Alert.",
                                    "Modal Title")
                            }}>警告提示 warning</Button>
                            <Button className="mt-10 ml-10" theme="dashed" onClick={() => {
                                Dialog.error("This is A Error Alert.",
                                    "Modal Title")
                            }}>错误提示</Button>
                        </div>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginRight: "5px" }} title="带表单对话框" toolbar={true}>
                        <p><strong>对话框包含表单，常用于当前页面中新建、修改信息，不中断当前页面操作的情况下。</strong></p>
                        <Button theme="primary" onClick={() => {
                            Dialog.show(<div className="m-20">
                                <Form>
                                    <FormLayout>
                                        <FormField label="Nick Name:" required>
                                            <TextBox></TextBox>
                                        </FormField>
                                    </FormLayout>
                                    <br/>
                                    <FormLayout required>
                                        <FormField label="Tel:">
                                            <TextBox></TextBox>
                                        </FormField>
                                    </FormLayout>
                                    <br/>
                                    <FormLayout required>
                                        <FormField label="Sex:">
                                            <RadioBoxGroup>
                                                <RadioBox checked>Male</RadioBox>
                                                <RadioBox>Female</RadioBox>
                                            </RadioBoxGroup>
                                        </FormField>
                                    </FormLayout>
                                    <br/>
                                    <FormLayout>
                                        <FormField label="Introduce:">
                                            <TextArea></TextArea>
                                        </FormField>
                                    </FormLayout>
                                </Form>
                            </div>,
                                "Modal Title", { Cancel: false, Submit: true })
                        }}>带表单的对话框</Button>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
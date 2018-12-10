import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Panel, GridLayout, Layout, Button, Notice
} from "common";
import "./noticePage.scss"

export default class NoticePage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="hp-noticepage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="通知" toolbar={true}>
                        <p className="introduction">全局展示通知提醒信息。（包括消息推送、操作通知、交互性的通知提示等）</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginRight: "5px" }} title="基本用法" toolbar={true}>
                        <Button theme="primary" onClick={() => {
                            Notice.info({
                                title: "Notification",
                                content: "This is the content of the notification. This is the content of the notification. This is the content of the notification."
                            }, true)
                        }}><strong>消息通知：</strong>常用消息类通知，如消息推送等</Button>
                        <br />
                        <Button className="mt-10" onClick={() => {
                            Notice.success({
                                title: "Notification",
                                content: "This is the content of the notification. This is the content of the notification. This is the content of the notification."
                            }, true)
                        }}><strong>成功类通知：</strong>常用交互成功类通知，如保存成功等</Button>
                        <br />
                        <Button className="mt-10" theme="dashed" onClick={() => {
                            Notice.warning({
                                title: "Notification",
                                content: "This is the content of the notification. This is the content of the notification. This is the content of the notification."
                            }, true)
                        }}><strong>警告类通知：</strong>常用警告类通知，如未选中，无权限访问等</Button>
                        <br />
                        <Button className="mt-10" theme="danger" onClick={() => {
                            Notice.error({
                                title: "Notification",
                                content: "This is the content of the notification. This is the content of the notification. This is the content of the notification."
                            }, true)
                        }}><strong>错误类通知：</strong>常用错误类通知，如接口调用失败等</Button>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="常用设置" toolbar={true}>
                        <Button theme="primary" onClick={() => {
                            Notice.info({
                                title: "Notification",
                                content: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
                                autoClose: false
                            }, true)
                        }}><strong>自动关闭：</strong>autoClose：布尔类型，默认为true 自动关闭</Button>
                        <br />
                        <Button className="mt-10" onClick={() => {
                            Notice.info({
                                title: "Notification",
                                content: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
                                duration: 2000
                            }, true)
                        }}><strong>延时关闭：</strong>duration：数字类型，单位毫秒，默认4500ms</Button>
                        <br />
                        <Button className="mt-10" theme="dashed" onClick={() => {
                            const notice = new Notice
                            notice.info({
                                key: "updatable",
                                title: "Notification",
                                content: "This is the content of the notification. This is the content of the notification. This is the content of the notification."
                            })
                            setTimeout(() => {
                                notice.info({
                                    key: "updatable",
                                    title: "Notification",
                                    content: "Update Content: hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha..."
                                })
                            }, 2000)
                        }}><strong>更新推送内容：</strong>key：字符串类型，通过唯一的 key 来更新对应通知框内容</Button>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
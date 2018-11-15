import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, GridLayout, Layout, FormLayout, FormField, TextBox } from "common";
import "./formPage.scss"

export default class FormPage extends Component {
    render() {
        return <div className="hp-formpage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="表单" toolbar={true}>
                        <p className="introduction">具有数据收集、校验和提交功能的表单。表单布局为table布局，<b>&lt;FormLayout&gt;</b>代表table容器，<b>&lt;FormField&gt;代表table元素，其中包含元素可以为<code style={{color: "#c7254e"}}>date, textbox, select, textarea, radiobutton</code>等元素</b></p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{width:"calc(100% - 5px)"}} title="基本用法" toolbar={true}>
                        <Form>
                            <FormLayout style={{ width: "100%" }}>
                                <FormField label="角色类型：">
                                    <TextBox name="character"></TextBox>
                                </FormField>
                                <br />
                                <FormField label="角色名：">
                                    <TextBox name="name"></TextBox>
                                </FormField>
                                <br />
                                <FormField label="手机号码：">
                                    <TextBox name="phone_number"></TextBox>
                                </FormField>
                            </FormLayout>
                        </Form>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{width:"calc(100% - 5px)", marginLeft: "5px"}} title="赋值" toolbar={true}>
                        <Form>
                            <FormLayout style={{ width: "100%" }}>
                                <FormField label="角色类型：">
                                    <TextBox name="character" value=""></TextBox>
                                </FormField>
                                <br />
                                <FormField label="角色名：">
                                    <TextBox name="name" value="哒哒"></TextBox>
                                </FormField>
                                <br />
                                <FormField label="手机号码：">
                                    <TextBox name="phone_number" value="18888888888"></TextBox>
                                </FormField>
                            </FormLayout>
                        </Form>
                    </Panel>
                </Layout>
            </GridLayout>

        </div>
    }
}
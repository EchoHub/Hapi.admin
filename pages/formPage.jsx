import React, { Component } from 'react';
import { Panel, Form, GridLayout, Layout, FormLayout, FormField, TextBox, Button } from "common";
import "./formPage.scss"

export default class FormPage extends Component {
    constructor(props) {
        super(props)
        this.getSubmitValues = this.getSubmitValues.bind(this);
    }
    /**
     * @desc 获取提交数据
     */
    getSubmitValues(e) {
        e.preventDefault();
        console.log(this.refs.form1.value);
    }
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
                        <Form ref="form1">
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
                                <br/>
                                <FormField>
                                    <Button className="mr-10" theme="primary" type="submit" onClick={e => this.getSubmitValues(e)}>提交</Button>
                                    <Button theme="default" type="reset">重置</Button>
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
                                    <TextBox name="character" defaultValue=""></TextBox>
                                </FormField>
                                <br />
                                <FormField label="角色名：">
                                    <TextBox name="name" defaultValue="哒哒"></TextBox>
                                </FormField>
                                <br />
                                <FormField label="手机号码：">
                                    <TextBox name="phone_number" defaultValue="18888888888"></TextBox>
                                </FormField>
                                <br/>
                                <FormField>
                                    <Button className="mr-10" theme="primary" type="submit">提交</Button>
                                    <Button theme="default" type="reset">重置</Button>
                                </FormField>
                            </FormLayout>
                        </Form>
                    </Panel>
                </Layout>
            </GridLayout>

        </div>
    }
}

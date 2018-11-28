import React, { Component } from 'react';
import { Panel, Form, GridLayout, Layout, FormLayout, FormField, TextBox, Button } from "common";
import "./formPage.scss"

export default class FormPage extends Component {
    constructor(props) {
        super(props)
        this.getSubmitValues = this.getSubmitValues.bind(this);
        this.formReportValidity = this.formReportValidity.bind(this);
    }
    /**
     * @desc 获取提交数据
     */
    getSubmitValues(e) {
        this.refs.form1.value = {
            character: "Clown",
            name: "Nick",
            phone_number: "18888888888"
        }
    }

    /**
     * @desc 表单校验
     */
    formReportValidity() {
        const form = this.refs.form3;
        console.log(form.reportValidity())
    }
    render() {
        return <div className="hp-formpage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="表单" toolbar={true}>
                        <p className="introduction">具有数据收集、校验和提交功能的表单。表单布局为table布局，<b>&lt;FormLayout&gt;</b>代表table容器，<b>&lt;FormField&gt;代表table元素，其中包含元素可以为<code style={{ color: "#c7254e" }}>date, textbox, select, textarea, radiobutton</code>等元素</b></p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)" }} title="基本用法" toolbar={true}>
                        <Form ref="form1">
                            <FormLayout>
                                <FormField label="Character：" required>
                                    <TextBox
                                        name="character"
                                        style={{ minWidth: "300px" }}
                                        required
                                        placeholder="Character"
                                    ></TextBox>
                                </FormField>
                                <br />
                                <FormField label="Name：">
                                    <TextBox
                                        name="name"
                                        placeholder="Name"
                                    ></TextBox>
                                </FormField>
                                <br />
                                <FormField label="Phone：">
                                    <TextBox
                                        name="phone_number"
                                        placeholder="Phone"
                                    ></TextBox>
                                </FormField>
                                <br />
                                <FormField>
                                    <Button className="mr-10" theme="primary" type="submit" onClick={e => this.getSubmitValues(e)}>Submit</Button>
                                    <Button theme="default" type="reset">Reset</Button>
                                </FormField>
                            </FormLayout>
                        </Form>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="赋值" toolbar={true}>
                        <Form ref="form2">
                            <FormLayout>
                                <FormField label="Character：">
                                    <TextBox name="character" defaultValue="Clown" style={{ minWidth: "300px" }}></TextBox>
                                </FormField>
                                <br />
                                <FormField label="Name：">
                                    <TextBox name="name" defaultValue="Nick"></TextBox>
                                </FormField>
                                <br />
                                <FormField label="Phone：">
                                    <TextBox name="phone_number" defaultValue="18888888888"></TextBox>
                                </FormField>
                                <br />
                                <FormField>
                                    <Button className="mr-10" theme="primary" type="submit" onClick={e => e.preventDefault()}>Submit</Button>
                                    <Button theme="default" type="reset">Reset</Button>
                                </FormField>
                            </FormLayout>
                        </Form>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="表单校验" toolbar={true}>
                        <Form ref="form3">
                            <FormLayout>
                                <FormField label="Character：" required>
                                    <TextBox name="character" required style={{ minWidth: "300px" }}></TextBox>
                                </FormField>
                                <br />
                                <FormField label="Name：" required>
                                    <TextBox name="name" required></TextBox>
                                </FormField>
                                <br />
                                <FormField label="Phone：" required>
                                    <TextBox name="phone_number" 
                                        required
                                        pattern={/^1\d{10}$/}
                                        patternMessage={"Please input the correct phone number"}
                                    ></TextBox>
                                </FormField>
                                <br />
                                <FormField>
                                    <Button className="mr-10" theme="primary" type="submit" onClick={e => this.formReportValidity(e)}>Submit</Button>
                                    <Button theme="default" type="reset">Reset</Button>
                                </FormField>
                            </FormLayout>
                        </Form>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="常见表单元素" toolbar={true}>
                        <Form ref="form4">
                            <FormLayout>
                                <FormField label="Character：">
                                    <TextBox name="character" style={{ minWidth: "300px" }}></TextBox>
                                </FormField>
                                <br />
                                <FormField label="Name：">
                                    <TextBox name="name"></TextBox>
                                </FormField>
                                <br />
                                <FormField label="Phone：">
                                    <TextBox name="phone_number"></TextBox>
                                </FormField>
                                <br />
                                <FormField>
                                    <Button className="mr-10" theme="primary" type="submit" onClick={e => this.getSubmitValues(e)}>Submit</Button>
                                    <Button theme="default" type="reset">Reset</Button>
                                </FormField>
                            </FormLayout>
                        </Form>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}

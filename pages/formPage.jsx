import React, { Component } from 'react';
import {
    Panel, Form, GridLayout, Layout, FormLayout, FormField, Button, Notice,
    TextBox, CheckBox, CheckBoxGroup, RadioBox, RadioBoxGroup, Switch, Rate,
    TextArea, Select, ListItem, Slider
} from "common";
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
        if (!form.reportValidity().valid) {
            Notice.warning({
                title: "校验提示",
                content: "校验错误，请修改",
                autoClose: true
            })
        }
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
                                <FormField label="Sex：" required>
                                    <Select name="sex" value={3} required>
                                        <ListItem value={1}>Male</ListItem>
                                        <ListItem value={0}>Female</ListItem>
                                    </Select>
                                </FormField>
                                <br />
                                <FormField label="Introduce：" required>
                                    <TextArea name="remark"
                                        required
                                        minLength={10}
                                        patternMessage={"Please input 10 len at least"}
                                    ></TextArea>
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
            <GridLayout className="display-flex">
                <Layout col={4}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="开关" toolbar={true}>
                        <h5 >
                            <strong>单选框</strong>：多个备选项中选取一个备选项，常和 RadioBoxGroup 一起使用。）
                        </h5>
                        <RadioBoxGroup className="mt-10" ref="radiobox_1" name="radiobox">
                            <RadioBox value={1} checked>RB 1</RadioBox>
                            <RadioBox className="ml-10" disabled value={2}>RB 2</RadioBox>
                            <RadioBox className="ml-10" value={3}>RB 3</RadioBox>
                        </RadioBoxGroup>
                        <h5 >
                            <strong>多选框</strong>：多个备选项中选取任意个备选项，常和 CheckBoxGroup 一起使用。
                        </h5>
                        <CheckBoxGroup ref="checkbox_1" name="checkbox">
                            <CheckBox value={1} checked>CB 1</CheckBox>
                            <CheckBox className="ml-10" value={2} checked disabled>CB 2</CheckBox>
                            <CheckBox className="ml-10" value={3}>CB 3</CheckBox>
                        </CheckBoxGroup>
                        <h5 ><strong>开关</strong>：开关选择器，表示开关状态／两种状态之间的切换。</h5>
                        <div className="mt-10">
                            <Switch></Switch>
                            <Switch className="ml-10" name="swtich2" disabled></Switch>
                            <Switch className="ml-10" content={{ true: 1, false: 0 }}></Switch>
                        </div>
                        <div className="mt-10">
                            <Switch checked size="small"></Switch>
                            <Switch className="ml-10"></Switch>
                            <Switch className="ml-10" content={{ true: "开", false: "关" }} checked size="large"></Switch>
                        </div>
                        <div className="mt-10">
                            <h5 ><strong>评分</strong>：评分器。</h5>
                            <Rate></Rate>
                            <br />
                            <Rate
                                colors={["#dddddd", "#ffcc00", "#ff9900"]}
                            ></Rate>
                            <br />
                            <Rate
                                colors={["#bbbbbb", "#ffcc00", "#ff9900"]}
                                icons={["icon-collection", "icon-collection_fill"]}
                            ></Rate>
                            <br />
                            <Rate
                                colors={["#bbbbbb", "#ffcc00", "#ff9900"]}
                                showText
                                texts={["极差", "失望", "一般", "满意", "惊喜"]}
                            ></Rate>
                            <br />
                            <Rate
                                readOnly
                                value={3.7}
                            ></Rate>
                        </div>
                    </Panel>
                </Layout>
                <Layout col={4}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="输入框" toolbar={true}>
                        <h5><strong>文本输入框</strong>：常用的表单输入框包括文本框、数字框等</h5>
                        <TextBox name="furit" checked></TextBox>
                        <h5><strong>下拉选择框</strong>：常见下拉选择框包括单选框、多选框、带模糊查询的选择框等</h5>
                        <Select className="mt-10" value={2}>
                            <ListItem value={1}>Option One</ListItem>
                            <ListItem value={2}>Option Two</ListItem>
                            <ListItem value={3}>Option Three</ListItem>
                        </Select>
                        <h5><strong>文本域：常用作内容较多的文本输入框</strong></h5>
                        <TextArea className="mt-10"></TextArea>
                    </Panel>
                </Layout>
                <Layout col={4}>
                    <Panel className="mt-10" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} title="其他" toolbar={true}>
                        <h5><strong>滑动输入条</strong>：滑动型选择框。</h5>
                        小：<Slider value={50} size="small"></Slider>
                        中：<Slider value={80}></Slider>
                        大：<Slider value={30} size="large"></Slider>
                        默认值：<Slider value={60}></Slider>
                        {/* 步长：<Slider step={5}></Slider> */}
                        范围：<Slider showTip value={50} range={[0, 200]}></Slider>
                        禁用：<Slider showTip value={75} range={[0, 100]} disabled></Slider>
                        显示数值：<Slider showTip value={60} range={[0, 100]}></Slider>
                        范围滑块：<Slider value={[30, 70]} rangeSlider></Slider>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}

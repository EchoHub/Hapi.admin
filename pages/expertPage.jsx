import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import {
    paramFormat, getCookie, getQuery, Panel, Form, FormLayout, FormField, TextBox, TextArea, DataGridView, Column, Button,
    Notice, Dialog
} from "common"
import {
    expertCreateEduExp, expertCreateGeneralComments,
    expertCreateNotes, expertCreateWorkExp,
    expertDeleteEduExp, expertDeleteGeneralComments, expertDeleteNotes,
    expertDeleteWorkExp,
    expertUpdateContactInfo, expertUpdateEduExp, expertUpdateFinanceInfo,
    expertUpdateGeneralComments, expertUpdateIdentityInfo, expertUpdateMeta,
    expertUpdateNotes, expertUpdateResume, expertUpdateWorkExp,
    expertGetMeta, expertGetContactInfo, expertGetEducationExp, expertGetFinanceInfo,
    expertGetGeneralComments, expertGetIdentityInfo, expertGetNotes,
    expertGetResume, expertGetWorkExp
} from "api/api";
import "./expertPage.scss"
import { rejects } from 'assert';

export default class ExpertPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.renderText = this.renderText.bind(this)

        this.loadAllInfo = this.loadAllInfo.bind(this)

        this.saveMetaInfoHandle = this.saveMetaInfoHandle.bind(this)
        this.loadMetaInfo = this.loadMetaInfo.bind(this)

        this.saveFinanceInfoHandle = this.saveFinanceInfoHandle.bind(this)
        this.loadFinanceInfo = this.loadFinanceInfo.bind(this)

        this.saveContactInfoHandle = this.saveContactInfoHandle.bind(this)
        this.loadContactInfoHandle = this.loadContactInfoHandle.bind(this)

        this.saveIdentifyInfoHandle = this.saveIdentifyInfoHandle.bind(this)
        this.loadIdentityInfo = this.loadIdentityInfo.bind(this)

        this.addWorkExpHandle = this.addWorkExpHandle.bind(this)
        this.editWorkExpHandle = this.editWorkExpHandle.bind(this)
        this.workExpHandle = this.workExpHandle.bind(this)
        this.loadWorkExpHandle = this.loadWorkExpHandle.bind(this)

        this.addEduExpHandle = this.addEduExpHandle.bind(this)
        this.editEduExpHandle = this.editEduExpHandle.bind(this)
        this.eduExpHandle = this.eduExpHandle.bind(this)
        this.loadEduExpHandle = this.loadEduExpHandle.bind(this)

        this.addCommentsHandle = this.addCommentsHandle.bind(this)
        this.eidtCommentsHandle = this.eidtCommentsHandle.bind(this)
        this.commentsHandle = this.commentsHandle.bind(this)
        this.deleteCommentsHandle = this.deleteCommentsHandle.bind(this)
        this.loadCommentHandle = this.loadCommentHandle.bind(this)

        this.addNotesHandle = this.addNotesHandle.bind(this)
        this.editNotesHandle = this.editNotesHandle.bind(this)
        this.notesHandle = this.notesHandle.bind(this)
        this.deleteNotesHandle = this.deleteNotesHandle.bind(this)
        this.loadNotesHandle = this.loadNotesHandle.bind(this)

        this.saveResumeInfoHandle = this.saveResumeInfoHandle.bind(this)
        this.loadResumeInfo = this.loadResumeInfo.bind(this)
    }
    componentWillMount() {
        // 设置 ajax头信息
        const access_token = getCookie("access_token");
        this._headers = {
            headers: {
                Cookie: access_token,
                Authorization: `Bearer ${access_token}`,
                access_token: access_token
            }
        }
    }
    componentDidMount() {
        const id = getQuery("id")
        const detail = getQuery("detail")
        this.setState({
            id: id,
            detail: detail || false
        })

        this.loadAllInfo(id);
    }
    render() {
        const { detail } = this.state
        return <div className="hp-expertpage">
            <Panel className="mv-10 data-panel" title="Meta Info" toolbar={true}>
                <Form ref="metaInfo">
                    <FormLayout>
                        <FormField label="FirstName(CN)：" required>
                            {
                                !detail ?
                                    <TextBox name="first_name_cn" required ></TextBox> :
                                    this.renderText(this.state.metaInfoValue || {}, "first_name_cn")
                            }
                        </FormField>
                        <FormField label="FirstName(EN)：" required>
                            {
                                !detail ?
                                    <TextBox name="first_name_en" required ></TextBox> :
                                    this.renderText(this.state.metaInfoValue || {}, "first_name_en")
                            }
                        </FormField>
                        <br />
                        <FormField label="LastName(CN)：" required>
                            {
                                !detail ?
                                    <TextBox name="last_name_cn" required ></TextBox> :
                                    this.renderText(this.state.metaInfoValue || {}, "last_name_cn")
                            }
                        </FormField>
                        <FormField label="LastName(EN)：" required>
                            {
                                !detail ?
                                    <TextBox name="last_name_en" required ></TextBox> :
                                    this.renderText(this.state.metaInfoValue || {}, "last_name_en")
                            }
                        </FormField>
                        <br />
                        <FormField label="NickName：" required>
                            {
                                !detail ?
                                    <TextBox name="nick_name" required ></TextBox> :
                                    this.renderText(this.state.metaInfoValue || {}, "nick_name")
                            }
                        </FormField>
                        <FormField label="Source：" required>
                            {
                                !detail ?
                                    <TextBox name="source" required ></TextBox> :
                                    this.renderText(this.state.metaInfoValue || {}, "source")
                            }
                        </FormField>
                        <br />
                        <FormField colSpan={3} label="Background(CN)：" required>
                            {
                                !detail ?
                                    <TextArea name="background_cn" required ></TextArea> :
                                    this.renderText(this.state.metaInfoValue || {}, "background_cn")
                            }
                        </FormField>
                        <br />
                        <FormField colSpan={3} label="Background(EN)：" required>
                            {
                                !detail ?
                                    <TextArea name="background_en" required ></TextArea> :
                                    this.renderText(this.state.metaInfoValue || {}, "background_en")
                            }
                        </FormField>
                        <br />
                        <FormField colSpan={3} label="Expertise(CN)：" required>
                            {
                                !detail ?
                                    <TextArea name="expertise_cn" required ></TextArea> :
                                    this.renderText(this.state.metaInfoValue || {}, "expertise_cn")
                            }
                        </FormField>
                        <br />
                        <FormField colSpan={3} label="Expertise(EN)：" required>
                            {
                                !detail ?
                                    <TextArea name="expertise_en" required ></TextArea> :
                                    this.renderText(this.state.metaInfoValue || {}, "expertise_en")
                            }
                        </FormField>
                        <br />
                        {
                            !detail ? <FormField>
                                <Button
                                    className="hp-button-primary"
                                    onClick={this.saveMetaInfoHandle}
                                >提交</Button>
                            </FormField> : null
                        }
                    </FormLayout>
                </Form>
            </Panel>
            <Panel className="mv-10 data-panel" title="Finance Information" toolbar={true}>
                <Form ref="financeInfo">
                    <FormLayout>
                        <FormField label="Bank：" required>
                            {
                                !detail ?
                                    <TextBox name="bank" required ></TextBox> :
                                    this.renderText(this.state.financeInfoValue || {}, "bank")
                            }
                        </FormField>
                        <FormField label="Account No：" required>
                            {
                                !detail ?
                                    <TextBox name="account_no" required ></TextBox> :
                                    this.renderText(this.state.financeInfoValue || {}, "account_no")
                            }
                        </FormField>
                        <FormField label="Unit Price：" required>
                            {
                                !detail ?
                                    <TextBox name="unit_price" required ></TextBox> :
                                    this.renderText(this.state.financeInfoValue || {}, "unit_price")
                            }
                        </FormField>
                        <br />
                        {
                            !detail ? <FormField>
                                <Button
                                    className="hp-button-primary"
                                    onClick={this.saveFinanceInfoHandle}
                                >提交</Button>
                            </FormField> : null
                        }
                    </FormLayout>
                </Form>
            </Panel>
            <Panel className="mv-10 data-panel" title="Contact Information" toolbar={true}>
                <Form ref="contactInfo">
                    <FormLayout>
                        <FormField label="Primary Mobile：" required>
                            {
                                !detail ?
                                    <TextBox name="primary_mobile" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "primary_mobile")
                            }
                        </FormField>
                        <FormField label="Primary Email：" required>
                            {
                                !detail ?
                                    <TextBox name="primary_email" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "primary_email")
                            }
                        </FormField>
                        <FormField label="Tel：" required>
                            {
                                !detail ?
                                    <TextBox name="tel" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "tel")
                            }
                        </FormField>
                        <br />
                        <FormField label="Address：" required>
                            {
                                !detail ?
                                    <TextBox name="address" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "address")
                            }
                        </FormField>
                        <FormField label="Weixin：" required>
                            {
                                !detail ?
                                    <TextBox name="weixin" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "weixin")
                            }
                        </FormField>
                        <FormField label="Linkedin：" required>
                            {
                                !detail ?
                                    <TextBox name="linkedin" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "linkedin")
                            }
                        </FormField>
                        <br />
                        <FormField label="Facebook：" required>
                            {
                                !detail ?
                                    <TextBox name="facebook" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "facebook")
                            }
                        </FormField>
                        <FormField label="Twitter：" required>
                            {
                                !detail ?
                                    <TextBox name="twitter" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "twitter")
                            }
                        </FormField>
                        <FormField label="Weibo：" required>
                            {
                                !detail ?
                                    <TextBox name="weibo" required ></TextBox> :
                                    this.renderText(this.state.contactInfoValue || {}, "weibo")
                            }
                        </FormField>
                        <br />
                        {
                            !detail ? <FormField>
                                <Button
                                    className="hp-button-primary"
                                    onClick={this.saveContactInfoHandle}
                                >提交</Button>
                            </FormField> : null
                        }
                    </FormLayout>
                </Form>
            </Panel>
            <Panel className="mv-10 data-panel" title="Identify Information" toolbar={true}>
                <Form ref="identifyInfo">
                    <FormLayout>
                        <FormField label="Name(CN)：" required>
                            {
                                !detail ?
                                    <TextBox name="name_cn" required ></TextBox> :
                                    this.renderText(this.state.identifyInfoValue || {}, "name_cn")
                            }
                        </FormField>
                        <FormField label="Name(EN)：" required>
                            {
                                !detail ?
                                    <TextBox name="name_en" required ></TextBox> :
                                    this.renderText(this.state.identifyInfoValue || {}, "name_en")
                            }
                        </FormField>
                        <FormField label="ID Type：" required>
                            {
                                !detail ?
                                    <TextBox name="id_type" required ></TextBox> :
                                    this.renderText(this.state.identifyInfoValue || {}, "id_type")
                            }
                        </FormField>
                        <br />
                        <FormField label="Id Number：" required>
                            {
                                !detail ?
                                    <TextBox name="id_number" required ></TextBox> :
                                    this.renderText(this.state.identifyInfoValue || {}, "id_number")
                            }
                        </FormField>
                        <FormField label="Country：" required>
                            {
                                !detail ?
                                    <TextBox name="country" required ></TextBox> :
                                    this.renderText(this.state.identifyInfoValue || {}, "country")
                            }
                        </FormField>
                        <br />
                        {
                            !detail ? <FormField>
                                <Button
                                    className="hp-button-primary"
                                    onClick={this.saveIdentifyInfoHandle}
                                >提交</Button>
                            </FormField> : null
                        }
                    </FormLayout>
                </Form>
            </Panel>
            <Panel className="mv-10 data-panel" title="Work Experiences" toolbar={true}>
                {
                    !detail ? <Button className="mv-10 hp-button-primary" onClick={this.addWorkExpHandle}>Add</Button> : null
                }
                <DataGridView
                    ref="work_table"
                    showPagination
                    load={this.loadWorkExpHandle}
                >
                    <Column title="Organization Name">{row => row.organization_name}</Column>
                    <Column title="Position">{row => row.position}</Column>
                    <Column title="Functions">{row => row.functions}</Column>
                    <Column title="Responsibility">{row => row.responsibility}</Column>
                    <Column title="Start Date">{row => row.start_date}</Column>
                    <Column title="End Date">{row => row.end_date}</Column>
                    {
                        !detail ? <Column title="Handle">{
                            row => <div>
                                <Button className="ml-10 hp-button-primary hp-button-small" onClick={() => { this.editWorkExpHandle(row) }}>Edit</Button>
                                <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                    () => {
                                        this.deleteWorkExpHandle(row)
                                    }
                                }>Delete</Button>
                            </div>
                        }</Column> : null
                    }
                </DataGridView>
            </Panel>
            <Panel className="mv-10 data-panel" title="Education Experiences" toolbar={true}>
                {!detail ? <Button className="mv-10 hp-button-primary" onClick={this.addEduExpHandle}>Add</Button> : null}
                <DataGridView
                    ref="edu_table"
                    showPagination
                    load={this.loadEduExpHandle}
                >
                    <Column title="Organization Name">{row => row.organization_name}</Column>
                    <Column title="College">{row => row.college}</Column>
                    <Column title="Major">{row => row.major}</Column>
                    <Column title="Start Date">{row => row.start_date}</Column>
                    <Column title="End Date">{row => row.end_date}</Column>
                    {
                        !detail ? <Column title="Handle">{
                            row => <div>
                                <Button className="ml-10 hp-button-primary hp-button-small" onClick={
                                    () => {
                                        this.editEduExpHandle(row)
                                    }
                                }>Edit</Button>
                                <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                    () => {
                                        this.deleteEduExpHandle(row)
                                    }
                                }>Delete</Button>
                            </div>
                        }</Column> : null
                    }
                </DataGridView>
            </Panel>
            <Panel className="mv-10 data-panel" title="Comments" toolbar={true}>
                {!detail ? <Button className="mv-10 hp-button-primary" onClick={this.addCommentsHandle}>Add</Button> : null}
                <DataGridView
                    ref="comments_table"
                    showPagination
                    load={this.loadCommentHandle}
                >
                    <Column title="Comments">{row => row.comments}</Column>
                    {/* <Column title="Creator">{row => row.mobile}</Column>
                    <Column title="Created Time">{row => row.weixin}</Column>
                    <Column title="Last Modified">{row => row.email}</Column>
                    <Column title="Last ModifiedTime">{row => row.email}</Column> */}
                    {
                        !detail ? <Column title="Handle">{
                            row => <div>
                                <Button className="ml-10 hp-button-primary hp-button-small" onClick={
                                    () => {
                                        this.eidtCommentsHandle(row)
                                    }
                                }>Edit</Button>
                                <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                    () => {
                                        this.deleteCommentsHandle(row)
                                    }
                                }>Delete</Button>
                            </div>
                        }</Column> : null
                    }
                </DataGridView>
            </Panel>
            <Panel className="mv-10 data-panel" title="Notes" toolbar={true}>
                {!detail ? <Button className="mv-10 hp-button-primary" onClick={this.addNotesHandle}>Add</Button> : null}
                <DataGridView
                    ref="notes_table"
                    showPagination
                    load={this.loadNotesHandle}
                >
                    <Column title="Notes">{row => row.notes}</Column>
                    {/* <Column title="Creator">{row => row.created_by}</Column>
                    <Column title="Created Time">{row => row.weixin}</Column>
                    <Column title="Last Modified">{row => row.email}</Column>
                    <Column title="Last ModifiedTime">{row => row.email}</Column> */}
                    {
                        !detail ? <Column title="Handle">{
                            row => <div>
                                <Button className="ml-10 hp-button-primary hp-button-small" onClick={
                                    () => {
                                        this.editNotesHandle(row)
                                    }
                                }>Edit</Button>
                                <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                    () => {
                                        this.deleteNotesHandle(row)
                                    }
                                }>Delete</Button>
                            </div>
                        }</Column> : null
                    }
                </DataGridView>
            </Panel>
            <Panel className="mv-10 data-panel" title="Resume" toolbar={true}>
                <Form ref="resumeInfo">
                    <FormLayout>
                        <FormField colSpan={3} label="Resume(CN)：" required>
                            {
                                !detail ?
                                    <TextArea style={{ minWidth: "400px" }} name="resume_cn" required ></TextArea> :
                                    this.renderText(this.state.resumeInfoValue || {}, "resume_cn")
                            }
                        </FormField>
                        <br />
                        <FormField colSpan={3} label="Resume(EN)：" required>
                            {
                                !detail ?
                                    <TextArea style={{ minWidth: "400px" }} name="resume_en" required ></TextArea> :
                                    this.renderText(this.state.resumeInfoValue || {}, "resume_en")
                            }
                        </FormField>
                        <br />
                        {
                            !detail ? <FormField>
                                <Button
                                    className="hp-button-primary"
                                    onClick={this.saveResumeInfoHandle}
                                >提交</Button>
                            </FormField> : null
                        }
                    </FormLayout>
                </Form>
            </Panel>
        </div>
    }

    renderText(data, name) {
        if ((data || {})[name] === undefined) return "-"
        else return data[name]
    }

    /**
     * 加载所有数据
     */
    loadAllInfo(id) {
        let p = new Promise((resolve, rejects) => {
            const param = { expert_id: id }
            this.loadMetaInfo(param, data => resolve(data))
        })
        p.then(data => {
            const info = data.data
            this.refs.metaInfo.value = info;
            this.setState({
                metaInfoValue: info
            })
        })
        let p1 = new Promise((resolve, rejects) => {
            const param = { expert_id: id }
            this.loadFinanceInfo(param, data => resolve(data))
        })
        p1.then(data => {
            const info = data.data
            this.refs.financeInfo.value = info;
            this.setState({
                financeInfoValue: info
            });
        })
        let p2 = new Promise((resolve, rejects) => {
            const param = { expert_id: id }
            this.loadContactInfoHandle(param, data => resolve(data))
        })
        p2.then(data => {
            const info = data.data
            this.refs.contactInfo.value = info;
            this.setState({
                contactInfoValue: info
            })
        })
        let p3 = new Promise((resolve, rejects) => {
            const param = { expert_id: id }
            this.loadIdentityInfo(param, data => resolve(data))
        })
        p3.then(data => {
            const info = data.data
            this.refs.identifyInfo.value = info;
            this.setState({
                identifyInfoValue: info
            })
        })
        let p4 = new Promise((resolve, rejects) => {
            const param = { expert_id: id }
            this.loadResumeInfo(param, data => resolve(data))
        })
        p4.then(data => {
            const info = data.data
            this.refs.resumeInfo.value = info;
            this.setState({
                resumeInfoValue: info
            })
        })
    }

    // 保存meta信息
    saveMetaInfoHandle() {
        const metaInfo = this.refs.metaInfo;
        if (metaInfo.reportValidity().valid) {
            const value = metaInfo.value;
            expertUpdateMeta({
                ...value,
                expert_id: this.state.id
            }, {
                    responseType: "json",
                    withCredentials: true,
                    contentType: "application/json",
                    type: "POST"
                }, (data, res) => {
                    if (data.success) {
                        Notice.info({
                            title: "提示",
                            content: "保存成功",
                            autoClose: true
                        });
                    }
                }, error => {
                    Notice.error({
                        title: "错误提示",
                        content: "数据保存失败，请稍后重试",
                        autoClose: true
                    });
                }, this._headers)
        }
    }

    // 获取meta信息
    loadMetaInfo(options, callback) {
        expertGetMeta(options, {
            withCredentials: true,
            contentType: "application/json",
            type: "POST"
        }, (data, res) => {
            if (data.success) callback(data)
        }, error => {
            Notice.error({
                title: "错误提示",
                content: "接口请求失败，请稍后",
                autoClose: true
            });
        }, this._headers)
    }

    // 保存财富信息
    saveFinanceInfoHandle() {
        const financeInfo = this.refs.financeInfo;
        if (financeInfo.reportValidity().valid) {
            const value = financeInfo.value;
            const param = {
                ...value,
                expert_id: this.state.id
            }
            expertUpdateFinanceInfo(param, {
                responseType: "json",
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) {

                    Notice.info({
                        title: "提示",
                        content: "保存成功",
                        autoClose: true
                    });
                }
            }, error => {
                Notice.error({
                    title: "错误提示",
                    content: "数据保存失败，请稍后重试",
                    autoClose: true
                });
            }, this._headers)
        }
    }

    // 获取财富信息
    loadFinanceInfo(options, callback) {
        expertGetFinanceInfo(options, {
            withCredentials: true,
            contentType: "application/json",
            type: "POST"
        }, (data, res) => {
            if (data.success) callback(data)
        }, error => {
            Notice.error({
                title: "错误提示",
                content: "接口请求失败，请稍后",
                autoClose: true
            });
        }, this._headers)
    }

    // 保存联系人信息
    saveContactInfoHandle() {
        const contactInfo = this.refs.contactInfo;
        if (contactInfo.reportValidity().valid) {
            const value = contactInfo.value;
            const param = {
                ...value,
                expert_id: this.state.id
            }
            expertUpdateContactInfo(param, {
                responseType: "json",
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) {

                    Notice.info({
                        title: "提示",
                        content: "保存成功",
                        autoClose: true
                    });
                }
            }, error => {
                Notice.error({
                    title: "错误提示",
                    content: "数据保存失败，请稍后重试",
                    autoClose: true
                });
            }, this._headers)
        }
    }

    // 获取联系人信息
    loadContactInfoHandle(options, callback) {
        expertGetContactInfo(options, {
            withCredentials: true,
            contentType: "application/json",
            type: "POST"
        }, (data, res) => {
            if (data.success) callback(data)
        }, error => {
            Notice.error({
                title: "错误提示",
                content: "接口请求失败，请稍后",
                autoClose: true
            });
        }, this._headers)
    }

    // 保存身份信息
    saveIdentifyInfoHandle() {
        const identifyInfo = this.refs.identifyInfo;
        if (identifyInfo.reportValidity().valid) {
            const value = identifyInfo.value;
            const param = {
                ...value,
                expert_id: this.state.id
            }
            expertUpdateIdentityInfo(param, {
                responseType: "json",
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) {

                    Notice.info({
                        title: "提示",
                        content: "保存成功",
                        autoClose: true
                    });
                }
            }, error => {

                Notice.info({
                    title: "错误提示",
                    content: "接口请求失败，请稍后"
                })
            }, this._headers)
        }
    }

    // 获取身份信息
    loadIdentityInfo(options, callback) {
        const id = getQuery("id")
        expertGetIdentityInfo({
            ...options,
            expert_id: id
        }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) callback(data);
            }, error => {
                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
    }

    // 保存工作经验信息
    addWorkExpHandle() {
        this.workExpHandle(1, null)
    }

    editWorkExpHandle(row) {
        this.workExpHandle(2, row)
    }

    workExpHandle(type, row) {
        let form
        row = row || {}
        Dialog.show(<div className="p-1rem">
            <Form ref={input => form = input}>
                <FormLayout>
                    <FormField label="Organization Name：" required>
                        <TextBox
                            name="organization_name"
                            defaultValue={paramFormat(row.organization_name)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="Position：" required>
                        <TextBox
                            name="position"
                            defaultValue={paramFormat(row.position)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="Responsibility：" required>
                        <TextBox
                            name="responsibility"
                            defaultValue={paramFormat(row.responsibility)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="Functions：" required>
                        <TextBox
                            name="functions"
                            defaultValue={paramFormat(row.functions)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="Start Date：" required>
                        <TextBox
                            name="start_date"
                            defaultValue={paramFormat(row.start_date)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="End Date：" required>
                        <TextBox
                            name="end_date"
                            defaultValue={paramFormat(row.end_date)}
                            required></TextBox>
                    </FormField>
                </FormLayout>
            </Form>
        </div>, `${type === 1 ? "新增" : "修改"}工作经验`,
            type === 1 ? { 新建: true, 取消: false } : { 修改: true, 取消: false },
            () => {
                if (form.reportValidity().valid) {
                    const value = form.value;
                    const param = {
                        ...value,
                        id: type === 2 ? row.id : undefined,
                        expert_id: this.state.id
                    };
                    (type === 1 ? expertCreateWorkExp : expertUpdateWorkExp)(param, {
                        responseType: "json",
                        withCredentials: true,
                        contentType: "application/json",
                        type: "POST"
                    }, (data, res) => {
                        if (data.success) {
                            this.refs.work_table.reload()
                        }
                    }, error => {

                        Notice.info({
                            title: "错误提示",
                            content: "接口请求失败，请稍后"
                        })
                    }, this._headers)
                }
            })
    }

    // 删除工作经验
    deleteWorkExpHandle(row) {
        Dialog.confirm("确认删除该条工作信息吗？", "删除提示", () => {
            expertDeleteWorkExp({ id: row.id, }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {

                Notice.info({
                    title: "删除提示",
                    content: "删除成功",
                    autoClose: true
                })
                this.refs.work_table.reload()
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
        })
    }

    // 获取工作经验
    loadWorkExpHandle(options, callback) {
        const id = getQuery("id")
        expertGetWorkExp({
            ...options,
            expert_id: id
        }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) {
                    if (data.data) callback(data.data)
                }
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
    }

    // 保存工作经验信息
    addEduExpHandle() {
        this.eduExpHandle(1, null)
    }

    editEduExpHandle(row) {
        this.eduExpHandle(2, row)
    }

    eduExpHandle(type, row) {
        let form
        row = row || {}
        Dialog.show(<div className="p-1rem">
            <Form ref={input => form = input}>
                <FormLayout>
                    <FormField label="Organization Name：" required>
                        <TextBox
                            name="organization_name"
                            defaultValue={paramFormat(row.organization_name)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="College：" required>
                        <TextBox
                            name="college"
                            defaultValue={paramFormat(row.college)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="Major：" required>
                        <TextBox
                            name="major"
                            defaultValue={paramFormat(row.major)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="Start Date：" required>
                        <TextBox
                            name="start_date"
                            defaultValue={paramFormat(row.start_date)}
                            required></TextBox>
                    </FormField>
                    <br />
                    <FormField label="End Date：" required>
                        <TextBox
                            name="end_date"
                            defaultValue={paramFormat(row.end_date)}
                            required></TextBox>
                    </FormField>
                </FormLayout>
            </Form>
        </div>, `${type === 1 ? "新增" : "修改"}教育经历`,
            type === 1 ? { 新建: true, 取消: false } : { 修改: true, 取消: false },
            () => {
                if (form.reportValidity().valid) {
                    const value = form.value;
                    const param = {
                        ...value,
                        id: type === 2 ? row.id : undefined,
                        expert_id: this.state.id
                    };
                    (type === 1 ? expertCreateEduExp : expertUpdateEduExp)(param, {
                        responseType: "json",
                        withCredentials: true,
                        contentType: "application/json",
                        type: "POST"
                    }, (data, res) => {
                        if (data.success) {
                            this.refs.edu_table.reload()
                        }
                    }, error => {

                        Notice.info({
                            title: "错误提示",
                            content: "接口请求失败，请稍后"
                        })
                    }, this._headers)
                }
            })
    }

    // 删除工作经验
    deleteEduExpHandle(row) {
        Dialog.confirm("确认删除该条教育经历吗？", "删除提示", () => {
            expertDeleteEduExp({ id: row.id, }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {

                Notice.info({
                    title: "删除提示",
                    content: "删除成功",
                    autoClose: true
                })
                this.refs.edu_table.reload()
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
        })
    }

    // 获取工作经验
    loadEduExpHandle(options, callback) {
        const id = getQuery("id")
        expertGetEducationExp({
            ...options,
            expert_id: id
        }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) {
                    if (data.data) callback(data.data)
                }
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
    }

    // 保存总体介绍
    addCommentsHandle() {
        this.commentsHandle(1, null)
    }

    eidtCommentsHandle(row) {
        this.commentsHandle(2, row)
    }

    commentsHandle(type, row) {
        let form
        row = row || {}
        Dialog.show(<div className="p-1rem">
            <Form ref={input => form = input}>
                <FormLayout>
                    <FormField label="Comments：" required>
                        <TextArea
                            name="comments"
                            required></TextArea>
                    </FormField>
                </FormLayout>
            </Form>
        </div>, `${type === 1 ? "新增" : "修改"}总体介绍`,
            type === 1 ? { 新建: true, 取消: false } : { 修改: true, 取消: false },
            () => {
                if (form.reportValidity().valid) {
                    const value = form.value;
                    const param = {
                        ...value,
                        id: type === 2 ? row.id : undefined,
                        expert_id: this.state.id
                    };
                    (type === 1 ? expertCreateGeneralComments : expertUpdateGeneralComments)(param, {
                        responseType: "json",
                        withCredentials: true,
                        contentType: "application/json",
                        type: "POST"
                    }, (data, res) => {
                        if (data.success) {
                            this.refs.comments_table.reload()
                        }
                    }, error => {

                        Notice.info({
                            title: "错误提示",
                            content: "接口请求失败，请稍后"
                        })
                    }, this._headers)
                }
            }
        );
        form.value = { comments: row.comments }
    }

    // 删除总体介绍
    deleteCommentsHandle(row) {
        Dialog.confirm("确认删除该条总体介绍吗？", "删除提示", () => {
            expertDeleteGeneralComments({ id: row.id, }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {

                Notice.info({
                    title: "删除提示",
                    content: "删除成功",
                    autoClose: true
                })
                this.refs.comments_table.reload()
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
        })
    }

    // 获取工作经验
    loadCommentHandle(options, callback) {
        const id = getQuery("id")
        expertGetGeneralComments({
            ...options,
            expert_id: id
        }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) {
                    if (data.data) callback(data.data)
                }
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
    }

    // 保存注释信息
    addNotesHandle() {
        this.notesHandle(1, null)
    }

    editNotesHandle(row) {
        this.notesHandle(2, row)
    }

    notesHandle(type, row) {
        let form
        row = row || {}
        Dialog.show(<div className="p-1rem">
            <Form ref={input => form = input}>
                <FormLayout>
                    <FormField label="Notes：" required>
                        <TextArea
                            name="notes"
                            defaultValue={paramFormat(row.notes)}
                            required></TextArea>
                    </FormField>
                </FormLayout>
            </Form>
        </div>, `${type === 1 ? "新增" : "修改"}注释信息`,
            type === 1 ? { 新建: true, 取消: false } : { 修改: true, 取消: false },
            () => {
                if (form.reportValidity().valid) {
                    const value = form.value;
                    const param = {
                        ...value,
                        id: type === 2 ? row.id : undefined,
                        expert_id: this.state.id
                    };
                    (type === 1 ? expertCreateNotes : expertUpdateNotes)(param, {
                        responseType: "json",
                        withCredentials: true,
                        contentType: "application/json",
                        type: "POST"
                    }, (data, res) => {
                        if (data.success) {
                            this.refs.notes_table.reload()
                        }
                    }, error => {

                        Notice.info({
                            title: "错误提示",
                            content: "接口请求失败，请稍后"
                        })
                    }, this._headers)
                }
            })
    }

    // 删除注释信息
    deleteNotesHandle(row) {
        Dialog.confirm("确认删除该条注释信息吗？", "删除提示", () => {
            expertDeleteNotes({ id: row.id, }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {

                Notice.info({
                    title: "删除提示",
                    content: "删除成功",
                    autoClose: true
                })
                this.refs.notes_table.reload()
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
        })
    }

    // 获取注释信息
    loadNotesHandle(options, callback) {
        const id = getQuery("id")
        expertGetNotes({
            ...options,
            expert_id: id
        }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) {
                    if (data.data) callback(data.data)
                }
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
    }

    // 保存简历信息
    saveResumeInfoHandle() {
        const resumeInfo = this.refs.resumeInfo;
        if (resumeInfo.reportValidity().valid) {
            const value = resumeInfo.value;
            const param = {
                ...value,
                expert_id: this.state.id
            }
            expertUpdateResume(param, {
                responseType: "json",
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) {

                    Notice.info({
                        title: "提示",
                        content: "保存成功",
                        autoClose: true
                    });
                }
            }, error => {

                Notice.info({
                    title: "错误提示",
                    content: "接口请求失败，请稍后"
                })
            }, this._headers)
        }
    }

    // 获取简历信息
    loadResumeInfo(options, callback) {
        const id = getQuery("id")
        expertGetResume({
            ...options,
            expert_id: id
        }, {
                withCredentials: true,
                contentType: "application/json",
                type: "POST"
            }, (data, res) => {
                if (data.success) callback(data);
            }, error => {

                Notice.error({
                    title: "错误提示",
                    content: "接口请求失败，请稍后",
                    autoClose: true
                });
            }, this._headers)
    }
}
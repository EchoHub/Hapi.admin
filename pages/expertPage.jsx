import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import { Panel, Form, FormLayout, FormField, TextBox, TextArea, DataGridView, Column, Button } from "common"
import "./expertPage.scss"

export default class ExpertPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        return <div className="hp-expertpage">
            <Panel className="mv-10 data-panel" title="Meta Info" toolbar={true}>
                <Form>
                    <FormLayout>
                        <FormField label="FirstName：" required>
                            <TextBox name="first_name_en" required></TextBox>
                        </FormField>
                        <FormField label="LastName：" required>
                            <TextBox name="last_name_en" required></TextBox>
                        </FormField>
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
            </Panel>
            <Panel className="mv-10 data-panel" title="Finance Information" toolbar={true}>
                <Form>
                    <FormLayout>
                        <FormField label="Bank：" required>
                            <TextBox name="bank" required></TextBox>
                        </FormField>
                        <FormField label="Account No：" required>
                            <TextBox name="account_no" required></TextBox>
                        </FormField>
                        <FormField label="Unit Price：" required>
                            <TextBox name="unit_price" required></TextBox>
                        </FormField>
                    </FormLayout>
                </Form>
            </Panel>
            <Panel className="mv-10 data-panel" title="Contact Information" toolbar={true}>
                <Form>
                    <FormLayout>
                        <FormField label="Mobile：" required>
                            <TextBox name="mobile" required></TextBox>
                        </FormField>
                        <FormField label="Email：" required>
                            <TextBox name="email" required></TextBox>
                        </FormField>
                        <FormField label="Tel：" required>
                            <TextBox name="tel" required></TextBox>
                        </FormField>
                        <br />
                        <FormField label="Address：" required>
                            <TextBox name="address" required></TextBox>
                        </FormField>
                        <FormField label="Weixin：" required>
                            <TextBox name="weixin" required></TextBox>
                        </FormField>
                        <FormField label="Linkedin：" required>
                            <TextBox name="linkedin" required></TextBox>
                        </FormField>
                        <br />
                        <FormField label="Facebook：" required>
                            <TextBox name="facebook" required></TextBox>
                        </FormField>
                        <FormField label="Twitter：" required>
                            <TextBox name="twitter" required></TextBox>
                        </FormField>
                        <FormField label="Weibo：" required>
                            <TextBox name="weibo" required></TextBox>
                        </FormField>
                    </FormLayout>
                </Form>
            </Panel>
            <Panel className="mv-10 data-panel" title="Identify Information" toolbar={true}>
                <Button className="mv-10 hp-button-primary">Add</Button>
                <DataGridView>
                    <Column title="Name">{row => row.name_en}</Column>
                    <Column title="Type">{row => row.type}</Column>
                    <Column title="Id Number">{row => row.id_number}</Column>
                    <Column title="Country">{row => row.country}</Column>
                    <Column title="Handle">{
                        row => <div>
                            <Button className="ml-10 hp-button-primary hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Edit</Button>
                            <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Delete</Button>
                        </div>
                    }</Column>
                </DataGridView>
            </Panel>
            <Panel className="mv-10 data-panel" title="Work Experiences" toolbar={true}>
                <Button className="mv-10 hp-button-primary">Add</Button>
                <DataGridView>
                    <Column title="Company">{row => row.company}</Column>
                    <Column title="Position">{row => row.position}</Column>
                    <Column title="Functions">{row => row.functions}</Column>
                    <Column title="Responsibility">{row => row.responsibility}</Column>
                    <Column title="Start Date">{row => row.start_date}</Column>
                    <Column title="End Date">{row => row.end_date}</Column>
                    <Column title="Handle">{
                        row => <div>
                            <Button className="ml-10 hp-button-primary hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Edit</Button>
                            <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Delete</Button>
                        </div>
                    }</Column>
                </DataGridView>
            </Panel>
            <Panel className="mv-10 data-panel" title="Education Experiences" toolbar={true}>
                <Button className="mv-10 hp-button-primary">Add</Button>
                <DataGridView>
                    <Column title="Education">{row => row.education}</Column>
                    <Column title="College">{row => row.college}</Column>
                    <Column title="Major">{row => row.major}</Column>
                    <Column title="Start Date">{row => row.start_date}</Column>
                    <Column title="End Date">{row => row.end_date}</Column>
                    <Column title="Handle">{
                        row => <div>
                            <Button className="ml-10 hp-button-primary hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Edit</Button>
                            <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Delete</Button>
                        </div>
                    }</Column>
                </DataGridView>
            </Panel>
            <Panel className="mv-10 data-panel" title="Resume" toolbar={true}>
                <Form>
                    <FormLayout>
                        <FormField colSpan={3} label="resume：" required>
                            <TextArea style={{ minWidth: "400px" }} name="resume" required></TextArea>
                        </FormField>
                    </FormLayout>
                </Form>
            </Panel>
            <Panel className="mv-10 data-panel" title="Comments" toolbar={true}>
                <Button className="mv-10 hp-button-primary">Add</Button>
                <DataGridView>
                    <Column title="Comments">{row => row.name}</Column>
                    <Column title="Creator">{row => row.mobile}</Column>
                    <Column title="Created Time">{row => row.weixin}</Column>
                    <Column title="Last Modified">{row => row.email}</Column>
                    <Column title="Last ModifiedTime">{row => row.email}</Column>
                    <Column title="Handle">{
                        row => <div>
                            <Button className="ml-10 hp-button-primary hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Edit</Button>
                            <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Delete</Button>
                        </div>
                    }</Column>
                </DataGridView>
            </Panel>
            <Panel className="mv-10 data-panel" title="Notes" toolbar={true}>
                <Button className="mv-10 hp-button-primary">Add</Button>
                <DataGridView>
                    <Column title="Notes">{row => row.notes}</Column>
                    <Column title="Creator">{row => row.created_by}</Column>
                    <Column title="Created Time">{row => row.weixin}</Column>
                    <Column title="Last Modified">{row => row.email}</Column>
                    <Column title="Last ModifiedTime">{row => row.email}</Column>
                    <Column title="Handle">{
                        row => <div>
                            <Button className="ml-10 hp-button-primary hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Edit</Button>
                            <Button className="ml-10 hp-button-danger hp-button-small" onClick={
                                () => {
                                    const notice = new Notice
                                    notice.info({
                                        title: "Delete提示",
                                        content: "Delete成功",
                                        autoClose: true
                                    })
                                }
                            }>Delete</Button>
                        </div>
                    }</Column>
                </DataGridView>
            </Panel>
        </div>
    }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Panel, GridLayout, Layout, Button, Form,
    TextBox, CheckBox
} from "common";
import "./loginDemo.scss"

export default class NoticePage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="hp-logindemo">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="登陆Demo" toolbar={true}>
                        <p className="introduction">登陆页：为系统的唯一入口，不同风格的登录页面，展现不同风格的操作系统。</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" title="DEMO One" toolbar={true}>
                        <div className="pb-40">
                            <div className="login-container">
                                <div className="login-title">
                                    <span>Sign In</span>
                                </div>
                                <Form>
                                    <TextBox placeholder="Your email"></TextBox>
                                    <br />
                                    <TextBox type="password" placeholder="Your password"></TextBox>
                                    <br />
                                    <Button>Submit</Button>
                                    <Button className="sign-button">f Sign in with Facebook</Button>
                                </Form>
                                <br />
                                <p>
                                    <CheckBox></CheckBox>
                                    <span className="tip">
                                        <span>I don’t want to receive marketing messages from Instaoffer.
                                        I can also opt out of receiving these at any time in my account settings.
                                    </span>
                                    </span>
                                </p>
                                <div className="sign-tip">
                                    Dont't have instaoffer account ? <a href="javascript:;">sign up</a>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
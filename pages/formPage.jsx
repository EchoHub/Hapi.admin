import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Form } from "common";
import "./formPage.scss"

export default class FormPage extends Component {
    render() {
        return <div className="hp-formpage">
            <Panel className="mt-10" title="常用按钮" toolbar={true}>
                <p className="introduction">常用按钮包括：主按钮、次按钮、虚线按钮、危险按钮。</p>
            </Panel>
        </div>
    }
}
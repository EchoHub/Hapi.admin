import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import { Panel } from "common"
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
            <Panel className="mv-10 data-panel" title="专家详情" toolbar={true}>
                123
            </Panel>
        </div>
    }
}
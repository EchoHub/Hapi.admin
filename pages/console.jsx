import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from "common"
import "./console.scss"

export default class Console extends Component {
    render() {
        return <div className="hp-console">
            <Panel className="m-10" title="数据面板" toolbar={true}>
                123
            </Panel>
        </div>
    }
}
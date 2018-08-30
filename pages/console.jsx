import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from "common"
import "./console.scss"

export default class Console extends Component {
    render() {
        return <div className="hp-console">
            <div className="hp-sp-row">
                <div className="hp-col hp-col-24">
                    <Panel className="mv-10" title="数据面板" toolbar={true}>
                        123
                    </Panel>
                </div>
            </div>
            <div className="hp-sp-row">
                <Panel className="hp-col hp-col-12 mv-10" title="数据面板" toolbar={true}>
                    123
                </Panel>
                <Panel className="hp-col hp-col-12 mv-10" title="数据面板" toolbar={true}>
                    123
                </Panel>
            </div>
        </div>
    }
}
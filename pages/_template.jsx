import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, GridLayout, Layout } from "common";
import "./_template.scss"

export default class Template extends Component {
    render() {
        return <div className="hp-template">
            <Panel title="栅格布局" toolbar={true}>
                <p className="introduction"></p>
                <GridLayout theme="default">
                    <Layout col={12}>1</Layout>
                </GridLayout>
            </Panel>
        </div>
    }
}
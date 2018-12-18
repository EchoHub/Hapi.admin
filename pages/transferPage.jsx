import React, { Component } from 'react';
import { Panel, GridLayout, Layout, Button, Transfer } from "common";
import PropTypes from 'prop-types';
import "./transferPage.scss"

export default class TransferPage extends Component {
    render() {
        return <div className="hp-tablepage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="穿梭框" toolbar={true}>
                        <p className="introduction">双栏穿梭选择框，需要在多个可选项之间进行多选，相比选择框、树型选择框，展示的可选项信息更多。</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10" title="基本用法" style={{ width: "calc(100% - 5px)", marginRight: "5px" }} toolbar={true}>
                        <p></p>
                        <Transfer></Transfer>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10" title="基本用法" style={{ width: "calc(100% - 5px)", marginLeft: "5px" }} toolbar={true}>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import { GridLayout, Layout, Panel, Collapse, CollapseItem } from "common"
import "./collapsePage.scss"

export default class DropDownPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        return <div className="hp-collapsepage">
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10" title="折叠面板" toolbar={true}>
                        <p className="introduction">折叠面板：通过折叠面板收纳内容区域。</p>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={12}>
                    <Panel className="mt-10"
                        title="基本用法" toolbar={true}>
                        <p>基本用法：可同时展开多个面板，面板之间不影响。</p>
                        <Collapse
                            className="e-mv-10"
                            width={800}
                        >
                            <CollapseItem
                                title="Prosperity"
                            >ba la ba la ba la .......</CollapseItem>
                            <CollapseItem
                                title="Democracy"
                            >ba la ba la ba la .......</CollapseItem>
                            <CollapseItem
                                title="Civilization"
                            >ba la ba la ba la .......</CollapseItem>
                            <CollapseItem
                                title="Harmonious"
                            >ba la ba la ba la .......</CollapseItem>
                        </Collapse>
                    </Panel>
                </Layout>
            </GridLayout>
            <GridLayout>
                <Layout col={6}>
                    <Panel className="mt-10"
                        title="手风琴" toolbar={true}>
                        <p>手风琴：每次只能打开一个面板。</p>
                        <Collapse
                            className="e-mv-10"
                            width={"100%"}
                            accordion
                        >
                            <CollapseItem
                                title="Prosperity"
                            >
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                            </CollapseItem>
                            <CollapseItem
                                title="Democracy"
                            >
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                            </CollapseItem>
                            <CollapseItem
                                title="Civilization"
                            >
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                            </CollapseItem>
                            <CollapseItem
                                title="Harmonious"
                            >
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                                <p>ba la ba la ba la .......</p>
                            </CollapseItem>
                        </Collapse>
                    </Panel>
                </Layout>
                <Layout col={6}>
                    <Panel className="mt-10"
                        style={{ width: "calc(100% - 5px)", marginLeft: "5px" }}
                        title="自定义面板标题" toolbar={true}>
                        <p>自定义面板标题：可以通过自定义设置（icon）对面板标题添加图标。</p>
                        <Collapse
                            className="e-mv-10"
                            width={"100%"}
                        >
                            <CollapseItem
                                title="Prosperity"
                                icon="icon-activity"
                            >ba la ba la ba la .......</CollapseItem>
                            <CollapseItem
                                title="Democracy"
                                icon="icon-barrage"
                            >ba la ba la ba la .......</CollapseItem>
                            <CollapseItem
                                title="Civilization"
                                icon="icon-businesscard"
                            >ba la ba la ba la .......</CollapseItem>
                            <CollapseItem
                                title="Harmonious"
                                icon="icon-createtask"
                            >ba la ba la ba la .......</CollapseItem>
                        </Collapse>
                    </Panel>
                </Layout>
            </GridLayout>
        </div>
    }
}
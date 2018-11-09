import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, ButtonGroup } from "common";
import "./buttonPage.scss"

export default class ButtonPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="hp-buttonpage">
            <Panel className="mt-10" title="常用按钮" toolbar={true}>
                <p className="introduction">常用按钮包括：主按钮、次按钮、虚线按钮、危险按钮。</p>
                <Button className="mr-10" type="primary">Primary</Button>
                <Button className="mr-10" >Default</Button>
                <Button className="mr-10" type="dashed">Dashed</Button>
                <Button className="mr-10" type="danger">Danger</Button>
            </Panel>
            <Panel className="mt-10" title="不同尺寸按钮" toolbar={true}>
                <p className="introduction">按钮尺寸包括：超大、正常、小、迷你。</p>
                <Button className="mr-10" type="primary" size={"large"}>Large</Button>
                <Button className="mr-10" type="primary" size={"normal"}>Normal</Button>
                <Button className="mr-10" type="primary" size={"small"}>Small</Button>
                <Button className="mr-10" type="primary" size={"mini"}>Mini</Button>
                <div className="mt-10">
                    <Button className="mr-10" type="default" size={"large"}>Large</Button>
                    <Button className="mr-10" type="default" size={"normal"}>Normal</Button>
                    <Button className="mr-10" type="default" size={"small"}>Small</Button>
                    <Button className="mr-10" type="default" size={"mini"}>Mini</Button>
                </div>
                <div className="mt-10">
                    <Button className="mr-10" type="dashed" size={"large"}>Large</Button>
                    <Button className="mr-10" type="dashed" size={"normal"}>Normal</Button>
                    <Button className="mr-10" type="dashed" size={"small"}>Small</Button>
                    <Button className="mr-10" type="dashed" size={"mini"}>Mini</Button>
                </div>
            </Panel>
            <Panel className="mt-10" title="自适应按钮" toolbar={true}>
                <p className="introduction">通过block属性控制按钮的自适应状态开启或关闭。</p>
                <Button type="primary" block>Primary</Button>
                <Button className="mt-10" block>Default</Button>
                <Button className="mt-10" type="dashed" block>Dashed</Button>
                <Button className="mt-10" type="danger" block>Danger</Button>
            </Panel>
            <Panel className="mt-10" title="图标按钮" toolbar={true}>
                <p className="introduction">通过icon属性设置按钮的图标类（unicode码）。</p>
                <Button className="mr-10" icon={"icon-addition"} type="primary">添加</Button>
                <Button className="mr-10" icon={"icon-search"}>搜索</Button>
                <Button className="mr-10" icon={"icon-setup"} type="dashed">设置</Button>
                <Button className="mr-10" icon={"icon-empty"} type="danger">删除</Button>
                <Button className="mt-10" icon={"icon-addition"} type="primary" block>添加</Button>
                <Button className="mt-10" icon={"icon-search"} block>搜索</Button>
                <Button className="mt-10" icon={"icon-setup"} type="dashed" block>设置</Button>
                <Button className="mt-10" icon={"icon-empty"} type="danger" block>删除</Button>
            </Panel>
            <Panel className="mt-10" title="按钮组" toolbar={true}>
                <p className="introduction">通过按钮组ButtonGroup可以根据场景需要随意进行按钮组合。</p>
                <ButtonGroup theme="default">
                    <Button icon={"icon-return"}>上一步</Button>
                    <Button icon={"icon-enter"}>下一步</Button>
                </ButtonGroup>
                <ButtonGroup className="ml-10" theme="primary">
                    <Button icon={"icon-like"}></Button>
                    <Button icon={"icon-collection"}></Button>
                    <Button icon={"icon-share"}></Button>
                    <Button icon={"icon-setup"}></Button>
                </ButtonGroup>
                <ButtonGroup className="ml-10" theme="warning">
                    <Button icon={"icon-like"}></Button>
                    <Button icon={"icon-collection"}></Button>
                    <Button icon={"icon-share"}></Button>
                    <Button icon={"icon-setup"}></Button>
                </ButtonGroup>
                <ButtonGroup className="mt-10" block>
                    <Button icon={"icon-return"}>上一步</Button>
                    <Button icon={"icon-enter"}>下一步</Button>
                </ButtonGroup>
                <ButtonGroup className="mt-10" theme="primary" block>
                    <Button icon={"icon-like"}></Button>
                    <Button icon={"icon-collection"}></Button>
                    <Button icon={"icon-share"}></Button>
                    <Button icon={"icon-setup"}></Button>
                </ButtonGroup>
                <ButtonGroup className="mt-10" theme="warning" block>
                    <Button icon={"icon-like"}></Button>
                    <Button icon={"icon-collection"}></Button>
                    <Button icon={"icon-share"}></Button>
                    <Button icon={"icon-setup"}></Button>
                </ButtonGroup>
            </Panel>
        </div>
    }
}
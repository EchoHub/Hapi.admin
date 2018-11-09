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
                <p className="introduction">常用按钮包括：主按钮、次按钮、虚线按钮、危险按钮</p>
                <Button>Primary</Button>
                <Button>Default</Button>
                <Button>Dashed</Button>
                <Button>Danger</Button>
            </Panel>
        </div>
    }
}
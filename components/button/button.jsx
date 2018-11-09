import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./button.scss"

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { children } = this.props;
        return <div className="hp-button">{children}</div>
    }
}

export class ButtonGroup extends Component {
    render() {
        const { children } = this.props;
        return <div className="hp-buttongroup">{children}</div>
    }
}
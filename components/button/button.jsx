import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./button.scss"

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="hp-button">{this.props.children}</div>
    }
}
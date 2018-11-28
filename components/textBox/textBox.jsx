import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { findDOMNode } from "react-dom";
import { propsFilter, reportValidity } from "_util/_util";
import "./textBox.scss"

export default class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    get value() {
        const { name } = this.props;
        let result = {};
        result[name] = this.refs.input.value
        return result;
    }

    set value(v) {
        const { name } = this.props;
        if (v && Object.keys(v).length) {
            for (const key in v) {
                this.refs.input.value = v[name];
            }
        }
    }

    reportValidity() {
        const input = this.refs.input;
        const { pattern, patternMessage, required, max, min } = this.props;
        const value = input.value;
        return reportValidity(input, value, { pattern, patternMessage, required, max, min })
    }

    componentDidMount() {
        const { ...attr } = this.props
        const __proto__ = propsFilter(findDOMNode(this), attr)
        this.setState({
            __proto__: __proto__
        })
    }

    render() {
        const { prefixCls, className, ...attr } = this.props;
        const { __proto__ } = this.state
        const classes = classNames(prefixCls, className);
        return <input ref="input" className={classes} {...__proto__} />
    }
}
TextBox.propTypes = {
    type: PropTypes.string,
    prefixCls: PropTypes.string,
}
TextBox.defaultProps = {
    type: "text",
    prefixCls: "hp-textbox",
    patternMessage: "该输入域为必填的"
}

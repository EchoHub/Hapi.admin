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
        // const { name } = this.props;
        // let result = {};
        // result[name] = this.refs.input.value
        return this.refs.input.value;
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
        const { pattern, patternMessage, required, max, min, maxLength, minLength } = this.props;
        const value = input.value;
        return reportValidity(input, value, { pattern, patternMessage, required, max, min, maxLength, minLength })
    }

    componentWillReceiveProps(props) {
        const { ...attr } = props
        const _attr = propsFilter(findDOMNode(this), attr)
        this.setState({
            _attr: _attr
        })
    }

    componentDidMount() {
        const { ...attr } = this.props
        const _attr = propsFilter(findDOMNode(this), attr)
        this.setState({
            _attr: _attr
        })
    }

    render() {
        const { prefixCls, className } = this.props;
        const { _attr } = this.state
        const classes = classNames(prefixCls, className);
        return <input autoComplete={"off"} {..._attr} ref="input" className={classes}/>
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

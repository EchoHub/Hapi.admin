import React, { Component } from "react"
import PropTypes from 'prop-types';
import classNames from "classnames";
import { findDOMNode } from "react-dom";
import { propsFilter, reportValidity } from "_util/_util";
import "./textArea.scss"
/**
 * @desc 表示一个文本域
 */
export default class TextArea extends Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    componentDidMount() {
        const { ...attr } = this.props
        const _attr = propsFilter(findDOMNode(this), attr)
        this.setState({
            _attr: _attr
        })
    }

    render() {
        const { className, prefixCls } = this.props
        const { _attr } = this.state
        const classes = classNames(prefixCls, className)
        return <textarea {..._attr} className={classes} ref={"input"}></textarea>
    }

    /**
     * @desc 获取节点value
     */
    get value() {
        const val = this.refs.input.value
        return val
    }

    set value(v) {
        this.refs.input.value = v
    }

    /**
     * @desc 报告错误
     * @param vNode 节点
     * @param errorType 报错类型
     */
    reportValidity() {
        const input = this.refs.input;
        const { pattern, patternMessage, required, max, min, maxLength, minLength } = this.props;
        const value = input.value;
        return reportValidity(input, value, { pattern, patternMessage, required, max, min, maxLength, minLength })
    }
}
TextArea.propsTypes = {
    prefixCls: PropTypes.string
}
TextArea.defaultProps = {
    prefixCls: "hp-textbox"
}
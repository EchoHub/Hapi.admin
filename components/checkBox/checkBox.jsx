import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import { propsFilter } from "_util/_util";
import * as DOM from "dom/dom";
import classNames from "classnames"
import "./checkBox.scss"
/**
 * @desc 表示一个多选框
 */
export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        const { disabled, checked, ...attr } = this.props;
        const _attr = propsFilter(findDOMNode(this), attr)
        this.setState({
            disabled, 
            checked: checked || false,
            _attr: _attr
        })
    }
    /**
     * @desc checkbox change事件
     * @param event event
     */
    changeCheckBoxHandle() {
        if (this.props.disabled) return;
        this.checked = !this.state.checked
    }
    render() {
        const { prefixCls, className, children, value, onClick } = this.props;
        const { disabled, checked } = this.state
        const classes = classNames(prefixCls, className, {
            [`${disabled ? "disabled" : ""}`]: disabled,
            [`${checked ? "active" : ""}`]: checked,
        })
        return <div className={classes}>
            <span
                ref = "cb"
                className="hp-checkbox-inner"
                onClick={(event) => {
                    this.changeCheckBoxHandle()
                    const timer = setTimeout(() => {
                        onClick instanceof Function && onClick(this, event);
                        clearTimeout(timer)
                    }, 10)
                }}
            ></span>
            <input ref="input" type="hidden" value={value} />
            <span className="hp-checkbox-content">{children}</span>
        </div>
    }

    /**
     * @desc 获取checkbox值
     */
    get value() {
        return this.state.checked ? this.refs.input.value : null
    }
    /**
     * @desc 获取checkbox值
     */
    get checked() {
        return this.state.checked
    }

    set checked(v) {
        this.setState({
            checked: v
        })
    }
}
CheckBox.defaultProps = {
    prefixCls: "hp-checkbox"
}
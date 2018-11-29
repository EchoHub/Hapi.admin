import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import * as DOM from "dom/dom"
import { propsFilter } from "_util/_util"
import classNames from "classnames"
import "./switch.scss"

export default class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }
    componentDidMount() {
        const { checked } = this.props;
        this.setState({
            checked: checked || false
        })

        DOM.on(findDOMNode(this), "click", event => { this.openCloseHandler(event) })
    }
    render() {
        const { prefixCls, className, size, sizeEnum, disabled, content } = this.props;
        const { checked } = this.state
        const classes = classNames(prefixCls, className, {
            [`${sizeEnum[size]}`]: size,
            [`${checked ? "hp-switch-checked" : ""}`]: checked,
            [`${disabled ? "hp-switch-disabled" : ""}`]: disabled,
        })
        const c_classes = classNames(
            "hp-switch-content",
            checked ? "hp-switch-content-left" : "hp-switch-content-right"
        )
        return <span className={classes}>
            {
                content ?
                    <span className={c_classes}>{content[checked]}</span>
                    : null
            }
        </span >
    }
    openCloseHandler(event) {
        const { disabled } = this.props
        const { checked } = this.state
        if (!disabled) {
            this.setState({
                checked: !checked
            });
        }
    }
    /**
     * @desc 获取开关状态
     */
    get value() {
        return this.state.checked;
    }
}
Switch.defaultProps = {
    className: "",
    prefixCls: "hp-switch",
    size: "normal",
    disabled: false,
    sizeEnum: {
        small: "hp-switch-small",
        large: "hp-switch-large"
    }
}
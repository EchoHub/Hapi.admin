import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import { propsFilter } from "_util/_util"
import classNames from "classnames"
import "./radioBox.scss"
/**
 * @desc 表示一个单选框
 */
export default class RadioBox extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    /**
     * @desc radiobox change事件
     * @param event event
     */
    changeRadioBoxHandle(event) {
        const { refs } = this.props;
        if (this.props.disabled) return;
        if (refs) {
            for (const key in refs) {
                key.indexOf("radioBox") > -1 && (refs[key].checked = false);
            }
        }
        this.checked = true
    }

    componentDidMount() {
        const { disabled, checked, ...attr } = this.props;
        const _attr = propsFilter(findDOMNode(this), attr)
        this.setState({
            disabled,
            checked,
            _attr: _attr
        })
    }

    render() {
        const { prefixCls, className, children, value } = this.props;
        const { disabled, checked } = this.state
        const classes = classNames(prefixCls, className, {
            [`${disabled ? "disabled" : ""}`]: disabled,
            [`${checked ? "active" : ""}`]: checked,
        })
        return <div className={classes}>
            <span className="hp-radiobox-inner"
                onClick={this.changeRadioBoxHandle.bind(this)}></span>
            <input ref="input" type="hidden" value={value} />
            <span className="hp-radiobox-content">{children}
            </span>
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
RadioBox.defaultProps = {
    prefixCls: "hp-radiobox"
}
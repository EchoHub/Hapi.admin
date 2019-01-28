import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { polyfill } from "react-lifecycles-compat"
import { propsFilter, reportValidity, caculatePopupOffset } from "_util/_util";
import * as DOM from "dom/dom";
import "./cascader.scss"

class Cascader extends Component {
    static defaultProps = {
        prefixCls: "hp-cascader",
        expandTrigger: "click",
        menus: [],
        values: []
    }

    constructor(props) {
        super(props)
        this.state = {
            flagEnum: {
                "unfold": "unfold",
                "close": "close",
            },
            flag: "unfold",
            menus: [],
            values: props.values || []
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { ...attr } = nextProps
        const _attr = propsFilter(findDOMNode(this), attr)
        return {
            _attr: _attr
        }
    }
    componentDidMount() {
        DOM.on(document.body, "click", e => {
            if (!DOM.closest(e.target, ".hp-cascader")) {
                const { menusRef, flag } = this.refs;
                DOM.toggleClass(findDOMNode(flag), "hp-cascader-flag-collapsable", false)
                DOM.toggleClass(findDOMNode(menusRef), "hp-cascader-menus-collapsable", false)
            }
        })
    }
    render() {
        const { prefixCls, className } = this.props
        const { _attr, flag, flagEnum, menus, values } = this.state;
        const classes = classNames(prefixCls, className)
        const _values = values.join("／")
        let _flag = flag;
        if (_values.length) _flag = "close"
        const icon_classes = classNames("iconfont icon_flag", {
            [`icon-${flagEnum[_flag]}`]: _flag
        })
        return <div
            className={classes}
        >
            <span
                className="hp-cascader-picker"
                onClick={this.showPopupHandle}
            >
                <input
                    autoComplete={"off"}
                    {..._attr}
                    value={_values}
                    readOnly
                    ref="input"
                    className="hp-textbox"
                />
                <i
                    ref="flag"
                    onClick={this.clearHandle.bind(this, _flag)}
                    className={icon_classes}
                ></i>
            </span>
            <div
                ref="menusRef"
                className="hp-cascader-menus"
            >
                {menus}
            </div>
        </div>
    }

    clearHandle(flag, e) {
        e.stopPropagation()
        if (flag !== "close") return;
        this.setState({
            values: []
        })
        const { menusRef } = this.refs;
        DOM.toggleClass(findDOMNode(menusRef), "hp-cascader-menus-collapsable", false)
    }

    setPopupOffset(target, popup) {
        const offset = caculatePopupOffset(target);
        const offsetHeight = target.offsetHeight;
        let offsetTop = offset.offsetTop;
        const windowHeight = window.innerHeight;
        const popupOffsetHeight = popup.offsetHeight
        if (offsetTop <= (windowHeight - popupOffsetHeight)) {
            offsetTop += offsetHeight
        } else {
            offsetTop -= popupOffsetHeight + 4 // 4px 偏移
        }
        popup.style.top = offsetTop + "px";
        popup.style.left = offset.offsetLeft + "px";
    }

    // 回显选中值
    echoSelectedValue() {
        const { options } = this.props;
        const { values } = this.state;
        const { menusRef } = this.refs;
        let index = 0;
        if (options.findIndex(item => item.label === values[0]) > -1) {
            this.setState({
                menus: this.echoItemHandle(options, values, index)
            }, () => {
                this.setPopupOffset(findDOMNode(this), menusRef)
            })
        }
    }
    echoItemHandle = (options, values, index) => {
        let uls = [], child_ul
        const { expandTrigger } = this.props;
        const lis = options.map(option => {
            let behavor = new Object()
            const { name, children, disabled } = option
            const selected = values[index] === name;
            if (!disabled) {
                const hasChildren = children && children.length
                const eventName = (expandTrigger !== "click" && hasChildren) ? "onMouseEnter" : "onClick";
                behavor[eventName] = null
                behavor[eventName] = hasChildren ? this.getSubItems.bind(this, option, index) : this.selectedHandle.bind(this, option)
                if (selected && hasChildren) {
                    const _index = index + 1
                    child_ul = this.echoItemHandle(children, values, _index)
                }
            }
            
            const classes = classNames({
                ["selected"]: selected,
                ["disabled"]: disabled,
            })
            return <li
                className={classes}
                key={option.name}
                {...behavor}
            >{option.label}</li>
        })
        const result = <ul key={index}>{lis}</ul>
        uls.push(result);
        child_ul && (uls = uls.concat(child_ul))
        return uls

    }

    showPopupHandle = () => {
        const { options, expandTrigger } = this.props;
        const { values } = this.state;
        const { menusRef, flag } = this.refs;
        DOM.toggleClass(findDOMNode(flag), "hp-cascader-flag-collapsable");
        DOM.toggleClass(findDOMNode(menusRef), "hp-cascader-menus-collapsable");
        // 设置默认值
        if (values && values.length) {
            this.echoSelectedValue()
            this.setPopupOffset(findDOMNode(this), menusRef)
            return;
        }
        if (Array.isArray(options) && options.length) {
            let lis = options.map(option => {
                let behavor = new Object()
                const { label, name, disabled } = option;
                if (!disabled) {
                    behavor[expandTrigger !== "click" ? "onMouseEnter" : "onClick"] = this.getSubItems.bind(this, option, 0);
                }
                return <li
                    className={disabled ? "disabled" : ""}
                    key={name}
                    {...behavor}
                >{label}</li>
            })
            const menus_ = <ul key={+new Date()}>{lis}</ul>
            this.setState({
                menus: [menus_]
            }, () => {
                this.setPopupOffset(findDOMNode(this), menusRef)
            })
        }
    }

    selectedHandle(option, event) {
        const { menus } = this.state
        const { menusRef, flag } = this.refs;
        const _self = event.target;
        DOM.addClass(_self, "selected")
        DOM.toggleClass(findDOMNode(flag), "hp-cascader-flag-collapsable", false);
        DOM.toggleClass(findDOMNode(menusRef), "hp-cascader-menus-collapsable", false);
        this.setState(prevState => {
            let _values = prevState.values.slice(0, menus.length - 1);
            _values.push(option.name);
            return {
                values: _values
            }
        })
    }

    getSubItems(option, index, event) {
        const { children, disabled } = option;
        if(disabled) {
            return;
        }
        const _self = event.target;
        Array.prototype.slice.call(DOM.closest(_self, "ul").childNodes).map(item => DOM.removeClass(item, "selected"))
        DOM.addClass(_self, "selected")
        const { expandTrigger } = this.props;
        const activeIndex = index;
        if (Array.isArray(children) && children.length) {
            let behavor = new Object()
            index++
            const lis = option.children.map(option => {
                const hasChildren = option.children && option.children.length
                const eventName = (expandTrigger !== "click" && hasChildren) ? "onMouseEnter" : "onClick";
                behavor[eventName] = null
                behavor[eventName] = hasChildren ? this.getSubItems.bind(this, option, index) : this.selectedHandle.bind(this, option)
                return <li
                    key={option.name}
                    {...behavor}
                >{option.label}</li>
            })
            const menus_ = <ul key={index}>{lis}</ul>
            this.setState(prevState => {
                let _menus = [...prevState.menus.slice(0, activeIndex + 1)];
                _menus.splice(activeIndex + 1);
                _menus.push(menus_);
                return {
                    menus: _menus
                }
            })
        }
        this.setState(prevState => {
            let _values = [...prevState.values]
            _values.splice(activeIndex);
            _values.push(option.name);
            return {
                values: _values
            }
        })
    }

}
Cascader.propTypes = {
    prefixCls: PropTypes.string,
    expandTrigger: PropTypes.string
}


export default polyfill(Cascader)
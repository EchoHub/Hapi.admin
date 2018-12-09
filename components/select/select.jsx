import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames"
import { propsFilter, reportValidity } from "_util/_util";
import * as DOM from "dom/dom";
import "./select.scss"

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItem: {}
        }
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.selectItemHandle = this.selectItemHandle.bind(this)
        this.setValueHandle = this.setValueHandle.bind(this)
    }

    componentWillReceiveProps(props) {
        const { value, children } = props
        this.setValueHandle(value, children)
    }

    componentDidMount() {
        const { value, children, ...attr } = this.props
        const _attr = propsFilter(findDOMNode(this), attr)
        this.setState({
            _attr: _attr
        })
        this.setValueHandle(value, children)
        DOM.on(DOM.query(this.refs.ul, ".hp-listitem"), "click", this.selectItemHandle);
    }

    render() {
        const { prefixCls, className, children, name } = this.props
        const { _attr } = this.state
        const classes = classNames(prefixCls, className)
        return <div className={classes}>
            <input ref="input" {..._attr} className="hp-textbox" name={name} readOnly />
            <button onClick={this.handleButtonClick}><i className="iconfont icon icon-unfold"></i></button>
            <ul ref="ul" className="hp-listbox">{children}</ul>
        </div>
    }

    handleButtonClick() {
        const elem = this.refs.ul;
        if (elem.className.indexOf("hp-listbox-collapsable") > -1) {
            this.toggleHandle(true)
        } else {
            this.toggleHandle(false)
        }
    }

    toggleHandle(toggle) {
        const ul = findDOMNode(this.refs.ul)
        if (toggle) {
            DOM.removeClass(ul, "hp-listbox-collapsable")
            DOM.addClass(findDOMNode(ul), "hp-listbox-collapsed")
            return
        }
        for (const li of DOM.query(ul, ".hp-listitem")) {
            const key = DOM.find(li, "a").getAttribute("data-key");
            if (this.selectedItem.value == key) DOM.addClass(li, "hp-listitem_selected")
            else DOM.removeClass(li, "hp-listitem_selected")
        }
        DOM.removeClass(findDOMNode(ul), "hp-listbox-collapsed")
        DOM.addClass(findDOMNode(ul), "hp-listbox-collapsable")
    }

    selectItemHandle(event) {
        const elem = event.target;
        const { onChange } = this.props;
        const dataKey = elem.getAttribute("data-key");
        this.selectedItem = {
            name: elem.innerHTML,
            value: dataKey !== undefined ? dataKey : elem.innerHTML
        }
        DOM.removeClass(findDOMNode(this.refs.ul), "hp-listbox-collapsable")
        DOM.addClass(findDOMNode(this.refs.ul), "hp-listbox-collapsed")
        onChange && onChange()
    }

    set selectedItem(v) {
        this.refs.input.value = v.name
        this.setState({
            selectedItem: v
        })
    }

    get selectedItem() {
        return this.state.selectedItem || {}
    }

    get value() {
        return this.selectedItem.value || ""
    }

    set value(v) {
        this.setValueHandle(v, this.props.children)
    }

    reportValidity() {
        const { pattern, patternMessage, required, max, min, maxLength, minLength } = this.props;
        const value = this.selectedItem && this.selectedItem.value !== undefined ? this.selectedItem.value : "";
        return reportValidity(findDOMNode(this), value, { pattern, patternMessage, required, max, min, maxLength, minLength })
    }

    /**
     * 设置组件value
     * @param value 
     * @param children 
     */
    setValueHandle(value, children) {
        if (value === undefined || !children) return
        for (const child of children) {
            const props = child.props;
            if (props && value === props.value) {
                this.selectedItem = {
                    name: props.children,
                    value: value
                }
            }
        }
    }
}
Select.defaultProps = {
    prefixCls: "hp-select"
}
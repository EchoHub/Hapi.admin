import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames"
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
    }

    componentDidMount() {
        DOM.on(DOM.query(this.refs.ul, ".hp-listitem"), "click", this.selectItemHandle);
    }

    render() {
        const { prefixCls, className, children, name } = this.props
        const classes = classNames(prefixCls, className)
        return <div className={classes}>
            <input ref="input" className="hp-textbox" name={name} readOnly/>
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
        if (toggle) {
            DOM.removeClass(findDOMNode(this.refs.ul), "hp-listbox-collapsable")
            DOM.addClass(findDOMNode(this.refs.ul), "hp-listbox-collapsed")
            return
        }
        DOM.removeClass(findDOMNode(this.refs.ul), "hp-listbox-collapsed")
        DOM.addClass(findDOMNode(this.refs.ul), "hp-listbox-collapsable")
    }

    selectItemHandle(event) {
        const elem = event.target;
        const dataKey = elem.getAttribute("data-key");
        this.selectedItem = {
            name: elem.innerHTML,
            value: dataKey !== undefined ? dataKey : elem.innerHTML
        }
        DOM.removeClass(findDOMNode(this.refs.ul), "hp-listbox-collapsable")
        DOM.addClass(findDOMNode(this.refs.ul), "hp-listbox-collapsed")
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
}
Select.defaultProps = {
    prefixCls: "hp-select"
}
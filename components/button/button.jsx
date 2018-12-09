import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames";
import * as DOM from "dom/dom"
import "./button.scss"

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() { 
        const { type } = this.props;
        if(type === "submit") {
            DOM.on(findDOMNode(this), "click", e => e.preventDefault())
        }
    }
    render() {
        const { children, prefixCls, className, theme, size, block, icon, width, ...attr } = this.props;
        let classes = classNames(prefixCls, className, block ? "block" : "", {
            [`${prefixCls}-${theme}`]: theme,
            [`${prefixCls}-${size}`]: size
        })
        const iconFlag = icon ? <i className={`iconfont ${children ? "mr-7" : ""} ${icon}`}></i> : null;
        const styles = {
            width: width || undefined
        }
        return <button 
        className={classes}
        style={styles}
        {...attr}
        >{iconFlag}{children}</button>
    }
}
Button.propTypes = {
    prefixCls: PropTypes.string,
    theme: PropTypes.string,
    icon: PropTypes.string
}
Button.defaultProps = {
    prefixCls: "hp-button",
    theme: "default",
    type: "button",
    icon: null
}

export class ButtonGroup extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { children, className, prefixCls, theme, block } = this.props;
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${theme}`]: theme,
            [`${prefixCls}-${block ? "block" : ""}`]: block ? "block" : ""
        });
        return <div className={classes}>{children.map((child, index) => {
            const width = `${100/children.length}%`;
            return <Button key={`button-${index}`} {...child.props} width={width}></Button>
        })}</div>
    }
}
ButtonGroup.propTypes = {
    prefixCls: PropTypes.string
}
ButtonGroup.defaultProps = {
    prefixCls: "hp-buttongroup"
}
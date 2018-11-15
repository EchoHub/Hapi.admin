import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import "./gridLayout.scss"

/**
 * @desc 栅格容器
 */
export default class GridLayout extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    render() {
        const { children, prefixCls, className, justify, theme, style } = this.props;
        let justifyContent = "";
        if (theme === "flex") justifyContent = justify
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${theme}`]: theme,
            [`${prefixCls}-${justifyContent}`]: justifyContent || ""
        })
        return <div className={classes} style={style}>{children}</div>
    }
}
GridLayout.propTypes = {
    prefixCls: PropTypes.string,
    theme: PropTypes.string
}
GridLayout.defaultProps = {
    prefixCls: "hp-gridlayout",
    theme: "default"
}

/**
 * @desc 栅格
 */
export class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() { }
    render() {
        const { children, col, className, prefixCls, style } = this.props;
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${col}`]: col
        });
        return <div className={classes} style={style}>{children}</div>
    }
}
Layout.propTypes = {
    prefixClas: PropTypes.string,
    col: PropTypes.number
}
Layout.defaultProps = {
    prefixCls: "hp-layout",
    col: 1
}
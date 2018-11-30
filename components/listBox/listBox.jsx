import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames"
import "./listBox.scss"

export default class ListBox extends Component {
    render() {
        const { prefixCls, className } = this.props
        const classes = classNames(prefixCls, className)
        return <ul className={classes}></ul>
    }
}
ListBox.defaultProps = {
    prefixCls: "hp-listbox"
}

export class ListItem extends Component {
    render() {
        const { prefixCls, className } = this.props
        const classes = classNames(prefixCls, className)
        return <li className={classes}></li>
    }
}
ListItem.defaultProps = {
    prefixCls: "x-listbox"
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames"
import "./select.scss"

export default class Select extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { prefixCls, className } = this.props
        const classes = classNames(prefixCls, className)
        return <div className={classes}></div>
    }
}
Select.defaultProps = {
    prefixCls: "hp-select"
}
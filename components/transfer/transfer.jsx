import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames";
import "./transfer.scss"

export default class Transfer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { prefixCls, className } = this.props;
        const classes = classNames(prefixCls, className);
        return <div className={classes}>
            <div className="hp-transfer-list">
                <div className="hp-transfer-header"></div>
                <div className="hp-transfer-body"></div>
            </div>
            <div className="hp-transfer-operation"></div>
            <div className="hp-transfer-list">
                <div className="hp-transfer-body"></div>
            </div>
        </div>
    }
}
Transfer.propTypes = {
    prefixCls: PropTypes.string
}
Transfer.defaultProps = {
    prefixCls: "hp-transfer"
}
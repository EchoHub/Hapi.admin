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
        return <div className="hp-template"></div>
    }
}
Transfer.propTypes = {
    prefixCls: PropTypes.string
}
Transfer.defaultProps = {
    prefixCls: "hp-template"
}
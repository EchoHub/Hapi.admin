import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { polyfill } from "react-lifecycles-compat"
import "./suggest.scss"

export default class Suggest extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="hp-template"></div>
    }
}
Suggest.propTypes = {
    prefixCls: PropTypes.string
}
Suggest.defaultProps = {
    prefixCls: "hp-template"
}
import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { polyfill } from "react-lifecycles-compat"
import "./_template.scss"

export default class Template extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="hp-template"></div>
    }
}
Template.propTypes = {
    prefixCls: PropTypes.string
}
Template.defaultProps = {
    prefixCls: "hp-template"
}
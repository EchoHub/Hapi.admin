import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import classNames from "classnames";
import "./sidebarPopup.scss"

export default class SidebarPopup extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="hp-template"></div>
    }
}
SidebarPopup.propTypes = {
    prefixCls: PropTypes.string
}
SidebarPopup.defaultProps = {
    prefixCls: "hp-template"
}
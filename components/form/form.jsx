import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./form.scss"

export default class Form extends Component {
    render() {
        return <div className="hp-form"></div>
    }
}
Form.protoTypes = {
    prefixCls: PropTypes.string
}
Form.defaultProps = {
    prefixCls: "hp-form"
}
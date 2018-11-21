import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import "./textBox.scss"

export default class TextBox extends Component {
    constructor(props) {
        super(props);
    }

    get value() {
        const { name } = this.props;
        let result = {};
        result[name] = this.refs.input.value
        return result;
    }

    set value(v) {

    }

    render() {
        const { prefixCls, className, ...attr } = this.props;
        const classes = classNames(prefixCls, className);
        return <input ref="input" className={classes} {...attr} />
    }
}
TextBox.propTypes = {
    type: PropTypes.string,
    prefixCls: PropTypes.string,
}
TextBox.defaultProps = {
    type: "text",
    prefixCls: "hp-textbox"
}
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
        const { name } = this.props;
        if(v && Object.keys(v).length) {
            for(const key in v) {
                this.refs.input.value = v[name];
            }
        }
    }

    reportValidity() {
        const input = this.refs.input;
        let valid = true;
        const { val, pattern, patternMessage } = input.value;
        if(pattern && !pattern.test(val)) {
            valid = false;
        }
        console.log(valid)
        return {
            valid: valid
        };
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
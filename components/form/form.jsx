import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import "./form.scss"

export default class Form extends Component {

    get value() {
        return null;
    }

    set value(v) {

    }

    render() {
        const { children, className, prefixCls } = this.props;
        const classes = classNames(prefixCls, className);
        return <form className={classes}>{children}</form>
    }
}
Form.propTypes = {
    prefixCls: PropTypes.string
}
Form.defaultProps = {
    prefixCls: "hp-form"
}
export class FormLayout extends Component {
    constructor(props) {
        super(props);
    }

    static splitChildren(children) {
        let result = [], tds = [], index = 0;
        Object.prototype.toString.call(children) !== "[object Array]" && (children = [children]);
        for (const child of children) {
            if (child.type instanceof Function) {
                tds.push(child)
            } else {
                tds = [];
                index++;
                continue;
            }
            result[index] = tds;
        }
        return result;
    }

    render() {
        const { children, prefixCls, className, style } = this.props
        const classes = classNames(prefixCls, className)
        return <table className={classes} style={style}>
            <tbody>
                {FormLayout.splitChildren(children).map((child, index) => {
                    return <tr key={`tr_${index}`}>{child}</tr>;
                })}
            </tbody>
        </table>
    }
}
FormLayout.propTypes = {
    prefixCls: PropTypes.string
}
FormLayout.defaultProps = {
    prefixCls: "hp-formlayout"
}
export class FormField extends Component {
    constructor(props) {
        super(props);
    }

    get value() {
        return null;
    }

    set value(v) {

    }

    render() {
        const { children, className, prefixCls, label, colSpan } = this.props;
        const classes = classNames(prefixCls, className);
        return [
            <th key={"x-formfield_label-1"}><label className="x-formfield_label">{label}</label></th>,
            <td key={"x-formfield_label-2"} colSpan={colSpan % 2 === 0 ? colSpan + 1 : colSpan}>{children}</td>
        ]
    }
}
FormField.propTypes = {
    prefixCls: PropTypes.string
}
FormField.defaultProps = {
    prefixCls: "hp-formfield",
    colSpan: 1
}